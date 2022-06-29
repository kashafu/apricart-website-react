export default function TextField({label, placeHolder, onChange, value, name, type, disabled}){
    return(
        <div className="grid grid-cols-3">
            <p className="col-span-1">
                {label}
            </p>
            <input
                className="col-span-2"
                disabled={disabled}
                type={type}
                placeholder={placeHolder}
                value={value}
                name={name}
                onChange={(e)=>{
                    onChange(e)
                }}
            />
        </div>
    )
}