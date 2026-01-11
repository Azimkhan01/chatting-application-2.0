import React, { useMemo } from "react";
import chroma from "chroma-js";

/**
 * Convert string → number (stable hash)
 */
function stringToHue(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash) % 360;
}

function Sender({ name, message,to }) {
  const { bgColor, textColor } = useMemo(() => {
    const hue = stringToHue(name);

    const color = chroma.hsl(hue, 0.6, 0.6); // nice pastel

    return {
      bgColor: color.hex(),
      textColor:
        chroma.contrast(color, "white") > 4.5 ? "#ffffff" : "#000000",
    };
  }, [name]);

  const time = new Date().toLocaleTimeString();

  return (
    <div
      className="m-2 rounded-md p-3 w-5/6 md:w-3/6 self-start shadow-md"
      style={{
        backgroundColor: bgColor,
        color: textColor,
      }}
    >
      <div className="flex justify-between text-sm opacity-80">
        <p className="capitalize font-semibold">{name}</p>
        {
          to !== "All" &&
          <p className="font-semibold">private</p>
        }
        <p>{time}</p>
      </div>

      <p className="mt-1 break-words">{message}</p>
    </div>
  );
}

export default Sender;
