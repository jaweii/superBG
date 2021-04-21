import * as vscode from "vscode";

const enableOrDisable = vscode.commands.registerCommand("superBG.enableOrDisable", async () => {
  const configuration = vscode.workspace.getConfiguration("superBG");
  configuration.update("disable", !configuration.get("disable"));
});

export default enableOrDisable;
