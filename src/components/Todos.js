import React, { useEffect, useReducer } from "react"
import TodosList from "./TodosList"
import AddTodoForm from "./AddTodoForm"
import { todosReducer } from "../reducers/todosReducer"
import { TodosDispatchContext } from "../context/TodosDispatchContext"
import { useIsMounted } from "../hooks/useIsMounted"
import { useUser } from "../context/UserContext"

const initialState = {
  todos: [],
  loading: false,
  error: "",
}

const Todos = () => {
  const [state, dispatch] = useReducer(todosReducer, initialState)
  const { todos, loading, error } = state
  const isMounted = useIsMounted()
  console.log(isMounted)
  const { user, userDispatch } = useUser()

  useEffect(() => {
    dispatch({ type: "FETCH_INIT" })
    fetch(`${process.env.REACT_APP_API_URL}/todos`, {
      headers: {
        Authorization: "Bearer " + user.access_token,
      },
    })
      .then((response) => {
        console.log(response)
        if (response.status === 401) {
          userDispatch({ type: "LOGOUT" })
        }
        if (!response.ok) {
          throw new Error(`Something went wrong ${response.statusText}`)
        }
        return response.json()
      })
      .then((result) => {
        console.log(result)
        if (isMounted.current) {
          dispatch({ type: "FETCH_SUCCESS", payload: result })
        }
      })
      .catch((error) => {
        if (isMounted.current) {
          dispatch({ type: "FETCH_FAILURE", payload: error.message })
        }
      })
  }, [isMounted, user, userDispatch])

  return (
    <main>
      <h2 className="text-center">Ma liste de tâches ({todos.length})</h2>
      {error && <p className="alert alert-danger">{error}</p>}
      <TodosDispatchContext.Provider value={dispatch}>
        <TodosList todos={todos} />
        <AddTodoForm />
        {loading && <p>Loading....</p>}
      </TodosDispatchContext.Provider>
    </main>
  )
}

export default Todos
