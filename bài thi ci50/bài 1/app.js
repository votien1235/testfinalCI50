const A1 = [1, 2, 'a'];
const A2 = [1, 3, 'b'];

let newA1 = [...new Set(A1)];
let newA2 = [...new Set(A2)];
for (let i = 0; i < newA1.length; i++) {
    for (let j = 0; j < newA2.length; j++) {
        if (newA1[i] == newA2[j]) {
            newA1.splice(i, 1);
            newA2.splice(j, 1);
        }
    }
}
let A3 = [];
A3.push(newA1 + ',' + newA2);
console.log(A3);