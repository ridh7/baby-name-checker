"use client";

import { scaleLinear } from "d3-scale";
import stateGridDataDiacritics from "./stateGridDataDiacritics.json"; // Ensure this path is correct
import stateGridDataLength from "./stateGridDataLength.json";

export default function Home() {
  // ── COLOR SCALE for the map ──
  // This scale maps data values from 1 to 3 to a range of colors
  // from light red (#ff0000) to dark red (#300000).
  const colorScale1 = scaleLinear<string>()
    .domain([1, 3]) // Data values 1, 2, 3
    .range(["#3fa9f5", "#14183d"]); // Corresponding colors

  const colorScale2 = scaleLinear<string>()
    .domain([1, 5]) // Data values 1, 2, 3
    .range(["#ff0000", "#300000"]); // Corresponding colors

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 flex flex-col items-center justify-center">
      {/* ——— Square-Tile Grid Map ——— */}
      <div className="w-full max-w-screen-lg mx-auto p-4 sm:p-6 bg-white rounded-lg shadow-xl">
        {" "}
        {/* Added shadow-xl and responsive padding */}
        <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-center text-gray-800">
          {" "}
          {/* Responsive text and margin */}
          Accents Permitted in First Names
        </h2>
        <div className="grid grid-cols-11 grid-rows-7 gap-1 max-w-md mx-auto sm:max-w-lg">
          {" "}
          {/* Centered grid and responsive max-width */}
          {(
            Object.entries(stateGridDataDiacritics) as [
              string,
              { row: number; col: number; value: number; asterisk: boolean }
            ][]
          ).map(([abbr, { row, col, value, asterisk }]) => {
            // Determine background color: use colorScale for values 1-3, or gray for 0/other.
            const bgColor =
              value >= 1 && value <= 3 ? colorScale1(value) : "#dddddd";

            return (
              <div
                key={abbr}
                style={{
                  gridRow: row,
                  gridColumn: col,
                  backgroundColor: bgColor,
                }}
                className="aspect-square flex items-center justify-center text-white font-bold rounded text-xs sm:text-sm" /* Responsive text size */
              >
                {abbr}
                {asterisk ? "*" : ""}
              </div>
            );
          })}
        </div>
        {/* --- MAP LEGEND --- */}
        <div className="mt-6 sm:mt-8">
          <h4 className="text-sm sm:text-base font-semibold mb-3 text-center text-gray-700">
            Restriction Level Legend
          </h4>
          <div className="flex justify-center items-start space-x-2 sm:space-x-4">
            <div className="flex flex-col items-center text-center">
              <div
                className="w-4 h-4 sm:w-5 sm:h-5 rounded mb-1 border border-gray-400"
                style={{ backgroundColor: colorScale1(1) }} // Light Red for value 1
              ></div>
              <span className="text-xs text-gray-600">No Restrictions</span>
            </div>
            <div className="flex flex-col items-center text-center">
              <div
                className="w-4 h-4 sm:w-5 sm:h-5 rounded mb-1 border border-gray-400"
                style={{ backgroundColor: colorScale1(2) }} // Mid Red for value 2
              ></div>
              <span className="text-xs text-gray-600">Some Restrictions</span>
            </div>
            <div className="flex flex-col items-center text-center">
              <div
                className="w-4 h-4 sm:w-5 sm:h-5 rounded mb-1 border border-gray-400"
                style={{ backgroundColor: colorScale1(3) }} // Dark Red for value 3
              ></div>
              <span className="text-xs text-gray-600">Many Restrictions</span>
            </div>
          </div>
          <p className="mt-3 text-center text-xs text-gray-500 px-2">
            Map visualizes restriction levels from light blue to dark blue. Asterisks indicate that the data is not from an official source.
          </p>
        </div>
        {/* --- END OF MAP LEGEND --- */}
      </div>
      <div className="w-full max-w-screen-lg mx-auto p-4 sm:p-6 bg-white rounded-lg shadow-xl">
        {" "}
        {/* Added shadow-xl and responsive padding */}
        <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-center text-gray-800">
          {" "}
          {/* Responsive text and margin */}
          First Name Length Restrictions
        </h2>
        <div className="grid grid-cols-11 grid-rows-7 gap-1 max-w-md mx-auto sm:max-w-lg">
          {" "}
          {/* Centered grid and responsive max-width */}
          {(
            Object.entries(stateGridDataLength) as [
              string,
              { row: number; col: number; value: number; asterisk: boolean }
            ][]
          ).map(([abbr, { row, col, value, asterisk }]) => {
            // Determine background color: use colorScale for values 1-3, or gray for 0/other.
            const bgColor =
              value >= 1 && value <= 5 ? colorScale2(value) : "#dddddd";

            return (
              <div
                key={abbr}
                style={{
                  gridRow: row,
                  gridColumn: col,
                  backgroundColor: bgColor,
                }}
                className="aspect-square flex items-center justify-center text-white font-bold rounded text-xs sm:text-sm" /* Responsive text size */
              >
                {abbr}
                {asterisk ? "*" : ""}
              </div>
            );
          })}
        </div>
        {/* --- MAP LEGEND --- */}
        <div className="mt-6 sm:mt-8">
          <h4 className="text-sm sm:text-base font-semibold mb-3 text-center text-gray-700">
            Restriction Level Legend
          </h4>
          <div className="flex justify-center items-start space-x-2 sm:space-x-4">
            <div className="flex flex-col items-center text-center">
              <div
                className="w-4 h-4 sm:w-5 sm:h-5 rounded mb-1 border border-gray-400"
                style={{ backgroundColor: colorScale2(1) }} // Light Red for value 1
              ></div>
              <span className="text-xs text-gray-600">Lesser (1)</span>
            </div>
            <div className="flex flex-col items-center text-center">
              <div
                className="w-4 h-4 sm:w-5 sm:h-5 rounded mb-1 border border-gray-400"
                style={{ backgroundColor: colorScale2(2) }} // Mid Red for value 2
              ></div>
              <span className="text-xs text-gray-600">Less (2)</span>
            </div>
            <div className="flex flex-col items-center text-center">
              <div
                className="w-4 h-4 sm:w-5 sm:h-5 rounded mb-1 border border-gray-400"
                style={{ backgroundColor: colorScale2(3) }} // Dark Red for value 3
              ></div>
              <span className="text-xs text-gray-600">Moderate (3)</span>
            </div>
            <div className="flex flex-col items-center text-center">
              <div
                className="w-4 h-4 sm:w-5 sm:h-5 rounded mb-1 border border-gray-400"
                style={{ backgroundColor: colorScale2(4) }} // Dark Red for value 3
              ></div>
              <span className="text-xs text-gray-600">Great (4)</span>
            </div>
            <div className="flex flex-col items-center text-center">
              <div
                className="w-4 h-4 sm:w-5 sm:h-5 rounded mb-1 border border-gray-400"
                style={{ backgroundColor: colorScale2(5) }} // Dark Red for value 3
              ></div>
              <span className="text-xs text-gray-600">Greater (5)</span>
            </div>
          </div>
          <p className="mt-3 text-center text-xs text-gray-500 px-2">
            Map visualizes restriction levels from 1 (lightest red) to 3
            (darkest red). Grey tiles indicate no specific data for this scale
            or state not included.
          </p>
        </div>
        {/* --- END OF MAP LEGEND --- */}
      </div>
    </div>
  );
}
