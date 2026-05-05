import React, {useState, useEffect} from "react";
import BarChart from "./BarChart.jsx";

export default function Homepage({ username }) {
  const [items, setItems] = useState([]);
  const baseURL = import.meta.env.VITE_API_BASE_URL;


  useEffect(() => {
    async function getItems() {
      const response = await fetch(`${baseURL}/api/plants`);
      const data = await response.json();
      setItems(data);
      console.log(data);
    }

    getItems();
  }, []);

  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <section className="rounded border border-slate-200 bg-white p-6">
        <h1 className="text-2xl font-semibold">Your app goes here</h1>
        {username ? (
          <p className="mt-2 text-sm text-slate-500">Logged in as {username}</p>
        ) : null}
        <p className="mt-2 text-slate-600">
          You are logged in. Replace this placeholder with your own browse
          view, forms, CRUD workflow, and third-party components.
        </p>
        <BarChart />
      </section>
    </main>
  );
}
