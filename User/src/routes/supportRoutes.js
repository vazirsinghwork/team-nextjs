const express = require("express");
const router = express.Router();
const db = require('../db/connection');
const verifyToken = require('../middlewares/jwt');

router.post('/support', verifyToken, async (req, res) => {
  console.log('req',req)
  const { subject, message } = req.body;
  if (!subject || !message) {
    return res.status(200).json({ code: '0', message: 'please enter subject and message' });
  }
  const user_id = req.user.userId;
  try {
    const result = await new Promise((resolve, reject) => {
      db.query(
        'INSERT INTO support (subject, message, user_id) VALUES (?, ?, ?)',
        [subject, message, user_id],
        (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        }
      );
    });

    res.status(200).json({ code: '1', message: 'Message added successfully', user: result[0] });
  } catch (error) {
    console.error(error);
    res.status(200).json({ code: '0', message: 'Internal Server Error' });
  }
});


module.exports = router;