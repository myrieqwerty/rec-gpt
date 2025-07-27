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
    <main className="max-w-[1024px] flex items-center justify-center min-h-screen mx-auto font-mono">
      <article className='flex flex-col gap-4'>
        <h1 className='text-blue-950 text-4xl font-bold'>Hi there!</h1>
        <div className='flex flex-col gap-2'>
          <p>What would you like to know?</p>
          <p>Use one of the most common prompts to below or ask your own question</p>
        </div>
        <div className='flex justify-center'>
          {loading ? <LoadingSpinner /> : <ResultView result={result} />}
          {error && <Error error={error} />}
        </div>

        <div className='flex flex-row gap-3'>
          <input onChange={(e) => setInputValue(e.target.value)} placeholder={'type query here...'} value={inputValue!} className=' border-2 border-black w-full rounded-md text-lg font-medium p-2' type="text" />
          <button onClick={onClickHandler}>Send</button>
        </div>

      </article>

    </main>
  );
};

export default App;
