import codeGenerator from "./codeGeneretor";
import lexer from "./lexer";
import parser from "./parser";

export default function compiler(input) {
    let tokens = lexer(input);
    let ast = parser(tokens);
    let excutableCode = codeGenerator(ast);
    return excutableCode
}