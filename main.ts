import { stringify } from "https://deno.land/std@0.94.0/encoding/csv.ts";

import { Quantization } from "./quantization.ts";

{
  // Quantizationクラスの初期化
  const q = new Quantization({
    min: -1,
    max: 1,
    bitNum: 3,
    splitType: "linear",
  });
  const data: { t: number; x: number; xHat: number }[] = [];

  // 量子化（sin関数）
  for (let i = 0; i < 2 * Math.PI; i += Math.PI / 100) {
    const x = Math.sin(i);
    const xHat = q.convert(x);
    data.push({ t: i, x, xHat });
  }

  Deno.writeTextFileSync(
    "./sin.csv",
    await stringify(data, ["t", "x", "xHat"]),
  );
}

{
  // Quantizationクラスの初期化
  const q = new Quantization({
    min: -100,
    max: 100,
    bitNum: 4,
    splitType: "linear",
  });
  const data: { t: number; x: number; xHat: number }[] = [];

  // 量子化（一次関数）
  for (let i = -100; i < 100; i += 1) {
    const x = i;
    const xHat = q.convert(x);
    data.push({ t: i, x, xHat });
  }

  Deno.writeTextFileSync(
    "./liner.csv",
    await stringify(data, ["t", "x", "xHat"]),
  );
}
