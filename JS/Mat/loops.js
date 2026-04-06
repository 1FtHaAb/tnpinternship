const numbers = [1, 2, 3, 4, 5];
const student = { name: 'Alice', age: 22, score: 85 };

// 1. for Loop
console.log('for Loop:');
for (let i = 0; i < numbers.length; i++) {
    console.log(numbers[i]);
}

// 2. while Loop
console.log('\nwhile Loop:');
let i = 0;
while (i < numbers.length) {
    console.log(numbers[i]);
    i++;
}

// 3. do...while Loop
console.log('\ndo...while Loop:');
let j = 0;
do {
    console.log(numbers[j]);
    j++;
} while (j < numbers.length);

// 4. for...of Loop
console.log('\nfor...of Loop:');
for (const number of numbers) {
    console.log(number);
}

// 5. for...in Loop (for an object)
console.log('\nfor...in Loop (Object):');
for (const key in student) {
    console.log(`${key}: ${student[key]}`);
}

// 6. forEach (Array method)
console.log('\nforEach Loop:');
numbers.forEach(num => console.log(num));
