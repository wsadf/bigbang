/**
 * Utilitários de performance
 * Funções para otimização e monitoramento de performance
 */

/**
 * Debounce function para limitar chamadas de função
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null
      func(...args)
    }

    if (timeout) {
      clearTimeout(timeout)
    }
    timeout = setTimeout(later, wait)
  }
}

/**
 * Throttle function para limitar chamadas de função
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean

  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

/**
 * Lazy load de imagens
 */
export function lazyLoadImage(img: HTMLImageElement): void {
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const image = entry.target as HTMLImageElement
          if (image.dataset.src) {
            image.src = image.dataset.src
            image.removeAttribute('data-src')
            observer.unobserve(image)
          }
        }
      })
    })

    imageObserver.observe(img)
  } else {
    // Fallback para browsers antigos
    if (img.dataset.src) {
      img.src = img.dataset.src
    }
  }
}

/**
 * Preload de recursos críticos
 */
export function preloadResource(href: string, as: string): void {
  const link = document.createElement('link')
  link.rel = 'preload'
  link.href = href
  link.as = as
  document.head.appendChild(link)
}

/**
 * Mede performance de uma função
 */
export function measurePerformance<T>(
  fn: () => T,
  label?: string
): { result: T; duration: number } {
  const start = performance.now()
  const result = fn()
  const duration = performance.now() - start

  if (label && process.env.NODE_ENV === 'development') {
    console.log(`[Performance] ${label}: ${duration.toFixed(2)}ms`)
  }

  return { result, duration }
}

/**
 * Memoização simples
 */
export function memoize<T extends (...args: any[]) => any>(fn: T): T {
  const cache = new Map<string, ReturnType<T>>()

  return ((...args: Parameters<T>): ReturnType<T> => {
    const key = JSON.stringify(args)
    
    if (cache.has(key)) {
      return cache.get(key)!
    }

    const result = fn(...args)
    cache.set(key, result)
    return result
  }) as T
}

/**
 * Virtual scrolling helper
 */
export function calculateVisibleRange(
  scrollTop: number,
  itemHeight: number,
  containerHeight: number,
  totalItems: number
): { start: number; end: number } {
  const start = Math.floor(scrollTop / itemHeight)
  const end = Math.min(
    start + Math.ceil(containerHeight / itemHeight) + 1,
    totalItems
  )

  return { start: Math.max(0, start), end }
}

