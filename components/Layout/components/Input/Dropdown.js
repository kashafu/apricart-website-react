/*
    If you want custom onChange that is defined in the file where the component is called, 
    set customOnChange to true and pass the custom function to onChange
*/
export default function Dropdown({label, options, name, optionText, onChange, value, placeholder, disabled, customOnChange}){
    return(
        <div className="grid grid-cols-3">
            <p className="col-span-1">
                {label}
            </p>
            <select
                className="col-span-2"
                disabled={disabled}
                onChange={(e)=>{
                    if(customOnChange){
                        onChange(e)
                    }
                    else{
                        onChange(e.target.value)
                    }
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
                            key={option.id}
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