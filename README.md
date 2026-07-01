# ALPHAS Landing Page

A super animated, modern landing page for ALPHAS Digital Business Solutions with comprehensive GSAP animations and Formspree CMS integration.

## Features

- **Super Animated Design**: Comprehensive GSAP scroll animations across all sections
- **Glassmorphism UI**: Modern glass-effect cards with hover interactions
- **Responsive Layout**: Fully responsive design for all devices
- **CMS Integration**: Formspree integration for form submission management
- **Interactive Elements**: 
  - Animated hero section with floating effects
  - Interactive workflow nodes
  - Portfolio filtering system
  - Dynamic pricing calculator
  - Animated success graph

## CMS Setup (Formspree)

To manage form submissions through a CMS, you need to set up Formspree:

### Step 1: Create a Formspree Account
1. Go to [formspree.io](https://formspree.io)
2. Sign up for a free account
3. Verify your email address

### Step 2: Create a New Form
1. Click "New Form" in your dashboard
2. Choose a form name (e.g., "ALPHAS Consultation")
3. Select the free plan (up to 50 submissions/month)
4. Copy your Form ID from the form settings

### Step 3: Update the HTML File
1. Open `alphas_portfolio_landing_page.html`
2. Find the form tags (around lines 901 and 992)
3. Replace `YOUR_FORM_ID` with your actual Formspree Form ID

**Example:**
```html
<!-- Before -->
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">

<!-- After (replace with your actual ID) -->
<form action="https://formspree.io/f/abc123xyz" method="POST">
```

### Step 4: Configure Formspree Settings
1. In Formspree dashboard, go to your form settings
2. Add your email address to receive submissions
3. Set up email notifications
4. Customize the thank you page if desired
5. Enable spam protection (recommended)

### Step 5: Test the Form
1. Open the landing page in your browser
2. Fill out the contact form
3. Submit the form
4. Check your Formspree dashboard for the submission
5. Verify you received the email notification

## Managing Submissions

Once set up, you can:
- View all form submissions in the Formspree dashboard
- Export submissions to CSV
- Set up automated email notifications
- Integrate with other tools (Zapier, Google Sheets, etc.)
- Filter and search submissions
- Add team members for collaboration

## Animations Overview

### Hero Section
- Fade-in text with staggered animations
- Floating glass card with continuous animation
- Pulsing glow effects
- Counter animations for statistics

### Scroll Animations
- **About Section**: Slide-in from left/right
- **Services**: Staggered card reveals
- **Workflow**: Bouncy node animations
- **Approach**: Staggered pillar cards
- **Portfolio**: Staggered item reveals
- **Why Us**: Card fade-ins
- **Success**: Split-screen slide animations
- **Contact**: Scale-up form reveal

### Micro-interactions
- Hover effects on all cards (lift + glow)
- Interactive workflow node selection
- Portfolio category filtering
- Dynamic pricing calculator
- Mobile menu drawer
- Consultation drawer panel

## Customization

### Colors
Edit the Tailwind config in the HTML file (lines 11-35):
```javascript
colors: {
    alphas: {
        navy: '#0a1122',
        dark: '#060a14',
        accent: '#e59b58',
        accentHover: '#c97e3a',
        goldLight: '#f5d6b8',
        glass: 'rgba(255, 255, 255, 0.04)',
        glassBorder: 'rgba(255, 255, 255, 0.09)'
    }
}
```

### Animations
Adjust animation timing in the JavaScript section (lines 1013-1250):
- Change `duration` values for speed
- Modify `stagger` values for timing
- Adjust `ease` functions for different effects

## File Structure

```
Alphas Website/
├── alphas_portfolio_landing_page.html  # Main landing page
├── English Alphas Portfolio (1).pdf   # Company profile reference
└── README.md                          # This file
```

## Deployment

### Static Hosting
This is a pure HTML/CSS/JS file and can be hosted on:
- Netlify (drag and drop)
- Vercel
- GitHub Pages
- Any static hosting service

### No Build Required
Simply upload the HTML file - no build process needed!

## Browser Compatibility

- Chrome/Edge (recommended)
- Firefox
- Safari
- Mobile browsers (iOS Safari, Chrome Mobile)

## Support

For Formspree support: [formspree.io/docs](https://formspree.io/docs)

---

**Note**: Replace `YOUR_FORM_ID` in the HTML file with your actual Formspree form ID to enable form submission management.
