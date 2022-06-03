let prod = true;
const prodUrl = 'http://137.184.246.148';
let localUrl = 'http://localhost:3000';
export const endpoint = prod || !__DEV__ ? prodUrl : localUrl;
