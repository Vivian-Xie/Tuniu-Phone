
import CryptoJS from 'crypto-js';

export const sign = (obj) => {
    let arr: Array<string> = [];
    for (let k in obj) {
        if (obj[k]) {
            arr.push(`${k}=${obj[k]}`);
        }
    }
    // console.log(arr);
    let data = arr.sort().join("&").toLocaleUpperCase();
    console.log(data);

    return CryptoJS.MD5(data).toString();

}

export const encryptByDES = function (message: string, key: string, iv: string) {
    // 把私钥转成16进制的字符串
    const keyHex = CryptoJS.enc.Utf8.parse(key);
    const ivHex = CryptoJS.enc.Utf8.parse(iv)

    const encrypted = CryptoJS.DES.encrypt(message, keyHex, {
        iv: ivHex,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    // 加密出了一个16进制字符串
    return encrypted.toString();
}
export const decryptByDES = function (message: string, key: string, iv: string) {
    const keyHex = CryptoJS.enc.Utf8.parse(key);
    const ivHex = CryptoJS.enc.Utf8.parse(iv)

    const decrypted = CryptoJS.DES.decrypt({
        ciphertext: CryptoJS.enc.Base64.parse(message)
    }, keyHex, {
        iv: ivHex,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    return decrypted.toString(CryptoJS.enc.Utf8)
}
