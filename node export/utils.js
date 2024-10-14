console.log("Executing utils.js")

function greet(name) {
  return `Hello, ${name}`;
}

const message = "How you doing?";

module.exports = {
  greet,
  message,
};
