'use client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { FC } from 'react'
import { FieldValues, useForm } from 'react-hook-form'

import styles from './forms.module.scss'
import { useAppSelector, useAppDispatch } from '@/store/features/hooks'
import { fetchAuthorization } from '@/store/features/user/user.actions'
import Button from '@/components/ui/Button/Button'
import Input from '@/components/ui/Input/Input'
import SocialForm from '@/components/ui/Socials/SocialForm'

export interface IDataFromForm {
  email: string
  password: string
  isAlien?: boolean
}

const LoginForm: FC = () => {
  const { error: isError, isLoading } = useAppSelector(
    (state) => state.userAuthorization,
  )
  const {
    profileFromActivation: { email, password },
  } = useAppSelector((state) => state.userRegistration)
  const router = useRouter()
  const dispatch = useAppDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields, isDirty, isValid },
  } = useForm<FieldValues>({
    mode: 'onBlur',
    defaultValues: {
      email: '',
      password: '',
      isAlien: false,
    },
  })

  const onSubmit = ({ email, password }: FieldValues) => {
    const payload: IDataFromForm = { email, password }
    dispatch(fetchAuthorization(payload))
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          Email
          <Input
            register={register}
            name="email"
            type="text"
            autocomplete='email'
            placeholder="ivanov@gmail.com"
            touchedFields={touchedFields}
            options={{
              required: 'Обязательное поле',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i,
                message: 'Введите корректный ящик',
              },
            }}
            error={errors?.email?.message}
          />
        </label>

        <label>
          <div className={styles.forgotPassword}>
            <span>Пароль</span>
            {/* todo: not implemented */}
            <Link href="/resetpassword">Забыли пароль?</Link>
          </div>
          <Input
            register={register}
            name="password"
            type="password"
            autocomplete='current-password'
            placeholder="*********"
            touchedFields={touchedFields}
            options={{
              required: 'Обязательное поле',
              minLength: {
                message: 'Минимальная длина 8 символов!',
                value: 8,
              },
              validate: {
                number: (value) =>
                  /\d/.test(value) ||
                  'Пароль должен содержать хотя бы одну цифру!',
                noRussianChars: (value) =>
                  !/[А-Яа-яЁё]/.test(value) ||
                  'Пароль не должен содержать русских символов!',
                letter: (value) =>
                  /[A-Za-z]/.test(value) ||
                  'Пароль должен содержать хотя бы одну букву!',
              },
            }}
            error={errors?.password?.message}
          />
          {isError && <p className={styles.error}>Неверные ящик или пароль</p>}
        </label>

        <label className={styles.left}>
          <Input register={register} name="isAlien" type="checkbox" />
          Чужой компьютер
        </label>

        <Button
          disabled={!isDirty || !isValid}
          type="submit"
          color="primary"
          size="big"
          loading={isLoading}
        >
          Войти
        </Button>
      </form>

      <p className={styles.center}>
        Впервые на нашем сайте?
        <Link href="/registration">Создайте аккаунт</Link>
      </p>

      <SocialForm />
    </div>
  )
}

export default LoginForm
