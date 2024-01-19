"use client";
/* баги */
/* типизация дефолтных данных в инпутах формы ломает типизацию */
import Image from "next/image";
import Button from "@/components/ui/Button/Button";
import Input from "@/components/ui/Input/Input";
import { useForm } from "react-hook-form";
import styles from './activate.module.scss'
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { axiosInstance } from "@/api";
import { useRouter } from 'next/navigation'
import { authFailure, authSuccess } from "@/redux/features/user/userAuth";

/* этот интерфейс можно заменить на интерфейс из "./userRegistration" */
interface IAuth {
    email: string,
    password: string,
}
/* */

export default function Authentication() {

    const dispatch = useAppDispatch()
    const { isError, isLoading } = useAppSelector(state => state.userAuth)
    const { profileFromActivation } = useAppSelector(state => state.userRegistration)
    const router = useRouter()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        mode: "onBlur",
        defaultValues: {
            email: profileFromActivation.email,
            password: profileFromActivation.password,
        },
    });

    /* функция отправки данных в базу данных начало */

    const fetchAuth = async (data: any) => {
        try {
            await axiosInstance({
                url: "jwt/create/",
                method: "POST",
                data,
            }).then((res) => dispatch(authSuccess(res.data)))
            router.push('/profile')
        } catch (e) {
            dispatch(authFailure(e))
        }
    };

    /* функция отправки данных конец */
    const onSubmit = (data: any) => {
        fetchAuth(data)
    };

    return (
        <div>
            <div className={styles.container}>
                <p className={styles.paragraph}>С возвращением в мир су-вид!</p>
                <div className={styles.innerForm}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <label>Email
                            <div style={{ marginTop: '12px', marginBottom: '12px' }}>
                                <Input
                                    style={{ color: 'black' }}
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
                            {isError?.response?.data?.email && <p style={{ color: "red" }}>Пользователь с таким ящиком уже есть</p>}
                        </label>
                        <label>
                            <div className={styles.faggotPassword}><span>Пароль</span><span>Забыли пароль?</span></div>
                            <div style={{ marginTop: '12px', marginBottom: '24px' }}>
                                <Input
                                    style={{ color: 'black' }}
                                    register={register}
                                    name="password"
                                    // type="password"
                                    // placeholder="*********"
                                    options={{
                                        required: "Обязательное поле",
                                        minLength: { message: "Минимальная длинна 8 символов", value: 8 },
                                        pattern: {
                                            value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                                            message: 'Не менее 8 символов и одной буквы (лат)'
                                        }
                                    }}
                                    error={errors?.password?.message}
                                />
                            </div>
                        </label>
                        {/* Доделай кнопку с позиции дизейблед */}
                        <Button color={"gray"} style={{ width: '100%', marginBottom: '24px' }}>
                            Войти
                        </Button>
                        {isLoading === true ? <p style={{ textAlign: "center", color: "aquamarine" }}>Ждем ответа сервера...</p> : null}
                    </form>
                    <p className={styles.alreadyHaveAccount}>Впервые на нашем сайте? <span className={styles.login}><Link href={'/registration'}>Создайте аккаунт?</Link></span></p>
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

