import { dbConfig } from "../database/dbConfig.mjs";
import jwt from "jsonwebtoken";

// Get all distinct regions
export const getRegions = async (req, res) => {
  const sql = "SELECT DISTINCT region FROM user";
  dbConfig.connection.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
};

// Get all distinct regions
export const getLanguages = async (req, res) => {
  const sql = "SELECT DISTINCT language_name FROM languages";
  dbConfig.connection.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
};

// Get all specialties
export const getSpecialties = async (req, res) => {
  const sql = "SELECT DISTINCT specialty_name FROM specialties";
  dbConfig.connection.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
};

export const filterUsers = async (req, res) => {
  const { gender, region, languages, range, specialties} = req.body;
  const token = req.headers["authorization"];

  if (!token) {
    return res.json({ Error: "Please Login" });
  } else {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.json(err);
      } else {
        const user_id = decoded.user_id;
        console.log(user_id);
        console.log(req.body);
        const location = `SELECT l.longitude, l.latitude FROM locations l JOIN user u ON l.location_id = u.location_id WHERE u.user_id = ${user_id}`;
        dbConfig.connection.query(location, (err, data) => {
          if (err) {
            return res.json(err);
          } else {
            // return res.json(data);
            const longitude = data[0].longitude;
            const latitude = data[0].latitude;
            let sql = `SELECT u.*,
              l.longitude,
              l.latitude,
              lang.*,
              sp.*,
              (6371 * acos(cos(radians(${latitude})) * cos(radians(l.latitude)) * cos(radians(l.longitude) - radians(${longitude})) + sin(radians(${latitude})) * sin(radians(l.latitude)))) AS distance
              FROM user u
              JOIN locations l ON u.location_id = l.location_id
              JOIN user_languages ul ON u.user_id = ul.user_id
              JOIN languages lang ON ul.language_id = lang.language_id
              JOIN user_specialties us ON u.user_id = us.user_id
              JOIN specialties sp ON us.specialty_id = sp.specialty_id
              WHERE u.user_type = 'guide'`;

            if (gender) {
              sql += ` AND u.gender = '${gender}'`;
            }

            if (languages && languages.length > 0) {
              const languageNames = languages
                .map((language) => language)
                .join("','");
              sql += ` AND lang.language_name IN ('${languageNames}')`;
            }

            if (region && region.length > 0) {
              const regionNames = region.map((region) => region).join("','");
              sql += ` AND u.region IN ('${regionNames}')`;
            }

            if (specialties && specialties.length > 0) {
              const specialtyNames = specialties
                .map((specialty) => specialty)
                .join("','");
              sql += ` AND sp.specialty_name IN ('${specialtyNames}')`;
            }

            sql += `HAVING distance < ${range}`;

            dbConfig.connection.query(sql, (err, data) => {
              if (err) {
                return res.json(err);
              } else {
                return res.json(data);
              }
            });
          }
        });
      }
    });
  }
};
