document.addEventListener("DOMContentLoaded", () => {
    
    // =========================================
    // 1. THEME ENGINE SETTINGS
    // =========================================
    // Choose "1", "2", "3", or "1,2,3" for a random selection!
    const developerTheme = "1"; 
    
    function applyTheme(setting) {
        let selectedTheme;
        if (setting.includes(",")) {
            // Pick a random theme from the list
            const themes = setting.split(",");
            selectedTheme = themes[Math.floor(Math.random() * themes.length)].trim();
        } else {
            // Apply specific chosen theme
            selectedTheme = setting.trim();
        }
        
        // Add the theme class to the body (Theme 1 is default, no class needed)
        if(selectedTheme !== "1") {
            document.body.classList.add(`theme-${selectedTheme}`);
        }
        console.log(`Currently loaded: Theme ${selectedTheme}`);
    }
    
    // Initialize Theme
    applyTheme(developerTheme);


    // =========================================
    // 2. Promotional Pop-up Modal Logic
    // =========================================
    const modal = document.getElementById("promo-modal");
    const closeBtn = document.querySelector(".close-btn");
    const reviewBtn = document.getElementById("review-btn");
    const rewardMsg = document.getElementById("reward-message");

    // Show modal after 3 seconds
    setTimeout(() => {
        if(modal) modal.style.display = "flex";
    }, 3000);

    if(closeBtn) {
        closeBtn.addEventListener("click", () => {
            modal.style.display = "none";
        });
    }

    if(reviewBtn) {
        reviewBtn.addEventListener("click", (e) => {
            e.preventDefault();
            window.open("https://maps.app.goo.gl/npVVAFGoE6f2KnGDA", "_blank");
            reviewBtn.style.display = "none";
            rewardMsg.style.display = "block";
        });
    }

    window.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });

    // =========================================
    // 3. Scroll Animations (Transition Graphics)
    // =========================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll(".animate-on-scroll");
    animatedElements.forEach(el => observer.observe(el));


    // =========================================
    // 4. Draggable & Auto-scrolling Gallery
    // =========================================
    const track = document.getElementById('gallery-track');
    
    if(track) {
        let isDown = false;
        let startX;
        let scrollLeft;
        let autoScrollInterval;

        // Function to handle the automatic sliding
        function startAutoScroll() {
            autoScrollInterval = setInterval(() => {
                track.scrollLeft += 1;
                
                // If scrolled halfway, snap back to 0 for infinite loop illusion
                if(track.scrollLeft >= track.scrollWidth / 2) {
                    track.scrollLeft = 0;
                }
            }, 15); // Speed of auto-scroll
        }

        function stopAutoScroll() {
            clearInterval(autoScrollInterval);
        }

        // Start auto-scrolling immediately
        startAutoScroll();

        // Mouse events for manual dragging
        track.addEventListener('mousedown', (e) => {
            isDown = true;
            stopAutoScroll(); // Pause automatic scrolling when dragged
            startX = e.pageX - track.offsetLeft;
            scrollLeft = track.scrollLeft;
        });

        track.addEventListener('mouseleave', () => {
            if(isDown) {
                isDown = false;
                startAutoScroll(); // Resume if mouse leaves area
            }
        });

        track.addEventListener('mouseup', () => {
            isDown = false;
            startAutoScroll(); // Resume when mouse click is released
        });

        track.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - track.offsetLeft;
            const walk = (x - startX) * 2; // Scroll speed multiplier when dragging
            track.scrollLeft = scrollLeft - walk;
        });
    }
});
