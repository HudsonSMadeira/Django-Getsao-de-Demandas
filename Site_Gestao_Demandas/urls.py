from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('projeto.urls')),
    path('api/', include('projeto.urls')),
]

