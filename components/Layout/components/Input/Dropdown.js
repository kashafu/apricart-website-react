export default function Dropdown({label, options, name, optionText, onChange, value, placeholder, disabled}){
    return(
        <div className="grid grid-cols-3">
            <p className="col-span-1">
                {label}
            </p>
            <select
                className="col-span-2"
                disabled={disabled}
                onChange={(e)=>{
                    onChange(e)
                }}
                name={name}
                value={value}
            >
                <option
                    value={''}
                    disabled
                    selected
                >
                    {placeholder}
                </option>
                {options.map((option)=>{
                    return(
                        <option
                            value={option.id}
                        >
                            {option[optionText]}
                        </option>
                    )
                })}
            </select>
        </div>
    )
}