import { useState } from "react";
import "./App.css";
import { URL } from "./constants";
import Answer from "./components/Answer";

function App() {
  const [question, setQuestion] = useState("");
  const [result, setResult] = useState([]);
  const [recentHistory, setRecentHistory] = useState(JSON.parse(localStorage.getItem('history')))


  const payLoad = {
    contents: [
      {
        parts: [{ text: question }],
      },
    ],
  };

  const askQuestion = async () => {

       if (localStorage.getItem('history')){

      let history = JSON.parse(localStorage.getItem('history'))
      history = [question, ...history]
      localStorage.setItem('history', JSON.stringify(history))
      setRecentHistory(history)
    } else {
      localStorage.setItem('history', JSON.stringify([question]))
      setRecentHistory([question])
    }


    let response = await fetch(URL, {
      method: "POST",
      body: JSON.stringify(payLoad),
    });
    response = await response.JSON();
    let dataString=response.candidates[0].content.parts[0].text;
    dataString = dataString.split("* ");
    dataString = dataString.map((item) => item.trim())
    // console.log(dataString);
    setResult([...result, { type: 'q', text: question }, { type: 'a', text: dataString }])
  };
  console.log(recentHistory);
  
  return (
    <>
      <div className="grid grid-cols-5 h-screen text-center">
        <div className="col-span-1 bg-zinc-800">
          <ul>Add commentMore actions
          {
            recentHistory && recentHistory.map((item)=>(
              <li>{item}</li>
            ))
          }
        </ul>
        </div>
        <div className="col-span-4 p-10 ">
          <div className="container h-140 overflow-scroll text-white">
            <div className="text-white">
              <ul>Add commentMore actions
              {/* {result} */}
            {
              result.map((item,index)=>(
                item.type=='q'? 
                  <div key={index+Math.random()} className={item.type == 'q' ? 'flex justify-end' : ''} />
                  :item.text.map((ansItem,ansIndex)=>(
                  <li key={ansIndex+Math.random()} className='text-left p-1'><Answer ans={ansItem} totalResult={item.length} index={ansIndex} /></li>

                  ))
               
              ))
              </div>
              
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
