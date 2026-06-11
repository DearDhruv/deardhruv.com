# 🎯 Single-Page Portfolio Guide

## Overview

Your new **single-page portfolio** is a modern, high-converting landing page designed specifically for Senior Android Engineers and Mobile Tech Leads. It showcases your expertise, leadership, and
projects in a clean, scannable format that hiring managers and recruiters love.

**Access it at:** `https://deardhruv.com/portfolio.html`

---

## ✨ What's Included

### 1. **Navigation Bar (Sticky)**

- Fixed header with your name branded as "DP | Tech Lead"
- Smooth scroll links to all sections
- Contact button always visible
- Highlights active section on scroll

### 2. **Hero Section - The Hook**

- **Headline:** "Senior Android Engineer & Mobile Tech Lead"
- **Sub-headline:** Leadership + technical expertise combined
- **CTAs:** "View My Apps" and "Contact Me" buttons
- **Quick Stats:** 14+ years, 50+ apps, Growth mindset
- **Visual:** Animated phone mockup with code elements

### 3. **Technical Arsenal - Tech Stack**

Four organized categories (no generic progress bars):

- **Languages & UI:** Kotlin, Java, Jetpack Compose, XML
- **Architecture:** MVVM, Clean Architecture, MVI, Coroutines, Flow, RxJava
- **Tooling & CI/CD:** Gradle, GitHub Actions, Firebase, Fastlane, Bitrise
- **Testing & QA:** Espresso, JUnit, Mockk, Detox, Kotest

### 4. **Featured Mobile Projects - The Proof**

Four showcase projects with:

- **Visual header** with gradient background
- **Metrics:** Downloads, crash-free rate, team size
- **Your role:** Clear description of what you did
- **Achievements:** 3-4 bullet points showing impact
- **Tech stack tags:** Technologies used
- **CTA buttons:** Play Store links, case studies, GitHub repos

**Projects Included:**

1. Digital Commerce Platform (500K+ Downloads)
2. Multimedia Editing Suite (Performance optimization)
3. Hardware Integration Layer (15+ Devices)
4. Legacy Migration & Modernization (Team leadership)

### 5. **Leadership & Experience Timeline**

- Vertical timeline layout with visual indicators
- **Current:** Lead Android Engineer @ Impact Commerce (2022-Present)
- **Recent:** Senior Android Developer (2019-2022)
- **Earlier:** Foundation years (2010-2019)
- Each role includes mentorship, process improvements, and achievements

### 6. **Open Source & Community**

Three cards highlighting:

- **Active Contributor:** 500+ stars, 100+ contributions
- **Technical Writing:** 15+ articles, 10K+ readers
- **Speaking:** 20+ conference talks, 5+ countries

### 7. **Contact Section**

- Call-to-action text
- Email button
- LinkedIn link
- Social media icons (GitHub, Twitter, LinkedIn, Instagram)

### 8. **Footer**

- Copyright info
- Quick social media links

---

## 🎨 Design Features

### Color Scheme

- **Primary Background:** Deep slate (#0f172a)
- **Card Background:** Medium slate (#1e293b)
- **Accent Colors:** Kotlin purple (#7F52FF) + Android green (#3DDC84)
- **Text:** Clean white and slate grays

### Typography

- **Font:** Inter (Google Fonts) - clean, modern, professional
- **Code:** Roboto Mono (monospace)

### Interactive Elements

- **Smooth hover effects** on cards and links
- **Animated underlines** on nav links
- **Floating animation** on hero phone mockup
- **Gradient text** for emphasis
- **Smooth scrolling** between sections
- **Responsive design** that works on all devices

### Mobile-First Responsive

- Desktop: 2-column layouts
- Tablet: Optimized spacing
- Mobile: Stacked layouts, readable text

---

## 🚀 How to Use

### View It Locally

```bash
cd /Users/DPT/DearDhruv/Android/deardhruv/git/deardhruv_com

# Build and serve
hugo server

# Visit: http://localhost:1313/portfolio.html
```

### View It Live

Once deployed:

```
https://deardhruv.com/portfolio.html
```

---

## ✏️ How to Customize

### Update Project Details

Edit the project cards in `static/portfolio.html`:

```html
<!-- Find this section around line 380 -->
<h3 class="text-2xl font-bold text-white">Digital Commerce Platform</h3>
<p class="text-slate-300 text-sm">Your project description...</p>

<!-- Update the achievements -->
<p class="text-sm text-slate-300">Led team of X to...</p>

<!-- Update tech stack -->
<span class="text-xs bg-purple-900 text-purple-200 px-2 py-1 rounded-full">Kotlin</span>
```

### Update Experience Timeline

Edit around line 550:

```html
<h3 class="text-2xl font-bold text-white">Lead Android Engineer</h3>
<p class="text-purple-400 font-semibold">Your Company Name</p>
<p class="text-slate-400 text-sm md:text-right">2022 - Present</p>
```

### Change Social Links

Search for all social profile links:

- GitHub: `https://github.com/DearDhruv`
- LinkedIn: `https://www.linkedin.com/in/deardhruv/`
- Twitter: `https://twitter.com/DearDhruv`
- Instagram: `https://instagram.com/deardhruv`

### Add Your Resume

Update the "Download Resume" button (once implemented):

```html
<a href="/resume.pdf" class="btn-primary">
    <i class="fas fa-file-pdf mr-2"></i>Download Resume
</a>
```

---

## 🔗 Integration with Your Hugo Site

The single-page portfolio **lives alongside** your existing Hugo site:

```
deardhruv.com/              → Hugo home (multi-page portfolio)
deardhruv.com/portfolio/    → Hugo Portfolio page
deardhruv.com/projects/     → Hugo Projects page
deardhruv.com/about/        → Hugo About page
deardhruv.com/posts/        → Blog
─────────────────────────────────────────────────────
deardhruv.com/portfolio.html → Single-page (NEW!)
```

Both exist side-by-side. They serve different purposes:

- **Hugo multi-page:** Blog integration, sitemap, RSS, SEO-friendly
- **Single-page HTML:** High-converting landing page for recruiters/hiring managers

---

## 📊 What Makes This Effective for Tech Leads

✅ **Business Impact Focus:** Shows metrics (downloads, crash-free rates), not just features  
✅ **Leadership Highlighted:** Mentorship, process improvements, team sizes mentioned  
✅ **Architecture Articulation:** Clear tech stack categories show system design thinking  
✅ **No Boiler Plate:** Zero filler content - every word persuades  
✅ **Mobile Optimized:** Designed for scrolling on phones (where recruiters browse)  
✅ **Fast Loading:** Single HTML file, minimal dependencies, no build needed  
✅ **Print Friendly:** Can be saved as PDF for sharing  
✅ **SEO Friendly:** Meta tags, semantic HTML, readable structure

---

## 🎯 Next Steps

1. **Test Locally:**
   ```bash
   hugo server
   # Visit: http://localhost:1313/portfolio.html
   ```

2. **Share the Link:**
    - LinkedIn profile → https://deardhruv.com/portfolio.html
    - Resume/CV → Link to this page
    - Email signature → "Check out my portfolio"

3. **Customize (Optional):**
    - Add your actual resume download link
    - Update project links and descriptions
    - Add your specific achievements and metrics

4. **Deploy:**
   ```bash
   git add static/portfolio.html
   git commit -m "Add single-page portfolio for tech leads"
   git push
   # Netlify will auto-deploy
   ```

---

## 🎨 Design Philosophy

This portfolio follows the **"Dark Mode IDE"** vibe you appreciated:

- Deep charcoal/slate backgrounds
- Syntax-highlighted accent colors (Kotlin purple + Android green)
- Technical, clean aesthetic
- Feels like a premium mobile app
- Immediately signals expertise to other engineers

---

## 📈 Why This Works

1. **Hiring managers spend 6 seconds** on a portfolio initially
    - This layout is optimized for instant understanding
    - Hero section delivers your value prop immediately
    - Projects prove your skills with metrics

2. **Tech leads are promoted managers**
    - Explicitly shows mentorship, process improvements
    - Demonstrates system thinking beyond coding
    - Proves impact on teams and organizations

3. **Single page = Focus**
    - No distractions, no navigation fatigue
    - Everything a recruiter needs in one scroll
    - Mobile-friendly (80% of recruiters browse on phones)

4. **Social proof**
    - GitHub stars, article readers, conference talks
    - Shows you're active in the community
    - Builds credibility beyond job titles

---

## 🚀 You're All Set!

Your single-page portfolio is ready to capture the attention of hiring managers, recruiters, and technical collaborators. It's a beautiful, focused representation of your expertise as a Senior Android
Engineer and Mobile Tech Lead.

**Next time someone asks for your portfolio, send them:** `https://deardhruv.com/portfolio.html`

Happy coding! 🎉

