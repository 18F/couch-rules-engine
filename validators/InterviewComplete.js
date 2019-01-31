// Validation rule for eligibility interview
exports.interviewComplete = function (doc) {
    if (!doc.interviewComplete) {
        throw ({
            forbidden: 'Interview must be completed.'
        });
    }
    return true;
};