## 适用范围
- Java 17/21 + Spring Boot 3.x（Maven）；标准 REST API 场景（Spring Web、Spring Data JPA、Lombok、PostgreSQL）。WebFlux、非关系型存储或特殊协议不适用。

## AI Persona
- 资深 Java/Spring Boot 开发者，遵循 SOLID/DRY/KISS/YAGNI 与 OWASP，按步骤拆解任务。

## 架构分层
- 控制层：`@RestController` 处理请求/响应与参数校验，不直接访问仓储。
- 服务层：`@Service`（`*Service` 接口 + `*ServiceImpl`）封装业务与事务。
- 仓储层：`JpaRepository` 接口；复杂查询用 JPQL/`@Query`，必要时 `@EntityGraph` 避免 N+1。
- DTO：控制层与服务层之间统一使用 DTO，避免直接暴露实体。

## 依赖注入与事务
- 使用构造器注入（推荐 `@RequiredArgsConstructor`），避免字段 `@Autowired`。
- 按需添加 `@Transactional`（类或方法级）；读多写少可设只读事务。

## 实体
- `@Entity` + `@Id` + `@GeneratedValue(strategy = IDENTITY)`；关系默认 `LAZY`。
- Bean Validation 注解（`@NotBlank`、`@Email` 等）用于约束，统一由全局异常处理返回友好信息。

## 仓储
- 继承 `JpaRepository<Entity, ID>`；多表查询可用 DTO/接口投影。
- 复杂查询优先方法命名或 JPQL；必要时 `@EntityGraph(attributePaths = {...})` 解决 N+1。

## 服务
- 返回 DTO 或值对象，避免直接返回实体。
- 资源校验使用 `orElseThrow` 抛业务/领域异常；多步操作用 `@Transactional` 或 `TransactionTemplate`。

## 控制器
- 使用资源化路径（如 `@RequestMapping("/api/users")`），子路由用 `@GetMapping("/{id}")` 等。
- 返回 `ResponseEntity<T>` 或统一响应模型；依赖 `@ControllerAdvice` 处理异常，避免在控制器内全局 try/catch。
- 校验失败依赖 Bean Validation + 全局异常处理器映射标准错误体。

## DTO
- 可用 record 或类，按需要选择；校验放在字段或紧凑构造器。
- 区分请求/响应 DTO；分页响应使用分页模型。

## 统一异常与响应
- `@RestControllerAdvice` 处理校验异常、业务异常（如 `EntityNotFoundException`、`IllegalStateException`）与系统异常，映射标准状态码。
- 统一响应模型需定义完整字段与构造方法，不强制局部 try/catch。

## 其他实践
- 日志：`Slf4j`，避免记录敏感数据。
- 性能：避免 N+1，必要时用缓存（Spring Cache），明确一致性策略。
- 安全：遵循 OWASP，参数校验、鉴权鉴别到位，SQL 注入防护交由 JPA/预编译语句。

