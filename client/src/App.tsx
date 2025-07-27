import { useEffect, useState } from 'react';
import './App.css';
import { ResultView } from './components/ResultView';
import { Error } from './components/Error';
import { LoadingSpinner } from './components/LoadingSpinner';

const App = () => {

  const [inputValue, setInputValue] = useState<string | null>('')

  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>()
  const [result, setResult] = useState<string | undefined>('')

  useEffect(() => {

  }, [])

  async function fetchData(query: string | null) {
    const res = await fetch(`http://localhost:3001?q=${query}`, {
      method: 'POST',
    })

    const data = await res.json()

    if (data.error) {
      setError(data.error)
    } else {
      setResult(data.response)
    }
  }

  function onClickHandler() {
    setLoading(true)
    setError(null)
    setResult('')
    fetchData(inputValue).then(() => {
      setLoading(false)
    })

  }
  return (
    <main className="max-w-[1024px]  flex items-center justify-center min-h-screen mx-auto font-mono">
      <article className='flex flex-col gap-4'>
        <div className='icon'>
          <img src="" alt="" />
        </div>
        <h1 className='text-white text-4xl font-bold'>Hi there!</h1>
        <div className='flex flex-col gap-2 '>
          <p className='text-white'>What would you like to know?</p>
          <p className='text-[#9DB4D2]'>Use one of the most common prompts to below or ask your own question</p>
        </div>
        <div className='flex justify-center items-center h-[200px]'>
          {loading ? <LoadingSpinner /> : <ResultView result={result} />}
          {error && <Error error={error} />}
        </div>

        <div className='flex flex-row gap-3'>
          <input onChange={(e) => setInputValue(e.target.value)} placeholder={'type query here...'} value={inputValue!} className=' border-2 border-[#143F82] w-full rounded-md text-[#9DB4D2] text-lg font-medium p-2' type="text" />
          <button onClick={onClickHandler} className='rotate-180 bg-[#1D4C9B] rounded-md p-2'>
            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"><path fill="white" d="M17.77 3.77L16 2L6 12l10 10l1.77-1.77L9.54 12z"></path></svg>
          </button>
        </div>

      </article>

    </main>
  );
};

export default App;
