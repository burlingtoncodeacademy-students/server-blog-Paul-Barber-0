const router = require('express').Router();
const db = require('../api/blog.json');
const fs = require('fs');
const fsPath = './api/blog.json';

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
        let id = parseInt(req.params.id);
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
        let id = parseInt(req.params.id);
        let blogPost = req.body;
        blogPost.post_id = id;

        fs.readFile(fsPath, (err, data) => {
            if(err) throw err;
            
            const db = JSON.parse(data);
            db.push(blogPost);

            fs.writeFile(fsPath, JSON.stringify(db), err => console.log(err));
                res.status(200).json({
                    status: 'New post created!',
                    object: blogPost
                })
        })

    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
})

//Update one blog posts
router.put('/:id', (req, res) => {
    try {
        let id = parseInt(req.params.id);
        let blogPost = req.body;
        blogPost.post_id = id;

        fs.readFile(fsPath, (err, data) => {
            if (err) throw err;
            const db = JSON.parse(data);
            let postFound = false;

            db.forEach((obj, i) => {
                if(obj.post_id === id) {
                    postFound = true;
                    db[i] = blogPost;
                }
            })

            if(postFound) {
                fs.writeFile(fsPath, JSON.stringify(db), err => console.log(err));
                res.status(200).json({
                    status: 'Post updated!',
                    object: blogPost
                })
            } else {
                res.status(404).json({
                    message: `id: ${id} not found.`
                })
            }
        })
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
})

//Delete one blog posts
router.delete('/:id', (req, res) => {
    try {
        let id = parseInt(req.params.id);
        
        fs.readFile(fsPath, (err, data) => {
            if(err) throw err;
            const db = JSON.parse(data);
            let foundPost = false;
            let newDB = [];

            db.forEach((obj, i) => {
                obj.post_id === id ?
                    foundPost = true :
                    newDB.push(obj);
            })
            if(foundPost) {
                fs.writeFile(fsPath, JSON.stringify(newDB), err => console.log(err));
                res.status(200).json({
                    message: `Post ${id} deleted!`
                })
    
            } else {
                res.status(404).json({
                    message: `id: ${id} not found.`
                })
            }

        })
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
})

module.exports = router;