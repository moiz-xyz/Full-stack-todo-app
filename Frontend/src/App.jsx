import "./App.css"
import { BrowserRouter } from 'react-router-dom'
import Routes from './routes/Routes'

const App = () => {
  return (
    <>
      <BrowserRouter>
    <Routes/>
    </BrowserRouter>
    </>
  )
}

export default App
