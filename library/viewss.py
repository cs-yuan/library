import pymysql
from django.http import HttpResponse
from django.shortcuts import render, redirect
import json


def home(request):
    if request.method == 'GET':
        return render(request, 'home.html')

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
