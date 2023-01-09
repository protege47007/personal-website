function $(id){
    return document.querySelector(id)
}

const post_route = "/dashboard/resume/xps/?_method=POST"
const update_route = "/dashboard/resume/xps/?_method=PATCH"
const delete_route = "/dashboard/resume/xps/?_method=DELETE"
const post = $("#position")
const com = $("#company")
const s_date = $("#start_date")
const e_date = $("#end_date")
const resp = $("#resp")
const edit = $("#edit_pane")




resp.addEventListener("keypress", function(event) {
    
    if (event.key === "Enter") {
        event.preventDefault()

        // new responsibility element
        const p = document.createElement("p")
        // if you need to add a class to the element
        // p.classList.add("")

        const new_resp = resp.value
        p.textContent = new_resp
        edit.appendChild(p)

    }
})

function clicked(action){
    switch (action) {
        case "add":
            
            break;
        
        case "update":

            break;

        case "delete":

            break;

        default:
            break;
    }
}

function preview(params) {
    
}

function send_data(data, route, method){
    fetch(route, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    }).then(response => response.json())
    .then(parsed_data => {})
}