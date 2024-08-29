'use client'
import { FC } from 'react'
import { FieldErrors, UseFormRegister } from 'react-hook-form'
import Input from '@/components/ui/Input/Input'

type Props = {
  register: UseFormRegister<any>
  id: string
}

export const InputEmail: FC<Props> = ({ register, id }) => {
  return (
    <Input
      register={register}
      name={id}
      type="email"
      autocomplete="email"
      placeholder="ivanov@gmail.com"
      options={{
        required: 'Обязательное поле',
        pattern: {
          value: /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i,
          message: 'Введите корректный ящик',
        },
      }}
    />
  )
}
