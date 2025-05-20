"use client";

import { scaleLinear } from "d3-scale";
import { useMemo } from "react";
import stateGridDataDiacritics from "./stateGridDataDiacritics.json"; // Ensure this path is correct
import stateGridDataLength from "./stateGridDataLength.json"; // Ensure this file is updated as per prior instructions

// Helper function to create a gradient string for legends
const getGradientString = (colors: string[]) => {
  if (colors.length === 0) return "";
  if (colors.length === 1) return colors[0]; // Solid color if only one
  return `linear-gradient(to right, ${colors.join(", ")})`;
};

// Interface for the structure of items in stateGridDataLength (optional, but good for type safety)
interface LengthDataState {
  row: number;
  col: number;
  value: number;
  asterisk: boolean;
  firstName?: number; // 0 for Full Name, 1 for First Name
}

export default function Home() {
  // --- MAP 1: Accents Permitted (Diacritics) ---
  const colorScale1 = scaleLinear<string>()
    .domain([1, 3])
    .range(["#3fa9f5", "#14183d"]); // Light Blue (No/Lesser restr.) to Dark Blue (Many/Greater restr.)

  // --- MAP 2: Name Length Restrictions ---
  const {
    firstNameValues,
    fullNameValues,
    minFirstNameLength,
    maxFirstNameLength,
    minFullNameLength,
    maxFullNameLength,
  } = useMemo(() => {
    const firstNames: number[] = [];
    const fullNames: number[] = [];

    Object.values(
      stateGridDataLength as Record<string, LengthDataState>
    ).forEach((state) => {
      if (state.value > 0) {
        if (state.firstName === 1) {
          firstNames.push(state.value);
        } else if (state.firstName === 0) {
          fullNames.push(state.value);
        }
      }
    });

    const safeMin = (arr: number[]) => (arr.length ? Math.min(...arr) : 1);
    const safeMax = (arr: number[]) => (arr.length ? Math.max(...arr) : 1);

    const calculatedMinFirstName = safeMin(firstNames);
    const calculatedMaxFirstName = safeMax(firstNames);
    const calculatedMinFullName = safeMin(fullNames);
    const calculatedMaxFullName = safeMax(fullNames);

    return {
      firstNameValues: firstNames,
      fullNameValues: fullNames,
      minFirstNameLength: calculatedMinFirstName,
      maxFirstNameLength: Math.max(
        calculatedMinFirstName,
        calculatedMaxFirstName
      ),
      minFullNameLength: calculatedMinFullName,
      maxFullNameLength: Math.max(calculatedMinFullName, calculatedMaxFullName),
    };
  }, []);

  const colorScaleFirstNameLength = scaleLinear<string>()
    .domain([
      minFirstNameLength,
      maxFirstNameLength === minFirstNameLength
        ? maxFirstNameLength + 0.001
        : maxFirstNameLength,
    ]) // Avoid same domain values slightly
    .range(["#284C98", "#3fa9f5"]); // Dark Blue (shortest limit) to Light Blue (longest limit)

  const colorScaleFullNameLength = scaleLinear<string>()
    .domain([
      minFullNameLength,
      maxFullNameLength === minFullNameLength
        ? maxFullNameLength + 0.001
        : maxFullNameLength,
    ]) // Avoid same domain values slightly
    .range(["#990000", "#ff0000"]); // Dark Red (shortest limit) to Light Red (longest limit)

  // --- TABLE DATA: Detailed Name Length Restrictions ---
  const tableData = useMemo(() => {
    const filteredData = Object.entries(
      stateGridDataLength as Record<string, LengthDataState>
    )
      .map(([abbr, data]) => ({
        stateAbbr: abbr,
        value: data.value,
        firstName: data.firstName,
      }))
      .filter((item) => item.value > 0);

    const formattedData = filteredData.map((item) => ({
      stateAbbr: item.stateAbbr,
      restrictionType: item.firstName === 1 ? "First Name" : "Full Name",
      lengthDisplay:
        item.stateAbbr === "CO" ? "no restriction" : item.value.toString(), // Ensure string type for consistency
    }));

    formattedData.sort((a, b) => a.stateAbbr.localeCompare(b.stateAbbr));
    return formattedData;
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 flex flex-col items-center justify-center space-y-8">
      {/* ——— MAP 1: Accents Permitted in First Names ——— */}
      <div className="w-full max-w-screen-lg mx-auto p-4 sm:p-6 bg-white rounded-lg shadow-xl">
        <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-center text-gray-800">
          Accents Permitted in First Names
        </h2>
        <div className="grid grid-cols-11 grid-rows-7 gap-1 max-w-md mx-auto sm:max-w-lg">
          {(
            Object.entries(stateGridDataDiacritics) as [
              string,
              { row: number; col: number; value: number; asterisk: boolean }
            ][]
          ).map(([abbr, { row, col, value, asterisk }]) => {
            const bgColor =
              value >= 1 && value <= 3 ? colorScale1(value) : "#dddddd";
            return (
              <div
                key={`diacritic-${abbr}`}
                style={{
                  gridRow: row,
                  gridColumn: col,
                  backgroundColor: bgColor,
                }}
                className="aspect-square flex items-center justify-center text-white font-bold rounded text-xs sm:text-sm"
              >
                {abbr}
                {asterisk ? "*" : ""}
              </div>
            );
          })}
        </div>
        <div className="mt-6 sm:mt-8">
          <h4 className="text-sm sm:text-base font-semibold mb-3 text-center text-gray-700">
            Accent Restriction Level
          </h4>
          <div className="flex justify-center items-start space-x-2 sm:space-x-4">
            <div className="flex flex-col items-center text-center">
              <div
                className="w-4 h-4 sm:w-5 sm:h-5 rounded mb-1 border border-gray-400"
                style={{ backgroundColor: colorScale1(1) }}
              ></div>
              <span className="text-xs text-gray-600">No Restrictions</span>
            </div>
            <div className="flex flex-col items-center text-center">
              <div
                className="w-4 h-4 sm:w-5 sm:h-5 rounded mb-1 border border-gray-400"
                style={{ backgroundColor: colorScale1(2) }}
              ></div>
              <span className="text-xs text-gray-600">Some Restrictions</span>
            </div>
            <div className="flex flex-col items-center text-center">
              <div
                className="w-4 h-4 sm:w-5 sm:h-5 rounded mb-1 border border-gray-400"
                style={{ backgroundColor: colorScale1(3) }}
              ></div>
              <span className="text-xs text-gray-600">Many Restrictions</span>
            </div>
          </div>
          <p className="mt-3 text-center text-xs text-gray-500 px-2">
            Map visualizes restriction levels from light blue (lesser) to dark
            blue (greater). Grey: Data not available. Asterisks (*) indicate
            data may not be from official sources.
          </p>
        </div>
      </div>

      {/* ——— MAP 2: Name Length Restrictions ——— */}
      <div className="w-full max-w-screen-lg mx-auto p-4 sm:p-6 bg-white rounded-lg shadow-xl">
        <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-center text-gray-800">
          Name Length Restrictions (Characters)
        </h2>
        <div className="grid grid-cols-11 grid-rows-7 gap-1 max-w-md mx-auto sm:max-w-lg">
          {Object.entries(
            stateGridDataLength as Record<string, LengthDataState>
          ).map(([abbr, { row, col, value, asterisk, firstName }]) => {
            let bgColor = "#dddddd";

            if (value > 0) {
              if (firstName === 1 && firstNameValues.length > 0) {
                bgColor = colorScaleFirstNameLength(value);
              } else if (firstName === 0 && fullNameValues.length > 0) {
                bgColor = colorScaleFullNameLength(value);
              }
            }

            return (
              <div
                key={`length-${abbr}`}
                style={{
                  gridRow: row,
                  gridColumn: col,
                  backgroundColor: bgColor,
                }}
                className="aspect-square flex items-center justify-center text-white font-bold rounded text-xs sm:text-sm"
              >
                {abbr}
                {asterisk ? "*" : ""}
              </div>
            );
          })}
        </div>

        <div className="mt-6 sm:mt-8">
          <h4 className="text-sm sm:text-base font-semibold mb-3 text-center text-gray-700">
            Length Restriction Legend
          </h4>
          <div className="space-y-3">
            {firstNameValues.length > 0 && (
              <div className="text-center">
                <p className="text-xs font-semibold text-gray-700 mb-1">
                  First Name Length Limit (chars)
                </p>
                <div className="flex items-center justify-center space-x-2">
                  <span className="text-xs text-gray-600">
                    {minFirstNameLength === maxFirstNameLength
                      ? ""
                      : minFirstNameLength}
                  </span>
                  <div
                    className="w-24 h-4 rounded border border-gray-300"
                    style={{
                      background:
                        minFirstNameLength === maxFirstNameLength
                          ? colorScaleFirstNameLength(minFirstNameLength)
                          : getGradientString([
                              colorScaleFirstNameLength(minFirstNameLength),
                              colorScaleFirstNameLength(maxFirstNameLength),
                            ]),
                    }}
                  ></div>
                  <span className="text-xs text-gray-600">
                    {maxFirstNameLength}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-0.5">
                  {minFirstNameLength === maxFirstNameLength
                    ? `Limit: ${maxFirstNameLength} (Dark Blue)`
                    : `(Dark Blue to Light Blue)`}
                </p>
              </div>
            )}

            {fullNameValues.length > 0 && (
              <div className="text-center mt-2">
                <p className="text-xs font-semibold text-gray-700 mb-1">
                  Full Name Length Limit (chars)
                </p>
                <div className="flex items-center justify-center space-x-2">
                  <span className="text-xs text-gray-600">
                    {minFullNameLength === maxFullNameLength
                      ? ""
                      : minFullNameLength}
                  </span>
                  <div
                    className="w-24 h-4 rounded border border-gray-300"
                    style={{
                      background:
                        minFullNameLength === maxFullNameLength
                          ? colorScaleFullNameLength(minFullNameLength)
                          : getGradientString([
                              colorScaleFullNameLength(minFullNameLength),
                              colorScaleFullNameLength(maxFullNameLength),
                            ]),
                    }}
                  ></div>
                  <span className="text-xs text-gray-600">
                    {maxFullNameLength}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-0.5">
                  {minFullNameLength === maxFullNameLength
                    ? `Limit: ${maxFullNameLength} (Dark Red)`
                    : `(Dark Red to Light Red)`}
                </p>
              </div>
            )}

            <div className="flex items-center justify-center text-center mt-3">
              <div
                className="w-4 h-4 sm:w-5 sm:h-5 rounded mb-1 border border-gray-400 mr-2"
                style={{ backgroundColor: "#dddddd" }}
              ></div>
              <span className="text-xs text-gray-600">
                Data not available / No specific restriction (0)
              </span>
            </div>
          </div>
          <p className="mt-3 text-center text-xs text-gray-500 px-2">
            Darkest color indicates the shortest length limit found, lightest
            for the longest. Asterisks (*) indicate data may not be from
            official sources.
          </p>
        </div>
      </div>

      {/* ——— TABLE: Detailed Name Length Restrictions ——— */}
      <div className="w-full max-w-screen-lg mx-auto p-4 sm:p-6 bg-white rounded-lg shadow-xl">
        <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-center text-gray-800">
          Detailed Name Length Restrictions
        </h2>
        {tableData.length > 0 ? (
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    State
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Restriction Type
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Max Length (Chars)
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {tableData.map((row) => (
                  <tr key={row.stateAbbr}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {row.stateAbbr}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {row.restrictionType}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {row.lengthDisplay}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center text-gray-600">
            No states with specific length restriction data (value {">"} 0) to
            display.
          </p>
        )}
      </div>
    </div>
  );
}
