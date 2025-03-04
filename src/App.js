import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom"
import Todos from "./components/Todos"
import ColorModeContainer from "./components/ColorModeContainer"
import Login from "./components/Login"
import Navigation from "./components/Navigation"
import Home from "./components/Home"
import { useUser } from "./context/UserContext"

function App() {
  const { user } = useUser()
  return (
    <Router>
      <ColorModeContainer>
        <Navigation />
        <div className="container my-4">
          <h1 className="text-center">ToDos App</h1>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/todos">
              {user ? <Todos /> : <Redirect to="/login" />}
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
          </Switch>
        </div>
      </ColorModeContainer>
    </Router>
  )
}

export default App
