-- Verifica se o banco de dados Loja existe e o apaga
DROP DATABASE IF EXISTS Loja;

-- Cria o banco de dados Loja
CREATE DATABASE Loja;

-- Usa o banco de dados Loja
USE Loja;

-- Criação da tabela Estado
CREATE TABLE Estado (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    Nome VARCHAR(100) NOT NULL,
    UF CHAR(2) NOT NULL
);

-- Criação da tabela Municipio
CREATE TABLE Municipio (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    Nome VARCHAR(100) NOT NULL,
    UF CHAR(2) NOT NULL,
    ID_Estado INT,
    FOREIGN KEY (ID_Estado) REFERENCES Estado(ID)
);

-- Criação da tabela Cliente
CREATE TABLE Cliente (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    Nome VARCHAR(100) NOT NULL,
    Email VARCHAR(100),
    Telefone VARCHAR(20),
    Endereco VARCHAR(200),
    ID_Municipio INT,
    FOREIGN KEY (ID_Municipio) REFERENCES Municipio(ID)
);

-- Criação da tabela Contas_a_Pagar
CREATE TABLE Contas_a_Pagar (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    Descricao VARCHAR(255) NOT NULL,
    Valor DECIMAL(10, 2) NOT NULL,
    Data_Vencimento DATE NOT NULL,
    Pago BOOLEAN DEFAULT FALSE,
    ID_Fornecedor INT,
    FOREIGN KEY (ID_Fornecedor) REFERENCES Cliente(ID)
);

-- Criação da tabela Contas_a_Receber
CREATE TABLE Contas_a_Receber (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    Descricao VARCHAR(255) NOT NULL,
    Valor DECIMAL(10, 2) NOT NULL,
    Data_Vencimento DATE NOT NULL,
    Recebido BOOLEAN DEFAULT FALSE,
    ID_Cliente INT,
    FOREIGN KEY (ID_Cliente) REFERENCES Cliente(ID)
);

-- Inserção de valores na tabela Estado
INSERT INTO Estado (Nome, UF) VALUES
('Bahia', 'BA'),
('São Paulo', 'SP'),
('Rio de Janeiro', 'RJ');

-- Inserção de valores na tabela Municipio
INSERT INTO Municipio (Nome, UF, ID_Estado) VALUES
('Itabuna', 'BA', 1),
('Salvador', 'BA', 1),
('São Paulo', 'SP', 2),
('Campinas', 'SP', 2),
('Rio de Janeiro', 'RJ', 3),
('Niterói', 'RJ', 3);

-- Inserção de valores na tabela Cliente
INSERT INTO Cliente (Nome, Email, Telefone, Endereco, ID_Municipio) VALUES
('Elias Melo', 'elias.melo@email.com', '(73) 98128-5678', 'Rua A, 123', 1),
('Maria Oliveira', 'maria.oliveira@email.com', '(21) 9876-5432', 'Avenida B, 456', 2),
('Carlos Souza', 'carlos.souza@email.com', '(31) 1122-3344', 'Rua C, 789', 3),
('Ana Santos', 'ana.santos@email.com', '(41) 5566-7788', 'Travessa D, 321', 4),
('Beatriz Costa', 'beatriz.costa@email.com', '(51) 9988-7766', 'Praça E, 654', 5);

-- Inserção de dados na tabela Contas_a_Pagar
INSERT INTO Contas_a_Pagar (Descricao, Valor, Data_Vencimento, Pago, ID_Fornecedor) VALUES
('Pagamento de Internet', 150.00, '2024-11-15', FALSE, 1),
('Aluguel do Escritório', 1200.00, '2024-11-10', TRUE, 2),
('Compra de Materiais', 500.00, '2024-12-01', FALSE, 3);

-- Inserção de dados na tabela Contas_a_Receber
INSERT INTO Contas_a_Receber (Descricao, Valor, Data_Vencimento, Recebido, ID_Cliente) VALUES
('Venda de Produtos', 200.00, '2024-11-20', FALSE, 1),
('Serviço de Consultoria', 1500.00, '2024-11-25', TRUE, 2),
('Manutenção Técnica', 300.00, '2024-12-05', FALSE, 3);

-- Exibe todos os registros das tabelas para verificar as inserções
SELECT * FROM Estado;
SELECT * FROM Municipio;
SELECT * FROM Cliente;

-- Exibe as contas a pagar com informações do fornecedor
SELECT cp.ID, cp.Descricao, cp.Valor, cp.Data_Vencimento, cp.Pago, c.Nome AS Fornecedor
FROM Contas_a_Pagar cp
JOIN Cliente c ON cp.ID_Fornecedor = c.ID;

-- Exibe as contas a receber com informações do cliente
SELECT cr.ID, cr.Descricao, cr.Valor, cr.Data_Vencimento, cr.Recebido, c.Nome AS Cliente
FROM Contas_a_Receber cr
JOIN Cliente c ON cr.ID_Cliente = c.ID;
