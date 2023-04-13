const Course = require('../models/Course');
const { multipleMongooseToObject } = require('../../until/mongoose');

class MeController{

    // [GET] /me/stored/course
    storedCourses(req, res, next) {
        Course.find({})
            .then(course => res.render('me/stored-courses',{
                courses: multipleMongooseToObject(course)
            }))
            .catch(next)
        // res.render('/me/stored-courses');
    }
}

module.exports = new MeController();