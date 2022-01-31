// Current year for copyright
let yearEle = document.querySelector(".year");
let currentYear = new Date().getFullYear();
yearEle.textContent = currentYear;

// Making mobile nav work
let headerEle = document.querySelector(".header");
let mobileNav = document.querySelector(".wrapped-menu");
let mainNavLink = document.querySelector(".main-nav-link");

// toggle nav

mobileNav.addEventListener("click", function () {
  headerEle.classList.toggle("nav-open");
});

// Smooth scroll animation

let allLinks = document.querySelectorAll("a:link");

allLinks.forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    let href = link.getAttribute("href");
    if (href == "#") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } else {
      let sectionEle = document.querySelector(href);
      sectionEle.scrollIntoView({ behavior: "smooth" });
    }

    // close nav in mobile view on click of menu item

    if (link.classList.contains("main-nav-link")) {
      headerEle.classList.remove("nav-open");
    }
  });
});

// Sticky nav

let sectionHeroEle = document.querySelector(".section-hero");

let obs = new IntersectionObserver(
  function (entries) {
    let entry = entries[0];

    // add sticky
    if (entry.isIntersecting == false) {
      document.body.classList.add("sticky");
    }

    // remove sticky
    if (entry.isIntersecting) {
      document.body.classList.remove("sticky");
    }
  },
  {
    // null means in the viewport
    root: null,
    threshold: 0,
    rootMargin: "-80px",
  }
);

obs.observe(sectionHeroEle);

///////////////////////////////////////////////////////////
// Fixing flexbox gap property missing in some Safari versions
function checkFlexGap() {
  var flex = document.createElement("div");
  flex.style.display = "flex";
  flex.style.flexDirection = "column";
  flex.style.rowGap = "1px";

  flex.appendChild(document.createElement("div"));
  flex.appendChild(document.createElement("div"));

  document.body.appendChild(flex);
  var isSupported = flex.scrollHeight === 1;
  flex.parentNode.removeChild(flex);
  console.log(isSupported);

  if (!isSupported) document.body.classList.add("no-flexbox-gap");
}
checkFlexGap();
