// script ini untuk menjalankan server.

// begin: import modules.
const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const indexRouter = require('./routes/index');
// end: import modules.

// inisialisasi express.
const app = express();

// gunakan ejs sebagai view engine.
app.set('view engine', 'ejs');

// gunakan urlencoded dari express.
app.use(express.urlencoded({ extended: false }));

// untuk keperluan upload gambar.
app.use(multer({
    storage: multer.diskStorage({
        destination: (req, file, callback) => {
            callback(null, './uploads');
        },
        filename: (req, file, callback) => {
            callback(null, uuidv4() + "-" + file.originalname);
        }
    }),
    fileFilter: (req, file, callback) => {
        if (file.mimetype == 'image/png' || file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg' || file.mimetype == 'image/gif') {
            callback(null, true);
        } else {
            callback(null, false);
        }
    }
}).single('upload'));

// jadikan folder static
app.use('/public', express.static(__dirname + '/public'));
app.use('/uploads', express.static(__dirname + '/uploads'));

// register index router.
app.use('/', indexRouter);

// koneksi ke mongoose.
mongoose.connect('mongodb://127.0.0.1:27017/studi-kasus-nodejs-aplikasi-image-gallery');

// saat terkoneksi.
mongoose.connection.on("connected", async function () {
    // jalankan server.
    app.listen(3000, function () {
        console.log('server berjalan di port 3000');
    });
});