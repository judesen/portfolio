from django.shortcuts import render, get_object_or_404
from django.views import generic
from .models import Post
from django.views.decorators.csrf import csrf_exempt, csrf_protect, ensure_csrf_cookie
from django.http import HttpResponse, HttpResponseRedirect
from django.urls import reverse

# Create your views here.
class PostList(generic.ListView):
    queryset = Post.objects.filter(status=1).order_by("-created_on")
    template_name = "blog/index.html"

class PostDetail(generic.DetailView):
    model = Post
    template_name = "blog/post_detail.html"

@csrf_exempt
def zapped(request, post_id):
    if request.method == 'POST':
        print('POST method...')
    if request.method == 'GET':
        print('GET method...')
    data = request.POST
    post = get_object_or_404(Post, pk=post_id)
    post.zaps += int(data.getlist('zap')[0])
    post.save()
    
    return HttpResponse(post)