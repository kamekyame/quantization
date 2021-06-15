import { Quantization, quantization } from "./quantization.ts";

const loop = 1000000;

let markStr = "normal";
performance.mark(markStr + ":s");
for (let num = 0; num < loop; num++) {
  for (let i = 0; i < 100; i++) {
    quantization(i, 0, 100, 2, "linear");
  }
}
performance.mark(markStr + ":e");
performance.measure(markStr, markStr + ":s", markStr + ":e");
console.log(performance.getEntriesByName("normal")[0].duration / loop, "ms");

markStr = "fast";
const q = new Quantization(0, 100, 2, "linear");
performance.mark(markStr + ":s");
for (let num = 0; num < loop; num++) {
  for (let i = 0; i < 100; i++) {
    q.convert(i);
  }
}
performance.mark(markStr + ":e");
performance.measure(markStr, markStr + ":s", markStr + ":e");
console.log(performance.getEntriesByName("fast")[0].duration / loop, "ms");
