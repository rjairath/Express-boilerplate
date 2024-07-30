const express = require('express');
const Post = require('../models/Post');
const router = express.Router();

// @desc Get all posts, add limit for pagination
// @route GET /api/posts
router.get('/', async (req, res) => {
    const limit = req.query.limit;
    try {
        const posts = await Post.findAll();

        if(!isNaN(limit) && limit > 0) {
            return res.status(200).json(posts.slice(0, limit));
        }

        res.status(200).json(posts);
    } catch (error) {
        const err = new Error(`Error fetching Posts`);
        next(err);
    }
});

// @desc Get post by id
// @route GET /api/posts/:id
router.get('/:id', async (req, res, next) => {
    // Ensure type to avoid sql injection
    const id = parseInt(req.params.id);
    try {
        const [post] = await Post.findAll({
            where: {id}
        });
    
        if(!post) {
            const err = new Error(`Post with id ${id} not found`);
            err.status = 404
            return next(err);
        }
    
        res.status(200).json(post);
    } catch (error) {
        const err = new Error(`Error fetching Post`);
        next(err);
    }
});

// @desc Create a post
// @route POST /api/posts
router.post("/", async (req, res, next) => {
    if(!req.body.title) {
        const err = new Error(`Pls include title`);
        err.status = 400
        return next(err);
    }

    try {
        const post = await Post.create({ title: req.body.title });
        const [newPost] = await Post.findAll({
            where: {id: post.id}
        });
        res.status(201).json(newPost);
    } catch (error) {
        const err = new Error(`Error adding Post`);
        next(err);
    }   
});

// @desc Update a post
// @route PUT /api/posts/:id
router.put('/:id', async (req, res, next) => {
    const id = parseInt(req.params.id);
    try {
        const [updatedRowsCount] = await Post.update(
            { title: req.body.title },
            {
              where: {id}
            },
        );
        if(!updatedRowsCount) {
            const err = new Error(`Post with id ${id} not found`);
            err.status = 404
            return next(err);
        }
    
        const updatedPost = await Post.findByPk(id);
        res.status(200).json(updatedPost);
    } catch (error) {
        const err = new Error(`Error updating Post`);
        next(err);
    }
});

// @desc Delete a post
// @route DELETE /api/posts/:id
router.delete('/:id', async (req, res, next) => {
    const id = parseInt(req.params.id);
    try {
        const deletedRowsCount = await Post.destroy({
            where: {id},
        });
    
        if(!deletedRowsCount) {
            const err = new Error(`Post with id ${id} not found`);
            err.status = 404
            return next(err);
        }
    
        res.status(200).json({ msg: 'Deleted successfully'});
    } catch (error) {
        const err = new Error(`Error deleting Post`);
        next(err);
    }
});


module.exports = router;