"use client";

/* есть логи, подумай куда вывести ошибку в случае если она есть */
import Button from "@/components/ui/Button/Button";
import styles from "./page.module.scss"
import Link from "next/link";
import { useRouter } from 'next/navigation'
import { useEffect, useState } from "react";
import axios from "axios"
import { BASE_URL } from "@/api";



export default function Home() {

  let refreshTokenFromLoc = {}

  if (typeof window !== "undefined") {
    refreshTokenFromLoc = {
      refresh: localStorage.getItem("refresh_token"),
    };
  }

  const [err, setErr] = useState<any>('')
  // const refreshTokenFromLoc = {
  //   refresh: localStorage.getItem("refresh_token")
  // }
  const router = useRouter();

  const checkAuth = async () => {
    try {
      const res = await axios.post(`${BASE_URL}jwt/refresh/`, refreshTokenFromLoc);
      localStorage.setItem('access_token', res.data.access)
      router.push('/activate')
    } catch (error) {
      setErr(error)
    }
  }

  useEffect(() => {
    if (localStorage.getItem('refresh_token')) {
      console.log("функция проверки регистрации сработала")
      checkAuth()
    }
  }, [])
  return (
    <div>
      <div className={styles.container}>
        <p className={styles.paragraph}>Добро пожаловать в мир су-вид!</p>
        <div className={styles.innerButton}>
          <Link href="/registration">
            <Button color="purple">Зарегистрироваться</Button>
          </Link>
          <span className={styles.bottomButton}>
            <Link href="/main">
              <Button>Войти без регистрации</Button>
            </Link>
          </span>
        </div>
        {err && <p style={{ color: "red" }}>Есть ошибка при проверки авторизации пользователя, пока ее не обработал</p>}
      </div>
    </div>
  );
}
