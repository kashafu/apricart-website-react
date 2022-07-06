export default function TextField({label, placeHolder, onChange, value, name, type, disabled, customOnChange, onEnterPress}){
    
    
    return(
        <div className="grid grid-cols-3 gap-4 items-center">
            <p className="col-span-1 font-lato text-main-blue font-semibold">
                {label}
            </p>
            <input
                className="col-span-2 h-[40px] py-2 px-4 rounded-lg"
                disabled={disabled}
                type={type}
                placeholder={placeHolder}
                value={value}
                name={name}
                onKeyDown={(e)=>{
                    if(e.key === 'Enter'){
                        onEnterPress()
                    }
                }}
                onChange={(e)=>{
                    if(customOnChange){
                        onChange(e)
                    }
                    else{
                        onChange(e.target.value)
                    }
                }}
            />
        </div>
    )
}