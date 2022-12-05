// active nav styling

window.onload = (event) =>{
    // const path = /\w+/.exec(location.pathname);
    document.querySelectorAll(".nav").forEach((n, i) => {
        if(location.pathname === n.getAttribute('href')){
            
            n.querySelector("li").classList.remove("border-black")
            n.querySelector("li").classList.add("text-white", "border-white")
        } 
    })
  }