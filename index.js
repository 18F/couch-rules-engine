const householdIncome = require('./validators/householdIncome');
const householdSize = require('./validators/householdSize');
const interviewComplete = require('./validators/interviewComplete');
const numberOfDependents = require('./validators/numberOfDependents');

 module.exports = {
    householdIncome: householdIncome,
    householdSize: householdSize,
    interviewComplete: interviewComplete,
    numberOfDependents: numberOfDependents
};