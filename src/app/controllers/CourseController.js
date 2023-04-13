const Course = require('../models/Course');
const { mongooseToObject } = require('../../until/mongoose');

class CourseController{

    // [GET] /courses/:slug
    show(req,res,next) {
        Course.findOne({slug: req.params.slug})
            .then(course => {
                res.render('courses/show.hbs', {course: mongooseToObject(course)});
            })
            .catch(next)
    }
    // [GET] /courses/create

    create(req,res) {
        res.render('courses/create');
    }

    //[POST] /courses/store
    store(req, res, next) {
        const formData = req.body;
        formData.image = `https://i.ytimg.com/vi/${formData.videoID}/hqdefault.jpg`;
        const course = new Course(formData);
        course.save()
            .then(() => {
                res.redirect('/');
            })
            .catch(next)
    }
    //[POST] /courses/:id/edit
    edit(req, res, next) {
        Course.findById(req.params.id)
            .then(course => res.render('courses/edit', {
                course: mongooseToObject(course)
            }))
            .catch(next)
    }

    //[PUT] /courses/:id/
    update(req, res, next) {
        Course.updateOne({_id: req.params.id}, req.body)
            .then(() => res.redirect('/me/stored/courses'))
            .catch(next)
    }
    //[DELETE] /:id/
    destroy(req,res,next) {
        Course.deleteOne({
            _id: req.params.id
        })
            .then(() => res.redirect('back'))
            .catch(next)
    }
}

module.exports = new CourseController();