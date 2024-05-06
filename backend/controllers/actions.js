const EventDate = require('../models/eventDate');
const Department = require('../models/department');

module.exports.getEventDates = async (req, res, next) => {
    const eventDates = await EventDate.find({});

    res.json({
        success: true,
        message: 'Event dates fetched successfully',
        event_dates: eventDates,
    });
};

module.exports.getCourses = async (req, res, next) => {
    const courses = await Department.find({});

    res.json({
        success: true,
        message: 'Courses fetched successfully',
        courses: courses,
    });
};

module.exports.keepAlive = async (req, res, next) => {
    res.json({
        success: true,
        message: 'Server up and running',
    });
};
