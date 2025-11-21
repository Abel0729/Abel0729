# 个人摄影作品集网站

这是一个现代化的个人摄影作品展示网站，包含个人信息介绍和摄影作品展示功能。

## 功能特性

- 响应式设计，适配各种设备尺寸
- 作品分类过滤功能（风光、人像、街拍等）
- 平滑滚动和动画效果
- 移动端友好的导航菜单
- 联系表单功能
- 图片灯箱查看功能

## 文件结构

```
portfolio-website/
├── index.html          # 主页面
├── css/
│   └── style.css       # 样式文件
├── js/
│   └── main.js         # JavaScript功能文件
├── images/            # 图片文件夹
├── placeholder-images.html  # 占位图片参考
└── README.md          # 说明文档
```

## 如何使用

1. 打开 `index.html` 文件即可在浏览器中查看网站
2. 如需使用自己的照片替换占位图片：
   - 将你的摄影作品放入 `images/` 文件夹
   - 更新 `index.html` 中的图片路径
   - 可参考 `placeholder-images.html` 中的图片链接格式

## 自定义内容

### 更新个人信息
编辑 `index.html` 文件中的以下部分：
- 导航栏文字
- 英雄区域标题和描述
- 关于我部分的介绍文字
- 联系信息（邮箱、电话等）

### 添加更多作品
在 `index.html` 的作品集部分添加更多 `gallery-item` 元素，格式如下：
```html
<div class="gallery-item" data-category="category-name">
    <img src="path/to/your/image.jpg" alt="作品描述">
    <div class="overlay">
        <div class="overlay-content">
            <h3>作品标题</h3>
            <p>作品描述</p>
        </div>
    </div>
</div>
```

## 设计说明

- 使用现代CSS3技术实现美观的视觉效果
- 采用网格布局展示作品集
- 使用平滑动画增强用户体验
- 使用 Google Fonts 提供的中文字体确保文本显示效果

## 技术栈

- HTML5
- CSS3 (包含 Flexbox 和 Grid)
- JavaScript (ES6)
- Google Fonts (Noto Sans SC)

## 响应式断点

- 桌面端：> 768px
- 移动端：< 768px

## 浏览器兼容性

支持现代浏览器，包括 Chrome、Firefox、Safari、Edge 等。