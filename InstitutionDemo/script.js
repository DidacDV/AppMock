//global variables - html elements
const activities = [];
let act_counter = 0;
// -
const activity_container = document.querySelector(".activity-container");
const new_activity_button = document.querySelector(".new-activity");
const new_activity_dialog = document.querySelector("#activity-dialog")
const cancel_btn = document.querySelector(".cancel-btn")
const activity_form = document.querySelector("#activity-form");
const draw_back_arrow = document.querySelector(".draw-back-arrow");


const activity_card_footer_html = `
    <div class="activity-card-footer">
        <button class="activity-card-expansion">Get into {ActivityName}</button>
        <svg class="star" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
        </svg>
    </div>
`;

function Activity(title,description){
    this.title = title;
    if (description.length > 200) throw new Error("Description too long");
    else this.description = description;
}

function createActivity() {
    new_activity_dialog.showModal();
}

//closing button
cancel_btn.addEventListener("click", (e) => {
    e.preventDefault();
    new_activity_dialog.close();
})

draw_back_arrow.addEventListener("click",(e) => {
    e.preventDefault();
    new_activity_dialog.close();
})

//if a new activity is added, go to the array and display it with the counter
function display_new_activity() {
    let activity = activities[act_counter];
    ++act_counter;

    const activity_card = document.createElement("div");
    activity_card.classList.add("activity-card");

    activity_card.innerHTML = `
        <h2>${activity.title}</h2>
        <p>${activity.description}</p>
    `;

    const activity_card_footer = document.createElement("div");
    activity_card_footer.innerHTML = activity_card_footer_html;
    activity_card.appendChild(activity_card_footer);
    activity_container.appendChild(activity_card);
}

//create new activity and put it in the array of activities
activity_form.addEventListener("submit", (e)=> {
    e.preventDefault();
    const title = document.querySelector("#title");
    const desc = document.querySelector("#description");
    try {
        const temp_act = new Activity(title.value,desc.value);
        activities.push(temp_act);
        //clean all up
        activity_form.reset();
        new_activity_dialog.close();
        display_new_activity();
    } catch(error) {
        alert(error.message);
    }
});

new_activity_button.addEventListener("click",createActivity);