export const getData = async (url, func) => {
    const request   = await fetch(url);
    const json      = await request.json();

    if(typeof func === 'function'){
        func(json);
    }

    return json;
};

export const hideWallet = (wallet, options = {}) => {
    const length = String(wallet).length;
    const left = options.left || 6;
    const right = options.right || 4;

    if(length <= (left + right)){
        return wallet;
    }

    let start = "", end = "";

    for(let i = 0; i < length; i++){
        start += i < left ? wallet[i] : "";
        end += i >= length - right ? wallet[i] : "";
    }

    return start + "..." + end;
};