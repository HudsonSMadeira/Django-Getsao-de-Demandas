from rest_framework import serializers
from .models import *

class MatrizSrializers(serializers.ModelSerializer):
    class Meta:
        model = Matriz
        fields = '__all__'
        many = True

class NivelDeEnsinoSerializers(serializers.ModelSerializer):
    class Meta:
        model = NivelDeEnsino
        fields = '__all__'
        many = True

class SemestreSerializers(serializers.ModelSerializer):
    class Meta:
        model = Semestre
        fields = '__all__'
        many = True

class AtividadeAdministrativaSerializers(serializers.ModelSerializer):
    class Meta:
        model = AtividadeAdministrativa
        fields = '__all__'
        many = True

class CursoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Curso
        fields = '__all__'
        many = True

class TurmaModuloSerializer(serializers.ModelSerializer):
    class Meta:
        model = TurmaModulo
        fields = '__all__'
        many = True

class DisciplinaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Disciplina
        fields = '__all__'
        many = True

class DemandaSrializer(serializers.ModelSerializer):
    class Meta:
        model = Demanda
        fields = '__all__'
        many = True

class ProfessorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Professor
        fields = '__all__'
        many = True

class AtividadeAdministrativaProfessorSerializer(serializers.ModelSerializer):
    class Meta:
        model = AtividadeAdministrativaProfessor
        fields = '__all__'
        many = True

class ProfessorDisciplinaSerializers(serializers.ModelSerializer):
    class meta:
        model = ProfessorDisciplina
        fields = '__all__'
        many = True

