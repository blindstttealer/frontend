"use client";

/* есть логи, подумай куда вывести ошибку в случае если она есть */
import Button from "@/components/ui/Button/Button";
import styles from "./page.module.scss";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "@/services/auth/auth.service";

export default function Home() {


  // let refreshTokenFromLoc = {}

  // if (typeof window !== "undefined") {
  //   refreshTokenFromLoc = {
  //     refresh: localStorage.getItem("refresh_token"),
  //   };
  // }

  // const [err, setErr] = useState<any>('')

  const router = useRouter();

  // const checkAuth = async () => {
  //   try {
  //     const res = await axios.post(
  //       `${BASE_URL}jwt/refresh/`,
  //       refreshTokenFromLoc
  //     );
  //     localStorage.setItem("access_token", res.data.access);
  //     router.push("/activate");
  //   } catch (error) {
  //     setErr(error);
  //   }
  // };

  // useEffect(() => {
  //   if (localStorage.getItem("refresh_token")) {
  //     console.log("функция проверки регистрации сработала");
  //     checkAuth();
  //   }
  // }, []);
  return (
    <div>
      <div className={styles.container}>
        <p className={styles.paragraph}>Добро пожаловать в мир су-вид!</p>
        <div className={styles.innerButton}>
          <Button color="purple" onClick={() => router.push("/registration")}>Зарегистрироваться</Button>
          <span className={styles.bottomButton}>
            <Button onClick={() => router.push("/main")}>Войти без регистрации</Button>
          </span>
        </div>
        {/* {err && (
          <p style={{ color: "red" }}>
            Есть ошибка при проверки авторизации пользователя, пока ее не
            обработал
          </p>
        )} */}
      </div>
    </div>
  );
}
