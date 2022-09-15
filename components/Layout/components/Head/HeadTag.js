import Head from 'next/head'

import { mode } from '../../../../information.json'

export default function HeadTag({ title, description, isIndex }) {
    return (
        <Head>
            <title>{title}</title>
            {description && (
                <meta name="description" content={description} />
            )}
            {isIndex && mode === 'production' && (
                <>
                    <meta name="robots" content="INDEX,FOLLOW" />
                    <meta property="og:type" content="website" />
                    <meta property="og:title" content="Apricart.Pk Online Grocery Store - Best Grocer Shopping App in Karachi Peshawar Pakistan" />
                    <meta property="og:description" content="Apricart.Pk - Online Grocery Store in Pakistan: Deliver Groceries,Beverages,Bakery, Fruits & Vegetables, Rice, Pulses, Spices, Pet Care, Health Care, on Same Day Delivery | Online Grocer App in Karachi, Peshawar Pakistan" />
                    <meta property="og:url" content="https://www.apricart.pk" />
                    <meta property="og:site_name" content="apricart.pk" />
                    <meta name="google-site-verification" content="bHeAgqKirEzuGKY7Pc0wNBI4_-emK9yTRRsWyr6hTMk" />
                    <script
                        type="application/ld+json"
                        dangerouslySetInnerHTML={{
                            __html: JSON.stringify({
                                "@context": "http:\/\/schema.org",
                                "@type": "WebSite",
                                "url": "https:\/\/www.apricart.pk\/",
                                "name": "Apricart.pk"
                            })
                        }}
                    />
                </>
            )}
        </Head>
    )
}