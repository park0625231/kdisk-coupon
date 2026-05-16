// ==================== Utility Functions ====================

/**
 * 쿠폰 코드를 클립보드에 복사하고 자동으로 등록 페이지 이동
 * @param {string} couponCode - 복사할 쿠폰 코드
 */
function copyCoupon(couponCode) {
    // 임시 텍스트 영역 생성
    const tempTextArea = document.createElement('textarea');
    tempTextArea.value = couponCode;
    document.body.appendChild(tempTextArea);
    
    // 텍스트 선택 및 복사
    tempTextArea.select();
    document.execCommand('copy');
    
    // 임시 텍스트 영역 제거
    document.body.removeChild(tempTextArea);
    
    // 사용자에게 피드백 제공
    showNotification(`쿠폰 코드 "${couponCode}"가 복사되었습니다!`);
    
    // 1초 후 자동으로 등록 페이지 열기
    setTimeout(() => {
        openRegistration();
    }, 1000);
}

/**
 * 쿠폰 등록 페이지로 이동
 */
function openRegistration() {
    // 쿠폰 등록 페이지 URL
    const registrationUrl = 'https://kdisk.co.kr/main/coupon.php?doc=special_coupon_2014&coupon_num=&coupon_num=kkkkk-8416';
    
    // 새 탭에서 등록 페이지 열기
    window.open(registrationUrl, '_blank');
}

/**
 * 사용자에게 알림 표시
 * @param {string} message - 표시할 메시지
 */
function showNotification(message) {
    // 기존 알림이 있으면 제거
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // 새 알림 생성
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%);
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
        font-weight: 600;
    `;
    
    document.body.appendChild(notification);
    
    // 3초 후 알림 제거
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

/**
 * 페이지의 특정 섹션으로 스크롤
 * @param {string} sectionId - 섹션의 ID
 */
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

/**
 * 쿠폰 사용 기간 계산
 */
function calculateDuration() {
    const couponCount = document.getElementById('coupon-count').value;
    const monthlyPrice = 9900;
    
    // 결과 업데이트
    document.getElementById('result-coupon').textContent = couponCount + '개';
    document.getElementById('result-period').textContent = couponCount + '개월';
    document.getElementById('result-saving').textContent = '₩' + (monthlyPrice * couponCount).toLocaleString();
    document.getElementById('result-payment').textContent = '무료';
}

/**
 * 쿠폰 혜택 계산
 */
function calculateBenefit() {
    calculateDuration();
}

// ==================== Animation Styles ==================== 

// CSS 애니메이션 추가
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ==================== Page Load Events ====================

document.addEventListener('DOMContentLoaded', function() {
    // 페이지 로드 시 초기화
    initializeCalculator();
});

/**
 * 계산기 초기화
 */
function initializeCalculator() {
    const couponCountElement = document.getElementById('coupon-count');
    if (couponCountElement) {
        calculateDuration();
    }
}

// ==================== Smooth Scroll Polyfill ====================

// 오래된 브라우저를 위한 부드러운 스크롤 폴리필
if (!('scrollBehavior' in document.documentElement.style)) {
    window.addEventListener('click', function(e) {
        if (e.target.tagName === 'A' && e.target.getAttribute('href').startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(e.target.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
}

// ==================== Performance Optimization ====================

// 이미지 지연 로딩 (Lazy Loading)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}
