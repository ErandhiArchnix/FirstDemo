import { dbConfig } from "../database/dbConfig.mjs";

// Get all user locations
export const getLocations = async (req, res) => {
    const sql = "SELECT * FROM locations";
    dbConfig.connection.query(sql, (err, data) => {
      if (err) return res.json(err);
      return res.json(data);
    });
  };

  // Get a location
  export const getLocation = async (req, res) => {
    const sql = "SELECT * FROM locations WHERE location_id = ?";
    dbConfig.connection.query(sql, [req.params.location_id], (err, data) => {
      if (err) return res.json(err);
      return res.json(data);
    });
  };

  // Update a location
  export const updateLocation = async (req, res) => {
    const sql = "UPDATE locations SET latitude = ?, longitude = ? WHERE location_id = ?"
    dbConfig.connection.query(sql, [req.body.lat, req.body.lng, req.params.location_id], (err, data) => {
      if (err) return res.json(err);
      return res.json(data);
    });
  }

  // Ctreate a location
  export const createLocation = async (req, res) => {
    const sql = "INSERT INTO locations (latitude, longitude) VALUES (?,?)"
    dbConfig.connection.query(sql, [req.body.lat, req.body.lng], (err, data) => {
      if (err) return res.json(err);
      return res.json(data);
    });
  }

  // Get an user's details
  export const getUser = async (req, res) => {
    const sql = `SELECT u.*,
    l.longitude,
    l.latitude,
    lang.*
    FROM user u
    JOIN locations l ON u.location_id = l.location_id
    JOIN user_languages ul ON u.user_id = ul.user_id
    JOIN languages lang ON ul.language_id = lang.language_id
    WHERE u.user_id = ?`;
    dbConfig.connection.query(sql, [req.params.user_id], (err, data) => {
      if (err) return res.json(err);
      return res.json(data);
    });
  };

  // Update user's location id
  export const updateUser = async (req, res) => {
    const sql = "UPDATE user SET location_id = ? WHERE user_id = ?"
    dbConfig.connection.query(sql, [req.body.location_id, req.params.user_id], (err, data) => {
      if (err) return res.json(err);
      return res.json(data);
    });
  };