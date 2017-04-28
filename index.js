var AWS = require("aws-sdk");

exports.handler = function(event, context, callback) {
    var docClient = new AWS.DynamoDB.DocumentClient();

    var params = {
        "TableName" : "mlb",
        "FilterExpression" : "conference = :conf and division = :div",
        "ExpressionAttributeValues" : {":conf": "AL", ":div": "C"}
    };

    var output = docClient.scan(params, function(err, data) {
        if (err) {
            // console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
            callback(err, "Query Failed")
        } else {
          data.Items.sort(function(a, b) {
                return a.rank > b.rank
            })
            // console.log(JSON.stringify(data))
            callback(null, data)
        }
    });


}
