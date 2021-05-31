class TodoElement extends HTMLElement {
  inputElm;
  btn;
  id;
  todoList;
  listArr;
  changeTitle;
  //   myText;

  constructor(label, id) {
    super();

    this.label = label;
    this.id = "-" + id;

    let localLabel = localStorage.getItem("title" + this.id);
    if (localLabel != null) this.label = localLabel;

    this.classList.add("column");
    this.innerHTML = `<h2 id ="userTitle" contenteditable="true"> ${this.label}</h2>
                    <div class="inputfield">
                    <input type="text" placeholder="Add new goal" />
                    <button><i class="fa fa-plus"></i></button>
                    </div>
                    <ul class="todolist">
                    <!-- Datan kommer från bruker -->
                    </ul>`;

    this.inputElm = this.querySelector(".inputfield input");
    this.todoList = this.querySelector(".todolist");
    this.btn = this.querySelector(".inputfield button");
    this.changeTitle = this.querySelector("#userTitle");

    this.changeTitle.addEventListener("focusout", (event) => {
      // console.log(this.changeTitle.textContent);
      this.saveTitle();
    });

    // Show Value
    this.btn.addEventListener("click", () => {
      this.saveValue();
      this.showTodo();
    });

    this.todoList.addEventListener("click", (event) => {
      let id = event.target.getAttribute("data-id");
      console.log("delete", id);
      this.deleteTask(id);
    });

    this.showTodo();
  }

  saveTitle() {
    let key = "title" + this.id;
    let title = this.changeTitle.innerHTML;
    localStorage.setItem(key, title);
  }

  saveValue() {
    //funktion för att lagra brukers input
    let UserTodo = this.inputElm.value;
    let getLocalStorage = localStorage.getItem("todo" + this.id);
    if (getLocalStorage == null) {
      this.listArr = []; //tom array
    } else {
      this.listArr = JSON.parse(getLocalStorage);
    }
    this.listArr.push(UserTodo);
    localStorage.setItem("todo" + this.id, JSON.stringify(this.listArr));
  }

  showTodo() {
    let getLocalStorage = localStorage.getItem("todo" + this.id);
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
    let key = "title" + this.id;
    let title = localStorage.getItem(key);
    this.changeTitle.value = title;
  }

  deleteTask(index) {
    let getLocalStorage = localStorage.getItem("todo" + this.id);
    this.listArr = JSON.parse(getLocalStorage);
    this.listArr.splice(index, 1);
    localStorage.setItem("todo" + this.id, JSON.stringify(this.listArr));

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

  localStorage.clear;

  // alert("hej");
}

customElements.define("todo-element", TodoElement);

let mainTodoContainerElement = document.querySelector(".main");

let todoEducation = new TodoElement("Education", "list-1");
mainTodoContainerElement.append(todoEducation);

let todoCareer = new TodoElement("Career", "list-2");
mainTodoContainerElement.append(todoCareer);

let todoHealth = new TodoElement("Health", "list-3");
mainTodoContainerElement.append(todoHealth);

// let todoSocial = new TodoElement("Social", "list-4");
// mainTodoContainerElement.append(todoSocial);
