import { useEffect, useState } from "react";
import { sendRequest } from "../api.js";
import BossForm from "./BossForm.jsx";
import BarChart from "./BarChart.jsx";

export default function Homepage() {
  const [bosses, setBosses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingBoss, setEditingBoss] = useState(null);

  const [showChartPage, setShowChartPage] =
    useState(false);

  const [search, setSearch] = useState("");

  const [showDefeated, setShowDefeated] =
    useState(false);

  const [showRemaining, setShowRemaining] =
    useState(false);

  useEffect(() => {
    getBosses();
  }, []);

  async function getBosses() {
    try {
      const data = await sendRequest("/api/bosses");
      setBosses(data.items || data);
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteBoss(id) {
    try {
      await sendRequest(`/api/bosses/${id}`, {
        method: "DELETE",
      });

      getBosses();
    } catch (error) {
      console.log(error);
    }
  }

  let bossesToShow = bosses;

  if (showDefeated === true) {
    bossesToShow = bosses.filter(function (boss) {
      return boss.defeated === true;
    });
  }

  if (showRemaining === true) {
    bossesToShow = bosses.filter(function (boss) {
      return boss.defeated === false;
    });
  }

  bossesToShow = bossesToShow.filter(function (boss) {
    return boss.name
      .toLowerCase()
      .includes(search.toLowerCase());
  });

  if (showForm === true) {
    return (
      <BossForm
        loadBosses={getBosses}
        setShowForm={setShowForm}
        editingBoss={editingBoss}
      />
    );
  }

  if (showChartPage === true) {
    return (
      <BarChart
        bosses={bosses}
        setShowChartPage={setShowChartPage}
      />
    );
  }

  return (
    <main className="min-h-screen bg-[#1e1e1e] p-3 md:p-8">
      <div className="mx-auto bg-[#e5e5e5] p-4 md:p-10">
        <div className="mb-8 flex flex-col gap-8 md:mb-12 md:flex-row md:items-start md:justify-between">
          <div className="w-full">
            <h1
              className="mb-6 text-3xl text-black md:text-5xl"
              style={{ fontFamily: "Cinzel" }}
            >
              Boss Checklist
            </h1>

            <div className="flex flex-wrap gap-3 md:gap-4">
              <button
                onClick={() => {
                  setShowDefeated(false);
                  setShowRemaining(false);
                }}
                className="border border-black px-4 py-2 text-lg md:px-8 md:py-4 md:text-2xl"
                style={{
                  fontFamily: "Cinzel",
                  backgroundColor:
                    showDefeated === false &&
                    showRemaining === false
                      ? "#ffd700"
                      : "#e5e5e5",
                }}
              >
                All
              </button>

              <button
                onClick={() => {
                  setShowDefeated(true);
                  setShowRemaining(false);
                }}
                className="border border-black px-4 py-2 text-lg md:px-8 md:py-4 md:text-2xl"
                style={{
                  fontFamily: "Cinzel",
                  backgroundColor:
                    showDefeated === true
                      ? "#ffd700"
                      : "#e5e5e5",
                }}
              >
                Defeated
              </button>

              <button
                onClick={() => {
                  setShowDefeated(false);
                  setShowRemaining(true);
                }}
                className="border border-black px-4 py-2 text-lg md:px-8 md:py-4 md:text-2xl"
                style={{
                  fontFamily: "Cinzel",
                  backgroundColor:
                    showRemaining === true
                      ? "#ffd700"
                      : "#e5e5e5",
                }}
              >
                Remaining
              </button>
            </div>
          </div>

          <div className="flex w-full flex-col gap-4 md:w-auto md:gap-6">
            <button
              onClick={() => {
                setEditingBoss(null);
                setShowForm(true);
              }}
              className="border border-black bg-[#ffd700] px-4 py-3 text-lg md:px-8 md:py-4 md:text-2xl"
              style={{ fontFamily: "Cinzel" }}
            >
              + Add Boss
            </button>

            <input
              type="text"
              placeholder="Search Bosses..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border border-black bg-[#356b6b] px-4 py-3 text-lg text-black placeholder-black md:px-6 md:py-4 md:text-2xl"
              style={{ fontFamily: "Cinzel" }}
            />

            <button
              onClick={() => setShowChartPage(true)}
              className="border border-black bg-[#356b6b] px-4 py-3 text-lg text-white md:px-8 md:py-4 md:text-2xl"
              style={{ fontFamily: "Cinzel" }}
            >
              Data Visualization
            </button>
          </div>
        </div>

        <div className="hidden border-b border-gray-500 pb-4 md:mb-4 md:flex">
          <div
            className="w-[40%] text-2xl"
            style={{ fontFamily: "Cinzel" }}
          >
            Boss
          </div>

          <div
            className="w-[20%] text-2xl"
            style={{ fontFamily: "Cinzel" }}
          >
            Location
          </div>

          <div
            className="w-[10%] text-2xl"
            style={{ fontFamily: "Cinzel" }}
          >
            Difficulty
          </div>

          <div
            className="w-[15%] text-2xl"
            style={{ fontFamily: "Cinzel" }}
          >
            Defeated
          </div>

          <div
            className="w-[15%] text-2xl"
            style={{ fontFamily: "Cinzel" }}
          >
            Actions
          </div>
        </div>

        {bossesToShow.map(function (boss) {
          return (
            <div
              key={boss.id}
              className="mb-4 border border-gray-400 p-4 md:mb-0 md:flex md:items-center md:border-x-0 md:border-t-0 md:p-4"
              style={{ fontFamily: "Cinzel" }}
            >
              <div className="flex items-center gap-4 md:w-[40%]">
                <span className="text-3xl md:text-4xl">
                  {boss.defeated ? "☑" : "☐"}
                </span>

                <div>
                  <p className="text-xl md:text-2xl">
                    {boss.name}
                  </p>

                  <div className="mt-2 flex flex-col gap-1 text-base md:hidden">
                    <p>{boss.location}</p>
                    <p>
                      Difficulty: {boss.difficulty}
                    </p>
                  </div>
                </div>
              </div>

              <div className="hidden md:block md:w-[20%] md:text-xl">
                {boss.location}
              </div>

              <div className="hidden md:block md:w-[10%] md:text-xl">
                {boss.difficulty}
              </div>

              <div className="hidden md:block md:w-[15%] md:text-xl">
                <span className="text-4xl">
                  {boss.defeated ? "☑" : "☐"}
                </span>
              </div>

              <div className="mt-4 flex gap-3 md:mt-0 md:w-[15%]">
                <button
                  onClick={() => {
                    setEditingBoss(boss);
                    setShowForm(true);
                  }}
                  className="border border-black bg-[#27d7ff] px-3 py-1 text-sm md:px-4 md:text-lg"
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteBoss(boss.id)}
                  className="border border-black bg-[#ff3b3b] px-3 py-1 text-sm md:px-4 md:text-lg"
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}