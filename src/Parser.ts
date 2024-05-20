import { Tokenize, TokenTypes, Token } from "./Lexer"
import {
    NodeTypes,
    Statement,
    Program,
	VarDeclaration,
    Expr,
    BinaryExpr,
    Identifier,
    NumericLiteral
} from "./ast"



export default class Parser {
    private tokens: Token[] = [];
    
    private not_eof(): boolean {
        return this.tokens[0].type != TokenTypes.Eof
    }
    
    private at() {
        return this.tokens[0] as Token;
    }
    
    private adv() {
        const btok = this.tokens.shift() as Token;
        return btok;
    }
    
    private expects(type: TokenTypes, err: any) {
	const btok = this.tokens.shift() as Token;
	if(!btok || btok.type != type) {
	    console.log("Parser:", err, btok, "expecting", type)
	}

	return btok;
    }

    public createAST(src_code: string): Program {
        this.tokens = Tokenize(src_code);
        const program: Program = {
            kind: "Program",
            body: []
        }
        
        while(this.not_eof()) {
            program.body.push(this.parse_statement())
        }
        
        return program;
    }
    
    private parse_statement(): Statement {
        
		switch(this.at().type) {
			case TokenTypes.Define:
			    return this.parse_var_declaration()
			case TokenTypes.Const:
				return this.parse_var_declaration()
			default:
				return this.parse_expr()
		}
    }
    
	private parse_var_declaration(): Statement{
		const isConstant = this.adv().type == TokenTypes.Const;
		const identifier = this.expects(TokenTypes.Identifier, "Expected Identifier name following define | const keywords.").value;

		if(this.at().type == TokenTypes.SemiColon) {
			this.adv();
			if(isConstant) {
				throw `Constant variables must be assignd to a value`
			}
			return { kind: "VarDeclaration", identifier, constant: false } as VarDeclaration;
		}

		this.expects(TokenTypes.Equals, "Expected Equals token")

		const declaration = {
			kind: "VarDeclaration",
			identifier: identifier,
			value: this.parse_expr(),
			constant: isConstant
		} as VarDeclaration;

		this.expects(TokenTypes.SemiColon, "Expected SemiColon")

		return declaration;
	}
    private parse_expr(): Expr {
        
        return this.parse_additive_expr();
    }
	
	private parse_additive_expr(): Expr {
		let left = this.parse_multipicative_expr()

	    while(this.at().value == '+' || this.at().value == '-') {
		const operator = this.adv().value;
		const right = this.parse_multipicative_expr()
		left = {
		    kind: "BinaryExpr",
		    left,
		    right,
		    operator
		} as BinaryExpr;
	    }

	    return left;
	}
    private parse_multipicative_expr(): Expr {
	let left = this.parse_primary_expr()

	while(this.at().value == '*' || this.at().value == '/' || this.at().value == '%') {
	    const operator = this.adv().value;
	    const right = this.parse_primary_expr()
	    left = {
		kind: "BinaryExpr",
		left,
		right,
		operator
	    } as BinaryExpr;
	}

	return left;
    }
    private parse_primary_expr(): Expr {
        const tk = this.at().type;
        
        switch (tk) {

            case TokenTypes.Numeric: {
                return { kind: "NumericLiteral", value: parseFloat(this.adv().value) } as NumericLiteral;
	        }
            case TokenTypes.LParen: {
		        this.adv()
		        const value = this.parse_expr();
		        this.expects(TokenTypes.RParen, "No closing parenthesis found")
		        return value;
	        }
	        case TokenTypes.Define: {
		        return { kind: "Identifier", symbol: this.adv().value } as Identifier;
	        }
	        case TokenTypes.Identifier: {
		        return { kind: "Identifier", symbol: this.adv().value } as Identifier;
	        }

            default:
                console.error("Unexpected token found while parsing: ", this.at())
                return {} as Statement; // TODO: temporary return Statement
        }
    }
}
