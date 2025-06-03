from flask import Flask, render_template, request, jsonify
import json
import os
from datetime import datetime

app = Flask(__name__)

# Mock data for the portfolio
projects_data = [
    {
        "id": 1,
        "title": "Nexora.ai — Multimodal AI Assistant",
        "summary": "Smart assistant with multimodal input: text, voice, image, and PDFs",
        "image": "images/project1.png",
        "description": "Nexora.ai is an intelligent AI-powered assistant that supports multimodal interaction—understanding and responding to user inputs from text, speech, images, and PDF documents. Designed for domain-specific use cases like Education and Healthcare, it offers real-time responses via Mistral LLM with a sleek, responsive Streamlit UI.",
        "features": [
            "Multimodal Input (Text, Voice, Images, PDFs)",
            "Domain-Specific AI Responses",
            "Real-time Output with Mistral LLM",
            "Responsive UI with Sidebar Navigation",
            "Dark Mode Ready",
            "OCR and PDF Parsing"
        ],
        "tech_stack": [
            "Python",
            "Streamlit",
            "Mistral API",
            "SpeechRecognition",
            "PyTesseract",
            "PyPDF2"
        ],
        "github_url": "https://github.com/Adyaprana/Nexora.ai",
        "live_url": "https://nexora-ai-2wcg.onrender.com",  
        "video_url": "https://www.linkedin.com/posts/adyaprana21_codecomplete-teamkiit-include-activity-7316729214173335552-V1v6", 
            "gallery": [
                "images/project1_1.png",
                "images/project1_2.png",
                "images/project1_3.png",
                "images/project1_4.png",
                "images/project1_5.png",
                "images/project1_6.png"
            ],
        "challenges": "Integrating multiple input formats (speech, OCR, PDF) into a single interface while maintaining real-time performance was the core challenge. Solved by efficient API orchestration and caching strategies.",
        "impact": "Enabled seamless, multimodal interactions for domain-specific workflows, improving accessibility and enhancing user experience across diverse industries.",
        "timeline": "4 months development, 1 month testing and documentation",
        "category": "AI Assistant",
        "status": "Live",
        "client": "Open Source Community Project"
    },
    {
        "id": 2,
        "title": "Rasaalaya — Restaurant Listing & Ordering Platform",
        "summary": "Flask-powered web app for browsing, ordering, and reserving at restaurants",
        "image": "images/project2.png",
        "description": "Rasaalaya is a feature-rich, responsive web application built with Flask that allows users to explore restaurants, browse menus, place food orders, and make table reservations. Designed with both functionality and aesthetics in mind, it supports a seamless ordering experience with Light/Dark mode, community forums, and a modern UI built using Jinja2 templates.",
        "features": [
            "Restaurant Listings by Cuisine",
            "Image-Driven Menus",
            "Online Order Placement",
            "Table Reservation System",
            "Light & Dark Mode Toggle",
            "Community Forum Integration"
        ],
        "tech_stack": [
            "Python 3.12",
            "Flask 2.1.1",
            "HTML5",
            "CSS3",
            "JavaScript",
            "Jinja2",
            "SQLite"
        ],
        "github_url": "https://github.com/Adyaprana/Rasaalaya",
        "live_url": "https://rasaalaya.onrender.com",
        "video_url": "https://www.linkedin.com/feed/update/urn:li:activity:7327239063055273984/?originTrackingId=1b1gbSyGSEObcZHjop9UzQ%3D%3D",
        "gallery": [
            "images/project2_1.png",
            "images/project2_2.png",
            "images/project2_3.png",
            "images/project2_4.png",
            "images/project2_5.png",
            "images/project2_6.png"
            
       ],

        "challenges": "Building a seamless user experience for ordering and reservations while managing state between multiple views and templates required careful Flask routing and session management.",
        "impact": "Simplified the digital ordering process for local eateries and served as a template for Flask-based full-stack web applications.",
        "timeline": "3 months development, 1 month testing & UI refinement",
        "category": "Web Application",
        "status": "Live",
        "client": "Personal/Open Source"
    },
   {
    "id": 3,
    "title": "Healthy Diet Planner",
    "summary": "A modern web application that helps users plan balanced meals and track nutrition with ease.",
    "image": "images/project3.png",
    "description": "Healthy Diet Planner is a web-based nutrition and meal planning tool built with Flask and modern frontend technologies. It provides personalized dietary suggestions, calorie tracking, food group balance monitoring, and integration with the USDA Food Database. Designed to empower users to manage their dietary health with an intuitive interface and reliable nutritional data.",
    "features": [
        "Personalized Meal Planning",
        "Calorie and Nutrient Tracking",
        "USDA Food Database Integration",
        "Daily Nutrition Summary",
        "Interactive Meal Scheduler",
        "Custom Diet Goals",
        "Responsive UI Design",
        "Dark/Light Theme Toggle"
    ],
    "tech_stack": [
        "Python",
        "Flask",
        "HTML5",
        "CSS3",
        "JavaScript",
        "SQLAlchemy",
        "Jinja2",
        "USDA Food Database API"
    ],
    "github_url": "https://github.com/Adyaprana**************",
    "live_url": "******************************",
    "video_url": "*********************************",
    "gallery": [
        "images/healthy_diet_1.png",
        "images/healthy_diet_2.png",
        "images/healthy_diet_3.png",
        "images/healthy_diet_4.png",
        "images/healthy_diet_5.png",
        "images/healthy_diet_6.png"
    ],
    "challenges": "Ensuring accuracy in calorie and nutrient data, building a user-friendly and visually appealing interface, and managing real-time data input and tracking across different devices.",
    "impact": "Enabled users to maintain healthier eating habits, with over 65% reporting improved meal balance and consistency. Increased engagement with diet tracking by introducing a clean UI and intuitive meal scheduler.",
    "timeline": "3 months core development, 1 month UI enhancement and testing",
    "category": "Health & Fitness",
    "status": "Completed",
    "client": "Personal Project / Wellness & Nutrition Enthusiasts"
}

]

# Blog posts data
blog_posts = [
    {
    "id": 1,
    "title": "Building Scalable Web Applications with Python Flask",
    "excerpt": "Learn how to create robust, lightweight web applications using Python Flask. This comprehensive guide covers best practices, performance optimization, and deployment strategies.",
    "content": """
    <p>In today's fast-paced development environment, building scalable web applications is crucial for success. Flask, a micro web framework for Python, offers a flexible and lightweight foundation for creating robust, maintainable applications.</p>
    
    <h3>Why Flask?</h3>
    <p>Flask is minimalistic yet powerful, allowing developers to build web apps quickly without the overhead of larger frameworks. With Python’s simplicity and Flask’s flexibility, developers can create APIs, microservices, and full-stack applications with ease.</p>
    
    <h3>Key Benefits:</h3>
    <ul>
        <li>Simple and lightweight core</li>
        <li>Flexible routing and middleware integration</li>
        <li>Large ecosystem and extensions (e.g., Flask-SQLAlchemy, Flask-Login)</li>
        <li>Ideal for microservices and quick prototyping</li>
    </ul>
    
    <h3>Getting Started</h3>
    <p>To create a new Flask project, first set up a virtual environment and install Flask:</p>
    <pre><code>
    python -m venv venv
    source venv/bin/activate  # On Windows: venv\\Scripts\\activate
    pip install Flask
    </code></pre>

    <p>Then create a basic app:</p>
    <pre><code>
    from flask import Flask

    app = Flask(__name__)

    @app.route("/")
    def home():
        return "Hello, Flask!"

    if __name__ == "__main__":
        app.run(debug=True)
    </code></pre>

    <p>This will start a local server at <code>http://127.0.0.1:5000</code> with a simple homepage.</p>
    """,
    "author": "Adyaprana Pradhan",
    "post.author_image": "images/author1.jpg",
    "date": "2025-05-15",
    "category": "Web Development",
    "tags": ["Flask", "Python", "Web Development", "Backend"],
    "image": "images/blog-1.png",
    "read_time": "8 min read",
    "views": 1250,
    "likes": 89
},
    {
        "id": 2,
        "title": "Machine Learning in Web Development: A Practical Guide",
        "excerpt": "Discover how to integrate machine learning models into your web applications. From model training to deployment, this guide covers everything you need to know.",
        "content": """
        <p>Machine learning is no longer confined to data science labs. Modern web developers can leverage ML to create intelligent, adaptive applications that provide personalized user experiences.</p>
        
        <h3>Common ML Use Cases in Web Development</h3>
        <ul>
            <li>Recommendation systems</li>
            <li>Content personalization</li>
            <li>Fraud detection</li>
            <li>Chatbots and virtual assistants</li>
            <li>Image and text analysis</li>
        </ul>
        
        <h3>Tools and Frameworks</h3>
        <p>Several tools make it easier to integrate ML into web applications:</p>
        <ul>
            <li><strong>TensorFlow.js</strong> - Run ML models directly in the browser</li>
            <li><strong>Hugging Face</strong> - Pre-trained models and APIs</li>
            <li><strong>OpenAI API</strong> - GPT models for text generation</li>
            <li><strong>Google Cloud ML</strong> - Scalable ML services</li>
            <li><strong>Mistral API</strong> - Lightweight and efficient open-weight language models for inference and customization</li>

        </ul>
        """,
        "author": "Adyaprana Pradhan",
        "date": "2025-04-26",
        "category": "Machine Learning",
        "tags": ["Machine Learning", "AI", "TensorFlow", "Web Development"],
        "image": "images/blog-2.png",
        "read_time": "12 min read",
        "views": 2100,
        "likes": 156
    },
    {
        "id": 3,
        "title": "DevOps Best Practices for Modern Web Applications",
        "excerpt": "Learn essential DevOps practices that will help you deploy, monitor, and maintain web applications efficiently. From CI/CD to monitoring, we cover it all.",
        "content": """
        <p>DevOps practices are essential for modern web development. They help teams deliver software faster, more reliably, and with better quality.</p>
        
        <h3>Core DevOps Principles</h3>
        <ul>
            <li>Continuous Integration and Deployment</li>
            <li>Infrastructure as Code</li>
            <li>Monitoring and Logging</li>
            <li>Automated Testing</li>
            <li>Security Integration</li>
        </ul>
        
        <h3>Essential Tools</h3>
        <p>Here are some tools that every DevOps engineer should know:</p>
        <ul>
            <li><strong>Docker</strong> - Containerization</li>
            <li><strong>Kubernetes</strong> - Container orchestration</li>
            <li><strong>GitHub Actions</strong> - CI/CD pipelines</li>
            <li><strong>Terraform</strong> - Infrastructure as Code</li>
            <li><strong>Prometheus</strong> - Monitoring and alerting</li>
        </ul>
        """,
        "author": "Adyaprana Pradhan",
        "date": "2024-01-05",
        "category": "DevOps",
        "tags": ["DevOps", "Docker", "Kubernetes", "CI/CD"],
        "image": "images/blog-3.png",
        "read_time": "10 min read",
        "views": 1800,
        "likes": 134
    },

]

# Social media posts data
social_posts = [
    {
        "id": 1,
        "platform": "LinkedIn",
        "content": "🍽️ Introducing Rasaalaya – The Ultimate Restaurant Listing & Ordering Platform!\n\nI'm thrilled to present Rasaalaya, a fully responsive web application built with Flask. This platform offers a seamless dining experience.",                
        "image": "images/social-1.png",
        "date": "2025-05-04",
        "likes": 245,
        "comments": 32,
        "shares": 18,
        "link": "https://www.linkedin.com/feed/update/urn:li:activity:7327239063055273984/"
    },
    {
        "id": 2,
        "platform": "Twitter",
        "content": "🙏 Happy Teacher's Day 🙏\n\nThank you for teaching me how to read and write, for guiding me to distinguish between what is wrong and what is right. For allowing me to dream and soar as a kite, thank you for being my friend, mentor and light.",
        "image": "images/social-2.png",
        "date": "2024-01-18",
        "likes": 189,
        "comments": 24,
        "shares": 67,
        "link": "https://x.com/Adyaprana21/status/1566700907924197376"
    },
    {
        "id": 3,
        "platform": "Instagram",
        "content": "Chilika Lake, where nature's beauty meets serene waters. Experience tranquility aboard a traditional boat. 🌊🛶",
        "image": "images/social-3.jpg",
        "date": "2024-06-28",
        "likes": 156,
        "comments": 19,
        "shares": 8,
        "link": "https://www.instagram.com/p/C990z_lS_6Q/?img_index=1"
    },
    {
        "id": 4,
        "platform": "GitHub",
        "content": "A Mistral AI-powered chatbot built with Streamlit for real-time conversational experiences.\n\nCheck out the project on GitHub and contribute to the future of AI assistants! #AI #Streamlit #OpenSource",
        "image": "images/social-4.png",
        "date": "2025-01-15",
        "likes": 89,
        "comments": 15,
        "shares": 34,
        "link": "https://github.com/Adyaprana/Nexora.ai"
    },
    {
        "id": 5,
        "platform": "LinkedIn",
        "content": "Mission accomplished: Final project submitted with the best dev squad @KIIT!\n\nProud to be part of the CodeComplete team, delivering a cutting-edge AI assistant that redefines user interaction.",
        "image": "images/social-5.png",
        "date": "2024-01-12",
        "likes": 312,
        "comments": 45,
        "shares": 28,
        "link": "https://www.linkedin.com/posts/adyaprana21_codecomplete-teamkiit-include-activity-7316729214173335552-V1v6"
    },
    {
        "id": 6,
        "platform": "Instagram",
        "content": "Peaceful vibes with Lord Shiva's divine aura 🌿🌌🕉️🙏🏼✨",
        "image": "images/social-6.png",
        "date": "2024-12-22",
        "likes": 156,
        "comments": 19,
        "shares": 8,
        "link": "https://www.instagram.com/p/DD4Y_p8BhCS/"
    },
    {
        "id": 7,
        "platform": "GitHub",
        "content": "**Rasaalaya** is a responsive and dynamic restaurant menu and ordering platform built using Flask, featuring image previews, dark/light mode, and real-time order handling.",
        "image": "images/social-7.png",
        "date": "2025-05-07",
        "likes": 89,
        "comments": 15,
        "shares": 34,
        "link": "https://github.com/Adyaprana/Rasaalaya"
    },
    {
        "id": 8,
        "platform": "Instagram",
        "content": "Where the urban jungle meets the serenity of nature 🌆🌳",
        "image": "images/social-8.png",
        "date": "2024-12-22",
        "likes": 206,
        "comments": 29,
        "shares": 6,
        "link": "https://www.instagram.com/p/C-erFoVyOgq/"
    },
      {
        "id": 9,
        "platform": "Instagram",
        "content": "Timeless moments, captured in every tick ⏱️✨",
        "image": "images/social-9.png",
        "date": "2024",
        "likes": 106,
        "comments": 13,
        "shares": 3,
        "link": "https://www.instagram.com/p/C87A7fryMSt/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="
    },
    {
        "id": 10,
        "platform": "Instagram",
        "content": "🌼🌼 Bloom with grace 🌼🌼\n\n🌷 Today, give yourself permission to grow at your own pace. Celebrate each petal you open and remember: you were born to bloom. 🌷",
        "image": "images/social-10.png",
        "date": "2024",
        "likes": 173,
        "comments": 15,
        "shares": 4,
        "link": "https://www.instagram.com/p/C6lptc-yJ3c/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="
    },
     {
        "id": 11,
        "platform": "Instagram",
        "content": "Embracing the divine grace of Lord Jagannath 🙏 \n\n Emami Jagannath Temple",
        "image": "images/social-11.jpg",
        "date": "2023",
        "likes": 186,
        "comments": 29,
        "shares": 12,
        "link": "https://www.instagram.com/p/C0yz1GRyjX6/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="
    },
     {
        "id": 12,
        "platform": "Instagram",
        "content": "Under a makeshift canopy in the heart of the woods, this wandering holy man surrounded by ancient trees and his simple books reminds us that true wisdom needs neither walls nor wealth. 🍃📚🙏",
        "image": "images/social-12.jpg",
        "date": "2023",
        "likes": 161,
        "comments": 15,
        "shares": 3,
        "link": "https://www.instagram.com/p/Cz82SvqSpta/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="
    }
    

]

# Education data
education_data = [
    {
        "institution": "KIIT Deemed to be University",
        "degree": "Bachelor of Computer Applications",
        "period": "2020 - 2024",
        "description": "Specialized in AI/ML and Full-Stack Development",
        "logo": "static/images/kiit-logo.png"

    },
    {
        "institution": "NIST Higher Secondary School",
        "degree": "Higher Secondary Education",
        "period": "2018 - 2020",
        "description": "Science Stream with Computer Science",
        "logo": "static/images/nist-logo.png"
    }
]

future_projects_data = [
    {
        "title": "MedAI Navigator",
        "status": "In Progress",
        "description": "MedAI Navigator is an AI-powered, multilingual, and fully accessible health monitoring dashboard designed to empower users with real-time insights into their vital signs."
    },
    {
        "title": "Fitness Tracker Application ",
        "status": "Planned",
        "description": "A sophisticated fitness tracking platform that combines luxury design with powerful functionality. Features real-time workout logging, goal management, progress analytics, and an extensive exercise library."
    },
    {
        "title": "Ai-Hedge-Fund",
        "status": "Prototype Done",
        "description": "This will serve as the foundation for your sophisticated multi-agent investment platform with Perplexity integration and Indian market focus."
    }
]

github_stats = {
    "repositories": 42,
    "stars": 156,
    "followers": 89,
    "contributions": 1247
}

@app.route('/')
def index():
    return render_template('index.html', 
                         projects=projects_data,
                         education=education_data,
                         future_projects=future_projects_data,
                         github_stats=github_stats)

@app.route('/blog')
def blog():
    return render_template('blog.html', posts=blog_posts)

@app.route('/blog/<int:post_id>')
def blog_post(post_id):
    post = next((p for p in blog_posts if p['id'] == post_id), None)
    if post:
        # Get related posts (excluding current post)
        related_posts = [p for p in blog_posts if p['id'] != post_id][:3]
        return render_template('blog_post.html', post=post, related_posts=related_posts)
    return "Post not found", 404

@app.route('/social')
def social():
    return render_template('social.html', posts=social_posts)

# Add this route to handle direct project page access
@app.route('/projects')
def projects():
    return render_template('index.html', 
                         projects=projects_data,
                         education=education_data,
                         future_projects=future_projects_data,
                         github_stats=github_stats) + "#projects"

# Update the project detail route to handle both AJAX and direct access
@app.route('/project/<int:project_id>')
def project_detail(project_id):
    project = next((p for p in projects_data if p['id'] == project_id), None)
    if project:
        # Check if it's an AJAX request
        if request.headers.get('X-Requested-With') == 'XMLHttpRequest':
            return jsonify(project)
        # For direct access, render the project detail page
        related_projects = [p for p in projects_data if p['id'] != project_id][:2]
        return render_template('project_detail.html', project=project, related_projects=related_projects)
    return "Project not found", 404

@app.route('/contact', methods=['POST'])
def contact():
    if request.method == 'POST':
        data = request.get_json()
        # Here you would typically save to database or send email
        print(f"Contact form submission: {data}")
        return jsonify({'status': 'success', 'message': 'Message sent successfully!'})

# Add error handlers for better user experience
@app.errorhandler(404)
def not_found_error(error):
    return render_template('404.html'), 404

@app.errorhandler(500)
def internal_error(error):
    return render_template('500.html'), 500



if __name__ == '__main__':
    app.run(debug=True)
