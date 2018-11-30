function Question (question, choices, answer) {
  return {
    question: question,
    choices: choices,
    answer: answer,
    displayQuestion: function () {
      var choices  
      
      for(var i = 0; i < choices.length ; i++){
        choices += i + ': '  + choices[i] + '/n'
      }
      
      return question + '( ' + choices + ' )'
    }
  }
}

var guessMyBirthday = Question("When's my birthday?", ['July 1', 'Oct 3', 'Sep 24'], 0)
var guessCurrentLocation = Question('When do I live these days?', ['Germany', 'Chicago', 'Detroit'], 2)
var guessFavoriteAuthor = Question("Who's my favorite author?", ['Sylvia Plath', 'David Foster Wallace', 'Dr Seuss'], 1)

var questions = [guessMyBirthday, guessCurrentLocation, guessFavoriteAuthor]

function playRound (questions) {
 // select random questions
  var whichQuestion = Math.ceil(Math.random * questions.length)
  var question = questions[whichQuestion]

  var  answer = prompt(question.displayQuestion())

  if(answer === question.answer){
    console.log('bing bong! that is correct')
  } else {
    console.log('oops! try agin')
  }

  playAgain = prompt('Play again?').toLowerCase
  
  return playAgain
}


var playAgain

playAgain = playRound()

while(playAgain === 'y' || playAgain === 'yes'){
  playRound()
} 

console.log("that's the end friend!")
