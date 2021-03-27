export function rgbaColorArrayToFloatColorArray(data: number[]) {
  const r = data[0] / 255;
  const g = data[1] / 255;
  const b = data[2] / 255;
  const a = data[3];

  return [r, g, b, a];
}
