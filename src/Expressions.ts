import { RuntimeVal, NumberVal, MAKE_NUM, MAKE_NULL } from "./Values";
import { BinaryExpr } from "./ast"
import Environment from "./Environment"
import { evaluate } from "./Interpeter"

function eval_number_binary_expr(lhs: NumberVal, rhs: NumberVal, op: string) {
    let res: number;
    
    if(op == '+') {
	    res = lhs.value + rhs.value;
    }
    else if(op == '-') {
    	res = lhs.value - rhs.value;
    }
    else if(op == '*') {
	    res = lhs.value * rhs.value;
    }
    else if(op == '/') {
        if(rhs.value == 0) {
            res = lhs.value
        } else {
            res = lhs.value / rhs.value; 
        }
    }
    else {
	    res = lhs.value % rhs.value;
    }
    return MAKE_NUM(res)
}

export function eval_binary_expr(binary: BinaryExpr, env: Environment): RuntimeVal {
    let LHS = evaluate(binary.left, env)
    let RHS = evaluate(binary.right, env);
    if(LHS.type == "number" && RHS.type == "number") {
	    return eval_number_binary_expr(LHS as NumberVal,  RHS as NumberVal, binary.operator)
    }
    return MAKE_NULL()
}

export function eval_identifier(ident: Identifier, env: Envrionment): RuntimeVal {
    const val = env.lookUpVar(ident.symbol)
    return val;
}