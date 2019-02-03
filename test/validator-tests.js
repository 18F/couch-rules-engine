const fs = require('fs');
const path = require('path');
const assert = require('assert');
const validators = require('../index');

// The name of the test file to use
let validApplicationFile = path.join(__dirname, '/../samples/sample_person_valid.json');
let invalidApplicationFile = path.join(__dirname, '/../samples/sample_person_invalid.json');

describe('CouchDB Validator tests', function () {

    let validApp, invalidApp;

    before(function (done) {
        validApp = JSON.parse(fs.readFileSync(validApplicationFile).toString());
        invalidApp = JSON.parse(fs.readFileSync(invalidApplicationFile).toString());
        done();
    });

    describe('*** Valid tests', function () {

        it('Should accept valid household income level', function (done) {
            assert.equal(validators.householdIncome.householdIncome(validApp), true);
            done();
        });

        it('Should accept valid household size', function (done) {
            assert.equal(validators.householdSize.householdSize(validApp), true);
            done();
        });

        it('Should accept valid interview status', function (done) {
            assert.equal(validators.interviewComplete.interviewComplete(validApp), true);
            done();
        });

        it('Should accept valid number of dependents', function (done) {
            assert.equal(validators.numberOfDependents.numberOfDependents(validApp), true);
            done();
        });

    });

    describe('*** Invalid tests', function () { 

        it('Should reject invalid household income level', function (done) {  
            assert.throws(function() { validators.householdIncome.householdIncome(invalidApp); }, Object);
            done();
        });

        it('Should reject invalid household size', function (done) {  
            assert.throws(function() { validators.householdSize.householdSize(invalidApp); }, Object);
            done();
        });

        it('Should reject invalid interview status', function (done) {  
            assert.throws(function() { validators.interviewComplete.interviewComplete(invalidApp); }, Object);
            done();
        });

        it('Should reject invalid number of dependents', function (done) {  
            assert.throws(function() { validators.numberOfDependents.numberOfDependents(invalidApp); }, Object);
            done();
        });

    });

});