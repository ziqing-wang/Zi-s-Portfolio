window.addEventListener('scroll', addSlideUp);

function addSlideUp() {
    let profile = document.getElementById("profile-section");
    let ability = document.getElementById("abilities-section");

    //y is the pixel value that the document has scrolled from the top.
    let y = window.pageYOffset; // or scrollY

    let profileRect = profile.getBoundingClientRect().top;
    let ableRect = ability.getBoundingClientRect().top;

    //
    if (y >= profileRect/2) {
        profile.classList.add("slide-up");
    } else {
        profile.classList.remove("slide-up");
    }
    if (y >= ableRect) {
        ability.classList.add("slide-up");
    } else {
        ability.classList.remove("slide-up");
    }

}