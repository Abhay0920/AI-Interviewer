"use client";
import React, { useState } from "react";
 import { Button } from "/components/ui/button";
 import { Input } from "@/components/ui/input";
 import { Textarea } from "@/components/ui/textarea";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import { chatSession } from "utils/GeminiAIModel";
import { LoaderCircle } from "lucide-react";
import {db} from 'utils/db';
import { MockInterview } from "utils/schema";
import {v4 as uuidv4} from "uuid";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { useRouter } from "next/navigation";

function AddNewInterview() {
  const [open, setOpen] = useState(false);
  const [JobPosition , setJobPosition] = useState();
  const [JobDesc , setJobDesc] = useState();
  const [JobExp , setJobExp] = useState();
  const [Loading,setLoading] = useState(false);
  const [JsonResponse,setJsonResponse] = useState([]);
  const {user} = useUser();
  const router = useRouter();
  const onSubmit = async (e) => {
    setLoading(true)
    e.preventDefault();
    const InputPrompt = `Job position: ${JobPosition}. Job Description: ${JobDesc}. Experience: ${JobExp}. Depends on Job Position, Job Description & years of experience give me ${process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT} interview questions along with answers in JSON format. Provide fields 'question' and 'answer' in JSON.`;

    
      const result = await chatSession.sendMessage(InputPrompt);
      const MockJsonResp = (result.response.text()).replace('```json','').replace('```' ,'')
      // console.log(JSON.parse(MockJsonResp));
      // console.log(result.response.text());
      setJsonResponse(MockJsonResp);
      if(MockJsonResp){
      const resp = await db.insert(MockInterview).values({
        mockId: uuidv4(),
        jsonMockResp:MockJsonResp,
        jobPosition:JobPosition,
        jobDesc:JobDesc,
        jobExperience:JobExp,
        createBy:user?.primaryEmailAddress?.emailAddress,
        createAt:moment().format('DD-MM-YYYY')
      }).returning({mockId:MockInterview.mockId})
      console.log("INSERTED ID :" ,resp);
      if(resp){
        setOpen(false);
        router.push('/dashboard/interview/'+resp[0]?.mockId);
      }
    }
    else{
      console.lof("error");
    }
    setLoading(false);
  };


  return (
    <div>
      <div
        className="p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all"
        onClick={() => setOpen(true)}
      >
        <h2 className="text-lg text-center">+Add New</h2>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
  <DialogContent className="max-w-xl">
    <DialogHeader>
      <DialogTitle className="text-2xl" >Tell us More about your Job interview</DialogTitle>
      <DialogDescription>
        <form onSubmit={onSubmit}>
        <div>
          
          <h2>Add Details about your job positions/role , job description and your year of  experience</h2>
          <div className="mt-7 my-3">
            <label>Job Role/job Position</label>
            <Input placeholder="Ex. Full Stack Developer" required
            onChange = {(event) => setJobPosition(event.target.value)}
            />
          </div>

          <div className=" my-3">
            <label>Job DesCription /Tech Stack (In short)</label>
            < Textarea placeholder="Ex. React .Angular, Nodejs"  required
             onChange = {(event) => setJobDesc(event.target.value)}
            />
          </div>

          <div className=" my-3">
            <label>Years of experience</label>
            <Input placeholder="Ex. 5"  type="number" max= "50" required
             onChange = {(event) => setJobExp(event.target.value)}
            />
          </div>
        </div>
        <div className="flex gap-5 justify-end">
          <Button type="button" variant= "ghost" onClick= {() => setOpen(false)}>Cancel</Button>
          <Button type="submit" disabled = {Loading}>
          {Loading ?
            <>
            <LoaderCircle className="animate-spin"/> 'Generating from AI '
            </>:'Start Interview'}
          </Button>
        </div>
        </form>
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>

    </div>
  );
}

export default AddNewInterview;
