window.addEventListener("load", loadcorrectpage);
document.getElementById("nav_presentation").addEventListener("click", presentation);
document.getElementById("nav_liste").addEventListener("click", liste);
document.getElementById("nav_message").addEventListener("click", message);
document.getElementById("hamburger").addEventListener("click", barre_nav);


/* Gestion d'un cookie nommé 'page' pour connaître la page qui s'affiche :
    Les valeurs possibles sont : 'presentation', 'liste' et 'message'   */
function loadcorrectpage()
{
    let page = getCookie("page");
    console.debug("cookie page : " + page);
    if(page == "liste")
    {
        liste();
    }
    else if(page == "message")
    {
        message();
    }
    else
    {
        presentation();
    }

}

function presentation() {
    console.debug("Presentation ! ");
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var reponse = xhttp.responseText;
            console.debug(reponse);
            var pagehtml = document.createElement( 'html' );
            pagehtml.innerHTML = reponse;
            var section = pagehtml.getElementsByTagName( 'section' );
            console.debug(section[0].innerHTML);
            document.getElementsByTagName("section")[0].innerHTML = section[0].innerHTML;
            document.getElementsByTagName("section")[0].id="presentation";
        }
    };
    xhttp.open("GET", "presentation.html", true);
    xhttp.send();
    setCookie("page","presentation",1); 

}

function liste() {
    console.debug("Liste ! ");
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var reponse = xhttp.responseText;
            console.debug(reponse);
            var pagehtml = document.createElement( 'html' );
            pagehtml.innerHTML = reponse;
            var section = pagehtml.getElementsByTagName( 'section' );
            console.debug(section[0].innerHTML);
            document.getElementsByTagName("section")[0].innerHTML = section[0].innerHTML;
            document.getElementsByTagName("section")[0].id="liste";
        }
    };
    xhttp.open("GET", "liste.html", true);
    xhttp.send();
    setCookie("page","liste",1); 

}

function message() {
    console.debug("Message ! ");
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var reponse = xhttp.responseText;
            console.debug(reponse);
            var pagehtml = document.createElement( 'html' );
            pagehtml.innerHTML = reponse;
            var section = pagehtml.getElementsByTagName( 'section' );
            console.debug(section[0].innerHTML);
            document.getElementsByTagName("section")[0].innerHTML = section[0].innerHTML;
            document.getElementsByTagName("section")[0].id="message";
        }
    };
    xhttp.open("GET", "message.html", true);
    xhttp.send();
    setCookie("page","message",1); 

}

function barre_nav() {
    var barre_nav = document.getElementById("barre_nav");
    if(barre_nav.style.display == "block")
    {
        barre_nav.style.display = "none";
    }
    else {
        barre_nav.style.display = "block";
    }
}



/* From w3school */
    /* La fonction setCookie
        Les paramètres :
            cname : nom du cookie
            cvalue : sa valeur
            exdays : le nombre de jour de sa durée de vie 
    */
function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }