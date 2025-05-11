import CONFIG from "@/config";
import Cryptr from "cryptr";

export function encrypt(text: string) {
  const secretKey = CONFIG.KEY_ENCRYPTION as string;
  const cryptr = new Cryptr(secretKey);

  const encryptedString = cryptr.encrypt(text);
  return encryptedString; 
}

export function decrypt(encryptedString: string) {
    const secretKey = CONFIG.KEY_ENCRYPTION as string;
    const cryptr = new Cryptr(secretKey);
  
    const text = cryptr.decrypt(encryptedString);
    return text;
  }