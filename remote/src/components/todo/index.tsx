import { useState } from "react"
import { Plus, Trash2, Check } from "lucide-react"

interface Todo {
    id: number
    text: string
    completed: boolean
    createdAt: Date
}

export default function TodoApp({title = "Todo App"}) {
    const [todos, setTodos] = useState<Todo[]>([])
    const [inputValue, setInputValue] = useState("")

    const addTodo = () => {
        if (inputValue.trim() !== "") {
            const newTodo: Todo = {
                id: Date.now(),
                text: inputValue.trim(),
                completed: false,
                createdAt: new Date(),
            }
            setTodos([newTodo, ...todos])
            setInputValue("")
        }
    }

    const toggleTodo = (id: number) => {
        setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)))
    }

    const deleteTodo = (id: number) => {
        setTodos(todos.filter((todo) => todo.id !== id))
    }

    const completedCount = todos.filter((todo) => todo.completed).length
    const totalCount = todos.length

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
            <div className="max-w-md mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">{title}</h1>
                    <p className="text-gray-600">Stay organized and productive</p>
                </div>

                {/* Stats */}
                <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
                    <div className="flex justify-between items-center">
                        <div className="text-center">
                            <div className="text-2xl font-bold text-blue-600">{totalCount}</div>
                            <div className="text-sm text-gray-500">Total</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-green-600">{completedCount}</div>
                            <div className="text-sm text-gray-500">Completed</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-orange-600">{totalCount - completedCount}</div>
                            <div className="text-sm text-gray-500">Pending</div>
                        </div>
                    </div>
                </div>

                {/* Add Todo Form */}
                <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && addTodo()}
                            placeholder="Add a new todo..."
                            className="flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <button
                            onClick={addTodo}
                            className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                        >
                            <Plus className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Todo List */}
                <div className="space-y-2">
                    {todos.length === 0 ? (
                        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                            <div className="text-gray-400 mb-2">
                                <Check className="w-12 h-12 mx-auto mb-3 opacity-50" />
                            </div>
                            <p className="text-gray-500">No todos yet. Add one above!</p>
                        </div>
                    ) : (
                        todos.map((todo) => (
                            <div
                                key={todo.id}
                                className={`bg-white rounded-lg shadow-sm p-4 flex items-center gap-3 transition-all hover:shadow-md ${
                                    todo.completed ? "opacity-75" : ""
                                }`}
                            >
                                <button
                                    onClick={() => toggleTodo(todo.id)}
                                    className={`flex-shrink-0 w-6 h-6 flex items-center justify-center transition-colors border border-solid rounded-full ${
                                        todo.completed
                                            ? "bg-green-500 border-green-500 text-white"
                                            : "border-gray-700 hover:border-green-400 bg-white"
                                    }`}
                                >
                                    {todo.completed && <Check className="w-4 h-4" />}
                                </button>

                                <div className="flex-1 min-w-0">
                                    <p className={`text-gray-800 transition-all ${todo.completed ? "line-through text-gray-500" : ""}`}>
                                        {todo.text}
                                    </p>
                                    <p className="text-xs text-gray-400 mt-1">
                                        {todo.createdAt.toLocaleDateString()} at{" "}
                                        {todo.createdAt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                                    </p>
                                </div>

                                <button
                                    onClick={() => deleteTodo(todo.id)}
                                    className="flex-shrink-0 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        ))
                    )}
                </div>

                {/* Footer */}
                {todos.length > 0 && (
                    <div className="mt-8 text-center">
                        <p className="text-sm text-gray-500">
                            {completedCount === totalCount
                                ? "🎉 All tasks completed! Great job!"
                                : `${totalCount - completedCount} task${totalCount - completedCount !== 1 ? "s" : ""} remaining`}
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}
