 var todoList = {
  todos: [],
  addTodo: function(todoText) {
    this.todos.push({
      todoText:todoText,
      completed: false
      });
  },
  changeTodo: function(position,todoText) {
    this.todos[position].todoText = todoText;
  },
  deleteTodo: function(position) {
    this.todos.splice(position,1);
  },
  toggleCompleted: function(position) {
    var todo = this.todos[position];
    todo.completed = !todo.completed;
  },
  toggleAll: function() {
    var totalTodos = this.todos.length;
    var completedTodos = 0;
    var i;
 /*   for(i=0;i<totalTodos;i++)
    {
      if(this.todos[i].completed===true)
      {
        completedTodos++;
      }
    }  */
	this.todos.forEach(function(todo) {
		if(todo.completed===true){
			completedTodos++;
		}
	});
 /*   if(completedTodos==totalTodos)
    {
    //  for(i=0;i<totalTodos;i++)
    //  {
    //    this.todos[i].completed = false;
    //  }  
		this.todos.forEach(function(todo) {
			todo.completed = false;
		});
    }
    else
    {
    //  for(i=0;i<totalTodos;i++)
    //  {
    //    this.todos[i].completed = true;
    //  }
	  this.todos.forEach(function(todo) {
			todo.completed = false;
		});
    }*/
	
	this.todos.forEach(function(todo) {
		if(completedTodos==totalTodos){
			todo.completed = false;
		}
		else{
			todo.completed = true;
		}
	});
	
  }
};

var handlers={
  addTodo: function() {
    var addTodoTextInput = document.getElementById('addTodoTextInput');
    todoList.addTodo(addTodoTextInput.value);
    addTodoTextInput.value = '';
    view.displayTodos();
  },
  changeTodo: function() {
    var changeTodoPositionInput = document.getElementById('changeTodoPositionInput');
    var changeTodoTextInput = document.getElementById('changeTodoTextInput');
    todoList.changeTodo(changeTodoPositionInput.valueAsNumber,changeTodoTextInput.value);
    changeTodoPositionInput.value = '';
    changeTodoTextInput.value = '';
    view.displayTodos();
  },
  deleteTodo: function(position) {
    todoList.deleteTodo(position);
    view.displayTodos();
  },
  toggleCompleted: function() {
   var toggleCompletedPositionInput = document.getElementById('toggleCompletedPositionInput');
   todoList.toggleCompleted(toggleCompletedPositionInput.valueAsNumber);
   toggleCompletedPositionInput.value = '';
   view.displayTodos();
  },
  toggleAll: function() {
    todoList.toggleAll();
    view.displayTodos();
  }
};

// this refers to view object
// forEach(callback , this);

var view = {
  displayTodos: function() {
    var todoUl = document.querySelector('ul');
    todoUl.innerHTML = '';
   /* for(var i=0;i<todoList.todos.length;i++)
    {
      var todoLi = document.createElement('li');
      var todo = todoList.todos[i];
      
      var todoTextWithCompletion = '';
      
      if(todo.completed===true){
        todoTextWithCompletion = '(x) ' + todo.todoText; 
      }
      else{
         todoTextWithCompletion = '( ) ' + todo.todoText; 
      }
      
	  todoLi.id = i;
      todoLi.textContent = todoTextWithCompletion;
	  todoLi.appendChild(this.createDeleteButton());
      todoUl.appendChild(todoLi);
	  
    }*/
	todoList.todos.forEach(function(todo,position) {
		var todoLi = document.createElement('li');
		var todoTextWithCompletion = '';
		if(todo.completed===true){
        todoTextWithCompletion = '(x) ' + todo.todoText; 
		}
		else{
         todoTextWithCompletion = '( ) ' + todo.todoText; 
		}
		todoLi.id = position;
		todoLi.textContent = todoTextWithCompletion;
		todoLi.appendChild(this.createDeleteButton());
		todoUl.appendChild(todoLi);
	}, this);
  },
  createDeleteButton: function() {
  var deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.className = 'deleteButton';
  return deleteButton;
  },
  setUpEventListeners: function() {
	var todosUl = document.querySelector('ul');
	todosUl.addEventListener('click',function(event) {
	//Get the element that was clicked on
	var elementClicked = event.target;
	//Check if elementClicked is a deleteButton
	if(elementClicked.className==='deleteButton')
	{
		handlers.deleteTodo(parseInt(elementClicked.parentNode.id));
	}
    });
  }
};

view.setUpEventListeners();

// var displayTodosButton = document.getElementById('displayTodosButton');
// displayTodosButton.addEventListener('click',function() {
//   todoList.displayTodos();
// });

// var toggleAll = document.getElementById('toggleAll');
// toggleAll.addEventListener('click',function() {
//   todoList.toggleAll();
// });