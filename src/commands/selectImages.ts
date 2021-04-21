import * as vscode from "vscode";
import { join } from "path";

const selectImages = vscode.commands.registerCommand(
  "superBG.selectImages",
  async () => {
    // The code you place here will be executed every time your command is executed
    let defaultUri: vscode.Uri | undefined;
    const workspaceFolders = vscode.workspace.workspaceFolders;
    if (workspaceFolders && workspaceFolders.length > 0) {
      defaultUri = vscode.Uri.file(join("../", workspaceFolders[0].uri.path));
    }
    const uriArr = await vscode.window.showOpenDialog({
      title: "Select image",
      canSelectFiles: true,
      canSelectFolders: false,
      canSelectMany: true,
      defaultUri,
      filters: {
        images: ["png", "jpg", "gif", "jpeg", "webp"],
      },
    });
    if (!uriArr || uriArr.length < 1) {
      return;
    }
    const configuration = vscode.workspace.getConfiguration("superBG");
    const pathArr = uriArr.map((uri) => uri.path);
    configuration.update("images", pathArr);
    configuration.update("activeImage", 0);
    configuration.update("url", "");
    // configuration.update("video", "");
  }
);

export default selectImages;
