from django.contrib import admin
from django.contrib.gis.admin import OSMGeoAdmin
from .models import Entry

@admin.register(Entry)
class EntryAdmin(OSMGeoAdmin):
    list_display = ('feedTime','feedType','feedLoc')


