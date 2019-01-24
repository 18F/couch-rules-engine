const fs = require('fs');
const path = require('path');

// The name of the test file to use
let fileName = process.argv[2];
filePath = path.join(__dirname, `/samples/${fileName}`);

// Simple logic to run through test scenarios
fs.readFile(filePath, 'utf8', function (err, contents) {
    if (!err) {

        // Parse the test file contents
        let newDoc = JSON.parse(contents);

        try {
            validateHouseholdSize(newDoc);
            validateIncome(newDoc);
            validateInterviewComplete(newDoc);
        }
        
        catch(error) {
            console.log(error);
        }

    } else {
        console.log('An error occurred: ' + err);
    }
});

// Validation rule for household size
let validateHouseholdSize = function (newDoc, oldDoc, userCtx, secObj) {
    if (newDoc.size < 2) {
        throw ({
            forbidden: 'Household size must be greater than 1.'
        });
    }
    if (!userCtx) {
        console.log('*** validateHouseholdSize: Passed ***');
    }

};

// Validation rule for household income
let validateIncome = function (newDoc, oldDoc, userCtx, secObj) {
    if (newDoc.income > 10000) {
        throw ({
            forbidden: 'Income must be lower than $10,000'
        });
    }
    if (!userCtx) {
        console.log('*** validateIncome: Passed ***');
    }

};

// Validation rule for beneficiary meeting with case worker
let validateInterviewComplete = function (newDoc, oldDoc, userCtx, secObj) {
    if (!newDoc.interview_verification_id) {
        throw ({
            forbidden: 'Interview must be completed and a valid meeting ID issued.'
        });
    }
    if (!userCtx) {
        console.log('*** validateInterviewComplete: Passed ***');
    }
};