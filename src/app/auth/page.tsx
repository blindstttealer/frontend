"use client"
import Button from '@/components/ui/Button/Button';
import Input from '@/components/ui/Input/Input';
import React, { useLayoutEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { axiosInstance } from '@/api';
import { redirect } from 'next/navigation';
// import { useLayoutEffect } from 'react';


interface IErrors {
    email?: string[],
    password?: string[],
    username?: string[]
}

export default function Registration() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userName, setUserName] = useState('')
    const [user, setGetUser] = useState("")
    const [token, setToken] = useState()
    const [fetchError, setFetchError] = useState<IErrors>({})
    const [flag, setFlag] = useState(true)
    const [isRegisterSuccess, setIsRegisterSuccess] = useState(false)
    const [isAuth, setIsAuth] = useState(false)

    const fetchRegister = async (data: any) => {
        try {
            await axiosInstance({
                url: "users/",
                method: "POST",
                data,
            }).then((res) => {
                setGetUser(res.data);
                setIsRegisterSuccess(true)
                if (!isRegisterSuccess) {
                    setFlag(false)
                }
            });
        } catch (e) {
            console.log(e)
            setFetchError(e?.response?.data);
        }
    };

    const fetchAuthentication = async (data: any) => {
        try {
            await axiosInstance({
                url: "jwt/create/",
                method: "POST",
                data,
            }).then((res) => {
                setToken(res.data);
                setIsAuth(true)
                console.log(isAuth)
            });
        } catch (e) {
            console.error(e);
        }
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onRegister = (data1: any) => {
        setEmail(data1.email);
        setPassword(data1.password);
        setUserName(data1.userName);
        fetchRegister(data1);
    };
    const authorization = (data: any) => {
        setEmail(data.email);
        setPassword(data.password);
        fetchAuthentication(data)
    };

    useLayoutEffect(() => {
        if (isAuth) {
            redirect("/profile")
        }
    }, [isAuth])
    
    return (
        <div>
            <p><span onClick={() => setFlag(true)} style={{ cursor: "pointer" }}>Регистрация</span>/ <span onClick={() => setFlag(false)} style={{ cursor: "pointer" }}>Авторизация</span></p>
            {flag ?
                <div>
                    <form onSubmit={handleSubmit(onRegister)}>
                        <Input
                            register={register}
                            name="username"
                            type="text"
                            placeholder="Придумайте имя"
                            options={{ required: "Поле обязательно" }}
                            error={errors?.userName?.message}
                        /><Input
                            register={register}
                            name="email"
                            type="text"
                            placeholder="Введите email"
                            options={{ required: "Поле обязательно" }}
                            error={errors?.email?.message}
                        />
                        <Input
                            register={register}
                            name="password"
                            type="password"
                            placeholder="Придумайте пароль"
                            // пароль должен валидироваться по следующим требованиям (Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.)
                            options={{
                                required: "Поле обязательно",
                                minLength: { message: "Min length 6", value: 6 },
                            }}
                            error={errors?.password?.message}
                        />
                        <Button size="medium" color="yellow">
                            Регистрация
                        </Button>
                        {fetchError.username ? <p style={{ color: 'red' }}>{fetchError.username?.map(item => item)}</p> : null}
                        {fetchError.email ? <p style={{ color: 'red' }}>{fetchError.email?.map(item => item)}</p> : null}
                        {fetchError.password ? <p style={{ color: 'red' }}>{fetchError.password?.map(item => item)}</p> : null}
                    </form>
                </div>
                :
                <div>
                    <form onSubmit={handleSubmit(authorization)}>
                        <Input
                            register={register}
                            name="email"
                            type="text"
                            placeholder="Введите email"
                            options={{ required: "Поле обязательно" }}
                            error={errors?.email?.message}
                        />
                        <Input
                            register={register}
                            name="password"
                            type="password"
                            placeholder="Введите пароль"
                            // пароль должен валидироваться по следующим требованиям (Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.)
                            options={{
                                required: "Поле обязательно",
                                minLength: { message: "Min length 6", value: 6 },
                            }}
                            error={errors?.password?.message}
                        />
                        <Button type='submit' size="medium" color="yellow">
                            Авторизация
                        </Button>
                    </form>
                </div>
            }
            {isRegisterSuccess && <p>Вы успешно зарегистрировались, пожалуйста авторизируйтесь в форме выше</p>}
        </div>
    );
};

