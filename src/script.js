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
let NotesTodo = [];

///functions

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
////////////////////////////////////////////////////////////

//change content
navCon.addEventListener("click", (e) => {
  tskCon.innerHTML = "";
  NotesTodo.splice(0, NotesTodo.length);

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

    const storedData = JSON.parse(localStorage.getItem(text));

    if (storedData) {
      for (let i = 0; i < storedData.length; i++) {
        const storedNote = storedData[i];
        const ele = tskHtmlCreate(storedNote.noteName, storedNote.noteDate);
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
let noteId = 1;
newTaskBtn.addEventListener("click", () => {
  hideNshow(newTaskBtn, tskForm);

  ////manage new task form
  tskForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let tskName = tskInput.value;
    tskInput.value = "";
    if (tskName) {
      hideNshow(tskForm, newTaskBtn);

      //Date
      let times = createDate();
      ///Html

      const tskHtml = tskHtmlCreate(tskName, times, noteId);

      tskCon.insertAdjacentHTML("beforeend", tskHtml);

      noteId++;
      //Create obj of notes data

      let data = {
        noteName: tskName,
        noteDate: times,
        id: noteId,
      };

      tskName = times = "";

      //store data in local storage
      NotesTodo.push(data);
      const noteBox = tskCon.previousElementSibling.textContent.trim();
      console.log(noteBox);

      // localStorage.setItem(noteBox, JSON.stringify(NotesTodo));

      // console.log(NotesTodo);
    }
  });
});

//show form
addProj.addEventListener("click", () => {
  if (!addProj.classList.contains("hide")) {
    hideNshow(addProj, proForm);
  }
});

//form submit
proForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const Pjname = pjNameIn.value;
  if (Pjname) {
    pjNameIn.value = "";
    hideNshow(proForm, addProj);
    //
    const html = `<button class="project pj">
    <i class="fas fa-list-check"></i>
    ${Pjname}
   </button>`;
    pjCon.insertAdjacentHTML("beforeend", html);
  }
});

//form cancel
pjCancel.addEventListener("click", () => {
  hideNshow(proForm, addProj);
});

//
// const obj = {
//   firstName: "john",
//   age: "24",
// };

// localStorage.clear();

////Load Stored data
// window.addEventListener("load", () => {

// });
// datas = JSON.parse(localStorage.getItem("notes"));
// // console.log(datas);
// for (let i = 0; i < datas.length; i++) {
//   const storedNote = datas[i];
//   const ele = tskHtmlCreate(storedNote.noteName, storedNote.noteDate);
//   tskCon.insertAdjacentHTML("beforeend", ele);
// }

// localStorage.clear();
