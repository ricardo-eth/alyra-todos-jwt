import { useHistory } from "react-router-dom"
import { useUser } from "../context/UserContext"

const Login = () => {
  const { error, loading, userDispatch } = useUser()
  const history = useHistory()
  const handleFormSubmit = (e) => {
    e.preventDefault()
    const login = e.target.elements.login.value
    const password = e.target.elements.password.value
    // initialiser login
    userDispatch({ type: "LOGIN_INIT" })
    fetch("http://localhost:4000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        login,
        password,
      }),
    })
      .then((response) => {
        console.log(response)
        if (!response.ok) {
          throw new Error(`Error ${response.statusText}`)
        }
        return response.json()
      })
      .then((result) => {
        console.log(result)
        // dispatch LOGIN SUCCESS
        userDispatch({ type: "LOGIN_SUCCESS", payload: result })
        history.push("/todos")
      })
      .catch((e) => {
        console.error(e)
        // dispatch LOGIN FAILURE
        userDispatch({ type: "LOGIN_FAILURE", payload: e.message })
      })
  }

  return (
    <section>
      <h2 className="text-center">Log in</h2>
      {loading ? (
        <p>loading...</p>
      ) : (
        <form className="row g-3 mt-3" onSubmit={handleFormSubmit}>
          <div className="col-auto">
            <label htmlFor="login" className="visually-hidden">
              Login
            </label>
            <input
              type="text"
              className="form-control"
              id="login"
              placeholder="login"
              required
            />
          </div>
          <div className="col-auto">
            <label htmlFor="password" className="visually-hidden">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Password"
              required
            />
          </div>
          <div className="col-auto">
            <button type="submit" className="btn btn-primary mb-3">
              Log in
            </button>
          </div>
        </form>
      )}
      {error && <p className="alert alert-danger">{error}</p>}
    </section>
  )
}

export default Login
