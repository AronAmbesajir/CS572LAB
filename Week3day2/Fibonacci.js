
const fib = function (num) {
    if (num <= 2) {
        return 1;
    } else {
        return fib(num - 1) + fib(num - 2);
    }
};

function fibonacci(num){
    return new Promise((resolve, reject) => {
    if(num>0){
     resolve(fib(num))
}else{
    reject("number is less than zero")
}
});
}

console.log("Start");

fibonacci(8).then(a=>{
    console.log(a);
}).catch(err=>{
console.log(err);
});
console.log("End")