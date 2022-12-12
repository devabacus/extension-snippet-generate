import { window, commands, Position, OpenDialogOptions } from 'vscode';
import * as _ from "lodash";

// import * as mkdirp from 'mkdirp';

export function snippet_generate() {
  const editor = window.activeTextEditor;
  if (editor) {
    const document = editor?.document;
    const selection = editor?.selection;
    const codeBlock = document.getText(selection);
    const line = selection.end.line;
    const newline = line + 2;

    editor.edit(async(builder) => {
      builder.insert(new Position(newline, 0), textChanger(codeBlock));
      // const mselect = new Selection(new Position(newline+2, 0), new Position(newline+5,20));
      // editor.selection(mselect);
      const targetDirectory = await promptForTargetDirectory();
      console.log(codeBlock);
    });
  }
}

async function promptForTargetDirectory(): Promise<string | undefined> {
  const options: OpenDialogOptions = {
    canSelectMany: false,
    openLabel: "Select a folder to create the bloc in",
    canSelectFolders: true,
  };

  return window.showOpenDialog(options).then((uri) => {
    if (_.isNil(uri) || _.isEmpty(uri)) {
      return undefined;
    }
    return uri[0].fsPath;
  });}

function textChanger(codeText: string): string {
  let changedText = '';
  const textRows = codeText.split('\n');

  for (let row = 0; row < textRows.length; row++) {
    // let rowText = addTabs(textRows[row].slice(0, -1));
    let rowText = escapeChars(textRows[row]);
    rowText = addTabs(rowText);
    if (rowText.includes('\r')) {
      rowText = rowText.slice(0, -1);
    }
    // rowText = textRows[row].replace(/[\r,\n]/, '');
    changedText += '"' + rowText + '",\n';
  }
  return changedText;
}

function addTabs(codeRow: string): string {
  let codeRowChanged = '';
  // replace spaces with \t as spaces ignore in snipptets.json
  if (codeRow.startsWith('  ')) codeRowChanged = '\\t' + codeRow.trim();
  else if (codeRow.startsWith('    ')) codeRowChanged = '\\t\\t' + codeRow.trim();
  else codeRowChanged = codeRow.trim();
  return codeRowChanged;
}

function escapeChars(codeRow: string): string {
  return codeRow.replace(/"/g, '\\"');
}
