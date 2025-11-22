/**
 * Utilitários de acessibilidade
 * Funções auxiliares para melhorar a experiência de usuários com necessidades especiais
 */

/**
 * Foca o primeiro elemento focado dentro de um container
 */
export function focusFirstElement(container: HTMLElement): void {
  const focusableElements = container.querySelectorAll<HTMLElement>(
    'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
  )

  if (focusableElements.length > 0) {
    focusableElements[0].focus()
  }
}

/**
 * Gerencia o foco em um modal/dialog
 */
export function trapFocus(element: HTMLElement): () => void {
  const focusableElements = element.querySelectorAll<HTMLElement>(
    'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
  )

  const firstElement = focusableElements[0]
  const lastElement = focusableElements[focusableElements.length - 1]

  function handleTabKey(e: KeyboardEvent): void {
    if (e.key !== 'Tab') return

    if (e.shiftKey) {
      if (document.activeElement === firstElement) {
        e.preventDefault()
        lastElement?.focus()
      }
    } else {
      if (document.activeElement === lastElement) {
        e.preventDefault()
        firstElement?.focus()
      }
    }
  }

  element.addEventListener('keydown', handleTabKey)
  firstElement?.focus()

  // Retorna função de cleanup
  return () => {
    element.removeEventListener('keydown', handleTabKey)
  }
}

/**
 * Anuncia mudanças para screen readers
 */
export function announceToScreenReader(message: string, priority: 'polite' | 'assertive' = 'polite'): void {
  const announcement = document.createElement('div')
  announcement.setAttribute('role', 'status')
  announcement.setAttribute('aria-live', priority)
  announcement.setAttribute('aria-atomic', 'true')
  announcement.className = 'sr-only'
  announcement.textContent = message

  document.body.appendChild(announcement)

  setTimeout(() => {
    document.body.removeChild(announcement)
  }, 1000)
}

/**
 * Verifica se o usuário está usando navegação por teclado
 */
export function isKeyboardNavigation(): boolean {
  return document.body.classList.contains('keyboard-navigation')
}

/**
 * Inicializa detecção de navegação por teclado
 */
export function initKeyboardNavigationDetection(): void {
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      document.body.classList.add('keyboard-navigation')
    }
  })

  document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-navigation')
  })
}

/**
 * Gera IDs únicos para elementos ARIA
 */
let idCounter = 0
export function generateAriaId(prefix: string = 'aria'): string {
  return `${prefix}-${++idCounter}-${Date.now()}`
}

