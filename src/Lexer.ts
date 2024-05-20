export enum TokenTypes {
    Numeric,
    Identifier,
    BinaryOperator,
    Eof, SemiColon,
    Equals,
    
    LParen, RParen,
    LBrace, RBrace,
    LSquare, RSquare,
    

    Define, Const
}

export interface Token {
    value: string,
    type: TokenTypes
}

export const Keyword: Record<string, TokenTypes> = {
    define: TokenTypes.Define,
    const: TokenTypes.Const
}

export function Token(value="", type: TokenTypes): Token {
    return { value: value, type: type }
}


export function skipWS(c: string[]): void {
    if(c[0] == ' ' || c[0] == '\t' || c[0] == '\n') {
        c.shift()
    }
}

export function isNum(c: string): boolean {
    let n = c.charCodeAt(0)
    let b = ["0".charCodeAt(0), "9".charCodeAt(0)]
    return n >= b[0] && n <= b[1];
}

export function isAlpha(c: string): boolean {
    return c.toUpperCase() != c.toLowerCase()
}

export function Tokenize(src_code: string): Token[] {
    const Tokens = new Array<Token>()
    const src = src_code.split('')
    
    while(src.length > 0) {
        skipWS(src)
        if(src[0] == '(') Tokens.push(Token(src.shift(), TokenTypes.LParen))
        else if(src[0] == ')') Tokens.push(Token(src.shift(), TokenTypes.RParen))
        else if(src[0] == '{') Tokens.push(Token(src.shift(), TokenTypes.LBrace))
        else if(src[0] == '}') Tokens.push(Token(src.shift(), TokenTypes.RBrace))
        else if(src[0] == '[') Tokens.push(Token(src.shift(), TokenTypes.LSquare))
        else if(src[0] == ']') Tokens.push(Token(src.shift(), TokenTypes.RSquare))
        else if(src[0] == '+' || src[0] == '-' || src[0] == '*' || src[0] == '/' || src[0] == '%') {
            Tokens.push(Token(src.shift(), TokenTypes.BinaryOperator))
        }
        else if(src[0] == '=') Tokens.push(Token(src.shift(), TokenTypes.Equals))
	else if(src[0] == ';') {
	    Tokens.push(Token(src.shift(), TokenTypes.SemiColon))
	}
        else {
            if(isNum(src[0])) {
                let num = "";
                while(src.length > 0 && isNum(src[0])) {
                    num += src.shift()
                }
                Tokens.push(Token(num, TokenTypes.Numeric))
            }
            else if(isAlpha(src[0])) {
                let str = "";
                while(src.length > 0 && isAlpha(src[0])) {
                    str += src.shift()
                }
                
                const key = Keyword[str]
                
                if(key == undefined) {
                    Tokens.push(Token(str, TokenTypes.Identifier))
                }
                else {
                    Tokens.push(Token(str, key))
                }
            }
            else {
                console.info("Unexpected character: " + src[0])
            }
        }
    }
    Tokens.push(Token("EOF", TokenTypes.Eof))

	return Tokens;
}
