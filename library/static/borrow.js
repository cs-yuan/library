borrow.style.color = "black"
borrow.style.fontSize = "20px";
personal.style.fontWeight = "bolder";
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
                alert(indata)
            }
        })
}