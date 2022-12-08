import { window, commands, SnippetString } from 'vscode';

export function snippet_generate() {
  
  const editor = window.activeTextEditor;
  if (editor) {
    const document = editor?.document;
    const selection = editor?.selection;
    const text = document.getText(selection);  
    console.log(text);
  }
    
}
