var years = [1990, 1965, 1937, 2005, 1998]

function arrayCalc (arr, fn) {
  var arrRes = []
  for (var i = 0; i < arr.length; i++) {
    arrRes.push(fn(arr[i]))
  }
  return arrRes
}

function calculateAge (el) {
  return 2016 - el
}

function isFullAge (limit, el) {
  return el >= limit
}

var ages = arrayCalc(years, calculateAge)

var fullJapan = arrayCalc(ages, isFullAge.bind(this, 20))

console.log(ages)
console.log(fullJapan)
