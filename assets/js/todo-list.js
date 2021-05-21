'use strict'

function Todo(id, content, isDone) {
    this.id = id;
    this.content = content;
    this.isDone = isDone;
};

/**
 * 컨트롤러 선언
 */
function TodoController() {
    this.todoList = [];
    this.id = 1;
    this.ENTER_KEY = 13;
    this.todoInput = document.getElementById('newTodo');
    this.todoListView = document.getElementById('todoListView');
};


TodoController.prototype = {
    /**
     * @param {argument} key-localstorage로 이동
     */
    //이건 배열형태로 가져오는건가??
    getTodoFromLocalstorage: function (key) {
        var todoList = JSON.parse(localStorage.getItem(key)) || [];
        return todoList;
    },
    /**
     * @param {argument} 키-localstorage로 설정
     */
    setTodoLocalstorage: function (key) {
        localStorage.setItem('todoList', JSON.stringify(key));
    },
    /**
     * @param {sting} 가치-할 일 내용
     */
    handleTodoItem: function (value) {
        console.log('handleTodoItem 체크합니다.')
        this.isDone = false;
        var mainArray = todoController.getTodoFromLocalstorage('todoList');
        this.id = todoController.idLargestOfLocal(mainArray) + 1;
        var todoItem = new Todo(this.id, value, this.isDone);
        return todoItem;
    },
    /**
     * @param {array} mainArray-localstorage의 배열에서 마지막 ID 찾기
     */
    idLargestOfLocal: function (mainArray) {
        var lengthArr = mainArray.length;
        if (lengthArr !== 0) {
            return mainArray[lengthArr - 1].id;
        } else {
            return 0;
        }
        return lastId;
    },
    /**
     * Presentation create new a todo item
     * @param {array} list - id for todo
     * @return {object} todo - return todo object
     */
    addNewTodo: function (todo, list) {
        console.log("addNewTodo 새로 만듭니다.")
        list.push(todo);
        todoController.setTodoLocalstorage(list);
        return todo;
    },
    /**
     * 프레젠테이션 새 할일 항목 만들기
     * @param {value attribute} attrs - 요소 html의 값 속성
     * @return {attribute} element - 요소 html의 속성
     */
    setAttributes: function (element, attrs) {
        //key 값이 대체 뭐지 ???
        for (var key in attrs) {
            // console.log(element)
            element.setAttribute(key, attrs[key]);
            // console.log(element)
        }
    },
    /**
     * 새 체크 박스 입력 요소 생성
     * @param {number} todoId - id checkbox
     */
    checkboxView: function (todoId) {
        var inpCheckbox = document.createElement('input');

        var list = todoController.getTodoFromLocalstorage('todoList');
        //아이디가 같고 요걸 왜 못찾지???
        for (var i = 0; i < list.length; i++) {
            console.log(list[i].id);
        }

        console.log(todoId);
        this.setAttributes(inpCheckbox, {type: 'checkbox', class: 'itemList', id: todoId,});


        inpCheckbox.addEventListener('click', function (e) {

            //localStorage에서 목록 배열 가져 오기
            var list = todoController.getTodoFromLocalstorage('todoList');

            var id = e.target.getAttribute('id');
            for (var i = 0; i < list.length; i++) {
                if (list[i].id == id) {
                    list[i].isDone = e.target.checked;

                    //요건 그냥 isDone속성을 true로 바꿔줌.
                    //css after와 큰 상관 없는듯듯
                    console.log("체크 했을때 ")
                    console.log((list[i].isDone))
                    console.log(e.target.checked)
                }
            }
            //localStorage에 할 목록 저장
            todoController.setTodoLocalstorage(list);
            todoController.countItem();
        });
        return inpCheckbox;
    },
    /**
     * Create new lable element
     * @param {object} todo - item todo from addNewTodo
     */
    createLableView: function (todo) {
        var lbContent = document.createElement('label');
        // console.log("this 값 확인 : " + this);
        this.setAttributes(lbContent, {value: todo.content, class: 'labelContent '});
        lbContent.innerHTML = todo.content;
//노드 레이블 반환
        return lbContent;
    },
    /**
     * Create new li element
     * @param {object} todo - item todo from addNewTodo
     */
    initTodoITem: function (todo) {
        // var inpCheckbox = document.createElement('input');
        console.log("initTodoITem 실행합니다")
        var item = document.createElement('li');

        item.setAttribute('class', 'todoItem');

//노드 li에서 이벤트 이벤트 더블 클릭
        item.addEventListener('dblclick', function (e) {
            item.classList.add('editing');
        });
//return node li
        return item;
    },
    /**
     * Create new input edit element
     * @param {object} todo - item todo from addNewTodo
     */
    editInputView: function (todo) {
//localStorage에서 배열 가져 오기
        var list = todoController.getTodoFromLocalstorage('todoList');
        var inputEdit = document.createElement('input');
        this.setAttributes(inputEdit, {
            id: todo.id,
            class: 'edit',
            value: todo.content,
            type: 'text',
        });
        inputEdit.focus();
//이벤트 onblur이 입력 외부를 클릭하면 값 편집 및 클래스 편집 삭제
        inputEdit.onblur = function (e) {
            todoController.handleTodoUpdate(e);
        };
//이벤트 onkeyup 값 가져 오기 편집 양식 inputEdit
        inputEdit.onkeypress = function (e) {
            if (event.which == todoController.ENTER_KEY || event.keyCode == todoController.ENTER_KEY) {
                todoController.handleTodoUpdate(e);
            }
        };
//편집 할 작업에 대한 노드 입력 반환
        return inputEdit;
    },
    handleTodoUpdate: function (event) {
        console.log("handleTodoUpdate 핸들투두")
        var list = todoController.getTodoFromLocalstorage('todoList');
        var inputEdit = event.target;
        var todoItem = new Todo(inputEdit.id, inputEdit.value, false);
        todoController.updateTodoEdit(todoItem, list);
        var editing = document.querySelector('.editing');
        editing.classList.remove('editing');
        todoController.renderTodo();
    },
    /**
     * Presentation update todo edit
     * @param {object} todo - get item todo from event get value edit
     * @param {array} list - array in localStorage
     */
    updateTodoEdit: function (todo, list) {
        console.log("updateTodoEdit 업데이트합니다");
        for (var i = 0; i < list.length; i++) {
            if (list[i].id == todo.id) {
                list[i].content = todo.content;
                todoController.setTodoLocalstorage(list);
                break;
            }
        }
//새 개체를 반환
        return todo;
    },
    /**
     * Presentation create new button remove item todo
     * @param {object} todo - get item todo from event get value edit
     */
    removeButtonView: function (todo) {
        var btnRemove = document.createElement('button');
        this.setAttributes(btnRemove, {class: 'remove', id: todo.id});
//btn에 이벤트 클릭 마우스 항목 제거 할 일
        btnRemove.addEventListener('click', function (e) {
            var id = e.target.getAttribute('id');
            todoController.removeTodo(id);
            todoController.renderTodo();
            todoController.countItem();
        });
//리턴 노드 버튼
        return btnRemove;
    },
    /**
     * 프레젠테이션 새 할일 항목 만들기
     * @param {object} todo-보기 위해 개체 렌더링
     */
    todoView: function (todo) {
        console.log("todoView 언제 호출되는지 ")
        var item = this.initTodoITem(todo);//create node li
        var inpCheckbox = this.checkboxView(todo.id),//노드 입력 생성 확인란
            lbContent = this.createLableView(todo),//create node lable
            inputEdit = this.editInputView(todo),//create node input edit
            btnRemove = this.removeButtonView(todo);//create node button remove item todo
//항목은 각 요소를 추가합니다.
        item.appendChild(inpCheckbox);
        item.appendChild(lbContent);
        item.appendChild(inputEdit);
        item.appendChild(btnRemove);
//ul 각 항목 추가
        document.querySelector('#todoListView').appendChild(item);
//반환 노드 li는 inpCheckbox, lbContent, inputEdit, btnRemove를 포함합니다.
        return item;
    },
    /**
     * Presentation remove a item todo
     * @param {number} id - id button remove item todo
     * @param {array} list - list array get from localStorage
     */
    removeTodo: function (id, list) {
        list = todoController.getTodoFromLocalstorage('todoList');
        for (var i = 0; i < list.length; i++) {
            if (list[i].id == id) {
                list.splice(i, 1);
                break;
            }
        }
//항목을 localStorage로 제거한 후 값 설정
        todoController.setTodoLocalstorage(list);
    },
    /**
     * 프레젠테이션 항목 제거 작업
     * @param {index} index - index in array object
     * @param {array} list - list array get from localStorage
     */
    countItem: function (index, list) {
        list = todoController.getTodoFromLocalstorage('todoList');
        index = 0;
        for (var i = 0; i < list.length; i++) {
            if (!list[i].isDone) {
                index++;
            }
        }
// UI에 인덱스 디스플레이 반환;
        document.getElementById('todoCount').innerHTML = index;
    },
    /**
     * Presentation the events for todo
     */
    events: function () {
        console.log("이게 언제??")
// 이벤트 추가 할 일
        todoController.todoInput.onkeyup = function (event) {
            if (event.which == todoController.ENTER_KEY || event.keyCode == todoController.ENTER_KEY) {
//localStorage에서 가져 오기
                var todoList = todoController.getTodoFromLocalstorage('todoList');
//할 일에 값을 첨부
                var todoItem = todoController.handleTodoItem(todoController.todoInput.value);
//add new a Todo
                var todo = todoController.addNewTodo(todoItem, todoList);
//UI에 디스플레이 실행
                todoController.todoView(todo);
//명확한 입력
                todoController.todoInput.value = '';
                todoController.countItem();
            }
        };
//이벤트 목록 항목의 모든 확인란을 확인
        var list = document.getElementsByClassName('itemList');
        var checkAll = document.getElementById('toggleInputAll');
        checkAll.addEventListener('change', function (e) {

            var check;
            for (var i = 0; i < list.length; i++) {
                list[i].checked = this.checked;
                check = e.target.checked;
                console.log("check값: " + check);
                todoController.checkAllTodo(check);
            }
            todoController.countItem();
        });
//모든 항목 표시 (All 버튼)
        var listWork = document.getElementsByClassName('todoItem');
        var showAllItem = document.getElementById('allWorks');
        showAllItem.addEventListener('click', function () {
            console.log("all 버튼 누릅니다.")
            localStorage.setItem('todoButtonCheck', "All");
            for (var i = 0; i < listWork.length; i++) {
                listWork[i].style.display = 'block';
            }
        });
//할일 체크안된 목록 (아직 해야할 목록) 출력 (Active 버튼)
        var activeItem = document.getElementsByClassName('todoItem');
        var todoActive = document.getElementById('activedItems');
        todoActive.addEventListener('click', function () {
            localStorage.setItem('todoButtonCheck', "Active");

            var list = todoController.getTodoFromLocalstorage('todoList');

            var todoList = todoController.getTodoFromLocalstorage('todoList');

            for (var i = 0; i < list.length; i++) {
                // console.log(todotodo[i]);
                console.log("엑티브 아이템 " + activeItem[i]);

                if (todoList[i].isDone === false) {
                    activeItem[i].style.display = 'block';
                } else {
                    activeItem[i].style.display = 'none';
                }
            }
        });
//완료된 할일 목록 필터링 (Completed)
        var completeItem = document.getElementsByClassName('todoItem');
        var todoCompleted = document.getElementById('completedTodos');
        todoCompleted.addEventListener('click', function () {
            console.log("완료된 목록 출력하기 ");
            localStorage.setItem('todoButtonCheck', "Completed");

            //isDone 목록 true인것만 출력하면 됨
            var todoList = todoController.getTodoFromLocalstorage('todoList');
            for (var i = 0; i < list.length; i++) {
                // todoList[i].isDone = check;
                console.log(todoList[i].isDone);
                // todoController.setTodoLocalstorage(todoList);
            }
            //
            //기존 함수 display 형태로 체크한다 플러그인에서는 사용 몬함
            for (var i = 0; i < list.length; i++) {
                if (todoList[i].isDone === true) {
                    completeItem[i].style.display = 'block';
                } else {
                    completeItem[i].style.display = 'none';
                }
            }
        });
// 버튼에 이벤트 클리어 완료 아이템 추가
        var clearButton = document.getElementById('btnClear');
        clearButton.addEventListener('click', function () {
// localStorage에서 가져 오기
            var list = todoController.getTodoFromLocalstorage('todoList');
            todoController.clearCompleted(list);
            todoController.setTodoLocalstorage(list);
            console.log("렌더링 시작합니다");
            todoController.renderTodo();

        });
    },
    /**
     * 프레젠테이션은 isDone이있는 모든 항목을 지 웁니다.
     * @param {array} list - get from localstorage
     */
    clearCompleted: function (list) {
        while (list.find(({isDone}) => isDone)) {
            list.splice(list.indexOf(list.find(({isDone}) => isDone)), 1);
        }
    },
    /**
     * 프리젠 테이션 세트 상태가 로컬 스토리지에 완료되었습니다.
     * @param {boolean} check - isDone from event checkall
     * @param {array} todoList - list array get from localStorage
     */
    checkAllTodo: function (check, todoList) {
        todoList = todoController.getTodoFromLocalstorage('todoList');
        for (var i = 0; i < todoList.length; i++) {
            todoList[i].isDone = check;
            todoController.setTodoLocalstorage(todoList);
        }
    },
    /**
     * 프리젠 테이션 세트 상태가 로컬 스토리지에 완료되었습니다.
     * @param {array} list - list array get from localStorage
     */
    renderTodo: function () {
        console.log("화면 시작");
//localStorage에서 가져 오기
        var list = todoController.getTodoFromLocalstorage('todoList');
        //여서 local 값 확인후 출력해주믄 됨.
        todoController.removeElement();
        var activeItem = document.getElementsByClassName('todoItem');
        // var todoList = todoController.getTodoFromLocalstorage('todoList');
        // var completeItem = document.getElementsByClassName('todoItem');

        let checkbutton = localStorage.getItem('todoButtonCheck');

        if (checkbutton == 'All') {
            for (var i = 0; i < list.length; i++) {
                var todoId = list[i].id;


                var element = todoController.todoView(list[i]);
                console.log("element 값 확인 : " + element);


                if (list[i].isDone) {
                    element.classList.add('checked');
                    $(`#${todoId}`).prop('checked', true);


                }
            }
        } else if (checkbutton == 'Active') {

            for (var i = 0; i < list.length; i++) {
                // console.log(todotodo[i]);
                // console.log("엑티브 아이템 " + activeItem[i]);

                // if (todoList[i].isDone === false) {
                //     activeItem[i].style.display = 'block';
                // } else {
                //     activeItem[i].style.display = 'none';
                // }

                for (var i = 0; i < list.length; i++) {
                    var todoId = list[i].id;


                    var element = todoController.todoView(list[i]);
                    console.log("element 값 확인 : " + element);


                    if (list[i].isDone) {
                        element.classList.add('checked');
                        $(`#${todoId}`).prop('checked', true);
                        activeItem[i].style.display = 'none';


                    }
                }
            }

        } else if (checkbutton == 'Completed') {


            for (var i = 0; i < list.length; i++) {
                var todoId = list[i].id;


                var element = todoController.todoView(list[i]);
                console.log("element 값 확인 : " + element);


                if (list[i].isDone === true) {
                    element.classList.add('checked');
                    $(`#${todoId}`).prop('checked', true);
                    activeItem[i].style.display = 'block';

                } else {
                    // element.classList.add('checked');
                    // $(`#${todoId}`).prop('checked', true);
                    activeItem[i].style.display = 'none';
                }
            }
        } else {
            for (var i = 0; i < list.length; i++) {
                var todoId = list[i].id;


                var element = todoController.todoView(list[i]);
                console.log("element 값 확인 : " + element);


                if (list[i].isDone) {
                    element.classList.add('checked');
                    $(`#${todoId}`).prop('checked', true);


                }
            }
        }

    },
    removeElement: function () {
        var todoListView = document.getElementById('todoListView');
        while (todoListView.hasChildNodes()) {
            todoListView.removeChild(todoListView.firstChild);
        }
    },
};

//선택한 클래스 변경
function changeClass(elem) {
    var a = document.getElementsByTagName('a');
    for (var i = 0; i < a.length; i++) {
        a[i].classList.remove('selected');
    }
    ;
//요소 사용자 클릭을 위해 선택된 클래스 추가
    elem.classList.add('selected');
};
//todoController는 모든 작업 추가, 삭제, 편집, 이벤트를 처리합니다.
var todoController = new TodoController();
//todo create new object todo
var todo = new Todo();
//행사 수행
todoController.events();
// //UI에 렌더링 할 일 표시 수행
todoController.renderTodo();
//모든 항목 활성 계산 수행
todoController.countItem();