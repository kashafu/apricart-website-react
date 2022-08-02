import Head from 'next/head'

export default function HeadTag({title, description}){
    return(
        <Head>
            <title>{title}</title>
            {description && (
                <meta name="description" content={description}></meta>
            )}
        </Head>
    )
}