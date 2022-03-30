let prod = false;
const prodUrl = 'https://cookd-server-z8lmh.ondigitalocean.app';
let localUrl = 'http://localhost:3000';
export const endpoint = prod || !__DEV__ ? prodUrl : localUrl;
console.log(endpoint);
