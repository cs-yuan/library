import pymysql
from django.http import HttpResponse
from django.shortcuts import render, redirect
import json


def home(request):
    return render(request, 'home.html')

def borrow(request):
    return render(request,'borrow.html')

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


