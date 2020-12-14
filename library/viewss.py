import pymysql
from django.http import HttpResponse
from django.shortcuts import render, redirect
import json


def home(request):
    if request.method == 'GET':
        return render(request, 'home.html')
