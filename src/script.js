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

//change content
navCon.addEventListener("click", (e) => {
  const text = e.target.textContent;
  contents.innerHTML = "";
  const headHtml = `<h2 class="notes_heading">
  ${text}
</h2>`;
  const btnHtml = ` <button class="btn_add btn_addtsk">
<i class="fas fa-plus"></i>
Add Task
</button>`;
  contents.insertAdjacentHTML("afterbegin", headHtml);
  if (e.target.classList.contains("pj")) {
    contents.insertAdjacentHTML("beforeend", btnHtml);
    //add new task
    const newTaskBtn = document.querySelector(".btn_addtsk");

    newTaskBtn.addEventListener("click", () => {
      newTaskBtn.classList.add("hide");
      tskForm.classList.remove("hide");
    });
  }
});

//show form
addProj.addEventListener("click", () => {
  if (!addProj.classList.contains("hide")) {
    addProj.classList.add("hide");
    proForm.classList.remove("hide");
  }
});

//form submit
proForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const Pjname = pjNameIn.value;
  if (Pjname) {
    pjNameIn.value = "";
    addProj.classList.remove("hide");
    proForm.classList.add("hide");
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
  addProj.classList.remove("hide");
  proForm.classList.add("hide");
});
