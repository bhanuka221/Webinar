export const validEmail = (inputEmail) => {
  const emailRegex = new RegExp(
    "^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$"
  );

  return emailRegex.test(inputEmail);
};

export const validMobileNumber = (inputNumber) => {

  const phoneNumberRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

  return phoneNumberRegex.test(inputNumber);
};

export const isEmpty = (value) => {
  return value.trim() === "";
};

export const passwordMatches = (firstPassword,secondPassword) => {
    return firstPassword === secondPassword;
}

export const maxLengthMatched = (length,value) => {
    return value.length <= length;
}

export const minLengthMatched = (length,value) => {
    return value.length >= length;
}