"use client"
import { ReactNode } from "react";
import Header from "@/components/layout/header/header";
import Sidebar from "@/components/layout/sidebar/sidebar";
import Rightbar from "@/components/layout/rightbar/rightbar";
import styles from './layout.module.scss'
import { usePathname, useRouter } from "next/navigation";

export default function Layout({ children, sidebar = true, rightbar = true, isSearch }: {
    children: ReactNode,
    sidebar?: boolean,
    rightbar?: boolean,
    isSearch?: boolean | undefined,
}) {
    const pathname = usePathname()
    return (
        <div className={styles.layout}>
            <div className='container' style={{ flexDirection: "column" }}>
                <Header isSearch={isSearch} />
                <div className={styles.layoutTwo}>
                    {sidebar && <Sidebar />}
                    {children}
                    {/* было */}
                    {/* {rightbar && pathname === '/' && <Rightbar />} */}
                    {/* изменил на */}
                    {rightbar && <Rightbar />}
                </div>
            </div>
        </div>
    )
}