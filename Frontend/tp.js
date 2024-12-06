// function abc(a, b) {
//   //   "use strict";
//   let c = 100;
//   let d = 200;
//   return arguments[0] + arguments[1];
//   console.log(c + d);
// }

// console.log(abc(10, 20)); // Output: 30

const arr1 = [1, 2, 3, 4];
const arre2 = [8, 5, 6, 7];
const arr = [];
for (let i = 0; i < arr1.length; i++) {
  arr.push(arr1[i]);
  arr.push(arre2[i]);
}

console.log(arr);

// function abc(a = 100, b = 200) {
//   console.log(a + b);
// }
// console.log(abc(undefined, 10));
// console.log(!"shravan");
