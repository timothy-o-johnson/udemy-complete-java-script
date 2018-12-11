function Question (question, choices, answer) {
  return {
    question: question,
    choices: choices,
    answer: answer,
    displayQuestion: function () {
      var choices = this.choices
      var allChoices = ''

      for (var i = 0; i < choices.length; i++) {
        allChoices += i + ': ' + choices[i] + '\n'
      }

      return this.question + '\n' + allChoices
    }
  }
}

var guessMyBirthday = Question("When's my birthday?", ['July 1', 'Oct 3', 'Sep 24'], 0)
var guessCurrentLocation = Question('Where do I live these days?', ['Germany', 'Chicago', 'Detroit'], 2)
var guessFavoriteAuthor = Question("Who's my favorite author?", ['Sylvia Plath', 'David Foster Wallace', 'Dr Seuss'], 1)

var questions = [guessMyBirthday, guessCurrentLocation, guessFavoriteAuthor]
var playAgain = 'y'

function playRound (questions) {
  // select random questions
  var whichQuestion = Math.ceil(Math.random() * questions.length - 1)
  var question = questions[whichQuestion]

  question.displayQuestion()

  var answer = window.prompt(question.displayQuestion())

  if (answer === question.answer.toString()) {
    console.log('bing bong! that is correct')
  } else {
    console.log('oops! try again')
  }

  playAgain = prompt('Play again?').toLowerCase()

  return playAgain
}

while (playAgain === 'y' || playAgain === 'yes') {
  playRound(questions)
}

console.log("that's the end friend!")
