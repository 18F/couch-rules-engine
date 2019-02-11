const fs = require('fs');
const path = require('path');
const assert = require('assert');
const validators = require('../index');

// The name of the test file to use
let validApplicationFile = path.join(__dirname, '/../samples/sample_person_valid.json');
let invalidApplicationFile = path.join(__dirname, '/../samples/sample_person_invalid.json');

describe('CouchDB Validator tests', () => {

    // Variables to hold valid and invalid documents to test.
    let validApp, invalidApp;

    // Parse valid and invalid JSON docs and assign.
    before((done) => {
        validApp = JSON.parse(fs.readFileSync(validApplicationFile).toString());
        invalidApp = JSON.parse(fs.readFileSync(invalidApplicationFile).toString());
        done();
    });

   // Tests for valid applications using validApp.
    describe('*** Valid tests', () => {

        it('Should accept valid household income level', (done) => {
            assert.equal(validators.householdIncome.householdIncome(validApp), true);
            done();
        });

        it('Should accept valid household size', (done) => {
            assert.equal(validators.householdSize.householdSize(validApp), true);
            done();
        });

        it('Should accept valid interview status', (done) => {
            assert.equal(validators.interviewComplete.interviewComplete(validApp), true);
            done();
        });

        it('Should accept valid number of dependents', (done) => {
            assert.equal(validators.numberOfDependents.numberOfDependents(validApp), true);
            done();
        });

    });

    // Tests for invalid applications using invalidApp.
    describe('*** Invalid tests', () => { 

        it('Should reject invalid household income level',  (done) => {  
            assert.throws(() => { validators.householdIncome.householdIncome(invalidApp); }, Object);
            done();
        });

        it('Should reject invalid household size',  (done) => {  
            assert.throws(() => { validators.householdSize.householdSize(invalidApp); }, Object);
            done();
        });

        it('Should reject invalid interview status',  (done) => {  
            assert.throws(() => { validators.interviewComplete.interviewComplete(invalidApp); }, Object);
            done();
        });

        it('Should reject invalid number of dependents',  (done) => {  
            assert.throws(() => { validators.numberOfDependents.numberOfDependents(invalidApp); }, Object);
            done();
        });

    });

});