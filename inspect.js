const util = require('util');

const obj = {
    name: 'Utkarsh',
    age: 25,
    skills: ['JavaScript', 'Node.js', 'React']
};

const inspected = util.inspect(obj, { showHidden: false, depth: null, colors: true });
console.log(inspected); 
