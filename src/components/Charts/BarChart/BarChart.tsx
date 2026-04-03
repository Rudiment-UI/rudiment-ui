import {
  BarChart as RechartsBarChart,
  Bar,
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

export interface BarChartProps {
  data: Array<Record<string, string | number>>
  dataKeys: string[]
  indexKey: string
  layout?: 'vertical' | 'horizontal'
  stacked?: boolean
  showLegend?: boolean
  showGrid?: boolean
  height?: number
  label: string
  className?: string
}

export function BarChart({
  data,
  dataKeys,
  indexKey,
  layout = 'vertical',
  stacked = false,
  showLegend = true,
  showGrid = true,
  height = 300,
  label,
  className,
}: BarChartProps) {
  const theme = useChartTheme()

  const isHorizontal = layout === 'horizontal'

  return (
    <div
      className={cn('rudiment-chart', className)}
      role="img"
      aria-label={label}
    >
      <ResponsiveContainer width="100%" height={height}>
        <RechartsBarChart
          data={data}
          layout={isHorizontal ? 'vertical' : 'horizontal'}
        >
          {showGrid && (
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={theme.gridColor}
              vertical={!isHorizontal}
              horizontal={!isHorizontal ? true : false}
            />
          )}
          {isHorizontal ? (
            <>
              <XAxis type="number" tick={{ fill: theme.axisColor }} />
              <YAxis
                dataKey={indexKey}
                type="category"
                tick={{ fill: theme.axisColor }}
              />
            </>
          ) : (
            <>
              <XAxis dataKey={indexKey} tick={{ fill: theme.axisColor }} />
              <YAxis tick={{ fill: theme.axisColor }} />
            </>
          )}
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
            <Bar
              key={key}
              dataKey={key}
              fill={theme.colors[i % theme.colors.length]}
              stackId={stacked ? 'stack' : undefined}
              radius={[2, 2, 0, 0]}
            />
          ))}
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  )
}
