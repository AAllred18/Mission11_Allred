import './App.css'
import BooksList from './BooksList'
import CookieConsent from "react-cookie-consent";

function App() {
  return (
    <>
      <BooksList/>
      <CookieConsent>This website uses cookies to enhance the user experience.</CookieConsent>
    </>
  )
}

export default App
