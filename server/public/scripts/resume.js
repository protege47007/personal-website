// <script>let myVar = <%- JSON.stringify(myVar) %>;</script>
// stringify the data passed from router to ejs (within the EJS template only)
function $(id){
    return document.querySelector(id)
}
const img = $("#preview_img")
const txt = $("#preview_text")
const search = $("#search_term")

function preview(image_url, title){
    img.setAttribute("src", `/image/${image_url}`)
    txt.setAttribute("value", title)
    search.setAttribute("value", image_url)
}

