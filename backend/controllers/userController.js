import { dbConfig } from "../database/dbConfig.mjs";

// Get all user locations
export const getLocations = async (req, res) => {
    const sql = "SELECT * FROM locations";
    dbConfig.connection.query(sql, (err, data) => {
      if (err) return res.json(err);
      return res.json(data);
    });
  };

  // Get an user's details
  export const getUser = async (req, res) => {
    const sql = "SELECT * FROM user WHERE user_id = ?";
    dbConfig.connection.query(sql, [req.params.user_id], (err, data) => {
      if (err) return res.json(err);
      return res.json(data);
    });
  };