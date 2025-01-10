const express = require("express");
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const db = require('../db/connection');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const verifyToken = require('../middlewares/jwt');
const mailer = require("../utils/mailer");
const { userImageUpload, getUserImagePath } = require("../utils/fileUpload");
// All users
router.post('/users',verifyToken, async (req, res) => {
  try {
    // Query to select all users
    const query = 'SELECT * FROM users';

    // Execute the query
    db.query(query, (err, results) => {
      if (err) {
        console.error('Error fetching users:', err);
        return res.status(200).json({ code: '0', message: 'Error fetching users' });
      }

      // If successful, return the list of users
      return res.status(200).json({ code: '1', message: 'Users retrieved successfully', users: results });
    });
  } catch (error) {
    console.error('Error in getAllUsers function:', error);
    return res.status(200).json({ code: '0', message: 'Internal Server Error' });
  }
});



router.post('/register_user', async (req, res) => {
  console.log('req.body', req.body);
  const { name, email, mobile, password } = req.body;

  if (!name || !email || !mobile || !password) {
    return res.status(200).json({ code: '0', message: 'All fields are required' });
  }

  try {
    const existingUser = await new Promise((resolve, reject) => {
      db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });

    if (existingUser.length > 0) {
      return res.status(200).json({ code: '0', message: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await new Promise((resolve, reject) => {
      db.query(
        'INSERT INTO users (name, email, mobile, password, is_verified, otp) VALUES (?, ?, ?, ?, ?, ?)',
        [name, email, mobile, hashedPassword, false,'0000'],
        (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        }
      );
    });

   // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000);
    console.log('Generated OTP:', otp);

    // Save OTP temporarily
    await new Promise((resolve, reject) => {
      db.query(
        'UPDATE users SET otp = ? WHERE email = ?',
        [otp, email],
        (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        }
      );
    });

    mailer.sendRegistrationOtpMail(req,res)
  } catch (error) {
    console.error(error);
    res.status(200).send({ code: '0', message: 'Internal Server Error' });
  }
});

// Verifying OTP
router.post('/verify_otp', async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(200).json({ code: '0', message: 'Email and OTP are required' });
  }

  try {
    // Check if OTP matches
    const existingUser = await new Promise((resolve, reject) => {
      db.query('SELECT * FROM users WHERE email = ? AND otp = ?', [email, otp], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });

    if (existingUser.length === 0) {
      return res.status(200).json({ code: '0', message: 'Invalid OTP' });
    }

    // Mark the user as verified
    await new Promise((resolve, reject) => {
      db.query('UPDATE users SET is_verified = ? WHERE email = ?', [true, email], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });

    return res.status(200).json({ code: '1', message: 'Email verified successfully' });

  } catch (error) {
    console.error(error);
    res.status(200).json({ code: '0', message: 'Internal Server Error' });
  }
});


router.post('/forgot_password', async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(200).json({ code: '0', message: 'Email is required' });
  }

  try {
    const existingUser = await new Promise((resolve, reject) => {
      db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });

    if (existingUser.length === 0) {
      return res.status(200).json({ code: '0', message: 'Email not found' });
    }

    const otp = Math.floor(100000 + Math.random() * 900000);
    console.log('Generated OTP:', otp);

    await new Promise((resolve, reject) => {
      db.query(
        'UPDATE users SET otp = ? WHERE email = ?',
        [otp, email],
        (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        }
      );
    });

    //
    console.log('otp',otp)
    mailer.sendForgotPasswordMail(req, res);
  } catch (error) {
    console.error(error);
    return res.status(200).send({ code: '0', message: 'Internal Server Error' });
  }
});

router.post('/change_password', async (req, res) => {
  const { email, otp, newPassword } = req.body;

  if (!email || !otp || !newPassword) {
    return res.status(200).json({ code: '0', message: 'Email, OTP, and new password are required' });
  }

  try {
    const existingUser = await new Promise((resolve, reject) => {
      db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });

    if (existingUser.length === 0) {
      return res.status(200).json({ code: '0', message: 'Email not found' });
    }

    if (existingUser[0].otp !== otp) {
      return res.status(200).json({ code: '0', message: 'Invalid OTP' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await new Promise((resolve, reject) => {
      db.query(
        'UPDATE users SET password = ?, otp = NULL WHERE email = ?',
        [hashedPassword, otp, email],
        (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        }
      );
    });

    return res.status(200).json({ code: '1', message: 'Password updated successfully' });
  } catch (error) {
    console.error(error);
    return res.status(200).send({ code: '0', message: 'Internal Server Error' });
  }
});


router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ code: '0', message: 'Email and password are required' });
  }

  try {
    const existingUser = await new Promise((resolve, reject) => {
      db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });

    console.log('password, existingUser[0].password',password, existingUser[0].password)
    const match = await bcrypt.compare(password, existingUser[0].password);
    console.log('match',match)
    if (!match) {
      return res.status(400).json({ code: '0', message: 'Invalid email or password' });
    }

    const payload = { userId: existingUser[0].id, email: existingUser[0].email };
    const secretKey = 'vazir123456';
    const options = { expiresIn: '7d' };

    const token = jwt.sign(payload, secretKey, options);

    res.status(200).json({
      code: '1',
      message: 'Login successful',
      token: token,
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ code: '0', message: 'Internal Server Error' });
  }
});



router.post('/profile', verifyToken, async (req, res) => {
  console.log('req',req)
  const userId = req.user.userId;

  try {
    const result = await new Promise((resolve, reject) => {
      db.query('SELECT id, name, email, mobile FROM users WHERE id = ?', [userId], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });

    if (result.length === 0) {
      return res.status(404).json({ code: '0', message: 'User not found' });
    }

    res.status(200).json({ code: '1', message: 'Profile fetched successfully', user: result[0] });
  } catch (error) {
    console.error(error);
    res.status(200).json({ code: '0', message: 'Internal Server Error' });
  }
});


// Update Profile API
router.post('/update_profile', verifyToken, userImageUpload.single('user_image'), async (req, res) => {
  const userId = req.user.userId;
  const { name, email, mobile } = req.body;
  const user_image = req.file ? getUserImagePath(req, req.file.filename) : null;

  try {
    const userExists = await new Promise((resolve, reject) => {
      db.query('SELECT id FROM users WHERE id = ?', [userId], (err, results) => {
        if (err) reject(err);
        resolve(results.length > 0);
      });
    });

    if (!userExists) {
      return res.status(200).json({ code: '0', message: 'User not found' });
    }

    const fields = [];
    const values = [];

    if (name) {
      fields.push('name = ?');
      values.push(name);
    }
    if (email) {
      fields.push('email = ?');
      values.push(email);
    }
    if (mobile) {
      fields.push('mobile = ?');
      values.push(mobile);
    }
    if (user_image) {
      fields.push('user_image = ?');
      values.push(user_image);
    }

    if (fields.length > 0) {
      values.push(userId);

      await new Promise((resolve, reject) => {
        db.query(
          `UPDATE users SET ${fields.join(', ')} WHERE id = ?`,
          values,
          (err, results) => {
            if (err) reject(err);
            resolve(results);
          }
        );
      });
    }

    res.status(200).json({
      code: '1',
      message: 'Profile updated successfully',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ code: '0', message: 'Internal Server Error' });
  }
});


router.post('/change_status',verifyToken, async (req, res) => {
  //console.log('id', req)
  const user_id = req.user.userId;
  const { status } = req.body;
  console.log(user_id, status)
  if (!user_id || !status) {
    return res.status(200).json({ code: '0', message: 'Pls select status' });
  }

  try {
    await new Promise((resolve, reject) => {
      db.query(
        'UPDATE users SET status = ? WHERE id = ?',
        [status, user_id],
        (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        }
      );
    });

    return res.status(200).json({ code: '1', message: 'Status updated successfully' });
  } catch (error) {
    console.error(error);
    return res.status(200).send({ code: '0', message: 'Internal Server Error' });
  }
});

module.exports = router;