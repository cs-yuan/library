"""library URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path

from library import views, viewsss
from library import viewss
urlpatterns = [
    # path('admin/', admin.site.urls),
    path('', views.index,name='主页'),
    path('login/', views.login,name='登录'),
    path('signup/', views.signup,name='注册'),
    path('ajax_find_password/',views.ajax_find_password,name='找回密码'),
    path('ajax_judge/', views.ajax_judge),
    path('ajax_layout/',views.ajax_layout),
    path('home/',viewss.home,name='家'),
    path('borrow/',viewss.borrow,name='借阅'),
    path('personal/',viewss.personal,name='个人中心'),
    path('ajax_show_data/',viewss.ajax_show_data),
    path('ajax_table_search/',viewss.ajax_table_search),
    path('ajax_show_one_table/',viewss.ajax_show_one_table),
    path('ajax_person_information/',viewsss.ajax_person_information),
    path('ajax_show_borrow_list/',viewss.ajax_show_borrow_list),
    path('ajax_show_personal_borrow_list/',viewss.ajax_show_personal_borrow_list),
    path('ajax_insert_borrow/',viewss.ajax_insert_borrow),
    path('ajax_insert_collection/',viewss.ajax_insert_collection),
    path('admin/',viewsss.admin,name='管理员'),
    path('admin/manage/',viewsss.manage),
    path('ajax_submit_information/',viewsss.ajax_submit_information),
    path('ajax_show_collection_list/',viewsss.ajax_show_collection_list)
]
