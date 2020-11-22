from django.shortcuts import render
from django.views.generic.edit import CreateView, FormView
from django.views.generic.list import ListView
from rest_framework import viewsets
from .forms import EntryForm
from .models import Entry
from .serializers import EntrySerializer

class HomeView(ListView):
    model = Entry

class EntryView(FormView):
    form_class = EntryForm
    template_name = 'app/entry.html'
    success_url = "/home/"

class EntryView2(CreateView):
    model = Entry
    template_name = 'app/entry.html'
    fields = '__all__'

class API(viewsets.ModelViewSet):
    serializer_class = EntrySerializer
    queryset = Entry.objects.all()
