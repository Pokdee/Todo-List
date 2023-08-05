const navCon = document.querySelector(".nav_n_proj");
const notesHead = document.querySelector(".notes_heading");
const addProj = document.querySelector(".btn_add");
const proForm = document.querySelector(".form");
const pjNameIn = document.querySelector(".form_input");
const pjAdd = document.querySelector(".btn_add");
const pjCancel = document.querySelector(".btn_cancel");
const pjCon = document.querySelector(".projects_con");
const contents = document.querySelector(".projects");
const tskForm = document.querySelector(".form_tsk");
const tskInput = document.querySelector(".addtask_input");
const addTask = document.querySelector(".add_tsk");
const cancelTask = document.querySelector(".cancel_tsk");
const tskCon = document.querySelector(".projects_ul");
const heading = document.querySelector(".notes_heading");
const newTaskBtn = document.querySelector(".btn_addtsk");

//////////
///projects notes store
let tskToDo = [];
let projects = [];

///functions//////

const hideNshow = function (hide, show) {
  hide.classList.add("hide");
  show.classList.remove("hide");
};

const createDate = function () {
  const d = new Date();
  return {
    day: d.getDate(),
    month: d.getMonth(),
    year: d.getFullYear(),
  };
};

const tskHtmlCreate = function (name, date, id) {
  return `<li class="projects_li" id = ${id} >
  <input class="check_in" type="checkbox" name="" id="note" />
  <label class="check_lb" for="note">${name}</label>
  <span class="date">${date.day}/${date.month}/${date.year}</span>
  <div class="delete_btn">
    <i class="fas fa-multiply"></i>
  </div>
  </li>`;
};

const existedTskCheck = function (taskName, CheckingArray) {
  const tskExist = CheckingArray.find((obj) => obj.noteName === taskName)
    ? true
    : false;
  if (tskExist) {
    return true;
  }
};
////////////////////////////////////////////////////////////

//change content
navCon.addEventListener("click", (e) => {
  tskCon.innerHTML = "";
  tskToDo.splice(0, tskToDo.length);

  let navContents = document.querySelectorAll(".project");
  navContents.forEach((el) => {
    if (el.classList.contains("selected")) {
      el.classList.remove("selected");
    }
  });
  ///navigate accross navigation
  const text = e.target.textContent.trim();

  // contents.innerHTML = "";
  if (e.target.classList.contains("project")) {
    e.target.classList.add("selected");
    heading.textContent = text;

    ///load if stored data exist
    const storedData = JSON.parse(localStorage.getItem(text));

    if (storedData && storedData.length !== 0) {
      for (let i = 0; i < storedData.length; i++) {
        const storedNote = storedData[i];
        const ele = tskHtmlCreate(
          storedNote.noteName,
          storedNote.noteDate,
          storedNote.id
        );
        tskCon.insertAdjacentHTML("beforeend", ele);
      }
    }
    /////act according to project section
    if (!e.target.classList.contains("pj")) {
      newTaskBtn.classList.add("hide");
    } else {
      newTaskBtn.classList.remove("hide");
    }
  }
});

////show new task form

newTaskBtn.addEventListener("click", () => {
  hideNshow(newTaskBtn, tskForm);

  ////manage new task form
  tskForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let tskName = tskInput.value;
    tskInput.value = "";
    if (tskName) {
      hideNshow(tskForm, newTaskBtn);

      const noteId = tskName.split(" ").pop();
      //Date
      let times = createDate();
      ///Html
      const tskHtml = tskHtmlCreate(tskName, times, noteId);

      //Create obj of notes data

      let data = {
        noteName: tskName,
        noteDate: times,
        id: noteId,
      };

      // tskName = times = "";

      //store data in local storage
      const noteBox = tskCon.previousElementSibling.textContent.trim();
      const storedData = JSON.parse(localStorage.getItem(noteBox));

      //updating old data to stored with new data

      if (storedData && storedData.length !== 0) {
        ////

        ////

        //Check if tsk already exist in stored data
        if (existedTskCheck(tskName, storedData)) {
          alert("Task Name Cannot be duplicate");
          return;
        }

        //Check if tsk added alredy
        if (existedTskCheck(tskName, tskToDo)) {
          alert("Task Name Cannot be duplicate");
          return;
        }

        //Check if stored notes exist in tskTodo
        if (tskToDo.length !== 0) {
          for (let i = 0; i < storedData.length; i++) {
            const storedObj = storedData[i];

            const notesCheck = tskToDo.find((obj) => obj.id === storedObj.id);

            const valueExist = notesCheck ? true : false;
            if (!valueExist) {
              tskToDo.push(storedObj);
            }
          }
        } else {
          storedData.forEach((obj) => tskToDo.push(obj));
        }
      }

      //add html

      tskCon.insertAdjacentHTML("beforeend", tskHtml);

      tskToDo.push(data);

      //value not updating because its not adding new value but completely replacing
      //old value so #fix it
      localStorage.setItem(noteBox, JSON.stringify(tskToDo));
    }
  });
});

//Cancel task form

cancelTask.addEventListener("click", () => {
  hideNshow(tskForm, newTaskBtn);
  tskInput.value = "";
});

//show form
addProj.addEventListener("click", () => {
  if (!addProj.classList.contains("hide")) {
    hideNshow(addProj, proForm);
  }
});

///Delete Projects

pjCon.addEventListener("click", (e) => {
  if (e.target.classList.contains("fa-xmark")) {
    const delEle = e.target.closest(".project_con");
    const xmarkParent = e.target.closest(".xmark-icon");
    const delEleName = xmarkParent.previousElementSibling.textContent.trim();
    const storedKey = delEleName.split(" ").pop();
    const storedProjects = JSON.parse(localStorage.getItem("projects"));

    const updateProjects = storedProjects.filter(
      (names) => names !== delEleName
    );
    console.log(updateProjects);
    localStorage.removeItem(storedKey);
    delEle.remove();
    localStorage.setItem("projects", updateProjects);
  }
});

//////////////////////////////////////////////////////////

window.addEventListener("load", () => {
  ///Load stored Projects
  // const storedProjects = JSON.parse(localStorage.getItem("projects"));
  // storedProjects.forEach((pJname) => {
  //   const html = `<div class="project_con">
  //   <button class="project pj" id-text="${pJname}">
  //     <i class="fas fa-list-check"></i>
  //     ${pJname}
  //   </button>
  //   <span class="xmark-icon"> <i class="fas fa-xmark"></i> </span>
  // </div>`;
  //   pjCon.insertAdjacentHTML("beforeend", html);
  // });
});

/////////////////////////////////////////////////////////

//form submit
proForm.addEventListener("submit", (e) => {
  e.preventDefault();

  //Create Project Tab
  const Pjname = pjNameIn.value;
  if (Pjname) {
    projects.push(Pjname);
    pjNameIn.value = "";
    hideNshow(proForm, addProj);
    //
    const html = `<div class="project_con">
    <button class="project pj" id-text="${Pjname}">
      <i class="fas fa-list-check"></i>
      ${Pjname}
    </button>
    <span class="xmark-icon"> <i class="fas fa-xmark"></i> </span>
  </div>`;
    pjCon.insertAdjacentHTML("beforeend", html);
  }
  ///Stored Projects Tag Name
  localStorage.setItem("projects", JSON.stringify(projects));
});

//form cancel
pjCancel.addEventListener("click", () => {
  hideNshow(proForm, addProj);
});

/////////////////////////////////////
////Delete note
tskCon.addEventListener("click", (e) => {
  if (e.target.closest(".delete_btn")) {
    const ele = e.target.closest(".projects_li");
    const eleid = ele.getAttribute("id");

    const notesEles = Array.from(tskCon.querySelectorAll(".projects_li"));
    // const eleIndex = notesEles.findIndex(
    //   (el) => el.getAttribute("id") === eleid
    // );

    const eleParent = ele.closest(".projects_ul");
    const storedKey = eleParent.previousElementSibling.textContent;
    const storedData = JSON.parse(localStorage.getItem(storedKey));

    ////remove from storage

    const updatedData = storedData.filter((obj) => obj.id !== eleid);
    if (updatedData.length !== 0) {
      localStorage.setItem(storedKey, JSON.stringify(updatedData));
    } else {
      localStorage.removeItem(storedKey);
    }

    ///remove from DOM

    const deleteEle = document.getElementById(`${eleid}`);
    deleteEle.remove();
  }
});

//

// localStorage.clear();
