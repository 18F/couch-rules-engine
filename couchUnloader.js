const request = require('request');
const config = require('./config').options;

// Create URL to CouchDB instance and DB.
let dbName = process.argv[2];
let url = `${config.couchdb_url}${dbName}`;

// Remove old design documents.
request.get(url + '/_design_docs', (err, res, body) => {
    if (err) {
        console.log(`An error occurred: ${err.message}`);
    } else if (res.statusCode != 200) {
        console.log(`Unable to access CouchDB instance. Response code: ${res.statusCode}`);
    } else {
        let docs = JSON.parse(body);
        let rows = docs.rows;
        for (let row in rows) {
            let deleteUrl = `${url}/${rows[row].id}?rev=${rows[row].value.rev}`;
            request.delete(deleteUrl, (error) => {
                if (error) {
                    console.log(`Could not delete design document: ${rows[row].id}`);
                } else {
                    console.log(`Deleted design document ${rows[row].id}`);
                }
            });
        }
    }
});