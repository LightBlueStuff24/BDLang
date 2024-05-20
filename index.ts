import Environment from "./src/Environment"
import Parser from "./src/Parser"
import { evaluate } from "./src/Interpeter"
import { MAKE_NUM, MAKE_BOOL, MAKE_NULL } from "./src/Values"

Intepeter()

async function Intepeter() {
    const parser = new Parser()
    const env = new Environment()
    env.declareVar("x", MAKE_NUM(20))
    env.declareVar("true", MAKE_BOOL())
    env.declareVar("false", MAKE_BOOL("false"))
    env.declareVar("null", MAKE_NULL())
    console.log("\nInterpeter v1.0")
    
    
    while (true) {
        const input = prompt("> ")

        if (!input || input.includes("exit")) {
            return 1;
        }  
        const program = parser.createAST(input)
        //console.log("----------------------------")
        //console.log(Bun.inspect(program, { depth: null }))
        //console.log("----------------------------")
        const result = evaluate(program, env)
        //console.log(Bun.inspect(result, { depth: null }))
        //console.log("----------------------------")
		console.log(result.value)
    }
}

