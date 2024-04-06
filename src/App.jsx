import CodeEditor from "./components/CodeEditor"
import Copy from "./components/Copy"
import documents from "./static/copiedCode"
import bong_logo from './static/bong_logo.png'
import Footer from "./components/Footer"


function App() {

  return (
    <div className="bg-emerald-800 pt-4">
      <div className="w-full flex flex-col justify-center items-center mt-11 mb-16">
        <img src={bong_logo} alt="logo" className="w-[85vw] h-[15vh] mb-3 sm:w-[56.1vw] sm:[10.2vh] md:w-[495.56px] md:h-[155px] md:mb-4 lg:w-[545.116px] lg:h-[170.5px]" />
        <p className=" text-xs font-medium w-[85vw] text-center text-stone-400 sm:text-sm sm:w-[56.1vw]  md:text-base md:w-[495.56px] lg:w-[545.116px] lg:text-lg">Bonglang is a fun programming language written using Javascript</p>
      </div>
      <CodeEditor />
      <h1 className="text-xl font-bold text-gray-900 ml-3 mt-8 pb-2 border-b-2 border-gray-900 w-[90vw] sm:w-[92vw] sm:text-2xl sm:ml-4 sm:mt-9 sm:pb-3 md:w-[92vw] md:text-4xl md:ml-6 md:mt-10 md:pb-4 lg:ml-8 lg:w-[92vw]">Documentation</h1>
      <Copy text={documents.variable.code} name={documents.variable.name} details={documents.variable.details} />
      <Copy text={documents.Expression.code} name={documents.Expression.name} details={documents.Expression.details} />
      <Copy text={documents.Conditionals.code} name={documents.Conditionals.name} details={documents.Conditionals.details} />
      <Copy text={documents.Loops.code} name={documents.Loops.name} details={documents.Loops.details} />
      <Footer />
    </div>
  )
}

export default App
