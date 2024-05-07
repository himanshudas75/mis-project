const Course = require('../models/course');
const UserCourse = require('../models/userCourse');

module.exports.addCourses = async (req, res, next) => {
    const err = {
        statusCode: 404,
        message: 'Course not found',
    };

    const courses = req.body;
    // const course_ids = [];

    // for (const course of courses) {
    //     const found_course = await Course.findOne(course);
    //     if (found_course) course_ids.push(found_course._id);
    //     else return next(err);
    // }

    const userCourse = new UserCourse({
        registration_number: req.user.identity,
        courses: courses,
    });

    await userCourse.save();

    res.json({
        success: true,
        message: 'Courses added successfully',
        user: {
            registration_number: req.user.identity,
        },
    });
};

module.exports.getAllCourses = async (req, res, next) => {
    const courses = await Course.find({});

    res.json({
        success: true,
        message: 'Courses fetched successfully',
        courses: courses,
    });
};

module.exports.getUserCourses = async (req, res, next) => {
    console.log(req.user);
    const courses = await UserCourse.findOne({
        registration_number: req.user.identity,
    }).populate('courses');

    var c = [];
    if (courses) {
        c = courses.courses;
    }

    res.json({
        success: true,
        message: 'Courses fetched successfully',
        courses: c,
    });
};
