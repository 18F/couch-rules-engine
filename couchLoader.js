const request = require('request');
const validators = require('./index');

// Create URL to CouchDB instance and DB.
let dbName = process.argv[2];
let urlBase = 'http://localhost:5984/';
let url = urlBase + dbName;

for (let validator in validators) {

    // Create new design doc and POST to CouchDB
    let doc = {};
    doc._id = `_design/${validator}`;
    doc.validate_doc_update = `${validators[validator][validator]}`;

    request.post(url, {
        json: doc
    }, function (err, res, body) {
        if (err) {
            console.log(`An error occurred: ${err.message}`);
        } else {
            console.log(`Successfully loaded ${validator} validator`);
        }

    });

}