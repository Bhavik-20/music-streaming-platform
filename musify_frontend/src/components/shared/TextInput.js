
const TextInput = ({
    label,
    placeholder,
    className,
    value,
    setValue,
    labelClassName
}) => {
    return (
        <div className={`input-group d-flex flex-column w-100 ${className}`}>
            <label for={label} className={`text-white ${labelClassName}`}>
                <p>{label}</p>
            </label>
            <input
                type="text"
                placeholder={placeholder}
                className="p-3 border border-solid rounded text-white bg-transparent"
                id={label}
                value={value}
                onChange={(e) => {
                    setValue(e.target.value);
                }}
            />
        </div>
    );
};

export default TextInput;