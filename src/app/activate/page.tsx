'use client'
/* баги */
/* типизация дефолтных данных в инпутах формы ломает типизацию, */
// посмотри как ведет себя юзЛэйаутЭффект и юзЭффект
import React from 'react'
import Image from 'next/image'
import Button from '@/components/ui/Button/Button'
import Input from '@/components/ui/Input/Input'
import {useForm} from 'react-hook-form'
import styles from './activate.module.scss'
import {useAppSelector, useAppDispatch} from '@/store/features/hooks'
import {useRouter} from 'next/navigation'
import {fetchActivation} from '@/store/features/user/user.actions'
import {IAuth} from './activate.types'

export default function Authentication() {
    const {flag, isError, isLoaded} = useAppSelector(
        (state) => state.userAuthorization,
    )
    const {profileFromActivation} = useAppSelector(
        (state) => state.userRegistration,
    )

    const router = useRouter()
    const dispatch = useAppDispatch()
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm({
        mode: 'onBlur',
        defaultValues: {
            email: profileFromActivation.email,
            password: profileFromActivation.password,
        },
    })

    const onSubmit = (dataFromForm: IAuth) => {
        dispatch(fetchActivation(dataFromForm))
    }

    React.useLayoutEffect(() => {
        if (flag === true) {
            router.push('/profile')
        }
    }, [flag, router])

    return (
        <div>
            <div className={styles.container}>
                <p className={styles.paragraph}>С возвращением в мир су-вид!</p>

                <div className={styles.innerForm}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <label>
                            Email
                            <div style={{marginTop: '12px', marginBottom: '12px'}}>
                                <Input
                                    style={{color: 'black'}}
                                    //@ts-ignore
                                    register={register}
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
                        </label>
                        <label>
                            <div className={styles.faggotPassword}>
                                <span>Пароль</span>
                                <span>Забыли пароль?</span>
                            </div>
                            <div style={{marginTop: '12px', marginBottom: '24px'}}>
                                <Input
                                    style={{color: 'black'}}
                                    //@ts-ignore
                                    register={register}
                                    name="password"
                                    type="password"
                                    placeholder="*********"
                                    options={{
                                        required: 'Обязательное поле',
                                        minLength: {
                                            message: 'Минимальная длинна 8 символов!',
                                            value: 8,
                                        },
                                        validate: {
                                            number: value => /\d/.test(value) || "Пароль должен содержать хотя бы одну цифру!",
                                            noRussianChars: value => !/[А-Яа-яЁё]/.test(value) || "Пароль не должен содержать русских символов!",
                                            letter: value => /[A-Za-z]/.test(value) || "Пароль должен содержать хотя бы одну букву!"
                                        }

                                    }}
                                    error={errors?.password?.message}
                                />
                            </div>
                            {isError && (
                                <p style={{textAlign: 'center', color: 'red'}}>
                                    Неверные ящик или пароль
                                </p>
                            )}
                        </label>
                        {/* Доделай кнопку с позиции дизейблед */}
                        <Button
                            color={'gray'}
                            style={{width: '100%', marginBottom: '24px'}}
                        >
                            Войти
                        </Button>
                        {isLoaded === true ? (
                            <p style={{textAlign: 'center', color: 'aquamarine'}}>
                                Ждем ответа сервера...
                            </p>
                        ) : null}
                    </form>
                    <p className={styles.alreadyHaveAccount}>
                        Впервые на нашем сайте?{' '}
                        <span
                            className={styles.login}
                            onClick={() => router.push('/registration')}
                        >
							Создайте аккаунт
						</span>
                    </p>
                    <div className={styles.innerLine}>
                        <hr className={styles.line} style={{marginRight: '5px'}}/>
                        <span>или</span>
                        <hr className={styles.line} style={{marginLeft: '5px'}}/>
                    </div>
                    <div className={styles.innerImg}>
                        <Image
                            style={{marginRight: '12px'}}
                            src="/img/vk.svg"
                            width={38}
                            height={38}
                            alt="vk"
                        />
                        <Image src="/img/ya.svg" width={38} height={38} alt="yandex"/>
                    </div>
                </div>
            </div>
        </div>
    )
}
