import { useEffect, useState } from 'react';
import './App.scss';
import Pagination from './components/Pagination';
import PostList from './components/PostList';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import queryString from 'query-string'
import PostFilterForm from './components/PostFilterForm';

function App() {
  const [todoList, setTodoList] = useState([
    { id: 1, title: 'So 1' },
    { id: 2, title: 'So 2' },
    { id: 3, title: 'So 3' }]);

  const [postList, setPostList] = useState([]);
  const [pagination, setPagination] = useState({
    _page: 1,
    _limit: 10,
    _totalRows: 20,
  });
  const [filter, setFilter] = useState({
    _litmit: 10,
    _page: 1,
    title_like: ''
  })

  useEffect(() => {
    async function fetchPostList() {
      try {
        const paramString = queryString.stringify(filter);
        const requestUrl = `http://js-post-api.herokuapp.com/api/posts?${paramString}`;
        const response = await fetch(requestUrl);
        const responseJson = await response.json();
        console.log({ responseJson });
        const { data, pagination } = responseJson;
        setPostList(data);
        setPagination(pagination);
      } catch (error) {
        console.log('Faild to fetch data ', error.message);
      }
    }
    console.log('Post list effect');
    fetchPostList();
  }, [filter]);

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

  function handlePageChange(newPage) {
    console.log('new page = ', newPage);
    setFilter({
      ...filter,
      _page: newPage
    })
  }

  function handleFilterChange(newFilters) {
    console.log('new filter', newFilters);
    setFilter({
      ...filter,
      _page: 1,
      title_like: newFilters.searchTerm
    });
  }

  return (
    <div className="App">
      <h1>React hooks PostList</h1>
      <PostFilterForm onSubmit={handleFilterChange} />
      <PostList posts={postList} />
      {/* <TodoForm onSubmit={handleTodoFormSubmit} /> */}
      {/* <TodoList todos={todoList} onTodoClick={handleTodoClick} /> */}
      <Pagination
        pagination={pagination}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default App;
