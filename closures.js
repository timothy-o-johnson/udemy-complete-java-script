// study on closures

// function interviewQuestion(job){
//   if(job === 'designer'){
//     return function(name){
//       console.log(name + ', can you please explain what UX design is?')
//     }
//   } else if (job === 'teacher') {
//     return function(name) {
//       console.log('What subject do you teach, ' + name + '?')
//     }
//   } else {
//     return function(name) {
//       console.log('Hello ' + name + ', what do you do?')
//     }
//   }

//   }

function interviewQuestion (job) {
  return function (name) {
    if (job === 'designer') {
      console.log(name + ', can you please explain what UX design is?')
    } else if (job === 'teacher') {
      console.log('What subject do you teach, ' + name + '?')
    } else {
      console.log('Hello ' + name + ', what do you do?')
    }
  }
}

var interviewQuestionDesigner = interviewQuestion('designer')

var interviewQuestionTeacher = interviewQuestion('teacher')

var interviewQuestionGeneric = interviewQuestion('generic')

interviewQuestionDesigner('Jim')
interviewQuestionTeacher('Jamaica')
interviewQuestionGeneric('Lydia')
