// Convert hex balance to decimal
export const formatBalance = (hexBalance, decimals = 18) => {
  if (!hexBalance) return "0";
  const balance = parseInt(hexBalance, 16);
  return (balance / Math.pow(10, decimals)).toFixed(6);
};
