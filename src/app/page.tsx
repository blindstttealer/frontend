"use client";
import Button from "@/components/ui/Button/Button";
import styles from "./page.module.scss"
import Link from "next/link";


export default function Home() {


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
      </div>
    </div>
  );
}
