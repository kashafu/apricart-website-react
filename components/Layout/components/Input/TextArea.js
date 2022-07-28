export default function TextArea({label, placeHolder, onChange, value, name, type, disabled, customOnChange, onEnterPress}){
    
    
    return(
        <div className="flex flex-col w-full space-y-2">
            <p className="font-lato text-main-blue font-semibold">
                {label}
            </p>
            <textarea
                rows={6}
                className="py-2 px-2 rounded-lg bg-slate-200"
                disabled={disabled}
                type={type}
                placeholder={placeHolder}
                value={value}
                name={name}
                onKeyDown={(e)=>{
                    if(onEnterPress){
                        if(e.key === 'Enter'){
                            onEnterPress()
                        }
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