const EventDate = require('../models/eventDate');

module.exports.verify = (req, res) => {
    res.json({
        success: true,
        message: 'Admin verified successfully',
        user: {
            registration_number: req.user.registration_number,
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
