export const convertToNumber = (object: Record<string, any>) => {
  const newObject: Record<string, any> = {};
  Object.keys(object).forEach((key) => {
    const value = object[key];
    const finalValue =
      isNaN(Number(value)) || typeof value === "boolean" || !value
        ? object[key] === ""
          ? undefined
          : object[key]
        : Number(object[key]);

    if (finalValue !== undefined) {
      newObject[key] = finalValue;
    }
  });
  return newObject;
};
