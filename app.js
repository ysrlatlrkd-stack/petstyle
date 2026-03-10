/**
 * PetStyle Platform App Logic
 */

const mockShops = [
    {
        id: 1,
        name: "뷰티도그 청담본점",
        rating: 4.9,
        reviews: 342,
        location: "서울시 강남구 청담동",
        distance: "1.2km",
        price: "60,000",
        image: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        tags: ["가위컷전문", "포메라니안", "대형견가능"],
        badges: ["프리미엄", "인기매장"]
    },
    {
        id: 2,
        name: "해피퍼피 미용실",
        rating: 4.7,
        reviews: 128,
        location: "서울시 서초구 서초동",
        distance: "2.5km",
        price: "45,000",
        image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        tags: ["푸들전문", "곰돌이컷", "스파"],
        badges: ["신규오픈"]
    },
    {
        id: 3,
        name: "스타일멍",
        rating: 4.8,
        reviews: 256,
        location: "서울시 강남구 논현동",
        distance: "3.1km",
        price: "55,000",
        image: "https://images.unsplash.com/photo-1590425519894-067888716b25?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        tags: ["비숑프리제", "하이바컷", "가위컷전문"],
        badges: ["인기매장"]
    },
    {
        id: 4,
        name: "멍멍이의 품격",
        rating: 4.6,
        reviews: 89,
        location: "서울시 송파구 잠실동",
        distance: "4.8km",
        price: "40,000",
        image: "https://images.unsplash.com/photo-1625316708582-7c38734be31d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        tags: ["말티즈", "스포팅", "스파오토바스"],
        badges: []
    },
    {
        id: 5,
        name: "독앤스타일스",
        rating: 4.9,
        reviews: 512,
        location: "서울시 강남구 삼성동",
        distance: "2.0km",
        price: "70,000",
        image: "https://images.unsplash.com/photo-1534361960057-19889db9621e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        tags: ["명품가위컷", "전견종", "호텔링"],
        badges: ["프리미엄", "예약마감임박"]
    },
    {
        id: 6,
        name: "그루밍퍼피",
        rating: 4.5,
        reviews: 45,
        location: "서울시 강동구 천호동",
        distance: "7.2km",
        price: "35,000",
        image: "https://images.unsplash.com/photo-1598133894008-61f7fbf8efbd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        tags: ["위생미용", "베넷미용"],
        badges: ["착한가격"]
    }
];

class App {
    constructor() {
        this.mainContent = document.getElementById('main-content');
        this.routes = {
            'home': this.renderHome.bind(this),
            'search': this.renderSearch.bind(this),
            'detail': this.renderDetail.bind(this)
        };
        
        // Initial route
        this.navigate('home');
        
        // Handle active navigation links
        this.setupNavigation();
    }

    setupNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                navLinks.forEach(l => l.classList.remove('active'));
                e.target.classList.add('active');
                
                const text = e.target.textContent;
                if(text === '홈') this.navigate('home');
                else if(text === '추천 매장' || text === '내 주변 찾기') this.navigate('search');
            });
        });
    }

    navigate(route, data = null) {
        this.mainContent.innerHTML = '';
        
        // Add a slight delay for fade-in effect to work properly
        setTimeout(() => {
            if (this.routes[route]) {
                this.routes[route](data);
            }
        }, 50);
        
        window.scrollTo(0, 0);
    }

    renderHome() {
        this.mainContent.innerHTML = `
            <section class="hero-section fade-in">
                <div class="hero-content">
                    <div class="hero-subtitle">✨ 당신의 반려견을 위한 완벽한 스타일링</div>
                    <h1 class="hero-title">내 강아지에게 가장<br><span>잘 어울리는 미용실</span> 찾기</h1>
                    <p class="hero-description">견종과 원하는 스타일만 선택하세요.<br>최고의 전문가들이 있는 미용실을 매칭해 드립니다.</p>
                    
                    <div class="search-container">
                        <div class="search-field">
                            <label>견종</label>
                            <select id="breedSelect">
                                <option value="">견종 선택</option>
                                <option value="poodle">푸들</option>
                                <option value="pomeranian">포메라니안</option>
                                <option value="bichon">비숑 프리제</option>
                                <option value="maltese">말티즈</option>
                                <option value="retriever">리트리버</option>
                                <option value="other">기타</option>
                            </select>
                            <i class="ri-arrow-down-s-line"></i>
                        </div>
                        <div class="search-field">
                            <label>스타일</label>
                            <select id="styleSelect">
                                <option value="">스타일 선택</option>
                                <option value="bear">곰돌이컷</option>
                                <option value="scissors">가위컷</option>
                                <option value="sporting">스포팅</option>
                                <option value="hygiene">위생미용/목욕</option>
                                <option value="special">특수컷</option>
                            </select>
                            <i class="ri-arrow-down-s-line"></i>
                        </div>
                        <div class="search-field">
                            <label>지역</label>
                            <input type="text" placeholder="예: 강남구, 서초동" id="locationInput">
                            <i class="ri-map-pin-line"></i>
                        </div>
                        <button class="btn-primary search-btn" onclick="window.app.navigate('search')">
                            <i class="ri-search-line"></i> 스타일 매칭하기
                        </button>
                    </div>
                </div>
            </section>

            <section class="features-section fade-in">
                <h2 class="section-title">왜 <b>PetStyle</b> 인가요?</h2>
                <div class="features-grid">
                    <div class="feature-card">
                        <div class="feature-icon"><i class="ri-search-eye-line"></i></div>
                        <h3>정밀한 스타일 매칭</h3>
                        <p>단순한 위치 기반이 아닌, 내 반려견의 견종과 모질에 맞는 전문가를 찾아드립니다.</p>
                    </div>
                    <div class="feature-card">
                        <div class="feature-icon"><i class="ri-shield-star-line"></i></div>
                        <h3>검증된 미용사 포트폴리오</h3>
                        <p>미용사의 실제 시술 사진과 경력을 투명하게 확인하고 선택할 수 있습니다.</p>
                    </div>
                    <div class="feature-card">
                        <div class="feature-icon"><i class="ri-calendar-check-line"></i></div>
                        <h3>간편한 실시간 예약</h3>
                        <p>미용실에 번거롭게 전화할 필요 없이, 앱에서 실시간으로 스케줄을 확인하고 예약하세요.</p>
                    </div>
                </div>
            </section>
        `;
    }

    renderSearch() {
        const renderStars = (rating) => {
            return '<i class="ri-star-fill"></i>'.repeat(Math.floor(rating)) + 
                   (rating % 1 !== 0 ? '<i class="ri-star-half-fill"></i>' : '');
        };

        const renderTags = (tags) => {
            return tags.map(tag => \`<span class="tag">#\${tag}</span>\`).join('');
        };

        const renderBadges = (badges) => {
            return badges.map(badge => \`<span class="badge">\${badge}</span>\`).join('');
        };

        const shopCardsHtml = mockShops.map(shop => \`
            <div class="shop-card fade-in" onclick="window.app.navigate('detail', \${shop.id})">
                <div class="shop-image" style="background-image: url('\${shop.image}')">
                    <div class="shop-badges">
                        \${renderBadges(shop.badges)}
                    </div>
                </div>
                <div class="shop-info">
                    <div class="shop-header">
                        <h3 class="shop-title">\${shop.name}</h3>
                        <div class="shop-rating">
                            \${renderStars(shop.rating)}
                            <span>(\${shop.reviews})</span>
                        </div>
                    </div>
                    <div class="shop-location">
                        <i class="ri-map-pin-2-fill"></i> \${shop.location} • \${shop.distance}
                    </div>
                    <div class="shop-tags">
                        \${renderTags(shop.tags)}
                    </div>
                    <div class="shop-footer">
                        <span style="font-size: 0.9rem; color: var(--text-secondary);">예상 비용 (기본)</span>
                        <div class="shop-price">\${shop.price}원~</div>
                    </div>
                </div>
            </div>
        \`).join('');

        this.mainContent.innerHTML = \`
            <div class="results-page fade-in">
                <div class="results-header">
                    <div>
                        <h2 style="font-size: 2rem; margin-bottom: 0.5rem;">스타일 매칭 결과</h2>
                        <p>고객님의 조건에 맞는 <b>\${mockShops.length}</b>개의 미용실을 찾았습니다.</p>
                    </div>
                    <select style="padding: 0.5rem; border: 1px solid var(--border-color); border-radius: var(--radius-sm); outline: none;">
                        <option>추천순</option>
                        <option>거리순</option>
                        <option>평점높은순</option>
                        <option>리뷰많은순</option>
                    </select>
                </div>

                <div class="results-layout">
                    <!-- Sidebar -->
                    <aside class="filter-sidebar">
                        <div class="filter-group">
                            <h4><i class="ri-filter-3-line"></i> 상세 필터</h4>
                        </div>
                        <div class="filter-group">
                            <h4>견종 크기</h4>
                            <label class="checkbox-label"><input type="checkbox" checked> 소형견 (10kg 미만)</label>
                            <label class="checkbox-label"><input type="checkbox"> 중형견 (10~25kg)</label>
                            <label class="checkbox-label"><input type="checkbox"> 대형견 (25kg 이상)</label>
                        </div>
                        <div class="filter-group">
                            <h4>전문 스타일</h4>
                            <label class="checkbox-label"><input type="checkbox"> 가위컷 전문</label>
                            <label class="checkbox-label"><input type="checkbox"> 특수컷 전문</label>
                            <label class="checkbox-label"><input type="checkbox"> 베넷미용</label>
                        </div>
                        <div class="filter-group">
                            <h4>편의 시설</h4>
                            <label class="checkbox-label"><input type="checkbox"> 주차 가능</label>
                            <label class="checkbox-label"><input type="checkbox"> 스파 시설</label>
                            <label class="checkbox-label"><input type="checkbox"> 픽업 서비스</label>
                        </div>
                        <button class="btn-primary" style="width: 100%; margin-top: 1rem;">필터 적용하기</button>
                    </aside>

                    <!-- Shop List -->
                    <div class="shops-grid">
                        \${shopCardsHtml}
                    </div>
                </div>
            </div>
        \`;
    }

    renderDetail(shopId) {
        // Find shop or default to first if not found (for direct nav)
        const shop = mockShops.find(s => s.id === shopId) || mockShops[0];
        
        // Mock portfolio images
        const portfolioUrls = [
            "https://images.unsplash.com/photo-1541364983171-a8ba01e95cfc?auto=format&fit=crop&w=300&q=80",
            "https://images.unsplash.com/photo-1588269845464-899321358d7e?auto=format&fit=crop&w=300&q=80",
            "https://images.unsplash.com/photo-1596492784531-6f6eb278af54?auto=format&fit=crop&w=300&q=80",
            "https://images.unsplash.com/photo-1579168765467-3b235f938439?auto=format&fit=crop&w=300&q=80",
            "https://images.unsplash.com/photo-1629898495048-bbf3ab7e2c94?auto=format&fit=crop&w=300&q=80",
            "https://images.unsplash.com/photo-1616086749962-d2f6d90fb337?auto=format&fit=crop&w=300&q=80"
        ];

        this.mainContent.innerHTML = \`
            <div class="detail-page fade-in">
                <div class="detail-hero" style="background-image: url('\${shop.image}')">
                    <div class="detail-hero-overlay"></div>
                    <div class="detail-hero-content">
                        <div style="display: flex; gap: 0.5rem; margin-bottom: 1rem;">
                            \${shop.badges.map(b => \`<span class="badge">\${b}</span>\`).join('')}
                        </div>
                        <h1 style="font-size: 3rem;">\${shop.name}</h1>
                        <p><i class="ri-map-pin-2-line"></i> \${shop.location} • <i class="ri-star-fill" style="color:#FBBF24;"></i> \${shop.rating} (\${shop.reviews}개의 리뷰)</p>
                    </div>
                </div>

                <div class="detail-container">
                    <div class="detail-main">
                        <section class="detail-section">
                            <h2>샵 소개</h2>
                            <p style="color: var(--text-primary); font-size: 1.1rem; line-height: 1.8;">
                                안녕하세요! <b>\${shop.name}</b>입니다.<br>
                                저희는 반려견의 스트레스를 최소화하는 긍정 미용을 지향합니다.<br>
                                오직 가위컷만을 전문으로 하는 수석 디자이너가 1:1 맞춤 케어를 진행합니다.
                            </p>
                            <div class="shop-tags" style="margin-top: 1.5rem;">
                                \${shop.tags.map(tag => \`<span class="tag" style="background: rgba(123, 97, 255, 0.1); color: var(--primary-color);">#\${tag}</span>\`).join('')}
                            </div>
                        </section>

                        <section class="detail-section">
                            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; border-bottom: 1px solid var(--border-color); padding-bottom: 1rem;">
                                <h2 style="border: none; margin: 0; padding: 0;">포트폴리오</h2>
                                <a href="#" style="color: var(--primary-color); font-weight: 600;">전체보기 <i class="ri-arrow-right-line"></i></a>
                            </div>
                            <div class="portfolio-grid">
                                \${portfolioUrls.map(url => \`
                                    <div class="portfolio-item" style="background-image: url('\${url}')"></div>
                                \`).join('')}
                            </div>
                        </section>

                        <section class="detail-section">
                            <h2>시술 메뉴 및 가격</h2>
                            <ul style="list-style: none;">
                                <li style="display: flex; justify-content: space-between; padding: 1rem 0; border-bottom: 1px dashed var(--border-color);">
                                    <div>
                                        <strong>소형견 기본 목욕</strong>
                                        <p style="font-size: 0.9rem; margin-top: 0.25rem;">위생미용 포함, 10kg 미만</p>
                                    </div>
                                    <span style="font-weight: 600;">35,000원</span>
                                </li>
                                <li style="display: flex; justify-content: space-between; padding: 1rem 0; border-bottom: 1px dashed var(--border-color);">
                                    <div>
                                        <strong>전체 가위컷 (푸들 / 비숑)</strong>
                                        <p style="font-size: 0.9rem; margin-top: 0.25rem;">프리미엄 샴푸, 스파 포함</p>
                                    </div>
                                    <span style="font-weight: 600;">\${shop.price}원</span>
                                </li>
                                <li style="display: flex; justify-content: space-between; padding: 1rem 0;">
                                    <div>
                                        <strong>스포팅 (가위컷 + 클리핑)</strong>
                                        <p style="font-size: 0.9rem; margin-top: 0.25rem;">몸은 클리핑, 다리는 가위컷</p>
                                    </div>
                                    <span style="font-weight: 600;">55,000원</span>
                                </li>
                            </ul>
                            <div style="margin-top: 1.5rem; padding: 1rem; background: #fff5f5; border-radius: var(--radius-sm); color: #e53e3e; font-size: 0.9rem;">
                                * 몸무게, 엉킴 정도, 사나움에 따라 추가 비용이 발생할 수 있습니다.
                            </div>
                        </section>
                    </div>

                    <aside>
                        <div class="reservation-card">
                            <h3 style="margin-bottom: 0.5rem; color: var(--text-secondary); font-size: 1rem;">예상 시술 시작가</h3>
                            <div class="price">\${shop.price}원~</div>
                            
                            <div style="margin-bottom: 1.5rem;">
                                <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                                    <span>영업 시간</span>
                                    <strong>10:00 - 20:00 (화 휴무)</strong>
                                </div>
                                <div style="display: flex; justify-content: space-between;">
                                    <span>연락처</span>
                                    <strong>02-1234-5678</strong>
                                </div>
                            </div>
                            
                            <button class="btn-primary" onclick="alert('예약 화면으로 이동합니다.')">
                                <i class="ri-calendar-event-line"></i> 실시간 스케줄 예약
                            </button>
                            <button class="btn-primary" style="background: transparent; border: 1px solid var(--primary-color); color: var(--primary-color); margin-top: 0.5rem;">
                                <i class="ri-message-3-line"></i> 1:1 상담하기
                            </button>
                        </div>
                    </aside>
                </div>
            </div>
        \`;
    }
}

// Initialize the app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.app = new App();
});
