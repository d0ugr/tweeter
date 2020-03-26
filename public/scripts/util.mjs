


const util = {

  escapeText: function(text) {

    let span = document.createElement("span");
    span.appendChild(document.createTextNode(text));
    return span.innerHTML;

  }

};



export default util;



