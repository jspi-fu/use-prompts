# 全局提示词使用指南

本目录包含三套全局提示词，分别适用于不同的使用目的和场景。

## 文件定位

### **[Karpathy.md](Karpathy.md)** - 基础行为准则（最新推荐）

**定位**：源自 Andrej Karpathy 的 AI 编程吐槽，提炼为四条简洁的行为准则，契合当前全局提示词的"兜底"定位。

**特点**：
- 简洁明了，仅四条核心准则
- 强调"编码前思考"、"简单优先"、"精准修改"、"目标驱动"
- 不侵入原有系统提示词，仅作为行为约束
- 与 skill、mcp 等其他配置配合使用效果最佳

**适用场景**：
- 快速启动新项目
- 日常代码编写和修改
- 作为基础的行为规范，可与其他提示词叠加使用

### **[ReliableCoding.md](AI编程/全局提示词/reliable-coding/README.md)** - 小项目规划与开发

**定位**：能够在无需任何额外配置的情况下完成小项目的规划与开发，提供比 openspec 更加轻量化的项目记忆管理。

**特点**：
- 强调代码质量、架构设计和开发原则
- 提供文档与记忆管理机制
- 包含任务处理指南和沟通原则
- 基于**测试**、**记忆**、**文档**（TMD）的编码稳定性闭环

**适用场景**：
- 小项目的完整规划与开发
- 需要长期维护的代码库
- 需要严格代码质量和文档记录的项目
- 使用 Claude Code、Codex CLI、Gemini CLI 等工具时

### **[RIPER5.md](AI编程/全局提示词/RIPER5/README.md)** - ⚠️ 已过时，仅供学习

**⚠️ 警告**：RIPER5 的五阶段工作流协议（RESEARCH → INNOVATE → PLAN → EXECUTE → REVIEW）在当前模型能力下已显冗余，过度限制会阻碍 AI 的自主判断能力，降低开发效率。

**建议**：
- 对于需要严格流程控制的场景，建议改用 `reliable-coding` 配合明确的任务拆分
- 对于一般场景，使用 `Karpathy.md` 作为基础准则即可

---

## 快速选择指南

| 场景 | 推荐选择 |
|------|---------|
| 快速原型开发、日常编码 | `Karpathy.md` |
| 小项目规划与开发 | `reliable-coding` |
| 需要严格流程控制 | `reliable-coding` + 手动任务拆分 |

---

## 使用说明

### Karpathy.md
将内容复制到对应工具的全局配置文件中：
- Claude Code: `~/.claude/CLAUDE.md`
- Codex: `~/.codex/AGENTS.md`
- Gemini CLI: `~/.gemini/GEMINI.md`

### reliable-coding
根据使用的工具选择对应版本：
- `ClaudeCode.md` - Claude Code 版本
- `Codex.md` - Codex CLI 版本
- `GeminiCli.md` - Gemini CLI 版本

将对应文件内容复制到工具的全局配置文件中（路径同上）。
