home.style.color = "black"
home.style.fontSize = "20px";
home.style.fontWeight = "bolder";
document.getElementsByTagName("body")[0].addEventListener('click',function () {
    remove_search_list()
    search_box.style.visibility="hidden"
});
function remove_list() {
    var el = document.getElementById('rowb2');
                var childs = el.childNodes;
                for(var i = childs .length - 1; i >= 0; i--) {
                  el.removeChild(childs[i]);
                }
}
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
        strong1.color = "red";
        h1 = document.createElement('h4');
        // h1.className = "mb-0";
        titlea = document.createElement("a");
        titlea.href = data[5];
        titlea.innerText = data[1].substring(0,14);
        titlea.style.color="red";
        titlea.style.fontWeight = "bolder";
        titlea.style.textDecoration = "none";
        titlea.style.fontFamily = "楷体";
        titlea.target = "_blank";
        h1.appendChild(titlea);
        div3_1_1 = document.createElement("div");
        div3_1_1.className = "mb-1 text-muted";
        div3_1_1.innerText = data[2]+"著";
        p1 = document.createElement("p");
        p1.className = "card-text mb-auto";
        p1.style = "position:relative;top:50px";
        btn1 = document.createElement("input");
        btn1.type = "button";
        btn1.value = "收藏";
        btn1.className = "btn_submit btn btn-outline-primary";
/**这里没写********************收藏**********************************/
        btn1.addEventListener('click',function () {
                data = this.parentNode.parentNode.children[0].innerText;
                ajax_insert_collection(data)
        });
/**这里没写**********************************************************/
        p1.appendChild(btn1);
        btn2 = document.createElement("input");
        btn2.type = "button";
        btn2.value = "借阅";
        btn2.className = "btn_submit btn btn-outline-primary";
        btn2.style.marginLeft = "10px";
/**这里没写********************借阅**********************************/
        btn2.addEventListener('click',function () {
                data = this.parentNode.parentNode.children[0].innerText;
                ajax_insert_borrow(data)
        });
/**这里没写**********************************************************/
        p1.appendChild(btn2);
        a1 = document.createElement("a");
        console.log(a1.href);
        a1.target = "_blank";
        a1.innerText = data[3]+" "+data[4]+"版";
        div3_1.appendChild(strong1);
        div3_1.appendChild(h1);
        div3_1.appendChild(div3_1_1);
        div3_1.appendChild(a1);
        div3_1.appendChild(p1);
        div3_2 = document.createElement("img");
        // div3_2.className = "";
        div3_2.src= "../static/img_books/"+data[6];
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
                remove_list();
                datalist = data['data'];
                console.log(datalist);
                for(i =0;i<datalist.length;i++){
                    item = datalist[i];
                    num = Math.floor(Math.random()*20);
                    book_img = "@"+num+"@.jpg";
                    book_id = item[0];
                    book_name = item[1].substring(0,20);
                    book_auther = item[2].substring(0,20);
                    book_publish = item[3].substring(0,20);
                    book_year = item[4]
                    book_href = item[5];
                    data = [book_id,book_name,book_auther,book_publish,book_year,book_href,book_img]
                    console.log(data);
                    create_list(data)
                }
            }
        })
}
function remove_search_list() {
    var el = document.getElementById('search_box');
                var childs = el.childNodes;
                for(var i = childs .length - 1; i >= 1; i--) {
                  el.removeChild(childs[i]);
    }
}
function ajax_search(data) {
    if(data=="")return;
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
            url:"../ajax_table_search/",
            data:senddata,
            type:"post",
            success:function (data) {
                remove_search_list()
                datalist = data['data'];
                for(i=0;i<datalist.length&&i<15;i++){
                    lii = document.createElement("li");
                    lii.innerHTML=datalist[i];
                    lii.addEventListener('click',function () {
                        search_input.value = this.innerHTML;
                    });
                    document.getElementById("search_box").appendChild(lii)
                }
            }
        })
}
function ajax_show_one_table(data) {
    if(data=="")return;
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
            url:"../ajax_show_one_table/",
            data:senddata,
            type:"post",
            success:function (data) {
                indata = data['data']
                // alert(indata)
                for (ii=0;ii<indata.length;ii++){
                    num = Math.floor(Math.random()*20);
                    book_img = "@"+num+"@.jpg";
                    indata[ii].push(book_img);
                    create_list(indata[ii])
                }
            }
        })
}
function ajax_insert_borrow(data) {
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
            url:"../ajax_insert_borrow/",
            data:senddata,
            type:"post",
            success:function (data) {
                alert("借阅成功！")
            }
        })
}
function ajax_insert_collection(data) {
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
            url:"../ajax_insert_collection/",
            data:senddata,
            type:"post",
            success:function (data) {
                alert("收藏成功！")
            }
        })
}