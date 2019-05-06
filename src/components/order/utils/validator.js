import validator from "validator";

export function name(value) {
  if (validator.isEmpty(value)) return new Error("The name must not be empty.");
  else if (!validator.isLength(value, { min: 3 }))
    return new Error("The name must be at a minimum 3 characters long.");
  else if (!validator.isLength(value, { max: 250 }))
    return new Error("The name must be at a maximum 250 characters long.");

  return null;
}

export function contact(value) {
  if (validator.isEmpty(value))
    return new Error("The phone field must not be empty.");
  if (value.substr(0, 4) === "+263" && value.length === 13) return null;
  if (!validator.isMobilePhone(value, "en-ZA"))
    return new Error("Please enter a valid phone no.");

  return null;
}
