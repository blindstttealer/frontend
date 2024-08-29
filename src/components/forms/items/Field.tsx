import { Children, ReactElement } from 'react'
import styles from '../forms.module.scss'

interface FieldProps {
  label?: string
  toTheRightLabel?: ReactElement
  htmlFor?: string
  error?: any
  children: ReactElement
}

export const Field = ({
  label,
  toTheRightLabel,
  htmlFor,
  error,
  children,
}: FieldProps) => {
  const id = htmlFor || getChildId(children)

  return (
    <div className={styles.field}>
      <div className={styles.label}>
        {label && <label htmlFor={id}>{label}</label>}
        {toTheRightLabel && toTheRightLabel}
      </div>
      {children}
      {error && (
        <span role="alert" className={styles.error}>
          {String(error)}
        </span>
      )}
    </div>
  )
}

function getChildId(children: ReactElement) {
  const child = Children.only(children)

  if ('id' in child?.props) {
    return child.props.id
  }
}
