import * as vscode from "vscode";
import { join } from "path";

const increaseScale = vscode.commands.registerCommand(
  "superBG.increaseScale",
  async () => {
    const configuration = vscode.workspace.getConfiguration("superBG");
    const scale = configuration.get("scale") as number;
    if (scale >= 100) {
      return;
    }
    configuration.update("scale", scale + 1);
  }
);

export default increaseScale;
