exports.options = {
    couchdb_url: `http://${process.argv[3]}:${process.argv[4]}@localhost:5984/` || process.argv[5]
}