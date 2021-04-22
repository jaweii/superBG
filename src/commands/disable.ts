import * as vscode from "vscode";
import superBG from "../SuperBG";

const disable = vscode.commands.registerCommand("superBG.disable", async () => {
  const configuration = vscode.workspace.getConfiguration("superBG");
  configuration.update("disable", !configuration.get("disable"));
  superBG.injecter.removeSuperBGFromWorkbench();
  // TODO: Delete config files and superbg.js
});

export default disable;
