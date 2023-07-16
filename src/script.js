const navCon = document.querySelector(".nav_n_proj");
const notesHead = document.querySelector(".notes_heading");
const addProj = document.querySelector(".btn_add");
const proForm = document.querySelector(".form");
const pjNameIn = document.querySelector(".form_input");
const pjAdd = document.querySelector(".btn_add");
const pjCancel = document.querySelector(".btn_cancel");
const pjCon = document.querySelector(".projects_con");

//change content
navCon.addEventListener("click", (e) => {
  if (e.target.classList.contains("project")) {
    const text = e.target.textContent;
    notesHead.textContent = text;
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
    const html = `<button class="project">
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
