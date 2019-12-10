import { sample } from "lodash";

const DEFAULT_FORMAT = "code-@@@@*";
export const DEFAULT_STR_UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
export const DEFAULT_STR_LOWER = DEFAULT_STR_UPPER.toLowerCase();
const DEFAULT_NUM = "0123456789";
const DEFAULT_CNT = 100;

export interface Options {
    count: number;
    format: string;
    numSet: string;
    strSet: string;
}

export const defaultOptions: Options = {
    count: DEFAULT_CNT,
    format: DEFAULT_FORMAT,
    numSet: DEFAULT_NUM,
    strSet: DEFAULT_STR_UPPER + DEFAULT_STR_LOWER,
};

export function generateCode(options: Options) {
    const codeList: string[] = [];

    for (let i = 0; i < options.count; i++) {
        const code = getCode(codeList, options);
        codeList.push(code);
    }

    return codeList;
}

function getCode(currentList: string[], options: Options, codeCallStack = 0): string {
    if (codeCallStack === 100) {
        console.error("cannot generate code with this format::", codeCallStack);
        throw Error("duplicate code generated call codeCallStack");
    }

    let generatedCode = options.format;

    const numMatch = generatedCode.match(/@/g);
    const strMatch = generatedCode.match(/\*/g);

    for (let i = 0; i < (numMatch ? numMatch.length : 0); i++) {
        generatedCode = generatedCode.replace(/@/, sample(options.numSet) || "");
    }

    for (let i = 0; i < (strMatch ? strMatch.length : 0); i++) {
        generatedCode = generatedCode.replace(/\*/, sample(options.strSet) || "");
    }

    if (currentList.includes(generatedCode)) {
        return getCode(currentList, options, codeCallStack + 1);
    } else {
        return generatedCode;
    }
}
