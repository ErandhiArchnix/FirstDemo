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
  const sql =
    "UPDATE locations SET latitude = ?, longitude = ? WHERE location_id = ?";
  dbConfig.connection.query(
    sql,
    [req.body.lat, req.body.lng, req.params.location_id],
    (err, data) => {
      if (err) return res.json(err);
      return res.json(data);
    }
  );
};

// Ctreate a location
export const createLocation = async (req, res) => {
  const sql = "INSERT INTO locations (latitude, longitude) VALUES (?,?)";
  dbConfig.connection.query(sql, [req.body.lat, req.body.lng], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
};

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
  const sql = "UPDATE user SET location_id = ? WHERE user_id = ?";
  dbConfig.connection.query(
    sql,
    [req.body.location_id, req.params.user_id],
    (err, data) => {
      if (err) return res.json(err);
      return res.json(data);
    }
  );
};

// Update a user
export const updateTravelerDetails = async (req, res) => {
  const usernameCheckQuery = "SELECT * FROM user WHERE user_name = ?";
  dbConfig.connection.query(
    usernameCheckQuery,
    [req.body.user_name],
    (usernameErr, usernameResults) => {
      if (usernameErr) {
        console.error("Error checking username existence:", usernameErr);
        return usernameErr;
      }
      if (usernameResults.length > 0 && usernameResults.user_id !== req.body.user_id) {
        return res.json("User Name already exists");
      }
      const sql =
        "UPDATE user SET user_name = ?, gender = ?, phone_number = ?, region = ? WHERE user_id = ?";

      const values = [
        req.body.user_name,
        req.body.gender,
        req.body.telephoneNumber,
        req.body.region,
        req.body.user_id,
      ];

      dbConfig.connection.query(sql, values, (err, result) => {
        if (err) return res.json(err);
        console.log("Updated user");

        const deleteUserLanguages =
          "DELETE FROM user_languages WHERE user_id = ?";
        dbConfig.connection.query(
          deleteUserLanguages,
          [req.body.user_id],
          (err, data) => {
            if (err) return res.json(err);
            return res.json(data);
          }
        );

        const languages = "INSERT INTO languages (language_name) VALUES (?)";

        const userLanguages =
          "INSERT INTO user_languages (user_id, language_id) VALUES (?, ?)";

        Promise.all(
          req.body.languages.map((language) => {
            return new Promise((resolve, reject) => {
              const languageExist =
                "SELECT language_id FROM languages WHERE language_name =?";

              dbConfig.connection.query(
                languageExist,
                [language],
                (langErr, langResults) => {
                  if (langErr) {
                    console.error(
                      "Error checking language existence:",
                      langErr
                    );
                    return next(
                      createError(500, "Error checking language existence")
                    );
                  }
                  if (langResults.length > 0) {
                    console.log(langResults[0].language_id);
                    dbConfig.connection.query(
                      userLanguages,
                      [userId, langResults[0].language_id], // Assuming language_id is auto-incremented
                      (err, res) => {
                        if (err) {
                          reject(err);
                        } else {
                          resolve();
                        }
                      }
                    );
                  }

                  dbConfig.connection.query(
                    languages,
                    [language],
                    (err, languageresult) => {
                      if (err) {
                        reject(err);
                      } else {
                        console.log("Language Added");
                        dbConfig.connection.query(
                          userLanguages,
                          [userId, languageresult.insertId], // Assuming language_id is auto-incremented
                          (err, res) => {
                            if (err) {
                              reject(err);
                            } else {
                              resolve();
                            }
                          }
                        );
                      }
                    }
                  );
                }
              );
            });
          })
        )
          .then(() => {
            res.status(200).json({ token, Status: "User and Languages Added" });
          })
          .catch((error) => {
            res.status(500).json(error);
          });
      });
    }
  );
};
