# Couch Rules: Using CouchDB as a Rules Engine

This is a prototype effort to evaluate the suitability of using [CouchDB](http://couchdb.apache.org/) as the foundation for a rules engine using the built in [document validation features](http://docs.couchdb.org/en/stable/ddocs/ddocs.html#validate-document-update-functions).

## CouchDB overview

CouchDB is a document-oriented database that stores documents in JSON format and supports [map/reduce](http://docs.couchdb.org/en/2.2.0/ddocs/ddocs.html#view-functions) for querying documents. CouchDB exposes a number of [REST endpoints](https://docs.couchdb.org/en/latest/intro/api.html) for interacting and managing single instances or clusters. In addition, CouchDB supports a special type of document called a [design documents](http://docs.couchdb.org/en/2.2.0/ddocs/index.html) that are used to query, display, aggregate and validate updates to data in a CouchDB database.

When creating or updating a document in a CouchDB database, validation functions are used to "prevent invalid or unauthorized document update requests from being stored."

> Document validation is optional, and each design document in the database may have at most one validation function. When a write request is received for a given database, the validation function in each design document in that database is called in an unspecified order. If any of the validation functions throw an error, the write will not succeed.

Validation functions offer a way to create sets of rules that can be applied to new or updated documents when they are inserted or changed in a CouchDB database. It's not hard to imagine how this feature might be used as part of a data collection process, or as part of an application for services or benefits. 

Validation rules can be used to ensure that only "valid" data is saved, or that only "eligible" applications for services are accepted.

## Potential benefits of this approach

* Ability to write validation rules in JavaScript.
* Ability to dis-aggregate complex rules into smaller bits of logic as separate, standalone design docs.
* Ability to create and use existing JavaScript testing frameworks to more effectively manage rule sets.
* Ability to replicate rule sets across CouchDB instances using built in [replication features](http://docs.couchdb.org/en/2.2.0/replication/index.html).

## Drawbacks / challenges

* Writing validation functions that are testable using traditional JS tooling and test frameworks *and* that are formatted to be inserted into CouchDB design docs seems not easy.
* It's unclear if this approach will work for more complex types of rules sets - for examples, rule sets that may need to support _partial_ eligibility for something, or graduated benefits or services.
* CouchDB is not traditionally used as a proper rules engine, so this might be pushing the envelope a bit on the tool.

## Using this prototype

Clone this repo and `cd` into the project directory. Install dependencies: `npm install`.

To run CouchDB locally via Docker:

```bash
~$ docker pull couchdb
~$ docker run -p 5984:5984 -d couchdb
```

Check that your instance is running:

```bash
~$ curl http://localhost:5984/
```

Create a test database:

```bash
~$ curl -X PUT http://localhost:5984/test
```

Populate the database with the validation rules (located in the `validators` directory):

```bash
~$ npm run load test
```

Test submitting a **valid** application for service (located in the `samples` directory):

```bash
~$ curl -X POST http://localhost:5984/test -d @samples/sample_person_valid.json -H 'Content-type: application/json'
```

Sample result:

```json
{
  "ok": true,
  "id": "7e2d9fe77a60c59bdc4d0f48e50111d4",
  "rev": "1-756e1cc042469549bba59e49813b866a"
}
```

Test submitting an **invalid** application for service (located in the `samples` directory):

```bash
~$ curl -X POST http://localhost:5984/test -d @samples/sample_person_invalid.json -H 'Content-type: application/json'
```

Sample result:

```json
{
  "error": "forbidden",
  "reason": "Income must be lower than $25,000"
}
```