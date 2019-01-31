// Validation rule for number of dependents in household
exports.numberOfDependents = function (doc) {
    if (doc.numberOfDependents < 2) {
        throw ({
            forbidden: 'The number of dependents in the household must be 1 or more.'
        });
    }
    return true;
};