CREATE TABLE Pessoa ( 
	Nome                 TEXT     ,
	Id                   INTEGER NOT NULL  PRIMARY KEY  ,
	CONSTRAINT unq_Pessoa_Id UNIQUE ( Id )
 );

CREATE TABLE Competencias ( 
	Habilidades          INTEGER     ,
	id                   INTEGER NOT NULL    ,
	FOREIGN KEY ( id ) REFERENCES Pessoa( Id )  
 );

CREATE TABLE Experiencias ( 
	Local                TEXT     ,
	id                   INTEGER NOT NULL    ,
	FOREIGN KEY ( id ) REFERENCES Pessoa( Id )  
 );

CREATE TABLE Formação ( 
	Instituição          TEXT     ,
	Id                   INTEGER NOT NULL    ,
	FOREIGN KEY ( Id ) REFERENCES Pessoa( Id )  
 );
