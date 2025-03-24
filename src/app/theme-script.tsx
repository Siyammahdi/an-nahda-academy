// This component injects a script that runs before React hydration
// to set the correct theme class based on the shadcn approach
import Script from 'next/script';

export function ThemeScript() {
  const themeScript = `
    (function() {
      // On page load or when changing themes, best to add inline in \`head\` to avoid FOUC
      try {
        // Check if theme is stored in localStorage
        const storedTheme = localStorage.getItem('theme')
        // Check if user has explicitly chosen a theme or use the system preference
        const theme = 
          storedTheme ||
          (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')

        if (theme === 'dark') {
          document.documentElement.classList.add('dark')
        } else {
          document.documentElement.classList.remove('dark')
        }
      } catch (e) {
        // If accessing localStorage fails, do nothing
        console.log('Unable to access localStorage')
      }
    })();
  `;

  return (
    <Script
      id="theme-script"
      strategy="beforeInteractive"
      dangerouslySetInnerHTML={{ __html: themeScript }}
    />
  );
} 