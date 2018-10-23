const request = require('request');

exports.handler = function(event, context, callback) {
  console.log('Received event:', JSON.stringify(event, null, 2));

  callback(null, {
  statusCode: 200,
  body: "Commande creer"
  });

   console.log('Verifying');
   console.log(body);

   var options = {
       url: 'https://lpa2sgadot.herokuapp.com/orders',
       method: 'POST',
       headers: {
           'Connection': 'close',
           "accept": "application/json",
           "Content-Type": "application/json" 
       },
       body: "{ \"client_name\": \"robert Dupond\", \"client_adress\": \"3 rue des alouettes Trifouilly les oies\", \"pizzas\": [ 0 ]}",
       strictSSL: true,
       rejectUnauthorized: false,
       requestCert: true,
       agent: false
   };
}