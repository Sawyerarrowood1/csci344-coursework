let searchTerm = "";
let openOnly = false;

function isClassFull(c) {
    return !c.Classification.Open;
}

function doesTermMatch(c) {
    if (!searchTerm) return true;

    let t = searchTerm.toLowerCase();

    return (
        c.Code.toLowerCase().includes(t) ||
        c.Title.toLowerCase().includes(t) ||
        c.CRN.toString().includes(t) ||
        c.Instructors.map(i => i.Name).join(" ").toLowerCase().includes(t)
    );
}

function dataToHTML(c) {
    let open = c.Classification.Open;
    let seats = c.EnrollmentMax - c.EnrollmentCurrent;

    return `
    <section class="course-card">
        <h2>${c.Code}: ${c.Title}</h2>
        <p class="status ${open ? "open" : "closed"}">
            <i class="fa-solid ${open ? "fa-circle-check" : "fa-circle-xmark"}"></i>
            ${open ? "Open" : "Closed"} &bull; ${c.CRN} &bull; ${
                open ? `Seats Available: ${seats}` : `Number on Waitlist ${c.WaitlistAvailable}`
            }
        </p>
        <p>${c.Days || "TBA"} &bull; ${c.Location.FullLocation || "TBA"} &bull; ${c.Hours} credit hour(s)</p>
        <p><strong>${c.Instructors.map(i => i.Name).join(", ")}</strong></p>
    </section>`;
}

function showMatchingCourses() {
    let box = document.querySelector(".courses");
    box.innerHTML = "";

    let results = courseList.filter(c =>
        doesTermMatch(c) && (!openOnly || !isClassFull(c))
    );

    if (!results.length) return box.innerHTML = "<p>No courses match your search.</p>";

    results.forEach(c => box.insertAdjacentHTML("beforeend", dataToHTML(c)));
}

function filterCourses() {
    searchTerm = document.getElementById("search_term").value;
    openOnly = document.getElementById("is_open").checked;
    showMatchingCourses();
}

showMatchingCourses();