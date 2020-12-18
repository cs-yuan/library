borrow.style.color = "black"
borrow.style.fontSize = "20px";
borrow.style.fontWeight = "bolder";
function csrfSafeMethod(method) {
    // these HTTP methods do not require CSRF protection
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}
ajax_show_borrow_list()
function ajax_show_borrow_list() {
    // var input_cnt = $("#_name").val();
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
            url:"/ajax_show_borrow_list/",
            data:senddata,
            type:"post",
            success:function (data) {
                // create_borrow_list(data['dic'])
                indata = data['dic']
                for(bi=0;bi<indata.length;bi++){
                    var myDate = new Date();
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
                    outtime = 0;
                    if(mydate >=indata[bi][3]){
                        console.log(mydate+"   "+indata[bi][3]);
                        outtime = 1
                    }
                    create_borrow_list(bi+1,indata[bi],outtime)
                }
            }
        })
}
function create_borrow_list(num,data,outtime) {
    console.log(data);

    tr1 = document.createElement("tr");
    for(li=0;li<4;li++){

        a1 = document.createElement("td");
        a1.innerText = data[li];
        if(li==1){
            tra = document.createElement("a");
            tra.href = data[4];
            tra.style.textDecoration = "none";
            tra.style.color = "black";
            tra.style.textAlign = "center";
            tra.target = "_blank";
            tra.appendChild(a1);
            tr1.appendChild(tra);
            continue;
        }
        tr1.appendChild(a1)

    }
    if(num%2==0){
        tr1.className = "color1"
    }else{
        tr1.className = "color2"
    }
    if(outtime==1){
        tr1.className = "color3";
        aa = document.createElement("a");
        aa.innerHTML = "&emsp;&emsp;"+data[5]+"- v - 快还书!!";
        tr1.children[3].appendChild(aa)
    }

    borrow_list.appendChild(tr1)

}