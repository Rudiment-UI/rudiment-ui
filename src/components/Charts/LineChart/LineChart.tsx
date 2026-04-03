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

export interface LineChartProps {
  data: Array<Record<string, string | number>>
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

export function LineChart({
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
}: LineChartProps) {
  const theme = useChartTheme()

  return (
    <div
      className={cn('rudiment-chart', className)}
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
