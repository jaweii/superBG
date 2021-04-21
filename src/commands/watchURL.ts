import * as vscode from "vscode";
import { join } from "path";

const watchURL = vscode.commands.registerCommand(
  "superBG.watchURL",
  async () => {
    // The code you place here will be executed every time your command is executed
    let defaultUri: vscode.Uri | undefined;
    const workspaceFolders = vscode.workspace.workspaceFolders;
    if (workspaceFolders && workspaceFolders.length > 0) {
      defaultUri = vscode.Uri.file(join("../", workspaceFolders[0].uri.path));
    }
    const url = await vscode.window.showInputBox({
      placeHolder: "http(s)://...",
    });
    if (!url) {
      return;
    }
    const configuration = vscode.workspace.getConfiguration("superBG");
    // configuration.update("video", "");
    configuration.update("images", []);
    configuration.update("url", url);
  }
);

export default watchURL;
