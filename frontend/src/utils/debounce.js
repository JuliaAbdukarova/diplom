export const debounce = (fn, delay) => {
    let timeOutId;
    return (...args)=>{
        clearTimeout(timeOutId);
        timeOutId = setTimeout(fn, delay, ...args);
    }
}
