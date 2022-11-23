import TodoItem from './TodoItem';

const TodoCollection = (props) => {
  // todos = 所有代辦事項，用for迴圈渲染清單
   const {todos,onToggleDone,onSave,onDelete,onChangeMode} = props
  return (
    <div>
      TodoCollection
      {todos.map(todo => {
        return (
        <TodoItem key={todo.id} todo={todo} onToggleDone={(id) => onToggleDone?.(id)} onChangeMode={({ id, isEdit }) => onChangeMode?.({ id, isEdit })} onSave={({ id, title }) => onSave?.({ id, title })} onDelete={(id)=>onDelete?.(id)}/>
        )
      } )} 
    </div>
  );
};

export default TodoCollection;
