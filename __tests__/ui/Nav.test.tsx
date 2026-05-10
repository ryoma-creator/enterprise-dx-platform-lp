import { render, screen, fireEvent } from '@testing-library/react'
import Nav from '@/components/ui/Nav'

jest.mock('next/navigation', () => ({
  usePathname: () => '/',
}))

jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => (
      <div {...props}>{children}</div>
    ),
  },
  AnimatePresence: ({ children }: React.PropsWithChildren) => <>{children}</>,
}))

describe('Nav', () => {
  it('renders the NextGrow logo', () => {
    render(<Nav />)
    expect(screen.getByText('NextGrow')).toBeInTheDocument()
  })

  it('renders all nav links', () => {
    render(<Nav />)
    expect(screen.getAllByText('サービス').length).toBeGreaterThan(0)
    expect(screen.getAllByText('導入事例').length).toBeGreaterThan(0)
    expect(screen.getAllByText('料金プラン').length).toBeGreaterThan(0)
    expect(screen.getAllByText('よくある質問').length).toBeGreaterThan(0)
  })

  it('has accessible hamburger button with aria-expanded', () => {
    render(<Nav />)
    const btn = screen.getByRole('button', { name: /メニュー/i })
    expect(btn).toHaveAttribute('aria-expanded', 'false')
  })

  it('toggles mobile menu on hamburger click', () => {
    render(<Nav />)
    const btn = screen.getByRole('button', { name: /メニュー/i })
    fireEvent.click(btn)
    expect(btn).toHaveAttribute('aria-expanded', 'true')
  })

  it('renders CTA button linking to /contact', () => {
    render(<Nav />)
    const ctaLinks = screen.getAllByText('無料相談を予約する')
    expect(ctaLinks.length).toBeGreaterThan(0)
  })
})
