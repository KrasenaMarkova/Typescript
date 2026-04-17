import { Cipher } from "./contracts/cipher";
import { PartialMessageEncoder } from "./contracts/implemented/partialMessageEncoder";
import { Language } from "./contracts/language";
import { MessageEncoder } from "./contracts/messageEncoder";
import { ProcessedCharsType } from "./types";

//1.	The LanguageMessageEncoder should inherit the PartialMessageEncoder abstract class
// have method signatures compatible with the MessageEncoder interface
//3.	The LanguageMessageEncoder class should be a generic class accepting 2 generic parameters - 
// a Language and a Cipher compatible with that language. 

export class LanguageMessageEncoder<
    TLang extends Language,
    TCipher extends Cipher<TLang>
> extends PartialMessageEncoder implements MessageEncoder{
    //•	Functionality - LanguageMessageEncoder class 
    // Keep track of the total number of sucessfully encoded and decoded characters.
    private encodedCharsCount = 0;
    private decodedCharsCount = 0;

    //! constructor must work with Language and Cipher
    // тъй като екстендваме PartialMessageEncoder вземаме от там всичко, което има в конструктура
      constructor(lang: TLang, cipher: TCipher) {
        super(lang, cipher);
    }

    public encodeMessage(secretMessage: unknown) {
        // 1a. In case the passed value is not a string or has a 
        // length of 0 characters returns the string "No message."
        if (typeof secretMessage !== 'string' || secretMessage.length === 0) {
            return "No message.";
        }

        // намираме изчистеното съобщение, чрез метода stripForbiddenSymbols
        const strippedMessage = this.stripForbiddenSymbols(secretMessage);
        // проверяваме дали моето съобщение е съвместимо с изискванията True/ False
        const isCompatible = this.language.isCompatibleToCharset(strippedMessage);

        // 1b. In case the message, after being stripped from forbidden symbols is not compatible with the language, 
        // returns the string "Message not compatible."
          if (!isCompatible) {
            return "Message not compatible.";
        }

        // 1c. Otherwise gets the message stripped from forbidden symbols, encodes it using the provided cipher and returns it.
        // кодираме съобщението
        const encodedMessage = this.cipher.encipher(strippedMessage);
        // броим колко кода сме енкоднали
        this.encodedCharsCount += encodedMessage.length;
        return encodedMessage;
    }

    public decodeMessage(secretMessage: unknown): string {
        // 2a. In case the passed value is not a string or has a length of 0 characters returns the string "No message."
        if (typeof secretMessage !== 'string' || secretMessage.length === 0) {
            return "No message.";
        }

        // проверяваме дали моето съобщение е съвместимо с изискванията True/ False
        const isCompatible = this.language.isCompatibleToCharset(secretMessage);

        // 2b. In case the message is not compatible with the language, returns the string "Message not compatible."
          if (!isCompatible) {
            return "Message not compatible.";
        }

        // 2c. Otherwise decodes the message using the provided cipher and returns it.
        const decodedMessage = this.cipher.decipher(secretMessage);
        this.decodedCharsCount += decodedMessage.length;
        return decodedMessage;
    }

    // вариант 1 - public totalProcessedCharacters(type: 'Encoded' | 'Decoded' | 'Both'): string 
    // вариант 2 - public totalProcessedCharacters(type: ProcessedCharsType): string {
    // като създаваме от отделен файл в src - types.ts и тук като го извикаме(type: ProcessedCharsType): string
    // трябва да ни импортне правилния клас най-горе 
       public totalProcessedCharacters(type: ProcessedCharsType): string {
        let totalChars = 0;

        switch (type) {
            case 'Encoded':
                totalChars = this.encodedCharsCount;
                break;
            case 'Decoded':
                totalChars = this.decodedCharsCount;
                break;
            case 'Both':
                totalChars = this.encodedCharsCount + this.decodedCharsCount;
                break;
        }
//returns a message containing the total number of processed characters in the format "Total processed characters count: 
         return `Total processed characters count: ${totalChars}`;
    }

    // тъй като има грешка в оригиналната имплементация replace, а не replaceAll
    // на изпити не би трябвало да има такива грешки
    protected override stripForbiddenSymbols(message: string): string {
        let forbiddenSymbols = PartialMessageEncoder.forbiddenSymbols;
        forbiddenSymbols.forEach(x => message = message.replaceAll(x, ''));
        return message;
    }
}
