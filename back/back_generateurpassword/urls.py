"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path,include
from generateurpassword.views import UserView,AppView,PasswordView,login
from rest_framework import routers
from django.conf.urls.static import static
from django.conf import settings

# Define a router to handle API endpoints
router = routers.DefaultRouter()
router.register(r'User', UserView)
router.register(r'App', AppView)
router.register(r'Password', PasswordView)
# router.register(r'Authentification', AuthentificationView)

# Define the URL patterns for the app
urlpatterns = [
    #path d'authentification
    # path('auth/',include('dj_rest_auth.urls')),
    # path('auth/', AuthView.as_view(), name='auth'),
    path('login/', login, name='login'),
    path('admin/', admin.site.urls),
    path('', include(router.urls)),
]+static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
