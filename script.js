document.addEventListener("DOMContentLoaded",()=>{const $=s=>document.querySelector(s), $$=s=>document.querySelectorAll(s);
const nav=$("#navLinks"),menu=$("#menuBtn"),theme=$("#themeBtn"),modal=$("#projectModal");
$("#year").textContent=new Date().getFullYear();

menu.addEventListener("click",()=>{nav.classList.toggle("open");menu.textContent=nav.classList.contains("open")?"×":"☰"});
nav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{nav.classList.remove("open");menu.textContent="☰"}));

if(localStorage.getItem("shreya-theme")==="dark"){document.body.classList.add("dark");theme.textContent="☾"}
theme.addEventListener("click",()=>{document.body.classList.toggle("dark");const dark=document.body.classList.contains("dark");localStorage.setItem("shreya-theme",dark?"dark":"light");theme.textContent=dark?"☾":"☼"});

$$(".filter").forEach(btn=>btn.addEventListener("click",()=>{$$(".filter").forEach(b=>b.classList.remove("active"));btn.classList.add("active");const f=btn.dataset.filter;$$(".project").forEach(card=>{card.style.display=f==="all"||card.dataset.category===f?"":"none"})}));
/* =========================================
   PROJECT VIEWER
========================================= */

const openModal = card => {

    const title = card.dataset.title;
    const type = card.dataset.type;
    const description = card.dataset.description;

    $("#modalTitle").textContent = title;
    $("#modalType").textContent = "PROJECT · " + type.toUpperCase();
    $("#modalDescription").textContent = description;

    /* Get project image */
    const image = card.querySelector("img");

    let modalImage = $("#modalProjectImage");

    if (image) {

        if (!modalImage) {

            modalImage = document.createElement("img");

            modalImage.id = "modalProjectImage";
            modalImage.alt = title;

            $(".modal-box").insertBefore(
                modalImage,
                $("#modalTitle")
            );
        }

        modalImage.src = image.src;
        modalImage.alt = image.alt || title;

        modalImage.style.display = "block";

    } else if (modalImage) {

        modalImage.style.display = "none";

    }

    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");

    document.body.style.overflow = "hidden";
};
const closeModal=()=>{modal.classList.remove("open");modal.setAttribute("aria-hidden","true");document.body.style.overflow=""};
$$(".project").forEach(card=>card.addEventListener("click",()=>openModal(card)));
$("#modalClose").addEventListener("click",closeModal);$("#modalBg").addEventListener("click",closeModal);document.addEventListener("keydown",e=>{if(e.key==="Escape")closeModal()});

const sections=$$("section[id]"),links=$$("nav a");const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)links.forEach(a=>a.classList.toggle("current",a.getAttribute("href")==="#"+e.target.id))}),{rootMargin:"-35% 0px -55% 0px"});sections.forEach(s=>observer.observe(s));
});
/* =========================================
   CREATIVE CONTACT FORM
========================================= */

const projectOptions = document.querySelectorAll(".project-option");
const projectTypeInput = document.getElementById("projectType");

projectOptions.forEach(option => {

    option.addEventListener("click", () => {

        projectOptions.forEach(item => {
            item.classList.remove("selected");
        });

        option.classList.add("selected");

        projectTypeInput.value = option.dataset.value;

    });

});


const creativeForm = document.getElementById("creativeForm");
const formSuccess = document.getElementById("formSuccess");

creativeForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !message) {
        alert("Please fill in your name, email and project idea.");
        return;
    }

    formSuccess.classList.add("show");

    creativeForm.reset();

    projectOptions.forEach(option => {
        option.classList.remove("selected");
    });

    projectTypeInput.value = "";

});
/* =========================================
   SCROLL REVEAL
========================================= */

const revealElements = document.querySelectorAll(
    ".section, .project, .service-list > div, .process-item, .contact-heading, .creative-form"
);

revealElements.forEach(element => {
    element.classList.add("reveal");
});

const revealObserver = new IntersectionObserver(
    (entries, observer) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {
                entry.target.classList.add("show");
                observer.unobserve(entry.target);
            }

        });

    },
    {
        threshold: 0.12
    }
);

revealElements.forEach(element => {
    revealObserver.observe(element);
});
/* =========================================
   CUSTOM CREATIVE CURSOR
========================================= */

const customCursor = document.getElementById("customCursor");

if (customCursor) {

    document.addEventListener("mousemove", (event) => {

        customCursor.style.left = event.clientX + "px";
        customCursor.style.top = event.clientY + "px";

    });


    /* Project hover */

    document.querySelectorAll(".project").forEach(project => {

        project.addEventListener("mouseenter", () => {

            customCursor.classList.add("project-hover");

            customCursor.classList.remove("button-hover");

            customCursor.querySelector("span").textContent = "VIEW";

        });

        project.addEventListener("mouseleave", () => {

            customCursor.classList.remove("project-hover");

        });

    });


    /* Button hover */

    document.querySelectorAll(
        "button, .button, .contact-button, .send-idea"
    ).forEach(button => {

        button.addEventListener("mouseenter", () => {

            customCursor.classList.add("button-hover");

            customCursor.classList.remove("project-hover");

            customCursor.querySelector("span").textContent = "GO";

        });

        button.addEventListener("mouseleave", () => {

            customCursor.classList.remove("button-hover");

        });

    });

}