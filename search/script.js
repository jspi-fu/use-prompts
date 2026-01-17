/**
 * 提示词搜索前端脚本
 * 纯静态方案，从 prompts-index.json 加载数据
 */

// 全局状态
const state = {
    prompts: [],           // 所有提示词数据
    filteredPrompts: [],   // 过滤后的提示词
    currentCategory: 'all',// 当前分类
    searchQuery: '',       // 搜索查询
    selectedPrompt: null,  // 选中的提示词
    searchStrategies: {    // 搜索策略
        filename: true,
        category: true,
        description: true
    }
};

// DOM 元素引用
const elements = {
    searchInput: null,
    searchBtn: null,
    resultsList: null,
    resultsTitle: null,
    resultCount: null,
    totalCount: null,
    displayCount: null,
    previewPanel: null,
    previewContent: null,
    previewTitle: null,
    previewText: null,
    previewDescription: null,
    copyBtn: null,
    downloadBtn: null,
    loadingOverlay: null,
    categoryBtns: null,
    strategyCheckboxes: null
};

/**
 * 初始化应用
 */
async function init() {
    // 获取 DOM 元素引用
    initElements();

    // 绑定事件
    bindEvents();

    // 加载数据
    await loadData();

    // 初始渲染
    render();

    // 隐藏加载动画
    hideLoading();

    // 初始化图标
    if (window.lucide) {
        window.lucide.createIcons();
    }
}

/**
 * 初始化 DOM 元素引用
 */
function initElements() {
    elements.searchInput = document.getElementById('searchInput');
    elements.searchBtn = document.getElementById('searchBtn');
    elements.resultsList = document.getElementById('resultsList');
    elements.resultsTitle = document.getElementById('resultsTitle');
    elements.resultCount = document.getElementById('resultCount');
    elements.totalCount = document.getElementById('totalCount');
    elements.displayCount = document.getElementById('displayCount');
    elements.previewPanel = document.getElementById('previewPanel');
    elements.previewContent = document.getElementById('previewContent');
    elements.previewTitle = document.getElementById('previewTitle');
    elements.previewText = document.getElementById('previewText');
    elements.previewDescription = document.getElementById('previewDescription');
    elements.copyBtn = document.getElementById('copyBtn');
    elements.downloadBtn = document.getElementById('downloadBtn');
    elements.loadingOverlay = document.getElementById('loadingOverlay');
    elements.categoryBtns = document.querySelectorAll('.category-btn');
    elements.strategyCheckboxes = document.querySelectorAll('.strategy-options input[type="checkbox"]');
}

/**
 * 绑定事件监听器
 */
function bindEvents() {
    // 搜索框回车
    elements.searchInput.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    });

    // 搜索框实时搜索（防抖）
    let debounceTimer;
    elements.searchInput.addEventListener('input', () => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(performSearch, 300);
    });

    // 搜索按钮
    elements.searchBtn.addEventListener('click', performSearch);

    // 分类按钮
    elements.categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const category = btn.dataset.category;
            setCategory(category);
        });
    });

    // 搜索策略复选框
    elements.strategyCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            state.searchStrategies[checkbox.value] = checkbox.checked;
            performSearch();
        });
    });

    // 复制按钮
    elements.copyBtn.addEventListener('click', copyContent);

    // 下载按钮
    elements.downloadBtn.addEventListener('click', downloadContent);
}

/**
 * 加载提示词数据
 */
async function loadData() {
    try {
        const response = await fetch('./prompts-index.json');
        if (!response.ok) {
            throw new Error('无法加载索引文件');
        }
        const data = await response.json();
        state.prompts = data.prompts || [];
        state.filteredPrompts = [...state.prompts];
        console.log(`✅ 加载了 ${state.prompts.length} 个提示词`);
    } catch (error) {
        console.error('❌ 加载数据失败:', error);
        showError('加载数据失败，请确保已运行 npm run build 生成索引文件');
    }
}

/**
 * 执行搜索
 */
function performSearch() {
    const query = elements.searchInput.value.trim().toLowerCase();
    state.searchQuery = query;

    if (!query) {
        // 无搜索词，仅按分类过滤
        filterByCategory();
    } else {
        // 有搜索词，执行多策略搜索
        state.filteredPrompts = state.prompts.filter(prompt => {
            // 先检查分类
            if (state.currentCategory !== 'all' && prompt.category !== state.currentCategory) {
                return false;
            }

            // 检查搜索策略
            let matches = false;

            if (state.searchStrategies.filename) {
                // 文件名匹配
                if (prompt.filename.toLowerCase().includes(query)) {
                    matches = true;
                }
            }

            if (state.searchStrategies.category) {
                // 分类/目录匹配
                if (prompt.category.toLowerCase().includes(query) ||
                    prompt.subcategory.toLowerCase().includes(query) ||
                    prompt.path.toLowerCase().includes(query)) {
                    matches = true;
                }
            }

            if (state.searchStrategies.description) {
                // 功能描述匹配
                if (prompt.description && prompt.description.toLowerCase().includes(query)) {
                    matches = true;
                }
            }

            return matches;
        });
    }

    render();
}

/**
 * 按分类过滤
 */
function filterByCategory() {
    if (state.currentCategory === 'all') {
        state.filteredPrompts = [...state.prompts];
    } else {
        state.filteredPrompts = state.prompts.filter(
            prompt => prompt.category === state.currentCategory
        );
    }
}

/**
 * 设置当前分类
 */
function setCategory(category) {
    state.currentCategory = category;

    // 更新按钮状态
    elements.categoryBtns.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.category === category);
    });

    // 更新标题
    elements.resultsTitle.textContent = category === 'all' ? '全部提示词' : category;

    // 重新搜索
    performSearch();
}

/**
 * 渲染结果列表
 */
function render() {
    // 更新统计
    elements.totalCount.textContent = state.prompts.length;
    elements.displayCount.textContent = state.filteredPrompts.length;
    elements.resultCount.textContent = `${state.filteredPrompts.length} 个结果`;

    // 渲染列表
    if (state.filteredPrompts.length === 0) {
        elements.resultsList.innerHTML = `
      <div class="empty-state">
        <i data-lucide="search-x" class="icon"></i>
        <div class="message">未找到匹配的提示词</div>
      </div>
    `;
    } else {
        elements.resultsList.innerHTML = state.filteredPrompts.map(prompt => {
            const isActive = state.selectedPrompt && state.selectedPrompt.id === prompt.id;
            return `
          <div class="result-item ${isActive ? 'active' : ''}" data-id="${prompt.id}">
            <div class="filename">
                <i data-lucide="file" class="item-icon"></i>
                <span class="filename-text">${highlightText(prompt.filename, state.searchQuery)}</span>
            </div>
            <div class="path">${highlightText(prompt.path, state.searchQuery)}</div>
            ${prompt.description ? `<div class="description">${highlightText(prompt.description, state.searchQuery)}</div>` : ''}
            <span class="category-tag">${prompt.subcategory}</span>
          </div>
        `;
        }).join('');

        // 绑定结果项点击事件
        document.querySelectorAll('.result-item').forEach(item => {
            item.addEventListener('click', () => {
                const id = parseInt(item.dataset.id);
                selectPrompt(id);
            });
        });
    }

    // 刷新图标
    if (window.lucide) {
        window.lucide.createIcons();
    }
}

/**
 * 高亮搜索关键词
 */
function highlightText(text, query) {
    if (!query || !text) return text;

    const regex = new RegExp(`(${escapeRegExp(query)})`, 'gi');
    return text.replace(regex, '<span class="highlight">$1</span>');
}

/**
 * 转义正则表达式特殊字符
 */
function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * 选中提示词并显示预览
 */
function selectPrompt(id) {
    const prompt = state.prompts.find(p => p.id === id);
    if (!prompt) return;

    state.selectedPrompt = prompt;

    // 更新结果列表中的选中状态
    document.querySelectorAll('.result-item').forEach(item => {
        item.classList.toggle('active', parseInt(item.dataset.id) === id);
    });

    // 显示预览内容
    showPreview(prompt);
}

/**
 * 显示预览
 */
function showPreview(prompt) {
    // 隐藏占位符，显示内容
    document.querySelector('.preview-placeholder').style.display = 'none';
    elements.previewContent.style.display = 'flex';

    // 填充数据
    elements.previewTitle.textContent = prompt.filename.replace('.md', '');
    elements.previewText.textContent = prompt.content;
    elements.previewDescription.textContent = prompt.description || '暂无描述';
}

/**
 * 复制内容到剪贴板
 */
async function copyContent() {
    if (!state.selectedPrompt) return;

    const iconEl = elements.copyBtn.querySelector('.icon');
    const textEl = elements.copyBtn.querySelector('.text');

    // 保存原始图标名称
    const originalIcon = iconEl.getAttribute('data-lucide');

    try {
        await navigator.clipboard.writeText(state.selectedPrompt.content);

        // 显示成功状态
        elements.copyBtn.classList.add('success');
        textEl.textContent = '已复制!';
        // 切换图标
        iconEl.setAttribute('data-lucide', 'check');
        if (window.lucide) window.lucide.createIcons();

        setTimeout(() => {
            elements.copyBtn.classList.remove('success');
            textEl.textContent = '复制';
            // 恢复图标
            iconEl.setAttribute('data-lucide', 'copy');
            if (window.lucide) window.lucide.createIcons();
        }, 2000);
    } catch (error) {
        console.error('复制失败:', error);
        alert('复制失败，请手动复制');
    }
}

/**
 * 下载文件
 */
function downloadContent() {
    if (!state.selectedPrompt) return;

    const blob = new Blob([state.selectedPrompt.content], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = state.selectedPrompt.filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

/**
 * 隐藏加载动画
 */
function hideLoading() {
    elements.loadingOverlay.classList.add('hidden');
}

/**
 * 显示错误信息
 */
function showError(message) {
    elements.resultsList.innerHTML = `
    <div class="empty-state">
      <i data-lucide="alert-circle" class="icon"></i>
      <div class="message">${message}</div>
    </div>
  `;
    if (window.lucide) {
        window.lucide.createIcons();
    }
}

// 启动应用
document.addEventListener('DOMContentLoaded', init);
