import Button from "./Button";
import { useNavigate } from "react-router-dom";

interface Props {
  status: string | null;
  categoryId: number | null;
  limit: number | null;
}

const PracticeButton = ({ status, categoryId, limit }: Props) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (!status) return;
    const params = new URLSearchParams({ status });
    if (categoryId !== null) params.append("category_id", categoryId.toString());
    if (limit !== null) params.append("limit", limit.toString());
    navigate(`/practice?${params.toString()}`);
  };

  return (
    <Button
      disabled={!status}
      onClick={handleClick}
      className="w-95 px-6 py-2 mt-4 mb-8" 
      >
      Comenzar práctica
    </Button>
  );
};

export default PracticeButton;

