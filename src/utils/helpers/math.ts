export function scaleBetween(
  input: number,
  from: Array<number>,
  to: Array<number>
): number {
  const [fromMin, fromMax] = from;
  const [toMin, toMax] = to;

  return ((input - fromMin) * (toMax - toMin)) / (fromMax - fromMin) + toMin;
}
