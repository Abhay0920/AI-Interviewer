import { Lightbulb, Volume2 } from 'lucide-react'
import React from 'react'

function QuestionSection({mockinterviewQues,ActiveQuestion}) {

  const textToSpeach=(text)=>{
    if('speechSynthesis' in window){
      const speech = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(speech);
    }
    else{
      alert('Your browser does not support text-to-speech functionality.');
    }
  }
  return mockinterviewQues &&(
    <div className='p-5 border rounded-lg my-10'>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
          {mockinterviewQues&&mockinterviewQues.map((ques,index)=>(
            <h2 className={`p-2 border rounded-full text-xs md:text-sm text-center cursor-pointer ${ActiveQuestion==index &&'bg-primary text-white'}`}>Question #{index+1}</h2>
          ))}  
        </div>
        <h2 className='my-5 text-md md:text-lg'>{mockinterviewQues[ActiveQuestion]?.question}</h2>
         <Volume2 className='cursor-pointer' onClick={() => textToSpeach(mockinterviewQues[ActiveQuestion]?.question)}/>
          <div className='border rounded-lg p-5 bg-blue-100 mt-20'>
            <h2 className='flex gap-2 items-center text-blue-700'>
              <Lightbulb/>
               <strong>Note:</strong>
            </h2>
            <h2 className='text-sm text-primary my-2'>{process.env.NEXT_PUBLIC_QUESTION_NOTE}</h2>
          </div>

    </div>
  )
}

export default QuestionSection