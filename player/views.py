from django.shortcuts import get_object_or_404

from rest_framework import viewsets, permissions
from rest_framework.response import Response

from .models import Video
from .serializers import VideoSerializer, PlaylistLogSerializer


# class VideoViewSet(viewsets.ModelViewSet):
#     queryset = Video.objects.filter(status=Video.QUEUED)
#     serializer_class = VideoSerializer
#     permission_classes = (permissions.AllowAny, )
#     lookup_field = 'id'

class VideoViewSet(viewsets.ViewSet):
    serializer_class = VideoSerializer
    permission_classes = (permissions.AllowAny, )
    lookup_field = 'id'

    def list(self, *args, **kwargs):
        serializer = self.serializer_class(
            Video.objects.filter(status__in=[Video.PLAYING, Video.QUEUED]), many=True)

        return Response(serializer.data, status=200)

    def detail(self, *args, **kwargs):
        serializer = self.serializer_class(
            get_object_or_404(Video, id=kwargs.get('id')))

        return Response(serializer.data, status=200)

    def create(self, *args, **kwargs):
        serializer = self.serializer_class(data=self.request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data, status=201)

    def update(self, *args, **kwargs):
        serializer = self.serializer_class(data=self.request.data,
            instance=get_object_or_404(self.serializer_class.Meta.model, id=kwargs.get('id')),
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data, status=201)


class PlaylistLogViewSet(viewsets.ViewSet):
    """ Playlist action log
    """
    serializer_class = PlaylistLogSerializer
    permission_classes = (permissions.AllowAny, )

    def create(self, *args, **kwargs):
        serializer = self.serializer_class(data=self.request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data, status=201)

    def get_latest(self, *args, **kwargs):
        serializer = self.serializer_class(
            self.serializer_class.Meta.model.objects.last())
        return Response(serializer.data, status=200)