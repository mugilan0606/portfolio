# Mugilan Arulvanan - Portfolio Website

A modern, responsive portfolio website built with React and TypeScript, showcasing professional experience, projects, education, publications, and skills.

![Portfolio Preview](intro.jpg)

## 🚀 Features

- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Modern UI**: Clean and professional interface with smooth animations
- **Sections Include**:
  - Hero/Landing page with introduction
  - Work Experience timeline
  - Projects showcase
  - Skills categorization
  - Education timeline
  - Publications list
  - Medium blog integration (optional)

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- Yarn package manager
- Git

## 🛠️ Installation

1. **Clone or extract the repository**
```bash
cd portfolio-react-app-customized
```

2. **Install dependencies**
```bash
yarn install
```

3. **Start the development server**
```bash
yarn start
```

The application will open at [http://localhost:3000](http://localhost:3000)

## 📝 Customization Guide

### 1. Personal Information & Links

**File**: `src/constants/links.json`

Update your personal links:
```json
{
    "social": {
        "resume": "YOUR_RESUME_GOOGLE_DRIVE_LINK_OR_URL",
        "github": "https://github.com/your-username",
        "linkedin": "https://linkedin.com/in/your-profile",
        "email": "your.email@example.com",
        "phone": "+1234567890"
    }
}
```

### 2. Hero Section

**File**: `src/pages/home/components/hero/hero.section.tsx`

- Line 25: Update your name
- Lines 26-32: Update your introduction paragraph
- Line 95: Update the profile image alt text

**Profile Image**: Replace `public/Hero.jpg` with your own photo

### 3. Work Experience

**File**: `public/locales/en/experience.json`

Update with your work experience details. The structure is:
```json
{
    "companyKey": {
        "0": "First achievement/responsibility",
        "1": "Second achievement/responsibility",
        ...
    }
}
```

**File**: `src/pages/home/components/experience/experience.section.tsx`

Update the experiencesList array (lines 20-75) with your companies:
```typescript
{
    title: 'Company Name',
    type: 'On-Site/Remote/Hybrid',
    position: 'Your Position',
    location: 'City, Country',
    date: 'Start Date - End Date',
    translation_key: 'companyKey',
    objectives: companyObjectives,
}
```

### 4. Projects

**File**: `src/pages/projects/index.tsx`

Update the projectsList array with your projects:
```typescript
{
    title: 'Project Name',
    description: 'Project description',
    technologies: ['Tech1', 'Tech2', ...],
    features: ['Feature 1', 'Feature 2', ...],
    github: 'github-repo-url' (optional),
    demo: 'live-demo-url' (optional)
}
```

### 5. Education

**File**: `src/pages/education/index.tsx`

Update the educationList array with your academic background:
```typescript
{
    degree: 'Your Degree',
    institution: 'University Name',
    location: 'City, Country',
    duration: 'Start - End',
    gpa: '3.87/4.0' (optional),
    coursework: ['Course 1', 'Course 2', ...]
}
```

### 6. Publications

**File**: `src/pages/publications/index.tsx`

Update the publicationsList array with your research papers:
```typescript
{
    title: 'Publication Title',
    venue: 'Conference/Journal Name',
    date: 'Publication Date',
    location: 'City, Country',
    doi: 'DOI Number' (optional),
    link: 'Publication URL' (optional)
}
```

### 7. Skills

**File**: `src/pages/skills/index.tsx`

Update the skillCategories array with your technical skills. You can add or remove categories and skills as needed.

### 8. Website Metadata

**File**: `public/index.html`

Update:
- `<title>` tag (line ~7)
- Meta description
- Meta keywords
- Other SEO-related tags

**File**: `public/manifest.json`

Update the app name and description

### 9. Favicon

Replace the following files in the `public` folder with your own:
- `favicon.ico`
- `favicon-16x16.png`
- `favicon-32x32.png`
- `apple-touch-icon.png`
- `android-chrome-192x192.png`
- `android-chrome-512x512.png`

## 🎨 Styling Customization

### Colors

**File**: `src/styles/variables.scss`

Modify CSS variables to change the color scheme:
```scss
--color-primary: #00d4ff;
--color-background: #0f0f1e;
--color-text-primary: #ffffff;
// ... other colors
```

### Fonts

**File**: `src/index.css` or `src/styles/index.scss`

Import and set your preferred fonts.

## 🚀 Deployment

### Deploy to GitHub Pages

1. **Update package.json**:
```json
{
  "homepage": "https://your-username.github.io/repository-name"
}
```

2. **Install gh-pages**:
```bash
yarn add -D gh-pages
```

3. **Add deployment scripts** (already included):
```json
{
  "scripts": {
    "predeploy": "yarn build",
    "deploy": "gh-pages -d build"
  }
}
```

4. **Deploy**:
```bash
yarn deploy
```

### Deploy to Netlify

1. Build the project: `yarn build`
2. Drag and drop the `build` folder to Netlify
3. Or connect your GitHub repository to Netlify for automatic deployments

### Deploy to Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the prompts

## 📦 Build for Production

```bash
yarn build
```

This creates an optimized production build in the `build` folder.

## 🧪 Running Tests

```bash
yarn test
```

## 📄 Project Structure

```
portfolio-react-app-customized/
├── public/
│   ├── locales/          # Translation files
│   ├── Hero.jpg          # Profile image
│   └── index.html
├── src/
│   ├── components/       # Reusable components
│   ├── constants/        # Configuration files
│   ├── icons/           # Icon components
│   ├── pages/           # Page components
│   │   ├── home/
│   │   ├── projects/
│   │   ├── education/
│   │   ├── publications/
│   │   └── skills/
│   ├── styles/          # Global styles
│   └── index.tsx
└── package.json
```

## 🔧 Available Scripts

- `yarn start` - Run development server
- `yarn build` - Build for production
- `yarn test` - Run tests
- `yarn deploy` - Deploy to GitHub Pages

## 🤝 Contributing

This is a personal portfolio template. Feel free to fork and customize it for your own use!

## 📝 License

This project is open source and available under the MIT License.

## 💡 Tips

1. **Keep it Updated**: Regularly update your projects, experience, and skills
2. **Add Images**: Include screenshots for your projects
3. **SEO Optimization**: Update meta tags for better search engine visibility
4. **Performance**: Optimize images before adding them
5. **Mobile First**: Always test on mobile devices
6. **Analytics**: Consider adding Google Analytics to track visitors

## 🐛 Troubleshooting

### Port already in use
```bash
# Kill the process on port 3000
lsof -ti:3000 | xargs kill -9
# Or use a different port
PORT=3001 yarn start
```

### Build fails
```bash
# Clear cache and reinstall
rm -rf node_modules yarn.lock
yarn install
```

## 📞 Support

For questions or issues:
- Email: marulvanan@umass.edu
- GitHub: [Your GitHub Profile]
- LinkedIn: [Your LinkedIn Profile]

## 🙏 Acknowledgments

- Original template by [amirzenoozi](https://github.com/amirzenoozi)
- Icons by [@icon-park/react](https://www.npmjs.com/package/@icon-park/react)
- Built with [Create React App](https://create-react-app.dev/)

---

**Made with ❤️ by Mugilan Arulvanan**
