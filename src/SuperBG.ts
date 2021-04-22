import * as vscode from "vscode";
import * as fs from "fs";
import { join, dirname, basename } from "path";

class SuperBG {
  constructor() {
    /** the name of main file may be different in different vscode version */
    const list = getFiles(this.base);
    const htmlFiles = list
      .filter((f) => /.*browser.*workbench.*\.html$/.test(f))
      .filter((p) => {
        const content = fs.readFileSync(p, { encoding: "utf8" });
        return content.indexOf("Startup") !== -1;
      });
    if (htmlFiles.length > 0) {
      this.workbenchPath = htmlFiles[0];
    }
  }
  // @ts-ignore
  base = dirname(require.main.filename);
  /** extension directory */
  extensionDir = __dirname;

  workbenchPath = join(
    // @ts-ignore
    dirname(require.main.filename),
    "vs",
    "code",
    "electron-browser",
    "workbench",
    "workbench.html"
  );
  codePath = join(__dirname, "static/superBG.js");
  copiedCodePath = join(dirname(this.workbenchPath), basename(this.codePath));
  get injecter() {
    const { extensionDir, workbenchPath, codePath } = this;
    return {
      htmlPath: workbenchPath,
      comment: "injected by superBG",
      get scriptTag() {
        return `\n	<!-- ${this.comment} -->
	<script src="superBG.js"></script>
  `;
      },
      /** modify workbench.html:
       *  inject superBG.js to workbench,;
       *  modify CSP to enable `video` element load local resource, enable `iframe` element load third party web page;
       * */
      injectSuperBGToWorkbench() {
        let htmlContent = fs.readFileSync(this.htmlPath, { encoding: "utf8" });
        if (htmlContent.indexOf(this.comment) !== -1) {
          // this.removeSuperBGFromWorkbench();
          // htmlContent = fs.readFileSync(this.htmlPath, { encoding: "utf8" });
          return;
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
    return join(this.base, "superBG", name + ".config.json");
  }

  asyncConfigFile() {
    // @ts-ignore
    const firstFolder = vscode.workspace.workspaceFolders[0];
    const workspaceDir = firstFolder.uri.path;
    const firstProjectName = firstFolder.name;
    const superBGDir = join(this.base, "superBG");
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
    fs.writeFileSync(join(configPath, "../", "project.name"), firstProjectName);
    fs.copyFileSync(this.codePath, this.copiedCodePath);
    vscode.window.showInformationMessage("Restart VS Code to enable SuperBG.");
  }

  removeConfigFile = (name: string) => {
    const p = this.getConfigPath(name);
    if (fs.existsSync(p)) {
      fs.unlinkSync(p);
    }
    fs.unlinkSync(join(p, "../", "project.name"));
    // fs.unlinkSync(this.copiedCodePath);
  };
}

function getFiles(dirPath: string) {
  let files: string[] = [];
  function findJsonFile(path: string) {
    let childrens = fs.readdirSync(path);
    childrens.forEach(function (item, index) {
      let fPath = join(path, item);
      let stat = fs.statSync(fPath);
      if (stat.isDirectory() === true) {
        findJsonFile(fPath);
      }
      if (stat.isFile() === true) {
        files.push(fPath);
      }
    });
  }
  findJsonFile(dirPath);
  return files;
}

export default new SuperBG();
