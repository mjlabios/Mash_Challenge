import CryptoJS from 'crypto-js';

import {CIPHER} from '@/constants/cipher';

export const encryptString = (string: any) => {
  try {
    var ivHex = CryptoJS.enc.Hex.parse(CIPHER.IV);
    var encrypted = CryptoJS.AES.encrypt(string, CIPHER.KEY, {
      iv: ivHex,
    });
    return encrypted.toString();
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const decryptString = (encryptedString: any) => {
  try {
    var ivHex = CryptoJS.enc.Hex.parse(CIPHER.IV);
    var decryptedString = CryptoJS.AES.decrypt(encryptedString, CIPHER.KEY, {
      iv: ivHex,
    });
    return decryptedString.toString(CryptoJS.enc.Utf8);
  } catch (e) {
    console.log(e);
    return '';
  }
};
