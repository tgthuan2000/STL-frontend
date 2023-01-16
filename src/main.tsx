import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(<App />)

if (process.env.NODE_ENV === 'production') {
    // console.log = () => {}
}
