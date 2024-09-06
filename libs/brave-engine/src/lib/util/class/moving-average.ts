export class MovingAverage {

  samples: number[] = [];
  sampleIndex = 0;
  numberOfSamples = 1;

  constructor(numberOfSamples: number) {
    this.numberOfSamples = numberOfSamples;
  }

  calculate(value: number) {
    if (this.sampleIndex > this.numberOfSamples - 1) {
      this.sampleIndex = 0;
    }

    this.samples[this.sampleIndex] = value;
    this.sampleIndex++;

    return this.samples.reduce((previous, current) => previous + current) / this.numberOfSamples;
  }

}