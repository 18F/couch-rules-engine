const request = require('request');
const validators = require('./index');
const config = require('./config').options;

// Create URL to CouchDB instance and DB.
let dbName = process.argv[2];
let url = `${config.couchdb_url}${dbName}`;

// Insert new design documents.
for (let validator in validators) {

    // Create new design doc and POST to CouchDB
    let doc = {};
    doc._id = `_design/${validator}`;
    doc.validate_doc_update = `${validators[validator][validator]}`;

    request.post(url, {
        json: doc
    }, (err) => {
        if (err) {
            console.log(`An error occurred: ${err.message}`);
        } else {
            console.log(`Successfully loaded ${validator} validator`);
        }

    });

}