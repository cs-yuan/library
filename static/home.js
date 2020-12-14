function create_list(){
        div1 = document.createElement("div");
        div1.className = "col-md-6";
        div2 = document.createElement("div");
        div2.className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative"
        div1.appendChild(div2);
        div3_1 = document.createElement("div");
        div3_1.className = "col p-4 d-flex flex-column position-static"; //////
        strong1 = document.createElement("strong");
        strong1.className = "d-inline-block mb-2 text-primary";
        strong1.innerText = "World";
        h1 = document.createElement('h3');
        h1.className = "mb-0";
        h1.innerText ="Featured post";
        div3_1_1 = document.createElement("div");
        div3_1_1.className = "mb-1 text-muted";
        div3_1_1.innerText = "Nov 12";
        p1 = document.createElement("p");
        p1.className = "card-text mb-auto";
        p1.innerText = "This is a wider card with supporting text below as a natural lead-in to additional content.";
        a1 = document.createElement("a");
        a1.href="http://www.4399.com";
        a1.target = "_blank";
        a1.className = "stretched-link";
        a1.innerText = "Continue reading";
        div3_1.appendChild(strong1);
        div3_1.appendChild(h1);
        div3_1.appendChild(div3_1_1);
        div3_1.appendChild(p1);
        div3_1.appendChild(a1);
        div3_2 = document.createElement("div");
        div3_2.className = "col-auto d-none d-lg-block";
        div3_2.style.backgroundColor = "red";
        div3_2.style.width ="200px";
        div3_2.style.height = "250px";

        div2.appendChild(div3_2);
        div2.appendChild(div3_1);
    document.getElementById("rowb2").appendChild(div1);
}
function close_nav() {
        close_navv.style.visibility = "visible";
        open_navv.style.visibility = "visible";
        navv1.style.visibility = "hidden";
        open_navv.style.display = "block";
        close_navv.style.display = "none";

}
function open_nav() {
        close_navv.style.visibility = "visible";
        open_navv.style.visibility = "visible";
        navv1.style.visibility = "visible";
        close_navv.style.display = "block";
        open_navv.style.display = "none";
}
function show_books(data){
        var jsondata = {"data":data};
        var senddata = JSON.stringify(jsondata);
        $.ajaxSetup({
            beforeSend:function (xhr,settings) {
                if(!csrfSafeMethod(settings.type)&&!this.crossDomain){
                    xhr.setRequestHeader("X-CSRFToken",csrftoken);
                }
            }
        });
        $.ajax({
            url:"../ajax_show_data/",
            data:senddata,
            type:"post",
            success:function (data) {
                datalist = data['data'];
                console.log(datalist)
                num = Math.floor(Math.random()*20);

            }
        })
}