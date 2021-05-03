export const saveAuthDataOnLocalStorage = (authData) => {
  localStorage.setItem("authData", JSON.stringify(authData));
};

export const getAuthDataFromLocalStorage = () => {
  const value = localStorage.getItem("authData");
  return value && JSON.parse(value);
};

export const removeAuthDataFromLocalStorage = () => {
  localStorage.removeItem("authData");
};
