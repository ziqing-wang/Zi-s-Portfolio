import * as model from './model.js';

const topSection = document.getElementById('top-section')
const allSections = document.querySelectorAll('section.container')
const navBurger = document.querySelector('.nav-burger')
const nav = document.getElementById('navbar')
const profileSection = document.getElementById('profile-section')
const navList = document.querySelector('ul.nav-links')
const navLinks = navList.querySelectorAll('.nav-link')
const srcolldownBtn = document.querySelector('.scrolldown')
const projectsContainer = document.querySelector('.projects')
const skillList = document.querySelector('.logos')

let hideNavLinks = false;

const loadProjects = (data) => {
    data.map(project => {
        const markup = `
        <div class="pictures-container">
            <img src="./src/images/projects/${project.img}" alt="${project.name}">
            <a href="${project.link}" target="blank">
                <div class="pictures-overlay">
                    <div class="overlay-text">
                        <h2>${project.name}</h2>
                        <p>${project.tools}</p>
                    </div>
                </div>
            </a>
        </div>
        `
        projectsContainer.insertAdjacentHTML('afterbegin', markup)
    })
}

const loadSkills = (skills) => {
    skills.map(skill => {
        const markup = `<li><img src="./src/images/skills/${skill.img}" alt="${skill.name}" title="${skill.name}"></li>`
        skillList.insertAdjacentHTML('afterbegin', markup)
    })
}

// Reveal sections
const revealSection = (entries, observer) => {
    const [entry] = entries
    if (!entry.isIntersecting) return
    entry.target.classList.remove('section--hidden')
    //only observer one single time
    observer.unobserve(entry.target)
}
const sectionObserver = new IntersectionObserver(revealSection, {
    root: null,
    threshold: 0.15
})
allSections.forEach(section => {
    sectionObserver.observe(section)
    section.classList.add('section--hidden')
})

// Reveal Navigation
const revealNav = (entries) => {
    const [entry] = entries
    if (entry.isIntersecting) nav.classList.remove('fixed-top')
    else nav.classList.add('fixed-top')
}
const navObserver = new IntersectionObserver(revealNav, {
    root: null,
    threshold: 0.15
})
navObserver.observe(srcolldownBtn)


// Handle srolldown button click
const controlNav = () => {
    // Position navigation
    const navHeight = navList.getBoundingClientRect().height
    nav.style.bottom = `-${navHeight}px`

    // Add click event to navBtn
    srcolldownBtn.addEventListener('click', function () {
        //1. Hidden arrow button
        this.classList.toggle('hidden')

        //2. Navbar's 'position' change to 'fixed', add some 'top'
        navList.classList.toggle('fixed-top')
    })

    // Active link
    navList.addEventListener('click', (e) => {
        const link = e.target.closest('li.nav-link')
        if (!link) return
        navLinks.forEach(l => l.classList.remove('active'))
        link.classList.add('active')
    })
}


const init = () => {
    controlNav()
    loadProjects(model.state.projects)
    loadSkills(model.state.skills)
}
init()