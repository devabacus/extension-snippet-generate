import * as _ from "lodash";
import {commands, ExtensionContext, languages, workspace, window}  from 'vscode';

import {snippet_generate} from "./commands/snippet_generate";
import { removeUnusedImports } from "./commands/unused_import_remove";

export function activate(context: ExtensionContext) {



//   const disposable = commands.registerCommand('extension.helloWorld', () => {
//     window.showInformationMessage('привет!');
//   });

context.subscriptions.push(
	commands.registerCommand('extension.snippet_generate', snippet_generate)
  );


context.subscriptions.push(
  commands.registerCommand('extension.removeUnusedImports', () => {
      const editor = window.activeTextEditor;
      if (editor) {
          const document = editor.document;
          removeUnusedImports(document.uri.fsPath);
      }
  })
);

}
