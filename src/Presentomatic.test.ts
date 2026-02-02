import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/svelte'
import Presentomatic from './Presentomatic.svelte'

const mockMarkdown = `# Slide 1
First slide content

---

## Slide 2
Second slide content

---

### Slide 3
Third slide content`

describe('Presentomatic', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn(() =>
      Promise.resolve({
        text: () => Promise.resolve(mockMarkdown)
      })
    ))

    // Reset location
    window.location.hash = ''
    Object.defineProperty(window, 'location', {
      value: {
        ...window.location,
        search: '',
        hash: '',
      },
      writable: true
    })
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('renders the component', async () => {
    render(Presentomatic)

    await waitFor(() => {
      expect(screen.getByRole('main')).toBeInTheDocument()
    })
  })

  it('loads and displays the first slide on mount', async () => {
    render(Presentomatic)

    await waitFor(() => {
      expect(screen.getByText('First slide content')).toBeInTheDocument()
    })
  })

  it('fetches the markdown file on mount', async () => {
    render(Presentomatic)

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith('test.md')
    })
  })

  it('parses markdown into slides', async () => {
    render(Presentomatic)

    await waitFor(() => {
      // First slide should be displayed
      expect(screen.getByText('First slide content')).toBeInTheDocument()
    })
  })

  it('applies title-slide class for slides with h1', async () => {
    render(Presentomatic)

    await waitFor(() => {
      const main = screen.getByRole('main')
      expect(main).toHaveClass('title-slide')
    })
  })

  it('navigates to requested page from URL hash', async () => {
    Object.defineProperty(window, 'location', {
      value: {
        ...window.location,
        search: '',
        hash: '#2',
      },
      writable: true
    })

    render(Presentomatic)

    await waitFor(() => {
      expect(screen.getByText('Second slide content')).toBeInTheDocument()
    })
  })
})
