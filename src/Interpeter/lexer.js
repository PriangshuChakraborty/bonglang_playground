export default function lexer(input) {
    const tokens = [];
    let cursor = 0;
    let brackets_stack = [];
    let brackets_while;
    let brackets_if;
    let brackets_if_else;

    while (cursor < input.length) {
       

        if (/\s/.test(input[cursor])) {
            cursor++;
            continue;
        }

        if (/[A-Za-z]/.test(input[cursor])) {
            let word = "";

            while (/[a-zA-Z0-9_]/.test(input[cursor]) && cursor < input.length) { 
                word += input[cursor];
                cursor++;
            }

            if (word === 'porjonto') { 
                brackets_while = 0;
            } else if (word === 'jodi') {
                brackets_if = 0;
            }else if (word === 'othoba') {
                brackets_if_else = 0;
            }

            if (word === 'eta' || word === 'lekh' || word === 'jodi' || word === 'noito' || word === 'porjonto'||word === 'othoba'||word === 'chol'||word === 'tham') {
                
                tokens.push({ type: 'keyword', value: word });
            } else {
                tokens.push({ type: 'identifier', value: word });
            }
        }

        if (/[0-9]/.test(input[cursor])) {
            let number = "";
            while (/[0-9]/.test(input[cursor])||input[cursor] === '.') {
                number += input[cursor];
                cursor++;
            }
            tokens.push({ type: 'number', value: eval(number) });  
        }
        
        if (/[(){}\[\]]/.test(input[cursor])) {
            if (input[cursor] === '{') {
                brackets_stack.push(input[cursor]);
            } else if (input[cursor] === '}') {
                brackets_stack.pop();
            } else if (input[cursor] === '(') {
                brackets_while++;
                if (brackets_if !== undefined) {
                    brackets_if++;
                }
                if (brackets_if_else !== undefined) {
                    brackets_if_else++;
                }
            } else if (input[cursor] === ')') {
                brackets_while--;
                if (brackets_if !== undefined) {
                    brackets_if--;
                }
                if (brackets_if_else !== undefined) {
                    brackets_if_else--;
                    
                }
            }

            if (brackets_stack.length === 0 && input[cursor] === '}') {
                tokens.push({ type: 'brackets_end', value: input[cursor] })
            } else {
                if (brackets_while === 0 && input[cursor] === ')') {
                    tokens.push({ type: 'condition_while', value: input[cursor] });
                    brackets_while = undefined;
                } else {
                    if (brackets_if === 0 && input[cursor] === ')') {
                        tokens.push({ type: 'condition_if', value: input[cursor] });
                        brackets_if = undefined;
                    } else {
                        if (brackets_if_else === 0 && input[cursor] === ')') {
                            tokens.push({ type: 'condition_if_else', value: input[cursor] });
                            brackets_if_else = undefined;
                        } else {
                            tokens.push({ type: 'brackets', value: input[cursor] });
                        }
                    }
                }
            }
             
        }

        if (/(\+|-|\*|\/|=|\!|\>|\<|\%|\,|\#|\&|\|)/.test(input[cursor])) {
            tokens.push({ type: 'operator', value: input[cursor] });
        }
        if (input[cursor] === '"') {
            let string = '"';
            cursor++; 
            while (input[cursor] !== '"' && cursor < input.length) {
                string += input[cursor];
                cursor++;
            }
            string += '"';
            tokens.push({ type: 'string', value: string });
        }

        cursor++;
    }
    return tokens;
}