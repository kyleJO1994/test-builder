/**
 * main.js - Spring Cherry Blossom & Admin Content Manager
 */

// --- Constants & Config ---
const DEFAULT_ITEMS = [
    { id: 1, category: '[가전]', title: '가성비 최고 무선 청소기', url: 'https://coupa.ng/...' },
    { id: 2, category: '[식품]', title: '재구매율 1위 닭가슴살', url: 'https://coupa.ng/...' },
    { id: 3, category: '[생활]', title: '향기 좋은 섬유유연제 대용량', url: 'https://coupa.ng/...' },
    { id: 4, category: '[도서]', title: '요즘 읽기 좋은 베스트셀러', url: 'https://coupa.ng/...' },
    { id: 5, category: '[디지털]', title: '가볍게 쓰기 좋은 태블릿 거치대', url: 'https://coupa.ng/...' }
];

const STORAGE_KEY = 'cherry_blossom_items';
const ADMIN_PASS = '1234'; // Simple prototype password

// --- Admin Manager Class ---
class AdminManager {
    constructor() {
        this.isAdmin = false;
        this.items = this.loadItems();
        this.init();
    }

    init() {
        this.renderItems();
        this.setupScrollingNotice();
        // Check session if needed (optional)
    }

    loadItems() {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : [...DEFAULT_ITEMS];
    }

    saveItems() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.items));
        this.renderItems();
    }

    // --- Auth ---
    toggleLoginModal() {
        const modal = document.getElementById('login-modal');
        modal.style.display = modal.style.display === 'flex' ? 'none' : 'flex';
    }

    login() {
        const pass = document.getElementById('admin-password').value;
        if (pass === ADMIN_PASS) {
            this.isAdmin = true;
            document.body.classList.add('is-admin');
            this.toggleLoginModal();
            this.renderItems();
            alert('🌸 관리자 모드로 로그인되었습니다.');
        } else {
            alert('❌ 비밀번호가 틀렸습니다.');
        }
    }

    // --- CRUD ---
    renderItems() {
        const container = document.getElementById('link-list-container');
        container.innerHTML = '';

        this.items.forEach((item, index) => {
            const wrapper = document.createElement('div');
            wrapper.className = 'item-wrapper';
            
            let adminControls = '';
            if (this.isAdmin) {
                adminControls = `
                    <div class="admin-controls">
                        <button class="control-btn move" onclick="adminManager.moveItem(${index}, -1)" title="위로">▲</button>
                        <button class="control-btn move" onclick="adminManager.moveItem(${index}, 1)" title="아래로">▼</button>
                        <button class="control-btn delete" onclick="adminManager.deleteItem(${index})" title="삭제">×</button>
                    </div>
                `;
            }

            wrapper.innerHTML = `
                ${adminControls}
                <a href="${item.url}" class="link-button" target="_blank">
                    <span class="category">${item.category}</span> ${item.title}
                </a>
            `;
            container.appendChild(wrapper);
        });
    }

    showAddItemPrompt() {
        const category = prompt('카테고리를 입력하세요 (예: [가전])', '[기타]');
        const title = prompt('상품명을 입력하세요', '');
        const url = prompt('상품 링크(URL)를 입력하세요', 'https://');

        if (title && url) {
            this.items.push({ id: Date.now(), category, title, url });
            this.saveItems();
        }
    }

    deleteItem(index) {
        if (confirm('정말 삭제하시겠습니까?')) {
            this.items.splice(index, 1);
            this.saveItems();
        }
    }

    moveItem(index, direction) {
        const newIndex = index + direction;
        if (newIndex >= 0 && newIndex < this.items.length) {
            const temp = this.items[index];
            this.items[index] = this.items[newIndex];
            this.items[newIndex] = temp;
            this.saveItems();
        }
    }

    // --- Scrolling Notice Setup ---
    setupScrollingNotice() {
        const noticeText = "이 포스팅은 쿠팡 파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를 제공받습니다.";
        const container = document.getElementById('scrolling-notice');
        // Create 8 spans for a truly infinite seamless loop
        container.innerHTML = `<span>${noticeText}</span>`.repeat(8);
    }
}

// --- Visual Effects (Cherry Blossom Rain) ---
class CherryBlossomEffect {
    constructor() {
        this.container = document.body;
        this.petals = ['🌸', '✨', '🍃', '💕'];
        this.init();
    }

    init() {
        setInterval(() => this.createPetal(), 800);
    }

    createPetal() {
        const petal = document.createElement('div');
        const type = this.petals[Math.floor(Math.random() * this.petals.length)];
        
        petal.innerHTML = type;
        petal.style.position = 'fixed';
        petal.style.top = '-30px';
        petal.style.left = Math.random() * 100 + 'vw';
        petal.style.fontSize = (Math.random() * 15 + 10) + 'px';
        petal.style.zIndex = '999';
        petal.style.pointerEvents = 'none';
        petal.style.opacity = Math.random() * 0.7 + 0.3;
        
        const duration = Math.random() * 7 + 5;
        const drift = Math.random() * 300 - 150;
        
        this.container.appendChild(petal);

        const animation = petal.animate([
            { transform: `translate(0, 0) rotate(0deg)`, opacity: petal.style.opacity },
            { transform: `translate(${drift}px, 105vh) rotate(${Math.random() * 720}deg)`, opacity: 0 }
        ], {
            duration: duration * 1000,
            easing: 'linear'
        });

        animation.onfinish = () => petal.remove();
    }
}

// --- App Initialization ---
const adminManager = new AdminManager();
document.addEventListener('DOMContentLoaded', () => {
    new CherryBlossomEffect();
    console.log("🌸 Spring Vibe CMS Initialized!");
});
