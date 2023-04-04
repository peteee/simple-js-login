/**
 * Protect with login | login data in localStorage only accessible on same domain & on a webserver!
 * 
 *       __.-._
 *      '-._"7'
 *       /'.-c
 *       |  /T
 *  snd _)_/LI
 * 
 */
const contentContainer = document.querySelector('#content');
if(localStorage.getItem("logged-in") === "true") {
    let uName = localStorage.getItem("name");
    contentContainer.innerHTML = `<div>
        <h2>Welcome ${uName}<h2>
        <img src="img/woman-gf7effa2cf_1920.jpg" alt="">
    </div>`;
} else {
    contentContainer.innerHTML = `<p>Sorry, log in <a href="./index.html">here</a> first...</p>`;
}