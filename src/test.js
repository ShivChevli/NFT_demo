// const pr = new Promise(function (reolver, reject) {

//     setTimeout(
//         () => {
//             let count = 0;
//             for (let index = 0; index < 10; index++) {
//                 count = count + index;
//             }
//             return count;
//         }, 2000);

//     if (reolver) {
//         console.log("resolve")
//     }
//     if(reject){
//         console.log("reject")
//     }
// })

let pro = new Promise((resolve) => {
    setTimeout(
        () => {
            let count = 0;
            for (let index = 0; index < 10; index++) {
                count = count + index;
                console.log(index);
                let fileName = index.toString() + "_" + Date.now().toString();
                console.log(fileName);
            }
            resolve(count);
        }, 2000);
})

let ans = async () => {
    let val = await pro;
    return val;
}
ans().then(result => {
    console.log("Ans :- ", result);
})

let fun1 = async () => {
    let vla2 = await ans();
    console.log("Vale2 ", vla2);
}
fun1();

console.log("Ans :- ", ans());
