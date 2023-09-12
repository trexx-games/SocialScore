// address slicer
export const sliceWalletAddress = (input: string, front = 7, back = -4) => {
  const firstSix = input?.slice(0, front);
  const lastFour = input?.slice(back);
  return firstSix + '...' + lastFour;
};
