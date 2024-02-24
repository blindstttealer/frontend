import {useRouter} from "next/navigation"
import {useEffect, useState} from "react";

export const useAuth = () => {
    const router = useRouter()
    const [isAuth, setIsAuth] = useState(false)

    useEffect(() => {
        const token = localStorage.getItem('access_token_svd');
        setIsAuth(!!token);
    }, [router]);

    const login = () => {
    }

    const logout = () => {
        localStorage.removeItem('access_token_svd');
        localStorage.removeItem('refresh_token_svd');
        setIsAuth(false)
        router.push('/activate')
    }

    return {isAuth, login, logout}
}