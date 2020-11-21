from django.shortcuts import render
from django.views.generic.edit import FormView
from django.views.generic.list import ListView
from .forms import EntryForm
from .models import Entry

class HomeView(ListView):
    model = Entry

class EntryView(FormView):
    form_class = EntryForm
    template_name = 'app/entry.html'
    success_url = "/home/"


