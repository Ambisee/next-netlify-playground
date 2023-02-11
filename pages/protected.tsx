import Head from "next/head";
import { useEffect } from "react";
import { useRouter } from "next/router";


export default function Protected() {
    const router = useRouter()

    return (
        <div>
            <Head>
                <title>Protected</title>
            </Head>
            <div>
                This is the protected page
            </div>
        </div>
    )
}
