const numbers = [10, 20, 30, 40, 50];

const joined = numbers.join("-");
console.log(joined);

const extraNumbers = [60, 70];
const combined = numbers.concat(extraNumbers);
console.log(combined);

numbers.push(80);
console.log(numbers);

const popped = numbers.pop();
console.log(numbers);
console.log(popped);

const shifted = numbers.shift();
console.log(numbers);
console.log(shifted);

numbers.unshift(5, 7);
console.log(numbers);

const removed = numbers.splice(1, 2, 100, 200);
console.log(numbers);
console.log(removed);

const sliced = numbers.slice(2, 5);
console.log(sliced);

numbers.reverse();
console.log(numbers);

numbers.sort((a, b) => a - b);
console.log(numbers);

const index = numbers.indexOf(100);
console.log(index);

const includesValue = numbers.includes(200);
console.log(includesValue);

const stringArray = ["Pen", "Book", "Bag"];
const stringSorted = stringArray.sort();
console.log(stringSorted);

const items = [
  { name: "Pen", price: 10, stock: 50 },
  { name: "Book", price: 40, stock: 20 },
  { name: "Pencil", price: 5, stock: 100 },
  { name: "Bag", price: 500, stock: 5 },
  { name: "Scale", price: 20, stock: 0 }
];

items.forEach(i => console.log(i.name));

const names = items.map(i => i.name);
console.log(names);

const prices = items.map(i => i.price);
console.log(prices);

const availableItems = items.filter(i => i.stock > 0);
console.log(availableItems);

const outOfStock = items.filter(i => i.stock === 0);
console.log(outOfStock);

const costlyItem = items.find(i => i.price > 100);
console.log(costlyItem);

const totalStock = items.reduce((total, i) => total + i.stock, 0);
console.log(totalStock);

const totalValue = items.reduce((total, i) => total + (i.price * i.stock), 0);
console.log(totalValue);

const hasCheapItem = items.some(i => i.price < 10);
console.log(hasCheapItem);

const allInStock = items.every(i => i.stock > 0);
console.log(allInStock);

const sortedByPrice = [...items].sort((a, b) => a.price - b.price);
console.log(sortedByPrice);

const nameAndPrice = items.flatMap(i => [i.name, i.price]);
console.log(nameAndPrice);