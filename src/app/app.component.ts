import { Component } from '@angular/core';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'angular-web-worker-example';

  constructor() {}

  //VARAIBLES FOR NORMAL CALCULATION
  input: number = 0;
  calculating: boolean = false;
  startTime?: Date;
  endTime?: Date;
  timeDifference?: number;
  nthPrime?: number;

  //VARAIBLES FOR WEB WORKER CALCULATION
  inputWebWorker: number = 0;
  calculatingWebWorker: boolean = false;
  startTimeWebWorker?: Date;
  endTimeWebWorker?: Date;
  timeDifferenceWebWorker?: number;
  nthPrimeWebWorker?: number;

  ngOnInit(): void {
    initFlowbite();
  }

  // --------------------------- CALCULATE NORMAL WAY
  findPrime() {
    this.calculating = true;
    setTimeout(() => {
        this.startTime = new Date();
        this.nthPrime = this.findNthPrime(this.input);
        this.endTime = new Date();
        this.timeDifference = (this.endTime.valueOf() - this.startTime.valueOf()) / 1000;
        this.calculating = false;
    }, 300);
  }

  findNthPrime(n: number): number {
    if (n === 1) return 2; // The first prime number is 2

    let count = 1; // Current prime count (already including 2)
    let candidate = 1; // Start with an odd number

    while (count < n) {
      candidate += 2; // Next odd number

      if (this.isPrime(candidate)) {
        count++;
      }
    }

    return candidate;
  }

  isPrime(num: number): boolean {
    if (num <= 1) return false;
    if (num <= 3) return true;

    if (num % 2 === 0 || num % 3 === 0) return false;

    for (let i = 5; i * i <= num; i += 6) {
      if (num % i === 0 || num % (i + 2) === 0) return false;
    }

    return true;
  }

  // ------------------------------ CALCULATE USING WEB WORKER
  findPrimeUsingWebWorker() {
    this.calculatingWebWorker = true;
    setTimeout(() => {
      this.startTimeWebWorker = new Date();

      if (typeof Worker !== 'undefined') {
        const worker = new Worker(
          new URL('./services/findprime.worker.ts', import.meta.url)
        );
        worker.onmessage = ({ data }) => {
            if(data.prime){
                this.nthPrimeWebWorker = data.prime;
                this.calculatingWebWorker = false;
                this.endTimeWebWorker = new Date();
                this.timeDifferenceWebWorker = (this.endTimeWebWorker.valueOf() - this.startTimeWebWorker!.valueOf()) / 1000;
            }
        };
        worker.postMessage(this.inputWebWorker);
      } else {
        // Web workers are not supported in this environment.
        // You should add a fallback so that your program still executes correctly.
      }

    }, 300);
  }
}
