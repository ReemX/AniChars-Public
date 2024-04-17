import { HiChevronLeft } from "react-icons/hi2";
import useGenericQuery from "../../hooks/useGenericQuery";
import { getCharacter } from "../../services/api functions/apiCharacters";
import FullSpinner from "../ui/FullSpinner";
import CharacterPieChart from "./CharacterPieChart";
import CharacterRadarChart from "../ui/CharacterRadarChart";
import { cn } from "../../utils/helpers";

function CharacterStats({ back, id, page }) {
  const { data, isLoading } = useGenericQuery({
    queryKey: ["character", id],
    queryFn: () => getCharacter(id),
  });

  if (isLoading) return <FullSpinner />;

  return (
    <div className="h-full overflow-hidden">
      <div className="absolute left-2 top-2 z-10 cursor-pointer" onClick={back}>
        <HiChevronLeft
          className="text-xl text-indigo-800 dark:text-blue-900"
          strokeWidth={2}
        />
      </div>
      <div
        className={cn(
          "grid h-full translate-x-[-100%] grid-cols-[100%_100%] transition-transform",
          {
            "translate-x-0": page === 1,
          },
        )}
      >
        <CharacterPieChart data={data.ratings} />
        <CharacterRadarChart data={data.stats} />
      </div>
    </div>
  );
}

export default CharacterStats;
