// script ini untuk menangani route index.

// begin: import modules
const express = require('express');
const fs = require('fs');
const File = require('../models/file')
// end: import modules

// buat router nya.
const router = express.Router();

// handle request "/"
router.get('/', async (req, res, next) => {
    // dapatkan file dari database.
    // jika ada query tag, maka gunakan hasil berdasarkan tag
    // jika tidak ambil semua file nya
    const allFiles = await File.find({});

    let resultTags = [];
    allFiles.forEach((item, index) => {
        item.tags.forEach((item1, index1) => {
            resultTags.push(item1)
        });
    });

    let uniqueTags = [...new Set(resultTags)];

    //
    const resultFiles = await File.find({
        tags: req.query.tag
    });

    res.render('index.ejs', {
        results: req.query.tag ? resultFiles : allFiles,
        resultTags: uniqueTags
    })
});

// handle request "/upload"
router.post('/upload', async (req, res, next) => {
    // jika request file ada
    if (req.file) {
        // simpan detailnya di database, di dalam model dengan schema File tadi
        const { title, tags } = req.body;
        const newFile = new File({
            title: title,
            tags: tags[1].split(","),
            path: req.file.path.replace("\\", "/")
        });

        // simpan
        await newFile.save();
    }

    // redirect ke homepage
    res.redirect('/');
});

// handle request "/delete/<id-nya>"
router.get('/delete/:id', async (req, res, next) => {
    // hapus data di db nya.
    const deleted = await File.findOneAndDelete({
        _id: req.params.id
    });

    // hapus file nya
    fs.unlinkSync('./' + deleted.path);

    // redirect ke homepage
    res.redirect('/')
});

// handle request "/download/<id-nya>"
router.get('/download/:id', async (req, res, next) => {
    // cari file yang _id nya adalah <id-nya>
    const found = await File.findOne({
        _id: req.params.id
    });

    // jika ditemukan, maka download
    res.download(found.path);
});

module.exports = router;