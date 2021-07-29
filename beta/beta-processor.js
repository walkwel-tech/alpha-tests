require('core-js'); // <- at the top of your entry point
const _ = require('lodash');
const winston = require('winston');

const maxMarks = 50;


const groupBy =(array,key)=>{
	let newArray = array.reduce((result, currentValue) => {
    	(result[currentValue[key]] = result[currentValue[key]] || []).push(
			currentValue);
    	return result;
	},{});
	

	let objArray = [];
	Object.keys(newArray).forEach(key => objArray.push({
	   name: key,students: newArray[key]
	}));


	return objArray 
};





const processData = (data) => {
	//InitialProcessing of Data
	let processedData = data.map(student => {
		return {...student,title:student.name.first +' '+student.name.last,
			totalMarks: student.marks.reduce ( (totalMarks, subject) => {
		
    			return totalMarks +=(((subject.marks / maxMarks) * 100) >= 33)
					? subject.marks:0;
        	}, 0)}

    }).sort((studentA,studentB)=>{
		return studentB.totalMarks -studentA.totalMarks;
	});

	// top marks Values 
	let studentSort = processedData.map(student=>{
		let tempStudent = student.title+' from '+student.class
			+' obtained '+student.totalMarks
		return tempStudent;
	});


	let intState= groupBy(processedData,'class');

	let finalArray = {records:intState,top:studentSort}; 
	return finalArray;
}

module.exports = {
    processData
}
