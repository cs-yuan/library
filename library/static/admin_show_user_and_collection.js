    function csrfSafeMethod(method) {
    // these HTTP methods do not require CSRF protection
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}
function remove_user_list() {
        var el = document.getElementById('user_list');
                var childs = el.childNodes;
                for(var i = childs .length - 1; i >= 2; i--) {
                  el.removeChild(childs[i]);
    }
}

function ajax_show_list_user() {
    var senddata = JSON.stringify({});
        $.ajaxSetup({
            beforeSend:function (xhr,settings) {
                if(!csrfSafeMethod(settings.type)&&!this.crossDomain){
                    xhr.setRequestHeader("X-CSRFToken",csrftoken);
                }
            }
        });
        $.ajax({
            url:"../ajax_show_list_user/",
            data:senddata,
            type:"post",
            success:function (data) {
                indata = data['dic'];
                for(ii=0;ii<indata.length;ii++){
                    create_user_list(indata[ii])
                }
            }
        })
}
function create_user_list(data) {
    // data[2] = data[2].substring(6,14);
    tr1 = document.createElement("tr");
    for(i=0;i<6;i++){
       td1 = document.createElement("td");
       if(i==5){
            a1 = document.createElement("a");
            a1.className = "link_del";
            a1.innerText = "删除";
            a1.href = "#"
            a1.addEventListener("click",function () {
                user_phone = this.parentNode.parentNode.children[0].innerHTML;
                ajax_delete_user(user_phone);
            });
            td1.appendChild(a1);
            tr1.appendChild(td1);
            continue;
       }
       td1.innerText = data[i];
       tr1.appendChild(td1)
    }
    user_list.appendChild(tr1)
}
function ajax_delete_user(user_phone) {
    var senddata = JSON.stringify({'user_phone':user_phone});
    $.ajaxSetup({
            beforeSend:function (xhr,settings) {
                if(!csrfSafeMethod(settings.type)&&!this.crossDomain){
                    xhr.setRequestHeader("X-CSRFToken",csrftoken);
                }
            }
        });
        $.ajax({
            url:"../ajax_delete_list_user/",
            data:senddata,
            type:"post",
            success:function (data) {
                remove_user_list();
                ajax_show_list_user();
            }
        })
}




function remove_collection_list() {
        var el = document.getElementById('collection_list');
                var childs = el.childNodes;
                for(var i = childs .length - 1; i >= 2; i--) {
                  el.removeChild(childs[i]);
    }
}
function ajax_show_list_collection() {
    var senddata = JSON.stringify({});
        $.ajaxSetup({
            beforeSend:function (xhr,settings) {
                if(!csrfSafeMethod(settings.type)&&!this.crossDomain){
                    xhr.setRequestHeader("X-CSRFToken",csrftoken);
                }
            }
        });
        $.ajax({
            url:"../ajax_show_list_collection/",
            data:senddata,
            type:"post",
            success:function (data) {
                indata = data['dic'];
                for(ii=0;ii<indata.length;ii++){
                    create_collection_list(indata[ii])
                }
            }
        })
}

function create_collection_list(data) {
    tr1 = document.createElement("tr");
    for(i=0;i<3;i++){
       td1 = document.createElement("td");
       if(i==2){
            a1 = document.createElement("a");
            a1.className = "link_del";
            a1.innerText = "删除";
            a1.href = "#"
            a1.addEventListener("click",function () {
                user_phone = this.parentNode.parentNode.children[0].innerHTML;
                bid = this.parentNode.parentNode.children[1].innerHTML;
                ajax_delete_collection(user_phone,bid);
            });
            td1.appendChild(a1);
            tr1.appendChild(td1);
            continue;
       }
       td1.innerText = data[i];
       tr1.appendChild(td1)
    }
    collection_list.appendChild(tr1)
}
function ajax_delete_collection(user_phone,bid) {
    var senddata = JSON.stringify({'user_phone':user_phone,'bid':bid});
    $.ajaxSetup({
            beforeSend:function (xhr,settings) {
                if(!csrfSafeMethod(settings.type)&&!this.crossDomain){
                    xhr.setRequestHeader("X-CSRFToken",csrftoken);
                }
            }
        });
        $.ajax({
            url:"../ajax_delete_list_collection/",
            data:senddata,
            type:"post",
            success:function (data) {
                remove_collection_list();
                ajax_show_list_collection();
            }
        })
}