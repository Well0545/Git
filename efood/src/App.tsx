import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { GlobalCss } from './styles'
import Rotas from './routes'
import './fonts.css'
import { store } from './store'

function App() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <GlobalCss />
          <Rotas />
        </BrowserRouter>
      </Provider>
    </>
  )
}

export default App
