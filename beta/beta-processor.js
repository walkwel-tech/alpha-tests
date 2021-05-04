require('core-js'); // <- at the top of your entry point
const _ = require('lodash');
const winston = require('winston');

const maxMarks = 50;

const processData = (data) => {
    let finalData = [];

    data = data.map(student => {
        student.totalMarks = student.marks.reduce ( (totalMarks, subject) => {
            totalMarks += (((subject.marks / maxMarks) * 100) >= 33) ? subject.marks : 0;
        }, 0);

        return student;
    });

    let classes =  _.groupBy(data, 'class');

    return finalData;
}

module.exports = {
    processData
}
