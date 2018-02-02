from django.urls import path
from .views import VideoViewSet, PlaylistLogViewSet


urlpatterns = [
    path('videos/', VideoViewSet.as_view({
        'get': 'list',
    }), name='videos'),
    path('videos/<int:id>/', VideoViewSet.as_view({
        'get': 'detail',
        'post': 'create',
        'put': 'update',
    }), name='videos'),

    path('playlist/logs/', PlaylistLogViewSet.as_view({
        'get': 'get_latest',
        'post': 'create',
    }), name='logs'),
]