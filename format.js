const util = require('util');

const name = 'Utkarsh';
const age = 25;
const formattedString = util.format('Name: %s, Age: %d', name, age);

console.log(formattedString);
