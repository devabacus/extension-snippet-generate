import * as _ from "lodash";
import {commands, ExtensionContext, languages, workspace, window}  from 'vscode';

import {snippet_generate} from "./commands/snippet_generate";

export function activate(context: ExtensionContext) {



//   const disposable = commands.registerCommand('extension.helloWorld', () => {
//     window.showInformationMessage('привет!');
//   });

context.subscriptions.push(
	commands.registerCommand('extension.helloWorld', snippet_generate)
  );
}
