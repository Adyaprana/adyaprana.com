// Blog and Social Media JavaScript


document.addEventListener("DOMContentLoaded", () => {
  // Platform filter functionality
  const filterButtons = document.querySelectorAll(".filter-btn")
  const socialPosts = document.querySelectorAll(".social-post-card")

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Remove active class from all buttons
      filterButtons.forEach((btn) => btn.classList.remove("active"))
      // Add active class to clicked button
      button.classList.add("active")

      const platform = button.getAttribute("data-platform")

      // Filter posts
      socialPosts.forEach((post) => {
        if (platform === "all" || post.getAttribute("data-platform") === platform) {
          post.style.display = "block"
          post.style.animation = "fadeIn 0.5s ease-in-out"
        } else {
          post.style.display = "none"
        }
      })
    })
  })

  // Gallery zoom functionality
  const galleryItems = document.querySelectorAll(".gallery-zoom")
  const imageModal = document.getElementById("image-modal")
  const modalImage = document.getElementById("modal-image")
  const modalClose = imageModal?.querySelector(".modal-close")
  const modalOverlay = imageModal?.querySelector(".modal-overlay")

  galleryItems.forEach((item) => {
    item.addEventListener("click", () => {
      const imageSrc = item.getAttribute("data-image")
      if (modalImage && imageModal) {
        modalImage.src = imageSrc
        imageModal.classList.add("active")
        document.body.style.overflow = "hidden"
      }
    })
  })

  // Close modal functionality
  function closeImageModal() {
    if (imageModal) {
      imageModal.classList.remove("active")
      document.body.style.overflow = "auto"
    }
  }

  if (modalClose) {
    modalClose.addEventListener("click", closeImageModal)
  }

  if (modalOverlay) {
    modalOverlay.addEventListener("click", closeImageModal)
  }

  // Close modal on escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && imageModal?.classList.contains("active")) {
      closeImageModal()
    }
  })

  // Newsletter form submission
  const newsletterForm = document.querySelector(".newsletter-form")
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", (e) => {
      e.preventDefault()
      const email = newsletterForm.querySelector('input[type="email"]').value

      // Show success message
      showNotification("Successfully subscribed to newsletter!", "success")
      newsletterForm.reset()
    })
  }

  // Social post actions
  const actionButtons = document.querySelectorAll(".social-post-actions .action-btn")
  actionButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault()
      const action = button.textContent.trim().toLowerCase()
      showNotification(`${action} action performed!`, "info")
    })
  })

  // Blog post actions
  const blogActionButtons = document.querySelectorAll(".blog-post-actions .action-btn")
  blogActionButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault()
      const action = button.textContent.trim()

      if (button.classList.contains("like-btn")) {
        button.classList.toggle("liked")
        const likeCount = button.querySelector("span") || button
        const currentCount = Number.parseInt(likeCount.textContent.match(/\d+/)[0])
        const newCount = button.classList.contains("liked") ? currentCount + 1 : currentCount - 1
        likeCount.textContent = likeCount.textContent.replace(/\d+/, newCount)
      }

      showNotification(`${action} successful!`, "success")
    })
  })

  // Share functionality
  const shareButtons = document.querySelectorAll(".share-btn")
  shareButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault()
      const platform = button.classList[1] // Get platform class
      const url = window.location.href
      const title = document.title

      let shareUrl = ""
      switch (platform) {
        case "twitter":
          shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`
          break
        case "linkedin":
          shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
          break
        case "facebook":
          shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
          break
        case "copy":
          navigator.clipboard.writeText(url).then(() => {
            showNotification("Link copied to clipboard!", "success")
          })
          return
      }

      if (shareUrl) {
        window.open(shareUrl, "_blank", "width=600,height=400")
      }
    })
  })

  // Load more posts functionality
  const loadMoreBtn = document.querySelector(".load-more-btn")
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener("click", () => {
      // Simulate loading more posts
      loadMoreBtn.innerHTML = '<span class="loading"></span> Loading...'
      loadMoreBtn.disabled = true

      setTimeout(() => {
        loadMoreBtn.innerHTML = '<i class="fas fa-plus"></i> Load More Posts'
        loadMoreBtn.disabled = false
        showNotification("No more posts to load", "info")
      }, 2000)
    })
  }

  // Smooth scroll for table of contents
  const tocLinks = document.querySelectorAll(".toc a")
  tocLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault()
      const targetId = link.getAttribute("href").substring(1)
      const targetElement = document.getElementById(targetId)

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })

  // Reading progress indicator for blog posts
  if (document.querySelector(".blog-post-article")) {
    const progressBar = document.createElement("div")
    progressBar.className = "reading-progress"
    progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: linear-gradient(90deg, #3b82f6, #8b5cf6);
            z-index: 1001;
            transition: width 0.3s ease;
        `
    document.body.appendChild(progressBar)

    window.addEventListener("scroll", () => {
      const article = document.querySelector(".blog-post-article")
      if (article) {
        const articleTop = article.offsetTop
        const articleHeight = article.offsetHeight
        const windowHeight = window.innerHeight
        const scrollTop = window.pageYOffset

        const progress = Math.min(Math.max((scrollTop - articleTop + windowHeight) / articleHeight, 0), 1)

        progressBar.style.width = `${progress * 100}%`
      }
    })
  }

  // Notification system (if not already defined)
  if (typeof showNotification === "undefined") {
    window.showNotification = (message, type = "info") => {
      const notification = document.createElement("div")
      notification.className = `notification notification-${type}`
      notification.innerHTML = `
                <div class="notification-content">
                    <span>${message}</span>
                    <button class="notification-close">&times;</button>
                </div>
            `

      notification.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 3000;
                padding: 1rem 1.5rem;
                border-radius: 8px;
                color: white;
                font-weight: 500;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                transform: translateX(100%);
                transition: transform 0.3s ease;
                max-width: 400px;
            `

      if (type === "success") {
        notification.style.background = "linear-gradient(135deg, #10b981, #059669)"
      } else if (type === "error") {
        notification.style.background = "linear-gradient(135deg, #ef4444, #dc2626)"
      } else {
        notification.style.background = "linear-gradient(135deg, #3b82f6, #2563eb)"
      }

      document.body.appendChild(notification)

      setTimeout(() => {
        notification.style.transform = "translateX(0)"
      }, 100)

      const autoHide = setTimeout(() => {
        hideNotification(notification)
      }, 5000)

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
  }
})
