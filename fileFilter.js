import multer, { diskStorage } from 'multer';
import { extname as _extname } from 'path';

const storage = diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/models/');
    },
    filename: (req, file, cb) => {
        const suffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, suffix + file.originalname);
    }
});

function checkFileType(file, cb) {
    const filetypes = /jpg|JPG|png|PNG/;
    const extname = filetypes.test(_extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images Only!');
    }
}

const upload = multer({
    storage: storage,
    fileFilter: (_req, file, cb) => {
        checkFileType(file, cb);
    }
}).any('image');

export default upload;