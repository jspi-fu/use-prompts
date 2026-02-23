# 论文撰写

分享一些笔者关于论文写作的粗浅经验与方法，持续更新。

> 珍爱生命，远离重复造轮子。

---

## 包含什么

- **📚 写作指南**：人工智能方向论文写作的完整入门指南
- **📝 Prompt 模板库**：翻译、润色、分析等场景的实战 prompt
- **🤖 Agent Skills**：作为新兴技术，agent skills 能更强大地助力写作，但存在一定使用门槛。笔者提供接地气的使用教程，并抽取了写作相关的核心 skills，让你快速上手。
- **🛠️ 写作工具推荐**：精选文献检索、AI辅助写作、文档处理等领域实用工具

---

## 📚 写作指南

> 💡 **[Handbook.md](Handbook.md)** - AI 毕业论文写作：新手入门指南
> 本文翻译自 [WritingAIPaper](https://github.com/hzwer/WritingAIPaper) 并做了部分修改，适合人工智能方向论文写作。内容涵盖：
> - 从零开始构建论文的核心思路与框架
> - 论文各部分（引言、相关工作、实验等）的写作技巧
> - 提升可读性的实用方法与细节检查清单
> - 常见负面评审意见及应对策略

---

## 📝 写作 Prompt 集合

> 💡 **使用说明**：点击链接查看详细 Prompt，可直接复制到聊天框中与大模型交互使用。

- **[中转中.md](prompts/中转中.md)** - 中文草稿重写为符合学术规范的论文段落
- **[表达润色（中文论文）.md](prompts/表达润色（中文论文）.md)** - 中文论文段落专业审视与润色
- **[论文绘图.md](prompts/论文绘图.md)** - Nano-Banana Pro 论文绘图完整教程
- **[文献查找.md](prompts/文献查找.md)** - 针对指定领域进行详细全面的文献调研
- **[论文剖析.md](prompts/论文剖析.md)** - 将复杂学术论文转化为通俗易懂的解释

---

## 🤖 论文写作相关的 Skills

> 💡 **使用说明**：Agent Skills 是一种可被 AI 助手（如 Claude、Cursor）加载的扩展能力包。
>
> 📘 **[点击查看 Skills 配置与使用指南](skills/README.md)**

- **[20-ml-paper-writing](skills/AI-research-SKILLs/20-ml-paper-writing/SKILL.md)** - 面向 NeurIPS / ICML / ICLR / ACL / AAAI / COLM 的完整论文写作
- **[humanizer](skills/humanizer/SKILL.md)** - 识别并去除 AI 写作痕迹，使文本更自然
- **[docx](skills/anthropics-skills/skills/docx/SKILL.md)** - 对 .docx 进行创建、编辑、分析与修订
- **[doc-coauthoring](skills/anthropics-skills/skills/doc-coauthoring/SKILL.md)** - 分阶段文档协作：收集上下文 -> 起草 -> 读者测试
- **[canvas-design](skills/anthropics-skills/skills/canvas-design/SKILL.md)** - 产出 design philosophy 并生成单页 .pdf / .png 示意图

---

## 🛠️ 论文写作工具推荐

> 💡 **精选工具**：为论文写作全流程提供高效支持

### 文献检索与下载

- **[熊猫学术](https://sc.panda985.com/index.html)**
  - **核心功能**：集成谷歌学术、SCI-HUB等多个学术数据源，支持文献检索、分析与下载
  - **优势**：无限制使用谷歌学术，界面简洁，下载速度快
  - **适用场景**：文献调研阶段快速获取中英文文献

- **[文献部落](http://459.org/?continueFlag=3796c8ff39f8d2b7e3ab54988c8ebdfc)**
  - **核心功能**：一站式文献下载平台，支持多种文献格式导出
  - **优势**：整合多个学术资源站点，可批量导出EndNote格式文献
  - **适用场景**：大规模文献收集与管理

### AI辅助写作

- **[秘塔AI搜索](https://metaso.cn/)**
  - **核心功能**：无广告学术搜索，支持多线迭代追搜，直达文献结果
  - **优势**：支持文库、学术、PubMed等多数据源检索，可筛选中科院分区、JCR分区文献
  - **适用场景**：深度文献调研、知识整合与专题研究

- **[Gemini](https://gemini.google.com/)**
  - **无需多言，文本最强AI**
  - **使用教程**：[Gemini 使用技巧](https://www.bilibili.com/video/BV1HYcFz9EKf/?share_source=copy_web&vd_source=39dd48f9ecc791d05c72fa418e828edb)

### 翻译与文档处理

- **[Doc2X](https://doc2x.noedgeai.com/)**
  - **核心功能**：智能图文解析，支持PDF/JPEG/PNG等格式文档提取与翻译
  - **优势**：大模型加持的双语对照翻译，支持GPT、Deepseek、GLM等多种AI引擎
  - **适用场景**：外文文献翻译、复杂公式识别、批量文档处理

### 文档转换与协作

- **[PasteMD](https://github.com/RICHQAQ/PasteMD)**
  - **核心功能**：一键将Markdown和网页AI对话（ChatGPT/DeepSeek等）完美粘贴到Word、WPS和Excel的效率工具
  - **优势**：常驻托盘小工具，支持智能识别Markdown表格、HTML富文本，自动修复LaTeX语法与公式块
  - **适用场景**：AI回复内容粘贴、Markdown表格转换、学术论文撰写
  - **使用建议**：全局热键Ctrl+Shift+B一键粘贴，支持应用扩展配置，完美解决AI公式复制乱码问题
  - **兼容性**：支持Kimi、DeepSeek、通义千问、豆包、智谱清言、ChatGPT、Gemini等主流AI平台
