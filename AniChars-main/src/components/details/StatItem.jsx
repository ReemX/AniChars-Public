function StatItem({ title, data }) {
  return (
    <p className="py-2 pr-2 first:pt-0 last:pb-0 dark:text-gray-400">
      <span className="font-nova-square font-semibold capitalize">
        {title}:
      </span>{" "}
      {data}
    </p>
  );
}

export default StatItem;
