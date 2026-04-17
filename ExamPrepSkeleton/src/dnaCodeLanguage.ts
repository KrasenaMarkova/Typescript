import { Language } from "./contracts/language";
import { DnaBases } from "./types";

// Implement a new DNACodeLanguage class - implements the Language interface 
export class DNACodeLanguage implements Language {
    //charset consists allows only the string characters for DNA bases (A, C, G, T in that order) 
   private _charset: Set<DnaBases> = new Set(['A', 'C', 'G', 'T']);

   // това го изисква класа Languages
   get charset() {
       return this._charset;
   }

   // 5b. Considers messages compatible if they also only consist of string characters for DNA bases (A, C, G or T)
     isCompatibleToCharset(message: string): boolean {
        // разбиваме съобщението на букви
        const messageChars = message.split('');
        // извличаме стойностите от Set в масив, за да ни е по-удобно да работим
        const allowedChars: string[] = Array.from(this.charset.values());
        // проверяваме съобщението дали е съвместимо
        const isCompatible = messageChars.every(ch => allowedChars.includes(ch));
        return isCompatible;
    }
}