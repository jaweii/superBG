import * as vscode from "vscode";

const enable = vscode.commands.registerCommand("superBG.enable", async () => {
  const configuration = vscode.workspace.getConfiguration("superBG");
  configuration.update("disable", false);
});

export default enable;
