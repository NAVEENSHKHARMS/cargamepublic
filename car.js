// CREATING A HAMBURGER ICON  
let menu = document.getElementById("naveen")
menu.addEventListener('click',myFunction);

function myFunction() {
    var menus = document.getElementById("menu");
    
    if(menus.style.display == "block"){
        menus.style.display = "none";
    }else{
        menus.style.display = "block";
    }

    console.log("click hua")
}