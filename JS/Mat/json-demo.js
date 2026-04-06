// ==========================================
// JSON Handling
// ==========================================

// --- A JavaScript object (NOT JSON yet) ---
const user = { name: "Jacob", age: 22, role: "Intern" };
console.log("JS Object:", user);

// --- Convert object → JSON string (for sending to an API) ---
const jsonString = JSON.stringify(user);
console.log("JSON string:", jsonString);        // '{"name":"Jacob","age":22,"role":"Intern"}'
console.log("Type:", typeof jsonString);         // "string"

// --- Convert JSON string → object (for reading API responses) ---
const parsed = JSON.parse(jsonString);
console.log("Parsed back:", parsed);
console.log("Name:", parsed.name);               // "Jacob"

// WHY JSON?
// - JSON is the standard data format for web APIs
// - Servers send JSON → browser parses it with JSON.parse()
// - Browser sends data → converts to JSON with JSON.stringify()
