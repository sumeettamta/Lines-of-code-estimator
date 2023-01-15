import { Interface } from 'readline';
import { programmingLangToExtension } from "../enum/language";
import { ILangConfig } from "../interface";

export class LanguageInfo {

    private commentLineCount;
    private totalLineCount;
    private blankLineCount;
    private codeLineCount;

    private langConfig : ILangConfig;

    constructor(config: ILangConfig) {
        this.langConfig = config;
        this.commentLineCount = 0;
        this.totalLineCount = 0;
        this.blankLineCount = 0;
        this.codeLineCount = 0;
        console.log(this.langConfig)
    }

    checkifBlank(line: string) {
        if (!line) return true;
        return false;
    }

    checkIfSingleComment(line: string) {

        switch (this.langConfig.language) {
            case programmingLangToExtension.C:
            case programmingLangToExtension.C_PLUS_PLUS:
            case programmingLangToExtension.JAVASCRIPT:
            case programmingLangToExtension.JAVA:
                if (line.trim().length >= 2 && line.trim().startsWith(this.langConfig.commentStarts)) {
                    return true;
                }

                break;
            case programmingLangToExtension.PYTHON:
                if (line.trim().length >= 1 && line.trim().startsWith(this.langConfig.commentStarts)) {
                    return true;
                }
                break;
            default:
                break;
        }
        return false;
    }


    async calculate(file: Interface) {

        const start = async () => {
            for await (let line of file) {
                this.totalLineCount++;
                let code = true;
                if (this.checkifBlank(line)) {
                    this.blankLineCount++;
                    code = false;
                };
                if (this.checkIfSingleComment(line)) {
                    code = false;
                    this.commentLineCount++;
                }

                if (line.startsWith(this.langConfig.mutiLineCommentEnds)) {
                    code = false;
                    line += 1;
                    while (line && line.endsWith(this.langConfig.mutiLineCommentEnds)) {
                        line = line + 1;
                        this.totalLineCount++;
                    }
                }
                if (code) this.codeLineCount++;
            }
        }

        await start()
        
        console.log(`Blank: `, this.blankLineCount)
        console.log(`Comments: `, this.commentLineCount)
        console.log(`Code: `, this.codeLineCount)
        console.log(`Total:: `, this.totalLineCount)
    }
}
