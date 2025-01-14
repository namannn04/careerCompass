import React, { useState } from "react";
import { Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { strategies } from "./strat";


const StrategySection = () => {
  const [openId, setOpenId] = useState(null);

  const toggleDetails = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div
      id="strat"
      className="mt-20 text-gray-100 min-h-screen py-20 px-6 relative overflow-hidden"
    >
      <div className="absolute inset-0 opacity-20 z-0"></div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMSI+PC9yZWN0Pgo8cGF0aCBkPSJNMCA1TDUgMFpNNiA0TDQgNlpNLTEgMUwxIC0xWiIgc3Ryb2tlPSIjMjIyIiBzdHJva2Utd2lkdGg9IjEiPjwvcGF0aD4KPC9zdmc+')] opacity-5 z-10"></div>
      <div className="relative z-20 container mx-auto">
        {/* Header Section */}
        <header className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-[#fcb326] mb-6 pb-2">
            Explore Proven Strategies
          </h1>
          <p className="text-2xl text-gray-300 mt-4 max-w-2xl mx-auto leading-relaxed">
            Elevate your focus, productivity, and career clarity with these
            expert techniques.
          </p>
        </header>

        {/* Strategy List */}
        <div className="space-y-12 flex justify-center items-center flex-col">
          {strategies.map((strategy) => (
            <div
              key={strategy.id}
              className="bg-white bg-opacity-5 backdrop-filter backdrop-blur-lg rounded-3xl w-full max-w-4xl shadow-lg p-8 transition-all duration-300 hover:shadow-2xl hover:scale-105 border border-white border-opacity-20"
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <h2 className="text-3xl font-bold text-[#fcb326]">
                  {strategy.title}
                </h2>
                <button
                  onClick={() => toggleDetails(strategy.id)}
                  className="bg-[rgb(135,91,201)] text-white px-6 py-3 rounded-full hover:opacity-90 transition focus:ring-2 focus:ring-[#fcb326] flex items-center group"
                >
                  {openId === strategy.id ? "Hide Details" : "Explore"}
                  <ChevronDownIcon
                    className={`w-5 h-5 ml-2 transition-transform group-hover:translate-y-1 ${
                      openId === strategy.id ? "rotate-180" : ""
                    }`}
                  />
                </button>
              </div>
              <p className="text-gray-300 mt-4 text-lg">
                {strategy.description}
              </p>

              {/* Details Section */}
              <Transition
                show={openId === strategy.id}
                enter="transition-all duration-500 ease-out"
                enterFrom="opacity-0 max-h-0"
                enterTo="opacity-100 max-h-screen"
                leave="transition-all duration-500 ease-in"
                leaveFrom="opacity-100 max-h-screen"
                leaveTo="opacity-0 max-h-0"
              >
                <div className="mt-6 p-6 bg-white bg-opacity-5 rounded-2xl text-gray-200 overflow-hidden border border-white border-opacity-10">
                  <h3 className="text-2xl font-bold mb-4 text-[#fcb326]">
                    Overview
                  </h3>
                  <p className="mb-6 text-lg leading-relaxed">
                    {strategy.details.overview}
                  </p>
                  <h3 className="text-2xl font-bold mb-4 text-[#fcb326]">
                    Steps
                  </h3>
                  <ul className="mb-6 space-y-3">
                    {strategy.details.steps.map((step, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-[rgb(135,91,201)] mr-3 font-bold">
                          {index + 1}.
                        </span>
                        <span className="text-lg">{step}</span>
                      </li>
                    ))}
                  </ul>
                  <h3 className="text-2xl font-bold mb-4 text-[#fcb326]">
                    Benefits
                  </h3>
                  <ul className="space-y-3">
                    {strategy.details.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-[rgb(135,91,201)] mr-3">•</span>
                        <span className="text-lg">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Transition>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StrategySection;
