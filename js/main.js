// 移动端菜单切换
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.getElementById('nav-menu');

mobileMenu.addEventListener('click', function() {
    mobileMenu.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// 图片过滤功能
const filterBtns = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // 移除所有激活状态
        filterBtns.forEach(b => b.classList.remove('active'));
        // 添加当前激活状态
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        // 添加过滤动画
        galleryItems.forEach(item => {
            if (filter === 'all' || item.getAttribute('data-category') === filter) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 10);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    });
});

// 添加加载动画
window.addEventListener('load', function() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
        }, 200 * index);
    });
});

// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
            });
            
            // 关闭移动端菜单
            mobileMenu.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
});

// 表单提交处理
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // 获取表单数据
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // 简单验证
        if (name && email && message) {
            // 这里可以添加实际的表单提交逻辑
            alert('感谢您的消息！我会尽快回复您。');
            contactForm.reset();
        } else {
            alert('请填写所有必填字段。');
        }
    });
}

// 滚动动画效果
function animateOnScroll() {
    const elements = document.querySelectorAll('.about-content, .gallery-item, .contact-content, .skill');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// 为需要动画的元素设置初始状态
document.addEventListener('DOMContentLoaded', function() {
    const animateElements = document.querySelectorAll('.about-content, .gallery-item, .contact-content, .skill');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // 监听滚动事件
    window.addEventListener('scroll', animateOnScroll);
    // 初始调用
    animateOnScroll();
});

// 图片灯箱功能（简化版）
const galleryItems = document.querySelectorAll('.gallery-item');
galleryItems.forEach(item => {
    item.addEventListener('click', function() {
        const imgSrc = this.querySelector('img').src;
        const caption = this.querySelector('.overlay-content h3').textContent;
        
        // 创建模态框
        const modal = document.createElement('div');
        modal.style.position = 'fixed';
        modal.style.top = '0';
        modal.style.left = '0';
        modal.style.width = '100%';
        modal.style.height = '100%';
        modal.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
        modal.style.display = 'flex';
        modal.style.alignItems = 'center';
        modal.style.justifyContent = 'center';
        modal.style.zIndex = '9999';
        modal.style.cursor = 'pointer';
        
        const modalImg = document.createElement('img');
        modalImg.src = imgSrc;
        modalImg.style.maxWidth = '90%';
        modalImg.style.maxHeight = '90%';
        modalImg.style.objectFit = 'contain';
        
        modal.appendChild(modalImg);
        
        modal.addEventListener('click', function() {
            document.body.removeChild(modal);
        });
        
        document.body.appendChild(modal);
    });
});