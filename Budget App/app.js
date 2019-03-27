// testing git email update

// BUDGET CONTROLLER
var budgetController = (function () {
  var Expense = function (id, description, value) {
    this.id = id
    this.description = description
    this.value = value
  }

  var Income = function (id, description, value) {
    this.id = id
    this.description = description
    this.value = value
  }

  var calculateTotal = function (type) {
    var sum = 0
    data.allItems[type].forEach(function (cur) {
      sum += cur.value
    })

    data.totals[type] = sum
  }

  var data = {
    allItems: {
      exp: [],
      inc: []
    },

    totals: {
      exp: 0,
      inc: 0
    },
    budget: 0,
    percentage: -1
  }

  return {
    addItem: function (type, des, val) {
      var newItem

      // determine which array to add element
      var array = data.allItems[type]
      var position = array.length - 1

      // determine ID value by ++ the ID of the last element in the array
      // if there's nothing in the array set ID to 1
      var ID = position < 0 ? 1 : array[position].id + 1

      if (type === 'exp') {
        newItem = new Expense(ID, des, val)
      } else if (type === 'inc') {
        newItem = new Income(ID, des, val)
      }

      array.push(newItem)

      return newItem
    },

    calculateBudget: function () {
      // calculate total income and expenses

      calculateTotal('exp')
      calculateTotal('inc')

      // calculate the budget: income - expenses
      data.budget = data.totals.inc - data.totals.exp

      // calculate the percentage of income that we spent
      if (data.totals.inc > 0) {
        data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100)
      } else {
        data.percentage = -1
      }
    },

    getBudget: function () {
      return {
        budget: data.budget,
        totalInc: data.totals.inc,
        totalExp: data.totals.exp,
        percentage: data.percentage
      }
    },
    testing: function () {
      console.log(data)
    }
  }
})()

// UI CONTROLLER
var UIController = (function () {
  var DOMstrings = {
    inputType: '.add__type',
    inputDescription: '.add__description',
    inputValue: '.add__value',
    inputAddBtn: '.add__btn',
    incomeContainer: '.income__list',
    expensesContainer: '.expenses__list',
    budgetLabel: '.budget__value',
    incomeLabel: '.budget__income--value',
    expenseLabel: '.budget__expenses--value',
    perecentageLabel: '.budget__expenses--percentage'
  }

  return {
    getInput: function () {
      return {
        type: document.querySelector(DOMstrings.inputType).value, // will be either inc (income) or exp (expense)
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
      }
    },
    addListItem: function (obj, type) {
      var html, newHtml, element

      // create hmtl string with placeholder text
      if (type === 'inc') {
        element = DOMstrings.incomeContainer
        html =
          '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
      } else if (type === 'exp') {
        element = DOMstrings.expensesContainer
        html = ` <div class="item clearfix" id="inc-%id%">
            <div class="item__description">%description%</div>
            <div class="right clearfix">
                <div class="item__value">%value%</div>
                <div class="item__delete">
                    <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                </div>
            </div>
            </div>`
      }

      // replace placeholder text with some actual data
      newHtml = html.replace('%id%', obj.id)
      newHtml = newHtml.replace('%description%', obj.description)
      newHtml = newHtml.replace('%value%', obj.value)

      // insert html into the dom
      document.querySelector(element).insertAdjacentHTML('beforeend', newHtml)
    },

    clearFields: function () {
      var fields, fieldsArr

      fields = document.querySelectorAll(DOMstrings.inputDescription + ',' + DOMstrings.inputValue)

      fieldsArr = Array.prototype.slice.call(fields)

      fieldsArr.forEach(function (current, index, array) {
        current.value = ''
      })

      fieldsArr[0].focus()
    },

    displayBudget: function (obj) {
      document.querySelector(DOMstrings.budgetLabel).textContent = obj.budget
      document.querySelector(DOMstrings.incomeLabel).textContent = obj.totalInc
      document.querySelector(DOMstrings.expenseLabel).textContent = obj.totalExp
      document.querySelector(DOMstrings.perecentageLabel).textContent =
        obj.percentage === -1 ? '---' : obj.percentage + ' %'
    },
    getDOMstrings: function () {
      return DOMstrings
    }
  }
})()

// GLOBAL APP CONTROLLER
var controller = (function (budgetCtrl, UICtrl) {
  var initialValues = {
    budget: 0,
    totalInc: 0,
    totalExp: 0,
    percentage: -1
  }

  function setUpEventListeners () {
    var DOMstrings = UIController.getDOMstrings()

    document.querySelector(DOMstrings.inputAddBtn).addEventListener('click', ctrlAddItem)

    document.addEventListener('keypress', function (event) {
      // if(event = )
      if (event.keyCode === 13 || event.which === 13) {
        console.log('and that there, my friend, is how you press enter!')

        ctrlAddItem()
      }
    })
  }

  var updateBudget = function () {
    // 1. Calculate the budget
    budgetCtrl.calculateBudget()

    // 2. Return the budget
    var budget = budgetCtrl.getBudget()

    // 3. Display the budget on the UI
    UICtrl.displayBudget(budget)
  }

  var ctrlAddItem = function () {
    var input, newItem
    // 1. Get field input data
    input = UIController.getInput()

    if (input.description !== '' && !isNaN(input.value) && input.value > 0) {
      // 2. Add item to the budget controller
      newItem = budgetCtrl.addItem(input.type, input.description, input.value)
      budgetController.testing()

      // 3. Add item to the UI
      UICtrl.addListItem(newItem, input.type)

      // 4. Clear the fields
      UICtrl.clearFields()

      // Calculate and update budget
      updateBudget()
    }
  }

  var ctrlDeleteItem = function(event) {

    var itemID
    var splitID
    var type
    var ID

    itemID = event.target.parentNode.parentNode.parentNode.parentNode.id

    if (itemID){
      // inc-1
      splitID = itemID.split('-')
      type = splitID[0]
      ID = splitID[1]

      // 1. delete item from data structure
      // 2. delete item from the UI
      // 3. update and show new budget
    }

  }


  return {
    init: function () {
      console.log('Application has started.')
      UICtrl.displayBudget(initialValues)
      setUpEventListeners()
    }
  }
})(budgetController, UIController)

controller.init()
