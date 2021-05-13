import { useEffect, useState } from 'react';
import './App.scss';
import PostList from './components/PostList';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

function App() {
  const [todoList, setTodoList] = useState([
    { id: 1, title: 'So 1' },
    { id: 2, title: 'So 2' },
    { id: 3, title: 'So 3' }]);

  const [postList, setPostList] = useState([]);

  useEffect(() => {
    async function fetchPostList() {
      try {
        const requestUrl = 'http://js-post-api.herokuapp.com/api/posts?_limit=10&_page=1';
        const response = await fetch(requestUrl);
        const responseJson = await response.json();
        console.log({ responseJson });
        const { data } = responseJson;
        setPostList(data);
      } catch (error) {
        console.log('Faild to fetch data ', error.message);
      }
    }
    console.log('Post list effect');
    fetchPostList();
  }, []);

  useEffect(() => {
    console.log('Todo list effect');
  });

  function handleTodoClick(todo) {
    const index = todoList.findIndex(x => x.id === todo.id);
    if (index < 0) return;

    const newTodoList = [...todoList];
    newTodoList.splice(index, 1);
    setTodoList(newTodoList);
  }

  function handleTodoFormSubmit(formValue) {
    const newTodo = {
      id: todoList.length + 1,
      ...formValue,
    }
    const newTodoList = [...todoList];
    newTodoList.push(newTodo);
    setTodoList(newTodoList);
  }

  return (
    <div className="App">
      <h1>React hooks PostList</h1>
      <PostList posts={postList} />
      {/* <TodoForm onSubmit={handleTodoFormSubmit} /> */}
      {/* <TodoList todos={todoList} onTodoClick={handleTodoClick} /> */}
    </div>
  );
}

export default App;
