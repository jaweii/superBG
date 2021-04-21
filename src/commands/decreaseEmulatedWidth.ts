import * as vscode from "vscode";
import { join } from "path";

const decreaseEmulatedWidth = vscode.commands.registerCommand(
  "superBG.decreaseEmulatedWidth",
  async () => {
    const configuration = vscode.workspace.getConfiguration("superBG");
    const emulatedWidth = configuration.get("emulatedWidth") as number;
    if (emulatedWidth <= 0) {
      return;
    }
    configuration.update("emulatedWidth", emulatedWidth - 1);
  }
);

export default decreaseEmulatedWidth;
