const express = require('express')
const router = express.Router()

const {
    body,
    validationResult
} = require('express-validator')


// import databse
const connection = require('../config/database')

// Index Posts
router.get('/', function (req, res) {
    // query
    connection.query('SELECT * FROM posts ORDER BY id desc', function (err, rows) {
        if (err) {
            return res.status(500).json({
                status: false,
                message: 'Internal Server Error',
            })
        } else {
            return res.status(200).json({
                status: true,
                message: 'List Data Post',
                data: rows
            })
        }
    });
});

// store post
router.post('/store', [
    // validation
    body('title').notEmpty(),
    body('content').notEmpty()
], (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({
            errors: errors.array()
        });
    }

    // define formData
    let formData = {
        title: req.body.title,
        content: req.body.content
    }

    // insert query
    connection.query('INSERT INTO posts SET ?', formData, function (err, rows) {
        if (err) {
            return res.status(500).json({
                status: false,
                message: 'Internal Server Error'
            })
        } else {
            return res.status(201).json({
                ststus: true,
                message: 'Insert Data Sucessfuly',
                data: rows[0]
            })
        }
    })
});

// show post
router.get('/(:id)', function (req, res) {
    let id = req.params.id;
    connection.query(`SELECT * FROM posts WHERE id=${id}`, function (err, rows) {
        if (err) {
            return res.status(500).json({
                status: false,
                message: 'Internal Server Error'
            })
        }

        // if ost not found
        if (rows.length <= 0) {
            return res.status(404).json({
                status: false,
                message: 'Data Post Not Found'
            })
        } else {
            return res.status(200).json({
                status: true,
                message: 'Detail Data Post',
                data: rows[0]
            })
        }
    })
});

// update post
router.patch('/update/:id', [
    // vaidation
    body('title').notEmpty(),
    body('content').notEmpty()
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }

    // id post
    let id = req.params.id;

    // data post
    let formData = {
        title: req.body.title,
        content: req.body.content
    }

    // update query
    connection.query(`UPDATE posts SET ? WHERE id = ${id}`, formData, function (err, rows) {
        // if error throw err
        if (err) {
            return res.status(500).json({
                status: false,
                message: 'Internal Server Error'
            })
        } else {
            return res.status(200).json({
                ststus: true,
                message: 'Update Dta Successfullly'
            })
        }
    })
});


// delete post
router.delete('/delete/(:id)', function (req, res) {
    let id = req.params.id;

    connection.query(`DELETE FROM posts WHERE id = ${id}`, function (req, rows) {
        if (err) {
            return res.status(500).json({
                status: false,
                message: 'Internal Server Error'
            })
        } else {
            return res.status(200).json({
                ststus: true,
                message: 'Delete Data Successfully'
            })
        }
    })
});

module.exports = router;