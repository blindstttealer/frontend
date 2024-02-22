"use client";
/* баги */
// смотри что можно сделать с типизацией в этом файле
import Image from "next/image"
import Button from "@/components/ui/Button/Button"
import Input from "@/components/ui/Input/Input"
import { useForm } from "react-hook-form"
import styles from './user-data-form.module.scss'
import { useRouter } from 'next/navigation'

export default function Registration() {
    const router = useRouter()
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({
        mode: "onBlur"
    });
    const onSubmit = (dataFromInput: any) => {
        console.log(dataFromInput)
    };
    const password = watch('password')
    return (
        <div>
            <div className={styles.container}>
                <h2 style={{ color: "red" }}>Данный блок не готов, его не нужно тестировать !!!! Сейчас я его делаю.</h2>
                <div className={styles.innerForm}>
                    <p className={styles.innerForm_paragraph}>Заполните данные о себе</p>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <label> Никнейм
                            <div style={{ marginTop: '12px', marginBottom: '12px' }}>
                                <Input
                                    register={register}
                                    name="nickName"
                                    type="text"
                                    options={{ maxLength: { message: "Максимально 150 символов", value: 150 }, }}
                                    error={errors?.nickName?.message}
                                />
                            </div>
                        </label>
                        <label>Имя
                            <div style={{ marginTop: '12px', marginBottom: '12px' }}>
                                <Input
                                    register={register}
                                    name="userName"
                                    type="text"
                                    placeholder="Иван"
                                    options={{
                                        required: "Обязательное поле",
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i,
                                            message: 'Введите корректный ящик'
                                        }
                                    }}
                                    error={errors?.userName?.message}
                                />
                            </div>
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
        </div >
    );
};

