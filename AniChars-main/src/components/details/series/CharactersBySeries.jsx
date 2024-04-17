import useGenericQuery from "../../../hooks/useGenericQuery";
import { getCharactersBySeries } from "../../../services/api functions/apiSeries";
import { cn, scrollbar } from "../../../utils/helpers";
import CharSearchItem from "../../search/CharSearchItem";
import FullSpinner from "../../ui/FullSpinner";
import SubHeader from "../SubHeader";

function CharactersBySeries({ id, title }) {
  const { data, isLoading } = useGenericQuery({
    queryKey: ["characters-by-series", id],
    queryFn: () => getCharactersBySeries(id),
  });

  return (
    <>
      <SubHeader extraClass="text-left mb-0">
        All Characters of The Series {title.toUpperCase()}
      </SubHeader>
      <div
        className={cn(
          "relative h-full divide-y overflow-y-auto rounded-lg border p-4 dark:divide-gray-600 dark:border-gray-600",
          scrollbar({ thick: false, roundTrack: true }),
        )}
      >
        {isLoading ? (
          <div className="absolute inset-0">
            <FullSpinner blur={false} />
          </div>
        ) : data ? (
          data.map((char) => <CharSearchItem char={char} key={char.malId} />)
        ) : (
          <p className="text-center font-nova-square text-4xl uppercase dark:text-gray-400">
            no data found!
          </p>
        )}
      </div>
    </>
  );
}

export default CharactersBySeries;
