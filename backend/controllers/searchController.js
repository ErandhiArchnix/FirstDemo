import { dbConfig } from "../database/dbConfig.mjs";

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
  const { gender, region, languages, range, specialties } = req.body;
  const token = req.headers["authorization"];
  const location =
    "SELECT l.longitude, l.latitude FROM locations l JOIN user u ON l.location_id = u.location_id";
  dbConfig.connection.query(location, (err, data) => {
    if (err) {
      return res.json(err);
    } else {
      const longitude = data[0].longitude;
      const latitude = data[0].latitude;
      const sql = `SELECT u.*,
      l.longitude,
      l.latitude,
      (6371 * acos(cos(radians(${latitude})) * cos(radians(l.latitude)) * cos(radians(l.longitude) - radians(${longitude})) + sin(radians(${latitude})) * sin(radians(l.latitude)))) AS distance
      FROM user u
      JOIN locations l ON u.location_id = l.location_id
      JOIN user_languages ul ON u.user_id = ul.user_id
      JOIN languages lang ON ul.language_id = lang.language_id
      JOIN user_specialties us ON u.user_id = us.user_id
      JOIN specialties sp ON us.specialty_id = sp.specialty_id
      WHERE u.user_type = 'Traveler'`;
      return res.json(data);
    }
  });
};

// SELECT locationName, latitude, longitude,
//     ( 3959 * acos( cos( radians(your_latitude) ) * cos( radians( latitude ) )
//     * cos( radians( longitude ) - radians(your_longitude) ) + sin( radians(your_latitude) )
//     * sin( radians( latitude ) ) ) ) AS distance
// FROM location_table
// HAVING distance <= your_radius
// ORDER BY distance;

// SELECT u.username, u.email, u.location_id,
//        l.locationName, l.longitude, l.latitude,
//        (6371 * acos(cos(radians(:given_latitude)) * cos(radians(l.latitude)) * cos(radians(l.longitude) - radians(:given_longitude)) + sin(radians(:given_latitude)) * sin(radians(l.latitude)))) AS distance
// FROM user u
// JOIN location l ON u.location_id = l.locationId
// HAVING distance <= :radius_in_km
// ORDER BY distance;
