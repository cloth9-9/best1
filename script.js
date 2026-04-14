document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Promotional Pop-up Modal Logic
    const modal = document.getElementById("promo-modal");
    const closeBtn = document.querySelector(".close-btn");
    const reviewBtn = document.getElementById("review-btn");
    const rewardMsg = document.getElementById("reward-message");

    // Show the modal 3 seconds after the website loads
    setTimeout(() => {
        modal.style.display = "flex";
    }, 3000);

    // Close button logic (Cross on the right)
    closeBtn.addEventListener("click", () => {
        modal.style.display = "none";
    });

    // When the customer clicks "Leave a Review"
    reviewBtn.addEventListener("click", (e) => {
        e.preventDefault(); // Prevents the page from jumping
        
        // Opens your direct review link in a new tab
        window.open("https://maps.app.goo.gl/npVVAFGoE6f2KnGDA", "_blank");
        
        // Hide the button and show the pending message
        reviewBtn.style.display = "none";
        rewardMsg.style.display = "block";
    });

    // Close modal if user clicks outside of the modal box
    window.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });

    // 2. Scroll Animations (Transition Graphics)
    const observerOptions = {
        threshold: 0.1, // Trigger when 10% of the element is visible
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target); // Animate only once
            }
        });
    }, observerOptions);

    // Grab all elements with the "animate-on-scroll" class and watch them
    const animatedElements = document.querySelectorAll(".animate-on-scroll");
    animatedElements.forEach(el => observer.observe(el));
});
