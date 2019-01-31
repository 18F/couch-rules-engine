// Validation rule for household size
exports.householdSize = function (doc) {
    if (doc.householdSize < 3) {
        throw ({
            forbidden: 'Household size must be greater than 2.'
        });
    }
    return true;
};