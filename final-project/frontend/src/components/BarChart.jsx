import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

export default function BarChartComponent({
  bosses,
  setShowChartPage,
}) {
  const defeatedBosses = bosses.filter(function (boss) {
    return boss.defeated === true;
  });

  const remainingBosses = bosses.filter(function (boss) {
    return boss.defeated === false;
  });

  const completion =
    bosses.length > 0
      ? Math.round(
          (defeatedBosses.length / bosses.length) * 100
        )
      : 0;

  const locationData = [];

  bosses.forEach(function (boss) {
    const foundLocation = locationData.find(function (
      item
    ) {
      return item.location === boss.location;
    });

    if (foundLocation) {
      foundLocation.count =
        foundLocation.count + 1;
    } else {
      locationData.push({
        location: boss.location,
        count: 1,
      });
    }
  });

  const pieData = [
    {
      name: "Defeated",
      value: defeatedBosses.length,
    },
    {
      name: "Remaining",
      value: remainingBosses.length,
    },
  ];

  return (
    <main className="min-h-screen bg-[#1e1e1e] p-3 lg:p-8">
      <div className="mx-auto bg-[#e5e5e5] p-4 lg:p-10">
        <button
          onClick={() => setShowChartPage(false)}
          className="mb-8 border border-black px-6 py-3 text-xl"
        >
          ← Back to List
        </button>

        <h1 className="mb-10 text-4xl lg:text-5xl">
          Boss Overview
        </h1>

        <div className="mb-10 flex flex-wrap gap-4 lg:flex-nowrap">
          <div className="w-[45%] border border-black p-4 text-center lg:w-[220px]">
            <p className="text-2xl">Total Bosses</p>

            <p className="mt-4 text-5xl">
              {bosses.length}
            </p>
          </div>

          <div className="w-[45%] border border-black p-4 text-center lg:w-[220px]">
            <p className="text-2xl">Defeated</p>

            <p className="mt-4 text-5xl">
              {defeatedBosses.length}
            </p>
          </div>

          <div className="w-[45%] border border-black p-4 text-center lg:w-[220px]">
            <p className="text-2xl">Remaining</p>

            <p className="mt-4 text-5xl">
              {remainingBosses.length}
            </p>
          </div>

          <div className="w-[45%] border border-black p-4 text-center lg:w-[220px]">
            <p className="text-2xl">Completion</p>

            <p className="mt-4 text-5xl">
              {completion}%
            </p>
          </div>
        </div>

        <div className="mb-8 overflow-x-auto border border-black p-4">
          <h2 className="mb-6 text-2xl">
            Defeated vs Remaining
          </h2>

          <div className="flex flex-col items-center gap-6 lg:flex-row">
            <PieChart width={300} height={300}>
              <Pie
                data={pieData}
                dataKey="value"
                cx="50%"
                cy="50%"
                outerRadius={100}
              >
                <Cell fill="#ffffff" />

                <Cell fill="#999999" />
              </Pie>
            </PieChart>

            <div className="space-y-4 text-2xl">
              <div className="flex items-center gap-4">
                <div className="h-8 w-8 border border-black bg-white"></div>

                <p>Defeated</p>
              </div>

              <div className="flex items-center gap-4">
                <div className="h-8 w-8 border border-black bg-gray-500"></div>

                <p>Remaining</p>
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto border border-black p-4">
          <h2 className="mb-6 text-2xl">
            Bosses by Location
          </h2>

          <BarChart
            width={700}
            height={300}
            data={locationData}
          >
            <XAxis dataKey="location" />

            <YAxis />

            <Tooltip />

            <Bar
              dataKey="count"
              fill="#999999"
            />
          </BarChart>
        </div>
      </div>
    </main>
  );
}