
"use client"

import axios from "axios";
import { useEffect, useState } from "react";


export default function Test() {
    const [tk, setTk] = useState()

    const getSome = async () => {
        try {
            const res = await axios.get('http://127.0.0.1:8000/api/v1/social/tokens')
            // console.log("res", res)
            setTk(res.data)

        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getSome()

    }, [])
    console.log("tk", tk)
    return (<div>Страница авторизации</div>)
}