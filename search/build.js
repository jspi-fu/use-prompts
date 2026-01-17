const fs = require('fs');
const path = require('path');

// 配置
// 尝试定位根目录：如果当前在 search 目录下，则回退一级；否则认为是当前目录
let ROOT_DIR = path.resolve(__dirname, '..');
if (!fs.existsSync(path.join(ROOT_DIR, 'README.md')) && fs.existsSync(path.join(__dirname, 'README.md'))) {
  ROOT_DIR = __dirname;
}

const OUTPUT_FILE = path.join(__dirname, 'prompts-index.json');
const README_PATH = path.join(ROOT_DIR, 'README.md');

// 需要扫描的目录
const CATEGORIES = {
  '日常使用': 'daily',
  'AI编程': 'coding',
  '官方提示词': 'official'
};

/**
 * 从 README.md 提取功能描述
 */
function extractDescriptions() {
  if (!fs.existsSync(README_PATH)) {
    console.warn(`⚠️  未找到 README.md (${README_PATH})，将跳过描述提取`);
    return {};
  }

  try {
    const readmeContent = fs.readFileSync(README_PATH, 'utf-8');
    const descriptions = {};

    // 匹配形如: - **[文件名.md](路径/文件名.md)** - 描述内容
    const pattern = /- \*\*\[(.*?)\]\((.*?)\)\*\* - (.*?)(?:\r?\n|$)/g;
    let match;

    while ((match = pattern.exec(readmeContent)) !== null) {
      const [, filename, filepath, description] = match;
      descriptions[filepath] = description.trim();
    }

    console.log(`📝 从 README 提取了 ${Object.keys(descriptions).length} 条描述`);
    return descriptions;
  } catch (err) {
    console.warn(`⚠️  解析 README.md 失败: ${err.message}`);
    return {};
  }
}

/**
 * 递归扫描目录获取所有 .md 文件
 */
function scanDirectory(dir, category, subcategory = '') {
  const files = [];
  if (!fs.existsSync(dir)) return files;

  try {
    const items = fs.readdirSync(dir);
    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        files.push(...scanDirectory(fullPath, category, item));
      } else if (item.endsWith('.md') && item !== 'README.md') {
        const relativePath = path.relative(ROOT_DIR, fullPath).replace(/\\/g, '/');
        files.push({
          fullPath,
          relativePath,
          filename: item,
          category,
          subcategory: subcategory || category
        });
      }
    }
  } catch (err) {
    console.warn(`⚠️  扫描目录 ${dir} 失败: ${err.message}`);
  }

  return files;
}

/**
 * 构建提示词索引
 */
function buildIndex() {
  console.log('🚀 开始构建提示词索引...');
  console.log(`📍 根目录: ${ROOT_DIR}`);
  console.log(`📍 输出文件: ${OUTPUT_FILE}\n`);

  const descriptions = extractDescriptions();
  const allPrompts = [];

  for (const [categoryName, categoryId] of Object.entries(CATEGORIES)) {
    const categoryPath = path.join(ROOT_DIR, categoryName);

    if (fs.existsSync(categoryPath)) {
      console.log(`📂 扫描目录: ${categoryName}`);
      const files = scanDirectory(categoryPath, categoryName);
      allPrompts.push(...files);
      console.log(`   找到 ${files.length} 个提示词文件\n`);
    } else {
      console.warn(`⚠️  目录不存在: ${categoryName} (路径: ${categoryPath})`);
    }
  }

  if (allPrompts.length === 0) {
    console.warn('❌ 未找到任何提示词文件，请检查目录结构是否正确');
  }

  const prompts = allPrompts.map((file, index) => {
    try {
      const content = fs.readFileSync(file.fullPath, 'utf-8');
      const description = descriptions[file.relativePath] || '';

      if (index % 50 === 0) {
        console.log(`⚙️  处理进度: ${index + 1}/${allPrompts.length}`);
      }

      return {
        id: index,
        path: file.relativePath,
        filename: file.filename,
        category: file.category,
        subcategory: file.subcategory,
        description,
        content,
        size: content.length
      };
    } catch (err) {
      console.error(`❌ 读取文件失败: ${file.fullPath}`, err.message);
      return null;
    }
  }).filter(p => p !== null);

  const indexData = {
    version: '1.0',
    buildTime: new Date().toISOString(),
    totalCount: prompts.length,
    categories: Object.keys(CATEGORIES),
    prompts
  };

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(indexData, null, 2), 'utf-8');

  console.log(`\n✅ 构建完成！`);
  console.log(`📊 总计: ${prompts.length} 个提示词`);
  console.log(`📦 文件大小: ${(fs.statSync(OUTPUT_FILE).size / 1024).toFixed(2)} KB\n`);
}

// 执行构建
try {
  buildIndex();
} catch (error) {
  console.error('❌ 构建异常中断:', error);
  process.exit(1);
}
