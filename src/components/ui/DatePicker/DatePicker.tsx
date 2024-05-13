'use client'

import { ChangeEvent, FC, FormEvent } from 'react'
import styles from './DatePicker.module.scss'

interface InputProps {
  value?: string | number
  placeholder?: string
  onChange?: (arg: string) => void
}

//todo: сделать в соответствии с дизайном
const DatePicker: FC<InputProps> = ({ value, placeholder, onChange }) => {
  const handleOnFocus = (event: FormEvent<HTMLInputElement>) => {
    event.currentTarget.type = 'date'
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange && onChange(e.target.value)
  }

  return (
    <div className={styles.datePicker}>
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onFocus={handleOnFocus}
        onChange={handleChange}
      />
      <i className="fa fa-instagram icon" />
    </div>
  )
}

export default DatePicker
