function $(id){
    return document.querySelector(id)
}

function reset(id, class_name){
    $(class_name).classList.add('hidden')
    $(id).textContent = ''
    $("#btn").removeAttribute("disabled")
    $("#btn").classList.remove("cursor-wait")
    $("#btn").classList.add("cursor-pointer")
}



$('#form').addEventListener('submit', (e)=>{
    
    e.preventDefault()
    $("#btn").setAttribute("disabled", true)
    $("#btn").classList.remove("cursor-pointer")
    $("#btn").classList.add("cursor-wait")

    const data = {
        name: $('#name').value,
        mail: $('#mail').value,
        subject: $('#subject').value,
        message: $('#body').value,
    }

    fetch('/contact', {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {

            if (data.status === '200') {
                $('.success').classList.remove('hidden')
                $('#success').textContent = data.message
                setTimeout(() => {
                    reset("#success", ".success")
                    $("#form").reset()
                }, 3000)
              
            } else {
                
                
                
              $('.fail').classList.remove('hidden')
              $('#fail').textContent = data.message
              
              function error(value){
                const span = document.createElement("span")
                span.classList.add("text-center", "block")
                span.textContent = value
                $("#fail").appendChild(span)
                }
              data.body.forEach( item => {
                    error(item.msg)
                })
              setTimeout(() => {
                    reset("#fail", ".fail")
              }, 10000)
              
            }
            console.log("data pack:", data)
        })
})

