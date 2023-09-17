import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import { db } from "@/settings/firebase.setting";
import { getDocs,collection,orderBy,query } from "firebase/firestore";

export async function getStaticProps() {
    const partners = [];
    const q = query(collection(db,'partners'),orderBy('createdAt','desc'));
    const onSnapShot = await getDocs(q);
    onSnapShot.docs.map(doc => {
        let fireDoc = {data:doc.data()};
        fireDoc.id = doc.id;
        partners.push(fireDoc);
    })
    

    return {
        props:{
            data:partners
        }
    }
}

export default function Paryners({data}) {
    console.log(data);
    return (
        <>
        <Head>
            <link rel="icon" href="/facepal_icon_logo.ico" />
            <meta name="description" content="The Coolest way to connect with friends and hold money" />
            <meta name="keywords" content="facepal" />
            <title>facepal | Partners</title>
        </Head>
        <main className="px-4 py-6 sm:px-16 sm:py-16 md:px-24 md:py-20">
            <h1 className="text-4xl text-gray-700">
                Choose from our list of partners to access financial services
            </h1>
            <section className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mt-8">
                {
                    '111111111'.split('').map(partner => (
                        <article className="border border-gray-200 rounded-lg shadow-md p-4">
                            <div className="flex flex-row justify-between items-center gap-4 mb-4">
                                <blockquote>
                                    <span className="text-2xl">Company name</span>
                                    <span>+2349065487956</span>
                                </blockquote>
                                <Image 
                                width={60}
                                height={60}
                                // className="h-24"
                                src='https://images.pexels.com/photos/2506776/pexels-photo-2506776.jpeg'
                                alt="Company logo"/>
                            </div>

                            <Link href='#' className="flex flex-row  justify-center gap-2 bg-violet-950 rounded-lg p-4 text-white">
                                <span>View Profile</span>
                            </Link>
                        </article>
                    ))
                }
            </section>
        </main>
        </>
    )
}