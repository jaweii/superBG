# superBG

### Supercharge the background of VS Code

VS Code 背景增强插件，最大化利用屏幕空间。
此插件诞生旨在弥补 VS Code 在 Mac 端不支持背景透明的遗憾。

## Features 功能

- 支持监控网址，将网页作为背景，以便前端开发时，所写即所见；
- 支持选择多张图片作为背景，并使用快捷键在图片间快速切换，方便开发者边看设计图边写代码；
- 支持调整背景透明度；
- 支持缩放背景内容；
- 支持快捷键；

- Support select multiple images as background, and switch background between them via shortcuts;
- Supoprt website as background;
- support adjust the background transparency;
- support background scale;

## Known Issues 已知问题

- VS Code warning
  **"Your Code installation appears to be corrupt. Please reinstall."** warning appears after install the extension, you can click **"never show again"** to ignore it.
  VS Code 警告
  本插件安装后，或 vscode 升级后，VS Code 提示被篡改或损坏，这是因为 VS Code 未提供操作背景的 API ，本插件只好修改了两行主程序代码。
  **解决方案：选择提示右上角的 【不再提示】:**

- When set website as background, due to security concerns, **SVG** image can not be loaded in website.(see https://code.visualstudio.com/api/working-with-extensions/publishing-extension#publishing-extensions)
  网站作为背景**SVG**无法显示
  可能是 VS Code 出于安全考虑，不允许页面中加载 SVG 图片，**尚无解决方法**。(见https://code.visualstudio.com/api/working-with-extensions/publishing-extension#publishing-extensions)

## Keyboard shortcuts 快捷键

| Shortcuts             | Description                                                                                                                                              |
| :-------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ctrl+alt+left`       | Previous image. 上一张图片                                                                                                                               |
| `ctrl+alt+right`      | Next image. 下一张图片                                                                                                                                   |
| `ctrl+alt+up`         | Increase transparency. 上调透明度                                                                                                                        |
| `ctrl+alt+down`       | Decrerase transparency. 下调透明度                                                                                                                       |
| `ctrl+alt+shift+up`   | Increase scale. 整体放大                                                                                                                                 |
| `ctrl+alt+shift+down` | Decrease scale. 整体缩小                                                                                                                                 |
| `ctrl+alt+shift+left` | Increase emulatedWidth, Adjust the value to emulate mobile device when website as background. 使用网站作为背景时，缩小网站容器宽度，以便模拟不同尺寸设备 |
| `ctrl+alt+shift+righ` | Decrease emulatedWidth. 使用网站作为背景时，增大网站容器宽度，以便模拟不同尺寸设备                                                                       |

## Config 配置项

| Name                    |      Type       | Description                                                                                                                                  |
| :---------------------- | :-------------: | :------------------------------------------------------------------------------------------------------------------------------------------- |
| `superBG.disable`       |    `Boolean`    | Hide background. 隐藏背景                                                                                                                    |
| `superBG.images`        | `Array<string>` | Select multiple images as background. 作为背景的图片集                                                                                       |
| `superBG.url`           |    `string`     | set the url website as background. 将网站作为背景，网站的地址                                                                                |
| `superBG.opacity`       |    `number`     | Opacity 0-100(%). 透明度                                                                                                                     |
| `superBG.scale`         |    `number`     | Scale 0-100(%). 缩放                                                                                                                         |
| `superBG.emulatedWidth` |    `number`     | Adjust the value to emulate mobile device when website as background. 使用网站作为背景时，网站容器宽度缩放比，调整以便模拟不同设备, 0-100(%) |

**Enjoy!**
