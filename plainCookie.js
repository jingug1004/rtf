export const setCookie = (name, value, day) => {
  const date = new Date();
  date.setTime(date.getTime() + day * 60 * 60 * 24 * 1000);
  document.cookie =
    name + "=" + value + ";expires=" + date.toUTCString() + ";path=/";
};

export const getCookie = (headers, name) => {
  const headersCookie = headers.cookie;
  let value;
  if (
    headersCookie &&
    headersCookie.match("(^|;) ?" + name + "=([^;]*)(;|$)")
  ) {
    value = headersCookie.match("(^|;) ?" + name + "=([^;]*)(;|$)");
  }

  return value ? value[2] : null;
};

export const deleteCookie = (name) => {
  const date = new Date();
  document.cookie =
    name + "= " + "; expires=" + date.toUTCString() + "; path=/";
};
