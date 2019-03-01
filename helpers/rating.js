'use strict'

//Example Ratings
// {
//     "5": {
//         "count": 0
//     },
//     "4": {
//         "count": 0
//     },
//     "3": {
//         "count": 0
//     },
//     "2": {
//         "count": 0
//     },
//     "1": {
//         "count": 0
//     }
// }

exports.calculate = (ratings) => {
    let totalCount = 0;
    let weightedTotalCount = 0;
    
    for(const ratingKey in ratings) {
        weightedTotalCount += ratings[ratingKey].count
        totalCount += (parseInt(ratingKey) * ratings[ratingKey].count)
    };
    
    return totalCount/weightedTotalCount;
}