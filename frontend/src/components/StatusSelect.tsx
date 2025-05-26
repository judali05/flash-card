interface Props {
  selectedStatus: string | null;
  onSelect: (status: string) => void;
}

const statuses = [
  { label: "Aprendidas", value: "aprendida" },
  { label: "En proceso", value: "en_proceso" },
  { label: "Por aprender", value: "por_aprender" },
];

const StatusSelector = ({ selectedStatus, onSelect }: Props) => (
  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 w-full max-w-2xl">
    {statuses.map((s) => (
      <button
        key={s.value}
        className={`flex flex-col items-center justify-center p-4 rounded-xl shadow text-center transition border-2
          ${
            selectedStatus === s.value
              ? "bg-blue-100 border-blue-200"
              : "bg-white border-transparent hover:border-blue-50"
          }`}
        onClick={() => onSelect(s.value)}
      >
        <span className="font-semibold text-blue-800">{s.label}</span>
      </button>
    ))}
  </div>
);

export default StatusSelector;
