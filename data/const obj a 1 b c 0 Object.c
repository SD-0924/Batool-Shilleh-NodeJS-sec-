/*const obj = {a:1, b: [], c:0}
Object.seal(obj)

obj.a =0
obj.b.push(0)
delete obj.c

obj.d ='hello'

console.log(obj)
*/

let a = { b: 1 };
a.c = a; 
let output = JSON.stringify(a);
console.log(output);

