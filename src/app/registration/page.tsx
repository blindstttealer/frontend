"use client";
/* баги */
import Image from "next/image";
import Button from "@/components/ui/Button/Button";
import Input from "@/components/ui/Input/Input";
import { useState } from "react";
import { useForm } from "react-hook-form";
import styles from './page.module.scss'
import Link from "next/link";

export default function Registration() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data: any) => {
        setEmail(data.email);
        setPassword(data.password);
        console.log(data);
    };
    return (
        <div>
            <div className={styles.container}>
                <p className={styles.paragraph}>Добро пожаловать в мир су-вид!</p>
                <div className={styles.innerForm}>
                    <p style={{ marginBottom: '24px' }}>Регистрация</p>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <label>Email
                            <div style={{ marginTop: '12px', marginBottom: '12px' }}>
                                <Input
                                    register={register}
                                    name="email"
                                    type="text"
                                    placeholder="ivanov@gmail.com"
                                    options={{ required: "Email is required" }}
                                    error={errors?.email?.message}
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
                                        required: "Password is required",
                                        minLength: { message: "Min length 6", value: 6 },
                                    }}
                                    error={errors?.password?.message}
                                />
                            </div>
                        </label>
                        {/* Доделай кнопку с позиции дизейблед */}
                        <Button color={"gray"} style={{ width: '100%', marginBottom: '24px' }}>
                            Зарегистрироваться
                        </Button>
                    </form>
                    <p className={styles.alreadyHaveAccount}>У вас уже есть аккаунт? <span className={styles.login}><Link href={'/auth'}>Войти в аккаунт?</Link></span></p>
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

