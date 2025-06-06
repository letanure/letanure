# Personal Blog

A modern, fast, and SEO-friendly personal blog built with Next.js 15, MDX, and Tailwind CSS.

## Features

- 🚀 Built with Next.js 15.3.3 and App Router
- 📝 MDX for content with syntax highlighting (next-mdx-remote 4.0.0-rc.2)
- 🎨 Tailwind CSS 4.1.8 for styling
- 🔍 SEO optimized
- 🌙 Dark mode support
- 📱 Responsive design
- 🏷️ Tag system for content organization
- 📊 GitHub Actions for content validation
- 🌐 Internationalization (i18n) support with centralized translations

## Project Structure

```
blog/
├── src/
│   ├── app/                 # Next.js app router pages
│   ├── components/          # React components
│   ├── utils/              # Utility functions
│   ├── content/            # Static content (JSON)
│   ├── i18n/               # Internationalization
│   └── posts/             # Blog posts (MDX files)
├── public/                 # Static assets
└── content/               # Blog posts (MDX files)
```

## Prerequisites

- Node.js 20 or later
- npm or yarn
- TypeScript 5.0 or later

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/letanure/letanure.git
   cd your-repo/blog
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```

## Development

Run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Content Management

### Blog Posts

Blog posts are written in MDX format and stored in the `content/posts` directory. Each post should include the following frontmatter:

```mdx
---
title: Your Post Title
date: YYYY-MM-DD
summary: A brief description of your post
tags: [tag1, tag2, tag3]
---

Your content here...
```

### Static Content

Static content (like About, Now, and Projects pages) is stored in JSON format in `src/content/json/`. Each page should have a corresponding JSON file:

- `about.en.json`
- `now.en.json`
- `projects.en.json`

## Building for Production

```bash
npm run build
# or
yarn build
```

## Deployment

The blog can be deployed to any platform that supports Next.js applications. Some recommended options:

- [Vercel](https://vercel.com) (recommended)
- [Netlify](https://netlify.com)
- [Railway](https://railway.app)

## Content Validation

The project includes GitHub Actions for content validation:

- Frontmatter validation
- Markdown linting
- Link checking
- Tag validation

These checks run automatically on pull requests and pushes to the main branch.

## Customization

### Styling

The blog uses Tailwind CSS for styling. You can customize the theme by modifying:

- `tailwind.config.js` for theme configuration
- `src/app/globals.css` for global styles

### Components

Custom components can be added in the `src/components` directory. The main components are:

- `MDXContent`: Renders MDX content with syntax highlighting
- `TagCounts`: Displays tags with post counts

## Dependencies

### Core Dependencies
- Next.js 15.3.3
- React 18.3.1
- next-mdx-remote 4.0.0-rc.2
- rehype-prism-plus 2.0.1
- prismjs 1.30.0
- Tailwind CSS 4.1.8

### Development Dependencies
- TypeScript 5
- ESLint 9
- @types/react 19
- @types/react-dom 19
- @types/node 20.17.57

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Next.js](https://nextjs.org)
- [Tailwind CSS](https://tailwindcss.com)
- [MDX](https://mdxjs.com)
- [rehype-prism-plus](https://github.com/timlrx/rehype-prism-plus)

## Internationalization (i18n)

The blog uses a centralized i18n system for managing all text content. This makes it easy to:
- Maintain consistent text across the site
- Add support for multiple languages
- Update text content in one place

### Translation Structure

Translations are organized in the `src/i18n` directory:

```typescript
// src/i18n/en.ts
export const en = {
  // Site metadata
  site: {
    name: "Your Name",
    title: "Your Name - Personal Blog",
    description: "A personal blog about...",
  },

  // Navigation
  nav: {
    home: "Home",
    blog: "Blog",
    about: "About",
    now: "Now",
    projects: "Projects",
  },

  // Blog
  blog: {
    title: "Blog",
    description: "Read my latest blog posts...",
    readMore: "Read more",
    publishedOn: "Published on",
    tags: "Tags",
  },

  // Other sections...
};
```

### Using Translations

1. **In Pages and Components**:
```typescript
import { getTranslation } from "@/i18n";

const t = getTranslation();

// Use translations
<h1>{t.blog.title}</h1>
```

2. **With Dynamic Content**:
```typescript
// Format messages with parameters
const message = t.formatMessage(t.tags.title, { tag: "javascript" });
```

3. **In Metadata**:
```typescript
export const metadata: Metadata = generateSiteMetadata({
  title: t.blog.title,
  description: t.blog.description,
  path: "/blog",
});
```

### Adding New Languages

1. Create a new translation file (e.g., `es.ts`) in the `src/i18n` directory
2. Add the language to the `Language` type in `src/i18n/index.ts`
3. Add the translations to the `translations` object
