interface ButtonProps {
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
}

const Button = ({onClick, disabled, children, className=""}: ButtonProps) => (
    <button
        onClick={onClick}
        disabled={disabled}
        className={`bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white font-bold rounded-xl shadow transition duration-200 ${className}`}
    >
        {children}
    </button>
);

export default Button