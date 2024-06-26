from django.urls import path, include
from .views import *
from rest_framework.routers import DefaultRouter
from .views import MyTokenObtainPairView
from .views import (MatrizViewSet, NivelDeEnsinoViewSet, SemestreViewSet, AtividadeAdministrativaViewSet, 
                    CursoViewSet, TurmaModuloViewSet, DisciplinaViewSet, DemandaViewSet, 
                    ProfessorViewSet, AtividadeAdministrativaProfessorViewSet, ProfessorDisciplinaViewSet)

router = DefaultRouter()
router.register(r'Matriz', MatrizViewSet)
router.register(r'Nivel-de-ensino', NivelDeEnsinoViewSet)
router.register(r'Semestre', SemestreViewSet)
router.register(r'Atividade-administrativa', AtividadeAdministrativaViewSet)
router.register(r'Curso', CursoViewSet)
router.register(r'Turma-modulo', TurmaModuloViewSet)
router.register(r'Disciplina', DisciplinaViewSet)
router.register(r'Demanda', DemandaViewSet)
router.register(r'Professor', ProfessorViewSet)
router.register(r'Atividade-administrativa-professor', AtividadeAdministrativaProfessorViewSet)
router.register(r'Professor-disciplina', ProfessorDisciplinaViewSet)

urlpatterns = [
    path('', pagina1, name='pagina1'),
    path('pagina2', pagina2, name='pagina2'),
    path('pagina3', pagina3, name='pagina3'),
    path('pagina4', pagina4, name='pagina4'),
    path('pagina5', pagina5, name='pagina5'),
    path('pagina6', pagina6, name='pagina6'),
    path('pagina7', pagina7, name='pagina7'),
    path('pagina8', pagina8, name='pagina8'),
    path('pagina9', pagina9, name='pagina9'),
    path('pagina10', pagina10, name='pagina10'),
    path('pagina11', pagina11, name='pagina11'),
    path('', include(router.urls)),
    path('api/token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
] 



