import { HiPlay } from "react-icons/hi2";
import Button from "../../ui/Button";
import CharacterRadarChart from "../../ui/CharacterRadarChart";
import MiniSpinner from "../../ui/MiniSpinner";
import SubHeader from "../SubHeader";
import StarRating from "./StarRating";
import useRating from "./useRating";

function RightPanel({ data }) {
  const { isRating, handleRating, isPending: ratingPending } = useRating(data);

  return (
    <div className="flex flex-col gap-2">
      <div className="h-[12rem] w-[16rem] rounded-lg p-4 pb-10 shadow-[0_0_1rem_1px] shadow-gray-300 dark:shadow-gray-900">
        <SubHeader extraClass="text-center mb-2">Stats</SubHeader>
        <CharacterRadarChart
          data={data.stats}
          outerRadius="80%"
          fontSize={10}
        />
      </div>
      <div className="flex w-[16rem] justify-center rounded-lg p-4 shadow-[0_0_1rem_1px] shadow-gray-300 dark:shadow-gray-900">
        {ratingPending ? (
          <div>
            <MiniSpinner />
          </div>
        ) : (
          <StarRating
            starContainerClass="text-indigo-700 text-2xl px-[0.1rem] dark:text-blue-700"
            containerClass="gap-3 select-none"
            textClass="font-nova-square font-semibold translate-y-[0.05rem] text-lg dark:text-gray-400"
            defaultRating={isRating ? isRating?.rating : 0}
            onSetRating={handleRating}
          />
        )}
      </div>
      <Button
        to={`/series/${data.series.mal_id}`}
        className="flex h-[12.5rem] w-[16rem] flex-col items-center justify-center rounded-lg bg-indigo-700 p-4 shadow-[0_0_1rem_1px] shadow-gray-300 transition-all hover:scale-105 dark:bg-blue-700 dark:shadow-gray-900"
      >
        <HiPlay className="text-[6rem] text-gray-300 dark:text-gray-400" />
        <p className="font-nova-square text-3xl font-semibold uppercase text-gray-300 dark:text-gray-400">
          Go to series
        </p>
      </Button>
    </div>
  );
}

export default RightPanel;
