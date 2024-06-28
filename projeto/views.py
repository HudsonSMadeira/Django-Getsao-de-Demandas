from django.shortcuts import render, redirect, get_list_or_404
from django.contrib.auth.models import User
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth import login, logout, authenticate
from django.contrib.auth.decorators import login_required
from rest_framework.viewsets import ModelViewSet
from rest_framework import viewsets, routers
from rest_framework.views import APIView
from rest_framework import viewsets
from rest_framework import permissions
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import AllowAny
from django.contrib.auth.models import User
from .models import (Matriz, NivelDeEnsino, Semestre, AtividadeAdministrativa, 
                     Curso, TurmaModulo, Disciplina, Demanda, Professor, 
                     AtividadeAdministrativaProfessor, ProfessorDisciplina)
from .serializers import (MatrizSerializer, NivelDeEnsinoSerializer, SemestreSerializer, 
                          AtividadeAdministrativaSerializer, CursoSerializer, TurmaModuloSerializer, 
                          DisciplinaSerializer, DemandaSerializer, ProfessorSerializer, 
                          AtividadeAdministrativaProfessorSerializer, ProfessorDisciplinaSerializer)

def pagina1(request):
    return render(request,'Pagina-01.html')

def pagina2(request):
    if request.method == 'GET':
        return render(request, 'Pagina-02-Login.html', {
            'form': AuthenticationForm()
        })
    else:
        username = request.POST('username')
        password = request.POST('password')

        user = authenticate(request, username1=username, password1=password)

        if user is not None:
            login(request, user)
            return redirect('Pagina-03-Carga_Horaria.html')
        else:
            return render(request, 'Pagina-02-Login.html', {
                'form': AuthenticationForm(),
                'erro': 'Usuário ou Senha incorretos!'
            })

@login_required 
def pagina3(request):
    if request.user.is_authenticated:
        nome_usuario = request.user.username
        return render(request, 'Pagina-03-Carga_Horaria.html', {'nome_usuario': nome_usuario})
    else:
        # caso o usuário não esteja autenticado
        return redirect('Pagina-02-Login.html')

@login_required 
def pagina4(request):
    if request.user.is_authenticated:
        nome_usuario = request.user.username
        return render(request, 'Pagina-04-Demandas.html', {'nome_usuario': nome_usuario})
    else:
        # caso o usuário não esteja autenticado
        return redirect('Pagina-02-Login.html')

@login_required 
def pagina5(request):
    if request.user.is_authenticated:
        nome_usuario = request.user.username
        return render(request, 'Pagina-05-Cadastros.html', {'nome_usuario': nome_usuario})
    else:
        # caso o usuário não esteja autenticado
        return redirect('Pagina-02-Login.html')

@login_required 
def pagina6(request):
    if request.user.is_authenticated:
        nome_usuario = request.user.username
        return render(request, 'Pagina-06-TADS.html', {'nome_usuario': nome_usuario})
    else:
        # caso o usuário não esteja autenticado
        return redirect('Pagina-02-Login.html')
    
@login_required 
def pagina7(request):
    if request.user.is_authenticated:
        nome_usuario = request.user.username
        return render(request, 'Pagina-07-CadProfessor.html', {'nome_usuario': nome_usuario})
    else:
        # caso o usuário não esteja autenticado
        return redirect('Pagina-02-Login.html')
    
@login_required 
def pagina8(request):
    if request.user.is_authenticated:
        nome_usuario = request.user.username
        return render(request, 'Pagina-08-AnoSemestre.html', {'nome_usuario': nome_usuario})
    else:
        # caso o usuário não esteja autenticado
        return redirect('Pagina-02-Login.html')
    
@login_required 
def pagina9(request):
    if request.user.is_authenticated:
        nome_usuario = request.user.username
        return render(request, 'Pagina-09-Disciplinas.html', {'nome_usuario': nome_usuario})
    else:
        # caso o usuário não esteja autenticado
        return redirect('Pagina-02-Login.html')
    
@login_required 
def pagina10(request):
    if request.user.is_authenticated:
        nome_usuario = request.user.username
        return render(request, 'Pagina-10-Matriz.html', {'nome_usuario': nome_usuario})
    else:
        # caso o usuário não esteja autenticado
        return redirect('Pagina-02-Login.html')

@login_required 
def pagina11(request):
    if request.user.is_authenticated:
        nome_usuario = request.user.username
        return render(request, 'Pagina-11-Atividades.html', {'nome_usuario': nome_usuario})
    else:
        # caso o usuário não esteja autenticado
        return redirect('Pagina-02-Login.html')


# --------------------- API Serializers --------------------------
    
# views.py

class MyTokenObtainPairView(TokenObtainPairView):
    permission_classes = (AllowAny,)

class MatrizViewSet(viewsets.ModelViewSet):
    queryset = Matriz.objects.all()
    serializer_class = MatrizSerializer

class NivelDeEnsinoViewSet(viewsets.ModelViewSet):
    queryset = NivelDeEnsino.objects.all()
    serializer_class = NivelDeEnsinoSerializer

class SemestreViewSet(viewsets.ModelViewSet):
    queryset = Semestre.objects.all()
    serializer_class = SemestreSerializer

class AtividadeAdministrativaViewSet(viewsets.ModelViewSet):
    queryset = AtividadeAdministrativa.objects.all()
    serializer_class = AtividadeAdministrativaSerializer

class CursoViewSet(viewsets.ModelViewSet):
    queryset = Curso.objects.all()
    serializer_class = CursoSerializer

class TurmaModuloViewSet(viewsets.ModelViewSet):
    queryset = TurmaModulo.objects.all()
    serializer_class = TurmaModuloSerializer

class DisciplinaViewSet(viewsets.ModelViewSet):
    queryset = Disciplina.objects.all()
    serializer_class = DisciplinaSerializer

class DemandaViewSet(viewsets.ModelViewSet):
    queryset = Demanda.objects.all()
    serializer_class = DemandaSerializer

class ProfessorViewSet(viewsets.ModelViewSet):
    queryset = Professor.objects.all()
    serializer_class = ProfessorSerializer

class AtividadeAdministrativaProfessorViewSet(viewsets.ModelViewSet):
    queryset = AtividadeAdministrativaProfessor.objects.all()
    serializer_class = AtividadeAdministrativaProfessorSerializer

class ProfessorDisciplinaViewSet(viewsets.ModelViewSet):
    queryset = ProfessorDisciplina.objects.all()
    serializer_class = ProfessorDisciplinaSerializer
