export default function codeGenerator(node) {
    switch (node.type) { 
        case 'Program':
            return node.body.map(codeGenerator).join('\n');
        case 'declaration':
            if (node.value === "null" || node.value===null) {
               return `let ${node.name}= "null";`;
            } else {
               return `let ${node.name} = ${node.value};`;
            }
        case 'equation':
            if (node.value === "null" || node.value===null) {
               return `${node.name}= "null";`;
            } else {
               return `${node.name}= ${node.value};`;
            }
        case 'print':
            return `console.log(${node.value});`;
        case 'blockCode':
            return `if(${node.conditions.value}){${node.body.body.map(codeGenerator).join('\n')}}`;
        case 'blockCode_else':
            return `else{${node.body.body.map(codeGenerator).join('\n')}}`;
        case 'blockCode_loop':
            return `while(${node.conditions.value}){${node.body.body.map(codeGenerator).join('\n')}}`;
        case 'blockCode_if_else':
            return `else if(${node.conditions.value}){${node.body.body.map(codeGenerator).join('\n')}}`;
        case 'continue':
            return `continue;`;
        case 'break':
            return `break;`;
    }
}