"use client"
import React, { useEffect, useState } from 'react';
import { db } from "utils/db";
import { eq } from "drizzle-orm";
import { MockInterview } from "utils/schema";
import QuestionSection from './_components/QuestionSection';
import RecordAnsSection from "./_components/RecordAnsSection";
import { Button } from "components/ui/button";
import Link from 'next/link';

function Startinterview({ params }) {
  const [interviewData, setInterviewData] = useState(null);
  const [mockinterviewQues, setMockInterviewQues] = useState([]);
  const [ActiveQuestion, SetActiveQuestion] = useState(0);

  useEffect(() => {
    GetInterviewDetails();
  }, [params.interviewId]);

  const GetInterviewDetails = async () => {
    try {
      const result = await db
        .select()
        .from(MockInterview)
        .where(eq(MockInterview.mockId, params.interviewId));

      if (result.length > 0) {
        const jsonMockResp = JSON.parse(result[0].jsonMockResp);
        console.log("Mock Interview Questions:", jsonMockResp);
        setMockInterviewQues(jsonMockResp);
        setInterviewData(result[0]);
      } else {
        console.error("No interview data found for the given ID.");
      }
    } catch (error) {
      console.error("Error fetching interview details:", error);
    }
  };

  if (!interviewData || !mockinterviewQues) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
        {/* Question Section */}
        <QuestionSection
          mockinterviewQues={mockinterviewQues}
          ActiveQuestion={ActiveQuestion}
        />

        {/* Audio/Video Section */}
        <RecordAnsSection
          mockinterviewQues={mockinterviewQues}
          ActiveQuestion={ActiveQuestion}
          interviewData={interviewData}
        />
      </div>
      <div className='flex justify-end gap-6 mt-5'>
        {ActiveQuestion > 0 && (
          <Button onClick={() => SetActiveQuestion(ActiveQuestion - 1)}>
            Previous Question
          </Button>
        )}
        {ActiveQuestion < mockinterviewQues.length - 1 && (
          <Button onClick={() => SetActiveQuestion(ActiveQuestion + 1)}>
            Next Question
          </Button>
        )}
        {ActiveQuestion === mockinterviewQues.length - 1 && (
          <Link href={`/dashboard/interview/${interviewData?.mockId}/feedback`}>
            <Button>End interview</Button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Startinterview;
