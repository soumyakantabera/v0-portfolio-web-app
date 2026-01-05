/**
 * Get the base path for the application
 * Used for GitHub Pages deployment at /v0-portfolio-web-app
 */
export const basePath = process.env.NODE_ENV === 'production' ? '/v0-portfolio-web-app' : ''

/**
 * Helper function to prefix paths with basePath
 * @param path - The path to prefix
 * @returns The path with basePath prefix
 */
export function withBasePath(path: string): string {
  // Don't add basePath to external URLs or paths that already have it
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('mailto:') || path.startsWith(basePath)) {
    return path
  }
  
  // Ensure path starts with /
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  
  return `${basePath}${normalizedPath}`
}
