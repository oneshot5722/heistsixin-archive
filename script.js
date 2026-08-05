/* ===================================
   HEISTSIXIN V3
=================================== */

document.addEventListener("DOMContentLoaded",()=>{

/* ===========================
   LOADER
=========================== */

const loader=document.getElementById("loader");

window.addEventListener("load",()=>{

setTimeout(()=>{

loader.style.opacity="0";

loader.style.visibility="hidden";

},2200);

});

/* ===========================
   CURSOR
=========================== */

const cursor=document.getElementById("cursor");

if(cursor){

document.addEventListener("mousemove",(e)=>{

cursor.style.left=e.clientX+"px";

cursor.style.top=e.clientY+"px";

});

}

/* ===========================
   SCROLL ANIMATION
=========================== */

const observer=new IntersectionObserver((entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("visible");

}

});

},{

threshold:.15

});

document.querySelectorAll(".section,.book-card,.featured-book").forEach(el=>{

el.classList.add("hidden-section");

observer.observe(el);

});

/* ===========================
   NAV SHADOW
=========================== */

window.addEventListener("scroll",()=>{

const nav=document.querySelector("nav");

if(window.scrollY>40){

nav.classList.add("nav-scrolled");

}else{

nav.classList.remove("nav-scrolled");

}

});

/* ===========================
   HERO PARALLAX
=========================== */

const hero=document.querySelector(".hero-gradient");

document.addEventListener("mousemove",(e)=>{

if(!hero)return;

const x=(e.clientX/window.innerWidth-.5)*30;

const y=(e.clientY/window.innerHeight-.5)*30;

hero.style.transform=`translate(${x}px,${y}px)`;

});

});
