const { default: mongoose } = require("mongoose");
const slug = require("mongoose-slug-generator");

mongoose.plugin(slug);

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Course = new Schema({
    name: { type: String, maxLength: 255},
    description: { type: String},
    image: { type: String},
    videoID: { type: String},
    level: { type: String},
    slug: { type: String, slug: 'name', unique: true }

}, {
    timestamps: true
});
module.exports = mongoose.model('Course', Course);