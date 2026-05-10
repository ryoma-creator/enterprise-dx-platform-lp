import { render, screen } from '@testing-library/react'
import { FadeUp, FadeIn } from '@/components/ui/animations'

jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => (
      <div {...props}>{children}</div>
    ),
  },
  useInView: () => true,
}))

describe('FadeUp', () => {
  it('renders children', () => {
    render(<FadeUp><p>Hello</p></FadeUp>)
    expect(screen.getByText('Hello')).toBeInTheDocument()
  })

  it('applies className', () => {
    render(<FadeUp className="custom-class"><span>Test</span></FadeUp>)
    expect(screen.getByText('Test').parentElement).toHaveClass('custom-class')
  })
})

describe('FadeIn', () => {
  it('renders children', () => {
    render(<FadeIn><p>World</p></FadeIn>)
    expect(screen.getByText('World')).toBeInTheDocument()
  })
})
