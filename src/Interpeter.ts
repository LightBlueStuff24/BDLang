import {
    RuntimeVal,
    NumberVal,
    MAKE_NULL,
    MAKE_NUM
} from "./Values"
import {
    Statement,
    Program,
    BinaryExpr,
    Identifier,
    NumericLiteral
} from "./ast"
import { eval_program, eval_var_declaration } from "./Statements"
import { eval_binary_expr, eval_identifier } from "./Expressions"
import Environment from "./Environment"


export function evaluate(astNode: Statement, env: Environment): RuntimeVal {
    switch(astNode.kind) {
	case "NumericLiteral": {
	    return {
		    value: (astNode as NumericLiteral).value,
		    type: "number"
	    } as NumberVal;
	}
	case "BinaryExpr": {
	    return eval_binary_expr(astNode as BinaryExpr, env)
	}
	case "Program": {
	    return eval_program(astNode as Program, env)
	}
	case "Identifier": {
		return eval_identifier(astNode as Identifier, env)
	}
	case "VarDeclaration": {
	    return eval_var_declaration(astNode as VarDeclaration, env)
	}
	default:
	    console.log(astNode)
	    console.error("AST node is not defined")
    }
}
