const fs = require('fs');
const path = require('path');
const multer = require('multer');

const userImageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const userId = req.user.userId;
    const uploadPath = path.join('uploads', 'users', String(userId));
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const userImageUpload = multer({ storage: userImageStorage });

module.exports = {
  userImageUpload,
  getUserImagePath: (req, fileName) => `${process.env.BASE_URL || 'http://localhost:3000'}/uploads/users/${req.user.userId}/${fileName}`,
};