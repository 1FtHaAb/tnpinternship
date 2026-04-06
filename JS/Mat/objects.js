// Simple Object
const person = {
    name: "Alice",
    // lastName:'Teena'
    age: 25,
    greet: function () {
      console.log(`Hello, my name is ${name} age: ${age}`);
    },
  };
  
  person['name'] = 'Abhishek'
  // Accessing object properties
  console.log(person.name); // Output: Alice
  console.log(person['age']);  // Output: 25
  
  // Calling an object method
  person.greet(); // Output: Hello, my name is Alice!

  

//   CONSTRUCTOR

// Constructor Function
function Person(name, age) {
    this.name = name;
    this.age = age;
    this.greet = function () {
        // cons
    };
}
  
  const person3 = new Person("teena",20)



  // Creating new objects using the constructor
  const person1 = new Person("Bob", 30);
  const person2 = new Person("Jane", 28);
  
  // Accessing properties and methods
//   console.log(person1.name); // Output: Bob
//   console.log(person2.age);  // Output: 28
  
  person1.greet(); // Output: Hi, I am Bob and I am 30 years old.
  person2.greet(); // Output: Hi, I am Jane and I am 28 years old.
  