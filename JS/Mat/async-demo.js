// ==========================================
// Asynchronous JavaScript Basics
// ==========================================

// --- Synchronous: runs line by line ---
console.log("1 - Start");
console.log("2 - Middle");
console.log("3 - End");
// Output: 1, 2, 3  (in order)

console.log("---");

// --- Asynchronous with setTimeout ---
// setTimeout does NOT pause the code — it schedules a callback for later.
console.log("A - Start");

setTimeout(function () {
  console.log("B - Inside setTimeout (runs AFTER 2 seconds)");
}, 2000);

console.log("C - End (runs BEFORE B!)");

// Output order: A, C, B
// Why? JS puts the setTimeout callback in a queue and moves on.
// After 2 seconds, the callback runs.

// TAKEAWAY: JavaScript is single-threaded.
// setTimeout, fetch, etc. are async — they don't block the main thread.
