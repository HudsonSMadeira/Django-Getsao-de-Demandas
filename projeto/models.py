from django.db import models

class Matriz(models.Model):
    id_matriz = models.AutoField(primary_key=True)
    ano_matriz = models.IntegerField()

    def __str__(self) -> str:
        return self.ano_matriz
    
class NivelDeEnsino(models.Model):
    id_nivel = models.IntegerField(primary_key=True)
    nome_nivel = models.CharField(max_length=40)
    turno_de_funcionamento = models.CharField(max_length=30)

class Semestre(models.Model):
    ano = models.IntegerField()
    semestre = models.IntegerField()
    primary_key = models.DateTimeField('primary_key', default=None)

class AtividadeAdministrativa(models.Model):
    id_atividade = models.IntegerField(primary_key=True)
    carga_horaria_semanal = models.IntegerField()

class Curso(models.Model):
    id_curso = models.IntegerField(primary_key=True)
    nome_curso = models.CharField(max_length=60)
    matriz = models.ForeignKey(Matriz, on_delete=models.CASCADE)
    nivel = models.ForeignKey(NivelDeEnsino, on_delete=models.CASCADE)

class TurmaModulo(models.Model):
    codigo_turma = models.CharField(primary_key=True, max_length=255)
    curso = models.ForeignKey(Curso, on_delete=models.CASCADE)

class Disciplina(models.Model):
    id_disciplina = models.IntegerField(primary_key=True)
    nome = models.CharField(max_length=50)
    observacao = models.CharField(max_length=255)
    carga_horario_semestral = models.IntegerField()
    carga_horario_semanal = models.IntegerField()
    turma = models.ForeignKey(TurmaModulo, on_delete=models.CASCADE)

class Demanda(models.Model):
    id_demanda = models.IntegerField(primary_key=True)
    ano_fk = models.IntegerField()
    semestre_fk = models.IntegerField()
    semestre = models.ForeignKey(Semestre, on_delete=models.CASCADE)

class Professor(models.Model):
    matricula = models.PositiveIntegerField(primary_key=True)
    nome_professor = models.CharField(max_length=255)

class AtividadeAdministrativaProfessor(models.Model):
    id_atividade_professor = models.IntegerField(primary_key=True)
    atividade = models.ForeignKey(AtividadeAdministrativa, on_delete=models.CASCADE)
    professor = models.ForeignKey(Professor, on_delete=models.CASCADE)
    date_inicio = models.DateField()
    date_fim = models.DateField()

class ProfessorDisciplina(models.Model):
    demanda = models.ForeignKey(Demanda, on_delete=models.CASCADE)
    professor = models.ForeignKey(Professor, on_delete=models.CASCADE)
    primary_key = models.CharField('primary_key', default=None)

