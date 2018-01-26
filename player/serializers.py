import re
from rest_framework import serializers

from player.models import Video


class VideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Video
        fields = ('url', 'parsed_id', 'parsed_title', 'status', 'date_added', )
        read_only_fields = ('parsed_id', 'parsed_title', 'status', 'date_added', )

    def create(self, validated_data):
        pattern = '((?<=(v|V)/)|(?<=be/)|(?<=(\?|\&)v=)|(?<=embed/))([\w-]+)'
        compiled_pattern = re.compile(pattern)

        url = validated_data.get('url', None)
        if url:
            # Parse URL for video ID
            vid_id = compiled_pattern.search(url)
            validated_data['parsed_id'] = vid_id.group(0)

        video = Video.objects.create(**validated_data)

        return validated_data
