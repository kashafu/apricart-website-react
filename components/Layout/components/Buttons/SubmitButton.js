export default function SubmitButton({text, onClick, disabled}){
    return(
        <div>
            <button
                disabled={disabled}
                onClick={()=>{
                    onClick()
                }}
            >
                {text}
            </button>
        </div>
    )
}