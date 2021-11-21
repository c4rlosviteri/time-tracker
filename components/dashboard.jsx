import dayjs from "dayjs";
import { useQuery } from "react-query";

function Dashboard() {
  const { data } = useQuery("week", () =>
    fetch("/api/time/week").then((res) => res.json())
  );

  const days =
    data?.data?.reduce((acc, item, index, array) => {
      const day = dayjs(item.timestamp).format("dddd");
      const names = Array.from(new Set(array.map((item) => item.name)));

      if (!acc[day]) {
        acc[day] = Object.fromEntries(names.map((name) => [name, []]));
      }

      acc[day][item.name].push(item);

      return acc;
    }, {}) || {};

  return data ? (
    <section className="container py-8 mx-auto">
      <h2 className="text-2xl font-semibold text-center mb-12">This week</h2>
      <div>
        {Object.entries(days).map(([key, value], index) => {
          const [name, work] = Object.entries(value).flat();
          const start = work.find((item) => item.action === "start")?.timestamp;
          const stop = work.find((item) => item.action === "stop")?.timestamp;
          const mins = dayjs(stop || dayjs(start).endOf("day")).diff(
            dayjs(start),
            "minutes",
            true
          );
          const totalHours = parseInt(mins / 60);
          const totalMins = dayjs().minute(mins).$m;

          return (
            <div key={index}>
              <h3 className="text-base font-semibold mb-2">{key}</h3>
              <h4 className="text-base font-semibold mb-2">
                {name} - {totalHours}:{`${totalMins}`.padStart(2, "0")}h
              </h4>
              {work?.map((item, idx) => (
                <div key={`${index}-${idx}`} className="flex gap-4">
                  <div className="capitalize font-bold w-16">{item.action}</div>
                  <div>{dayjs(item.timestamp).format("HH:mm")}h</div>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </section>
  ) : null;
}

export default Dashboard;
