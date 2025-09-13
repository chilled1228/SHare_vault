import { BlogService } from '@/lib/blog-service'
import { BlogPost } from '@/types/blog'

const samplePosts: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'>[] = [
  {
    slug: 'future-web-development-trends-2025',
    title: "The Future of Web Development: Trends to Watch in 2025",
    content: `Web development is evolving at an unprecedented pace. In 2025, we're seeing several key trends that are reshaping how we build applications:

1. **AI-Powered Development**: Tools like GitHub Copilot are becoming essential for developers, providing intelligent code suggestions and automating repetitive tasks.

2. **WebAssembly (WASM) Adoption**: More applications are leveraging WASM for near-native performance in the browser, especially for complex computations and gaming.

3. **Serverless Architecture**: The shift towards serverless continues, with platforms like Vercel, Netlify, and Firebase Functions making it easier to build scalable applications without managing servers.

4. **JAMstack Evolution**: The JAMstack (JavaScript, APIs, Markup) approach is maturing with better tooling and frameworks that make static site generation more powerful.

5. **Micro-Frontends**: Organizations are adopting micro-frontend architectures to enable independent development and deployment of application features.

As developers, staying current with these trends is crucial for building modern, efficient web applications that meet user expectations.`,
    excerpt: "Dive deep into the latest web development trends shaping 2025, from AI-powered coding to WebAssembly and serverless architecture.",
    authorId: "demo-user-1",
    authorName: "Sarah Johnson",
    category: "Web Development",
    tags: ["trends", "AI", "WASM", "serverless"],
    featured: true,
    published: true,
    imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop&crop=entropy",
    readTime: 8
  },
  {
    slug: 'mastering-react-server-components-guide',
    title: "Mastering React Server Components: A Complete Guide",
    content: `React Server Components (RSC) represent a paradigm shift in how we build React applications. Let's explore the key concepts:

## What are Server Components?

Server Components are a new type of component that runs exclusively on the server. They offer several benefits:

- **Zero Bundle Size**: Server components aren't included in the client-side JavaScript bundle
- **Direct Database Access**: They can directly access databases and file systems
- **Better SEO**: Content is rendered on the server, improving search engine optimization
- **Improved Performance**: Reduced client-side JavaScript leads to faster load times

## Key Differences from Client Components

Server Components:
- Cannot use hooks or state
- Cannot use browser APIs
- Can access server-side resources directly
- Are always asynchronous

Client Components:
- Can use all React features
- Run in the browser
- Can handle user interactions
- Have access to browser APIs

## Best Practices

1. **Use Server Components for Static Content**: Ideal for content that doesn't change often
2. **Client Components for Interactive UI**: Use for components that need state or effects
3. **Component Composition**: Mix and match server and client components effectively
4. **Data Fetching**: Fetch data as close to the component as possible

This architectural pattern is transforming how we think about React application development.`,
    excerpt: "Learn everything about React Server Components, from basic concepts to advanced patterns and best practices for modern web development.",
    authorId: "demo-user-2", 
    authorName: "Alex Chen",
    category: "React",
    tags: ["React", "Server Components", "JavaScript", "Performance"],
    featured: true,
    published: true,
    imageUrl: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=600&fit=crop&crop=entropy",
    readTime: 12
  },
  {
    slug: 'building-accessible-web-applications-guidelines',
    title: "Building Accessible Web Applications: Essential Guidelines",
    content: `Web accessibility isn't just a requirement—it's a fundamental aspect of creating inclusive digital experiences. Here's how to build truly accessible applications:

## Semantic HTML

Always use appropriate HTML elements for their intended purpose:

\`\`\`html
<!-- Good -->
<nav aria-label="Main navigation">
  <ul>
    <li><a href="/home">Home</a></li>
    <li><a href="/about">About</a></li>
  </ul>
</nav>

<!-- Bad -->
<div class="nav">
  <div onclick="goToHome()">Home</div>
  <div onclick="goToAbout()">About</div>
</div>
\`\`\`

## Keyboard Navigation

Ensure all interactive elements are keyboard accessible:

- Tab order should be logical
- Focus indicators should be visible
- Provide keyboard shortcuts where helpful

## Color and Contrast

- Maintain sufficient contrast ratios (4.5:1 for normal text)
- Don't rely solely on color to convey information
- Provide alternative visual cues

## Screen Reader Support

- Use ARIA labels and attributes when necessary
- Provide descriptive alt text for images
- Ensure form elements have proper labels

## Testing Tools

Leverage these tools to test accessibility:

- **WAVE Web Accessibility Evaluator**: Browser extension for quick checks
- **axe DevTools**: Comprehensive testing tool
- **Screen Readers**: Test with NVDA, VoiceOver, or JAWS
- **Color Contrast Analyzers**: Verify color combinations

By following these guidelines, you'll create applications that work for everyone, regardless of their abilities.`,
    excerpt: "Discover essential web accessibility guidelines and practical techniques to create inclusive digital experiences for all users.",
    authorId: "demo-user-3",
    authorName: "Emily White", 
    category: "Accessibility",
    tags: ["accessibility", "a11y", "WCAG", "inclusive design"],
    featured: true,
    published: true,
    imageUrl: "https://images.unsplash.com/photo-1559028006-448665bd7c7f?w=800&h=600&fit=crop&crop=entropy",
    readTime: 10
  },
  {
    slug: 'css-grid-vs-flexbox-layout-systems',
    title: "CSS Grid vs Flexbox: When to Use Which Layout System",
    content: `Understanding when to use CSS Grid versus Flexbox is crucial for modern web layouts. Let's break down the differences:

## CSS Grid: Two-Dimensional Layouts

Use Grid when you need to control both rows and columns:

\`\`\`css
.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto;
  gap: 1rem;
}
\`\`\`

**Best for:**
- Page layouts
- Complex grid systems
- Overlapping elements
- Precise placement of items

## Flexbox: One-Dimensional Layouts

Use Flexbox for arranging items in a single direction:

\`\`\`css
.flex-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
\`\`\`

**Best for:**
- Navigation bars
- Form layouts
- Centering items
- Responsive components

## Combined Approach

The most powerful layouts often use both:

\`\`\`css
.page {
  display: grid;
  grid-template-areas: 
    "header header"
    "sidebar main"
    "footer footer";
}

.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
\`\`\`

## Decision Framework

Ask yourself:

1. **Is this a layout problem?** → Use Grid
2. **Is this a component alignment problem?** → Use Flexbox  
3. **Do I need to control both axes?** → Use Grid
4. **Is this a single row/column?** → Use Flexbox

Understanding these distinctions will help you choose the right tool for each layout challenge.`,
    excerpt: "A comprehensive guide comparing CSS Grid and Flexbox, helping you choose the right layout system for your web design projects.",
    authorId: "demo-user-1",
    authorName: "Sarah Johnson",
    category: "CSS",
    tags: ["CSS", "Grid", "Flexbox", "layout", "design"],
    featured: false,
    published: true,
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop&crop=entropy",
    readTime: 7
  },
  {
    slug: 'typescript-best-practices-large-applications',
    title: "TypeScript Best Practices for Large Applications",
    content: `TypeScript transforms JavaScript development, but using it effectively requires understanding best practices:

## Type Safety First

Always prefer specific types over generic ones:

\`\`\`typescript
// Good
interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'guest';
}

// Bad
function getUser(id: any): any {
  return { id, name: 'John', email: 'john@example.com' };
}
\`\`\`

## Advanced Type Patterns

### Utility Types
\`\`\`typescript
interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
}

type ProductPreview = Pick<Product, 'id' | 'name' | 'price'>;
type ProductUpdate = Partial<Product>;
\`\`\`

### Generic Types
\`\`\`typescript
interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

async function fetchUser(): Promise<ApiResponse<User>> {
  // Implementation
}
\`\`\`

## Error Handling

Create typed error handling:

\`\`\`typescript
class ApiError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public code?: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

type Result<T, E = Error> = 
  | { success: true; data: T }
  | { success: false; error: E };
\`\`\`

## Performance Considerations

1. **Avoid Excessive Type Complexity**: Complex types can slow down compilation
2. **Use Type Inference**: Let TypeScript infer when possible
3. **Incremental Adoption**: Start with .js files and gradually add types

## Testing Types

Use type testing libraries like \`tsd\`:

\`\`\`typescript
// test/types.ts
import { expectType } from 'tsd';
import { getUser } from './user';

expectType<Promise<User>>(getUser());
\`\`\`

These practices will help you build robust, maintainable TypeScript applications at scale.`,
    excerpt: "Learn advanced TypeScript patterns and best practices for building large-scale, maintainable applications with confidence.",
    authorId: "demo-user-4",
    authorName: "David Kim",
    category: "TypeScript",
    tags: ["TypeScript", "best practices", "large applications", "patterns"],
    featured: false,
    published: true,
    imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=600&fit=crop&crop=entropy",
    readTime: 15
  },
  {
    slug: 'performance-optimization-modern-web-techniques',
    title: "Performance Optimization: Modern Web Techniques",
    content: `Web performance directly impacts user experience and SEO. Here are essential optimization techniques:

## Loading Performance

### Lazy Loading
\`\`\`javascript
// React.lazy for component lazy loading
const LazyComponent = React.lazy(() => import('./LazyComponent'));

// Image lazy loading
<img src="image.jpg" loading="lazy" alt="Description" />
\`\`\`

### Code Splitting
\`\`\`javascript
// Dynamic imports
function loadModule() {
  return import('./heavy-module.js');
}

// Webpack magic comments
import(/* webpackChunkName: "lodash" */ 'lodash').then(_ => {
  // Use lodash
});
\`\`\`

## Resource Optimization

### Image Optimization
- Use next-gen formats (WebP, AVIF)
- Implement responsive images
- Compress images without quality loss

### Caching Strategies
\`\`\`javascript
// Service worker caching
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
\`\`\`

## Runtime Performance

### Debouncing and Throttling
\`\`\`javascript
// Debounce search input
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
\`\`\`

### Virtual Scrolling
For large lists, implement virtual scrolling to only render visible items.

## Monitoring and Analytics

### Performance Metrics
- **LCP (Largest Contentful Paint)**: < 2.5s
- **FID (First Input Delay)**: < 100ms  
- **CLS (Cumulative Layout Shift)**: < 0.1
- **FCP (First Contentful Paint)**: < 1.8s

### Tools
- **Lighthouse**: Comprehensive performance auditing
- **Web Vitals**: Core web vitals measurement
- **Chrome DevTools**: Real-time performance analysis

## Bundle Analysis

Use tools like Webpack Bundle Analyzer to identify and eliminate large dependencies:

\`\`\`javascript
const BundleAnalyzerPlugin = require('@bundle-analyzer/webpack-plugin');

module.exports = {
  plugins: [
    new BundleAnalyzerPlugin()
  ]
};
\`\`\`

Implementing these techniques will significantly improve your application's performance and user experience.`,
    excerpt: "Essential performance optimization techniques for modern web applications, from lazy loading to runtime optimizations and monitoring.",
    authorId: "demo-user-2",
    authorName: "Alex Chen",
    category: "Performance",
    tags: ["performance", "optimization", "web vitals", "UX"],
    featured: false,
    published: true,
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&crop=entropy",
    readTime: 11
  }
]

export async function seedDatabase() {
  console.log('Seeding database with sample posts...')
  
  try {
    for (const post of samplePosts) {
      const postId = await BlogService.createPost(post)
      console.log(`Created post: ${post.title} (ID: ${postId})`)
    }
    
    console.log('Database seeding completed successfully!')
  } catch (error) {
    console.error('Error seeding database:', error)
  }
}

// For manual execution
// seedDatabase()