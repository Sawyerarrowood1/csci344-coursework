import { useState } from "react";
import { sendRequest } from "../api.js";

export default function BossForm({
  loadBosses,
  setShowForm,
  editingBoss,
}) {
  const [name, setName] = useState(
    editingBoss ? editingBoss.name : ""
  );

  const [location, setLocation] = useState(
    editingBoss ? editingBoss.location : ""
  );

  const [difficulty, setDifficulty] = useState(
    editingBoss ? editingBoss.difficulty : 1
  );

  const [defeated, setDefeated] = useState(
    editingBoss ? editingBoss.defeated : false
  );

  async function handleSubmit(e) {
    e.preventDefault();

    if (name === "" || location === "") {
      return;
    }

    try {
      if (editingBoss) {
        await sendRequest(
          `/api/bosses/${editingBoss.id}`,
          {
            method: "PATCH",
            body: JSON.stringify({
              name,
              location,
              difficulty: Number(difficulty),
              defeated,
            }),
          }
        );
      } else {
        await sendRequest("/api/bosses", {
          method: "POST",
          body: JSON.stringify({
            name,
            location,
            difficulty: Number(difficulty),
            defeated,
          }),
        });
      }

      loadBosses();
      setShowForm(false);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <main className="min-h-screen bg-[#1e1e1e] p-8">
      <div className="mx-auto bg-[#e5e5e5] p-10">
        <button
          onClick={() => setShowForm(false)}
          className="mb-10 border border-black px-6 py-3 text-2xl"
        >
          ← Back to List
        </button>

        <h1 className="mb-10 text-5xl">
          {editingBoss ? "Edit Boss" : "Add Boss"}
        </h1>

        <form
          onSubmit={handleSubmit}
          className="flex max-w-xl flex-col gap-6"
        >
          <div>
            <label className="mb-2 block text-3xl">
              Boss Name
            </label>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter Boss Name..."
              className="w-full border border-black px-4 py-3 text-2xl"
            />
          </div>

          <div>
            <label className="mb-2 block text-3xl">
              Location
            </label>

            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter Location Name..."
              className="w-full border border-black px-4 py-3 text-2xl"
            />
          </div>

          <div>
            <label className="mb-2 block text-3xl">
              Difficulty (1-5)
            </label>

            <select
              value={difficulty}
              onChange={(e) =>
                setDifficulty(e.target.value)
              }
              className="border border-black px-4 py-3 text-2xl"
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>

          <div>
            <label className="mb-3 block text-3xl">
              Defeated
            </label>

            <div className="flex items-center gap-4">
              <input
                type="checkbox"
                checked={defeated}
                onChange={(e) =>
                  setDefeated(e.target.checked)
                }
                className="h-8 w-8"
              />

              <span className="text-2xl">
                Boss Defeated
              </span>
            </div>
          </div>

          <div className="mt-8 flex gap-6">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="border border-black px-8 py-3 text-2xl"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="border border-black bg-[#ffd700] px-8 py-3 text-2xl"
            >
              Save Boss
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}