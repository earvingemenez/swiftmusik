from django.db import models


class Video(models.Model):
    """Videos that are to be added by the users to the playlist
    """
    QUEUED = 'queued'
    PLAYING = 'playing'
    FINISHED = 'finished'
    CANCELED = 'canceled'

    STATUS_CHOICES = (
        (QUEUED, 'Queued'),
        (PLAYING, 'Playing'),
        (FINISHED, 'Finished'),
        (CANCELED, 'Canceled')
    )

    url = models.CharField(max_length=255)
    parsed_id = models.CharField(max_length=255)
    parsed_title = models.CharField(max_length=255, default='No Title')
    parsed_thumb = models.URLField()

    status = models.CharField(choices=STATUS_CHOICES, default=QUEUED, max_length=15)

    date_added = models.DateTimeField(auto_now_add=True)
    date_modified = models.DateTimeField(auto_now=True)

    def __str__(self):
        return "{} - {}".format(self.parsed_title, self.url)
