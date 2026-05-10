import { CASES } from '@/lib/data/cases'

describe('CASES data', () => {
  it('has exactly 3 cases', () => {
    expect(CASES).toHaveLength(3)
  })

  it('all cases have required fields', () => {
    CASES.forEach((c) => {
      expect(c.id).toBeDefined()
      expect(c.category).toBeTruthy()
      expect(c.img).toBeTruthy()
      expect(c.title).toBeTruthy()
      expect(c.company).toBeTruthy()
      expect(c.description).toBeTruthy()
    })
  })

  it('all cases have exactly 3 metrics', () => {
    CASES.forEach((c) => {
      expect(c.metrics).toHaveLength(3)
    })
  })

  it('all cases have exactly 4 heroMetrics', () => {
    CASES.forEach((c) => {
      expect(c.heroMetrics).toHaveLength(4)
    })
  })

  it('all cases have exactly 3 meta entries', () => {
    CASES.forEach((c) => {
      expect(c.meta).toHaveLength(3)
    })
  })

  it('all cases have exactly 5 challenges', () => {
    CASES.forEach((c) => {
      expect(c.challenges).toHaveLength(5)
    })
  })

  it('all cases have exactly 5 approaches', () => {
    CASES.forEach((c) => {
      expect(c.approaches).toHaveLength(5)
    })
  })

  it('all cases have exactly 5 flowSteps', () => {
    CASES.forEach((c) => {
      expect(c.flowSteps).toHaveLength(5)
    })
  })

  it('all cases have 5 beforeAfter rows', () => {
    CASES.forEach((c) => {
      expect(c.beforeAfter).toHaveLength(5)
    })
  })

  it('all cases have a testimonial with required fields', () => {
    CASES.forEach((c) => {
      expect(c.testimonial.name).toBeTruthy()
      expect(c.testimonial.role).toBeTruthy()
      expect(c.testimonial.company).toBeTruthy()
      expect(c.testimonial.comment).toBeTruthy()
    })
  })

  it('case ids are unique and sequential', () => {
    const ids = CASES.map(c => c.id)
    expect(ids).toEqual([1, 2, 3])
  })
})
