(function () {
  /** those variables only changed once */
  let path, fs, projectName;

  /**
   * @type {string} 'image' | 'video' | 'url|
   */
  let mode;

  const root = () => path.join(__filename, "../../../../..");
  const configPath = () =>
    path.join(root(), "superBG", projectName + ".config.json");
  const getConfig = () => {
    const p = configPath(projectName);
    return fs.existsSync(p) && JSON.parse(fs.readFileSync(p));
  };

  /** bg container */
  const bg = document.createElement("div");
  bg.className = "superBG";

  /** modify the VS Code style, and insert a bg container */
  function initWindow(config) {
    if (!document.querySelector("." + bg.className)) {
      bg.style.position = "absolute";
      bg.style.width = "100vw";
      bg.style.height = "100vh";
      bg.style.right = "0";
      bg.style.top = "0";
      bg.style.overflow = "hidden";
      // const backgroundColor = document
      //   .querySelector(".monaco-workbench")
      //   .computedStyleMap()
      //   .get("background-color")
      //   .toString();
      // bg.style.backgroundColor = backgroundColor;
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
  `;
      style.setAttribute("type", "text/css");
      style.append(styleContent);
      document.head.appendChild(style);
    }
  }

  function setBG(config) {
    if (config.disable) {
      bg.style.display = "none";
    } else {
      bg.style.display = "block";
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
    const content = document.querySelector(".superBG div");
    if (!content) {
      return;
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
    // video.crossOrigin = true;
    // video.muted = true;
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
      iframe.src = url;
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
      const config = getConfig();
      if (!config) {
        return;
      }
      initWindow(config);
      setBG(config);
    };
    fs.watchFile(configPath(), { interval: 0 }, onConfigChange);
    onConfigChange();
    console.log("superBG.js initiated");
  }
  setTimeout(initSuperBG, 0);
  console.log("superBG.js injected");
})();
