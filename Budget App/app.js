// testing git username update

// BUDGET CONTROLLER
var budgetController = (function () {
  // some code
})()

// UI CONTROLLER
var UIController = (function () {
  var DOMstrings = {
    inputType: '.add__type',
    inputDescription: '.add__description',
    inputValue: '.add__value',
    inputAddBtn: '.add__btn'
  }

  return {
    getInput: function () {
      return {
        type: document.querySelector(DOMstrings.inputType).value, // will be either inc or exp
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: document.querySelector(DOMstrings.inputValue).value
      }
    },
    DOMstrings: DOMstrings
  }
})()

// GLOBAL APP CONTROLLER
var controller = (function (budgetCtrl, UICtrl) {
  function setUpEventListeners () {
    var DOMstrings = UIController.DOMstrings

    document.querySelector(DOMstrings.inputAddBtn).addEventListener('click', ctrlAddItem)

    document.addEventListener('keypress', function (event) {
      // if(event = )
      if (event.keyCode === 13 || event.which === 13) {
        console.log('and that there, my friend, is how you press enter!')

        ctrlAddItem()
      }
    })
  }

  var ctrlAddItem = function () {
    // 1. Get field input data
    var input = UIController.getInput()
    console.log(input)

    // 2. Add the item to the budget controller
    // 3. Add the item to the UI
    // 4. Calculate the budget
    // 5. Display the budget on the UI
  }

  return {
    init: function () {
      console.log('Application has started.')
      setUpEventListeners()
    }
  }
})(budgetController, UIController)

controller.init()
