// import firebase from 'firebase/app';
import 'firebase/database';

export default {
  state: {
    todos: null,
    todosRef: null,
    todoKey: null,
  },
  mutations: {
    addTodo(state, todo) {
      state.todos.push(todo);
    },
    setTodos(state, todos) {
      state.todos = todos;
    },
    setTodosRef(state, ref) {
      state.todosRef = ref;
    },
    setTodoKey(state, key) {
      state.todoKey = key;
    },
    removeTodo(state, index) {
      state.todos.splice(index, 1);
    },
  },
  actions: {
    setTodos(context, todos) {
      context.commit('setTodos', todos);
    },
    setTodosRef(context, ref) {
      context.commit('setTodosRef', ref);
    },
    setTodoKey(context, key) {
      context.commit('setTodoKey', key);
    },
    clearCompleted(context) {
      context.commit('todos/setTodos', context.state.todos.filter((todo) => !todo.isDone), { root: true });
    },
    destroyTodo(context, todo) {
      const index = context.state.todos.indexOf(todo);
      context.commit('todos/removeTodo', index, { root: true });
    },
    createTodo(context, todo) {
      context.commit('todos/addTodo', todo, { root: true });
    },
  },
  getters: {
    activeTodos(state) {
      console.log(state.todos);
      return state.todos.filter((todo) => !todo.isDone);
    },
    completedTodos(state) {
      return state.todos.filter((todo) => todo.isDone);
    },
  },
};
