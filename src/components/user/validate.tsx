export const rule = {
  pwdMinLength: 8,
  pwdMaxLength: 32,
  usernameMinLength: 4,
  usernameMaxLength: 40
};

export const passwordRegex = /^[a-zA-Z0-9!#$%&'*+/=?^_`{|}~.-]+$/s;
export const usernameRegex = /^[a-zA-Z0-9_-]+$/s;

export function validPassword(value: String): Boolean {
  if (value.length < rule.pwdMinLength || value.length > rule.pwdMaxLength) {
    return false;
  }
  if (!passwordRegex.test(value.toString())) {
    return false;
  }
  return true;
}

export function validUsername(value: String): Boolean {
  if (
    value.length < rule.usernameMinLength ||
    value.length > rule.usernameMaxLength
  ) {
    return false;
  }
  if (!usernameRegex.test(value.toString())) {
    return false;
  }
  return true;
}
