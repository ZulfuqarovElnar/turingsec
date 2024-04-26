import LeaderLine from "../component/LeaderLine";

export default function LeaderBoard() {
  return (
    <section className="sm:px-16 pb-12 sm-8 text-white px-8">
      <h2 className="font-[800] text-[32px] my-6">Leaderboard</h2>
      <div className="space-y-4">
        <LeaderLine />
        <LeaderLine />
        <LeaderLine />
        <LeaderLine />
        <LeaderLine />
      </div>
    </section>
  );
}
