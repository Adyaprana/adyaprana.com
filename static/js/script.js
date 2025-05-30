// DOM Elements
const navbar = document.getElementById("navbar")
const navMenu = document.getElementById("nav-menu")
const mobileToggle = document.getElementById("mobile-toggle")
const themeToggle = document.getElementById("theme-toggle")
const themeIcon = document.getElementById("theme-icon")
const contactForm = document.getElementById("contact-form")
const currentYearSpan = document.getElementById("current-year")

 if (window.AOS) {
   AOS.init({
     duration: 800,
     easing: "ease-in-out",
     once: true,
   });
 }


// Set current year
if (currentYearSpan) {
  currentYearSpan.textContent = new Date().getFullYear()
}

// Theme Management
let isDarkMode = localStorage.getItem("darkMode") === "true"

function updateTheme() {
  if (isDarkMode) {
    document.documentElement.setAttribute("data-theme", "dark")
    themeIcon.className = "fas fa-sun"
  } else {
    document.documentElement.removeAttribute("data-theme")
    themeIcon.className = "fas fa-moon"
  }
  localStorage.setItem("darkMode", isDarkMode)
}

// Initialize theme
updateTheme()

// Theme toggle event
themeToggle.addEventListener("click", () => {
  isDarkMode = !isDarkMode
  updateTheme()
})

// Mobile menu toggle
mobileToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active")
  mobileToggle.classList.toggle("active")
})

// Enhanced Navigation with proper page detection
function updateActiveNavLink() {
  const currentPath = window.location.pathname
  const currentHash = window.location.hash
  const navLinks = document.querySelectorAll(".nav-link")

  navLinks.forEach((link) => {
    link.classList.remove("active")
    const href = link.getAttribute("href")

    // Handle different page types
    if (currentPath === "/" && href === "/") {
      link.classList.add("active")
    } else if (currentPath === "/blog" && href === "/blog") {
      link.classList.add("active")
    } else if (currentPath === "/social" && href === "/social") {
      link.classList.add("active")
    } else if (currentPath.startsWith("/project/") && href.includes("#projects")) {
      link.classList.add("active")
    } else if (currentPath.startsWith("/blog/") && href === "/blog") {
      link.classList.add("active")
    } else if (href.includes("#") && currentPath === "/") {
      // Handle anchor links on home page
      const sectionId = href.split("#")[1]
      if (currentHash === `#${sectionId}`) {
        link.classList.add("active")
      }
    }
  })
}

// Smooth scrolling for navigation links
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", (e) => {
    const href = link.getAttribute("href")

    // Handle external pages
    if (href === "/blog" || href === "/social") {
      // Let the browser handle these normally
      return
    }

    // Handle anchor links
    if (href.includes("#")) {
      e.preventDefault()
      const targetId = href.split("#")[1]
      const targetSection = document.getElementById(targetId)

      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 80
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        })

        // Update URL hash
        history.pushState(null, null, `#${targetId}`)
        updateActiveNavLink()
      }
    }

    // Close mobile menu
    navMenu.classList.remove("active")
    mobileToggle.classList.remove("active")
  })
})

// Navbar scroll effect
let lastScrollY = window.scrollY

window.addEventListener("scroll", () => {
  const currentScrollY = window.scrollY

  // Add/remove navbar background
  if (currentScrollY > 50) {
    navbar.classList.add("scrolled")
  } else {
    navbar.classList.remove("scrolled")
  }

  // Hide/show navbar on scroll
  if (currentScrollY > lastScrollY && currentScrollY > 100) {
    navbar.style.transform = "translateY(-100%)"
  } else {
    navbar.style.transform = "translateY(0)"
  }

  lastScrollY = currentScrollY

  // Update active navigation link based on scroll position
  if (window.location.pathname === "/") {
    updateActiveNavLinkOnScroll()
  }
})

// Update active link based on scroll position (for home page)
function updateActiveNavLinkOnScroll() {
  const sections = ["home", "about", "projects", "education", "github", "linkedin", "future", "contact"]
  const scrollPosition = window.scrollY + 100

  for (const sectionId of sections) {
    const section = document.getElementById(sectionId)
    if (section) {
      const { offsetTop, offsetHeight } = section
      if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
        // Update active link
        document.querySelectorAll(".nav-link").forEach((link) => {
          link.classList.remove("active")
          if (
            link.getAttribute("href") === `#${sectionId}` ||
            (sectionId === "home" && link.getAttribute("href") === "/")
          ) {
            link.classList.add("active")
          }
        })
        break
      }
    }
  }
}

// Call the function when page loads
document.addEventListener("DOMContentLoaded", () => {
  updateActiveNavLink()

  // Add enhanced project card interactions
  initializeProjectCards()
})

// Enhanced Project Card Functionality
function initializeProjectCards() {
  const projectCards = document.querySelectorAll(".project-card")

  projectCards.forEach((card) => {
    // Add loading animation on click
    card.addEventListener("click", (e) => {
      // Don't trigger if clicking on action buttons
      if (e.target.closest(".project-actions") || e.target.closest(".btn")) {
        return
      }

      const projectId = card.querySelector("a[href*='/project/']")?.getAttribute("href")?.split("/").pop()
      if (projectId) {
        card.classList.add("loading")
        setTimeout(() => {
          window.location.href = `/project/${projectId}`
        }, 500)
      }
    })

    // Enhanced hover effects
    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-8px) scale(1.02)"
    })

    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0) scale(1)"
    })
  })
}

// Project modal functionality
const projectModal = document.getElementById("project-modal")
const modalClose = document.getElementById("modal-close")
const modalOverlay = document.querySelector(".modal-overlay")

// Contact form submission
if (contactForm) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault()

    const formData = new FormData(contactForm)
    const data = Object.fromEntries(formData.entries())

    // Add loading state
    const submitButton = contactForm.querySelector('button[type="submit"]')
    const originalText = submitButton.innerHTML
    submitButton.innerHTML = '<span class="loading"></span> Sending...'
    submitButton.disabled = true

    try {
      const response = await fetch("/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (response.ok) {
        showNotification("Message sent successfully!", "success")
        contactForm.reset()
      } else {
        showNotification("Failed to send message. Please try again.", "error")
      }
    } catch (error) {
      console.error("Error sending message:", error)
      showNotification("Failed to send message. Please try again.", "error")
    } finally {
      // Reset button state
      submitButton.innerHTML = originalText
      submitButton.disabled = false
    }
  })
}

// Enhanced Notification system
function showNotification(message, type = "info") {
  // Remove existing notifications
  document.querySelectorAll(".notification").forEach((n) => n.remove())

  const notification = document.createElement("div")
  notification.className = `notification notification-${type}`
  notification.innerHTML = `
        <div class="notification-content">
            <div class="notification-icon">
                <i class="fas fa-${type === "success" ? "check-circle" : type === "error" ? "exclamation-circle" : "info-circle"}"></i>
            </div>
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `

  // Enhanced styles
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 3000;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        color: white;
        font-weight: 500;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
        transform: translateX(100%);
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        max-width: 400px;
        min-width: 300px;
        backdrop-filter: blur(10px);
    `

  if (type === "success") {
    notification.style.background = "linear-gradient(135deg, #10b981, #059669)"
  } else if (type === "error") {
    notification.style.background = "linear-gradient(135deg, #ef4444, #dc2626)"
  } else {
    notification.style.background = "linear-gradient(135deg, #3b82f6, #2563eb)"
  }

  document.body.appendChild(notification)

  // Show notification with animation
  setTimeout(() => {
    notification.style.transform = "translateX(0)"
  }, 100)

  // Auto hide after 5 seconds
  const autoHide = setTimeout(() => {
    hideNotification(notification)
  }, 5000)

  // Close button event
  const closeButton = notification.querySelector(".notification-close")
  closeButton.addEventListener("click", () => {
    clearTimeout(autoHide)
    hideNotification(notification)
  })

  function hideNotification(element) {
    element.style.transform = "translateX(100%)"
    setTimeout(() => {
      if (element.parentNode) {
        element.parentNode.removeChild(element)
      }
    }, 300)
  }
}

// Project modal functionality
const projectDetailsButtons = document.querySelectorAll(".project-details-btn")

projectDetailsButtons.forEach((button) => {
  button.addEventListener("click", async (e) => {
    e.stopPropagation()
    const projectId = button.getAttribute("data-project-id")

    try {
      const response = await fetch(`/project/${projectId}`)
      const project = await response.json()

      if (response.ok) {
        showProjectModal(project)
      } else {
        console.error("Project not found")
      }
    } catch (error) {
      console.error("Error fetching project:", error)
    }
  })
})

function showProjectModal(project) {
  // Update modal content
  document.getElementById("modal-title").textContent = project.title
  document.getElementById("modal-image").src = project.image
  document.getElementById("modal-image").alt = project.title
  document.getElementById("modal-description").textContent = project.description

  // Update features list
  const featuresList = document.getElementById("modal-features-list")
  featuresList.innerHTML = ""
  project.features.forEach((feature) => {
    const li = document.createElement("li")
    li.textContent = feature
    featuresList.appendChild(li)
  })

  // Update tech stack
  const techStack = document.getElementById("modal-tech-stack")
  techStack.innerHTML = ""
  project.tech_stack.forEach((tech) => {
    const span = document.createElement("span")
    span.className = "tech-tag"
    span.textContent = tech
    techStack.appendChild(span)
  })

  // Update links
  document.getElementById("modal-github").href = project.github_url
  document.getElementById("modal-live").href = project.live_url
  document.getElementById("modal-video").href = project.video_url

  // Show modal
  projectModal.classList.add("active")
  document.body.style.overflow = "hidden"
}

function hideProjectModal() {
  projectModal.classList.remove("active")
  document.body.style.overflow = "auto"
}

// Modal close events
modalClose.addEventListener("click", hideProjectModal)
modalOverlay.addEventListener("click", hideProjectModal)

// Close modal on escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && projectModal.classList.contains("active")) {
    hideProjectModal()
  }
})

// Enhanced parallax effect for hero section
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const heroSection = document.querySelector(".hero-section")
  const blobs = document.querySelectorAll(".blob")

  if (heroSection && window.location.pathname === "/") {
    const rate = scrolled * -0.3
    heroSection.style.transform = `translateY(${rate}px)`
  }

  blobs.forEach((blob, index) => {
    const rate = scrolled * (0.1 + index * 0.05)
    blob.style.transform = `translate(${rate}px, ${rate * 0.5}px) rotate(${rate * 0.1}deg)`
  })
})

// Enhanced typing animation for hero title
function typeWriter(element, text, speed = 100) {
  let i = 0
  element.innerHTML = ""

  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i)
      i++
      setTimeout(type, speed)
    } else {
      // Add cursor blink effect
      element.innerHTML += '<span class="cursor">|</span>'
      setTimeout(() => {
        const cursor = element.querySelector(".cursor")
        if (cursor) cursor.remove()
      }, 2000)
    }
  }

  type()
}

// Initialize typing animation when page loads
window.addEventListener("load", () => {
  const heroTitle = document.querySelector(".hero-title")
  if (heroTitle && window.location.pathname === "/") {
    const originalText = heroTitle.textContent
    setTimeout(() => {
      typeWriter(heroTitle, originalText, 100)
    }, 1000)
  }
})

// Enhanced intersection observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate")

      // Special handling for project cards
      if (entry.target.classList.contains("project-card")) {
        setTimeout(() => {
          entry.target.style.opacity = "1"
          entry.target.style.transform = "translateY(0)"
        }, 100)
      }
    }
  })
}, observerOptions)

// Observe elements for animation
document.querySelectorAll(".stat-card, .project-card, .education-card, .future-card").forEach((el) => {
  observer.observe(el)
})

// Enhanced counter animation for stats
function animateCounter(element, target, duration = 2000) {
  let start = 0
  const increment = target / (duration / 16)

  function updateCounter() {
    start += increment
    if (start < target) {
      element.textContent = Math.floor(start)
      requestAnimationFrame(updateCounter)
    } else {
      element.textContent = target
    }
  }

  updateCounter()
}

// Initialize counter animations when stats come into view
const statsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const statNumber = entry.target.querySelector(".stat-number")
        if (statNumber && !statNumber.classList.contains("animated")) {
          const target = Number.parseInt(statNumber.textContent.replace(/[^\d]/g, ""))
          if (!isNaN(target)) {
            animateCounter(statNumber, target)
            statNumber.classList.add("animated")
          }
        }
      }
    })
  },
  { threshold: 0.5 },
)

document.querySelectorAll(".stat-card").forEach((card) => {
  statsObserver.observe(card)
})

// Enhanced smooth reveal animation for sections
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed")
      }
    })
  },
  { threshold: 0.1 },
)

document.querySelectorAll("section").forEach((section) => {
  section.classList.add("reveal")
  revealObserver.observe(section)
})

// Add enhanced CSS for reveal animation
const revealStyles = `
    .reveal {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .reveal.revealed {
        opacity: 1;
        transform: translateY(0);
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.75rem;
    }
    
    .notification-icon {
        font-size: 1.25rem;
    }
    
    .notification-message {
        flex: 1;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: inherit;
        font-size: 1.25rem;
        cursor: pointer;
        padding: 0.25rem;
        border-radius: 50%;
        transition: background 0.2s ease;
    }
    
    .notification-close:hover {
        background: rgba(255, 255, 255, 0.2);
    }
    
    .cursor {
        animation: blink 1s infinite;
    }
    
    @keyframes blink {
        0%, 50% { opacity: 1; }
        51%, 100% { opacity: 0; }
    }
    
    .project-card {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .project-card.loading::after {
        content: "";
        position: absolute;
        inset: 0;
        background: rgba(255, 255, 255, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10;
        border-radius: inherit;
    }
    
    [data-theme="dark"] .project-card.loading::after {
        background: rgba(17, 24, 39, 0.9);
    }
    
    .navbar.scrolled {
        background: rgba(255, 255, 255, 0.95);
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    }
    
    [data-theme="dark"] .navbar.scrolled {
        background: rgba(17, 24, 39, 0.95);
    }
`

const styleSheet = document.createElement("style")
styleSheet.textContent = revealStyles
document.head.appendChild(styleSheet)

// Enhanced project card hover effects
document.addEventListener("DOMContentLoaded", () => {
  const projectCards = document.querySelectorAll(".project-card")

  projectCards.forEach((card) => {
    const overlay = card.querySelector(".project-overlay")
    const image = card.querySelector(".project-image img")

    card.addEventListener("mouseenter", () => {
      if (image) {
        image.style.transform = "scale(1.1)"
      }
      if (overlay) {
        overlay.style.opacity = "1"
      }
    })

    card.addEventListener("mouseleave", () => {
      if (image) {
        image.style.transform = "scale(1)"
      }
      if (overlay) {
        overlay.style.opacity = "0"
      }
    })
  })
})

// Add smooth scrolling for all anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

console.log("Enhanced Portfolio website loaded successfully! 🚀")
