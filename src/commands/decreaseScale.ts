import * as vscode from "vscode";
import { join } from "path";

const decreaseScale = vscode.commands.registerCommand(
  "superBG.decreaseScale",
  async () => {
    const configuration = vscode.workspace.getConfiguration("superBG");
    const scale = configuration.get("scale") as number;
    if (scale <= 0) {
      return;
    }
    configuration.update("scale", scale - 1);
  }
);

export default decreaseScale;
