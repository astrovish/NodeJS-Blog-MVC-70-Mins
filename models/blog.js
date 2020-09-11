const mongoose = require("mongoose");
const { default: slugify } = require("slugify");

const blogSchema = new mongoose.Schema({
    title: {
        desc: "Title of a blog",
        trim: true,
        type: String,
        required: true
    },
    body: {
        desc: "Description of a blog",
        trim: true,
        type: String,
        required: true
    },
    userId: {
        desc: "Id of the user who created a blog",
        type: Number,
        required: true,
        default: 23
    },
    slug: {
        desc: "User friendly URL required for SEO purpose",
        type: String,
        required: true
    }
})

blogSchema.pre("validate", function(next) {
    if( this.title ) {
        this.slug = slugify(this.title, {
            lower: true,
            strict: true
        })
    }

    next();
})

module.exports = mongoose.model("Blog", blogSchema);