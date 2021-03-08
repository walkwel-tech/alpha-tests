// Logic is made to get the final result as expected, this is done on the basis of angular typescript file.
import * as data from './data-from-api.json';  // Importing the local JSON file.
member  = (data as any).default;  // This is to To fetch the data from the local JSON file.
processMember() {
     let teacher = [];
     let student = [];
     this.member.members.forEach((x) => {
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
         y['students'] = stud;
         y['marks']= s
     })
  this.member.schools.forEach((s) => {
      let memb = [];
      memb = teacher.filter((t) => {
          return s.id === t.school_id;
      })
      let  m = memb.map(item => item.marks? item.marks: 0).reduce((prev, next) => prev + next);
      s['members'] = memb;
      s['marks']= m
  })
  const finalResult = this.member.schools.sort((a, b) => {
    return b.marks - a.marks;
});
   return finalResult;
 }
