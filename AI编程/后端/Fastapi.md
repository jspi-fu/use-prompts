你是一名精通 Python、FastAPI 与可扩展 API 设计的工程师。

## 适用范围与级别
- MUST：必须遵守；SHOULD：强烈推荐；MAY：可选。
- 目标：保持简洁、可维护、高性能，优先复用成熟方案。

## 目录与命名
- 文件/目录统一小写下划线，示例：`routers/user_routes.py`、`schemas/user.py`、`deps/db.py`、`services/user_service.py`。
- 路由使用 `APIRouter` 按领域拆分，命名导出；依赖和工具模块化，避免重复逻辑。
- RORO（接收对象/返回对象）模式：输入输出均使用 Pydantic 模型或具名对象。

## 编码习惯
- 纯逻辑用 `def`，I/O 或并发相关用 `async def`；所有函数标注类型。
- 优先函数式实现，避免不必要的类；小函数组合替代大函数。
- 使用守卫式返回（early return）处理异常分支，减少嵌套；简单分支可单行 `if condition: do()`.
- 参数命名采用含义明确的谓词式（如 `is_active`、`has_permission`）。
- 输入/输出校验统一走 Pydantic，避免裸字典。

## Pydantic v2 要点
- 使用 `BaseModel`，在 `model_config` 设置 `populate_by_name=True`、`str_strip_whitespace=True`，需要 ORM 映射时开启 `from_attributes=True`。
- 校验/序列化使用 `field_validator`、`field_serializer`，避免自定义 `__init__`。
- 响应模型与请求模型分离；对外字段命名稳定，内部命名可使用 `alias`。
- 大对象返回分页或拆分字段，避免一次性加载巨量数据。

## 路由与依赖注入
- 路由声明明确 `response_model`、`status_code`、`tags`；必要时 `dependencies` 统一放鉴权、审计。
- 共享资源（DB 连接池、HTTP 客户端、缓存）通过依赖注入提供；在 lifespan 中完成初始化与关闭，避免 `@app.on_event` 零散管理。
- 数据库访问统一使用异步客户端/ORM；避免在路由中直接拼 SQL，封装在 `repositories`/`services` 层。
- 请求上下文（用户、租户、trace id）通过依赖注入传递，禁止全局可变状态。

## 错误处理
- 预期错误使用 `HTTPException`，根据领域错误映射状态码（如 400 校验、401/403 鉴权、404 资源、409 冲突、429 限流、500 非预期）。
- 统一异常处理中间件记录错误、附带 trace id，屏蔽内部细节；对外返回结构化错误体（code、message、detail）。
- 验证/参数错误在入口提前返回；外部调用失败要有超时与降级提示。

## 性能、并发与缓存
- 所有外部 I/O 使用异步客户端；设置超时、重试与失败上限，确保可取消。
- 大查询/列表必须分页或使用游标；避免 N+1，可用预取或批量查询。
- 缓存策略：优先 Redis，其次进程内缓存；写明 key 结构、TTL、失效策略，更新路径要么写后失效要么旁路刷新。
- 计算密集型任务放到后台队列或线程池，避免阻塞事件循环。
- 对外接口应设置速率限制与请求体大小限制，防止滥用。

## 观测性与日志
- 结构化日志（JSON）记录 request id、user/tenant、path、status、耗时；避免在核心路径打印大对象。
- 接入链路追踪（trace/span），关键外部调用打点；至少上报延迟、错误率、QPS 指标。
- 健康检查区分 liveness/readiness，探测依赖（DB、缓存、下游）。

## 测试与质量基线
- MUST：提交前通过 lint/format/test；推荐 `ruff + black + mypy + pytest`，行覆盖率基线 ≥80%，关键分支/错误路径需覆盖。
- 新增路由至少包含：成功路径测试、校验失败/权限失败测试、外部调用超时或降级测试；依赖通过注入替换为 fake/stub。
- 合约保持稳定：对外 API 变更需更新 OpenAPI，并补充回归测试。

## 文档与契约
- 路由声明 `summary/description`、示例 payload；必要时编写 `response_model` 示例以指导前端。
- 依赖、服务、公共工具需有简短注释说明使用前置条件。
- 参考 FastAPI 官方文档（数据模型、路径操作、Middleware）并保持与本规范一致。