const DropDown = ({

    label,
    className,
    value,
    options,
    setValue,
    labelClassName,
}) => {

    const handleSelectChange = (e) => {
        console.log(e.target.value);
        setValue(e.target.value);
      };

    return (
        <div className={`textInputDiv text-white flex flex-col space-y-2 w-full ${className}`}>
            <label for={label} className={`font-semibold ${labelClassName}`}>
                {label}
            </label>
            <select
                id="gender"
                className="p-3 border text-white border-gray-400 border-solid rounded bg-black"
                value={value}
                onChange={handleSelectChange}
            >
                <option value="">Select</option>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                    ))}
            </select>
        </div>
    );
};

export default DropDown;