import pymysql
from django.http import HttpResponse
from django.shortcuts import render, redirect
import json
def setjudge(status,user_phone):
    conn = pymysql.connect(host='localhost', user='root', passwd='123', db='library', port=3306, charset='utf8')
    cur = conn.cursor()
    sql = '''update now_user set status='''
    sql +=str(status)+",user_phone='"+user_phone+"'"
    cur.execute(sql)
    conn.commit()
    cur.close()
    conn.close()
def getjudge():
    conn = pymysql.connect(host='localhost', user='root', passwd='123', db='library', port=3306, charset='utf8')
    cur = conn.cursor()
    cur.execute("select status,user_phone from now_user")
    data = cur.fetchall()
    status = int(data[0][0])
    # user_phone = data[0][1]
    # cur.execute("select user_name from user where user_phone ='"+user_phone+"';")
    # user_name = cur.fetchall()[0][0]
    cur.close()
    conn.close()
    return {'judge':status}
def index(request):
    return render(request,'index.html')
def signup(request):
    if request.method=='GET':
        return render(request, 'signup.html')
    else:
        object = request.POST
        user_name = object.get('user_name')
        user_phone = object.get('user_phone')
        if len(user_phone)!=11:
            return render(request, 'signup.html', {'Waring': '请输入正确的手机号！！'})
        user_id = object.get('user_id')
        if len(user_id)!=18:
            return render(request, 'signup.html', {'Waring': '请输入正确的身份证号！！'})
        user_password1 = object.get('password1')
        user_password2 = object.get('password2')
        arr = [user_name,user_phone,user_id,user_password1,user_password2]
        flag = True
        for item in arr:
            if item=='':
                flag = False
                break
        if flag==False:
            return render(request,'signup.html',{'Waring':'请完整填写信息！！'})
        conn = pymysql.connect(host='localhost',user='root',passwd= '123',db='library',port=3306,charset='utf8')
        cur = conn.cursor()
        cur.execute("select user_phone from user")
        datalist = cur.fetchall()
        cur.close()
        conn.close()
        if (user_phone,) in datalist:
            return render(request,'signup.html',{'Waring':'该用户已被注册！！'})
        else:
            if user_password1 != user_password2:
                return render(request, 'signup.html', {'Waring': '输入的密码不一致！！'})
            else:
                conn = pymysql.connect(host='localhost', user='root', passwd='123', db='library', port=3306,
                                       charset='utf8')
                cur = conn.cursor()
                sql = '''insert user values('''
                sql += "'"+user_phone+"','"+user_name+"','"+user_id+"','"+user_password1+"','')"
                print(sql)
                cur.execute(sql)
                conn.commit()
                cur.close()
                conn.close()
                return redirect('登录')
def login(request):
    if request.method =='GET':
        return render(request,'login.html')
    else:
        object = request.POST
        if object.get('register') == '1':
            return redirect('注册')
        user_name = object.get('user_name')
        user_password = object.get('user_password')
        conn = pymysql.connect(host='localhost',user='root',passwd='123',db='library',port=3306,charset='utf8')
        cur = conn.cursor()
        cur.execute("select user_phone,user_password from user")
        datalist = cur.fetchall()
        cur.close()
        conn.close()
        if (user_name,user_password,) in datalist:
            setjudge(1,user_name)
            return redirect('家')
        else:
            dic = '''
                账号或密码错误
            '''
            return render(request,'login.html',{'dic':dic})
def ajax_judge(request):
    if request.method == 'POST':
        if request.is_ajax():
            json.loads(request.body.decode("utf-8"))
            dic = getjudge()
            ###########################################3
            print(dic)
        return HttpResponse(json.dumps(dic), content_type='application/json')
    return render(request,'index.html')
def ajax_layout(request):
    if request.method == 'POST':
        if request.is_ajax():
            print("我是ajax_layout")
            json.loads(request.body.decode("utf-8"))
            setjudge(0,'')
            dic = {'judge':0}
        return HttpResponse(json.dumps(dic), content_type='application/json')
    return render(request,'index.html')
def ajax_find_password(request):
    print("我的ajax_find_password开始运行了！！")
    if request.method == 'POST':
        if request.is_ajax():
            indata = json.loads(request.body.decode("utf-8"))
            user_phone = indata['user_phone']
            user_id = indata['user_id']
            user_name = indata['user_name']
            conn = pymysql.connect(host='localhost',user='root',passwd='123',db='library',port=3306,charset='utf8')
            cur = conn.cursor()
            cur.execute("select user_phone,user_name,user_id from user")
            data = cur.fetchall()
            # print(data)
            cur.close()
            conn.close()
            item = (user_phone,user_name,user_id)
            print(item)
            if item in data:
                print("账号密码找到啦！！")
                conn = pymysql.connect(host='localhost', user='root', passwd='123', db='library', port=3306,
                                       charset='utf8')
                cur = conn.cursor()
                sql = '''
                    select user_password from user where user_id=
                '''
                sql +="'"+user_id+"' and user_name = '"+user_name+"' and user_phone = '"+user_phone+"';"
                print(sql)
                cur.execute(sql)
                password = cur.fetchall()[0][0]
                dic = {'judge': 1,'password':password}
                return HttpResponse(json.dumps(dic), content_type='application/json')
            else:
                dic = {'judge': 0}
                return HttpResponse(json.dumps(dic), content_type='application/json')
    return render(request,'index.html')
