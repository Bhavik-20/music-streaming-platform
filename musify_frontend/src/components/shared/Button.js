
const Button = ({
    onClick,
    className,
    text
}) => {
    return (
        <button className={`rounded-pill ${className}`} onClick={onClick}>
        {text}
    </button>
    );
};

export default Button;