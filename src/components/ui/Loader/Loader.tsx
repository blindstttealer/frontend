import React from "react";
import Image from "next/image";

export const Loader = () => {
    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000
        }}>
            <Image src="/img/loader.svg" alt='loader' width={100} height={100} draggable={false}
                   priority/>
        </div>
    )
}