import * as vscode from "vscode";
import { join } from "path";

const selectVideo = vscode.commands.registerCommand(
  "superBG.selectVideo",
  async () => {
    // The code you place here will be executed every time your command is executed
    let defaultUri: vscode.Uri | undefined;
    const workspaceFolders = vscode.workspace.workspaceFolders;
    if (workspaceFolders && workspaceFolders.length > 0) {
      defaultUri = vscode.Uri.file(join("../", workspaceFolders[0].uri.path));
    }
    const uriArr = await vscode.window.showOpenDialog({
      title: "Select video",
      canSelectFiles: true,
      canSelectFolders: false,
      canSelectMany: false,
      defaultUri,
      filters: {
        images: ["mp4", "webm", "ogg"],
      },
    });
    if (!uriArr || uriArr.length < 1) {
      return;
    }
    const configuration = vscode.workspace.getConfiguration("superBG");
    configuration.update("video", uriArr[0].path);
    configuration.update("images", []);
    configuration.update("url", "");
  }
);

export default selectVideo;
