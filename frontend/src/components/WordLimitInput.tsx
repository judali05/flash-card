interface Props {
  value: number | null;
  onChange: (val: number | null) => void;
  disabled?: boolean;
}

const WordLimitInput = ({ value, onChange, disabled }: Props) => {
  const increase = () => {
    if (typeof value === 'number') {
      const newValue = Math.min(value + 5, 25)
      onChange(newValue);
    } else {
      onChange(5);
    }
  };

  const decrease = () => {
    if (typeof value !== 'number' || value === 5) {
      onChange(null);
    } else {
      onChange(value - 5);
    }
  };

  return (
    <div className="mb-6 w-full max-w-sm ">
      <label className="block text-blue-800 font-semibold mb-2" htmlFor="wordLimit">
        Cantidad de palabras a practicar
      </label>

      <div className="flex items-center justify-center gap-2 sm:gap-4">
        <button
          onClick={decrease}
          disabled={disabled}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-bold rounded-xl px-4 py-2 transition duration-200"
        >
          −
        </button>

        <input
          id="wordLimit"
          type="text"
          value={value ?? ""}
          placeholder="—"
          readOnly
          disabled={disabled}
          className="bg-white shadow rounded-xl text-center px-4 py-2 w-65 disabled:opacity-60"
        />

        <button
          onClick={increase}
          disabled={disabled}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-bold rounded-xl px-4 py-2 transition duration-200"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default WordLimitInput;
