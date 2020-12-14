function create_list(data){
        div1 = document.createElement("div");
        div1.className = "col-md-6";
        div2 = document.createElement("div");
        div2.className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative"
        div1.appendChild(div2);
        div3_1 = document.createElement("div");
        div3_1.className = "col p-4 d-flex flex-column position-static"; //////
        strong1 = document.createElement("strong");
        strong1.className = "d-inline-block mb-2 text-primary";
        strong1.innerText = data[0];
        h1 = document.createElement('h3');
        h1.className = "mb-0";
        h1.innerText =data[1];
        div3_1_1 = document.createElement("div");
        div3_1_1.className = "mb-1 text-muted";
        div3_1_1.innerText = data[2]
        p1 = document.createElement("p");
        p1.className = "card-text mb-auto";
        p1.innerText = "This is a wider card with supporting text below as a natural lead-in to additional content.";
        a1 = document.createElement("a");
        a1.href=data[6];
        console.log(a1.href)
        a1.target = "_blank";
        a1.className = "stretched-link";
        a1.innerText = data[3]+" "+data[4];
        div3_1.appendChild(strong1);
        div3_1.appendChild(h1);
        div3_1.appendChild(div3_1_1);
        div3_1.appendChild(p1);
        div3_1.appendChild(a1);
        div3_2 = document.createElement("img");
        // div3_2.className = "";
        div3_2.src= "../static/img_books/"+data[5];
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
                var el = document.getElementById('rowb2');
                var childs = el.childNodes;
                for(var i = childs .length - 1; i >= 0; i--) {
                  el.removeChild(childs[i]);
}
                datalist = data['data'];
                console.log(datalist)
                for(i =0;i<datalist.length;i++){
                    item = datalist[i]
                    num = Math.floor(Math.random()*20);
                    book_img = "@"+num+"@.jpg";
                    book_id = item[0]
                    book_name = item[1].substring(0,20)
                    book_auther = item[2]
                    book_publish = item[3]
                    book_year = item[4]
                    book_href = item[5]
                    data = [book_id,book_name,book_auther,book_publish,book_year,book_img,book_href]
                    console.log(data)
                    create_list(data)
                }

            }
        })
}