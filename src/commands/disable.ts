import * as vscode from "vscode";

const disable = vscode.commands.registerCommand("superBG.disable", async () => {
  const configuration = vscode.workspace.getConfiguration("superBG");
  configuration.update("disable", !configuration.get("disable"));
});

export default disable;
