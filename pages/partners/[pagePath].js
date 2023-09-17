'use client'
// import Image from "next/image";
import Head from "next/head";
import { db } from "@/settings/firebase.setting";
import { query,where,getDocs,collection } from "firebase/firestore";
// import { useRouter } from "next/router";
import { usePathname } from 'next/navigation'

export async function getStaticPaths() {
    const onSnapshot = await getDocs(collection(db,'partners'));
    const paths = onSnapshot.docs.map(doc => {
        return {
            params:{
                pagePath:doc.data().pagePath,
            }
        }
    })

    return {
        paths,
        fallback:false
    }
}

export async function getStaticProps({params}) {
    const pathname = usePathname();
    // const router = useRouter();
    let partnerDoc = [];
    
    const getPartnerInfo = async () => {
        const q = query(collection(db,'partners'),where('pagePath','==',pathname));
        const onSnapShot = await getDocs(q);
        onSnapShot.docs.map(doc => {
            let doc_ = {
                data:doc.data()
            };
            doc_.id = doc.id;
            partnerDoc.push(doc_);
        })
    }
    getPartnerInfo();

    return {
        props:{
            partnerDoc
        }
    }
}

export default function PartnerInfo({data}) {


    return (
        <>
        <Head>
            <link rel="icon" href="/facepal_icon_logo.ico" />
            <meta name="description" content="The Coolest way to connect with friends and hold money" />
            <meta name="keywords" content="facepal" />
            <title>facepal Partners | </title>
        </Head>
        <main className="px-4 py-6 sm:px-16 sm:py-16 md:px-24 md:py-20">

        </main>
        </>
    )
}