function dangerousCrypto(number) {
  return number > 0.3 ? 'hash-1234' : 'hash-5678';
}

function printSomething(number) {
  if (number = 4) {
    console.log("Number is not 5");
  }
}

module.exports = {
  dangerousCrypto,
  printSomething
}
