----------------------------funçoes_adicionar--------------------


-------------------------------tabelas---------------------------
CREATE TABLE Matriz (
	id_matriz INTEGER NOT NULL,
	ano_matriz INTEGER NOT NULL,
	PRIMARY KEY (id_matriz)
);

CREATE TABLE nivel_de_ensino (
	id_nivel INTEGER NOT NULL,
	nome_nivel VARCHAR(40) NOT NULL,
	turno_de_fucionamento VARCHAR(30) NOT NULL,
	PRIMARY KEY (id_nivel)
);

CREATE TABLE semestre (
    ano INTEGER NOT NULL,
    semestre INTEGER NOT NULL,
    PRIMARY KEY (ano, semestre)
);

CREATE TABLE atividades_administrativas (
	id_atividade INTEGER NOT NULL,
	carga_horaria_semanal INTEGER NOT NULL,
	PRIMARY KEY (id_atividade)
);

CREATE TABLE curso (
	id_curso INTEGER NOT NULL,
	nome_curso VARCHAR(60) NOT NULL,
	matriz_id INTEGER,
	nevel_id INTEGER,
	PRIMARY KEY (id_curso),
	FOREIGN KEY (matriz_id) REFERENCES Matriz (id_matriz),
	FOREIGN KEY (nevel_id) REFERENCES nivel_de_ensino (id_nivel)
);

CREATE TABLE turma_modulo (
	codigo_turma VARCHAR NOT NULL,
	curso_id INTEGER,
	PRIMARY KEY (codigo_turma),
	FOREIGN KEY (curso_id) REFERENCES curso (id_curso)
);

CREATE TABLE disciplina (
	id_disciplina INTEGER NOT NULL,
	nome VARCHAR(50) NOT NULL,
	observacao VARCHAR NOT NULL,
	carga_horario_semestral INTEGER NOT NULL,
	carga_horario_semanal INTEGER NOT NULL,
	turma_codigo VARCHAR NOT NULL,
	PRIMARY KEY (id_disciplina),
	FOREIGN KEY (turma_codigo) REFERENCES turma_modulo (codigo_turma)
);

CREATE TABLE demanda (
    id_demanda INTEGER NOT NULL,
    ano_fk INTEGER,
    semestre_fk INTEGER,
    PRIMARY KEY (id_demanda),
    FOREIGN KEY (ano_fk, semestre_fk) REFERENCES semestre (ano, semestre)
);

CREATE TABLE professor (
	matricula NUMERIC(8) NOT NULL,
	nome_professor VARCHAR NOT NULL,
	PRIMARY KEY (matricula)
);

CREATE TABLE atividades_administrativas_professor(
	id_atividade_professor INTEGER NOT NULL,
	atividade_id INTEGER,
	prof_matricula NUMERIC(8),
	date_inicio DATE NOT NULL,
	date_fim DATE NOT NULL,
	PRIMARY KEY (id_atividade_professor),
	FOREIGN KEY (atividade_id) REFERENCES atividades_administrativas (id_atividade),
	FOREIGN KEY (prof_matricula) REFERENCES professor (matricula)
);

CREATE TABLE professor_disciplina (
	demanda_id INTEGER NOT NULL,
	matricula_fk NUMERIC(8) NOT NULL,
	FOREIGN KEY (demanda_id) REFERENCES demanda (id_demanda),
	FOREIGN KEY (matricula_fk) REFERENCES professor (matricula)
);