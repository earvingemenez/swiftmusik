from django.views.generic import TemplateView
from django.conf import settings

class HomeView(TemplateView):
    template_name = "home/index.html"

    def get_context_data(self, **kwargs):

        context = {
            'base_url': "{}{}/".format(settings.PROTOCOL, self.request.META['HTTP_HOST']),
            'pusher_channel': settings.PUSHER_CHANNEL
        }
        return context
