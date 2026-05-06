export default function Navbar({ handleLogout, username }) {
  return (
    <nav className="flex items-center justify-between border-b border-black bg-[#d9d9d9] px-8 py-5">
      <h1
        className="text-4xl text-black"
        style={{ fontFamily: "Cinzel" }}
      >
        Elden Ring Boss Tracker
      </h1>

      <div className="flex items-center gap-6">
        <span
          className="text-2xl text-black"
          style={{ fontFamily: "Cinzel" }}
        >
          Signed in as {username}
        </span>

        <button
          type="button"
          onClick={handleLogout}
          className="border border-black bg-[#0d6efd] px-4 py-2 text-2xl text-black hover:opacity-90"
          style={{ fontFamily: "Cinzel" }}
        >
          Log Out
        </button>
      </div>
    </nav>
  );
}