import { topStats } from "@/data/portfolio";

const StatsSection = () => {
  return (
    <div className="wrap">
      <div className="stats rv" role="list" aria-label="Impact in numbers">
        {topStats.map((stat) => (
          <div className="stat" role="listitem" key={stat.label}>
            <div className="mono stat-p">{stat.label}</div>
            <div className="stat-n disp">
              {stat.value}
              <span style={{ fontSize: "0.4em" }}> {stat.unit}</span>
            </div>
            <div className="stat-l">{stat.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsSection;
