import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

const rootElement = document.getElementById('root')

if (rootElement !== null && rootElement !== undefined) {
  ReactDOM.createRoot(rootElement).render(
    <App />
  )
} else {
  console.error("No se encontró el elemento con id 'root'")
}
