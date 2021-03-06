from django.contrib import admin

from .models import Video


class VideoAdmin(admin.ModelAdmin):
    '''
        Admin View for Video
    '''
    list_display = ('url', 'parsed_id', 'parsed_title', 'status', 'date_added', )


admin.site.register(Video, VideoAdmin)
