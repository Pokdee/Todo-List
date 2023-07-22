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
let newTaskBtn;

//////////
///projects notes store
const NotesTodo = [];

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

const tskHtmlCreate = function (name, date) {
  return `<li class="projects_li">
  <input class="check_in" type="checkbox" name="" id="note" />
  <label class="check_lb" for="note">${name}</label>
  <span class="date">${date.day}/${date.month}/${date.year}</span>
  <div class="delete_btn">
    <i class="fas fa-multiply"></i>
  </div>
  </li>`;
};
////

//change content
navCon.addEventListener("click", (e) => {
  ///navigate accross navigation
  const text = e.target.textContent;
  // contents.innerHTML = "";
  if (e.target.classList.contains("project")) {
    const headHtml = `<h2 class="notes_heading">${text}</h2>`;
    const btnHtml = ` <button class="btn_add btn_addtsk">
    <i class="fas fa-plus"></i>
    Add Task
   </button>`;
    contents.insertAdjacentHTML("afterbegin", headHtml);

    /////act according to project section
    if (e.target.classList.contains("pj")) {
      contents.insertAdjacentHTML("beforeend", btnHtml);

      //select new task btn
      newTaskBtn = document.querySelector(".btn_addtsk");
    }
  }

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

        //Date
        let times = createDate();
        ///Html

        const tskHtml = tskHtmlCreate(tskName, times);

        tskCon.insertAdjacentHTML("afterbegin", tskHtml);

        //Create obj of notes data

        let data = {
          noteName: tskName,
          noteDate: times,
        };

        tskName = times = "";

        //store data in local storage
        NotesTodo.push(data);
        // localStorage.setItem("notes", JSON.stringify(NotesTodo));

        // console.log(NotesTodo);
      }
    });
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

datas = JSON.parse(localStorage.getItem("notes"));
console.log(datas);
for (let i = 0; i < datas.length; i++) {
  const ele = tskHtmlCreate(i.noteName, i.noteDate);
  tskCon.insertAdjacentHTML("beforeend", ele);
}
