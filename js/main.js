// Main JavaScript file
let currentSlide = 0;
let currentPage = 1;
const articlesPerPage = 6;
let filteredArticles = [...blogArticles];
let currentCategory = 'all';

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeBanner();
    initializeBlog();
    initializeBackToTop();
    initializeSocialWidget();
    sortArticlesByDate();
});

// Sort articles by date (newest first)
function sortArticlesByDate() {
    blogArticles.sort((a, b) => new Date(b.date) - new Date(a.date));
    filteredArticles = [...blogArticles];
}

// Navigation
function initializeNavigation() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
            }
        });
    }
}

// Banner Slider
function initializeBanner() {
    const slides = document.querySelectorAll('.banner-slide');
    const dots = document.querySelectorAll('.dot');

    setInterval(() => {
        changeSlide(1);
    }, 5000);
}

window.changeSlide = function(direction) {
    const slides = document.querySelectorAll('.banner-slide');
    const dots = document.querySelectorAll('.dot');

    if (slides.length === 0) return;

    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');

    currentSlide = (currentSlide + direction + slides.length) % slides.length;

    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

window.currentSlide = function(n) {
    const slides = document.querySelectorAll('.banner-slide');
    const dots = document.querySelectorAll('.dot');

    if (slides.length === 0) return;

    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');

    currentSlide = n - 1;

    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

// Blog Functions
function initializeBlog() {
    renderBlogCards();
    initializeSearch();
    initializeFilters();
    initializePagination();
}

function renderBlogCards() {
    const blogGrid = document.getElementById('blogGrid');
    if (!blogGrid) return;

    const start = (currentPage - 1) * articlesPerPage;
    const end = start + articlesPerPage;
    const pageArticles = filteredArticles.slice(start, end);

    blogGrid.innerHTML = pageArticles.map(article => `
        <article class="blog-card" onclick="openArticle(${article.id})">
            <div class="blog-card-image">
                <img src="${article.image}" alt="${article.title}" loading="lazy">
                <span class="blog-category">${formatCategory(article.category)}</span>
            </div>
            <div class="blog-card-content">
                <div class="blog-date">
                    <i class="far fa-calendar"></i>
                    ${formatDate(article.date)}
                </div>
                <h3 class="blog-title">${article.title}</h3>
                <p class="blog-excerpt">${article.excerpt}</p>
                <div class="blog-meta">
                    <div class="blog-author">
                        <i class="far fa-user"></i>
                        ${article.author}
                    </div>
                    <a href="#" class="read-more" onclick="event.stopPropagation(); openArticle(${article.id})">
                        Read More
                        <i class="fas fa-arrow-right"></i>
                    </a>
                </div>
            </div>
        </article>
    `).join('');

    updatePagination();
}

function formatCategory(category) {
    const categoryNames = {
        'product-review': 'Product Review',
        'platform': 'Platform',
        'technology': 'Technology',
        'guide': 'Guide'
    };
    return categoryNames[category] || category;
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

// Search
function initializeSearch() {
    const searchInput = document.getElementById('searchInput');
    if (!searchInput) return;

    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();

        if (searchTerm === '') {
            filteredArticles = currentCategory === 'all'
                ? [...blogArticles]
                : blogArticles.filter(article => article.category === currentCategory);
        } else {
            filteredArticles = blogArticles.filter(article => {
                const matchesSearch = article.title.toLowerCase().includes(searchTerm) ||
                                     article.excerpt.toLowerCase().includes(searchTerm);
                const matchesCategory = currentCategory === 'all' || article.category === currentCategory;
                return matchesSearch && matchesCategory;
            });
        }

        currentPage = 1;
        renderBlogCards();
    });
}

// Filters
function initializeFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            currentCategory = btn.dataset.category;

            if (currentCategory === 'all') {
                filteredArticles = [...blogArticles];
            } else {
                filteredArticles = blogArticles.filter(article => article.category === currentCategory);
            }

            currentPage = 1;
            renderBlogCards();
        });
    });

    // Category links in footer
    const categoryLinks = document.querySelectorAll('.category-link');
    categoryLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const category = link.dataset.cat;

            // Update filter buttons
            filterBtns.forEach(btn => {
                btn.classList.remove('active');
                if (btn.dataset.category === category) {
                    btn.classList.add('active');
                }
            });

            currentCategory = category;
            filteredArticles = blogArticles.filter(article => article.category === currentCategory);
            currentPage = 1;
            renderBlogCards();

            // Scroll to blog section
            document.getElementById('blog').scrollIntoView({ behavior: 'smooth' });
        });
    });
}

// Pagination
function initializePagination() {
    const prevBtn = document.getElementById('prevPage');
    const nextBtn = document.getElementById('nextPage');

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                renderBlogCards();
                scrollToBlogSection();
            }
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);
            if (currentPage < totalPages) {
                currentPage++;
                renderBlogCards();
                scrollToBlogSection();
            }
        });
    }
}

function updatePagination() {
    const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);
    const pageNumbers = document.getElementById('pageNumbers');
    const prevBtn = document.getElementById('prevPage');
    const nextBtn = document.getElementById('nextPage');

    if (pageNumbers) {
        pageNumbers.innerHTML = '';

        for (let i = 1; i <= totalPages; i++) {
            const pageBtn = document.createElement('button');
            pageBtn.className = 'page-number';
            pageBtn.textContent = i;
            if (i === currentPage) {
                pageBtn.classList.add('active');
            }
            pageBtn.addEventListener('click', () => {
                currentPage = i;
                renderBlogCards();
                scrollToBlogSection();
            });
            pageNumbers.appendChild(pageBtn);
        }
    }

    if (prevBtn) {
        prevBtn.disabled = currentPage === 1;
    }

    if (nextBtn) {
        nextBtn.disabled = currentPage === totalPages || totalPages === 0;
    }
}

function scrollToBlogSection() {
    const blogSection = document.getElementById('blog');
    if (blogSection) {
        blogSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Back to Top
function initializeBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');

    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Social Widget Animation
function initializeSocialWidget() {
    const socialLinks = document.querySelectorAll('.social-link');

    socialLinks.forEach((link, index) => {
        link.style.animationDelay = `${index * 0.1}s`;
        link.style.animation = 'fadeInLeft 0.5s ease forwards';
    });
}

// Open Article
function openArticle(articleId) {
    const article = blogArticles.find(a => a.id === articleId);
    if (article) {
        localStorage.setItem('currentArticle', JSON.stringify(article));
        window.location.href = 'article.html';
    }
}

// Newsletter Form
document.addEventListener('DOMContentLoaded', () => {
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = newsletterForm.querySelector('input[type="email"]').value;
            alert(`Thank you for subscribing with email: ${email}`);
            newsletterForm.reset();
        });
    }
});

// Add fade in animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
        }
    });
}, observerOptions);

// Observe blog cards as they're created
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        document.querySelectorAll('.blog-card').forEach(card => {
            observer.observe(card);
        });
    }, 100);
});