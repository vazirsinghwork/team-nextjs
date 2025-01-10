const express = require("express");
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const db = require('../db/connection');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const slugify = require("slugify");
const verifyToken = require('../middlewares/jwt');
const mailer = require("../utils/mailer");
// All users
router.post('/countries', async (req, res) => {
  try {
    console.log('Fetching countries...');
    const query = 'SELECT * FROM country';
    db.query(query, (err, results) => {
      if (err) {
        console.error('Error fetching country:', err);
        return res.status(500).json({ code: '0', message: 'Error fetching country' });
      }
      return res.status(200).json({ code: '1', message: 'Country retrieved successfully', data: results });
    });
  } catch (error) {
    console.error('Internal Server Error:', error);
    return res.status(500).json({ code: '0', message: 'Internal Server Error' });
  }
});



router.post('/add_series', async (req, res) => {
  console.log('req.body', req.body);
  const { name, date_from, date_to, short_name, host_country_id } = req.body;

  if (!name || !date_from || !date_to || !short_name, !host_country_id) {
    return res.status(200).json({ code: '0', message: 'All fields are required' });
  }

  try {
    const result = await new Promise((resolve, reject) => {
      db.query(
        'INSERT INTO series (name, date_from, date_to, short_name, host_country_id) VALUES (?, ?, ?, ?, ?)',
        [name, date_from, date_to, short_name, host_country_id],
        (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        }
      );
      return res.status(200).json({ code: '1', message: 'Series added successfully' });
    });
  } catch (error) {
    console.error(error);
    res.status(200).send({ code: '0', message: 'Internal Server Error' });
  }
});



router.post('/get_series',verifyToken, async (req, res) => {
  try {
    const query = 'SELECT * FROM series';
    db.query(query, (err, results) => {
      if (err) {
        return res.status(400).json({ code: '0', message: 'Error fetching users' });
      }
      return res.status(200).json({ code: '1', message: 'Series retrieved successfully', data: results });
    });
  } catch (error) {
    return res.status(400).json({ code: '0', message: 'Internal Server Error' });
  }
});

router.post('/addMatch', async (req, res) => {
  try {
    const { series_id, time_from, time_to, team1_id, team2_id } = req.body;

    console.log('11111111')
    if (!series_id || !time_from || !time_to || !team1_id || !team2_id) {
      return res.status(400).json({ code: '0', message: 'Missing required fields' });
    }

    // Sanitize and parse input
    const sanitizedSeriesId = parseInt(series_id, 10);
    const sanitizedTeam1Id = parseInt(team1_id, 10);
    const sanitizedTeam2Id = parseInt(team2_id, 10);

    // Validate parsed values
    if (isNaN(sanitizedSeriesId) || isNaN(sanitizedTeam1Id) || isNaN(sanitizedTeam2Id)) {
      return res.status(400).json({ code: '0', message: 'Invalid input types' });
    }

    // Perform database operation with Promise
    const queryPromise = (query, values) => {
      return new Promise((resolve, reject) => {
        db.query(query, values, (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        });
      });
    };

    console.log('sanitizedSeriesId, time_from, time_to, sanitizedTeam1Id, sanitizedTeam2Id',sanitizedSeriesId, time_from, time_to, sanitizedTeam1Id, sanitizedTeam2Id)
    // Query execution
    const results = await queryPromise(
      'INSERT INTO series_matches (series_id, time_from, time_to, team1_id, team2_id) VALUES (?, ?, ?, ?, ?)',
      [sanitizedSeriesId, time_from, time_to, sanitizedTeam1Id, sanitizedTeam2Id]
    );

    // Success response
    return res.status(200).json({
      code: '1',
      message: 'Match added successfully',
      data: results,
    });

  } catch (error) {
    console.error('Unexpected Error:', error);
    return res.status(500).json({ code: '0', message: 'Internal Server Error' });
  }
});

router.post('/get_matches', async (req, res) => {
  try {
    console.log('req.body', req.body);
    //const query = 'SELECT * FROM series_matches';
    const query = `
      SELECT
        sm.*,
        s.name,
        t1.name AS team1_name,
        t2.name AS team2_name
      FROM series_matches sm
      JOIN series s ON sm.series_id = s.id
      JOIN teams t1 ON sm.team1_id = t1.id
      JOIN teams t2 ON sm.team2_id = t2.id
    `;

    console.log('query', query);
    db.query(query, (err, results) => {
      console.log('err', err);
      console.log('results', results);
      if (err) {
        return res.status(500).json({ code: '0', message: 'Error fetching users' });
      }
      return res.status(200).json({ code: '1', message: 'Series retrieved successfully', data: results });
    });
  } catch (error) {
    return res.status(500).json({ code: '0', message: 'Internal Server Error' });
  }
});



router.post('/add_team', async (req, res) => {
  //console.log('req.body', req.body);
  const { name, short_name, country_id} = req.body;
  console.log('req.body', name, short_name, country_id);
  if (!name || !short_name || !country_id ) {
    return res.status(200).json({ code: '0', message: 'All fields are required' });
  }

  try {
    const result = await new Promise((resolve, reject) => {
      db.query(
        'INSERT INTO teams (name, short_name, country_id) VALUES (?, ?, ?)',
        [name, short_name, country_id],
        (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        }
      );
      return res.status(200).json({ code: '1', message: 'Team Added successfully' });
    });
  } catch (error) {
    console.error(error);
    res.status(200).send({ code: '0', message: 'Internal Server Error' });
  }
});

router.post('/get_teams', async (req, res) => {
  try {
    console.log('11111')
    const query = 'SELECT * FROM teams';
    db.query(query, (err, results) => {
      if (err) {
        return res.status(200).json({ code: '0', message: 'Error fetching users' });
      }
      return res.status(200).json({ code: '1', message: 'Country retrieved successfully', data: results });
    });
  } catch (error) {
    return res.status(200).json({ code: '0', message: 'Internal Server Error' });
  }
});

router.post("/add_players", (req, res) => {
  try {
    const { players } = req.body; // Expecting players as a comma-separated string (e.g., "aa,bb,cc")
    if (!players) {
      return res.status(400).json({ error: "Players field is required" });
    }

    // Convert text to array and generate slugs
    const playerArray = players.split(",").map((name) => name.trim());
    const playersToInsert = playerArray.map((name) => ({
      name,
      slug: slugify(name, { lower: true }), // Generate slug for each name
    }));

    // Check if slug already exists
    const checkSlugExistence = (slug) => {
      return new Promise((resolve, reject) => {
        db.query('SELECT COUNT(*) AS count FROM players WHERE slug = ?', [slug], (err, results) => {
          if (err) {
            reject(err); // Reject if error occurs
          } else {
            resolve(results[0].count); // Resolve with the count of records with that slug
          }
        });
      });
    };

    // Prepare an array to insert only new players
    const playersToInsertFiltered = [];

    // Loop through the players and insert only those whose slug doesn't exist
    Promise.all(playersToInsert.map(async (player) => {
      const slugExists = await checkSlugExistence(player.slug);

      if (slugExists === 0) {
        // If the slug does not exist, add the player to the list for insertion
        playersToInsertFiltered.push([player.name, player.slug]);
      }
    }))
    .then(() => {
      // Insert all the players that don't have an existing slug
      if (playersToInsertFiltered.length > 0) {
        const query = 'INSERT INTO players (name, slug) VALUES ?';
        db.query(query, [playersToInsertFiltered], (err, results) => {
          if (err) {
            console.error("Error inserting players:", err.message);
            res.status(500).json({ error: "An error occurred while adding players." });
          } else {
            res.status(200).json({ message: "Players added successfully!" });
          }
        });
      } else {
        res.status(200).json({ message: "No new players to add, all slugs already exist." });
      }
    })
    .catch((error) => {
      console.error("Error checking or inserting players:", error.message);
      res.status(500).json({ error: "An unexpected error occurred." });
    });

  } catch (error) {
    console.error("Error handling the request:", error.message);
    res.status(500).json({ error: "An unexpected error occurred." });
  }
});


router.post('/get_players', async (req, res) => {
  try {
    console.log('11111')
    const query = 'SELECT * FROM players';
    db.query(query, (err, results) => {
      if (err) {
        return res.status(200).json({ code: '0', message: 'Error fetching users' });
      }
      return res.status(200).json({ code: '1', message: 'Country retrieved successfully', data: results });
    });
  } catch (error) {
    return res.status(200).json({ code: '0', message: 'Internal Server Error' });
  }
});



router.post('/add_team_squad', async (req, res) => {
  const { team_squad_data } = req.body;

  // Validate the request body
  if (!Array.isArray(team_squad_data) || team_squad_data.length === 0) {
    return res.status(400).json({ code: '0', message: 'Team squad data is required and must be an array' });
  }

  // Validate each object in the array
  for (const player of team_squad_data) {
    const { player_id, team_id, player_type, series_match_id } = player;
    if (!player_id || !team_id || !player_type || !series_match_id) {
      return res.status(400).json({ code: '0', message: 'All fields are required for each player' });
    }
  }

  try {
    const result = await new Promise((resolve, reject) => {
      // Prepare the query and values for bulk insertion
      const query = `
        INSERT INTO team_squad (player_id, team_id, player_type, series_match_id)
        VALUES ?
      `;
      const values = team_squad_data.map(player => [
        player.player_id,
        player.team_id,
        player.player_type,
        player.series_match_id,
      ]);
      console.log('values',values)
      db.query(query, [values], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });

    return res.status(200).json({ code: '1', message: 'Team squad added successfully', result });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ code: '0', message: 'Internal Server Error' });
  }
});


router.post('/get_players_by_match_id', async (req, res) => {
  const { series_match_id,type } = req.body;

  if (!series_match_id) {
    return res.status(400).json({ code: '0', message: 'series_match_id is required' });
  }

  try {
    const query = `
    SELECT
      players.id,
      players.name AS player_name,
      team_squad.team_id,
      team_squad.is_playing,
      team_squad.player_type,
      teams.name AS team_name,
      player_stats.player_point,
      player_stats.percentage,
      player_stats.wicket,
      player_stats.run,
      player_stats.catches,
      player_stats.run_out,
      player_stats.played_no,
      player_stats.id AS player_stats_id
    FROM
      team_squad
    INNER JOIN
      players ON team_squad.player_id = players.id
    INNER JOIN
      teams ON team_squad.team_id = teams.id
    LEFT JOIN
      player_stats ON player_stats.player_id = players.id
    WHERE
      team_squad.series_match_id = ? ${type == 1 ? 'AND team_squad.is_playing = 1': ''}
  `;

    db.query(query, [series_match_id], (err, results) => {
      if (err) {
        return res.status(200).json({ code: '0', message: 'Error fetching players', error: err });
      }

      const formattedData = results.reduce((acc, player) => {
        // Use team_name as the key for grouping
        if (!acc[player.team_name]) {
          acc[player.team_name] = []; // Initialize array for this team
        }
        // Add player information to the team's array
        acc[player.team_name].push({
          id: player.id,
          name: player.player_name,
          team_id: player.team_id,
          is_playing: player.is_playing,
          player_type: player.player_type,

          player_point: player.player_point,
          percentage: player.percentage,
          wicket:     player.wicket,
          run:        player.run,
          catches:    player.catches,
          run_out:    player.run_out,
          played_no:  player.played_no,
          player_stats_id: player.player_stats_id,
        });
        return acc;
      }, {});

      return res.status(200).json({
        code: '1',
        message: 'Players retrieved successfully',
        data: formattedData
      });
    });
  } catch (error) {
    console.error('Database error:', error);
    return res.status(500).json({ code: '0', message: 'Internal Server Error' });
  }
});


router.post('/update_team_squad', async (req, res) => {
  const { team_squad_data } = req.body;

  // Validate the request body
  if (!Array.isArray(team_squad_data) || team_squad_data.length === 0) {
    return res.status(400).json({ code: '0', message: 'Team squad data is required and must be an array' });
  }

  // Validate each object in the array
  for (const player of team_squad_data) {
    const { id } = player;
    if (!id) {
      return res.status(400).json({ code: '0', message: 'id is required for each player' });
    }
  }

  try {
    const results = await Promise.all(
      team_squad_data.map(player => {
        const { id, is_playing, player_type } = player;

        return new Promise((resolve, reject) => {
          const query = `
            UPDATE team_squad
            SET
              is_playing = CASE WHEN ? IS NULL OR ? = '' THEN NULL ELSE ? END,
              player_type = CASE WHEN ? IS NULL OR ? = '' THEN NULL ELSE ? END
            WHERE player_id = ?
          `;
          const values = [
            is_playing, is_playing, is_playing,
            player_type, player_type, player_type,
            id,
          ];

          db.query(query, values, (err, result) => {
            if (err) {
              reject(err);
            } else {
              resolve(result);
            }
          });
        });
      })
    );

    return res.status(200).json({
      code: '1',
      message: 'Team squad updated successfully',
      results,
    });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ code: '0', message: 'Internal Server Error' });
  }
});

router.post('/add_stats', async (req, res) => {
  const {
    series_match_id,
    team_id,
    player_id,
    player_point,
    percentage,
    wicket,
    run,
    catches,
    run_out,
    played_no,
    player_stats_id
  } = req.body;

  console.log(
    series_match_id,
    team_id,
    player_id,
    player_point,
    percentage,
    wicket,
    run,
    catches,
    run_out,
    played_no,
    player_stats_id
  );

  if (
    !series_match_id ||
    !team_id ||
    !player_id ||
    player_point === undefined ||
    percentage === undefined ||
    wicket === undefined ||
    run === undefined ||
    catches === undefined ||
    run_out === undefined ||
    played_no === undefined
  ) {
    return res.status(500).json({ code: '0', message: 'All fields are required' });
  }

  if(player_stats_id == null)
  {
    try {
    const result = await new Promise((resolve, reject) => {
      db.query(
        'INSERT INTO player_stats (series_match_id, team_id, player_id, player_point, percentage, wicket, run, catches, run_out, played_no) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [series_match_id, team_id, player_id, player_point, percentage, wicket, run, catches, run_out, played_no],
        (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        }
      );
      return res.status(200).json({
        code: '1',
        message: 'Player stats added or updated successfully',
        data: result
      });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ code: '0', message: 'Internal Server Error' });
  }
  }else{
    try {
      const result = await new Promise((resolve, reject) => {
        db.query(
          `
          UPDATE player_stats
          SET series_match_id = ?,
              team_id = ?,
              player_id = ?,
              player_point = ?,
              percentage = ?,
              wicket = ?,
              run = ?,
              catches = ?,
              run_out = ?,
              played_no = ?
          WHERE id = ?
          `,
          [
            series_match_id,
            team_id,
            player_id,
            player_point,
            percentage,
            wicket,
            run,
            catches,
            run_out,
            played_no,
            player_stats_id
          ],
          (err, results) => {
            if (err) {
              reject(err);
            } else {
              resolve(results);
            }
          }
        );
      });

      return res.status(200).json({
        code: '1',
        message: 'Player stats updated successfully',
        data: result
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ code: '0', message: 'Internal Server Error' });
    }
  }
});


router.post('/get_series_with_upcoming_matches', async (req, res) => {
  try {
    const query = `
      SELECT
        s.id AS series_id,
        s.name AS series_name,
        sm.*,
        t1.name AS team1_name,
        t2.name AS team2_name
      FROM series s
      LEFT JOIN series_matches sm ON s.id = sm.series_id
      LEFT JOIN teams t1 ON sm.team1_id = t1.id
      LEFT JOIN teams t2 ON sm.team2_id = t2.id
      WHERE sm.time_from > CURRENT_DATE
    `;

    db.query(query, (err, results) => {
      if (err) {
        return res.status(500).json({ code: '0', message: 'Error fetching series and matches' });
      }

      // Group data by series
      const seriesMap = {};
      results.forEach(row => {
        const { series_id, series_name, ...matchData } = row;

        if (!seriesMap[series_id]) {
          seriesMap[series_id] = {
            id: series_id,
            name: series_name,
            matches: []
          };
        }

        seriesMap[series_id].matches.push({
          ...matchData, // Include all fields from series_matches table
          team1_name: matchData.team1_name,
          team2_name: matchData.team2_name
        });
      });

      const seriesList = Object.values(seriesMap);

      return res.status(200).json({
        code: '1',
        message: 'Series with upcoming matches retrieved successfully',
        data: seriesList
      });
    });
  } catch (error) {
    return res.status(500).json({ code: '0', message: 'Internal Server Error' });
  }
});

module.exports = router;