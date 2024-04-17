import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import useGenericQuery from "../../hooks/useGenericQuery";
import { getTop10Searched } from "../../services/api functions/apiCharacters";
import FullSpinner from "../ui/FullSpinner";
import { useDarkMode } from "../../context/DarkModeContext";
import colors from "tailwindcss/colors";

function CharacterSearchedGraph() {
  const { data, isLoading } = useGenericQuery({
    queryKey: ["top-10-searched"],
    queryFn: getTop10Searched,
    queryOptions: {
      staleTime: 0,
    },
  });
  const { isDarkMode } = useDarkMode();

  if (isLoading)
    return (
      <div className="absolute h-full w-full -translate-y-10">
        <FullSpinner blur={false} />
      </div>
    );

  const dataset = data.map((char) => {
    return { name: char.name, value: char.searched, image: char.image };
  });

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        width={500}
        height={300}
        data={dataset}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="image"
          interval={0}
          height={80}
          tick={({ payload, x, y }) => (
            <svg
              x={x - 70}
              y={y}
              width="100%"
              height="100%"
              preserveAspectRatio="xMidYMid slice"
            >
              <image href={payload.value} width="10%" height="20%" />
            </svg>
          )}
        />
        <YAxis />
        <Bar
          dataKey="value"
          fill={isDarkMode ? colors.blue[800] : colors.indigo[700]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default CharacterSearchedGraph;
