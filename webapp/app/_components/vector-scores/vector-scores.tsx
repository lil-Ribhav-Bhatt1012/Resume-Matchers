"use client";

import { useGlobalStore } from "@/stores/useGlobalStore";
import { ElementRef, useEffect, useRef } from "react";
import ProcessingError from "@/components/processing-error/processing-error";

const VectorScore = () => {
  const { isBackendProcessing, resumeProcessorResponse } = useGlobalStore();

  const componentRef = useRef<ElementRef<"section">>(null);

  useEffect(() => {
    if (componentRef.current) {
      componentRef.current.scrollIntoView({ behavior: "smooth" });
    }
  });

  if (!isBackendProcessing && !resumeProcessorResponse?.vectorScoresSet)
    return null;

  function renderVectorScores() {
    if (!resumeProcessorResponse?.vectorScoresSet) return null;

    const { vectorScoresSet } = resumeProcessorResponse;

    return (
      <ul className="flex flex-col gap-6">
        {vectorScoresSet.map((vectorScore) => {
          return (
            <li
              className="flex flex-col gap-2 p-4 border-2 border-dotted border-blue-400 bg-[#f9f2f2]"
              key={vectorScore.jobId}
            >
              <h3 className="text-lg text-center text-gray-500">
                Score for Job ID:{" "}
                <span className="px-2 bg-gray-500 text-white rounded-md">
                  {vectorScore.jobId}
                </span>
              </h3>
              <p className="text-7xl text-center font-bold text-blue-500">
                {vectorScore.score}
              </p>
            </li>
          );
        })}
      </ul>
    );
  }

  return (
    <section ref={componentRef} className="flex flex-col gap-12 px-32 py-10">
      <h2 className="text-4xl font-normal leading-normal">
        Vector Similarity Score
      </h2>
      {isBackendProcessing && <p>Processing vector scores...</p>}
      <ProcessingError />
      <div className="flex flex-col gap-8 text-black p-8 bg-[#FFF5F5]">
        <p>
          The Vector Similarity Score is a measure of how similar your resume is
          to the job description. The higher the score, the more similar your
          resume is to the job description.
        </p>
        {renderVectorScores()}
      </div>
    </section>
  );
};

export default VectorScore;
