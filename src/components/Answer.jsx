import React, { useEffect, useState } from 'react'

const Answer = (ans,key) => {
  const [heading,setHeading] = useState(false);
  useEffect(()=>{
    if(checkHeading(ans)){
      setHeading(true);
    }

  },[])

   function checkHeading(str){
    return /^(\*)(\*)(.*)\*$/.test(str)
}
    
  return (
    <>
      {heading ? <span className='pt-2 text-lg block'>{ans}</span> : <span>{ans}</span>}
    </>
  )
}

export default Answer;