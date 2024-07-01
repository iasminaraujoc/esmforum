const bd = require('../bd/bd_utils.js');
const modelo = require('../modelo.js');

beforeEach(() => {
  bd.reconfig('./bd/esmforum-teste.db');
  // limpa dados de todas as tabelas
  bd.exec('delete from perguntas', []);
  bd.exec('delete from respostas', []);
});

test('Testando banco de dados vazio', () => {
  expect(modelo.listar_perguntas().length).toBe(0);
});

test('Testando cadastro de três perguntas', () => {
  modelo.cadastrar_pergunta('1 + 1 = ?');
  modelo.cadastrar_pergunta('2 + 2 = ?');
  modelo.cadastrar_pergunta('3 + 3 = ?');
  const perguntas = modelo.listar_perguntas(); 
  expect(perguntas.length).toBe(3);
  expect(perguntas[0].texto).toBe('1 + 1 = ?');
  expect(perguntas[1].texto).toBe('2 + 2 = ?');
  expect(perguntas[2].num_respostas).toBe(0);
  expect(perguntas[1].id_pergunta).toBe(perguntas[2].id_pergunta-1);
});

test('Testando cadastro de duas respostas para uma pergunta', () => {
  modelo.cadastrar_pergunta('1 + 1 = ?');
  modelo.cadastrar_resposta(1, 'A resposta de 1+1 é 2');
  modelo.cadastrar_resposta(1, '2');
  const respostas = modelo.get_respostas(1); 
  expect(respostas.length).toBe(2);
  expect(respostas[0].texto).toBe('A resposta de 1+1 é 2');
  expect(respostas[1].texto).toBe('2');  
});

test('Testando pergunta sem respostas', () => {
  modelo.cadastrar_pergunta('1 + 1 = ?');
  const respostas = modelo.get_respostas(1); 
  expect(respostas.length).toBe(0);
});

test('Testando número de respostas', () => {
  modelo.cadastrar_pergunta('1 + 1 = ?');
  modelo.cadastrar_resposta(1, 'A resposta de 1+1 é 2');
  modelo.cadastrar_resposta(1, '2');
  const numRespostas = modelo.get_num_respostas(1); 
  expect(numRespostas).toBe(2);
});

test('Testando recuperar pergunta pelo id', () => {
  id = modelo.cadastrar_pergunta('pergunta');
  const pergunta = modelo.get_pergunta(id); 
  expect(pergunta.id_pergunta).toBe(id);
});