import datetime

import pymysql
from django.http import HttpResponse
from django.shortcuts import render, redirect
import json

class DateEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj,datetime.datetime):
            return obj.strftime("%Y-%m-%d %H:%M:%S")
        else:
            return json.JSONEncoder.default(self, obj)


def home(request):
    return render(request, 'home.html')

def borrow(request):
    return render(request,'borrow.html')

def personal(request):
    return render(request,'personal.html')

def ajax_show_data(request):
    print("我的ajax_show_table开始运行了！！")
    if request.method == 'POST':
        if request.is_ajax():
            indata = json.loads(request.body.decode("utf-8"))
            str = indata['data']
            conn = pymysql.connect(host='localhost', user='root', passwd='123', db='library', port=3306, charset='utf8')
            cur = conn.cursor()
            sql = "select * from books where bid like "
            sql +="'"+str+"%';"
            cur.execute(sql)
            dic = {'data':cur.fetchall()}
            cur.close()
            conn.close()
            return HttpResponse(json.dumps(dic), content_type='application/json')
        return redirect('家')
    return redirect('家')

def ajax_table_search(request):

    if request.method == 'POST':
        if request.is_ajax():
            print("我的ajax_table_search开始运行了！！")
            indata = json.loads(request.body.decode("utf-8"))
            str = indata['data']
            # print(str)
            conn = pymysql.connect(host='localhost', user='root', passwd='123', db='library', port=3306, charset='utf8')
            cur = conn.cursor()
            sql = "select distinct bname from books where bname like "
            sql +="'%"+str+"%';"
            cur.execute(sql)
            dic = {'data':cur.fetchall()}
            print(dic['data'])
            cur.close()
            conn.close()
            return HttpResponse(json.dumps(dic), content_type='application/json')
        return redirect('家')
    return redirect('家')

def ajax_show_one_table(request):
    if request.method == 'POST':
        if request.is_ajax():
            print("我的ajax_show_one_table开始运行了！！")
            indata = json.loads(request.body.decode("utf-8"))
            str = indata['data']
            # print(str)
            conn = pymysql.connect(host='localhost', user='root', passwd='123', db='library', port=3306, charset='utf8')
            cur = conn.cursor()
            sql = "select distinct * from books where bname like"
            sql +="'%"+str+"%';"
            cur.execute(sql)
            dic = {'data':cur.fetchall()}
            print(dic['data'])
            cur.close()
            conn.close()
            return HttpResponse(json.dumps(dic), content_type='application/json')
        return redirect('家')
    return redirect('家')

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

def ajax_show_borrow_list(request):
    print("我的ajax_show_borrow_list开始运行了！！")
    if request.method == 'POST':
        if request.is_ajax():
            conn = pymysql.connect(host='localhost', user='root', passwd='123', db='library', port=3306, charset='utf8')
            cur = conn.cursor()
            sql = "select * from borrow"
            cur.execute(sql)
            dic = {'dic':cur.fetchall()}
            print(dic)
            cur.close()
            conn.close()
            return HttpResponse(json.dumps(dic,cls=DateEncoder), content_type='application/json')
        return redirect('借阅')
    return redirect('借阅')


def ajax_insert_borrow(request):
    print("我的ajax_insert_borrow开始运行了！！")
    if request.method == 'POST':
        if request.is_ajax():
            indata = json.loads(request.body.decode("utf-8"))
            book_id = indata['data']
            conn = pymysql.connect(host='localhost', user='root', passwd='123', db='library', port=3306, charset='utf8')
            cur = conn.cursor()
            sql = '''
                select user_phone from now_user
            '''
            cur.execute(sql)
            user_phone = cur.fetchall()[0][0]
            date_now = datetime.datetime.now()
            year = date_now.year
            mon = date_now.month
            mon+=1
            if mon>12:
                mon=1
            year+=1
            date_back = datetime.datetime(year,mon,date_now.day,date_now.hour,date_now.minute,date_now.second)

            sql = "insert borrow values('"+user_phone+"','"+book_id+"','"+date_now.strftime("%Y-%m-%d %H:%M:%S") +"','"+date_back.strftime("%Y-%m-%d %H:%M:%S") +"');"

            print(sql)
            cur.execute(sql)
            conn.commit()
            cur.close()
            conn.close()
            return HttpResponse(json.dumps({}), content_type='application/json')
        return redirect('借阅')
    return redirect('借阅')
