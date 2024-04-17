import useUser from "../../../hooks/useUser";
import LikeButton from "../LikeButton";
import StatItem from "../StatItem";
import StatList from "../StatList";
import SubHeader from "../SubHeader";

function LeftPanel({ data }) {
  const { user } = useUser();

  const favorite =
    user && user.favoriteCharacters
      ? user.favoriteCharacters.find((chara) => chara.id === data.id)
      : undefined;

  const isFavorite = favorite !== undefined;

  return (
    <div className="w-[15rem]">
      <img
        src={data.image}
        className="mb-2 h-[19rem] w-full rounded-lg object-cover"
      />
      <SubHeader>Stats</SubHeader>
      <StatList>
        <StatItem
          title="rating"
          data={
            <>
              {data.ratingsAverage}⭐{" "}
              <span className="text-sm font-semibold text-gray-600">
                By {data.ratingsQuantity === 0 ? 1 : data.ratingsQuantity} Users
              </span>
            </>
          }
        />
        <StatItem title="Series" data={data.series.title.substring(0, 19)} />
        <LikeButton isFavorite={isFavorite} id={data.id} type="characters" />
      </StatList>
    </div>
  );
}

export default LeftPanel;
