'use client'
import {useAuth} from "@/hooks/useAuth";
import {useEffect} from "react";
import Button from "@/components/ui/Button/Button";

export default function Sidebar() {
    const {isAuth, logout} = useAuth()
    return (
        <div>
            {isAuth ? (
                <div>
                    <p>
                        auth
                    </p>
                </div>
            ) : (
                <div>
                    <p>
                        not auth
                    </p>
                </div>
            )}
        </div>
    )
};