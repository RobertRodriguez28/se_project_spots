const sayHello = (firstName, lastName) => {
  return `Hello, ${firstName} ${lastName}!`;
};

test("What the function under test should do", () => {
  // expected output depending on the input
});

it("What the function under test should do", () => {
  // expected output depending on the input
});
expect(1).toBe(1); // true
expect(1).toBe(2); // false
expect(1 + 2).toBe(3); // true

const sayHello = require("./function.js");

test("Creates a greeting", () => {
  expect(sayHello("Lera", "Jackson")).toBe("Hello, Lera Jackson!");
});

module.exports = sayHello;
