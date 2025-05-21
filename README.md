# Single-Page Portfolio Website

A modern, responsive portfolio website built with HTML, CSS, and JavaScript. This single-page application showcases a developer's skills, projects, and professional experience with elegant animations and interactive elements.

![Portfolio Website Screenshot](assets/img/Screenshot.png)

## Features

- **Modern Design**: Clean, professional layout with a boxed design (10px top/bottom, 15px left/right margins)
- **Responsive Layout**: Fully responsive design that works on all devices (mobile, tablet, desktop)
- **Interactive Elements**: 
  - Animated counters in the Client Stats section
  - Hover effects on cards and buttons
  - Smooth scrolling navigation
  - "Go to Top" button with smooth animation
- **Particle Background**: Modern particle animation effect in the hero section
- **3D Elements**: Wireframe globe as an interactive 3D object
- **Custom Favicon**: Unique SVG favicon with a stylized "P" design
- **Section-Based Layout**:
  - Hero section with animated background
  - About Me with skills and personal information
  - Education & Qualifications timeline
  - Services offered
  - Work Experience timeline
  - Portfolio showcase with filtering
  - Client Statistics with animated counters
  - Blog section
  - Testimonials slider with smooth transitions
  - Client logos with continuous scrolling animation
  - Contact form

## Technologies Used

- **HTML5**: Semantic markup for structure
- **CSS3/Tailwind CSS**: For styling and responsive design
- **JavaScript**: For interactivity and animations
- **GSAP**: GreenSock Animation Platform for smooth animations
- **ScrollTrigger**: For scroll-based animations
- **Anime.js**: For additional animation effects
- **Three.js**: For 3D elements and effects
- **Intersection Observer API**: For triggering animations when elements come into view

## File Structure

```
single-page-portfolio/
├── index.html              # Main HTML file
├── README.md               # Project documentation
├── assets/
│   ├── img/                # Images and screenshots
│   │   ├── Screenshot.png  # Website screenshot
│   │   └── favicon.png     # Website favicon
│   └── js/                 # JavaScript libraries
│       ├── ScrollTrigger.min.js
│       ├── anime.min.js
│       ├── galaxy-background.js
│       ├── gsap.min.js
│       ├── particles.min.js
│       ├── three.min.js
│       ├── vanta.rings.min.js
│       └── wireframe-globe.js
├── css/
│   └── style.css           # Custom CSS styles
└── js/
    └── main.js             # Main JavaScript file
```

## Key Components

### 1. Navigation

The website features a dark navbar that remains fixed at the top of the page. It includes links to all sections of the portfolio and maintains its appearance throughout scrolling.

### 2. Hero Section

The hero section includes:
- A modern particle background animation
- A professional introduction with animated text
- A call-to-action button

### 3. About Section

Provides information about the developer, including:
- Professional photo
- Personal introduction
- Key skills and expertise
- Social media links

### 4. Education & Experience

Displays the developer's educational background and work experience in an interactive timeline format.

### 5. Services Section

Showcases the services offered with descriptive cards and icons.

### 6. Portfolio Section

Features a gallery of projects with:
- Filtering capability by project type
- Hover effects for additional information
- Links to live demos and source code

### 7. Client Stats Section

Displays key statistics with animated counters:
- Number of happy clients
- Projects completed
- Hours of work
- Client satisfaction percentage

### 8. Blog Section

Showcases recent blog posts with:
- Featured images
- Publication dates
- Reading time estimates
- Brief descriptions

### 9. Testimonials Section

A slider showcasing client testimonials with profile pictures and quotes.

### 10. Contact Section

A contact form with validation for reaching out to the developer.

## Animation Features

The website includes several animation features:
- Fade-in animations for elements as they enter the viewport
- Counter animations for statistics
- Hover animations for interactive elements
- Particle animations in the background
- 3D object animations

## Browser Compatibility

The website is compatible with all modern browsers:
- Google Chrome
- Mozilla Firefox
- Safari
- Microsoft Edge

## Local Development

To run this project locally:

1. Clone the repository
2. Open the project folder in your code editor
3. Launch a local server (e.g., using Live Server in VS Code)
4. Open the website in your browser

## Customization

The portfolio is designed to be easily customizable:

- Update the personal information in the HTML
- Replace project images and descriptions
- Modify the color scheme in the Tailwind configuration
- Add or remove sections as needed

## Credits

- Tailwind CSS for the utility-first CSS framework
- GSAP for animations
- Three.js for 3D elements
- Anime.js for additional animations
- Font Awesome for icons
- Google Fonts for typography

## License

This project is available for personal and commercial use.

## Recent Updates

### May 21, 2025

1. **"Go to Top" Button Improvements**:
   - Fixed hanging issues during scrolling by optimizing the scroll functionality with `requestAnimationFrame`
   - Added a smooth bounce animation when reaching the top
   - Improved visibility transitions using inline styles

2. **Custom Favicon**:
   - Added a new creative SVG favicon with a stylized "P" design
   - Included PNG fallback for compatibility with older browsers

3. **Client Stats Section**:
   - Implemented animated counters using the IntersectionObserver API
   - Added smooth animation that increments numbers to their target values
   - Optimized performance by only triggering animations when elements are visible

4. **Testimonials Slider**:
   - Enhanced the testimonial slider with smooth transitions between items
   - Added auto-rotation feature that pauses on hover
   - Improved navigation controls for better user experience

5. **Client Logo Section**:
   - Implemented continuous horizontal scrolling animation
   - Added hover effects that pause the animation and highlight the logo
   - Optimized for performance with CSS animations
