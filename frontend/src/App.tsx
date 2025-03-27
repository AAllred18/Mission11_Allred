import './App.css'
import BooksList from './BooksList'
import CategoryFilter from './CategoryFilter';
import CookieConsent from "react-cookie-consent";

function App() {
  return (
    <>
      <CategoryFilter/>
      <BooksList/>
      <CookieConsent>This website uses cookies to enhance the user experience.</CookieConsent>
    </>
  )
}

export default App 
