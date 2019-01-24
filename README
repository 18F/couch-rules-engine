# Couch Rules: Using CouchDB as a Rules Engine

This is a prototype effort to evaluate the suitability of using [CouchDB](http://couchdb.apache.org/) as the foundation for a rules engine using the built in [document validation features](http://docs.couchdb.org/en/stable/ddocs/ddocs.html#validate-document-update-functions).

## CouchDB overview

CouchDB is a document-oriented database that stores documents in JSON format and supports [map/reduce](http://docs.couchdb.org/en/2.2.0/ddocs/ddocs.html#view-functions) for querying documents. CouchDB exposes a number of REST endpoints for interacting and managing single instances or clusters. In addition, CouchDB supports a special type of document called a [design document](http://docs.couchdb.org/en/2.2.0/ddocs/index.html) (prefixed in a CouchDB instance with `_design`) that are used to query, display, aggregate and validate updates to data in a CouchDB instance.

When creating or updating a document in a CouchDB database, validation functions are used to "prevent invalid or unauthorized document update requests from being stored."

> Document validation is optional, and each design document in the database may have at most one validation function. When a write request is received for a given database, the validation function in each design document in that database is called in an unspecified order. If any of the validation functions throw an error, the write will not succeed.

Validation functions offer a way to create sets of rules that can be applied to new or updated documents in a CouchDB database. It's not hard to imagine how this feature might be used as part of a data collection process, or as part of application for services or benefits. Validation rules can be used to ensure that only "valid" data is saved, or that only "eligible" applications for service are submitted.

## Potential benefits of this approach

* Ability to write validation rules in JavaScript.
* Ability to dis-aggregate complex rules into smaller bits of logic as separate design docs.
* Ability to create and use existing JavaScript testing frameworks to more effectively manage rule sets.
* Ability to replicate rule sets across CouchDB instances using built in [replication features](http://docs.couchdb.org/en/2.2.0/replication/index.html).

## Drawbacks / challenges

* Writing functions that are testable using traditional JS tooling and test frameworks *and* that are formatted to be inserted into CouchDB design docs seems not easy.
* It's unclear if this approach will work for more complex types of rules sets - for examples, rule sets that may need to support _partial_ eligibility for something, or graduated benefits.
* CouchDB is not traditionally used as a proper rules engine, so this might be pushing the envelope a bit on the tool.

