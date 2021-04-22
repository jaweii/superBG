# superBG

[![GitHub stars](https://img.shields.io/github/stars/jaweii/superBG)]() [![GitHub watchers](https://img.shields.io/github/forks/jaweii/superBG)]() [![GitHub forks](https://img.shields.io/github/issues/jaweii/superBG)]() [![GitHub forks](https://img.shields.io/github/license/jaweii/superBG)]()

---

## Supercharge the background of VS Code

VS Code 背景增强插件，最大化利用屏幕空间。

## Demo

![网页作为背景][1]

[网页作为背景，GIF 演示地址][1]

![selectImages][2]

[设计图集作为背景，GIF 演示地址][2]

## Features 功能

- 支持监控网址，将网页作为背景，以便前端开发时，所写即所见；
- 支持选择多张图片作为背景，并使用快捷键在图片间快速切换，方便开发者边看设计图边写代码；
- 支持调整背景透明度；
- 支持缩放背景内容；
- 支持快捷键；

- Support select multiple images as background, and switch background between them via shortcuts;
- Supoprt set web page as background;
- support adjust the background transparency;
- support background scale;

### Prerequirements 前置条件

- VS Code version >=1.45.0
- On mac, You need to install VS Code to `/Applications` folder, otherwise you need to run VS Code as admin (`sudo open "path/to/directory/VS Code.app"`)

- VS Code 版本大于等于 1.45.0
- 在 Mac 上，你需要把 VS Code 安装到 `/Applications`目录, 否则你要以管理员模式打开 VS Code 才能正常使用插件(`sudo open "path/to/directory/VS Code.app"`)

## Uninstall the extension 卸载

You need to follow the steps above to uninstall the extension:

请按照下面步骤卸载插件：

`Command`+`shift`+`p` > `superBG.disable` > `uninstall extension`

## Known Issues 已知问题

- VS Code warning

  **"Your Code installation appears to be corrupt. Please reinstall."** warning appears after install the extension, you can click **"never show again"** to ignore it.

  VS Code 警告

  本插件安装后，或 vscode 升级后，VS Code 提示被篡改或损坏，这是因为 VS Code 未提供操作背景的 API ，本插件只好修改了两行主程序代码。
  **解决方案：选择提示右上角的 【不再提示】:**

- When set web page as background, due to security concerns, **SVG** image can not be loaded in web page.
  (see https://code.visualstudio.com/api/working-with-extensions/publishing-extension#publishing-extensions)

  网页作为背景**SVG**无法显示

  可能是 VS Code 出于安全考虑，不允许页面中加载 SVG 图片，**尚无解决方法**。
  (见https://code.visualstudio.com/api/working-with-extensions/publishing-extension#publishing-extensions)

- the extension is developed on mac, Untested on Windows system.

  本插件在 Mac 上开发，Windows 系统尚未测试兼容性。

## Keyboard shortcuts 快捷键

| Shortcuts             | Description                                                                                                                                                   |
| :-------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `ctrl+alt+left`       | Previous image. 上一张图片                                                                                                                                    |
| `ctrl+alt+right`      | Next image. 下一张图片                                                                                                                                        |
| `ctrl+alt+up`         | Increase transparency. 上调透明度                                                                                                                             |
| `ctrl+alt+down`       | Decrerase transparency. 下调透明度                                                                                                                            |
| `ctrl+alt+shift+up`   | Increase scale. 整体放大                                                                                                                                      |
| `ctrl+alt+shift+down` | Decrease scale. 整体缩小                                                                                                                                      |
| `ctrl+alt+shift+left` | Increase emulatedWidth, Adjust the value to emulate mobile device when set web page as background. 使用网页作为背景时，缩小网页容器宽度，以便模拟不同尺寸设备 |
| `ctrl+alt+shift+righ` | Decrease emulatedWidth. 使用网页作为背景时，增大网页容器宽度，以便模拟不同尺寸设备                                                                            |

## Config 配置项

| Name                    |      Type       | Description                                                                                                                                       |
| :---------------------- | :-------------: | :------------------------------------------------------------------------------------------------------------------------------------------------ |
| `superBG.disable`       |    `Boolean`    | Hide background. 隐藏背景                                                                                                                         |
| `superBG.images`        | `Array<string>` | Select multiple images as background. 作为背景的图片集                                                                                            |
| `superBG.url`           |    `string`     | set web page as background. 将网页作为背景，网页的地址                                                                                            |
| `superBG.opacity`       |    `number`     | Opacity 0-100(%). 透明度                                                                                                                          |
| `superBG.scale`         |    `number`     | Scale 0-100(%). 缩放                                                                                                                              |
| `superBG.emulatedWidth` |    `number`     | Adjust the value to emulate mobile device when set web page as background. 使用网页作为背景时，网页容器宽度缩放比，调整以便模拟不同设备, 0-100(%) |

**Enjoy!**

[1]: https://raw.githubusercontent.com/jaweii/superBG/master/demo/watchURL.gif
[2]: https://raw.githubusercontent.com/jaweii/superBG/master/demo/selectImages.gif
