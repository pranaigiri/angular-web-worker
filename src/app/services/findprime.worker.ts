/// <reference lib="webworker" />

addEventListener('message', ({ data }) => {
  const response = {prime : findNthPrime(data)};
  postMessage(response);
});


function findNthPrime(n: number): number {
  if (n === 1) return 2; // The first prime number is 2

  let count = 1; // Current prime count (already including 2)
  let candidate = 1; // Start with an odd number

  while (count < n) {
    candidate += 2; // Next odd number
    if (isPrime(candidate)) {
      count++;
    }
  }
  return candidate;
}

 function isPrime(num: number): boolean {
  if (num <= 1) return false;
  if (num <= 3) return true;

  if (num % 2 === 0 || num % 3 === 0) return false;

  for (let i = 5; i * i <= num; i += 6) {
    if (num % i === 0 || num % (i + 2) === 0) return false;
  }

  return true;
}
