class TodoElement extends HTMLElement {
  inputElm;
  btn;
  todoList;
  listArr;
  changeTitle;
  //   myText;

  constructor(label) {
    super();

    this.label = label;
    if (this.value) {
      this.label = this.value;
    } else {
      this.value = this.label;
    }

    this.classList.add("column");
    this.innerHTML = `<h2 id ="userTitle" contenteditable="true"> ${this.label}</h2>
                    <div class="inputfield">
                    <input type="text" placeholder="Add your new goal" />
                    <button><i class="fa fa-plus"></i></button>
                    </div>
                    <ul class="todolist">
                    <!-- Datan kommer från bruker -->
                    </ul>`;

    this.inputElm = this.querySelector(".inputfield input");
    this.todoList = this.querySelector(".todolist");
    this.btn = this.querySelector(".inputfield button");
    this.changeTitle = this.querySelector("#userTitle");

    // Show Value
    this.btn.addEventListener("click", () => {
      this.saveValue();
      this.showTodo();
      this.saveTitle();
    });

    this.todoList.addEventListener("click", (event) => {
      let id = event.target.getAttribute("data-id");
      console.log("delete", id);
      this.deleteTask(id);
    });

    this.showTodo();
  }

  get value() {
    return this.getAttribute("value");
  }

  set value(newValue) {
    this.setAttribute("value", newValue);
  }

  saveTitle() {
    let key = "title" + this.label;
    let title = this.changeTitle.innerHTML;
    localStorage.setItem(key, title);
  }

  saveValue() {
    //funktion för att lagra brukers input
    let UserTodo = this.inputElm.value;
    let getLocalStorage = localStorage.getItem("todo" + this.label);
    if (getLocalStorage == null) {
      this.listArr = []; //tom array
    } else {
      this.listArr = JSON.parse(getLocalStorage);
    }
    this.listArr.push(UserTodo);
    localStorage.setItem("todo" + this.label, JSON.stringify(this.listArr));
  }

  showTodo() {
    let getLocalStorage = localStorage.getItem("todo" + this.label);
    if (getLocalStorage == null) {
      this.listArr = []; //tom array
    } else {
      this.listArr = JSON.parse(getLocalStorage);
    }

    let newTodo = "";
    this.listArr.forEach((element, index) => {
      newTodo += `<li>${element} <span data-id="${index}"><i style="pointer-events: none;" class="fa fa-close"></i> </li>`;
    });

    this.todoList.innerHTML = newTodo;
    this.inputElm.value = "";

    // Also show the title.
    let key = "title" + this.label;
    let title = localStorage.getItem(key);
    this.changeTitle.value = title;
  }

  deleteTask(index) {
    let getLocalStorage = localStorage.getItem("todo" + this.label);
    this.listArr = JSON.parse(getLocalStorage);
    this.listArr.splice(index, 1);
    localStorage.setItem("todo" + this.label, JSON.stringify(this.listArr));

    this.showTodo();
  }
}

let deleteAll = document.querySelector(".delete");
deleteAll.addEventListener("click", clearAll);

//delete all list items
function clearAll() {
  //   listArr = [];
  //   localStorage.setItem("New Todo", JSON.stringify(listArr));

  //   showTodo();

  alert("hej");
}

customElements.define("todo-element", TodoElement);

let mainTodoContainerElement = document.querySelector(".main");

let todoEducation = new TodoElement("Education");
mainTodoContainerElement.append(todoEducation);

let todoCareer = new TodoElement("Career");
mainTodoContainerElement.append(todoCareer);

let todoHealth = new TodoElement("Health");
mainTodoContainerElement.append(todoHealth);

let todoSocial = new TodoElement("Social");
mainTodoContainerElement.append(todoSocial);
