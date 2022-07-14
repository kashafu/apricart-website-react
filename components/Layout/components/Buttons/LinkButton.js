import Link from "next/link"

export default function LinkButton({ text, path, onClick }) {
    return (
        <Link href={path} passHref>
            <div className="w-full bg-main-yellow rounded-2xl font-lato text-center p-2 font-bold text-main-blue"
                onClick={()=>{
                    if(onClick){
                        onClick()
                    }
                }}
            >
                <a>
                    {text}
                </a>
            </div>
        </Link>
    )
}