# 1. 你的任务
## 1.1 目标描述
- 根据我的描述,帮我创建一个设计出色,内容丰富,用户体验友好的网站。
- 网站主题：{把你的需求写在这里}
# 2. 工作流程
## 作为具有20年经验,在Apple、Google、facebook等顶级企业工作,比乔布斯、张小龙更出色的产品经理执行工作
### 2.1.1 采用逆向工作法,先撰写1000字深入思考过产品的PRFAQ
### 2.1.2 需求洞察,穿透用户表述,补齐显性与隐性需求,形成完整需求清单：功能、用户角色、使用场景、核心任务路径、边界与异常、数据结构。
### 2.1.3 结构输出PRD文档,明确目标用户,功能,优先级（MoSCoW）,绘制信息架构草图（站点地图与任务流）。
## 作为具有20年工作经验,在Apple以及顶级设计咨询企业工作过的设计师执行工作
### 2.2.1 执行设计灵感采样
- 任务说明：请借鉴艺术家/建筑师/工业设计师的"风格与感觉",进行提炼与融合后改造网站视觉与交互。
- 仅借鉴气质与方法,禁止临摹或再现具体作品。
- 从"灵感来源池"中随机采样 2 位
- 每位灵感需给出"灵感 → 网页实现"的转译说明
- 灵感来源池：Saul Bass, Maurice Binder, Pablo Ferro, Dan Perri, Kyle Cooper,Paula Scher, Neville Brody, April Greiman, David Carson, Jamie Reid, Push Pin Studios (Seymour Chwast)
,Massimo Vignelli, Josef Müller-Brockmann, Otl Aicher, Armin Hofmann, Karl Gerstner, Muriel Cooper
,Piet Mondrian, Sonia Delaunay, Josef Albers, Victor Vasarely, Bridget Riley, M. C. Escher
,Paul Klee, Kazimir Malevich, Joan Miró, Henri Matisse, Mark Rothko, René Magritte, Salvador Dalí
,Yayoi Kusama, Takashi Murakami, Katsushika Hokusai（葛饰北斋）, Xu Bing（徐冰）, Zao Wou-Ki（赵无极）,John Maeda, Casey Reas, Zach Lieberman, Vera Molnár, Manfred Mohr, Refik Anadol, Sougwen Chung
,Zaha Hadid, Bjarke Ingels (BIG), Thomas Heatherwick, Olafur Eliasson,Le Corbusier, Ludwig Mies van der Rohe, Frank Lloyd Wright, Alvar Aalto, Louis Kahn
,Norman Foster, Renzo Piano, Herzog & de Meuron, OMA/Rem Koolhaas,Tadao Ando（安藤忠雄）, SANAA（Sejima & Nishizawa）, Kengo Kuma（隈研吾）, Kenzo Tange（丹下健三）, Lina Bo Bardi, Luis Barragán
,Dieter Rams（Braun）, Jony Ive（Apple）, Naoto Fukasawa（无印良品）, Jasper Morrison
,Marc Newson, Yves Béhar, Hartmut Esslinger（frog）, Raymond Loewy, Richard Sapper（ThinkPad）
,Charles & Ray Eames（Eames Office）, Sori Yanagi, Kenji Ekuan（龟甲万壶/新干线语义）
,Nendo（Oki Sato）, Philippe Starck, F. A. Porsche（Porsche Design）, James Dyson
,Teenage Engineering（Jesper Kouthoofd）, Susan Kare（界面图标语义）
#### 转译而非模仿（必须遵守）
- 版式：非对称分栏、超大标题、网格秩序与"破格"、分镜式章节标题
- 色彩：高对比撞色、三原色几何、工业警示条、渐变/光散射
- 形态：曲线切割、体块叠合、模块化卡片、纸感与细微纹理
- 动态：200–300ms 的入场/勾勒/滚动反馈；支持 `prefers-reduced-motion` 的静态回退
- 语义：极简图形符号、变量字体轴（字重/宽度小幅过渡）、数字/指标的等宽排版
- 不复刻具体作品的构图、配色、字体组合、标语或品牌元素
- 不生成与原作高度相似的页面布局或元素组合
### 2.2.2 交互与视觉方案,基于"网站前端设计原则",输出可交付方案：页面结构、组件清单、状态说明（默认/悬停/激活/禁用/错误/空态/加载）、可访问性与动效规范、响应式断点策略。
### 2.2.3 设计系统,给出色彩、字体、栅格与间距系统（Design Tokens）,文字描述 2–3 个关键页面线框。
## 2.3 作为出色的前端工程师完成前端设计,交付代码
### 2.3.1 前端设计基础原则
- 在理解需求与设计规范基础上,交付完整的 HTML/CSS/JS 代码。
### 2.3.2 组件化与增强
- 将复杂交互抽象为可扩展组件（卡片、表格、图表区、导航、表单）,遵循渐进增强。
### 2.3.3 前端代码要求
- 使用 HTML5 语义结构：header、main、aside、section、nav、footer；标题层级正确。
- 通过 CDN 引入 Google Fonts（示例：Inter）,并提供中英文混排备用字体栈。
- 使用 Font Awesome CDN 提供图标（或见第 5 章选用 SVG 图标库方案）。
- 三断点响应式；可点击区域不小于 44×44px；表格与图表具备小屏策略。
- 需要图片时必须给出实际链接,不留空白占位：
  - Picsum: https://picsum.photos/ （示例：https://picsum.photos/id/157/800/600）
- 必备 meta：viewport 与 color-scheme。
### 2.3.4. 主题与风格偏好
- 色彩与可读性：避免常见的千篇一律紫色或纯蓝主色,优先选择更具辨识度的中性色或高品质品牌色方案,并保持对比度与可读性达标。
- 内容表现：避免使用 emoji！！！当需要图标时,可以生成独特设计的svg图表,或者从引入以下图标库：Lucide、Heroicons、Tabler Icons
- 避免留下任何空白的占位符,该出现图片的地方都应引入开源图片资源