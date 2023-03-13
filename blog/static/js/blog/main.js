// Set lnurl address
const lnurl = 'suidoc@getalby.com'

async function zap() {
    // const lnurl = (provided by your application backend)
    try {

        await webln.enable();
        const result = await webln.lnurl(lnurl); // promise resolves once the LNURL process is finished (e.g. a payment is sent or the login is complete)
        //console.log(result)
        // Total amount
        //console.log(result.route.total_amt)
        return result;
    }
    catch(e) {
        /*if(e == "Error: User rejected") {
            console.log("User cancelled payment")
        } else if (e == "Error: Prompt was closed") {
            console.log("User closed the prompt.")
        } else if (e == "ReferenceError: webln is not defined"){
            console.log("WebLN is not supported.")
        } else {
            console.log(e);
            document.getElementById("lnError").showModal();
        };*/
        document.getElementById("lnError").showModal();
        return(e);
    }
}

function lnErrorClose() {
    document.getElementById("lnError").close();
}

async function recordZap(post_id) {
    var request = new XMLHttpRequest();
    request.open('POST', '/' + post_id + '/zap/', true);
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    zapResult = await zap();
    console.log(zapResult);
    request.send('zap=' + zapResult.route.total_amt);

}

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}