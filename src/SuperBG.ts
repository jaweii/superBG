import * as path from "path";
import * as vscode from "vscode";
import * as fs from "fs";

class SuperBG {
  // @ts-ignore
  base = path.dirname(require.main.filename);
  /** extension directory */
  extensionDir = __dirname;

  get workbenchDIr() {
    return path.join(this.base, "vs", "code", "electron-browser", "workbench");
  }

  get injecter() {
    const { extensionDir, workbenchDIr } = this;
    return {
      htmlPath: path.join(workbenchDIr, "workbench.html"),
      comment: "injected by superBG",
      codePath: path.join(extensionDir, "static/superBG.js"),
      get scriptTag() {
        return `\n	<!-- ${this.comment} -->
	<script src="${this.codePath}"></script>
  `;
      },
      /** modify workbench.html:
       *  inject superBG.js to workbench,;
       *  modify CSP to enable `video` element load local resource, enable `iframe` element load third party website;
       * */
      injectSuperBGToWorkbench() {
        let htmlContent = fs.readFileSync(this.htmlPath, { encoding: "utf8" });
        if (htmlContent.indexOf(this.comment) !== -1) {
          this.removeSuperBGFromWorkbench();
          htmlContent = fs.readFileSync(this.htmlPath, { encoding: "utf8" });
        }
        htmlContent = htmlContent.replace(
          `</html>`,
          `${this.scriptTag}</html>`
        );
        htmlContent = htmlContent.replace(
          `media-src 'none'`,
          "media-src filesystem: *"
        );
        htmlContent = htmlContent.replace(
          `frame-src 'self'`,
          "frame-src filesystem: *"
        );
        fs.writeFileSync(this.htmlPath, htmlContent, { encoding: "utf8" });
      },
      removeSuperBGFromWorkbench() {
        let htmlContent = fs.readFileSync(this.htmlPath, { encoding: "utf8" });
        if (htmlContent.indexOf(this.comment) === -1) {
          return;
        }
        const reg = new RegExp(this.scriptTag, "g");
        htmlContent = htmlContent.replace(reg, "");
        htmlContent = htmlContent.replace(
          "media-src filesystem: *",
          `media-src 'none'`
        );
        htmlContent = htmlContent.replace(
          "frame-src filesystem: *",
          `frame-src 'self'`
        );
        fs.writeFileSync(this.htmlPath, htmlContent, { encoding: "utf8" });
      },
    };
  }

  getConfigPath(name: string) {
    return path.join(this.base, "superBG", name + ".config.json");
  }

  asyncConfigFile() {
    // @ts-ignore
    const firstFolder = vscode.workspace.workspaceFolders[0];
    const workspaceDir = firstFolder.uri.path;
    const firstProjectName = firstFolder.name;
    const superBGDir = path.join(this.base, "superBG");
    if (!fs.existsSync(superBGDir)) {
      fs.mkdirSync(superBGDir);
    }
    const configJSON = Object.assign(
      {},
      vscode.workspace.getConfiguration("superBG"),
      {
        extensionDir: this.extensionDir,
        workspaceDir,
        firstProjectName,
      }
    );
    const data = JSON.stringify(configJSON);
    const configPath = this.getConfigPath(firstProjectName);
    fs.writeFileSync(configPath, data, {
      encoding: "utf8",
    });
    /** when initializing superBG in superBG.js, it will wait this file to be generated. */
    fs.writeFileSync(
      path.join(configPath, "../", "project.name"),
      firstProjectName
    );
  }

  removeConfigFile = (name: string) => {
    const p = this.getConfigPath(name);
    if (fs.existsSync(p)) {
      fs.unlinkSync(p);
    }
    fs.unlinkSync(path.join(p, "../", "project.name"));
  };
}

export default new SuperBG();
