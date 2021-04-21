import * as vscode from "vscode";
import selectImages from "./commands/selectImages";
// import selectVideo from "./commands/selectVideo";
import watchURL from "./commands/watchURL";
import enableOrDisable from "./commands/enableOrDisable";
import increaseOpacity from "./commands/increaseOpacity";
import decreaseOpacity from "./commands/decreaseOpacity";
import increaseScale from "./commands/increaseScale";
import decreaseScale from "./commands/decreaseScale";
import previousImage from "./commands/previousImage";
import nextImage from "./commands/nextImage";
import increaseEmulatedWidth from "./commands/increaseEmulatedWidth";
import decreaseEmulatedWidth from "./commands/decreaseEmulatedWidth";
import superBG from "./SuperBG";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log("superBG activated");
  superBG.asyncConfigFile();
  superBG.injecter.injectSuperBGToWorkbench();
  context.subscriptions.push(selectImages);
  // context.subscriptions.push(selectVideo);
  context.subscriptions.push(watchURL);
  context.subscriptions.push(enableOrDisable);
  context.subscriptions.push(increaseOpacity);
  context.subscriptions.push(decreaseOpacity);
  context.subscriptions.push(previousImage);
  context.subscriptions.push(nextImage);
  context.subscriptions.push(increaseScale);
  context.subscriptions.push(decreaseScale);
  context.subscriptions.push(increaseEmulatedWidth);
  context.subscriptions.push(decreaseEmulatedWidth);

  vscode.workspace.onDidChangeConfiguration(() => {
    superBG.asyncConfigFile();
  });
}

// this method is called when your extension is deactivated
export function deactivate() {
  console.log("superBG deactivated");
  const folders = vscode.workspace.workspaceFolders;
  if (folders && folders?.length > 0) {
    superBG.removeConfigFile(folders[0].name);
  }
  superBG.injecter.removeSuperBGFromWorkbench();
}
