personal.style.color = "black"
personal.style.fontSize = "20px";
personal.style.fontWeight = "bolder";
function csrfSafeMethod(method) {
    // these HTTP methods do not require CSRF protection
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}
ajax_show_information();
ajax_show_collection_list();
ajax_show_personal_borrow_list(0)
function ajax_show_information() {
    var jsondata = {};
        var senddata = JSON.stringify(jsondata);
        $.ajaxSetup({
            beforeSend:function (xhr,settings) {
                if(!csrfSafeMethod(settings.type)&&!this.crossDomain){
                    xhr.setRequestHeader("X-CSRFToken",csrftoken);
                }
            }
        });
        $.ajax({
            url:"/ajax_person_information/",
            data:senddata,
            type:"post",
            success:function (data) {
                indata = data['dic'];

                user_phone.value = indata[0];
                user_id.value = indata[2];
                user_name.value = indata[1];
                user_password.value = indata[3];
                user_email.value = indata[4];
            }
        })
}
function ajax_submit_information() {
    var jsondata = {
        'user_phone':user_phone.value,
        'user_name':user_name.value,
        'user_id':user_id.value,
        'user_password':user_password.value,
        'user_email':user_email.value
    };
        var senddata = JSON.stringify(jsondata);
        $.ajaxSetup({
            beforeSend:function (xhr,settings) {
                if(!csrfSafeMethod(settings.type)&&!this.crossDomain){
                    xhr.setRequestHeader("X-CSRFToken",csrftoken);
                }
            }
        });
        $.ajax({
            url:"/ajax_submit_information/",
            data:senddata,
            type:"post",
            success:function (data) {
                indata = data['dic'];
                user_phone.value = indata['user_phone'];
                user_name.value = indata['user_name'];
                user_id.value = indata['user_id'];
                user_password.value = indata['user_password'];
                user_email.value = indata['user_email'];
                alert("修改成功！！")
            }
        })
}
function create_collection(data,str_color,str_logo) {//data含bid, bname, bhref
    li1 = document.createElement("li");
    li1.className = "list-group-item d-flex justify-content-between bg-light";
    div1 = document.createElement("div");
    div1.className = str_color;
    a1 = document.createElement("a");
    a1.className = "my-0";
    a1.innerHTML = data[0]
    a1.target = "_blank";
    a1.style.textDecoration = "none";
    a1.href = data[2];
    h1 = document.createElement("h6")
    h1.appendChild(a1);
    small1 = document.createElement("small");
    small1.innerText = data[1];
    div1.appendChild(h1);
    div1.appendChild(small1);
    span1 = document.createElement("span");
    span1.className = str_color;
    span1.innerHTML = str_logo;
    li1.appendChild(div1);
    li1.appendChild(span1);
    collection_list.appendChild(li1)
}
function create_person_borrow(data,num) {//bid borrow_date back_date href
    tr1 = document.createElement("tr");
        for(ii=0;ii<3;ii++){
            td1 = document.createElement("td");
            if(ii==0){
                a1 = document.createElement("a");
                a1.href = data[3];
                a1.innerText = data[ii];
                a1.style.textDecoration="none";
                a1.target = "_blank";
                td1.appendChild(a1);
                tr1.append(td1);
                continue
            }
            td1.innerText = data[ii];
            tr1.appendChild(td1)
        }
        if(num%2==0){
        tr1.className = "color1"
        }else{
            tr1.className = "color2"
        }
     personal_borrow_list.appendChild(tr1)
}
function ajax_show_collection_list() {
    /**
     柔和灰（text-muted）、主要蓝（text-primary）
     成功绿（text-success）、信息蓝（text-info）
     警告黄（text-warning）、危险红（text-danger）
      **/
    str_color = ['text-success','text-primary','text-danger','text-info','text-warning','text-muted']
    str_logo = ['❥','☆','♫','♡','☀','☹']
    var senddata = JSON.stringify({});
        $.ajaxSetup({
            beforeSend:function (xhr,settings) {
                if(!csrfSafeMethod(settings.type)&&!this.crossDomain){
                    xhr.setRequestHeader("X-CSRFToken",csrftoken);
                }
            }
        });
        $.ajax({
            url:"/ajax_show_collection_list/",
            data:senddata,
            type:"post",
            success:function (data) {
                indata = data['dic'];
                collection_num.innerHTML = indata.length
                for (ii=0;ii<indata.length;ii++){
                    str_col = str_color[ii%6];
                    str_log = str_logo[ii%6];
                    create_collection(indata[ii],str_col,str_log)
                }
            }
        })

}
function clear_personal_borrow_list() {
        var el = document.getElementById('personal_borrow_list');
        var childs = el.childNodes;
        for(var i = childs .length - 1; i >= 2; i--) {
          el.removeChild(childs[i]);
        }
}
function ajax_show_personal_borrow_list(type) {
    clear_personal_borrow_list();
    var senddata = JSON.stringify({});
        $.ajaxSetup({
            beforeSend:function (xhr,settings) {
                if(!csrfSafeMethod(settings.type)&&!this.crossDomain){
                    xhr.setRequestHeader("X-CSRFToken",csrftoken);
                }
            }
        });
        $.ajax({
            url:"/ajax_show_personal_borrow_list/",
            data:senddata,
            type:"post",
            success:function (data) {
                indata = data['dic'];//bid borrow_date back_date bhref
                 // console.log(indata)
                var myDate = new Date();
                mydate = ""
                mydate+=myDate.getFullYear().toString()+"-";
                x = (myDate.getMonth()+1).toString();
                if (x.length==1){
                    x = "0"+x;
                }
                mydate+=x+"-";
                x = myDate.getDate().toString();
                if (x.length==1){
                    x = "0"+x;
                }
                mydate+=x+" ";
                x = myDate.getHours().toString();
                if (x.length==1){
                    x = "0"+x;
                }
                mydate+=x+":";
                x = myDate.getMinutes().toString();
                if (x.length==1){
                    x = "0"+x;
                }
                mydate+=x+":";
                x = myDate.getSeconds().toString();
                if (x.length==1){
                    x = "0"+x;
                }
                mydate+=x;
                console.log(mydate)

                if(type==0){
                    for(iii=0;iii<indata.length;iii++){
                        judgee = indata[iii][2]>mydate?"1":"0";
                     console.log(indata[iii][2]+" "+mydate+" "+judgee);
                    create_person_borrow(indata[iii],iii%2)
                    }
                }else if(type ==1){
                    for(iii=0;iii<indata.length;iii++){
                     console.log(indata[iii]);
                     if(indata[iii][2]<mydate)
                        create_person_borrow(indata[iii],iii%2)
                    }
                }else if(type ==2){
                    for(iii=0;iii<indata.length;iii++){
                     if(indata[iii][2]>mydate)
                        create_person_borrow(indata[iii],iii%2)
                    }
                }
            }
        })
}