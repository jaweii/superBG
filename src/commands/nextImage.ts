import * as vscode from "vscode";
import { join } from "path";

const nextImage = vscode.commands.registerCommand(
  "superBG.nextImage",
  async () => {
    const configuration = vscode.workspace.getConfiguration("superBG");
    const activeImage = configuration.get("activeImage") as number;
    const images = configuration.get("images") as string[];
    if (activeImage >= images.length - 1) {
      configuration.update("activeImage", 0);
      return;
    }
    configuration.update("activeImage", activeImage + 1);
  }
);

export default nextImage;
