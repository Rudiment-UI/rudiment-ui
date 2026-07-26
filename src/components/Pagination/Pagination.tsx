import { cn } from '@/utils/cn'
import { RudiIcon } from '@/components/Icon/Icon'
import './pagination.css'

export interface RudiPaginationProps {
  /** Current page (1-based). */
  page: number
  /** Total number of pages. */
  pageCount: number
  onPageChange: (page: number) => void
  /** Pages to show on each side of the current page before truncating. */
  siblingCount?: number
  /** Accessible label for the nav landmark. */
  label?: string
  className?: string
}

type PageToken = number | 'ellipsis-start' | 'ellipsis-end'

/** Build the visible token list: first, last, current ± siblings, ellipses. */
function paginationRange(
  page: number,
  pageCount: number,
  siblingCount: number,
): PageToken[] {
  // Show every page when the count is small enough that ellipses add nothing.
  const totalShown = siblingCount * 2 + 5 // first, last, current, 2 ellipses
  if (pageCount <= totalShown) {
    return Array.from({ length: pageCount }, (_, i) => i + 1)
  }

  const left = Math.max(page - siblingCount, 1)
  const right = Math.min(page + siblingCount, pageCount)
  const showLeftEllipsis = left > 2
  const showRightEllipsis = right < pageCount - 1

  const tokens: PageToken[] = [1]
  if (showLeftEllipsis) tokens.push('ellipsis-start')
  else for (let p = 2; p < left; p++) tokens.push(p)

  for (let p = left; p <= right; p++) {
    if (p !== 1 && p !== pageCount) tokens.push(p)
  }

  if (showRightEllipsis) tokens.push('ellipsis-end')
  else for (let p = right + 1; p < pageCount; p++) tokens.push(p)

  tokens.push(pageCount)
  return tokens
}

export function RudiPagination({
  page,
  pageCount,
  onPageChange,
  siblingCount = 1,
  label = 'Pagination',
  className,
}: RudiPaginationProps) {
  if (pageCount <= 1) return null

  const tokens = paginationRange(page, pageCount, siblingCount)
  const goTo = (p: number) => {
    const clamped = Math.min(Math.max(p, 1), pageCount)
    if (clamped !== page) onPageChange(clamped)
  }

  return (
    <nav aria-label={label} className={cn('rudi-pagination', className)}>
      <ul className="rudi-pagination__list">
        <li>
          <button
            type="button"
            className="rudi-pagination__control"
            aria-label="Go to previous page"
            disabled={page <= 1}
            onClick={() => goTo(page - 1)}
          >
            <RudiIcon icon="lucide:chevron-left" size="sm" />
          </button>
        </li>

        {tokens.map((token) =>
          typeof token === 'number' ? (
            <li key={token}>
              <button
                type="button"
                className={cn(
                  'rudi-pagination__page',
                  token === page && 'rudi-pagination__page--active',
                )}
                aria-label={`Go to page ${token}`}
                aria-current={token === page ? 'page' : undefined}
                onClick={() => goTo(token)}
              >
                {token}
              </button>
            </li>
          ) : (
            <li key={token} className="rudi-pagination__ellipsis" aria-hidden="true">
              …
            </li>
          ),
        )}

        <li>
          <button
            type="button"
            className="rudi-pagination__control"
            aria-label="Go to next page"
            disabled={page >= pageCount}
            onClick={() => goTo(page + 1)}
          >
            <RudiIcon icon="lucide:chevron-right" size="sm" />
          </button>
        </li>
      </ul>
    </nav>
  )
}
