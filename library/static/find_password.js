function find_pwd() {
    user_name = document.getElementById("user_name").value
    user_id = document.getElementById("user_id").value
    user_phone = document.getElementById("user_phone").value
    var jsondata = {'user_name':user_name,'user_id':user_id,'user_phone':user_phone};
    var senddata = JSON.stringify(jsondata);
        $.ajaxSetup({
            beforeSend:function (xhr,settings) {
                if(!csrfSafeMethod(settings.type)&&!this.crossDomain){
                    xhr.setRequestHeader("X-CSRFToken",csrftoken);
                }
            }
        });
        $.ajax({
            url:"../ajax_find_password/",
            data:senddata,
            type:"post",
            success:function (data) {
                if(data.judge==1){
                    alert("你的密码是："+data.password+"！快去个人中心修改吧！")
                }else{
                    alert("笨笨的数据库找不到你的账户，请再输一下！")
                }
            }
        })
}