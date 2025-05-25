import Button from "./Button";
import { Word } from "../types";

interface Props {
  value: number | null;
  onChange: (val: number | null) => void;
  words: Word[];
  disabled?: boolean;
}

const WordLimitInput = ({ value, onChange, words, disabled }: Props) => {
  const lengthWords = words.length;

  const decrease = () => {
    if (typeof value !== 'number' || value <= 5) {
      onChange(null);
    } else {
      const minValue = value % 5;
      const canDecrease = minValue !== 0 ? value - minValue : value - 5;
      onChange(canDecrease);  
    }
  };

  const increase = () => {
    if (typeof value === 'number') {
      const maxValue = Math.min(25, lengthWords);
      const canIncrease = value + 5 <= maxValue;
      onChange(canIncrease ? value + 5 : maxValue);
    } else {
      const initial = lengthWords >= 5 ? 5 : lengthWords;
      onChange(initial);
    }
  };

  return (
    <div className="mb-6 w-full max-w-sm ">
      <label className="block text-blue-800 font-semibold mb-2" htmlFor="wordLimit">
        Cantidad de palabras a practicar
      </label>
      <div className="flex items-center justify-center gap-2 sm:gap-4">
        <Button
          onClick={decrease}
          disabled={disabled}
          className="px-4 py-2"
        >−</Button>

        <input
          id="wordLimit"
          type="text"
          value={value ?? ""}
          placeholder="—"
          readOnly
          disabled={disabled}
          className="bg-white shadow rounded-xl text-center px-4 py-2 w-65 disabled:opacity-60"
        />

        <Button
          onClick={increase}
          disabled={disabled}
          className="px-4 py-2"
        >+</Button>
      </div>
    </div>
  );
};

export default WordLimitInput;
