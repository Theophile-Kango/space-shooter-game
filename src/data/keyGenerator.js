
function keyGenerator() {
    if (typeof localStorage === "undefined" || localStorage === null) {
        const LocalStorage = require('node-localstorage').LocalStorage;
        localStorage = new LocalStorage('./scratch');
     }
     //localStorage.setItem('myFirstKey', 'myFirstValue');
     console.log(localStorage.getItem('myFirstKey'));
}; 
keyGenerator();