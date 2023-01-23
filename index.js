const createEmployeeRecord = (array) => {
    return {
      firstName: array[0],
      familyName: array[1],
      title: array[2],
      payPerHour: array[3],
      timeInEvents: [],
      timeOutEvents: []
    }
  };

function createEmployeeRecords(array) {
  const multipleObjects = array.map(createEmployeeRecord)
  return multipleObjects
}

function createTimeInEvent (object, stampString) {
  const hourIn = Number(stampString.slice(11,stampString.length))
  const obj = { type: "TimeIn", hour: hourIn, date: stampString.slice(0,10)}
  object.timeInEvents.push(obj)
  return object
}

function createTimeOutEvent (object, stampString) {
  const hourOut = Number(stampString.slice(11,stampString.length))
  const obj = { type: "TimeOut", hour: hourOut, date: stampString.slice(0,10)}
  object.timeOutEvents.push(obj)
  return object
}

function hoursWorkedOnDate(object, date) {
  const timeIn = object.timeInEvents.find(element => element.date === date).hour
  const timeOut = object.timeOutEvents.find(element => element.date === date).hour
  const hoursWorked = timeOut - timeIn
  return hoursWorked / 100
}

function wagesEarnedOnDate(object, date) {
  const rate = object.payPerHour
  const term = hoursWorkedOnDate(object, date)
  const payAmount = rate * term
  return payAmount
}

function allWagesFor(object) {
  const objectIn = object.timeInEvents
  const datesIn = objectIn.map(function (entry) { return entry.date })
  const payableDays = datesIn.reduce(function (accumulator, currentValue) {
    return accumulator + wagesEarnedOnDate(object, currentValue)
  },0 ) 
  return payableDays;
}

function calculatePayroll(array) {
  const wagesArray = []
  for (let i = 0; i < array.length; i++) { 
  wagesArray.push(allWagesFor(array[i]))
}
  let sum = 0
  for (let j = 0; j < wagesArray.length; j++) {
    sum += wagesArray[j]
  }
  return sum
}