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
                    create_borrow_list(bi+1,indata[bi])
                }
            }
        })
}
function create_borrow_list(num,data) {
    console.log(data)

    tr1 = document.createElement("tr");
    for(li=0;li<4;li++){
        a1 = document.createElement("td")
        a1.innerText = data[li]
        tr1.appendChild(a1)
    }
    if(num%2==0){
        tr1.className = "color1"
    }else{
        tr1.className = "color2"
    }
    borrow_list.append(tr1)

}