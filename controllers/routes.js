const router = require('express').Router();
const db = require('../api/blog.json');
const fs = require('fs');

//GET all blog posts
router.get('/all', (req, res) => {
    try {
        res.status(200).json({
            results: db
        })
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
})

//GET one blog posts
router.get('/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        let results = db.filter(post => post.post_id === id); 
        if(results) {
            res.status(200).json({
                result: results[0]
            })

        } else {
            res.status(404).json({
                message: `id: ${id} not found.`
            })
        }
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
})

//Create one blog posts
router.post('/:id', (req, res) => {
    try {
        let results;

        if(test) {
            res.status(200).json({
                object: results
            })
        } else {
            res.status(404).json({
                message: `id: ${id} not found.`
            })
        }

    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
})

//Update one blog posts
router.put('/', (req, res) => {
    try {
        let results;
        if(test) {
            res.status(200).json({
                object: results
            })

        } else {
            res.status(404).json({
                message: `id: ${id} not found.`
            })
        }
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
})

//Delete one blog posts
router.delete('/:id', (req, res) => {
    try {
        let results;
        if(test) {
            res.status(200).json({
                object: results
            })

        } else {
            res.status(404).json({
                message: `id: ${id} not found.`
            })
        }
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
})

module.exports = router;