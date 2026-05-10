import { render, screen } from '@testing-library/react'
import Footer from '@/components/ui/Footer'

describe('Footer', () => {
  it('renders the NextGrow logo link', () => {
    render(<Footer />)
    const logoLinks = screen.getAllByRole('link', { name: /nextgrow/i })
    expect(logoLinks.length).toBeGreaterThan(0)
  })

  it('renders privacy policy link', () => {
    render(<Footer />)
    expect(screen.getByText('プライバシーポリシー')).toBeInTheDocument()
  })

  it('renders contact link', () => {
    render(<Footer />)
    expect(screen.getByText('お問い合わせ')).toBeInTheDocument()
  })

  it('renders copyright notice', () => {
    render(<Footer />)
    expect(screen.getByText(/© 2025 NextGrow/)).toBeInTheDocument()
  })
})
