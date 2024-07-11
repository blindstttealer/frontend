'use client'
import Image from 'next/image'
import Button from '@/components/ui/Button/Button'
import Input from '@/components/ui/Input/Input'
import { FieldValues, useForm } from 'react-hook-form'
import styles from './activate.module.scss'
import { useAppSelector, useAppDispatch } from '@/store/features/hooks'
import { useRouter } from 'next/navigation'
import { fetchAuthorization } from '@/store/features/user/user.actions'
import Layout from '../../components/layout/layout'
import cn from 'clsx'
import { IDataFromForm } from '../registration/registration.types'
import Link from 'next/link'
import ButtonBack from '@/components/ui/ButtonBack/ButtonBack'

export default function Authentication() {
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
    mode: 'onChange',
    defaultValues: {
      email,
      password,
    },
  })

  const onSubmit = ({ email, password }: FieldValues) => {
    const payload: IDataFromForm = { email, password }
    dispatch(fetchAuthorization(payload))
  }

  return (
    <Layout sidebar={false} isSearch={false}>
      <ButtonBack />
      {/* этот пустой див для гридов */}
      <div></div>
      <div className={styles.container}>
        <p className={styles.paragraph}>С возвращением в мир су-вид!</p>
        <div className={styles.innerForm}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <label>
              Email
              <div style={{ marginTop: '12px', marginBottom: '12px' }}>
                <Input
                  register={register}
                  name="email"
                  // этот класснейм проверяет ошибку из бека, для ошибок валидации на фронте, свои проверки от библиотеки, в компоненте инпут
                  className={cn({
                    [styles.errorInput]: isError?.email,
                  })}
                  type="text"
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
              </div>
            </label>
            <label>
              <div className={styles.faggotPassword}>
                <span>Пароль</span>
                <span className={styles.faggotPassword_inner}>
                  Забыли пароль?
                </span>
              </div>
              <div style={{ marginTop: '12px', marginBottom: '24px' }}>
                <Input
                  register={register}
                  name="password"
                  type="password"
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
              </div>
              {isError && (
                <p
                  style={{ color: 'var(--input-invalid)', textAlign: 'center' }}
                >
                  Неверные ящик или пароль
                </p>
              )}
            </label>
            <Button
              disabled={!isDirty || !isValid}
              type="submit"
              color="primary"
              size="big"
              style={{ width: '100%', marginBottom: '24px' }}
            >
              Войти
            </Button>
            {/* ниже мой произвол */}
            {isLoading && (
              <p style={{ textAlign: 'center', color: 'aquamarine' }}>
                Ждем ответа сервера...
              </p>
            )}
            {/*  */}
          </form>
          <p className={styles.alreadyHaveAccount}>
            Впервые на нашем сайте?{' '}
            <Link className={styles.login} href="/registration">
              Создайте аккаунт
            </Link>
          </p>
          <div className={styles.innerLine}>
            <hr className={styles.line} style={{ marginRight: '5px' }} />
            <span>или</span>
            <hr className={styles.line} style={{ marginLeft: '5px' }} />
          </div>
          <div className={styles.innerImg}>
            <Image
              style={{ marginRight: '12px' }}
              src="/img/vk.svg"
              width={38}
              height={38}
              alt="vk"
            />
            <Image src="/img/ya.svg" width={38} height={38} alt="yandex" />
          </div>
        </div>
      </div>
    </Layout>
  )
}
