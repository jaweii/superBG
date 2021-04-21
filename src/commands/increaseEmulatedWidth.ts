import * as vscode from "vscode";
import { join } from "path";

const increaseEmulatedWidth = vscode.commands.registerCommand(
  "superBG.increaseEmulatedWidth",
  async () => {
    const configuration = vscode.workspace.getConfiguration("superBG");
    const emulatedWidth = configuration.get("emulatedWidth") as number;
    if (emulatedWidth >= 100) {
      return;
    }
    configuration.update("emulatedWidth", emulatedWidth + 1);
  }
);

export default increaseEmulatedWidth;
