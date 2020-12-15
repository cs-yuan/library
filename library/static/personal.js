personal.style.color = "black"
personal.style.fontSize = "20px";
personal.style.fontWeight = "bolder";
function csrfSafeMethod(method) {
    // these HTTP methods do not require CSRF protection
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}
    ajax_show_information();

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
                title.innerHTML = data['dic']
            }
        })
}