"use client";
import React, { useEffect, useState } from "react";
import { db } from "utils/db";
import { eq } from "drizzle-orm";
import { MockInterview } from "utils/schema";
import Webcam from "react-webcam";
import { Lightbulb, WebcamIcon } from "lucide-react";
import { Button } from "components/ui/button";
import Link from "next/link";

function Interview({ params }) {
  const [interviewData, setInterviewData] = useState(null); // Initialize with null for clarity
  const [webcamEnable, setWebCamEnable] = useState(false);

  useEffect(() => {
    console.log(params.interviewId);
    GetInterviewDetails();
  }, [params.interviewId]); // Add params.interviewId as a dependency

  const GetInterviewDetails = async () => {
    try {
      const result = await db
        .select()
        .from(MockInterview)
        .where(eq(MockInterview.mockId, params.interviewId));
      setInterviewData(result[0]);
    } catch (error) {
      console.error("Error fetching interview details:", error);
    }
  };

  return (
    <div className="my-10">
      <h2 className="font-bold text-2xl">Let's Get Started</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="flex flex-col my-5 gap-5">
          <div className="flex flex-col p-5 rounded-lg border gap-5">
            {interviewData ? (
              <>
                <h2>
                  <strong>Job Role/Job Positions:</strong> {interviewData.jobPosition}
                </h2>
                <h2><strong>Job Description/Tech Stack:</strong> {interviewData.jobDesc}</h2>
                <h2><strong>Years of Experience:</strong> {interviewData.jobExperience}</h2>
              </>
            ) : (
              <h2>Loading interview details...</h2>
            )}
          </div>
          <div className="p-5 border rounded-lg border-yellow-300 bg-yellow-50">
            <h2 className="flex gap-2 items-center text-yellow-600">
              <Lightbulb /> <strong>Information</strong>
            </h2>
            <h2 className="mt-3 text">{process.env.NEXT_PUBLIC_INFORMATION}</h2>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center"> {/* Center align elements */}
          {webcamEnable ? (
            <Webcam
              onUserMedia={() => setWebCamEnable(true)}
              onUserMediaError={() => setWebCamEnable(false)}
              mirrored={true}
              style={{
                height: 300,
                width: 300,
              }}
            />
          ) : (
            <>
              <WebcamIcon className="h-72 w-full my-7 p-20 bg-secondary rounded-lg border" />
              <Button variant = "ghost"  className ="w-full " onClick={() => setWebCamEnable(true)} >
                Enable Web Cam and Microphone
              </Button>
            </>
          )}
        </div>
      </div>
       <div className="flex justify-end items-end p-5">
        <Link href={'/dashboard/interview/'+params.interviewId+'/start'}>
       <Button>Start Interview</Button>
        </Link>
       </div>
    </div>
  );
}

export default Interview;
