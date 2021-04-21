import * as vscode from "vscode";
import { join } from "path";

const increaseOpacity = vscode.commands.registerCommand(
  "superBG.increaseOpacity",
  async () => {
    const configuration = vscode.workspace.getConfiguration("superBG");
    const opacity = configuration.get("opacity") as number;
    if (opacity >= 100) {
      return;
    }
    configuration.update("opacity", opacity + 2);
  }
);

export default increaseOpacity;
