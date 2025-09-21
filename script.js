// Global variables
let currentTestimonialIndex = 0;
let activeSection = "home";

// Testimonials data
const testimonials = [
  {
    name: "Floyd Miles",
    company: "eBay",
    avatar: "/frame.png",
    quote:
      "Synergy's resume builder is fantastic. It helped me create a professional resume that stood out to employers. The design templates are modern and the interface is intuitive.",
  },
  {
    name: "Sarah Johnson",
    company: "Google",
    avatar: "/frame.png",
    quote:
      "Working with this designer was an absolute pleasure. They delivered exceptional results that exceeded our expectations and helped transform our brand identity completely.",
  },
  {
    name: "Michael Chen",
    company: "Microsoft",
    avatar: "/frame.png",
    quote:
      "The attention to detail and creative approach made all the difference. Our website conversion rates increased by 40% after the redesign. Highly recommended!",
  },
  {
    name: "Emily Davis",
    company: "Apple",
    avatar: "/frame.png",
    quote:
      "Professional, creative, and reliable. The project was delivered on time and the communication throughout was excellent. Will definitely work together again.",
  },
  {
    name: "David Wilson",
    company: "Netflix",
    avatar: "/frame.png",
    quote:
      "Outstanding work on our mobile app design. The user experience improvements led to a 60% increase in user engagement. Truly exceptional talent.",
  },
];

// Initialize the website
document.addEventListener("DOMContentLoaded", function () {
  initializeTestimonials();
  initializeScrollHandling();
  initializeFAQ();
});

// Navigation Functions
function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId);
  if (element) {
    const navHeight = document.querySelector(".navigation").offsetHeight;
    const elementPosition = element.offsetTop - navHeight;
    window.scrollTo({
      top: elementPosition,
      behavior: "smooth",
    });
  }
}

// Mobile Navigation Toggle
function toggleMobileNav() {
  const mobileNav = document.getElementById("mobileNav");
  const isOpen = mobileNav.classList.contains("open");
  if (isOpen) {
    mobileNav.classList.remove("open");
    document.body.style.overflow = "auto";
    setTimeout(() => {
      mobileNav.style.display = "none";
    }, 300);
  } else {
    mobileNav.style.display = "flex";
    setTimeout(() => {
      mobileNav.classList.add("open");
      document.body.style.overflow = "hidden";
      // Focus first link for accessibility
      const firstLink = mobileNav.querySelector(".mobile-nav-link");
      if (firstLink) firstLink.focus();
    }, 10);
  }
}

// Close mobile nav when clicking outside or resizing
document.addEventListener("click", function (e) {
  const mobileNav = document.getElementById("mobileNav");
  const navToggle = document.querySelector(".nav-toggle");
  if (!mobileNav || !mobileNav.classList.contains("open")) return;
  if (
    !mobileNav.contains(e.target) &&
    (!navToggle || !navToggle.contains(e.target))
  ) {
    mobileNav.classList.remove("open");
    document.body.style.overflow = "auto";
    setTimeout(() => {
      mobileNav.style.display = "none";
    }, 300);
  }
});

window.addEventListener("resize", function () {
  const mobileNav = document.getElementById("mobileNav");
  if (window.innerWidth > 768 && mobileNav) {
    mobileNav.classList.remove("open");
    document.body.style.overflow = "auto";
    setTimeout(() => {
      mobileNav.style.display = "none";
    }, 300);
  }
});

function updateActiveNavigation() {
  const sections = [
    "home",
    "expertise",
    "portfolio",
    "experience",
    "blog",
    "testimonials",
    "faq",
    "contact",
  ];
  const navLinks = document.querySelectorAll(".nav-link");
  const scrollPosition = window.scrollY + 150;

  for (const section of sections) {
    const element = document.getElementById(section);
    if (element) {
      const { offsetTop, offsetHeight } = element;
      if (
        scrollPosition >= offsetTop &&
        scrollPosition < offsetTop + offsetHeight
      ) {
        if (activeSection !== section) {
          activeSection = section;

          // Update navigation
          navLinks.forEach((link) => {
            link.classList.remove("active");
            if (link.dataset.section === section) {
              link.classList.add("active");
            }
          });
        }
        break;
      }
    }
  }
}

// Scroll handling
function initializeScrollHandling() {
  let ticking = false;

  function updateScroll() {
    updateActiveNavigation();
    updateScrollToTopButton();
    ticking = false;
  }

  window.addEventListener("scroll", function () {
    if (!ticking) {
      requestAnimationFrame(updateScroll);
      ticking = true;
    }
  });
}

// Scroll to top button
function updateScrollToTopButton() {
  const scrollToTopBtn = document.getElementById("scroll-to-top");
  if (window.scrollY > 300) {
    scrollToTopBtn.classList.add("visible");
  } else {
    scrollToTopBtn.classList.remove("visible");
  }
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

// Portfolio Functions
function viewAllProjects() {
  console.log("Navigate to all projects");
  // In a real application, this would navigate to a projects page
  alert("This would navigate to a projects page in a real application.");
}

function viewCaseStudy(projectId) {
  console.log(`View case study for project ${projectId}`);
  // In a real application, this would navigate to the case study
  alert(
    `This would open the case study for project ${projectId} in a real application.`
  );
}

// Blog Functions
function viewAllPosts() {
  console.log("Navigate to all blog posts");
  // In a real application, this would navigate to a blog page
  alert("This would navigate to a blog page in a real application.");
}

function readPost(postId) {
  console.log(`Read blog post ${postId}`);
  // In a real application, this would navigate to the blog post
  alert(`This would open blog post ${postId} in a real application.`);
}

// Testimonials Functions
function initializeTestimonials() {
  updateTestimonialDisplay();
  createTestimonialDots();
}

function updateTestimonialDisplay() {
  const testimonial = testimonials[currentTestimonialIndex];

  document.getElementById("testimonial-name").textContent = testimonial.name;
  document.getElementById("testimonial-company").textContent =
    testimonial.company;
  document.getElementById("testimonial-avatar").src = testimonial.avatar;
  document.getElementById("testimonial-text").textContent = testimonial.quote;

  updateTestimonialDots();
}

function createTestimonialDots() {
  const dotsContainer = document.getElementById("testimonial-dots");
  dotsContainer.innerHTML = "";

  testimonials.forEach((_, index) => {
    const dot = document.createElement("button");
    dot.className = `testimonial-dot ${
      index === currentTestimonialIndex ? "active" : ""
    }`;
    dot.onclick = () => goToTestimonial(index);
    dot.setAttribute("aria-label", `Go to testimonial ${index + 1}`);
    dotsContainer.appendChild(dot);
  });
}

function updateTestimonialDots() {
  const dots = document.querySelectorAll(".testimonial-dot");
  dots.forEach((dot, index) => {
    dot.classList.toggle("active", index === currentTestimonialIndex);
  });
}

function nextTestimonial() {
  currentTestimonialIndex = (currentTestimonialIndex + 1) % testimonials.length;
  updateTestimonialDisplay();
}

function prevTestimonial() {
  currentTestimonialIndex =
    (currentTestimonialIndex - 1 + testimonials.length) % testimonials.length;
  updateTestimonialDisplay();
}

function goToTestimonial(index) {
  currentTestimonialIndex = index;
  updateTestimonialDisplay();
}

// FAQ Functions
function initializeFAQ() {
  // Set first FAQ as active by default
  const firstFaq = document.querySelector(".faq-item");
  if (firstFaq) {
    firstFaq.classList.add("active");
  }
}

function toggleFaq(button) {
  const faqItem = button.closest(".faq-item");
  const isActive = faqItem.classList.contains("active");

  // Close all FAQ items
  document.querySelectorAll(".faq-item").forEach((item) => {
    item.classList.remove("active");
  });

  // Open clicked item if it wasn't active
  if (!isActive) {
    faqItem.classList.add("active");
  }
}

// Contact Functions
function sendEmail() {
  window.location.href = "mailto:rehanurraihan@gmail.com";
}

function openSocial(url) {
  window.open(url, "_blank", "noopener,noreferrer");
}

// Add smooth hover effects for portfolio items
document.addEventListener("DOMContentLoaded", function () {
  const portfolioItems = document.querySelectorAll(".portfolio-item");

  portfolioItems.forEach((item) => {
    item.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-4px)";
    });

    item.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
    });
  });
});

// Keyboard navigation for testimonials
document.addEventListener("keydown", function (e) {
  if (e.key === "ArrowLeft") {
    prevTestimonial();
  } else if (e.key === "ArrowRight") {
    nextTestimonial();
  }
});

// Auto-advance testimonials (optional)
let testimonialInterval;

function startTestimonialAutoplay() {
  testimonialInterval = setInterval(nextTestimonial, 5000);
}

function stopTestimonialAutoplay() {
  clearInterval(testimonialInterval);
}

// Start autoplay when page loads
document.addEventListener("DOMContentLoaded", function () {
  startTestimonialAutoplay();

  // Pause autoplay when user interacts with testimonials
  const testimonialContainer = document.querySelector(".testimonial-container");
  if (testimonialContainer) {
    testimonialContainer.addEventListener(
      "mouseenter",
      stopTestimonialAutoplay
    );
    testimonialContainer.addEventListener(
      "mouseleave",
      startTestimonialAutoplay
    );
  }
});

// Intersection Observer for animations (optional enhancement)
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Observe elements for animation
document.addEventListener("DOMContentLoaded", function () {
  const animatedElements = document.querySelectorAll(
    ".expertise-item, .portfolio-item, .blog-item, .experience-item"
  );

  animatedElements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(el);
  });
});
