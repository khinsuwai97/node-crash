// const { generateRandomNumbers, celciusToFahrenheit } = require('./utils');

// const randomNumbers = generateRandomNumbers();

// const celisius = celciusToFahrenheit(25);

// console.log(`25 degrees Celsius is equal to ${celisius} degrees Fahrenheit.`);
// console.log(`Generated random number: ${randomNumbers}`);

import getPosts, { getPostLength } from './postController.js';

console.log(getPosts());
console.log(getPostLength());
