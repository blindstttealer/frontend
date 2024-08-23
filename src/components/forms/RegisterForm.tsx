'use client'
import { FC, useEffect } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import cn from 'clsx'

import styles from './loginForm.module.scss'
import { fetchRegistration } from '@/store/features/user/user.actions'
import { getDataFromActivation } from '@/store/features/user/user-registration.slice'
import { useAppDispatch, useAppSelector } from '@/store/features/hooks'
import Button from '@/components/ui/Button/Button'
import Input from '@/components/ui/Input/Input'
import SocialForm from './SocialForm'

export interface IDataFromForm {
  email: string
  password: string
  password2: string
  agree: boolean
}

const RegisterForm: FC = () => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const { isError, success } = useAppSelector((state) => state.userRegistration)
  const {
    profileFromActivation: { email, password, password2 },
  } = useAppSelector((state) => state.userRegistration)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, touchedFields, isDirty, isValid, isLoading },
  } = useForm<FieldValues>({
    mode: 'all',
  })

  const onSubmit = (dataFromInput: FieldValues) => {
    dispatch(getDataFromActivation(dataFromInput))
    dispatch(fetchRegistration(dataFromInput))
  }

  useEffect(() => {
    if (success === true) {
      router.push('/activate-instruction')
    }
  }, [success, errors, router, touchedFields])

  const pswd = watch('password')

  return (
    <div className={styles.container}>
      <h2>Регистрация</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          Email
          <div>
            <Input
              register={register}
              touchedFields={touchedFields}
              name="email"
              type="text"
              placeholder="ivanov@gmail.com"
              options={{
                required: 'Обязательное поле',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i,
                  message: 'Введите корректный ящик',
                },
              }}
              error={errors?.email?.message}
            />
          </div>
          {/* @ts-ignore */}
          {isError?.email && (
            <p className={styles.error}>Пользователь с таким email уже есть</p>
          )}
        </label>

        <label>
          Пароль
          <div>
            <Input
              register={register}
              name="password"
              type="password"
              placeholder="*********"
              options={{
                required: 'Обязательное поле',
                minLength: {
                  message: 'Минимальная длина 8 символов',
                  value: 8,
                },
                validate: {
                  number: (value) =>
                    /\d/.test(value) ||
                    'Пароль должен содержать хотя бы одну цифру!',
                  noRussianChars: (value) =>
                    !/[А-Яа-яЁё]/.test(value) || 'Используйте только латиницу!',
                  letter: (value) =>
                    /[A-Za-z]/.test(value) ||
                    'Пароль должен содержать хотя бы одну букву!',
                  upperLetter: (value) =>
                    /[A-Z]/.test(value) ||
                    'Пароль должен содержать одну заглавную букву!',
                  symbol: (value) =>
                    /[\W_]/.test(value) ||
                    'Пароль должен содержать хотя бы один специальный символ (!@#$%^&*).',
                },
              }}
              error={errors?.password?.message}
            />
          </div>
        </label>

        <label>
          Введите пароль еще раз
          <div>
            <Input
              register={register}
              name="password2"
              type="password"
              placeholder="*********"
              options={{
                required: 'Обязательное поле',
                validate: (value) => {
                  return value === pswd || 'Пароли не совпадают'
                },
              }}
              error={errors?.password2?.message}
            />
          </div>
        </label>

        <label
          className={cn(styles.left, {
            [styles.leftSmall]: true,
          })}
        >
          <Input
            register={register}
            name="agree"
            type="checkbox"
            options={{
              required: 'Обязательное поле',
              validate: (value) => {
                return value === true || 'Соглашение необходимо'
              },
            }}
          />
          Я соглашаюсь
          <Link href="/todo">с обработкой персональных данных</Link>
        </label>

        <Button
          disabled={!isDirty || !isValid}
          color={'primary'}
          size={'big'}
          loading={isLoading}
        >
          Зарегистрироваться
        </Button>
      </form>

      <p className={styles.center}>
        У вас уже есть аккаунт?<Link href="/login">Войти в аккаунт</Link>
      </p>

      <SocialForm />
    </div>
  )
}

export default RegisterForm
