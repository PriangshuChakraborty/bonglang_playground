import React from 'react'
import { useState,useRef } from 'react'
import RunCode from './RunCode';
import compiler from '../Interpeter/compiler';
import runner  from '../Interpeter/runner';
import Output from './Output';
import { Editor } from '@monaco-editor/react'


const CodeEditor = () => {
  const [result, setResult] = useState("");
  const [counter, setCounter] = useState(0);

   const first = `lekh "hello world"`
    
    const editorRef = useRef();

    const onMount = (editor,monaco) => { 
         editorRef.current = editor
          editor.focus()

          monaco.languages.register({ id: 'bonglang' });


    monaco.languages.setMonarchTokensProvider('bonglang', {
      tokenizer: {
        root: [
          [/\b(eta|lekh|jodi|othoba|noito|porjonto|chol|tham)\b/, "keyword"],
          [/\bnull\b/, "null"],
          [/\b(true|false)\b/, "boolean"],
          [/\b\d+\b/, "number"],
          [/\b\w+\b/, "identifier"],
          [/#.*?#/, "comment"],
          [/"([^"\\]|\\.)*$/, "string.invalid"], 
          [/"/, "string", "@string_content"],
        ],
        string_content: [
          [/[^\\"]+/, "string"],
          [/\\./, "string.escape"],
          [/"/, "string", "@pop"]
        ],
      }
    });


      monaco.languages.setLanguageConfiguration('bonglang', {
      brackets: [
        ['(', ')'],
        ['{', '}'],
        ['[', ']'],
        ['"', '"'],
        ["'", "'"]
      ],
      autoClosingPairs: [
        { open: '{', close: '}' },
        { open: '[', close: ']' },
        { open: '(', close: ')' },
        { open: '"', close: '"',notIn: ['string', 'comment'] },
        { open: "'", close: "'",notIn: ['string', 'comment'] }
      ]
    })

    monaco.editor.defineTheme('myCustomTheme', {
    base: 'vs-dark', 
    inherit: true, 
    rules: [
      { token: 'keyword', foreground: 'D862BC' }, 
      { token: 'null', foreground: '8585ad' },
      { token: 'string', foreground: '70db70' }, 
      { token: 'comment', foreground: '808080' },              
      { token: 'number', foreground: 'adad85' },
      { token: 'boolean', foreground: '66d9ff' }, 
      { token: 'identifier', foreground: 'ff6666' },
      { token: 'string.escape', foreground: 'FF0000' }, 
      { token: 'string.invalid', foreground: 'FF0000' }
    ],
    colors: {
      'editor.background': '#1E1E1E', 
      'editor.foreground': '#D4D4D4', 
    }
 });

 monaco.editor.setTheme('myCustomTheme');
    monaco.languages.registerCompletionItemProvider('bonglang', {
      provideCompletionItems: function(model, position) {
        let textUntilPosition = model.getValueInRange({
          startLineNumber: 1,
          startColumn: 1,
          endLineNumber: position.lineNumber,
          endColumn: position.column
        });

        let letiableRegex = /\beta\s+(\w+)\b/g;
    let match;
    let declaredletiables = [];
    while ((match = letiableRegex.exec(textUntilPosition)) !== null) {
      declaredletiables.push({
        label: match[1], 
        kind: monaco.languages.CompletionItemKind.letiable,
        insertText: match[1]
      });
    }

        let suggestions = [
          {
            label: "eta",
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: "eta"
          }, {
            label: "lekh",
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: "lekh"
          }, {
            label: "jodi",
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: "jodi"
          }, {
            label: "othoba",
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: "othoba"
          }, {
            label: "noito",
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: "noito"
          }, {
            label: "porjonto",
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: "porjonto"
          }, {
            label: "chol",
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: "chol"
          }, {
            label: "tham",
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: "tham"
          }, {
            label: "true",
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: "true"
          }, {
            label: "false",
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: "false"
          }
        ].concat(declaredletiables);

        return { suggestions: suggestions };
      }
    });

    }

  const handleClick = () => {
    try {
      setCounter(0);
      let code = editorRef.current.getValue();
      let excutableCode = compiler(code);
      let sol = runner(excutableCode)
      if (sol === "") {
        setCounter(2)
        setResult("Babu kichu toh lekho")
      } else {
        setResult(sol)
      }

      console.log(counter)
    } catch (error) {
      setCounter(1);
     let msg = "Babu bhul hoyeche !! arekbar check koro code ta !!"
        setResult(msg)
    }
  }
  return (
    <div>
      <div className='w-full flex justify-between items-end mb-5 sm:pr-2 md:pr-7 md:mb-8 lg:pr-10'>
        <h1 className="text-xl font-bold text-gray-900 ml-3 sm:text-2xl sm:ml-4 md:text-4xl md:ml-6 lg:ml-8">Play Ground</h1>
        <RunCode onClick={handleClick} />
      </div>
      <div className='w-full flex flex-col justify-center items-center '>
        <Editor
            height="60vh"
          width="91.5vw"
          defaultLanguage="bonglang"
            onMount={onMount}
            theme="vs-dark"
          defaultValue={first}
          options={{
        wordWrap: 'on',
        minimap: { enabled: false },
        fontSize: 16,
        tabSize: 2,
        insertSpaces: true,
         scrollBeyondLastLine: false,
         padding: { top: 20, bottom: 10 }
       }}
      />
        {result && <Output output={result} count={counter}/>}
          </div>
    </div>
  )
}

export default CodeEditor