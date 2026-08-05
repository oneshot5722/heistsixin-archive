// ==========================================
// HEISTSIXIN ARCHIVE V2.6
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    /* -------------------------
       CUSTOM CURSOR
    ------------------------- */

    const cursor = document.getElementById("cursor");

    document.addEventListener("mousemove", (e) => {

        if (!cursor) return;

        cursor.style.left = e.clientX + "px";
        cursor.style.top = e.clientY + "px";

    });

    const hoverTargets = document.querySelectorAll(
        "a, button, .book"
    );

    hoverTargets.forEach(item => {

        item.addEventListener("mouseenter", () => {

            cursor.style.width = "36px";
            cursor.style.height = "36px";
            cursor.style.borderColor = "#d6b06b";

        });

        item.addEventListener("mouseleave", () => {

            cursor.style.width = "18px";
            cursor.style.height = "18px";

        });

    });

    /* -------------------------
       SCROLL REVEAL
    ------------------------- */

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

            }

        });

    }, {

        threshold:0.15

    });

    document.querySelectorAll(

        ".section,.book,blockquote"

    ).forEach(el=>{

        observer.observe(el);

    });

    /* -------------------------
       BOOK CARD TILT
    ------------------------- */

    document.querySelectorAll(".book").forEach(card=>{

        card.addEventListener("mousemove",(e)=>{

            const rect=card.getBoundingClientRect();

            const x=e.clientX-rect.left;

            const y=e.clientY-rect.top;

            const rotateY=(x-rect.width/2)/18;

            const rotateX=-(y-rect.height/2)/18;

            card.style.transform=

            `perspective(900px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)
             translateY(-8px)`;

        });

        card.addEventListener("mouseleave",()=>{

            card.style.transform="";

        });

    });

    /* -------------------------
       SMOOTH NAV SHADOW
    ------------------------- */

    const nav=document.querySelector("nav");

    window.addEventListener("scroll",()=>{

        if(window.scrollY>50){

            nav.style.background="rgba(4,4,4,.85)";
            nav.style.boxShadow="0 10px 40px rgba(0,0,0,.4)";

        }

        else{

            nav.style.background="rgba(4,4,4,.45)";
            nav.style.boxShadow="none";

        }

    });

    console.log("HEISTSIXIN V2.6");

});
