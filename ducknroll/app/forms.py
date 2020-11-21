from django.contrib.gis import forms
from .models import Entry

class EntryForm(forms.Form):
    feedTime = forms.DateTimeField()
    feedType = forms.CharField(max_length=50)
    feedAmt = forms.FloatField()
    flockSize = forms.IntegerField()
    feedLoc = forms.PointField(widget=forms.OSMWidget(attrs={'map_width': 800, 'map_height': 500, 'default_lat': 48.427502, 'default_lon': -123.367264}))
