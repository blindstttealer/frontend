"use client"
import React from "react";
import Header from "@/components/layout/header/header";
import Sidebar from "@/components/layout/sidebar/sidebar";
import Rightbar from "@/components/layout/rightbar/rightbar";
import styles from './layout.module.scss'
import {usePathname, useRouter} from "next/navigation";

export default function Layout({children, sidebar = true, rightbar = true}: {
    children: React.ReactNode,
    sidebar?: boolean,
    rightbar?: boolean
}) {
    const pathname = usePathname()
    return (
        <div className={styles.layout}>
            <div className='container' style={{flexDirection: "column"}}>
                <Header/>
                <div className={styles.layoutTwo}>
                    {sidebar && <Sidebar/>}
                    {children}
                    {rightbar && pathname === '/' && <Rightbar/>}
                </div>
            </div>
        </div>
    )
}