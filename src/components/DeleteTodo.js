import { useTodosDispatch } from "../context/TodosDispatchContext"
import { useUser } from "../context/UserContext"
import { useIsMounted } from "../hooks/useIsMounted"

const DeleteTodo = ({ todo }) => {
  const dispatch = useTodosDispatch()
  const isMounted = useIsMounted()
  const { user, userDispatch } = useUser()
  const deleteTodo = () => {
    fetch(`${process.env.REACT_APP_API_URL}/todos/${todo.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + user.access_token,
      },
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
      .then(() => {
        if (isMounted) {
          dispatch({ type: "DELETE", payload: todo })
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
      className="btn btn-danger btn-sm"
      type="button"
      onClick={deleteTodo}
    >
      Supprimer
    </button>
  )
}

export default DeleteTodo
