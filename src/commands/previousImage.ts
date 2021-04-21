import * as vscode from "vscode";
import { join } from "path";

const previousImage = vscode.commands.registerCommand(
  "superBG.previousImage",
  async () => {
    const configuration = vscode.workspace.getConfiguration("superBG");
    const activeImage = configuration.get("activeImage") as number;
    const images = configuration.get("images") as string[];
    if (activeImage <= 0) {
      configuration.update("activeImage", images.length - 1);
      return;
    }
    configuration.update("activeImage", activeImage - 1);
  }
);

export default previousImage;
