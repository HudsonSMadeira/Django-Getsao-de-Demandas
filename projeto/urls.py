from django.urls import path
from .views import pagina1, pagina2, pagina3, pagina4, pagina5, pagina6, pagina7, pagina8

urlpatterns = [
    path('', pagina1, name='pagina1'),
    path('pagina2', pagina2, name='pagina2'),
    path('pagina3', pagina3, name='pagina3'),
    path('pagina4', pagina4, name='pagina4'),
    path('pagina5', pagina5, name='pagina5'),
    path('pagina6', pagina6, name='pagina6'),
    path('pagina7', pagina7, name='pagina7'),
    path('pagina8', pagina8, name='pagina8'),
] 

