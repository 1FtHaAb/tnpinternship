const fruits = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry'];


// 1. join: Combine all elements of an array into a string
const fruitString = fruits.join(' | ');
console.log('Joined Fruits:', fruitString); // 'Apple | Blueberry | Cantaloupe | Date | Elderberry'

// 2. concat: Combine two arrays into one
const tropicalFruits = ['Mango', 'Pineapple'];
const allFruits = fruits.concat(tropicalFruits);
console.log('Concatenated Fruits:', allFruits); // ['Apple', 'Blueberry', 'Cantaloupe', 'Date', 'Elderberry', 'Mango', 'Pineapple']

// 3. push: Add elements to the end of the array
fruits.push('Fig');
console.log('After Push:', fruits); // ['Apple', 'Blueberry', 'Cantaloupe', 'Date', 'Elderberry', 'Fig']

// 4. pop: Remove the last element from the array
const poppedFruit = fruits.pop();
console.log('After Pop:', fruits); // ['Apple', 'Blueberry', 'Cantaloupe', 'Date', 'Elderberry']
console.log('Popped Fruit:', poppedFruit); // 'Fig'

// 5. shift: Remove the first element from the array
const shiftedFruit = fruits.shift();
console.log('After Shift:', fruits); // ['Blueberry', 'Cantaloupe', 'Date', 'Elderberry']
console.log('Shifted Fruit:', shiftedFruit); // 'Apple'

// 6. unshift: Add elements to the beginning of the array
fruits.unshift('Grapes', 'Honeydew');
console.log('After Unshift:', fruits); // ['Grapes', 'Honeydew', 'Blueberry', 'Cantaloupe', 'Date', 'Elderberry']


// 7. splice: Remove elements and optionally insert new elements
const removedFruits = fruits.splice(1, 2, 'Blueberry', 'Cantaloupe');
console.log('After Splice:', fruits); // ['Apple', 'Blueberry', 'Cantaloupe', 'Date', 'Elderberry']
console.log('Removed Fruits:', removedFruits); // ['Banana', 'Cherry']

// 8. slice: Create a new array from a portion of the original array
const slicedFruits = fruits.slice(1, 4); // Copy from index 1 to 3 (not including 4)
console.log('Sliced Fruits:', slicedFruits); // ['Blueberry', 'Cantaloupe', 'Date']
