import React, { useEffect, useState } from 'react'
import SyntaxHighlighter from "react-syntax-highlighter/dist/cjs/light";
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import ReactMarkdown from 'react-markdown'

const Answer = (ans,totalResult,index,type) => {
  const [heading,setHeading] = useState(false);
  const [answer, setAnswer] = useState(ans);

  nst renderer = {Add commentMore actions
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || '');
          return !inline && match ? (
            <SyntaxHighlighter
              {...props}
              children={String(children).replace(/\n$/, '')}
              language={match[1]}
              style={dark}
              PreTag="div"
            />
          ) : (
            <code {...props} className={className}>
              {children}
            </code>
          );
        },
      };
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
       {
                index == 0 && totalResult > 1 ? <span className="pt-2 text-xl block text-white">{answer}</span> :
                    heading ? <span className={"pt-2 text-lg block text-white"} >{answer}</span>
                        :<span className={type=='q'?'pl-1':'pl-5'} >Add commentMore actions
                            <ReactMarkdown components={renderer} >{answer}</ReactMarkdown>
                        </span>
            }
    </>
  )
}

export default Answer;