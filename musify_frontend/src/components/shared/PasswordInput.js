const PasswordInput = ({label, placeholder, value, setValue}) => {
    return (
        <div className="input-group text-white d-flex flex-column w-100">
            <label for={label} className="font-semibold">
                <p>{label}</p>
            </label>
            <input
                type="password"
                placeholder={placeholder}
                className="p-3 border border-gray-400 text-white border-solid rounded bg-transparent"
                id={label}
                value={value}
                onChange={(e) => {
                    setValue(e.target.value);
                }}
            />
        </div>
    );
};

export default PasswordInput;