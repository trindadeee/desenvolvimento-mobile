export function addToLocalStorage(key: string, value: string) {
    localStorage.setItem(key, value);
 }
 
 export function getItemFromLocalStorage(key: string) {
    return localStorage.getItem(key);
 }
 
 export function removeItemFromLocalStorage(key: string) {
    localStorage.removeItem(key);
 }
 
 export function clearLocalStorage() {
    localStorage.clear();
 }
 