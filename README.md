# Harshith M - Premium Portfolio Website

A production-grade, animated portfolio website built with **Next.js 15**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**.

## 🎯 Features

- **Animated Hero Section** with dynamic role rotation
- **Smooth Scroll Animations** with Framer Motion
- **Responsive Design** optimized for all devices
- **Dark Mode** with premium gradient backgrounds
- **SEO Optimized** with metadata and OpenGraph tags
- **Performance Optimized** with code splitting and lazy loading
- **Accessible** with semantic HTML and ARIA attributes
- **Interactive Components** with hover effects and transitions
- **Scroll Progress Bar** with gradient colors
- **Back-to-Top Button** with smooth scrolling
- **Active Navigation Highlight** based on scroll position

## 📂 Project Structure

```
├── app/
│   ├── components/
│   │   ├── About.tsx
│   │   ├── Achievements.tsx
│   │   ├── BackToTop.tsx
│   │   ├── Contact.tsx
│   │   ├── Experience.tsx
│   │   ├── Footer.tsx
│   │   ├── Hero.tsx
│   │   ├── Navbar.tsx
│   │   ├── Projects.tsx
│   │   ├── ScrollProgress.tsx
│   │   └── Skills.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── lib/
│   └── data.ts
├── types/
│   └── index.ts
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── postcss.config.js
├── next.config.js
└── README.md
```

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animation**: [Framer Motion](https://www.framer.com/motion/)
- **Package Manager**: npm or yarn

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Clone the repository** (or navigate to the project directory)

```bash
cd portfolio-website
```

2. **Install dependencies**

```bash
npm install
```

Or with yarn:

```bash
yarn install
```

3. **Start the development server**

```bash
npm run dev
```

Or with yarn:

```bash
yarn dev
```

4. **Open in browser**

Navigate to [http://localhost:3000](http://localhost:3000) to see your portfolio!

### Build for Production

```bash
npm run build
npm start
```

Or with yarn:

```bash
yarn build
yarn start
```

## 📝 Customization

### Update Personal Information

Edit `lib/data.ts` to customize:

```typescript
export const personalInfo = {
  name: 'Your Name',
  title: 'Your Title',
  bio: 'Your bio',
  email: 'your@email.com',
  socials: {
    github: 'https://github.com/yourusername',
    linkedin: 'https://linkedin.com/in/yourprofile',
    leetcode: 'https://leetcode.com/yourprofile',
  },
};
```

### Update Skills, Projects, and Experience

All content is managed in `lib/data.ts`:

- `skills` - Your technical skills
- `projects` - Your portfolio projects
- `experience` - Your work experience and education
- `achievements` - Your achievements and certifications
- `about` - Your about section content

### Customize Colors

Edit `tailwind.config.ts` to change accent colors:

```typescript
accent: {
  primary: '#00d9ff',    // Cyan
  secondary: '#7c3aed',  // Purple
  tertiary: '#ec4899',   // Pink
},
```

### Modify Animations

Framer Motion animations are configured in individual components. Adjust:

- Animation timing (duration, delay)
- Spring effects
- Stagger effects
- Variants for different states

## 🎨 Design System

### Color Palette

- **Dark Background**: `#0f0f0f` to `#2a2a2a`
- **Primary Accent**: `#00d9ff` (Cyan)
- **Secondary Accent**: `#7c3aed` (Purple)
- **Tertiary Accent**: `#ec4899` (Pink)
- **Text**: Grayscale from `#808080` to `#f0f0f0`

### Typography

- **Headings**: 600-700 font weight
- **Body**: 400-500 font weight
- **Line Height**: 1.2 (headings), 1.6 (body)

### Spacing

Using Tailwind's default scale (4px base unit) with custom extensions in the config.

## 📱 Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

All components are mobile-first and fully responsive.

## ♿ Accessibility

- **Semantic HTML** for screen readers
- **ARIA labels** on interactive elements
- **Keyboard navigation** support
- **Focus styles** for accessibility
- **Color contrast** meets WCAG AA standards
- **Form labels** properly associated with inputs

## 🔍 SEO

The site includes:

- Metadata tags (title, description, keywords)
- OpenGraph tags for social sharing
- Twitter Card tags
- Sitemap-ready structure
- Semantic HTML markup
- Mobile-friendly meta viewport
- Canonical URLs

## 📊 Performance

- **Code Splitting**: Automatic via Next.js
- **Image Optimization**: Next.js Image component ready
- **CSS-in-JS**: Tailwind's minimal CSS output
- **Animation Performance**: GPU-accelerated Framer Motion
- **Lazy Loading**: IntersectionObserver for scroll animations

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push to GitHub
2. Connect to Vercel
3. Auto-deploy on push

```bash
npm run build
```

### Deploy to Other Platforms

The site is a static Next.js app and can be deployed to:

- Netlify
- GitHub Pages
- AWS Amplify
- Any static hosting platform

## 📄 Environment Variables

No environment variables are required for the basic setup. All data is configured in `lib/data.ts`.

For optional features (like backend contact form), add environment variables in `.env.local`:

```bash
cp .env.example .env.local
```

## 🤝 Contributing

Feel free to fork and customize this portfolio template for your own use.

## 📄 License

MIT License - feel free to use this template for your portfolio.

## 👨‍💻 Author

**Harshith M**

- GitHub: [@harshith-murali](https://github.com/harshith-murali)
- LinkedIn: [harshith-m-dev](https://linkedin.com/in/harshith-m-dev)
- LeetCode: [geekycoder11](https://leetcode.com/u/geekycoder11)
- Email: mharshith200@gmail.com

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing framework
- [Tailwind CSS](https://tailwindcss.com/) for utility-first CSS
- [Framer Motion](https://www.framer.com/motion/) for smooth animations
- Inspired by award-winning design practices from Awwwards

---

**Built with ❤️ using Next.js, TypeScript, and Framer Motion**
