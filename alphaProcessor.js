require('core-js'); // <- at the top of your entry point
const _ = require('lodash');
const winston = require('winston');

const processData = (data) => {
    // let finalData = [];
    let teacher = [];
    let student = [];
    data.members.forEach((x) => {
        if(x.teacher_id === null){
          teacher = [...teacher, x]
        }else{
            student = [...student,x]
        }
    })
    teacher.forEach((y) => {
        let stud = [];
         stud = student.filter((x) => {
           return x.teacher_id === y.id;
        })
        let t=0;
      let  s = stud.map(item => item.marks? item.marks: 0).reduce((prev, next) => prev + next);
      const $stud = stud.sort((a, b) => {
        return b.marks - a.marks;
    });
        y['students'] = stud;
        y['marks']= s
    })
 data.schools.forEach((s) => {
     let memb = [];
     memb = teacher.filter((t) => {
         return s.id === t.school_id;
     })
     let  m = memb.map(item => item.marks? item.marks: 0).reduce((prev, next) => prev + next);
     const mem = memb.sort((a, b) => {
        return b.marks - a.marks;
    });
     s['members'] = memb;
     s['marks']= m
 })
 const finalData = data.schools.sort((a, b) => {
   return b.marks - a.marks;
});
    return finalData;
}

module.exports = {
    processData
}
