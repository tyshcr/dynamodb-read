let AWS = require("aws-sdk");

exports.handler = function(event, context, callback) {
    let docClient = new AWS.DynamoDB.DocumentClient();

    let params = {
        "TableName" : "mlb",
        "FilterExpression" : "conference = :conf and division = :div",
        "ExpressionAttributeValues" : {":conf": "AL", ":div": "C"}
    };

    let output = docClient.scan(params, function(err, data) {
        if (err) {
            callback(err, "Query Failed")
        } else {
          data.Items.sort(function(a, b) {
                return a.rank > b.rank
          })

          let json = { "title": "MLB", "segments":[{ "name":"AL Central", "rows": data.Items }] }

          callback(null, json)
        }
    });


}
