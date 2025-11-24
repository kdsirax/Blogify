const { Router } = require("express");

const multer = require('multer');
const router = Router();
const path = require('path');
const Blog = require("../models/blog");
const Comment = require("../models/comment");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve(`./public/uploads`));
    },
    filename: function (req, file, cb) {
        const fileName = `${Date.now()}-${file.originalname}`;
        cb(null, fileName);
    },
});

const upload = multer({ storage: storage });

router.get('/new-add', (req, res, next) => {
    // This is the middleware part
    if (!req.user) {
        return res.redirect('/user/signin');
    }
    // If req.user exists, proceed to the route handler
    next();
}, (req, res) => {
    // This part only runs if the user is logged in
    return res.render('addblog', { user: req.user });
});

router.get('/:id', async (req, res) => {
    const blog = await Blog.findById(req.params.id).populate('createdBy')
    .populate({ // This is the new part to populate comments
        path: 'comments',
        populate: {
            path: 'createdBy' // Populates the author for each comment
        }
    });
    if (!blog) {
        return res.status(404).send("Blog not found");
    }

    return res.render("blog", { user: req.user, blog });
});


router.post('/comment/:blogId', async (req, res) => {
    const comment =await Comment.create({
        content: req.body.content,
        blogId: req.params.blogId,
        createdBy: req.user._id
    });

     await Blog.findByIdAndUpdate(req.params.blogId, {
        $push: { comments: comment._id },
    });
    return res.redirect(`/blog/${req.params.blogId}`);
});





router.post('/add-new', upload.single('coverImage'), async (req, res) => {

    const { title, body } = req.body;

    // Check if a file was uploaded
    if (!req.file) {
        return res.status(400).render('addblog', {
            user: req.user,
            error: "Cover image is required.",
        });
    }

    try {
        const blog = await Blog.create({
            title,
            body,
            createdBy: req.user._id, // Assumes req.user has the user's ID
            coverImageURL: `/uploads/${req.file.filename}`, // Path to the uploaded file
        });
        return res.redirect(`/blog/${blog._id}`); // Redirect to homepage or the new blog page
    } catch (error) {
        console.error("Error creating blog:", error);
        return res.render('addblog', {
            user: req.user,
            error: "Failed to create blog. Please try again.",
        });
    }
});

module.exports = router;