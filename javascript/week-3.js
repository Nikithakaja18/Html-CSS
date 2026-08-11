function findSum(arr) {
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
        sum += arr[i];
    }
    return sum;
}

let numbers = [10, 20, 30, 40, 50];
console.log("Sum =", findSum(numbers));