const games = [
  "Mobile Legends 💎",
  "PUBG Mobile UC",
  "Free Fire 💎",
  "Honor of Kings",
  "Blood Strike",
  "Telegram ⭐"
];

function Home() {
  return (
    <div className="p-5">

      <h1 className="text-3xl font-bold">
        🎮 NYI GAME SHOP
      </h1>

      <div className="mt-5 bg-zinc-900 p-4 rounded-xl">
        Wallet
        <h2 className="text-yellow-400 text-2xl">
          0 Ks
        </h2>
      </div>

      <h2 className="mt-6 text-xl">
        Popular Games
      </h2>

      <div className="grid grid-cols-2 gap-4 mt-4">
        {games.map((game,index)=>(
          <div
            key={index}
            className="bg-zinc-900 p-4 rounded-xl border border-zinc-700"
          >
            {game}
            <button className="mt-3 w-full bg-yellow-500 text-black rounded-lg p-2">
              ဝယ်မယ်
            </button>
          </div>
        ))}
      </div>

    </div>
  );
}

export default Home;