'use client'
import { FC } from 'react'
import { FieldErrors, UseFormRegister } from 'react-hook-form'
import Input from '@/components/ui/Input/Input'

type Props = {
  register: UseFormRegister<any>
  id: string
  autocomplete?: string
}

export const InputPassword: FC<Props> = ({ register, id, autocomplete }) => {
  return (
    <Input
      register={register}
      name={id}
      type="password"
      autocomplete={autocomplete}
      placeholder="*********"
      options={{
        required: 'Обязательное поле',
        minLength: {
          message: 'Минимальная длина 8 символов!',
          value: 8,
        },
        validate: {
          number: (value) =>
            /\d/.test(value) || 'Пароль должен содержать хотя бы одну цифру!',
          noRussianChars: (value) =>
            !/[А-Яа-яЁё]/.test(value) ||
            'Пароль не должен содержать русских символов!',
          letter: (value) =>
            /[A-Za-z]/.test(value) ||
            'Пароль должен содержать хотя бы одну букву!',
        },
      }}
    />
  )
}
