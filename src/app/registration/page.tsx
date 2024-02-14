"use client";
/* баги */
// смотри что можно сделать с типизацией в этом файле
// посмотри как ведет себя юзЛэйаутЭффект и юзЭффект
import Image from "next/image";
import Button from "@/components/ui/Button/Button";
import Input from "@/components/ui/Input/Input";
import { useForm } from "react-hook-form";
import styles from './registration.module.scss'
import { useRouter } from 'next/navigation'
import React from "react";
import { getDataFromActivation } from "@/store/features/user/user-registration.slice";
import { useAppDispatch, useAppSelector } from "@/store/features/hooks";
import { fetchRegistration } from "@/store/features/user/user.actions";


let refresh: null | string = null;

if (typeof window !== "undefined") {
    refresh = localStorage.getItem("refresh_token_svd");
}

export default function Registration() {
    const dispatch = useAppDispatch()
    const router = useRouter()
    const { isError, isLoaded, flag } = useAppSelector(state => state.userRegistration)
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({
        mode: "onBlur"
    });
    const onSubmit = (dataFromInput: any) => {
        dispatch(getDataFromActivation(dataFromInput))
        dispatch(fetchRegistration(dataFromInput))
    };
    React.useEffect(() => {
        if (flag === true) {
            router.push('/activate-instruction')
        }
        if (refresh !== null) {
            router.push('/activate-page')
        }
    }, [flag])


    const password = watch('password')
    return (
        <div>
            <div className={styles.container}>
                <p className={styles.paragraph}>Добро пожаловать в мир су-вид!</p>
                <div className={styles.innerForm}>
                    <p className={styles.innerForm_paragraph}>Регистрация</p>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <label>Username (поле временное)
                            <div style={{ marginTop: '12px', marginBottom: '12px' }}>
                                <Input
                                    register={register}
                                    name="username"
                                    type="text"
                                    placeholder="Mikhail"
                                    options={{ maxLength: { message: "Максимально 150 символов", value: 150 }, }}
                                    error={errors?.username?.message}
                                />
                            </div>
                            {/* @ts-ignore */}
                            {isError?.username && <p style={{ color: "red" }}>Пользователь с таким именем уже есть</p>}
                        </label>
                        <label>Email
                            <div style={{ marginTop: '12px', marginBottom: '12px' }}>
                                <Input
                                    register={register}
                                    name="email"
                                    type="text"
                                    placeholder="ivanov@gmail.com"
                                    options={{
                                        required: "Обязательное поле",
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i,
                                            message: 'Введите корректный ящик'
                                        }
                                    }}
                                    error={errors?.email?.message}
                                />
                            </div>
                            {/* @ts-ignore */}
                            {isError?.email && <p style={{ color: "red" }}>Пользователь с таким именем уже есть</p>}
                        </label>
                        <label> Пароль
                            <div style={{ marginTop: '12px', marginBottom: '24px' }}>
                                <Input
                                    register={register}
                                    name="password"
                                    type="password"
                                    placeholder="*********"
                                    options={{
                                        required: "Обязательное поле",
                                        minLength: { message: "Минимальная длина 8 символов", value: 8 },
                                        pattern: {
                                            // value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d_]{8,}$/,
                                            value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d_!@#$%^&*()-?]{8,}$/,
                                            message: 'Не менее 8 символов и одной буквы (лат), без пробелов'
                                        }
                                    }}
                                    error={errors?.password?.message}
                                />
                            </div>
                        </label>
                        <label> Введите пароль еще раз
                            <div style={{ marginTop: '12px', marginBottom: '24px' }}>
                                <Input
                                    register={register}
                                    name="repeat_password"
                                    type="password"
                                    placeholder="*********"
                                    options={{
                                        required: "Обязательное поле",
                                        validate: value => value === password || "Пароли не совпадают",
                                    }}
                                    error={errors?.repeat_password?.message}
                                />
                            </div>
                        </label>
                        {/* Доделай кнопку с позиции дизейблед */}
                        <Button color={"gray"} style={{ width: '100%', marginBottom: '24px' }} >
                            Зарегистрироваться
                        </Button>
                        {isLoaded === true ? <p style={{ textAlign: "center", color: "aquamarine" }}>Ждем ответа сервера...</p> : null}
                    </form>
                    <p className={styles.alreadyHaveAccount}>У вас уже есть аккаунт ? <span className={styles.login} onClick={() => router.push('/activate-page')}>Войти в аккаунт</span></p>
                    <div className={styles.innerLine}>
                        <hr className={styles.line} style={{ marginRight: '5px' }} />
                        <span>или</span>
                        <hr className={styles.line} style={{ marginLeft: '5px' }} />
                    </div>
                    <div className={styles.innerImg}>
                        <Image
                            style={{ marginRight: "12px" }}
                            src="/img/vk.svg"
                            width={38}
                            height={38}
                            alt="vk"
                        />
                        <Image
                            src="/img/ya.svg"
                            width={38}
                            height={38}
                            alt="yandex"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

