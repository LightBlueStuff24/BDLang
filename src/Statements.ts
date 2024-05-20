import { RuntimeVal, MAKE_NULL,  } from "./Values"
import { Program, VarDeclaration } from "./ast"
import Environment from "./Environment"
import { evaluate } from "./Interpeter"

export function eval_program(program: Program, env: Environment): RuntimeVal {
    let lastEvaled: RuntimeVal = MAKE_NULL()

    for(const stmt of program.body) {
	    lastEvaled = evaluate(stmt, env)
    }
    return lastEvaled;
}

export function eval_var_declaration(declaration: VarDeclaration, env: Environment): RuntimeVal {
	const value = declaration.value
	    ? evaluate(declaration.value, env)
	    : MAKE_NULL();
	return env.declareVar(declaration.identifier, value)
}
