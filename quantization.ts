type SplitType = "linear";

export class Quantization {
  public min: number;
  public max: number;
  public bitNum: number;
  public convert: (x: number) => number;

  constructor({ min, max, bitNum, splitType }: {
    min: number;
    max: number;
    bitNum: number;
    splitType: SplitType;
  }) {
    if (!Number.isInteger(bitNum)) throw Error("bitNum is not integer");
    this.min = min;
    this.max = max;
    this.bitNum = bitNum;

    if (splitType === "linear") this.convert = this.convertLiner();
    else throw Error(`splitType=${splitType} is not supported`);
  }

  convertLiner = () => {
    const splitNum = Math.pow(2, this.bitNum); // クロージャによる分割数のキャッシュ
    const regionWidth = (this.max - this.min) / splitNum; // クロージャによる領域幅のキャッシュ

    return (x: number) => {
      let r = Math.floor((x - this.min) / regionWidth); // 領域インデックス取得
      if (r >= splitNum) r = splitNum - 1; // 最大値が入力された際に分割数を超えてしまうため、それの抑制
      const quantum = this.min + regionWidth * (r + 0.5); // 量子化
      return quantum;
    };
  };
}

export function quantization(
  x: number,
  xMin: number,
  xMax: number,
  bitNum: number,
  splitType: SplitType,
) {
  if (!Number.isInteger(bitNum)) throw Error("bitNum is not integer");
  if (x < xMin) return xMin;
  else if (x >= xMax) return xMax;

  const regionWidth = (xMax - xMin) / (Math.pow(2, bitNum)); // 領域幅
  const r = Math.floor((x - xMin) / regionWidth); // 領域インデックス取得
  const quantum = xMin + regionWidth * (r + 0.5); // 量子化
  //console.log(`${x} => ${quantum}`);
  return quantum;
}
