from django.contrib import admin
from .models import User,Password,App
# Register your models here.
admin.site.register(User)
admin.site.register(Password)
admin.site.register(App)