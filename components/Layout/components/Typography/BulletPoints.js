export default function BulletPoints({points}){
    return(
        <ul className="font-lato text-md font-bold text-main-blue py-2">
            {points.map((point)=>{
                return(
                    <li key={point}>
                        {point}
                    </li>
                )
            })}
        </ul>
    )
}