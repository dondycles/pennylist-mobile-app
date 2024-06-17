const PHPeso = new Intl.NumberFormat("en-US");

export const UsePhpPeso = (number: string | number) => {
  return PHPeso.format(Number(number));
};

export const UsePhpPesoWSign = (number: string | number, decimals?: number) => {
  const formatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "PHP",
    maximumFractionDigits: decimals ?? 2,
  });

  return formatted.format(Number(number));
};
