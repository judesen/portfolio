from . import views
from django.urls import path

app_name = "blog"

urlpatterns = [
    path("", views.PostList.as_view(), name="home"),
    path("<slug:slug>/", views.PostDetail.as_view(), name="post_detail"),
    path("<int:post_id>/zap/", views.zapped, name="post_zapped"),
    path("<slug:slug>/<int:post_id>/zap/", views.zapped, name="post_detail_zapped"),
]