import multer from 'multer';
const uploadImage = (req: any, res: any, next: any) => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/uploads');
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname);
    },
  });
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
    } catch (error) {
      console.log(error);
    }
  };
  const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
  });
  upload.single('image')(req, res, next);
};

// upload multiple images
const uploadImages = (req: any, res: any, next: any) => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/uploads');
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname);
    },
  });
  const fileFilter = (req: any, file: any, cb: any) => {
    if (
      file.mimetype === 'image/jpeg' ||
      file.mimetype === 'image/jpg' ||
      file.mimetype === 'image/png'
    ) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };
  const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
  });
  upload.array('images')(req, res, next);
};

export { uploadImage, uploadImages };
