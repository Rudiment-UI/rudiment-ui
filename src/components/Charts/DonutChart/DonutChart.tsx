import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { useChartTheme } from '@/hooks/useChartTheme'
import { cn } from '@/utils/cn'
import '../charts.css'

export interface DonutChartDatum {
  name: string
  value: number
}

export interface DonutChartProps {
  data: DonutChartDatum[]
  innerRadius?: number
  showLabels?: boolean
  showLegend?: boolean
  height?: number
  label: string
  className?: string
}

export function DonutChart({
  data,
  innerRadius = 60,
  showLabels = false,
  showLegend = true,
  height = 300,
  label,
  className,
}: DonutChartProps) {
  const theme = useChartTheme()

  return (
    <div
      className={cn('rudiment-chart', className)}
      role="img"
      aria-label={label}
    >
      <ResponsiveContainer width="100%" height={height}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={innerRadius}
            outerRadius={innerRadius + 30}
            paddingAngle={2}
            label={showLabels ? ({ name }) => name : false}
          >
            {data.map((_, i) => (
              <Cell
                key={i}
                fill={theme.colors[i % theme.colors.length]}
              />
            ))}
          </Pie>
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
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
