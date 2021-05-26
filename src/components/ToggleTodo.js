import { useTodosDispatch } from "../context/TodosDispatchContext"
import { useUser } from "../context/UserContext"
import { useIsMounted } from "../hooks/useIsMounted"

const ToggleTodo = ({ todo }) => {
  const dispatch = useTodosDispatch()
  const isMounted = useIsMounted()
  const { user, userDispatch } = useUser()

  const toggleCompleteTodo = () => {
    fetch(`${process.env.REACT_APP_API_URL}/todos/${todo.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + user.access_token,
      },
      body: JSON.stringify({
        ...todo,
        isCompleted: !todo.isCompleted,
      }),
    })
      .then((response) => {
        if (response.status === 401) {
          userDispatch({ type: "LOGOUT" })
        }
        if (!response.ok) {
          throw new Error(`Something went wrong: ${response.statusText}`)
        }
        return response.json()
      })
      .then((result) => {
        if (isMounted.current) {
          dispatch({ type: "TOGGLE", payload: result })
        }
      })
      .catch((error) => {
        if (isMounted.current) {
          dispatch({ type: "FETCH_FAILURE", payload: error.message })
        }
      })
  }
  return (
    <button
      className={`btn btn-sm ${todo.isCompleted ? "btn-dark" : "btn-light"}`}
      type="button"
      onClick={toggleCompleteTodo}
    >
      {todo.isCompleted ? "Rétablir" : "Terminer"}
    </button>
  )
}

export default ToggleTodo
