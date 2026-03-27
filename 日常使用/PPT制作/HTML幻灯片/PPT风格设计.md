---
name: PPT风格设计
description: 评估 8种 HTML 幻灯片的设计风格，生成对应的 HTML 文件。
usage：
    - 在 Gemini 中启用 Canvas 功能，使用此提示词评估 8 种 HTML 幻灯片的设计风格，筛选出最符合要求的并分享复制其原始 HTML 代码。
    - 新建对话窗口，粘贴第一步复制的 HTML 代码，输入 "请参照如上风格帮我生成 HTML 幻灯片，我的幻灯片内容如下：{基于[`PPT大纲`](../PPT大纲.md)生成的内容}"
    - （可选：转换为 PPTX 格式）将 Gemini 生成的完整 HTML 文件粘贴给 Claude，输入 "请将以上 HTML 格式的文件转换为标准的 PPTX 格式，绝不允许修改任何内容"。
---

## 任务说明
你是顶级 HTML 演示文稿设计师。
我想评估 8 种 HTML 幻灯片的设计风格。针对每种风格，生成一个完整的独立 HTML 文件，展示该风格在真实幻灯片内容下的呈现效果。

---

## 8种待评估风格
1. Linear App
2. Pitch.com
3. Stripe Press
4. Framer
5. Apple Keynote Dark
6. Swiss Typography
7. Are.na Archive
8. Figma Community

---

## 每个 HTML 文件必须包含 5 张幻灯片
* 第1张：封面，包含标题、副标题、作者
* 第2张：文字页，包含标题和3段正文，禁止使用 bullet point
* 第3张：图文分栏，图片占位区必须使用该风格的标志性配色处理，禁止用通用灰色方块
* 第4张：数据页，柱状图和折线图并排展示
* 第5张：结语页，一句大型陈述句配一个视觉锚点，禁止用固定 padding 的卡片包裹大标题

---

## 字体白名单（严格执行）
展示字体（h1/h2）从以下选一：Playfair Display、Fraunces、Syne、Bebas Neue、DM Serif Display、Cormorant Garamond
正文字体（p）从以下选一：DM Sans、Outfit、Figtree、Epilogue

中文字体必须叠加（内容含中文时）：Noto Sans SC 或 Noto Serif SC。衬线展示字体（Playfair Display、Fraunces、DM Serif Display、Cormorant Garamond）配 Noto Serif SC，无衬线展示字体（Syne、Bebas Neue）配 Noto Sans SC。

展示字体与正文字体必须不同。禁止使用白名单以外的任何字体，包括 Inter、Roboto、Arial、Space Grotesk、Plus Jakarta Sans 等。

---

## 配色规则
8种风格必须各自使用明显不同的配色方向，禁止多个风格共用同一背景色系。至少4种风格使用浅色或中性色背景，禁止所有风格都用黑色背景。每种风格颜色选3色：主色（60%）+ 配色（30%）+ 点缀（10%），用 CSS 变量统一管理。

---

## 美学规则
* 每张幻灯片必须有一个最抢眼的视觉锚点：超大数字、粗体关键词、大色块或图表
* 标题与正文必须有极端字号对比，标题至少是正文字号的10倍
* 正文（p 标签）字号不得小于 1.4vw，确保在演示场景下可读。不能被任何色块遮挡。正文必须在 flexbox 或 grid 的正常文档流中，禁止用 position: absolute 定位正文
* 同一文件内每张幻灯片必须使用不同布局
* 每张幻灯片的视觉重心必须明显偏向一侧，禁止所有元素居中对齐
* 装饰性色块面积至少占幻灯片的30%，禁止只用细线和小圆点做装饰
* 元素允许出血超出幻灯片边缘
* 标题（h1/h2）允许且鼓励压在色块之上，制造视觉张力
* 创意排版只能用于纯装饰性元素（opacity 低于 0.1 的背景字）。所有承载实际内容的元素（标题、正文、图表）必须在正常文档流中，高度由幻灯片容器约束而非由内容撑开
* 禁止对 h1、h2 使用 transform: rotate——标题旋转会破坏文档流高度计算，是导致内容溢出的首要原因
* 幻灯片容器必须设置 overflow: hidden，内部主要内容区域高度总和不得超过容器的 90%

---

## 容器与比例规则
幻灯片容器必须使用以下 CSS，禁止单独使用 100vw / 56.25vw：
```css
width: min(100vw, 177.78vh);
height: min(56.25vw, 100vh);
```
所有 vw 字号必须在此容器宽度内，不能超出边界。

---

## 图表规则
所有图表使用 cdnjs 的 Chart.js。禁止使用 Chart.js 默认图例，必须用自定义 HTML 图例替代。图表外层容器必须同时满足三个条件：设置明确的 vw 高度、设置 overflow: hidden、设置 position: relative——缺少任何一条都会导致图表循环增长。canvas 元素本身必须用内联 style 设置明确高度，例如 `style="height: 18vw; width: 100%"`，禁止用全局 CSS 选择器 `canvas {height: ...}` 统一设置。图表外层容器的高度必须大于 canvas 高度加上图例高度之和，禁止让 canvas 撑开父容器。图表颜色必须匹配该风格的配色，禁止使用 Chart.js 默认色。

---

## 导航
仅支持键盘左右箭头切换，禁止在幻灯片上显示任何导航按钮、箭头或提示文字。

---

## 代码质量
JavaScript 中所有引号、尖括号、符号必须保持原始字符，严禁任何 HTML 实体转义（禁止将 ' 写成 &apos;，禁止将 < 写成 &lt;，禁止将 > 写成 &gt;）。

---

## 执行流程
首先列出8种风格，每种附一句话描述，然后问我："请问您想生成哪几种风格？请回复编号或 all。"
确认后每次最多生成2个文件避免截断，每个文件以 `## 风格N: [名称]` 开头后接代码块。

---

## 输出要求
每种风格输出一个完整独立的 HTML 文件，代码块外不要任何解释文字。请在 Canvas 中生成并预览每个 HTML 文件。