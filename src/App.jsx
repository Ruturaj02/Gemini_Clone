import "./App.css";

function App() {
  return (
    <>
      <div className="grid grid-cols-5 h-screen text-center bg-amber-300">
        <div className="col-span-1 bg-zinc-800">
          <h1>Hello</h1>
        </div>
        <div className="col-span-4 p-10 ">
          <div className="container h-140">

          </div>
          <div className="bg-zinc-800 w-1/2 p-1 pr-5 text-white m-auto rounded-4xl border border-white flex h-16">
            <input type="text" className="w-full h-full p-3 outline-none" placeholder="Ask Me Anything" />
            <button>Ask</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
