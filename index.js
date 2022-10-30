// defining onload fucntion
onLoad();


let contentTypeJson = document.getElementById("contentTypeJson");
contentTypeJson.addEventListener('click', contentTypeJsonCallfn);

let contentTypeParameters = document.getElementById("contentTypeParameters");
contentTypeParameters.addEventListener("click", contentTypeParametersCallfn);



// function to show the json params & hide others
function contentTypeJsonCallfn(event) {
    let customParameterId = document.getElementById("customParameterId");
    let customJsonParameterId = document.getElementById("customJsonParameterId");
    let extraParams = document.getElementById("extraParams");

    // if content type is json so hide the custom Parameter
    customParameterId.style.display = "none";
    extraParams.style.display = "none";
    customJsonParameterId.style.display = "block";
}


// function to show the custom param & jide json
function contentTypeParametersCallfn(event) {
    let customParameterId = document.getElementById("customParameterId");
    let customJsonParameterId = document.getElementById("customJsonParameterId");
    let extraParams = document.getElementById("extraParams");

    // if content type is params so hide the custom Json Parameter
    customParameterId.style.display = "block";
    extraParams.style.display = "block";
    customJsonParameterId.style.display = "none";

}






function onLoad() {
    // get custom parameters
    let customParameterId = document.getElementById("customParameterId");
    // set customParameterId to display none because by default content type  is json
    customParameterId.style.display = "none";



}


let paramCounter = 2;
// adding more params via + button
customParameterId = document.getElementById("addParamBtn");
customParameterId.addEventListener("click", () => {
    html = `
            <div class="form-row my-3" id="customParameter">
                <label class="col-sm-2 col-form-label font-weight-bold">Parameter ${paramCounter}</label>
                <div class="col">
                    <input type="text" class="form-control customParamsKey" id="paramKey"+${paramCounter} placeholder="Param ${paramCounter} key">
                </div>
                <div class="col">
                    <input type="text" class="form-control customParamsValue" id="paramValue"+${paramCounter} placeholder="Param ${paramCounter} Value">
                </div>
                <button type="button" class="btn btn-primary deleteBtn">-</button>
            </div>
    
    `
    // append the counter
    paramCounter++;

    // convert the html str to Node
    let divNode = htmlToNode(html);

    // add element as child
    extraParams = document.getElementById("extraParams");
    extraParams.appendChild(divNode);

    // fucntion to delete the params
    deleteBtnFn();



})



// helper function to convert html str to node element
function htmlToNode(str) {
    let divE = document.createElement("div");
    divE.innerHTML = str;
    return divE.firstElementChild;
}


// helper function to delete the extra helper function
function deleteBtnFn() {
    let deleteBtn = document.getElementsByClassName("deleteBtn");
    for (btn of deleteBtn) {
        btn.addEventListener("click", function (e) {
            e.target.parentElement.remove();
            paramCounter = paramCounter - 1;
            // if all the extra params are removed so reset the counter 
            if (paramCounter < 3) {
                paramCounter = 2
            }
        })
    }
}




// adding event listner to hitapi button & attach fetch api logic
let hitButton = document.getElementById("hitButton");
hitButton.addEventListener("click", (e) => {

    // adding please wait to response area
    // document.getElementById("responseText").value = "Please Wait , We are Fetching data";
    document.getElementById("responseText").innerHTML = "Please Wait , We are Fetching data";

    // first get the URL
    let urlId = document.getElementById("urlId");

    // get the request type
    requestType = document.querySelector("input[name='requestType']:checked");

    contentType = document.querySelector("input[name='contentType']:checked");

    // define data based on contentType
    let data;

    if (requestType.value == "GET") {
        getMethodFn(urlId.value);
    }else{
        if(contentType.value=="Parameters"){
            data = getCustomParams();
            data = JSON.stringify(data);
            
            
        }else{
            data = document.getElementById("customJsonParameterText").value;
            
            
        }
        postMethodFn(urlId.value,data);
    }



})



// helper fucntion for get request
function getMethodFn(url) {

    fetch(url,
        {
            "method": "GET"
        }
    ).then((response) => {
        if (response.ok) {
            return response.text();
        } else {
            return "Some Error"
        }
    }).then((data) => {
        // document.getElementById("responseText").value = data;
        document.getElementById("responseText").innerHTML = data;
    })
}

// helper function for post request
function postMethodFn(url,data) {
    fetch(url, {
        method: 'POST',
        body: data,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
        .then((response) => response.text())
        .then((text) => {
            // document.getElementById("responseText").value = text;
            document.getElementById("responseText").innerHTML = text;
        }
        );
}


// helper fucntion for get custom params values
function getCustomParams(){
    let dict = {};
    let customParamsKeys = document.querySelectorAll(".customParamsKey");
    let customParamsValues = document.querySelectorAll(".customParamsValue");
    customParamsKeys.forEach((key, index) => {
        const val = customParamsValues[index];
        dict[key.value] = val.value;
      });

    return dict;
}



