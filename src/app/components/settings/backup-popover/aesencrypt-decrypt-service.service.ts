import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class AESEncryptDecryptService {

  constructor() { }

  encrypt(value: string, passphrase: string): string{
    return CryptoJS.AES.encrypt(value, passphrase.trim()).toString();
  }

  decrypt(textToDecrypt: string, passphrase: string){
    return CryptoJS.AES.decrypt(textToDecrypt, passphrase.trim()).toString(CryptoJS.enc.Utf8);
  }
}