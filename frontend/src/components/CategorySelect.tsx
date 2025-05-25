import { Category } from "../types";

interface Props {
  categories: Category[];
  selectedCategory: number | null;
  onChange: (value: number | null) => void;
  disabled?: boolean;
}

const CategorySelector = ({ categories, selectedCategory, onChange, disabled }: Props) => (
  <div className="mb-6 w-full max-w-sm">
    <label className="block text-blue-800 font-semibold mb-1" htmlFor="categories">
      Categoría a practicar
    </label>
    <select
      id="categories"
      value={selectedCategory ?? ""}
      onChange={(e) => onChange(e.target.value ? Number(e.target.value) : null)}
      disabled={disabled}
      className="w-full bg-white text-gray-800 shadow border-none rounded-xl p-3 disabled:opacity-60"
    >
    <option value="" className="bg-white text-gray-800 rounded-xl">Todas</option>
      {categories.map((cat) => (
        <option key={cat.id} value={cat.id}>{cat.name}</option>
      ))}
    </select>
  </div>
);

export default CategorySelector;
