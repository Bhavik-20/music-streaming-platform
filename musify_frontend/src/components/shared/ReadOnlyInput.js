
const ReadOnlyInput = ({
    label,
    placeholder,
    className,
    value,
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
                readOnly
            />
        </div>
    );
};

export default ReadOnlyInput;