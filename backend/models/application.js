const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const applicationSchema = new Schema({
    registration_number: {
        type: String,
        required: true,
        unique: true,
    },
    steps_reached: {
        type: Number,
    },
    applicant_name: {
        type: String,
    },
    guardian_name: {
        type: String,
    },
    guardian_mobile_no: {
        type: String,
    },
    relationship_of_guardian: {
        type: String,
    },
    category: {
        type: String,
    },
    pwd: {
        type: String,
    },
    nationality: {
        type: String,
    },
    religion: {
        type: String,
    },
    marital_status: {
        type: String,
    },
    dob: {
        type: String,
    },
    email: {
        type: String,
    },
    mobile_no: {
        type: String,
    },
    aadhaar_no: {
        type: String,
    },
    gender: {
        type: String,
    },
    correspondence_address: {
        line1: String,
        line2: String,
        line3: String,
        city_and_district: String,
        state: String,
        pincode: String,
        country: String,
    },
    permanent_address: {
        line1: String,
        line2: String,
        line3: String,
        city_and_district: String,
        state: String,
        pincode: String,
        country: String,
    },
    cat_registration_number: {
        type: String,
    },
    cat_percentile: {
        type: String,
    },
    cat_quantitative_percentile: {
        type: String,
    },
    cat_quantitative_score: {
        type: String,
    },
    cat_verbal_score: {
        type: String,
    },
    cat_verbal_percentile: {
        type: String,
    },
    cat_data_interpretation_percentile: {
        type: String,
    },
    cat_data_interpretation_score: {
        type: String,
    },
    cat_score: {
        type: String,
    },
    priority1: {
        type: String,
    },
    priority2: {
        type: String,
    },
    priority3: {
        type: String,
    },
    agreement: {
        type: String,
    },
    tenth_class: {
        school_name: String,
        result_status: String,
        grade_type: String,
        year_of_passing: String,
        score: Number,
    },
    twelfth_class: {
        college_name: String,
        result_status: String,
        grade_type: String,
        year_of_passing: String,
        score: Number,
    },
    ug: {
        name_of_the_exam: String,
        college_name: String,
        result_status: String,
        grade_type: String,
        year_of_passing: String,
        score: Number,
    },
    pg: [],
    has_workexperience: {
        type: String,
    },
    work_experience: [
        {
            designation: String,
            organization: String,
            nature_of_work: String,
            duration: Number,
            sector: String,
        },
    ],
    total_workexperience: Number,
});

module.exports = mongoose.model('Application', applicationSchema);
