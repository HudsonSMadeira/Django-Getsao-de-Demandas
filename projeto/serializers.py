# serializers.py
from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from .models import (Matriz, NivelDeEnsino, Semestre, AtividadeAdministrativa, 
                     Curso, TurmaModulo, Disciplina, Demanda, Professor, 
                     AtividadeAdministrativaProfessor, ProfessorDisciplina)

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        username = data.get("username")
        password = data.get("password")

        if username and password:
            user = authenticate(username=username, password=password)
            if user:
                data["user"] = user
            else:
                raise serializers.ValidationError("Usuário ou senha incorretos")
        else:
            raise serializers.ValidationError("Todos os campos são obrigatórios")
        
        return data
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
