var AWS = require("aws-sdk");

exports.handler = function(event, context) {
    var docClient = new AWS.DynamoDB.DocumentClient();

    var params = {
        "TableName" : "standings",
        "KeyConditionExpression" : "conference = :conf",
        "ExpressionAttributeValues" : {":conf": "Eastern"}

    };

    var output = docClient.query(params, function(err, data) {
        if (err) {
            console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
        } else {
            var output = '<html><body><table>';
            console.log("Query succeeded.");
            data.Items.forEach(function(item) {
                console.log(" -", item.city + ": " + item.nickname);
                output += "<tr><td>" + item.city + "</td><td>" + item.nickname + "</td></tr>";
            });
            output += "</table></body></html>"
            context.succeed(output);
        }
    });


}
