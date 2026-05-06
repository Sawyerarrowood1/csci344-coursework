import { useState } from "react";
import { getApiBaseUrl } from "../api.js";
import { setToken, setUsername as storeUsername } from "../tokenStorage.js";

export default function Login({ handleLoggedIn }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function sendLoginRequest(e) {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch(`${getApiBaseUrl()}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.token) {
        setError("Login failed.");
        return;
      }

      setToken(data.token);
      storeUsername(username);
      handleLoggedIn();
    } catch {
      setError("Login failed.");
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center bg-[#d9d9d9] pt-16">
      <h1
        className="mb-14 text-center text-5xl text-black"
        style={{ fontFamily: "Cinzel" }}
      >
        Elden Ring
        <br />
        Boss Tracker
      </h1>

      <form
        onSubmit={sendLoginRequest}
        className="w-[340px] bg-[#f3f3f3] p-8 shadow-sm"
      >
        <h2
          className="mb-6 text-3xl text-black"
          style={{ fontFamily: "Cinzel" }}
        >
          Sign In
        </h2>

        {error ? (
          <p className="mb-4 text-sm text-red-600">{error}</p>
        ) : null}

        <input
          className="mb-4 w-full border border-black bg-[#f3f3f3] px-3 py-2 text-lg"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          autoComplete="username"
          required
        />

        <input
          type="password"
          className="mb-6 w-full border border-black bg-[#f3f3f3] px-3 py-2 text-lg"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          autoComplete="current-password"
          required
        />

        <button
          type="submit"
          className="w-full bg-[#2d2d2d] py-3 text-xl text-white transition hover:bg-black"
        >
          Sign In
        </button>
      </form>
    </div>
  );
}
