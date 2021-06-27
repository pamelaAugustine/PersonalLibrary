var chai = require('chai');
var assert = chai.assert;

var server = require('../server');    /** import the Express app **/

var chaiHttp = require('chai-http');  /** require the chai-http plugin **/
chai.use(chaiHttp);

// suite('Functional Tests', function () {



//     suite('GET /', function () {
//         test('#example - responds with appropriate JSON data when sending {surname: "Polo"}', function (done) {
//             chai.request(server)
//                 .post('/travellers')         // note the PUT method
//                 .send({ surname: 'Polo' })    // attach the payload, encoded as JSON
//                 .end(function (err, res) {    // Send the request. Pass a Node callback

//                     assert.equal(res.status, 200, 'response status should be 200');
//                     assert.equal(res.type, 'application/json', "Response should be json");

//                     // res.body contains the response parsed as a JS object, when appropriate
//                     // (i.e the response type is JSON)
//                     assert.equal(res.body.name, 'Marco', 'res.body.name should be "Marco"');
//                     assert.equal(res.body.surname, 'Polo', 'res.body.surname should be "Polo"');

//                     // call 'done()' when... done
//                     done();
//                 });
//         })
//     })
// })
