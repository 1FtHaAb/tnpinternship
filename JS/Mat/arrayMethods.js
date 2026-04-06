// Iteration Array Methods

const students = [
    { name: 'Alice', age: 22, score: 85 },
    { name: 'Bob', age: 25, score: 76 },
    { name: 'Charlie', age: 24, score: 95 },
    { name: 'Diana', age: 23, score: 68 },
    { name: 'Eve', age: 22, score: 90 }
];

// 1. forEach: Log each student's name
console.log('Student Names:');
students.forEach(i => console.log(i.name+" name"));

// 2. map: Create an array of student ages
const ages = students.map(student => student.age);
console.log('Ages:', ages);

// 3. filter: Get students with scores above 80
const highScorers = students.filter(student => student.score > 80);
console.log('High Scorers:', highScorers);

// 4. find: Find the first student older than 23
const olderStudent = students.find(student => student.age > 23);
console.log('First Older Student:', olderStudent);

// 5. reduce: Calculate the average score
const totalScore = students.reduce((total, student) => total + student.score, 0);
const averageScore = totalScore / students.length;
console.log('Average Score:', averageScore);

// 6. some: Check if any student has a score below 70
const hasLowScorer = students.some(student => student.score < 70);
console.log('Any Low Scorer?', hasLowScorer);

// 7. every: Check if all students are younger than 30
const allYoung = students.every(student => student.age < 30);
console.log('All Students Younger than 30?', allYoung);

// 8. sort: Sort students by score in descending order
const sortedByScore = students.sort((a, b) => b.score - a.score);
console.log('Sorted by Score (Descending):', sortedByScore);

// 9. flatMap: Create an array of student names and ages
const namesAndAges = students.flatMap(student => [student.name, student.age]);
console.log('Names and Ages:', namesAndAges);
