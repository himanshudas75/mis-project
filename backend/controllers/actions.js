const EventDate = require('../models/eventDate');

module.exports.getEventDates = async (req, res, next) => {
    const eventDates = await EventDate.find({});

    res.json({
        success: true,
        message: 'Event dates fetched successfully',
        event_dates: eventDates,
    });
};

module.exports.keepAlive = async (req, res, next) => {
    res.json({
        success: true,
        message: 'Server up and running',
    });
};
