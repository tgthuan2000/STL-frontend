import ReactDOM from 'react-dom/client'
import App from './App'
import './i18n'
import './index.css'
import { setupNotifications } from './setup'

if (process.env.NODE_ENV === 'production') {
    console.log = () => {}
}

ReactDOM.createRoot(document.getElementById('root')!).render(<App />)

setupNotifications()
