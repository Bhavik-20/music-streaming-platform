import 'bootstrap/dist/css/bootstrap.css';

const TextInput = ({
    label,
    placeholder,
    className,
    value,
    setValue,
    labelClassName,
}) => {
    return (
        <div className={`textInputDiv d-flex flex-column w-100 ${className}`}>
            <label for={label} className={`font-weight-bold text-white ${labelClassName}`}>
                {label}
            </label>
            <input
                type="text"
                placeholder={placeholder}
                className="p-3 border border-black border-solid rounded bg-dark text-white"
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