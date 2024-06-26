# serializers.py
from rest_framework import serializers
from django.contrib.auth.models import User
from .models import (Matriz, NivelDeEnsino, Semestre, AtividadeAdministrativa, 
                     Curso, TurmaModulo, Disciplina, Demanda, Professor, 
                     AtividadeAdministrativaProfessor, ProfessorDisciplina)

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [ 'username', 'password' ]

class MatrizSerializer(serializers.ModelSerializer):
    class Meta:
        model = Matriz
        fields = '__all__'

class NivelDeEnsinoSerializer(serializers.ModelSerializer):
    class Meta:
        model = NivelDeEnsino
        fields = '__all__'

class SemestreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Semestre
        fields = '__all__'

class AtividadeAdministrativaSerializer(serializers.ModelSerializer):
    class Meta:
        model = AtividadeAdministrativa
        fields = '__all__'

class CursoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Curso
        fields = '__all__'

class TurmaModuloSerializer(serializers.ModelSerializer):
    class Meta:
        model = TurmaModulo
        fields = '__all__'

class DisciplinaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Disciplina
        fields = '__all__'

class DemandaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Demanda
        fields = '__all__'

class ProfessorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Professor
        fields = ['nome_professor', 'matricula', 'observacao_professor']

class AtividadeAdministrativaProfessorSerializer(serializers.ModelSerializer):
    class Meta:
        model = AtividadeAdministrativaProfessor
        fields = '__all__'

class ProfessorDisciplinaSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProfessorDisciplina
        fields = '__all__'
