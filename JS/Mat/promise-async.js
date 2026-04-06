// ==========================================
// Promises and async/await
// ==========================================

// --- Creating a Promise ---
// A Promise represents a value that will be available in the future.
const myPromise = new Promise((resolve, reject) => {
  const success = false;
  setTimeout(() => {
    success ? resolve("Data loaded! ✅") : reject("Error ❌");
  }, 1000);
});

// --- Consuming with .then/.catch ---
myPromise
  .then(result => console.log("then:", result))
  .catch(err   => console.log("catch:", err));

// --- async/await (cleaner way to handle Promises) ---
async function fetchData() {
  try {
    const result = await myPromise;       // waits for promise to resolve
    console.log("await:", result);
  } catch (err) {
    console.log("error:", err);
  }
}
fetchData();

// WHY async/await?
// - Reads like synchronous code (top to bottom)
// - Easier error handling with try/catch
// - Avoids deeply nested .then() chains ("callback hell")
