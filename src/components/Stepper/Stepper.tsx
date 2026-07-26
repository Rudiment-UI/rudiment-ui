import { cn } from '@/utils/cn'
import { RudiIcon } from '@/components/Icon/Icon'
import './stepper.css'

export type RudiStepStatus = 'complete' | 'current' | 'upcoming'

export interface RudiStepperStep {
  label: string
  description?: string
  /** Icon name for the node. Falls back to a check (complete) or the step number. */
  icon?: string
  status?: RudiStepStatus
}

export interface RudiStepperProps {
  steps: RudiStepperStep[]
  /** `horizontal` — a progress track; `vertical` — a timeline. */
  orientation?: 'horizontal' | 'vertical'
  size?: 'sm' | 'md'
  className?: string
}

function nodeContent(step: RudiStepperStep, index: number) {
  if (step.icon) return <RudiIcon icon={step.icon} size="sm" />
  if (step.status === 'complete') return <RudiIcon icon="lucide:check" size="sm" />
  return <span className="rudi-stepper__number">{index + 1}</span>
}

export function RudiStepper({
  steps,
  orientation = 'horizontal',
  size = 'md',
  className,
}: RudiStepperProps) {
  return (
    <ol
      className={cn(
        'rudi-stepper',
        `rudi-stepper--${orientation}`,
        `rudi-stepper--${size}`,
        className,
      )}
    >
      {steps.map((step, i) => {
        const status = step.status ?? 'upcoming'
        const filled = status === 'complete' || status === 'current'
        // A connector is "filled" once the step it leads into is reached.
        const nextReached =
          i < steps.length - 1 && steps[i + 1].status !== 'upcoming'

        return (
          <li
            key={step.label}
            className={cn('rudi-stepper__step', `rudi-stepper__step--${status}`)}
            aria-current={status === 'current' ? 'step' : undefined}
          >
            <div className="rudi-stepper__marker">
              {i > 0 && (
                <span
                  className={cn(
                    'rudi-stepper__connector',
                    'rudi-stepper__connector--before',
                    filled && 'rudi-stepper__connector--filled',
                  )}
                  aria-hidden="true"
                />
              )}
              <span
                className={cn(
                  'rudi-stepper__node',
                  filled && 'rudi-stepper__node--filled',
                )}
              >
                {nodeContent(step, i)}
              </span>
              {i < steps.length - 1 && (
                <span
                  className={cn(
                    'rudi-stepper__connector',
                    'rudi-stepper__connector--after',
                    nextReached && 'rudi-stepper__connector--filled',
                  )}
                  aria-hidden="true"
                />
              )}
            </div>
            <div className="rudi-stepper__content">
              <span className="rudi-stepper__label">{step.label}</span>
              {step.description && (
                <span className="rudi-stepper__description">{step.description}</span>
              )}
            </div>
          </li>
        )
      })}
    </ol>
  )
}
