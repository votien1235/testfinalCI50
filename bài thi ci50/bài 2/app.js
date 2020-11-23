let testCase = [
    {
        name: "Arsenal",
        points: 99,
        GD: 45,
    },
    {
        name: "Chelsea",
        points: 75,
        GD: 39,
    },
    {
        name: "Manchester United",
        points: 60,
        GD: 29,
    },
    {
        name: "Liverpool",
        points: 88,
        GD: 39,
    }
];
let groupPoint = [];
let groupGD = [];
testCase.forEach(function (item) {
    groupPoint.push(item.points);
});
groupPoint.sort(function (a, b) { return b - a }); 
for (let i = 0; i < groupPoint.length; i++) {
    if (groupPoint[i] != groupPoint[i + 1]) {
        for (let j = 0; j < testCase.length; j++) {
            if (groupPoint[i] == testCase[j].points) {
                testCase[j].position = i + 1;
            }
        }
    } else {
        for (let u = 0; u < testCase.length; u++) {
            if (groupPoint[i] == testCase[u].points) {
                groupGD.push(testCase[u].GD);
            }
        };
        for (let e = 0; e < testCase.length; e++) {
            for (let k = 0; k < groupGD.length; k++) {
                if (groupGD[k] == testCase[e].GD) {
                    testCase[e].position = i;
                }
            }
        }
    }
}

console.log(testCase);

