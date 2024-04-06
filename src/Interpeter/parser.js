import lexer from "./lexer";

export default function parser(tokens) { 
    const ast = {
        type: 'Program',
        body: []
    };
    while (tokens.length > 0) {
        let token = tokens.shift()
        if(token.type === 'keyword' && token.value === 'eta'){
            let declaration = {
                type: 'declaration',
                name: tokens.shift().value,
                value: null
            }
            if (tokens[0].type === 'operator' && tokens[0].value === '=') {
                tokens.shift();
                let expression = ''
                
                while (tokens[0]?.type !== 'keyword' && tokens.length > 0) {
                 
                    if (tokens[0]?.type !== 'operator' && tokens[1]?.type === 'identifier'&&tokens[0]?.type !== 'brackets') {
                        expression += tokens.shift().value 
                        break
                    }
                    if (tokens[0]?.type === 'operator' && tokens[0]?.value === '#') {
                        break
                    }
                    expression += tokens.shift().value;  
                }
                declaration.value= expression.trim();
            }
            ast.body.push(declaration);
        }

        if (token.type === 'identifier') {
            let equation = {
                type: 'equation',
                name: token.value,
                value: null
            }
            if (tokens[0]?.type === 'operator' && tokens[0].value === '=') {
                tokens.shift();
                let expression = ''
                while (tokens[0]?.type !== 'keyword' && tokens.length > 0) {
                    if (tokens[0]?.type !== 'operator' && tokens[1]?.type === 'identifier'&&tokens[0]?.type !== 'brackets') {
                        expression += tokens.shift().value
                        break
                    }
                    if (tokens[0]?.type === 'operator' && tokens[0]?.value === '#') {
                        break
                    }
                    expression += tokens.shift().value;
                }
                 equation.value= expression.trim();
            } else if (tokens[0]?.type === 'operator' && tokens[1].value === '=' &&/(\+|-|\*|\/|\!|\%)/.test(tokens[0].value)) {
                equation.name += tokens.shift().value;
                tokens.shift();
                let expression = ""
                while (tokens[0]?.type !== 'keyword' && tokens.length > 0) {
                    if (tokens[0]?.type !== 'operator' && tokens[1]?.type === 'identifier'&&tokens[0]?.type !== 'brackets') {
                        expression += tokens.shift().value
                        break
                    }
                    if (tokens[0]?.type === 'operator' && tokens[0]?.value === '#') {
                        break
                    }
                    expression += tokens.shift().value;  
                    
                }
                    equation.value= expression.trim();
            }
            ast.body.push(equation);
        }

        if (token.type === 'keyword' && token.value === 'jodi') { 
            
            let conditions = {
                type: 'conditions',
                value: null
            }
            let blockCode = {
                type: 'blockCode',
                conditions:null,
                body: null
            }
            let expression = '';
            if(tokens[0]?.type === 'brackets' && tokens[0].value === '('){
                tokens.shift();
                while (tokens[0]?.type !== 'condition_if' && tokens.length > 0 ) {
                expression += tokens.shift().value;
            }
                conditions.value = expression.trim();
                blockCode.conditions = conditions;
                tokens.shift();
            }
            let blockBody = null;
            let element = []
            if (tokens[0]?.type === 'brackets' && tokens[0].value === '{') {
                tokens.shift();
               
                while (tokens[0].type !== 'brackets_end') {
                    element.push(tokens[0])
                    tokens.shift()
                }
               
                let joined = element.map((el) => el.value).join(' ')
                let joined_tokens = lexer(joined)
                blockBody = parser(joined_tokens);
                blockCode.body = blockBody;
                 tokens.shift();
                
            }
            ast.body.push(blockCode);
        }

        if (token.type === 'keyword' && token.value === 'othoba') { 
            
            let conditions = {
                type: 'conditions',
                value: null
            }
            let blockCode_if_else = {
                type: 'blockCode_if_else',
                conditions:null,
                body: null
            }
            let expression = '';
            if(tokens[0]?.type === 'brackets' && tokens[0].value === '('){
                tokens.shift();
                while (tokens[0]?.type !== 'condition_if_else' && tokens.length > 0 ) {
                expression += tokens.shift().value;
            }
                conditions.value = expression.trim();
                blockCode_if_else.conditions = conditions;
                tokens.shift();
            }
            let blockBody = null;
            let element = []
            if (tokens[0]?.type === 'brackets' && tokens[0].value === '{') {
                tokens.shift();
               
                while (tokens[0].type !== 'brackets_end') {
                    element.push(tokens[0])
                    tokens.shift()
                  
                }
               
                let joined = element.map((el) => el.value).join(' ')
                let joined_tokens = lexer(joined)
                blockBody = parser(joined_tokens);
                blockCode_if_else.body = blockBody;
                 tokens.shift();
                
            }
            ast.body.push(blockCode_if_else);
        }

         if (token.type === 'keyword' && token.value === 'noito') { 
            let blockCode_else  = {
                type: 'blockCode_else',
                body: null
            }
            let blockBody = null;
            let element = []
            if (tokens[0]?.type === 'brackets' && tokens[0].value === '{') {
                tokens.shift();
               
                while (tokens[0].type !== 'brackets_end') {
                    element.push(tokens[0])
                    tokens.shift()
                }
               
                let joined = element.map((el) => el.value).join(' ')
                let joined_tokens = lexer(joined)
                blockBody = parser(joined_tokens);
                blockCode_else.body = blockBody;
                 tokens.shift();
            }
            ast.body.push(blockCode_else);
        }
        if (token.type === 'keyword' && token.value === 'porjonto') { 
            let conditions = {
                type: 'conditions',
                value: null
            }
            let blockCode_loop = {
                type: 'blockCode_loop',
                conditions:null,
                body: null
            }
            let expression = '';
            if(tokens[0]?.type === 'brackets' && tokens[0].value === '('){
                tokens.shift();
                while (tokens[0]?.type !== 'condition_while' && tokens.length > 0) {
                expression += tokens.shift().value;
            }
                conditions.value = expression.trim();
                blockCode_loop.conditions = conditions;
                tokens.shift();
            }
            let blockBody = null;
            let element = [] 
            if (tokens[0]?.type === 'brackets' && tokens[0].value === '{') {
                tokens.shift();
               
                while (tokens[0].type !== 'brackets_end') {
                    element.push(tokens[0])
                    tokens.shift()
                  
                }
               
                let joined = element.map((el) => el.value).join(' ')
                let joined_tokens = lexer(joined)
                blockBody = parser(joined_tokens);
                blockCode_loop.body = blockBody;
                 tokens.shift();
            }
            ast.body.push(blockCode_loop);
        }

        if (token.type === 'keyword' && token.value === 'chol') { 
            ast.body.push({
                type: 'continue',
                value: token.value
            }); 
        }

        if (token.type === 'keyword' && token.value === 'tham') { 
            ast.body.push({
                type: 'break',
                value: token.value
            }); 
        }

        if (token.value === '#') { 
            while (tokens[0]?.value !== '#'&& tokens.length > 0) {
                tokens.shift();
            }
            tokens.shift();
        }

        if(token.type === 'keyword' && token.value === 'lekh'){
            let expression = '';
            while (tokens[0]?.type !== 'keyword' && tokens.length > 0) {
                if (tokens[0]?.type !== 'operator' && tokens[1]?.type === 'identifier'&&tokens[0]?.type !== 'brackets') {
                        expression += tokens.shift().value + ' ' 
                        break
                }
                if (tokens[0]?.type === 'operator' && tokens[0]?.value === '#') {
                        break
                    }
                expression += tokens.shift().value + ' ';
            }
            
            ast.body.push({
                type: 'print',
                value: expression.trim()
            });
        }
    }
    return ast;
}