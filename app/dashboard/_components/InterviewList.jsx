"use client"
import { useUser } from '@clerk/nextjs';
import { eq, desc } from 'drizzle-orm'; 
import React, { useEffect, useState } from 'react';
import { db } from 'utils/db';
import { MockInterview } from 'utils/schema';
import InterviewCard from './InterviewCard'
function InterviewList() {

    const {user} = useUser();
    const [interviewsList, setInterviewsList] = useState([]);

    useEffect(()=>{
        user&&getInterviewList();
    },[user]);

    const getInterviewList = async()=>{
        const result = await db.select().from(MockInterview).where(eq(MockInterview.createBy,user?.primaryEmailAddress?.emailAddress)).orderBy(desc(MockInterview.id))

        console.log(result);
        setInterviewsList(result);

    }
  return (
    <div>
        <h2 className='font-medium text-xl'>Previous Mock Interview</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-3'>
            {interviewsList&&interviewsList.map((interview,index)=>(
              
                <InterviewCard
                interview = {interview}
                key ={index}/>
            ))}
        </div>
    </div>
  )
}

export default InterviewList