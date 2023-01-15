import * as fs from 'fs';
const readline = require('readline')
import { Interface } from 'readline';
import { fileName, langConfig } from './config';
import { LanguageInfo } from './model/languageInfo';

function getCodingLanguage(filename: string): any {
    return filename.split('.').pop();
}

async function main() {
    const file : Interface =  readline.createInterface({
        input: fs.createReadStream(fileName),
        output: process.stdout,
    });
    let codinglanguage  = getCodingLanguage(fileName)
    const configData = langConfig[codinglanguage];
    let languageInfo = new LanguageInfo({...configData, language : codinglanguage})
    languageInfo.calculate(file);
}
main()