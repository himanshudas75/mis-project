const EventDate = require('../models/eventDate');
const Course = require('../models/course');

module.exports.isAdmin = (req, res) => {
    console.log(req);

    res.json({
        success: true,
        message: 'Logged in user is an Admin',
        user: {
            registration_number: req.user.identity,
        },
    });
};

module.exports.setEventDates = async (req, res, next) => {
    const { event_name, date } = req.body;

    const eventDate = new EventDate({
        event_name,
        date,
    });

    const savedEventDate = await eventDate.save();

    res.json({
        success: true,
        message: 'Event dated added successfully',
        event_date: eventDate,
    });
};

module.exports.deleteEventDate = async (req, res, next) => {
    let eventDate = null;
    if (req.query.id) {
        const id = req.query.id;
        eventDate = await EventDate.findOneAndDelete({ _id: id });
        if (!eventDate) {
            return next({
                statusCode: 404,
                message: 'Event Date not found',
            });
        }
    } else {
        return next({
            statusCode: 404,
            message: 'Missing query parameters',
        });
    }

    res.json({
        success: true,
        message: 'Event dated deleted successfully',
        event_date: eventDate,
    });
};

module.exports.addCourses = async (req, res, next) => {
    const courses = req.body;

    await Course.insertMany(courses);

    res.json({
        success: true,
        message: 'Courses added successfully',
    });
};

module.exports.deleteCourse = async (req, res, next) => {
    await Course.deleteMany();

    res.json({
        success: true,
        message: 'All courses deleted',
    });
};
