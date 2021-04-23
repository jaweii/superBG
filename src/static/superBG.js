(function () {
  /** those variables only changed once */
  let path, fs, projectName;

  /**
   * @type {string} 'image' | 'video' | 'url|
   */
  let mode;
  let config;

  const root = () => path.join(__filename, "../../../../..");
  const configPath = () =>
    path.join(root(), "superBG", projectName + ".config.json");
  const refreshConfig = () => {
    const p = configPath(projectName);
    config = fs.existsSync(p) && JSON.parse(fs.readFileSync(p));
  };

  /** bg container */
  const bg = document.createElement("div");
  bg.className = "superBG";

  /** modify the VS Code style, and insert a bg container */
  function initWindow() {
    if (!document.querySelector("." + bg.className)) {
      document.body.appendChild(bg);
    }
    const style = document.createElement("style");
    style.className = "superBG-style";
    if (!document.querySelector("." + style.className)) {
      const styleContent = `
      .minimap>canvas,.decorationsOverviewRuler{
        opacity:0.75;
      }
      .editor>.content,
      .editor-container,
      .monaco-workbench,
      .monaco-editor,
      .monaco-editor-background,
      .composite.title,
      .part.panel,
      .terminal-outer-container,
      .monaco-breadcrumbs,
      .part,
      select,
      .monaco-inputbox,
      .tabs,
      .tab,
      .current-line,
      .monaco-editor .margin,
      .monaco-list-rows,
      .monaco-list-rows.selected,
      .monaco-list-row.focused --comment,
      .monaco-list-row:hover:not(.selected):not(.focused),
      .monaco-list-row.focused.selected,
      .pane-header {
        background: none!important;
      }

      .superBG {
        position:  absolute;
        width:  100vw;
        height:  100vh;
        right:  0;
        top:  0;
        overflow:  hidden;
      }

      .superBG.top {
        position: fixed!important;
        transform: scale(0.8);
        z-index: 1!important;
        box-shadow: 0px 10px 30px -10px rgba(0,0,0,.3)!important;
      }
      .superBG.top>div,.superBG.top>iframe{
        opacity: 1!important;
      }
  `;
      style.setAttribute("type", "text/css");
      style.append(styleContent);
      document.head.appendChild(style);
    }
  }

  function setBG() {
    if (!config) {
      return;
    }
    if (config.images && config.images.length > 0) {
      setImage(config.images[config.activeImage]);
    } else if (config.video) {
      setVideo(config.video);
    } else if (config.url) {
      setURL(config.url, config.emulatedWidth);
    } else {
      clear();
    }
    pinTop(config.top);
    const content = document.querySelector(".superBG").firstChild;
    if (!content) {
      return;
    }
    if (config.disable) {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
    content.style.opacity = config.opacity / 100;
    content.style.transform = `scale(${config.scale / 100})`;
    const backgroundColor = Array.from(
      document.querySelector(".contributedColorTheme").sheet.rules
    )
      .find((item) => item.cssText.startsWith(".monaco-workbench { background"))
      .cssText.replace(/.*: /, "")
      .replace(/; }/, "");
    bg.style.backgroundColor = backgroundColor;
  }

  function setImage(imgPath) {
    const div = document.createElement("div");
    div.className = "superBG-iamge";
    div.style.height = "100%";
    div.style.width = "100%";
    div.style.display = "flex";
    div.style.justifyContent = "center";
    div.style.alignItems = "center";
    const img = document.createElement("img");
    img.src = imgPath;
    img.style.maxWidth = "100%";
    img.style.maxHeight = "100%";
    div.append(img);
    clear();
    bg.append(div);
    mode = "image";
  }

  function setVideo(videoPath) {
    const div = document.createElement("div");
    div.className = "superBG-video";
    div.style.height = "100%";
    div.style.widows = "100%";
    const video = document.createElement("video");
    video.autoplay = true;
    video.loop = true;
    video.style.width = "100%";
    video.style.height = "100%";
    const source = document.createElement("source");
    source.src = videoPath;
    source.type = "video/mp4";
    video.append(source);
    div.append(video);
    clear();
    bg.append(div);
    document.addEventListener("click", () => video.play());
    mode = "video";
  }

  function setURL(url, emulatedWidth) {
    if (mode === "url") {
      const iframe = bg.querySelector("iframe");
      if (iframe.src !== url) {
        iframe.src = url;
      }
      iframe.style.width = `${(emulatedWidth / 100) * window.outerWidth}px`;
      return;
    }
    const iframe = document.createElement("iframe");
    iframe.src = url;
    iframe.style.width = `${(emulatedWidth / 100) * window.outerWidth}px`;
    iframe.style.height = "100%";
    iframe.frameBorder = "0";
    iframe.style.position = "absolute";
    iframe.style.left = "0";
    iframe.style.right = "0";
    iframe.style.margin = "auto";
    iframe.style.position = "absolute";
    clear();
    bg.append(iframe);
    mode = "url";
  }

  function clear() {
    Array.from(bg.children).forEach((item) => item.remove());
  }

  function pinTop(top) {
    if (mode !== "url") {
      return;
    }
    if (top) {
      bg.classList.add("top");
    } else {
      bg.classList.remove("top");
    }
  }

  const delay = () => new Promise((resolve) => setTimeout(resolve, 100));

  async function initSuperBG() {
    path = path || nodeRequire("path");
    fs = fs || require("fs");
    const projectNameFilePath = path.join(root(), "superBG", "project.name");

    /** watting for `project.name` to be generated by extension */
    if (fs.existsSync(projectNameFilePath)) {
      fs.unlinkSync(projectNameFilePath);
    }
    while (!fs.existsSync(projectNameFilePath)) {
      await delay();
    }

    projectName = projectName || fs.readFileSync(projectNameFilePath);

    const onConfigChange = (curState, prevState) => {
      refreshConfig();
      initWindow();
      setBG();
    };
    fs.watchFile(configPath(), { interval: 0 }, onConfigChange);
    onConfigChange();
    document.addEventListener("click", (e) => {
      pinTop(false);
    });
    console.log("superBG.js initiated");
  }
  setTimeout(initSuperBG, 0);
  console.log("superBG.js injected");
})();
