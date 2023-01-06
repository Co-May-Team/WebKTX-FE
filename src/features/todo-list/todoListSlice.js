import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    todos: [],
}

const makeTodo = title => ({
    id: Math.random(),
    title,
    completed: false,
})

const todoListSlide = createSlice({
    name: 'todoList',
    initialState,
    reducers: {
        addTodo: (state, action) => {
            const title = action.payload
            console.log(title)
            if (title !== 0 && !title) return state
            const todo = makeTodo(title)
            return { todos: [...state.todos, todo] }
        },
    },
})

// export { todoListSlide };
export const { addTodo } = todoListSlide.actions
export default todoListSlide.reducer
