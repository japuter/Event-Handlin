const todoList = [
  {
    id: 1,
    task: 'Learn HTML',
    completed: true,
  },
  {
    id: 2,
    task: 'Learn CSS',
    completed: true,
  },
  {
    id: 3,
    task: 'Learn JS',
    completed: false,
  },
  {
    id: 4,
    task: 'Learn TypeScript',
    completed: false,
  },
  {
    id: 5,
    task: 'Learn React',
    completed: false,
  },
];




document.addEventListener('DOMContentLoaded', () => {
  const listElement = document.querySelector('ul');
  const showDialogButton = document.getElementById('showDialogButton');
  const addItemDialog = document.getElementById('addItemDialog');
  const addItemForm = document.getElementById('addItemForm');
  const newItemInput = document.getElementById('newItemInput');

  const refreshTodoList = () => {
    listElement.innerHTML = ''; // Clear existing todo items
    todoList.forEach(todo => { // Rebuild the todo list UI from the todoList array
      const li = document.createElement('li');
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.id = `todo-${todo.id}`;
      checkbox.checked = todo.completed;

      checkbox.addEventListener('change', (event) => {
        const todoToUpdate = todoList.find(item => item.id === todo.id);
        if (todoToUpdate) {
          todoToUpdate.completed = event.target.checked;
        }
        console.log(todoList);
      });

      const label = document.createElement('label');
      label.htmlFor = checkbox.id;
      label.textContent = todo.task;

      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.addEventListener('click', () => {
        const todoIndex = todoList.findIndex(item => item.id === todo.id);
        if (todoIndex !== -1) {
          todoList.splice(todoIndex, 1);
        }
        refreshTodoList(); // Refresh the list
        console.log(todoList);
      });

      li.appendChild(checkbox);
      li.appendChild(label);
      li.appendChild(deleteButton);
      listElement.appendChild(li);
    });
  };

  showDialogButton.addEventListener('click', () => {
    addItemDialog.showModal(); // Show modal
  });

  addItemForm.addEventListener('submit', event => {
    event.preventDefault();
    const newItem = newItemInput.value.trim();
    if (newItem) {
      todoList.push({ id: todoList.length + 1, task: newItem, completed: false });
      console.log(todoList);
      newItemInput.value = '';
      addItemDialog.close();
      refreshTodoList(); // Refresh the list to include the new item
    }
  });

  refreshTodoList();
});
