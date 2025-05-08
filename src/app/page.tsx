"use client";

import { useState } from "react";
import { namingLaws } from "./namingLaws";
import stateData from "./stateDataLength.json";
import gridLayout from "./gridLayout.json";
import { scaleLinear } from "d3-scale";

export default function Home() {
  // ── Baby Name Checker State ──
  const [state, setState] = useState<keyof typeof namingLaws>("Alabama");
  const [name, setName] = useState("");
  const [result, setResult] = useState("");
  const [isValidName, setIsValidName] = useState<boolean | null>(null);

  const states = Object.keys(namingLaws) as (keyof typeof namingLaws)[];

  // Stats for length restrictions (optional)
  const totalStates = states.length;
  const statesWithLengthRestriction = states.filter(
    (s) => namingLaws[s].maxLength !== undefined
  ).length;
  const statesWithoutLengthRestriction =
    totalStates - statesWithLengthRestriction;
  const withRestrictionPercent =
    (statesWithLengthRestriction / totalStates) * 100;
  const withoutRestrictionPercent =
    (statesWithoutLengthRestriction / totalStates) * 100;

  const checkName = () => {
    const rules = namingLaws[state];
    const isValid = rules.allowed.test(name);
    const exceedsLength = rules.maxLength && name.length > rules.maxLength;

    if (!name) {
      setResult("Please enter a name.");
      setIsValidName(false);
    } else if (exceedsLength) {
      setResult(`Name exceeds max length of ${rules.maxLength}.`);
      setIsValidName(false);
    } else if (isValid) {
      setResult("This name is allowed!");
      setIsValidName(true);
    } else {
      setResult(`Not allowed: ${getReason(name, rules.allowed)}`);
      setIsValidName(false);
    }
  };

  const getReason = (name: string, regex: RegExp) => {
    if (/[^A-Za-z]/.test(name) && !/['-]/.test(name))
      return "Invalid characters (only letters, hyphens, apostrophes).";
    if (/\d/.test(name)) return "Contains numbers.";
    if (/[À-ÿ]/.test(name) && !regex.test(name))
      return "Non-English characters not allowed.";
    return "Violates state-specific rules.";
  };

  // ── COLOR SCALE: 1 → red, 5 → blue ──
  const colorScale = scaleLinear<string>()
    .domain([1, 5])
    .range(["#ff0000", "#0000ff"]);

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      {/* ——— Baby Name Checker ——— */}
      <div className="max-w-lg mx-auto bg-gray-800 rounded-xl shadow-2xl p-8 mb-12">
        <h1 className="text-3xl font-semibold text-white mb-6 text-center">
          Baby Name Checker
        </h1>

        {/* State Selector */}
        <label className="block text-gray-300 mb-2">Select State</label>
        <select
          value={state}
          onChange={(e) => setState(e.target.value as keyof typeof namingLaws)}
          className="w-full mb-4 p-2 bg-gray-700 text-white rounded focus:outline-none"
        >
          {states.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>

        {/* Name Input */}
        <label className="block text-gray-300 mb-2">Enter Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g., Mary-Jane"
          className="w-full mb-4 p-3 bg-gray-700 text-white rounded focus:outline-none"
        />

        <button
          onClick={checkName}
          className="w-full bg-indigo-600 text-white py-3 rounded font-semibold hover:bg-indigo-700 transition"
        >
          Check Name
        </button>

        {result && (
          <div className="mt-4 p-4 bg-gray-700 rounded">
            <p className={isValidName ? "text-green-400" : "text-red-400"}>
              {result}
            </p>
            <p className="text-xs text-gray-400 mt-2">
              {namingLaws[state].link ? (
                <>
                  <a
                    href={namingLaws[state].link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-indigo-400"
                  >
                    Rule
                  </a>
                  : {namingLaws[state].rule}
                </>
              ) : (
                `Rule: ${namingLaws[state].rule}`
              )}
            </p>
          </div>
        )}

        {/* Length Restriction Stats (optional) */}
        <div className="mt-8">
          <h2 className="text-white mb-2 text-center">Length Restriction</h2>
          <div className="flex h-4 bg-gray-600 rounded overflow-hidden">
            <div
              style={{ width: `${withRestrictionPercent}%` }}
              className="bg-indigo-500"
            />
            <div
              style={{ width: `${withoutRestrictionPercent}%` }}
              className="bg-gray-500"
            />
          </div>
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>With Restr.</span>
            <span>Without Restr.</span>
          </div>
        </div>
      </div>

      {/* ——— Square-Tile Grid Map ——— */}
      <div className="max-w-screen-lg mx-auto p-4 bg-white rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          U.S. Tile Grid (1–5 scale)
        </h2>
        <div className="grid grid-cols-11 grid-rows-7 gap-1">
          {(
            Object.entries(gridLayout) as [
              string,
              { row: number; col: number }
            ][]
          ).map(([abbr, { row, col }]) => {
            const val = (stateData as Record<string, number>)[abbr];
            const bgColor = val !== 0 ? colorScale(val) : "#ddd";

            return (
              <div
                key={abbr}
                style={{
                  gridRow: row,
                  gridColumn: col,
                  backgroundColor: bgColor,
                }}
                className="aspect-square flex items-center justify-center text-white font-bold rounded"
              >
                {abbr}
              </div>
            );
          })}
        </div>
        <p className="mt-2 text-center text-gray-600">
          1 = red &nbsp;–&nbsp; 5 = blue
        </p>
      </div>
    </div>
  );
}
