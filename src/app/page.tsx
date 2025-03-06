"use client";

import { useState } from "react";
import { namingLaws } from "./namingLaws";

export default function Home() {
  const [state, setState] = useState<keyof typeof namingLaws>("Alabama");
  const [name, setName] = useState("");
  const [result, setResult] = useState("");
  const [isValidName, setIsValidName] = useState<boolean | null>(null);

  const states = Object.keys(namingLaws) as (keyof typeof namingLaws)[];

  const checkName = () => {
    const rules = namingLaws[state];
    const isValid = rules.allowed.test(name);
    const exceedsLength = rules.maxLength && name.length > rules.maxLength;

    if (!name) {
      setResult("Please enter a name.");
      setIsValidName(false);
    } else if (exceedsLength) {
      setResult(
        `Name exceeds maximum length of ${rules.maxLength} characters.`
      );
      setIsValidName(false);
    } else if (isValid) {
      setResult("This name is allowed!");
      setIsValidName(true);
    } else {
      setResult(
        `This name is not allowed. Reason: ${getReason(name, rules.allowed)}`
      );
      setIsValidName(false);
    }
  };

  const getReason = (name: string, regex: RegExp) => {
    if (/[^A-Za-z]/.test(name) && !/['-]/.test(name))
      return "Contains invalid characters (only letters, hyphens, and apostrophes allowed in most states).";
    if (/\d/.test(name)) return "Contains numbers.";
    if (/[À-ÿ]/.test(name) && !regex.test(name))
      return "Contains non-English characters not allowed in this state.";
    return "Violates state-specific character rules.";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-xl shadow-2xl p-8 w-full max-w-lg transform transition-all hover:scale-105">
        <h1 className="text-3xl font-semibold text-white mb-6 text-center tracking-tight">
          Baby Name Checker
        </h1>

        {/* State Selection with Minimalistic Dropdown */}
        <div className="mb-6">
          <label className="block text-gray-300 text-sm font-medium mb-2">
            Select State
          </label>
          <div className="relative">
            <select
              value={state}
              onChange={(e) =>
                setState(e.target.value as keyof typeof namingLaws)
              }
              className="w-full p-2 bg-gray-700 text-white border-b rounded-lg border-gray-600 focus:outline-none focus:border-indigo-400 transition-colors appearance-none pr-8"
            >
              {states.map((s) => (
                <option key={s} value={s} className="bg-gray-700 text-white">
                  {s}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Name Input */}
        <div className="mb-6">
          <label className="block text-gray-300 text-sm font-medium mb-2">
            Enter Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-400 transition-all"
            placeholder="e.g., Mary-Jane"
          />
        </div>

        {/* Button */}
        <button
          onClick={checkName}
          className="w-full bg-indigo-600 text-white p-3 rounded-lg font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all"
        >
          Check Name
        </button>

        {/* Result Display */}
        {result && (
          <div className="mt-6 p-4 bg-gray-700 rounded-lg border border-gray-600">
            <p
              className={`text-sm ${
                isValidName ? "text-green-400" : "text-red-400"
              }`}
            >
              {result}
            </p>
            <p className="text-xs mt-2 text-gray-400 leading-relaxed">
              Rule: {namingLaws[state].rule}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
