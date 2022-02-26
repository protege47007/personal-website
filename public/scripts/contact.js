function $(id){
    return document.querySelector(id);
}

$('#form').addEventListener('submit', (e)=>{
    e.preventDefault();

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
                alert('successful')
            } else {
                alert('failed');
            }
            console.log(data)
        });
})