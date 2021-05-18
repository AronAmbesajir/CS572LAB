const fib = function (num) {
    if (num <= 2) {
        return 1;
    } else {
        return fib(num - 1) + fib(num - 2);
    }
};
console.log("3,Fibonacci result: " + fib(24));
