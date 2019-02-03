// Validation rule for eligibility interview
exports.interviewComplete = function (doc) {
    if (String(doc.interviewComplete).length == 0) {
        throw ({
            forbidden: 'Interview must be completed.'
        });
    }
    return true;
};