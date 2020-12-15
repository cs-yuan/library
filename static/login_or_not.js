window.onload = function () {
    ajaxlogin_not()
}
function csrfSafeMethod(method) {
    // these HTTP methods do not require CSRF protection
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}
function ajaxlogin_not() {
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
            url:"/ajax_judge/",
            data:senddata,
            type:"post",
            success:function (data) {
                alert(data['user_name'])
                personal.innerHTML = data['user_name'];
                display_tag(data['status']);
            }
        })
}
function display_tag(status) {
    if(status==1){
         document.getElementById("left_nav").style.display="inline";
         document.getElementById("right_nav").style.display="none";
         }else {
        document.getElementById("left_nav").style.display = "none";
        document.getElementById("right_nav").style.display = "inline";
    }
}
function logout() {
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
            url:"/ajax_layout/",
            data:senddata,
            type:"post",
            success:function (data) {
                display_tag(data.judge);
                window.location.href="../";
            }
        })
}