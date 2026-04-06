// ==========================================
// ES6 Features Overview  (run in browser console or Node)
// ==========================================

// --- 1. let vs const ---
let age = 25;        // can be reassigned
age = 26;
const name = "Jacob"; // cannot be reassigned
// name = "Abc";      // ❌ TypeError
console.log("let age:", age, "| const name:", name);

// --- 2. Arrow functions ---
const greet = (who) => "Hello, " + who + "!";
console.log(greet("Intern"));

// --- 3. Template literals ---
const lang = "JavaScript";
console.log(`Welcome to ${lang}! Age is ${age}.`);

// --- 4. Destructuring ---
const user = { firstName: "Jacob", role: "Intern" };
const { firstName, role } = user;           // object destructuring
console.log("Name:", firstName, "| Role:", role);

const colors = ["red", "green", "blue"];
const [first, second] = colors;             // array destructuring
console.log("First color:", first);

// --- 5. Spread operator ---
const nums = [1, 2, 3];
const moreNums = [4, 5,...nums];           // spread into new array
console.log("Spread:", moreNums);

const copy = { ...user, role: "Developer" }; // spread into new object (override role)
console.log("Spread object:", copy);
