import { useQuery, useMutation, useQueryClient } from "react-query";
import dayjs from "dayjs";

function Action({ label, lastUpdate, defaultLabel, action, session }) {
  const queryClient = useQueryClient();
  const mutation = useMutation(
    (newTodo) =>
      fetch("/api/time/today", {
        method: "POST",
        body: JSON.stringify(newTodo),
      }).then((res) => res.json()),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("day");
      },
    }
  );

  return (
    <div className="flex gap-2 items-center">
      <button
        className="border border-black rounded-md py-2 px-4 hover:bg-black hover:text-white transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none"
        disabled={lastUpdate}
        onClick={() =>
          mutation.mutate({
            name: session.user.name,
            timestamp: new Date().toISOString(),
            action,
          })
        }
        type="button"
      >
        {label}
      </button>
      {lastUpdate ? (
        <span>At: {dayjs(lastUpdate.timestamp).format("HH:mm")}</span>
      ) : (
        defaultLabel
      )}
    </div>
  );
}

const filterByAction = ({ data }, action, session) =>
  data?.find(
    (item) => item.action === action && item.name === session.user.name
  );

function Actions({ session }) {
  const { data } = useQuery("day", () =>
    fetch("/api/time/today").then((res) => res.json())
  );

  return data ? (
    <section className="container py-8 mx-auto">
      <h2 className="text-2xl font-semibold text-center mb-12">
        {dayjs().format("dddd - YYYY-MM-DD")}
      </h2>
      <div className="grid md:grid-cols-2 gap-4">
        <Action
          label="Start ▶️"
          lastUpdate={filterByAction(data, "start", session)}
          action="start"
          defaultLabel="No started today"
          session={session}
        />
        <Action
          label="Stop ⏹️"
          lastUpdate={filterByAction(data, "stop", session)}
          action="stop"
          defaultLabel="No stopped today"
          session={session}
        />
      </div>
    </section>
  ) : null;
}

export default Actions;
