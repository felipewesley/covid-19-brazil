
function setGraphModel(type = "normal") {
    
    let w = window.innerWidth;
    
    if (w <= 750) {
        return document.getElementById('link_contamincacao').href = "./covid19graph_s.html";
    }
    return document.getElementById('link_contamincacao').href = "./covid19graph.html";
}

function changeNewGraph(){

    let url = window.location.href; 

    if (url.indexOf("_s") != -1) {
        return window.location.replace("./covid19graph.html")
    }
    return window.location.replace("./covid19graph_s.html")
}