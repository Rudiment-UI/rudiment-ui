import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { useChartTheme } from '@/hooks/useChartTheme'
import { cn } from '@/utils/cn'
import '../charts.css'

export interface RudiLineChartProps {
  /**
   * Row data. Values may be `null` to represent gaps in a series (e.g. a
   * burndown line that stops partway through the sprint). Strongly-typed data
   * objects are accepted directly — no cast required.
   */
  data: Array<Record<string, string | number | null>>
  dataKeys: string[]
  indexKey: string
  curved?: boolean
  showDots?: boolean
  showGrid?: boolean
  showLegend?: boolean
  height?: number
  label: string
  className?: string
}

export function RudiLineChart({
  data,
  dataKeys,
  indexKey,
  curved = true,
  showDots = true,
  showGrid = true,
  showLegend = true,
  height = 300,
  label,
  className,
}: RudiLineChartProps) {
  const theme = useChartTheme()

  return (
    <div
      className={cn('rudi-chart', className)}
      role="img"
      aria-label={label}
    >
      <ResponsiveContainer width="100%" height={height}>
        <RechartsLineChart data={data}>
          {showGrid && (
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={theme.gridColor}
            />
          )}
          <XAxis dataKey={indexKey} tick={{ fill: theme.axisColor }} />
          <YAxis tick={{ fill: theme.axisColor }} />
          <Tooltip
            contentStyle={{
              backgroundColor: theme.tooltipBg,
              color: theme.tooltipText,
              border: `1px solid ${theme.tooltipBorder}`,
              borderRadius: '0.375rem',
            }}
          />
          {showLegend && (
            <Legend
              wrapperStyle={{ color: theme.legendColor }}
            />
          )}
          {dataKeys.map((key, i) => (
            <Line
              key={key}
              type={curved ? 'monotone' : 'linear'}
              dataKey={key}
              stroke={theme.colors[i % theme.colors.length]}
              dot={showDots}
              strokeWidth={2}
              activeDot={{ r: 5 }}
            />
          ))}
        </RechartsLineChart>
      </ResponsiveContainer>
    </div>
  )
}
