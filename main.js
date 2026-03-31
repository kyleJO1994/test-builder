/**
 * main.js - Daily Finds Content Manager & Interactive Effects
 */

// ==========================================================================
// [데이터 설정] 상품 리스트 관리 (여기서 상품을 추가/수정하세요)
// ==========================================================================
const DEFAULT_ITEMS = [
    { 
        id: 1, 
        title: '09번.침대 헤드 커버 / 머리커버 쿠션', 
        url: 'https://coupa.ng/...', 
        image: 'https://t1.daumcdn.net/thumb/R720x0.fjpg/?fname=http://t1.daumcdn.net/brunch/service/user/7r5/image/dC0HchQUI2-3Z0a0xNmV9Daj5oQ.JPEG' 
    },
    { 
        id: 2, 
        title: '08번.쇼파 틈새 선반', 
        url: 'https://coupa.ng/...', 
        image: 'https://t1.daumcdn.net/thumb/R720x0.fjpg/?fname=http://t1.daumcdn.net/brunch/service/user/7r5/image/dC0HchQUI2-3Z0a0xNmV9Daj5oQ.JPEG' 
    },
    // 새로운 상품을 추가하려면 아래 형식을 복사해서 사용하세요:
    /*
    { 
        id: Date.now(), 
        title: '상품명 입력', 
        url: '쿠팡 파트너스 링크 입력', 
        image: '이미지 주소 입력' 
    },
    */
];

const STORAGE_KEY = 'daily_finds_items_v2';
const ADMIN_PASS = '1234';

// --- Web Component for Product Cards ---
class ProductCard extends HTMLElement {
    constructor() {
        super();
        const template = document.getElementById('product-card-template').content;
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.appendChild(template.cloneNode(true));
    }

    connectedCallback() {
        const shadow = this.shadowRoot;
        const link = shadow.querySelector('.product-card');
        link.href = this.getAttribute('url');
        link.target = "_blank"; // 새창열기 강제 적용
        
        shadow.querySelector('.product-image').src = this.getAttribute('image');
        shadow.querySelector('.product-image').alt = this.getAttribute('title');
        shadow.querySelector('.product-title').textContent = this.getAttribute('title');
    }
}
customElements.define('product-card', ProductCard);

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
        
        // 검색 기능 연결
        const searchInput = document.getElementById('search-input');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => this.filterItems(e.target.value));
        }
    }

    // 대가성 문구 무한 루프 생성
    setupScrollingNotice() {
        const noticeText = "쿠팡 파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를 제공받습니다.";
        const container = document.getElementById('scrolling-notice');
        if (container) {
            // 자연스러운 루프를 위해 문구를 여러 번 반복해서 채움
            container.innerHTML = `<span>${noticeText}</span>`.repeat(10);
        }
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
            alert('✓ 관리자 모드로 로그인되었습니다.');
        } else {
            alert('✗ 비밀번호가 틀렸습니다.');
        }
    }

    // --- CRUD & Rendering ---
    renderItems(itemsToRender = this.items) {
        const container = document.getElementById('item-list-container');
        if (!container) return;
        
        container.innerHTML = '';

        itemsToRender.forEach((item, index) => {
            const itemWrapper = document.createElement('div');
            itemWrapper.className = 'item-wrapper';

            // Create product card
            const card = document.createElement('product-card');
            card.setAttribute('title', item.title);
            card.setAttribute('url', item.url);
            card.setAttribute('image', item.image);
            
            // 관리자 모드일 때 컨트롤 버튼 노출
            if (this.isAdmin) {
                const adminControls = document.createElement('div');
                adminControls.className = 'admin-controls';
                adminControls.innerHTML = `
                    <button class="control-btn" onclick="adminManager.moveItem(${this.items.indexOf(item)}, -1)" title="위로">▲</button>
                    <button class="control-btn" onclick="adminManager.moveItem(${this.items.indexOf(item)}, 1)" title="아래로">▼</button>
                    <button class="control-btn" onclick="adminManager.deleteItem(${this.items.indexOf(item)})" title="삭제">×</button>
                `;
                itemWrapper.appendChild(adminControls);
            }
            
            itemWrapper.appendChild(card);
            container.appendChild(itemWrapper);
        });
    }

    filterItems(query) {
        const lowerCaseQuery = query.toLowerCase();
        const filtered = this.items.filter(item => item.title.toLowerCase().includes(lowerCaseQuery));
        this.renderItems(filtered);
    }

    showAddItemPrompt() {
        const title = prompt('상품명을 입력하세요', '');
        const url = prompt('상품 링크(URL)를 입력하세요', 'https://');
        const image = prompt('상품 이미지 URL을 입력하세요', '');

        if (title && url && image) {
            this.items.unshift({ id: Date.now(), title, url, image });
            this.saveItems();
        }
    }

    deleteItem(index) {
        if (confirm('정말 이 상품을 삭제하시겠습니까?')) {
            this.items.splice(index, 1);
            this.saveItems();
        }
    }

    moveItem(index, direction) {
        const newIndex = index + direction;
        if (newIndex >= 0 && newIndex < this.items.length) {
            [this.items[index], this.items[newIndex]] = [this.items[newIndex], this.items[index]];
            this.saveItems();
        }
    }
}

// --- App Initialization ---
const adminManager = new AdminManager();
window.adminManager = adminManager; // global access

// 벚꽃 효과 (기존 기능 유지)
class CherryBlossomEffect {
    constructor() {
        this.container = document.body;
        this.petals = ['🌸', '✨', '🍃'];
        this.init();
    }

    init() {
        setInterval(() => this.createPetal(), 1000);
    }

    createPetal() {
        const petal = document.createElement('div');
        petal.innerHTML = this.petals[Math.floor(Math.random() * this.petals.length)];
        petal.style.position = 'fixed';
        petal.style.top = '-20px';
        petal.style.left = Math.random() * 100 + 'vw';
        petal.style.fontSize = (Math.random() * 10 + 10) + 'px';
        petal.style.zIndex = '999';
        petal.style.pointerEvents = 'none';
        petal.style.opacity = Math.random();
        
        const duration = Math.random() * 5 + 5;
        const drift = Math.random() * 200 - 100;
        
        this.container.appendChild(petal);

        const animation = petal.animate([
            { transform: `translate(0, 0) rotate(0deg)`, opacity: petal.style.opacity },
            { transform: `translate(${drift}px, 110vh) rotate(${Math.random() * 360}deg)`, opacity: 0 }
        ], {
            duration: duration * 1000,
            easing: 'linear'
        });

        animation.onfinish = () => petal.remove();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new CherryBlossomEffect();
    console.log("✓ Daily Finds CMS & Effects Activated!");
});
