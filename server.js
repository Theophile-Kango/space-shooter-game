const express = require('express'); // eslint-disable-line import/no-extraneous-dependencies
const path = require('path');
const jsdom = require('jsdom');
const app = express();
//const server = require('http').Server(app);

const { JSDOM } = jsdom;

const port = process.env.PORT || 8080;
// the __dirname is the current directory from where the script is running
app.use(express.static(`${__dirname}/dist`));
// send the user to index html page inspite of the url
// app.get('*', (req, res) => {
//   res.sendFile(path.resolve(__dirname, 'dist/index.html'));
// });

// JSDOM.fromFile("dist/index.html", { runScripts: "outside-only" }).then(dom => {
//   const name = dom.window.document.querySelector('.name').value;
//   const score = dom.window.document.querySelector('.score').value;
//   console.log(name, score);
// }); 

//console.log(dom);
// JSDOM.fromFile(path.join(__dirname, 'index.html'), {
//     // To run the scripts in the html file
//     runScripts: "dangerously",
//     // Also load supported external resources
//     resources: "usable",
//     // So requestAnimatinFrame events fire
//     pretendToBeVisual: true
 
// });


//console.log(dom.window.document.querySelector('name').value, dom.window.document.querySelector('score').value);

//setupAuthoritativePhaser();
app.listen(port);

