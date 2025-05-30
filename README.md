# Luxury Developer Portfolio - Flask Version

A premium, modern developer portfolio website built with Python Flask, featuring luxury design elements, smooth animations, and responsive layout.

## ✨ Features

### Design & UI
- **Luxury Design**: Premium glassmorphism effects and gradient backgrounds
- **Dark/Light Mode**: Seamless theme switching with smooth transitions
- **Responsive Layout**: Mobile-first design that works on all devices
- **Smooth Animations**: AOS library integration with custom CSS animations
- **Modern Typography**: Playfair Display and Inter font combination

### Sections
- **Hero Section**: Animated introduction with floating blob backgrounds
- **About**: Professional overview with tech stack and statistics
- **Projects**: Interactive project cards with detailed modals
- **Education**: Timeline layout with institution information
- **GitHub**: Statistics display with contribution metrics
- **LinkedIn**: Professional network showcase with endorsements
- **Future Projects**: Roadmap-style project planning
- **Contact**: Professional contact form with social links

### Technical Features
- **Flask Backend**: Python web framework for routing and data handling
- **Responsive Design**: CSS Grid and Flexbox layouts
- **Interactive Modals**: Project detail popups with AJAX loading
- **Form Handling**: Contact form with validation and feedback
- **Theme Persistence**: Local storage for user preferences
- **Smooth Scrolling**: Custom navigation with active section highlighting

## 🚀 Installation & Setup

### Prerequisites
- Python 3.7 or higher
- pip (Python package installer)

### Installation Steps

1. **Clone the repository**
   \`\`\`bash
   git clone <repository-url>
   cd flask-luxury-portfolio
   \`\`\`

2. **Create virtual environment**
   \`\`\`bash
   python -m venv venv
   
   # On Windows
   venv\\Scripts\\activate
   
   # On macOS/Linux
   source venv/bin/activate
   \`\`\`

3. **Install dependencies**
   \`\`\`bash
   pip install -r requirements.txt
   \`\`\`

4. **Create required directories**
   \`\`\`bash
   mkdir static/images
   \`\`\`

5. **Add your images**
   - Add your profile photo as \`static/images/profile.jpg\`
   - Add about section image as \`static/images/about.jpg\`
   - Add project images as \`static/images/project1.jpg\`, \`project2.jpg\`, etc.
   - Add education logos as \`static/images/kiit-logo.png\`, \`nist-logo.png\`

6. **Run the application**
   \`\`\`bash
   python app.py
   \`\`\`

7. **Open in browser**
   Navigate to \`http://localhost:5000\`

## 📁 Project Structure

\`\`\`
flask-luxury-portfolio/
│
├── app.py                 # Main Flask application
├── requirements.txt       # Python dependencies
├── README.md             # Project documentation
│
├── templates/            # HTML templates
│   ├── base.html         # Base template with navigation
│   └── index.html        # Main portfolio page
│
├── static/               # Static files
│   ├── css/
│   │   └── style.css     # Main stylesheet
│   ├── js/
│   │   └── script.js     # JavaScript functionality
│   └── images/           # Image assets
│       ├── profile.jpg
│       ├── about.jpg
│       ├── project1.jpg
│       ├── project2.jpg
│       ├── project3.jpg
│       ├── kiit-logo.png
│       └── nist-logo.png
\`\`\`

## 🎨 Customization

### Personal Information
Edit the following in \`app.py\`:
- Update project data in \`projects_data\`
- Modify education information in \`education_data\`
- Change future projects in \`future_projects_data\`
- Update GitHub stats in \`github_stats\`

### Styling
- Modify CSS variables in \`static/css/style.css\` for colors and themes
- Update fonts by changing the Google Fonts imports
- Customize animations by modifying AOS settings

### Content
- Replace placeholder text in \`templates/index.html\`
- Update social media links and contact information
- Add your actual project images and descriptions

## 🔧 Configuration

### Environment Variables
Create a \`.env\` file for sensitive configuration:
\`\`\`
FLASK_ENV=development
SECRET_KEY=your-secret-key-here
MAIL_SERVER=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=your-email@gmail.com
MAIL_PASSWORD=your-app-password
\`\`\`

### Email Configuration (Optional)
To enable contact form email functionality, install Flask-Mail:
\`\`\`bash
pip install Flask-Mail
\`\`\`

Then update \`app.py\` with email configuration.

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🚀 Deployment

### Heroku Deployment
1. Create \`Procfile\`:
   \`\`\`
   web: python app.py
   \`\`\`

2. Update \`app.py\` for production:
   \`\`\`python
   if __name__ == '__main__':
       port = int(os.environ.get('PORT', 5000))
       app.run(host='0.0.0.0', port=port)
   \`\`\`

### Vercel Deployment
1. Create \`vercel.json\`:
   \`\`\`json
   {
     "version": 2,
     "builds": [
       {
         "src": "./app.py",
         "use": "@vercel/python"
       }
     ],
     "routes": [
       {
         "src": "/(.*)",
         "dest": "/"
       }
     ]
   }
   \`\`\`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **AOS Library**: For smooth scroll animations
- **Font Awesome**: For beautiful icons
- **Google Fonts**: For typography
- **Flask**: For the web framework

## 📞 Support

If you encounter any issues or have questions:
1. Check the documentation
2. Search existing issues
3. Create a new issue with detailed information

---

**Made with ❤️ and Python Flask**
\`\`\`
\`\`\`

This complete Flask portfolio website includes:

1. **Full Flask backend** with routing and data handling
2. **Premium CSS styling** with glassmorphism effects and animations
3. **Responsive design** that works perfectly on all devices
4. **Interactive JavaScript** for modals, forms, and animations
5. **Complete project structure** ready for local development
6. **Detailed documentation** for setup and customization

The website will work perfectly in your local VS Code environment with proper CSS rendering and all animations functioning smoothly. Just follow the installation steps in the README to get started!
