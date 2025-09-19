// Products Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeProductFilters();
    initializeBackToTop();
    initializeNewsletterForm();
});

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

// Product Filters
function initializeProductFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;

            // Filter products with animation
            productCards.forEach(card => {
                const category = card.dataset.category;

                if (filter === 'all' || category === filter) {
                    card.classList.remove('hide');
                    setTimeout(() => {
                        card.style.display = 'block';
                        card.style.animation = 'fadeInUp 0.6s ease';
                    }, 100);
                } else {
                    card.classList.add('hide');
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Footer category links
    const footerCategoryLinks = document.querySelectorAll('.footer-section a[data-filter]');
    footerCategoryLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const filter = link.dataset.filter;

            // Trigger the filter button click
            filterBtns.forEach(btn => {
                if (btn.dataset.filter === filter) {
                    btn.click();
                }
            });

            // Scroll to products section
            document.querySelector('.products-section').scrollIntoView({ behavior: 'smooth' });
        });
    });
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

// Newsletter Form
function initializeNewsletterForm() {
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = newsletterForm.querySelector('input[type="email"]').value;
            alert(`Thank you for subscribing with email: ${email}`);
            newsletterForm.reset();
        });
    }
}

// Product data with detailed information
const productsData = {
    'Sony WH-1000XM6': {
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600',
        price: '$449',
        rating: 4.8,
        description: 'The Sony WH-1000XM6 represents the pinnacle of noise-canceling headphone technology. With industry-leading active noise cancellation, exceptional voice clarity, and premium comfort, these headphones are perfect for professionals and audiophiles alike.',
        features: [
            { icon: 'fa-battery-full', text: '40-hour battery life' },
            { icon: 'fa-microphone', text: 'Voice Prism technology' },
            { icon: 'fa-volume-up', text: 'Hi-Res Audio certified' },
            { icon: 'fa-wifi', text: 'Multipoint connectivity' },
            { icon: 'fa-headphones', text: 'Adaptive sound control' },
            { icon: 'fa-magic', text: 'LDAC codec support' }
        ],
        specs: [
            { label: 'Driver Size', value: '40mm' },
            { label: 'Frequency Response', value: '4Hz - 40,000Hz' },
            { label: 'Impedance', value: '48 Ω (1 kHz)' },
            { label: 'Weight', value: '254g' },
            { label: 'Bluetooth', value: '5.2 with multipoint' },
            { label: 'Charging', value: 'USB-C, 3hr full charge' }
        ]
    },
    'Apple AirPods Pro 3': {
        image: 'https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?w=600',
        price: '$299',
        rating: 4.9,
        description: 'Apple AirPods Pro 3 deliver exceptional sound quality with advanced noise cancellation and transparency modes. The H2 chip provides computational audio for a personalized listening experience with Spatial Audio support.',
        features: [
            { icon: 'fa-microphone-alt', text: 'Voice Isolation Pro' },
            { icon: 'fa-cube', text: 'Spatial Audio with head tracking' },
            { icon: 'fa-chip', text: 'H2 chip processing' },
            { icon: 'fa-water', text: 'IPX4 water resistance' },
            { icon: 'fa-battery-three-quarters', text: '7hr listening time' },
            { icon: 'fa-mobile-alt', text: 'Seamless iOS integration' }
        ],
        specs: [
            { label: 'Chip', value: 'Apple H2' },
            { label: 'Battery (buds)', value: '7 hours ANC on' },
            { label: 'Battery (case)', value: '35 hours total' },
            { label: 'Connectivity', value: 'Bluetooth 5.3' },
            { label: 'Charging', value: 'USB-C, Qi2 wireless' },
            { label: 'Water Resistance', value: 'IPX4' }
        ]
    },
    'Bose QuietComfort Ultra': {
        image: 'https://images.unsplash.com/photo-1545127398-14699f92334b?w=600',
        price: '$429',
        rating: 4.7,
        description: 'Bose QuietComfort Ultra headphones combine legendary comfort with cutting-edge noise cancellation. CustomTune technology personalizes the audio experience while Immersive Audio creates a spacious soundstage.',
        features: [
            { icon: 'fa-sliders-h', text: 'CustomTune calibration' },
            { icon: 'fa-moon', text: 'World-class ANC' },
            { icon: 'fa-clock', text: '32-hour battery' },
            { icon: 'fa-globe', text: 'Immersive Audio' },
            { icon: 'fa-comments', text: '8-mic voice pickup' },
            { icon: 'fa-couch', text: 'Premium comfort' }
        ],
        specs: [
            { label: 'Driver Size', value: '35mm' },
            { label: 'Battery Life', value: '32 hours with ANC' },
            { label: 'Charging Time', value: '2.5 hours' },
            { label: 'Quick Charge', value: '15 min = 3 hours' },
            { label: 'Weight', value: '250g' },
            { label: 'Bluetooth', value: '5.3' }
        ]
    },
    'Amazon Echo Studio': {
        image: 'https://images.unsplash.com/photo-1543512214-318c7553f230?w=600',
        price: '$199',
        rating: 4.6,
        description: 'Echo Studio delivers immersive, high-fidelity sound with 5 directional speakers. Features Dolby Atmos processing and 3D audio for a theater-like experience, plus built-in Alexa for voice control.',
        features: [
            { icon: 'fa-home', text: 'Smart home hub' },
            { icon: 'fa-music', text: 'Dolby Atmos 3D audio' },
            { icon: 'fa-microphone', text: 'Far-field voice recognition' },
            { icon: 'fa-broadcast-tower', text: 'Zigbee hub built-in' },
            { icon: 'fa-volume-up', text: '330W peak power' },
            { icon: 'fa-sync', text: 'Room adaptation' }
        ],
        specs: [
            { label: 'Speakers', value: '5 (3 midrange, 1 tweeter, 1 woofer)' },
            { label: 'Max Output', value: '330W' },
            { label: 'Frequency Range', value: '30Hz - 24kHz' },
            { label: 'Connectivity', value: 'Wi-Fi, Bluetooth, 3.5mm' },
            { label: 'Dimensions', value: '206 x 175mm' },
            { label: 'Weight', value: '3.5kg' }
        ]
    },
    'Google Nest Audio': {
        image: 'https://images.unsplash.com/photo-1589003077984-894e133dabab?w=600',
        price: '$99',
        rating: 4.3,
        description: 'Google Nest Audio delivers rich, full sound that fills the room. With Google Assistant built-in, control your smart home, get answers, and play music using just your voice.',
        features: [
            { icon: 'fa-assistant', text: 'Google Assistant built-in' },
            { icon: 'fa-eq', text: 'Room EQ tuning' },
            { icon: 'fa-link', text: 'Multi-room audio' },
            { icon: 'fa-recycle', text: 'Recycled materials' },
            { icon: 'fa-shield-alt', text: 'Privacy controls' },
            { icon: 'fa-music', text: 'Stream from 30+ services' }
        ],
        specs: [
            { label: 'Woofer', value: '75mm' },
            { label: 'Tweeter', value: '19mm' },
            { label: 'Connectivity', value: 'Wi-Fi, Bluetooth 5.0' },
            { label: 'Processor', value: 'Quad-core A53 1.8GHz' },
            { label: 'Dimensions', value: '175 x 124 x 78mm' },
            { label: 'Weight', value: '1.2kg' }
        ]
    },
    'Blue Yeti X': {
        image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=600',
        price: '$169',
        rating: 4.8,
        description: 'Blue Yeti X is a professional USB microphone designed for gaming, streaming, and podcasting. Features real-time LED metering, Blue VO!CE effects, and four pickup patterns for versatile recording.',
        features: [
            { icon: 'fa-microphone', text: '4 pickup patterns' },
            { icon: 'fa-tachometer-alt', text: 'LED level meter' },
            { icon: 'fa-magic', text: 'Blue VO!CE effects' },
            { icon: 'fa-headphones', text: 'Zero-latency monitoring' },
            { icon: 'fa-desktop', text: 'USB plug-and-play' },
            { icon: 'fa-cog', text: 'Smart knob control' }
        ],
        specs: [
            { label: 'Capsules', value: '4 Blue-proprietary 14mm' },
            { label: 'Polar Patterns', value: 'Cardioid, Omni, Bidirectional, Stereo' },
            { label: 'Frequency Response', value: '20Hz - 20kHz' },
            { label: 'Sample Rate', value: '48kHz' },
            { label: 'Bit Rate', value: '24-bit' },
            { label: 'Max SPL', value: '122dB' }
        ]
    },
    'Shure MV7': {
        image: 'https://images.unsplash.com/photo-1589903308904-1010c2294adc?w=600',
        price: '$279',
        rating: 4.7,
        description: 'Inspired by the legendary SM7B, the Shure MV7 is a dynamic microphone with both USB and XLR outputs. Perfect for podcasting and vocal recording with touch panel controls.',
        features: [
            { icon: 'fa-exchange-alt', text: 'USB & XLR outputs' },
            { icon: 'fa-hand-pointer', text: 'Touch panel controls' },
            { icon: 'fa-mobile', text: 'ShurePlus MOTIV app' },
            { icon: 'fa-microphone-slash', text: 'Built-in pop filter' },
            { icon: 'fa-headphones', text: 'Direct monitoring' },
            { icon: 'fa-shield-alt', text: 'All-metal construction' }
        ],
        specs: [
            { label: 'Type', value: 'Dynamic' },
            { label: 'Polar Pattern', value: 'Unidirectional (Cardioid)' },
            { label: 'Frequency Response', value: '50Hz - 16kHz' },
            { label: 'Sensitivity', value: '-55 dBV/Pa' },
            { label: 'Output', value: 'USB & XLR' },
            { label: 'Weight', value: '550g' }
        ]
    },
    'InnoGear Boom Arm': {
        image: 'https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?w=600',
        price: '$39',
        rating: 4.2,
        description: 'Professional-grade adjustable boom arm for microphones. Features heavy-duty construction, 360-degree rotation, and internal cable management for a clean desk setup.',
        features: [
            { icon: 'fa-arrows-alt', text: '360° full rotation' },
            { icon: 'fa-weight-hanging', text: 'Heavy-duty springs' },
            { icon: 'fa-plug', text: 'Universal compatibility' },
            { icon: 'fa-bezier-curve', text: 'Cable management' },
            { icon: 'fa-lock', text: 'Secure desk clamp' },
            { icon: 'fa-tools', text: 'Tool-free adjustment' }
        ],
        specs: [
            { label: 'Max Load', value: '2.2 lbs (1kg)' },
            { label: 'Reach', value: '31.5 inches' },
            { label: 'Clamp Opening', value: 'Up to 2.36 inches' },
            { label: 'Thread Size', value: '3/8" to 5/8" adapter' },
            { label: 'Material', value: 'Steel construction' },
            { label: 'Weight', value: '2.8 lbs' }
        ]
    }
};

// Show product modal
function showProductModal(productName) {
    const modal = document.getElementById('productModal');
    const product = productsData[productName];

    if (!product) return;

    // Set basic info
    document.getElementById('modalTitle').textContent = productName;
    document.getElementById('modalImage').src = product.image;
    document.getElementById('modalImage').alt = productName;
    document.getElementById('modalPrice').textContent = product.price;
    document.getElementById('modalDescription').textContent = product.description;

    // Set rating
    const ratingHtml = Array(5).fill(0).map((_, i) => {
        if (i < Math.floor(product.rating)) {
            return '<i class="fas fa-star"></i>';
        } else if (i < product.rating) {
            return '<i class="fas fa-star-half-alt"></i>';
        } else {
            return '<i class="far fa-star"></i>';
        }
    }).join('') + ` <span style="margin-left: 0.5rem; color: var(--text-light)">${product.rating}</span>`;
    document.getElementById('modalRating').innerHTML = ratingHtml;

    // Set features
    const featuresHtml = '<div class="feature-grid">' +
        product.features.map(f => `
            <div class="feature-item">
                <i class="fas ${f.icon}"></i>
                <span>${f.text}</span>
            </div>
        `).join('') + '</div>';
    document.getElementById('modalFeatures').innerHTML = featuresHtml;

    // Set specifications
    const specsHtml = product.specs.map(s => `
        <li>
            <strong>${s.label}:</strong>
            <span>${s.value}</span>
        </li>
    `).join('');
    document.getElementById('modalSpecs').innerHTML = specsHtml;

    // Show modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close modal
window.closeProductModal = function() {
    const modal = document.getElementById('productModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// Product Details
document.addEventListener('DOMContentLoaded', () => {
    const productButtons = document.querySelectorAll('.btn-product');

    productButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const productCard = button.closest('.product-card');
            const productTitle = productCard.querySelector('.product-title').textContent;
            showProductModal(productTitle);
        });
    });

    // Close modal on background click
    const modal = document.getElementById('productModal');
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeProductModal();
            }
        });
    }

    // Close modal on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeProductModal();
        }
    });

    // Buy Now and Wishlist buttons
    document.querySelector('.btn-buy')?.addEventListener('click', () => {
        alert('This would redirect to the purchase page or add item to cart.');
    });

    document.querySelector('.btn-wishlist')?.addEventListener('click', (e) => {
        const icon = e.currentTarget.querySelector('i');
        if (icon.classList.contains('far')) {
            icon.classList.remove('far');
            icon.classList.add('fas');
            e.currentTarget.innerHTML = '<i class="fas fa-heart"></i> Added to Wishlist';
        } else {
            icon.classList.remove('fas');
            icon.classList.add('far');
            e.currentTarget.innerHTML = '<i class="far fa-heart"></i> Add to Wishlist';
        }
    });
});

// Add entrance animation for products
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

// Observe product cards
document.addEventListener('DOMContentLoaded', () => {
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        observer.observe(card);
    });
});