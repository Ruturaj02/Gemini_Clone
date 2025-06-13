import { useState } from "react";
import "./App.css";
import { URL } from "./constants";
import Answer from "./components/Answer";

function App() {
  const [question, setQuestion] = useState("");
  const [result, setResult] = useState("");

  const payLoad = {
    contents: [
      {
        parts: [{ text: question }],
      },
    ],
  };

  const askQuestion = async () => {
    let response = await fetch(URL, {
      method: "POST",
      body: JSON.stringify(payLoad),
    });
    response = await response.JSON();
    let dataString=response.candidates[0].content.parts[0].text;
    dataString = dataString.split("* ");
    dataString = dataString.map((item) => item.trim())
    // console.log(dataString);
    setResult([...result, {type:"q" ,text:question},{type:'a',text:dataString}]);
  };
  console.log(result);
  
  return (
    <>
      <div className="grid grid-cols-5 h-screen text-center">
        <div className="col-span-1 bg-zinc-800">
          <h1>Hello</h1>
        </div>
        <div className="col-span-4 p-10 ">
          <div className="container h-140 overflow-scroll text-white">
            <div className="text-white">
              <ul>Add commentMore actions
              {/* {result} */}
            {
              result.map((item,index)=>(
                item.type=='q'? 
                  <li key={index+Math.random()} className='text-left p-1'><Answer ans={item.text} totalResult={1} index={index} /></li>
                  :item.text.map((ansItem,ansIndex)=>(
                  <li key={ansIndex+Math.random()} className='text-left p-1'><Answer ans={ansItem} totalResult={item.length} index={ansIndex} /></li>

                  ))
               
              ))
            }
            </ul>
            {/* <ul>
            
              {
                result && result.map((item, index) => (
                  <li key={index} className='text-left p-1'><Answer ans={item} totalResult={result.length} index={index} /></li>
                  <li key={index+Math.random()} className='text-left p-1'><Answer ans={item} totalResult={result.length} index={index} /></li>
                ))
              }

            </ul>
            </ul> */}
             
            </div>
          </div>
          <div className="bg-zinc-800 w-1/2 p-1 pr-5 text-white m-auto rounded-4xl border border-white flex h-16">
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="w-full h-full p-3 outline-none"
              placeholder="Ask Me Anything"
            />
            <button onClick={() => askQuestion()}>Ask</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
