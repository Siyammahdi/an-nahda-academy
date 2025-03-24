/**
 * Assets helper for Next.js
 * Provides a consistent way to handle asset paths in the project
 */

/**
 * Get the URL for a static asset in the public directory
 * @param path The path to the asset relative to the public directory (without leading slash)
 * @returns The full URL to the asset
 */
export function getAssetPath(path: string): string {
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `/${cleanPath}`;
}

// Common asset paths - add more as needed
export const ASSETS = {
  elements: {
    saturn: getAssetPath('elements/saturn.png'),
    book: getAssetPath('elements/book.png'),
    sideWave: getAssetPath('elements/side-wave.png'),
    arabic: getAssetPath('elements/arabic.svg'),
  },
  icons: {
    icon1: getAssetPath('icons/Icon-01.svg'),
    icon2: getAssetPath('icons/Icon-02.svg'),
    icon3: getAssetPath('icons/Icon-03.svg'),
    icon4: getAssetPath('icons/Icon-04.svg'),
    icon5: getAssetPath('icons/Icon-05.svg'),
    icon6: getAssetPath('icons/Icon-06.svg'),
    icon7: getAssetPath('icons/Icon-07.svg'),
    icon8: getAssetPath('icons/Icon-08.svg'),
    icon9: getAssetPath('icons/Icon-09.svg'),
  },
  whiteIcons: {
    icon1: getAssetPath('icon-white/Icon-01.svg'),
    icon2: getAssetPath('icon-white/Icon-02.svg'),
    icon3: getAssetPath('icon-white/Icon-03.svg'),
    icon4: getAssetPath('icon-white/Icon-04.svg'),
    icon5: getAssetPath('icon-white/Icon-05.svg'),
    icon6: getAssetPath('icon-white/Icon-06.svg'),
    icon7: getAssetPath('icon-white/Icon-07.svg'),
    icon8: getAssetPath('icon-white/Icon-08.svg'),
    icon9: getAssetPath('icon-white/Icon-09.svg'),
  },
  logos: {
    dark: getAssetPath('logoDark.svg'),
    light: getAssetPath('logoLight.svg'),
  },
  // Add more asset categories as needed
};

export default ASSETS; 