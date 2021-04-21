import * as vscode from "vscode";
import { join } from "path";

const decreaseOpacity = vscode.commands.registerCommand(
  "superBG.decreaseOpacity",
  async () => {
    const configuration = vscode.workspace.getConfiguration("superBG");
    const opacity = configuration.get("opacity") as number;
    if (opacity <= 0) {
      return;
    }
    configuration.update("opacity", opacity - 2);
  }
);

export default decreaseOpacity;
