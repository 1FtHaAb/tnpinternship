// ==========================================
// Arrow Functions vs Normal Functions
// ==========================================

// --- Syntax comparison ---
function add(a, b) { return a + b; }        // normal
const addArrow = (a, b) => a + b;           // arrow (shorter!)
console.log("Normal:", add(2, 3), "| Arrow:", addArrow(2, 3));

// --- Readability: one-liner arrow ---
const nums = [1, 2, 3, 4, 5];
const doubled = nums.map(n => n * 2);       // clean & readable
console.log("Doubled:", doubled);

// --- Key difference: `this` behavior ---
const person = {
  name: "Jacob",

  // Normal function: `this` refers to the object that calls it
  greetNormal: function () {
    console.log("Normal this.name →", this.name);  // "Jacob"
  },

  // Arrow function: `this` is inherited from the surrounding scope (NOT the object)
  greetArrow: () => {
    console.log("Arrow this.name →", this.name);   // undefined (window in browser)
  }
};

person.greetNormal();  // ✅ works — this = person
person.greetArrow();   // ❌ undefined — this ≠ person

// TAKEAWAY: Use normal functions when you need `this` to refer to the object.
//           Use arrow functions for short callbacks (map, filter, etc.).
