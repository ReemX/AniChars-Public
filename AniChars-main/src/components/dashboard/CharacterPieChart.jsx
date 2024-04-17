import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import tailColors from "tailwindcss/colors";
import { useDarkMode } from "../../context/DarkModeContext";

const colors = ["#e913de", "#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const fakeData = [
  { name: "1⭐", value: 1 },
  { name: "2⭐", value: 1 },
  { name: "3⭐", value: 1 },
  { name: "4⭐", value: 1 },
  { name: "5⭐", value: 1 },
];

function CharacterPieChart({ data: online }) {
  let ratingData = {
    "5⭐": 0,
    "4⭐": 0,
    "3⭐": 0,
    "2⭐": 0,
    "1⭐": 0,
  };

  online.forEach((rating) => (ratingData[`${rating.rating}⭐`] += 1));

  ratingData = Object.entries(ratingData).map((entry) => {
    const [key, value] = entry;
    return { name: key, value };
  });

  ratingData = ratingData.filter((entry) => entry.value > 0);

  const { isDarkMode } = useDarkMode();
  let data;

  if (online.length === 0) {
    data = fakeData;
  } else {
    data = ratingData;
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      {online.length === 0 && (
        <p className="absolute bottom-1/2 right-1/2 translate-x-[50%] translate-y-[50%] dark:text-gray-400">
          No data!
        </p>
      )}
      <PieChart>
        <Tooltip />
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          fill={colors}
          label={(entry) => entry.name}
          outerRadius={80}
          innerRadius={55}
          paddingAngle={5}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell
              stroke={isDarkMode ? tailColors.gray[400] : ""}
              key={`cell-${index}`}
              fill={colors[index % colors.length]}
            />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}

export default CharacterPieChart;
