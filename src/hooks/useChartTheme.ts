import { useCallback, useEffect, useState } from 'react'

interface ChartTheme {
  colors: string[]
  axisColor: string
  gridColor: string
  labelColor: string
  legendColor: string
  tooltipBg: string
  tooltipText: string
  tooltipBorder: string
  chartBg: string
}

const TOKEN_MAP = {
  axisColor: '--token-component-chart-axis-color',
  gridColor: '--token-component-chart-grid-color',
  labelColor: '--token-component-chart-label-color',
  legendColor: '--token-component-chart-legend-color',
  tooltipBg: '--token-component-chart-tooltip-bg',
  tooltipText: '--token-component-chart-tooltip-text',
  tooltipBorder: '--token-component-chart-tooltip-border',
  chartBg: '--token-component-chart-bg',
} as const

const SERIES_TOKENS = Array.from({ length: 8 }, (_, i) =>
  `--token-color-dataviz-series-${i + 1}`,
)

const FALLBACK_COLORS = [
  '#2563eb', '#d946ef', '#f59e0b', '#10b981',
  '#ef4444', '#8b5cf6', '#06b6d4', '#f97316',
]

function resolveTokens(): ChartTheme {
  if (typeof window === 'undefined') {
    return {
      colors: FALLBACK_COLORS,
      axisColor: '#6b7280',
      gridColor: '#e5e7eb',
      labelColor: '#111827',
      legendColor: '#6b7280',
      tooltipBg: '#ffffff',
      tooltipText: '#111827',
      tooltipBorder: '#e5e7eb',
      chartBg: '#ffffff',
    }
  }

  const styles = getComputedStyle(document.documentElement)
  const resolve = (token: string) => styles.getPropertyValue(token).trim()

  const colors = SERIES_TOKENS.map((token, i) => resolve(token) || FALLBACK_COLORS[i])

  const theme: Record<string, string> = {}
  for (const [key, token] of Object.entries(TOKEN_MAP)) {
    theme[key] = resolve(token) || ''
  }

  return {
    colors,
    axisColor: theme.axisColor,
    gridColor: theme.gridColor,
    labelColor: theme.labelColor,
    legendColor: theme.legendColor,
    tooltipBg: theme.tooltipBg,
    tooltipText: theme.tooltipText,
    tooltipBorder: theme.tooltipBorder,
    chartBg: theme.chartBg,
  }
}

export function useChartTheme(): ChartTheme {
  const [theme, setTheme] = useState<ChartTheme>(resolveTokens)

  const updateTheme = useCallback(() => {
    setTheme(resolveTokens())
  }, [])

  useEffect(() => {
    updateTheme()

    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (
          mutation.type === 'attributes' &&
          mutation.attributeName === 'data-theme'
        ) {
          updateTheme()
        }
      }
    })

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    })

    return () => observer.disconnect()
  }, [updateTheme])

  return theme
}
