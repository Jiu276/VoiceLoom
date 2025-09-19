// Article Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    loadArticle();
    initializeNavigation();
    initializeBackToTop();
});

// Load article content
function loadArticle() {
    const articleData = JSON.parse(localStorage.getItem('currentArticle'));

    if (!articleData) {
        window.location.href = 'index.html';
        return;
    }

    // Set page title
    document.title = `${articleData.title} - VoiceLoom`;

    // Populate article header
    document.getElementById('articleCategory').textContent = formatCategory(articleData.category);
    document.getElementById('articleDate').textContent = formatDate(articleData.date);
    document.getElementById('articleTitle').textContent = articleData.title;
    document.getElementById('articleAuthor').textContent = articleData.author;
    document.getElementById('articleReadTime').textContent = articleData.readTime;

    // Set article image
    const articleImage = document.getElementById('articleImage');
    articleImage.src = articleData.image;
    articleImage.alt = articleData.title;

    // Set article content
    document.getElementById('articleContent').innerHTML = articleData.content;

    // Load related articles
    loadRelatedArticles(articleData);
}

// Load related articles
function loadRelatedArticles(currentArticle) {
    const relatedGrid = document.getElementById('relatedGrid');

    // Filter articles by same category or similar topic
    let relatedArticles = blogArticles.filter(article =>
        article.id !== currentArticle.id &&
        (article.category === currentArticle.category ||
         article.category === 'technology' ||
         article.category === 'product-review')
    );

    // Limit to 3 related articles
    relatedArticles = relatedArticles.slice(0, 3);

    relatedGrid.innerHTML = relatedArticles.map(article => `
        <div class="related-card" onclick="loadNewArticle(${article.id})">
            <div class="related-card-image">
                <img src="${article.image}" alt="${article.title}" loading="lazy">
            </div>
            <div class="related-card-content">
                <h3 class="related-card-title">${article.title}</h3>
                <div class="related-card-date">
                    <i class="far fa-calendar"></i>
                    ${formatDate(article.date)}
                </div>
            </div>
        </div>
    `).join('');
}

// Load new article
function loadNewArticle(articleId) {
    const article = blogArticles.find(a => a.id === articleId);
    if (article) {
        localStorage.setItem('currentArticle', JSON.stringify(article));
        window.scrollTo(0, 0);
        loadArticle();
    }
}

// Format category name
function formatCategory(category) {
    const categoryNames = {
        'product-review': 'Product Review',
        'platform': 'Platform',
        'technology': 'Technology',
        'guide': 'Guide'
    };
    return categoryNames[category] || category;
}

// Format date
function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
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

// Share functions
function shareOnFacebook() {
    const url = window.location.href;
    const title = document.getElementById('articleTitle').textContent;
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&t=${encodeURIComponent(title)}`, '_blank');
    return false;
}

function shareOnTwitter() {
    const url = window.location.href;
    const title = document.getElementById('articleTitle').textContent;
    window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, '_blank');
    return false;
}

function shareOnLinkedIn() {
    const url = window.location.href;
    const title = document.getElementById('articleTitle').textContent;
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`, '_blank');
    return false;
}

function shareByEmail() {
    const title = document.getElementById('articleTitle').textContent;
    const url = window.location.href;
    window.location.href = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent('Check out this article: ' + url)}`;
    return false;
}

// Newsletter Form
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input[type="email"]').value;
        alert(`Thank you for subscribing with email: ${email}`);
        newsletterForm.reset();
    });
}