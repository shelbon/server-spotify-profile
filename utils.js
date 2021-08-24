const generateRandomString = (N) =>
  (Math.random().toString(36) + Array(N).join('0')).slice(2, N + 2);

function isEmptyObject(obj) {
  return (
    obj === null ||
    typeof obj === 'undefined' ||
    (Object.keys(obj).length === 0 && obj.constructor === Object)
  );
}
export { generateRandomString, isEmptyObject };
