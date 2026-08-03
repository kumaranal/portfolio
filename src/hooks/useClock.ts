import { useEffect, useState } from "react";

export function useClock(timeZone = "Asia/Kolkata") {
  const [time, setTime] = useState(() => format(timeZone));

  useEffect(() => {
    const interval = setInterval(() => setTime(format(timeZone)), 1000 * 30);
    return () => clearInterval(interval);
  }, [timeZone]);

  return time;
}

function format(timeZone: string) {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date());
}
