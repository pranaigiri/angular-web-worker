# Angular Web Worker (Demo)
Web workers allow you to run JavaScript code in the background, enabling your web applications to perform parallel processing, making them more responsive and efficient.

## UI Freezes without using webworker
![10000000 using normal](https://github.com/pranaigiri/angular-web-worker/assets/102620441/e64206c2-9793-485b-8503-d24c4113eeee)

## UI stays responsive while calculating using web worker
As you can see we can use other UI components when web worker does its calculation in the background.
![10000000 with responsive](https://github.com/pranaigiri/angular-web-worker/assets/102620441/48399c70-85db-4d1e-a8cc-2798a387a6c7)

## Result automatically renders when web worker completes its calculation
![10000000 using web worker](https://github.com/pranaigiri/angular-web-worker/assets/102620441/ae052116-f491-49cc-9f61-de008e0f192d)


This repository is designed to help you understand and implement web workers in Angular projects. Here's what you'll find inside:

- Angular Application: The main Angular application codebase is provided, showcasing a simple use case. You can see how web workers can be integrated seamlessly into your Angular project to offload resource-intensive tasks and enhance the user experience.

- Web Worker Implementation: We provide clear examples of how to create and use web workers in an Angular application. Learn how to communicate with web workers, transfer data, and handle complex calculations in a separate thread.


# Angular Web Worker Guide

## Introduction

This guide will walk you through the process of creating and using a Web Worker in an Angular application.

## Step 1: Create Web Worker
To create a Web Worker in your Angular application, you can use the Angular CLI command:
```bash
ng generate web-worker
```
It will then prompt you to specify name for your web worker, In this repository I have used **find-prime** which will create **find-prime.worker.ts** file.
```typescript
// find-prime.worker.ts

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
```

## Step 2: Check Compatibility and Use Web Worker
```typescript
// your-component.ts
if (typeof Worker !== 'undefined') {
  const worker = new Worker(
    new URL('./services/findprime.worker.ts', import.meta.url)
  );

  // Handle messages from the Web Worker
  worker.onmessage = ({ data }) => {
    // Bind data to result after web worker returns value
    if (data.prime) {
      this.result = data.prime;
    }
  };

  // Post data to the Web Worker
  worker.postMessage(this.inputWebWorker);
} else {
  // Web workers are not supported in this environment.
  // You should add a fallback so that your program still executes correctly.
}
```


### Contributions:

We welcome contributions from the open-source community! If you have ideas, improvements, or additional use cases for web workers in Angular, feel free to submit pull requests. Let's collaborate to make this repository a valuable resource for developers worldwide.

### Issues and Support:

Encounter any issues, or have questions about using web workers in Angular? Please don't hesitate to open an issue in this repository. We're here to help and improve the experience for everyone.

Get ready to supercharge your Angular applications with the magic of web workers. Let's explore the future of web development together!
