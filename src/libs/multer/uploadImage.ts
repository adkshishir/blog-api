import multer from 'multer';
// check if the file is an image
const fileFilter = (req: any, file: any, cb: any) => {
  try {
    if (
      file.mimetype === 'image/jpeg' ||
      file.mimetype === 'image/jpg' ||
      file.mimetype === 'image/png'
    ) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  } catch (error: any) {
    return cb(error);
  }
};
const storage = multer.diskStorage({
  destination: function (req: any, file: any, cb: any) {
    cb(null, 'public/uploads/');
  },
  filename: function (req: any, file: any, cb: any) {
    cb(null, file.originalname);
  },
});
// upload for multiple images with dynamic name
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

export { upload };
