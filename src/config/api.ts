let prod = true;
const prodUrl = 'https://cookd-server.herokuapp.com';
let localUrl = 'http://localhost:3000';
export const endpoint = prod || !__DEV__ ? prodUrl : localUrl;
