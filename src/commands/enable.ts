import * as vscode from "vscode";
import superBG from "../SuperBG";

const enable = vscode.commands.registerCommand("superBG.enable", async () => {
  const configuration = vscode.workspace.getConfiguration("superBG");
  configuration.update("disable", false);
  superBG.injecter.injectSuperBGToWorkbench();
});

export default enable;
