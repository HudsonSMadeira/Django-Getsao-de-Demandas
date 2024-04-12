from django.urls import path, include
from .views import *
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'Matriz', MatrizView)
router.register(r'NivelDeEnsino', NivelDeEnsinoView)
router.register(r'Semestre', SemestreView)
router.register(r'AtividadeAdministrativa', AtividadeAdministrativaView)
router.register(r'Curso', CursoView)
router.register(r'Turmamodulo', TurmamoduloView)
router.register(r'Disciplina', DisciplinaView)
router.register(r'Demanda',DemandaView)
router.register(r'Professor', ProfessorView)
router.register(r'AtividadeAdministrativaProfessor', AtividadeAdministrativaProfessorView)
router.register(r'ProfessorDisciplina', ProfessorDisciplinaView)

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
] 


