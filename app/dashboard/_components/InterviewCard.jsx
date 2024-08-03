import React from 'react'
import { Button } from '@/ui/button'

import { useRouter } from 'next/navigation'

function InterviewCard({interview}) {

    const router = useRouter();

  const onStart = () => {
    router.push('/dashboard/interview/' + interview?.mockId);
  }

  const onFeedback =()=>{
    router.push('/dashboard/interview/' + interview?.mockId + '/feedback');
  }
  return (
    <div className='border shadow-sm rounded-lg p-3'>
        <h2 className='font-bold text-primary'>{interview?.jobPosition}</h2>
        <h2 className='text-sm text-gray-600'>{interview.jobExperience}Year of Experience</h2>
        <h2 className='text-gray-400'>Created At: {interview.createAt}</h2>
        <div className='flex justify-between mt-2 gap-5'>
           
            <Button size="sm" variant = "outline" className="w-full" onClick={onFeedback} >Feedback</Button>
            <Button className='w-full' onClick={onStart}>Start</Button>
          
        </div>

    </div>
  )
}

export default InterviewCard