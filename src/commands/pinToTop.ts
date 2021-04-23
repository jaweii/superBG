import * as vscode from "vscode";
import superBG from "../SuperBG";

const pinToTop = vscode.commands.registerCommand(
  "superBG.pinToTop",
  async () => {
    superBG.asyncConfigFile({ top: true });
  }
);

export default pinToTop;
