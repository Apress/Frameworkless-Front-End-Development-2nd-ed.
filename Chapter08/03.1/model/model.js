import todosModifers from './todos.js'
import filterModifers from './filter.js'

const INITIAL_STATE = {
  todos: [],
  currentFilter: 'All'
}

export default (initalState = INITIAL_STATE) => {
  return (prevState, event) => {
    if (!event) {
      return window.structuredClone(initalState)
    }

    const {
      todos,
      currentFilter
    } = prevState

    const newTodos = todosModifers(todos, event)
    const newCurrentFilter = filterModifers(currentFilter, event)

    if (newTodos === todos && newCurrentFilter === currentFilter) {
      return prevState
    }

    return {
      todos: newTodos,
      currentFilter: newCurrentFilter
    }
  }
}
