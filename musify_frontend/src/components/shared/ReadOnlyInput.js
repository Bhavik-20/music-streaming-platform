
const ReadOnlyInput = ({
    label,
    className,
    value,
    labelClassName,
}) => {
    return (
        <div className={`textInputDiv d-flex flex-column w-100 ${className}`}>
            <label for={label} className={`text-white ${labelClassName}`}>
                <p>{label}</p>
            </label>
            <input
                type="text"
                className="p-3 border border-solid rounded bg-transparent text-white"
                id={label}
                value={value}
                readOnly
            />
        </div>
    );
};

export default ReadOnlyInput;