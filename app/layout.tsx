import type { Metadata } from 'next';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ScrollProgress } from './components/ScrollProgress';
import { LoadingScreen } from './components/LoadingScreen';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://harshith-portfolio.vercel.app'),
  title: 'Harshith M - Full-Stack Developer',
  description:
    'Premium portfolio of Harshith M, a full-stack developer specializing in Next.js, React, TypeScript, and cloud technologies. AWS Certified.',
  keywords: [
    'Full-Stack Developer',
    'Next.js',
    'React',
    'TypeScript',
    'Portfolio',
    'AWS',
    'Web Development',
  ],
  authors: [{ name: 'Harshith M', url: 'https://github.com/harshith-murali' }],
  creator: 'Harshith M',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://harshith-portfolio.vercel.app',
    title: 'Harshith M - Full-Stack Developer',
    description:
      'Premium portfolio of Harshith M, a full-stack developer specializing in Next.js, React, TypeScript, and cloud technologies.',
    siteName: 'Harshith M Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Harshith M - Full-Stack Developer',
    description:
      'Premium portfolio of Harshith M, a full-stack developer specializing in Next.js, React, TypeScript, and cloud technologies.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'verification-code-here',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0f0f0f" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='75' font-size='75' fill='%2300d9ff'>H</text></svg>" />
      </head>
      <body className="bg-dark-950">
        <div className="animated-bg" />
        <LoadingScreen />
        <ScrollProgress />
        <Navbar />
        <main className="relative z-10" role="main">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
