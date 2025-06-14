import { useState ,useEffect ,useId } from "react";
import "./App.css";
import { URL } from "./constants";
import Answer from "./components/Answer";

function App() {
  const [question, setQuestion] = useState("");
  const [result, setResult] = useState([]);
const [recentHistory, setRecentHistory] = useState(JSON.parse(localStorage.getItem('history')));
  const [selectedHistory,setSelectedHistory]=useState('')


const payloadData=question ? question:selectedHistoryAdd 
  const payload = {
    "contents": [{
      "parts": [{ "text": payloadData }]
    }]
  }

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

    const clearHistory = () => {
    localStorage.clear();
    setRecentHistory([])
  }

    useEffect(()=>{
    console.log(selectedHistory);
    askQuestion();
    
  },[selectedHistory])
  
  return (
    <>
      <div className="grid grid-cols-5 h-screen text-center">
        <div className="col-span-1 bg-zinc-800">
            <div className='col-span-1 bg-zinc-800 pt-3'>Add commentMore actions
        <h1 className='text-xl text-white flex text-center justify-center'>
          <span>Recent Search</span>
          <button onClick={clearHistory} className='cursor-pointer'><svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#EFEFEF"><path d="M312-144q-29.7 0-50.85-21.15Q240-186.3 240-216v-480h-48v-72h192v-48h192v48h192v72h-48v479.57Q720-186 698.85-165T648-144H312Zm336-552H312v480h336v-480ZM384-288h72v-336h-72v336Zm120 0h72v-336h-72v336ZM312-696v480-480Z" /></svg></button>
        </h1>
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
                    <li onClick={()=>setSelectedHistory(item)} className='pl-5 px-5 truncate text-zinc-400 cursor-pointer hover:bg-zinc-700 hover:text-zinc-200' >

                  ))
                   </div>
               
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
