export const getData = async (url, func) => {
    const request   = await fetch(url);
    const json      = await request.json();

    if(typeof func === 'function'){
        func(json);
    }

    return json;
};

export const hideWallet = (wallet) => {
    const length = wallet.length;

    if(length <= 10){
        return wallet;
    }

    let start = "", end = "";

    for(let i = 0; i < length; i++){
        start += i < 6 ? wallet[i] : "";
        end += i >= length - 4 ? wallet[i] : "";
    }

    return start + "..." + end;
};