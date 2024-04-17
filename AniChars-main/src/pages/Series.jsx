import { format } from "date-fns";
import { useParams } from "react-router-dom";
import Header from "../components/details/Header";
import LikeButton from "../components/details/LikeButton";
import Paragraph from "../components/details/Paragraph";
import StatItem from "../components/details/StatItem";
import StatList from "../components/details/StatList";
import SubHeader from "../components/details/SubHeader";
import CharactersBySeries from "../components/details/series/CharactersBySeries";
import Button from "../components/ui/Button";
import FullSpinner from "../components/ui/FullSpinner";
import Modal from "../components/ui/Modal";
import useGenericQuery from "../hooks/useGenericQuery";
import useUser from "../hooks/useUser";
import { getSeries } from "../services/api functions/apiSeries";

function Series() {
  const { id } = useParams();
  const { data, isLoading } = useGenericQuery({
    queryKey: ["series", id],
    queryFn: () => getSeries(id),
  });
  const { user } = useUser();

  if (isLoading) return <FullSpinner blur={false} size="lg" />;

  const favorite = user.favoriteSeries.find((series) => series.mal_id === +id);
  const isFavorite = favorite !== undefined;

  const date = format(new Date(data.aired), "dd.MM.yyyy");

  return (
    <div className="mx-auto grid max-w-[80rem] grid-cols-[auto_1fr] gap-x-6 rounded-lg border bg-gray-100 p-5 shadow-[0_20px_50px] shadow-gray-400 dark:border-blue-700 dark:bg-gray-800 dark:shadow-gray-800">
      <div>
        <img
          src={data.image}
          className="mb-2 h-[19rem] w-[15rem] rounded-lg object-cover"
        />
        <SubHeader>About</SubHeader>
        <StatList className="divide-y border-x-2 px-2 dark:divide-gray-700 dark:border-gray-700">
          <StatItem title="media" data={data.type} />
          <StatItem title="air-date" data={date} />
          <StatItem title="status" data={data.status} />
          <StatItem title="episodes" data={data.episodes} />
          <LikeButton isFavorite={isFavorite} type="series" id={data._id} />
        </StatList>
      </div>
      <div className="flex flex-col">
        <Header>{data.title}</Header>
        <SubHeader extraClass="text-left">Synopsis</SubHeader>
        <Paragraph>{data.synopsis}</Paragraph>
        <SubHeader extraClass="text-left">Background</SubHeader>
        <Paragraph>{data.background}</Paragraph>
        <Modal>
          <Modal.Open opens="CharactersList">
            <Button className="mx-auto rounded-2xl border-4 border-indigo-600 bg-gray-200 px-16 py-6 font-nova-square text-3xl font-bold text-indigo-600 transition-all hover:scale-105 dark:border-blue-700 dark:bg-gray-700 dark:text-blue-700">
              Check out all the characters for this series!
            </Button>
          </Modal.Open>
          <Modal.Window
            name="CharactersList"
            className="relative my-5 flex h-full max-h-[42.5rem] w-[60rem] flex-col gap-4 overflow-hidden rounded-lg bg-gray-50 p-4 shadow-2xl dark:bg-gray-700"
            exitButtonClass="text-2xl absolute right-4 dark:text-gray-400"
          >
            <CharactersBySeries id={id} title={data.title} />
          </Modal.Window>
        </Modal>
      </div>
    </div>
  );
}

export default Series;
