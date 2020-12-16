import pymysql
from django.http import HttpResponse
from django.shortcuts import render, redirect
import json
def admin(request):
    return render(request,'adminlogin.html')
def manage(request):
    return render(request,'manage.html')
def ajax_person_information(request):
    print("我的ajax_person_information开始运行了！！")
    if request.method == 'POST':
        if request.is_ajax():
            conn = pymysql.connect(host='localhost', user='root', passwd='123', db='library', port=3306, charset='utf8')
            cur = conn.cursor()
            sql = "select user_phone from  now_user"
            cur.execute(sql)
            user_phone = cur.fetchall()[0][0]
            sql = "select * from user where user_phone = '"+user_phone+"';"
            cur.execute(sql)
            dic = {'dic':cur.fetchall()[0]}
            print(dic)
            cur.close()
            conn.close()
            return HttpResponse(json.dumps(dic), content_type='application/json')
        return redirect('个人中心')
    return redirect('个人中心')



def ajax_submit_information(request):
    print("我的ajax_submit_information开始运行了！！")
    if request.method == 'POST':
        if request.is_ajax():
            indata = json.loads(request.body.decode("utf-8"))
            conn = pymysql.connect(host='localhost', user='root', passwd='123', db='library', port=3306, charset='utf8')
            cur = conn.cursor()
            sql = "update user set user_password = '"+indata['user_password']+"',user_email='"+indata['user_email']+"' where user_phone = '"+indata['user_phone']+"'"
            cur.execute(sql)
            conn.commit()
            print(sql)
            dic = {'dic':indata}
            print(dic)
            cur.close()
            conn.close()
            return HttpResponse(json.dumps(dic), content_type='application/json')
        return redirect('个人中心')
    return redirect('个人中心')

def ajax_show_collection_list(request):
    print("我的ajax_show_collection_list开始运行了！！")
    if request.method == 'POST':
        if request.is_ajax():
            indata = json.loads(request.body.decode("utf-8"))
            conn = pymysql.connect(host='localhost', user='root', passwd='123', db='library', port=3306, charset='utf8')
            cur = conn.cursor()
            sql = '''select collection.bid,bname,bhref 
                        from books,now_user,collection 
                            where now_user.user_phone=collection.user_phone and collection.bid = books.bid'''
            cur.execute(sql)
            indata = cur.fetchall()
            dic = {'dic': indata}
            print(dic)
            cur.close()
            conn.close()
            return HttpResponse(json.dumps(dic), content_type='application/json')
        return redirect('个人中心')
    return redirect('个人中心')