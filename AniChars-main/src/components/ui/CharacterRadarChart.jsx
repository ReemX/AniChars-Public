import {
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from "recharts";
import { useDarkMode } from "../../context/DarkModeContext";
import colors from "tailwindcss/colors";

function CharacterRadarChart({ data, outerRadius = "65%", fontSize = 12 }) {
  const statsData = Object.entries(data).map((entry) => {
    const [key, value] = entry;
    return { subject: key.toUpperCase(), value };
  });

  const { isDarkMode } = useDarkMode();
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RadarChart cx="50%" cy="50%" outerRadius={outerRadius} data={statsData}>
        <PolarGrid />
        <PolarAngleAxis dataKey="subject" fontSize={fontSize} />
        <Radar
          name="Stats"
          dataKey="value"
          stroke={isDarkMode ? colors.blue[800] : colors.indigo[700]}
          fill={isDarkMode ? colors.blue[800] : colors.indigo[700]}
          fillOpacity={0.6}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
}

export default CharacterRadarChart;
