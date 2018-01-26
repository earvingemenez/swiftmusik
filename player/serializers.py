from rest_framework import serializers

from player.models import Video


class VideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Video
        fields = ('url', 'parsed_id', 'parsed_title', 'status', 'date_added', )
        read_only_fields = ('parsed_id', 'parsed_title', 'status', 'date_added', )
