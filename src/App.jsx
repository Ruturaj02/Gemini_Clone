import { useState } from "react";
import "./App.css";
import { URL } from "./constants";

function App() {
  const [ask, setAsk] = useState("");
  const [result, setResult] = useState("");

const payLoad = {
      "contents": [{
        "parts": [{ "text": "Hi welcome" }]
      }]
    }

  const askQuestion = async () => {
    let response = await (URL,
    {
      method: "POST",
      body: JSON.stringify(payLoad),
    });
    response = await response.JSON();
    console.log(response.candidate[0].content.parts[0]);
    setResult(response.candidate[0].content.parts[0].text);
  };
  return (
    <>
      <div className="grid grid-cols-5 h-screen text-center bg-amber-300">
        <div className="col-span-1 bg-zinc-800">
          <h1>Hello</h1>
        </div>
        <div className="col-span-4 p-10 ">
          <div className="container h-140">
            {result}
          </div>
          <div className="bg-zinc-800 w-1/2 p-1 pr-5 text-white m-auto rounded-4xl border border-white flex h-16">
            <input
              type="text"
              value={ask}
              onChange={(e) => setAsk(e.target.value)}
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
