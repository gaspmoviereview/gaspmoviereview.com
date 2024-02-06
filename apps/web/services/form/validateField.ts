export const validateField = (
  fieldType: "email" | "text",
  value: string | number
) => {
  switch (fieldType) {
    case "email":
      return value.toString().length > 3 && /^.*$/gi.test(value.toString());
    default:
      return (
        value.toString().length > 3 &&
        /^[^{}[\]\\<>]+$/gi.test(value.toString())
      );
  }
};
