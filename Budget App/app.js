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

  var data = {
    allItems: {
      exp: [],
      inc: []
    },

    totals: {
      exp: 0,
      inc: 0
    }
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
    expensesContainer: '.expenses__list'
  }

  return {
    getInput: function () {
      return {
        type: document.querySelector(DOMstrings.inputType).value, // will be either inc (income) or exp (expense)
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: document.querySelector(DOMstrings.inputValue).value
      }
    },
    addListItem: function (obj, type) {
      var html, newHtml, element

      // create hmtl string with placeholder text
      if (type === 'inc') {
        element = DOMstrings.incomeContainer
        html =
          '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'

        //   html = `<div class="item clearfix" id="income-%id%">
        //     <div class="item__description">%description%</div>
        //     <div class="right clearfix">
        //         <div class="item__value">%value%</div>
        //         <div class="item__delete">
        //             <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
        //         </div>
        //     </div>
        // </div>`
      } else if (type === 'exp') {
        element = DOMstrings.expensesContainer
        html = ` <div class="item clearfix" id="income-%id%">
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
    var input, newItem
    // 1. Get field input data
    input = UIController.getInput()
    console.log(input)

    // 2. Add item to the budget controller
    newItem = budgetCtrl.addItem(input.type, input.description, input.value)
    budgetController.testing()

    // 3. Add item to the UI
    UICtrl.addListItem(newItem, input.type)

    // 4. Clear the fields
    UICtrl.clearFields()
    // 5. Calculate the budget
    // 6. Display the budget on the UI
  }

  return {
    init: function () {
      console.log('Application has started.')
      setUpEventListeners()
    }
  }
})(budgetController, UIController)

controller.init()
