import { useParams } from "react-router-dom";
import CommentsSection from "../components/details/characters/CommentsSection";
import LeftPanel from "../components/details/characters/LeftPanel";
import MiddlePanel from "../components/details/characters/MiddlePanel";
import RightPanel from "../components/details/characters/RightPanel";
import FullSpinner from "../components/ui/FullSpinner";
import useGenericQuery from "../hooks/useGenericQuery";
import { getCharacter } from "../services/api functions/apiCharacters";

function Character() {
  const { id } = useParams();
  const { data, isLoading } = useGenericQuery({
    queryKey: ["character", id],
    queryFn: () => getCharacter(id),
  });

  if (isLoading) return <FullSpinner blur={false} size="lg" />;

  return (
    <div className="mx-auto flex min-w-[50rem] max-w-[80rem] flex-col gap-6 rounded-lg border border-indigo-700 bg-gray-100 p-5 shadow-[0_20px_50px] shadow-gray-400 dark:border-blue-700 dark:bg-gray-800 dark:shadow-gray-800">
      <div className="grid grid-cols-[auto_1fr_auto] gap-6">
        <LeftPanel data={data} />
        <MiddlePanel data={data} />
        <RightPanel data={data} />
      </div>
      <CommentsSection id={data.id} />
    </div>
  );
}

export default Character;
