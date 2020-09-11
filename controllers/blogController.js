const Blog = require("../models/blog");
const { default: slugify } = require("slugify");

// create blog
const createBlog = (req, res) => {
    res.render("create", {
        pageTitle: "Create Blog",
        blog: {title: "", body: ""}
    })
}

// insert blog
const insertBlog = async (req, res) => {
    try {
        const blog = Blog({
            title: req.body['blog-title'],
            body: req.body['blog-body']
        })
        await blog.save();
        res.redirect("/blogs");
    } catch(e) {
        res.send(e.message);
    }
}

// edit blog
const editBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        res.render("edit", {
            pageTitle: "Edit Blog",
            blog
        })
    } catch(e) {
        res.redirect("/404");
    }
}

// update blog
const updateBlog = async (req, res) => {
    try {
        const blog = {
            title: req.body['blog-title'],
            body: req.body['blog-body'],
            userId: 21,
            slug: slugify(req.body['blog-title'], {
                lower: true,
                strict: true
            })
        }
        await Blog.findByIdAndUpdate(req.params.id, blog);
        res.redirect("/blogs");
    } catch(e) {
        res.send(e.message);
    }
}

// delete blog
const deleteBlog = async (req, res) => {
    try {
        await Blog.findByIdAndDelete(req.params.id);
        res.redirect("/blogs");
    } catch(e) {
        res.redirect("/404");
    }
}

// all blogs
const allBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.render("blogs", {
            pageTitle: "All Blogs",
            blogs
        })
    } catch(e) {
        res.redirect("/404");
    }
}

// blog detail
const blogDetail = async (req, res) => {
    try {
        const blog = await Blog.findOne({slug: req.params.slug});
        res.render("blog", {
            pageTitle: blog.title,
            blog
        })
    } catch(e) {
        res.redirect("/404");
    }
}

module.exports = {
    createBlog,
    insertBlog,
    editBlog,
    updateBlog,
    deleteBlog,
    allBlogs,
    blogDetail
}