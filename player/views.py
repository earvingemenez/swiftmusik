from django.shortcuts import render

from rest_framework import viewsets, permissions
from rest_framework.response import Response

from .models import Video
from .serializers import VideoSerializer


class VideoViewSet(viewsets.ModelViewSet):
    queryset = Video.objects.filter(status=Video.QUEUED)
    serializer_class = VideoSerializer
    permission_classes = (permissions.AllowAny, )
    lookup_field = 'id'
