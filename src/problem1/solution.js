var sum_to_n_a = function (n) {
    // For loop / simple approach
    if (n <= 0) return 0;

    let sum = 0;
    for (let i = 1; i <= n; i++) {
        sum = sum + i;
    }

    return sum;
}

var sum_to_n_b = function (n) {
    // Mathematical approach
    if (n <= 0) return 0;

    return (n * (n + 1)) / 2;
}

var sum_to_n_c = function (n) {
    // Recursive approach, expressive but unsafe for large inputs due to call stack limits
    if (n <= 0) return 0;
    if (n === 1) return 1;

    return n + sum_to_n_c(n - 1);
}