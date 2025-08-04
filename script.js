// Your API key is: 1f0ef25771d74023a3118716b153dfc3

const API_KEY = "1f0ef25771d74023a3118716b153dfc3";
const url = "https://newsapi.org/v2/everything?q=";

// Fallback news data in case API fails
const fallbackNews = [
    {
        title: "Breaking: Major Tech Breakthrough Announced",
        description: "Scientists discover revolutionary quantum computing method that could transform the industry.",
        urlToImage: "https://picsum.photos/400/200?random=10",
        url: "https://example.com/tech-breakthrough",
        source: { name: "Tech News" },
        publishedAt: new Date().toISOString()
    },
    {
        title: "Global Markets Reach New Heights",
        description: "Stock markets worldwide achieve record-breaking performance as economic recovery continues.",
        urlToImage: "https://picsum.photos/400/200?random=11",
        url: "https://example.com/markets-news",
        source: { name: "Finance Daily" },
        publishedAt: new Date().toISOString()
    },
    {
        title: "Sports: Championship Finals Set",
        description: "Top teams prepare for the most anticipated championship match of the season.",
        urlToImage: "https://picsum.photos/400/200?random=12",
        url: "https://example.com/sports-news",
        source: { name: "Sports Central" },
        publishedAt: new Date().toISOString()
    },
    {
        title: "Environmental Initiative Launched",
        description: "Global leaders announce comprehensive plan to combat climate change.",
        urlToImage: "https://picsum.photos/400/200?random=13",
        url: "https://example.com/environment-news",
        source: { name: "Green News" },
        publishedAt: new Date().toISOString()
    },
    {
        title: "Entertainment: Blockbuster Movie Release",
        description: "Highly anticipated film breaks box office records on opening weekend.",
        urlToImage: "https://picsum.photos/400/200?random=14",
        url: "https://example.com/entertainment-news",
        source: { name: "Entertainment Weekly" },
        publishedAt: new Date().toISOString()
    },
    {
        title: "Health: Medical Breakthrough Announced",
        description: "Researchers develop new treatment method showing promising results in clinical trials.",
        urlToImage: "https://picsum.photos/400/200?random=15",
        url: "https://example.com/health-news",
        source: { name: "Health Today" },
        publishedAt: new Date().toISOString()
    }
];

window.addEventListener("load", () => fetchNews("India"));

function reload() {
    window.location.reload();
}

async function fetchNews(query) {
    try {
        console.log("Fetching news for:", query);
        const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
        
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        
        const data = await res.json();
        
        if (data.articles && data.articles.length > 0) {
            console.log("API news loaded successfully:", data.articles.length, "articles");
            bindData(data.articles);
        } else {
            console.log("No articles from API, using fallback data");
            bindData(fallbackNews);
        }
    } catch (error) {
        console.error("Error fetching news from API:", error);
        console.log("Using fallback news data");
        bindData(fallbackNews);
    }
}

function bindData(articles) {
    const cardsContainer = document.getElementById("cards-container");
    const newsCardTemplate = document.getElementById("template-news-card");
    const adCardTemplate = document.getElementById("template-ad-card");

    if (!cardsContainer || !newsCardTemplate || !adCardTemplate) {
        console.error("Required elements not found");
        return;
    }

    cardsContainer.innerHTML = "";

    articles.forEach((article, index) => {
        if (!article.urlToImage) {
            // Use fallback image if none provided
            article.urlToImage = `https://picsum.photos/400/200?random=${index + 20}`;
        }
        
        // Add news card
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
        
        // Add ad card after every news article (1:1 ratio for maximum revenue)
        const adClone = adCardTemplate.content.cloneNode(true);
        fillDataInAdCard(adClone, index);
        cardsContainer.appendChild(adClone);
    });
    
    console.log("Content loaded successfully:", articles.length, "news articles with ads");
}

function fillDataInCard(cardClone, article) {
    const newsImg = cardClone.querySelector("#news-img");
    const newsTitle = cardClone.querySelector("#news-title");
    const newsSource = cardClone.querySelector("#news-source");
    const newsDesc = cardClone.querySelector("#news-desc");

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta",
    });

    newsSource.innerHTML = `${article.source.name} · ${date}`;

    // Add error handling for news images
    newsImg.onerror = function() {
        console.log(`News image failed to load: ${article.title}`);
        this.src = `https://picsum.photos/400/200?random=${Math.floor(Math.random() * 1000)}`;
    };

    cardClone.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_blank");
    });
}

function fillDataInAdCard(adClone, adIndex) {
    const adButton = adClone.querySelector(".ad-button");
    const adTitle = adClone.querySelector(".ad-title");
    const adDescription = adClone.querySelector(".ad-description");
    const adImage = adClone.querySelector(".ad-image");
    
    // Extended ad data for maximum revenue - more ad variations
    const ads = [
        {
            title: "🔥 HOT DEAL: 70% Off Electronics",
            description: "Limited time offer! Get premium gadgets at unbeatable prices. Don't miss out!",
            url: "https://example.com/electronics-deal",
            image: "https://picsum.photos/400/200?random=1"
        },
        {
            title: "💰 Earn Money Online - $500/Day",
            description: "Join thousands earning passive income. Start your journey to financial freedom today!",
            url: "https://example.com/earn-money",
            image: "https://picsum.photos/400/200?random=2"
        },
        {
            title: "🎯 Premium News Access - 50% Off",
            description: "Unlock exclusive content and breaking news alerts. Subscribe now for special price!",
            url: "https://example.com/premium-news",
            image: "https://picsum.photos/400/200?random=3"
        },
        {
            title: "✈️ Travel Deals - Save 60%",
            description: "Book your dream vacation at incredible discounts. Limited seats available!",
            url: "https://example.com/travel-deals",
            image: "https://picsum.photos/400/200?random=4"
        },
        {
            title: "💳 Credit Card Rewards - $200 Bonus",
            description: "Get instant approval and earn massive rewards. Apply now for exclusive benefits!",
            url: "https://example.com/credit-card",
            image: "https://picsum.photos/400/200?random=5"
        },
        {
            title: "🏠 Real Estate Investment - 15% ROI",
            description: "Invest in profitable properties. Guaranteed returns and passive income!",
            url: "https://example.com/real-estate",
            image: "https://picsum.photos/400/200?random=6"
        },
        {
            title: "💊 Health Supplements - Buy 1 Get 2 Free",
            description: "Boost your immunity and energy. Premium quality supplements at amazing prices!",
            url: "https://example.com/health-supplements",
            image: "https://picsum.photos/400/200?random=7"
        },
        {
            title: "📱 Latest iPhone - 0% Interest",
            description: "Get the newest iPhone with no down payment. Easy monthly installments!",
            url: "https://example.com/iphone-deal",
            image: "https://picsum.photos/400/200?random=8"
        },
        {
            title: "🎓 Online Courses - 90% Off",
            description: "Learn high-income skills. Master coding, marketing, and business online!",
            url: "https://example.com/online-courses",
            image: "https://picsum.photos/400/200?random=9"
        },
        {
            title: "🚗 Car Insurance - Save $500/Year",
            description: "Compare rates and save big on auto insurance. Get your free quote now!",
            url: "https://example.com/car-insurance",
            image: "https://picsum.photos/400/200?random=10"
        }
    ];
    
    // Get ad content based on index
    const adContent = ads[adIndex % ads.length];
    
    // Update ad content
    adTitle.textContent = adContent.title;
    adDescription.textContent = adContent.description;
    adImage.src = adContent.image;
    adImage.alt = adContent.title;
    
    // Enhanced error handling for images with multiple fallbacks
    adImage.onerror = function() {
        console.log(`Image failed to load for ad: ${adContent.title}`);
        
        // Try multiple fallback options
        const fallbackImages = [
            `https://picsum.photos/400/200?random=${adIndex + 100}`,
            `https://source.unsplash.com/400x200/?${encodeURIComponent(adContent.title.split(' ')[0])}`,
            `https://dummyimage.com/400x200/ff6b6b/ffffff&text=HOT+DEAL`,
            `data:image/svg+xml;base64,${btoa(`
                <svg width="400" height="200" xmlns="http://www.w3.org/2000/svg">
                    <rect width="400" height="200" fill="#ff6b6b"/>
                    <text x="200" y="100" font-family="Arial, sans-serif" font-size="24" fill="white" text-anchor="middle" dominant-baseline="middle">HOT DEAL</text>
                </svg>
            `)}`
        ];
        
        let fallbackIndex = 0;
        
        const tryNextFallback = () => {
            if (fallbackIndex < fallbackImages.length) {
                this.src = fallbackImages[fallbackIndex];
                fallbackIndex++;
            } else {
                // If all fallbacks fail, create a colored div as final fallback
                this.style.display = 'none';
                const fallbackDiv = document.createElement('div');
                fallbackDiv.style.cssText = `
                    width: 100%;
                    height: 180px;
                    background: linear-gradient(45deg, #ff6b6b, #ff5252);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    font-family: Arial, sans-serif;
                    font-size: 18px;
                    font-weight: bold;
                    text-align: center;
                `;
                fallbackDiv.textContent = '🔥 HOT DEAL 🔥';
                this.parentNode.insertBefore(fallbackDiv, this);
            }
        };
        
        this.onerror = tryNextFallback;
        tryNextFallback();
    };
    
    // Add click event for ad card
    adClone.firstElementChild.addEventListener("click", () => {
        console.log(`Ad ${adIndex + 1} clicked: ${adContent.title}`);
        // Track ad click for revenue monitoring
        trackAdClick(adIndex + 1, adContent.title);
        // Open ad URL in new tab
        window.open(adContent.url, "_blank");
    });
    
    adButton.addEventListener("click", (e) => {
        e.stopPropagation(); // Prevent triggering the card click
        console.log(`Ad ${adIndex + 1} button clicked: ${adContent.title}`);
        // Track button click for revenue monitoring
        trackAdClick(adIndex + 1, adContent.title, "button");
        // Open ad URL in new tab
        window.open(adContent.url, "_blank");
    });
}

// Enhanced function to track ad interactions for revenue optimization
function trackAdClick(adIndex, adTitle, type = "card") {
    // Enhanced tracking for revenue optimization
    const adData = {
        adIndex: adIndex,
        adTitle: adTitle,
        clickType: type,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        pageURL: window.location.href,
        referrer: document.referrer,
        revenue: type === "button" ? 2.5 : 1.5 // Button clicks worth more
    };
    
    console.log("💰 Ad Revenue Click Tracked:", adData);
    
    // Track revenue metrics
    if (typeof gtag !== 'undefined') {
        gtag('event', 'ad_click', {
            'ad_title': adTitle,
            'click_type': type,
            'revenue_value': adData.revenue
        });
    }
    
    // Example: Send to your revenue tracking service
    // fetch('/api/track-revenue', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(adData)
    // });
}

let curSelectedNav = null;
function onNavItemClick(id) {
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = navItem;
    curSelectedNav.classList.add("active");
}

const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");

searchButton.addEventListener("click", () => {
    const query = searchText.value;
    if (!query) return;
    fetchNews(query);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = null;
});

// Footer and Modal Functions
function showContactForm() {
    const modal = document.getElementById("contactModal");
    modal.style.display = "block";
    setupModalClose(modal);
}

function showSupport() {
    const modal = document.getElementById("supportModal");
    modal.style.display = "block";
    setupModalClose(modal);
}

function showFeedback() {
    alert("Thank you for your feedback! We appreciate your input to improve our service.");
}

function showPrivacy() {
    alert("Privacy Policy: We respect your privacy and protect your personal information. For detailed information, please contact our support team.");
}

function showTerms() {
    alert("Terms of Service: By using our News App, you agree to our terms and conditions. For detailed information, please contact our support team.");
}

function showCookies() {
    alert("Cookie Policy: We use cookies to enhance your browsing experience and provide personalized content.");
}

function setupModalClose(modal) {
    const closeBtn = modal.querySelector(".close");
    
    closeBtn.onclick = function() {
        modal.style.display = "none";
    }
    
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}

// Contact Form Submission
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const name = contactForm.querySelector('input[type="text"]').value;
            const email = contactForm.querySelector('input[type="email"]').value;
            const topic = contactForm.querySelector('select').value;
            const message = contactForm.querySelector('textarea').value;
            
            // Simulate form submission
            console.log('Contact Form Submitted:', { name, email, topic, message });
            
            // Show success message
            alert('Thank you for your message! We will get back to you soon.');
            
            // Close modal
            document.getElementById('contactModal').style.display = "none";
            
            // Reset form
            contactForm.reset();
        });
    }
    
    // Newsletter subscription
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        const newsletterButton = newsletterForm.querySelector('.newsletter-button');
        const newsletterInput = newsletterForm.querySelector('.newsletter-input');
        
        newsletterButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            const email = newsletterInput.value;
            if (email && email.includes('@')) {
                console.log('Newsletter Subscription:', email);
                alert('Thank you for subscribing to our newsletter!');
                newsletterInput.value = '';
            } else {
                alert('Please enter a valid email address.');
            }
        });
    }
});