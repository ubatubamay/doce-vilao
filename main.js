var cadastro = document.getElementById("cadastro");
var quiz = document.getElementById("quiz");
var ques =  document.getElementById("question");
var opcoes =  document.getElementById("opcoes");
var opt1 = document.getElementById("option1");
var opt2 = document.getElementById("option2");
var opt3 = document.getElementById("option3");
var opt4 = document.getElementById("option4");
var res = document.getElementById("result");
var nextbutton = document.getElementById("next");
var responderbutton = document.getElementById("responder");
var q = document.getElementById("quit");
var placarDiv = document.getElementById("placar");
var pontuacaoFinal = document.getElementById("pontuacaoFinal");
var jogadorAtual = '';
var jogador = {};
var placar = [];

var tques = questions.length;
var score = 0;
var quesindex = 0;

function quit() {         
	quiz.style.display = 'none';
	result.style.display = '';
	var f = score/tques;
	result.textContent = "SCORE =" + f*100;
	q.style.display = "none";
}

function esconderQuiz() {         
	quiz.style.display = 'none';
	q.style.display = "none";
}

function esconderResultado() {         
	result.style.display = 'none';
}

function esconderCadastro() {         
	cadastro.style.display = 'none';
}
function esconderPlacar() {         
	placarDiv.style.display = 'none';
}

function mostrarQuiz() {
	quiz.style.display = '';
	q.style.display = "";
}

function mostrarResultado() {
	result.style.display = '';
}

function mostrarCadastro() {
	cadastro.style.display = "";
}

function mostrarPlacar() {
	placarDiv.style.display = "";
}

function give_ques(quesindex) {	
	ques.textContent = quesindex+1 +". "+ questions[quesindex].pergunta;

	if(questions[quesindex].tipo == 'objetivaTexto') {
		var listaDeOpcoes = '';
		for(j=0; j<questions[quesindex].opcoes.length; j++) {
			listaDeOpcoes+= '<label class="option" onclick="ativaSeClicado(this)"><input type="radio" name="option" value="'+questions[quesindex].opcoes[j].indice+'" /><span id="option'+(quesindex+1)+'">'+questions[quesindex].opcoes[j].opcao+'</span></label>';
		}

		opcoes.innerHTML = listaDeOpcoes;
	}

	if(questions[quesindex].tipo == 'objetivaImagens') {
		var listaDeOpcoes = '';
		var conteudoTabelaOpcao = "<table id='tabelaOpcao'>";
		conteudoTabelaOpcao += '<tr>'+
			'<td>'+
				'<input type="radio" id="option1" name="option" value="'+questions[quesindex].opcoes[0].indice+'" />'+
				'<label for="option1"><img src="'+questions[quesindex].opcoes[0].imagem+'"/></label>'+
			'</td>'+
			'<td>'+
				'<input type="radio" id="option2" name="option" value="'+questions[quesindex].opcoes[1].indice+'" />'+
				'<label for="option2"><img src="'+questions[quesindex].opcoes[1].imagem+'"/></label>'+
			'</td>'+
		'</tr>'+
		'<tr>'+
			'<td>'+questions[quesindex].opcoes[0].opcao+'</td>'+
			'<td>'+questions[quesindex].opcoes[1].opcao+'</td>'+
		'</tr>'+

		'<tr>'+
			'<td>'+
				'<input type="radio" id="option3" name="option" value="'+questions[quesindex].opcoes[2].indice+'" />'+
				'<label for="option3"><img src="'+questions[quesindex].opcoes[2].imagem+'"/></label>'+
			'</td>'+
			'<td>'+
				'<input type="radio" id="option4" name="option" value="'+questions[quesindex].opcoes[3].indice+'" />'+
				'<label for="option4"><img src="'+questions[quesindex].opcoes[3].imagem+'"/><label>'+
			'</td>'+
		'</tr>'+
		'<tr>'+
			'<td>'+questions[quesindex].opcoes[2].opcao+'</td>'+
			'<td>'+questions[quesindex].opcoes[3].opcao+'</td>'+
		'</tr>';
		conteudoTabelaOpcao += '</table>';
		opcoes.innerHTML = conteudoTabelaOpcao;
	}

	return;// body...
};

function removeClassFromAll(elementClassName, className) {
	var elementos = document.getElementsByClassName(elementClassName);
	for (var b=0; b<elementos.length; b++) {
		elementos[b].classList.remove(className);
	}
}

function ativaSeClicado(elemento) {
	removeClassFromAll('option', 'active')
	elemento.classList.add('active');
}

function jogar() {
	jogadorAtual = document.getElementById("inputNome").value;
	if (jogadorAtual == "") {
		alert('DIGITE UM NOME');
		return;
	}
	esconderCadastro();
	mostrarQuiz();
	nextbutton.setAttribute('disabled', true);

}

function ordenarTabela() {
	var listTabela = placar;
	listTabela .sort(function (a, b) {
			var keyA = a.pontos,
					keyB = b.pontos;
			if (keyA > keyB) return -1;
			if (keyA < keyB) return 1;
			return 0;
	});
	placar = listTabela;
}

function novoJogo() {
	quiz.classList.remove('correto');
	ques.classList.remove('correto');
	quiz.classList.remove('errado');
	ques.classList.remove('errado');
	responderbutton.removeAttribute('disabled');
	nextbutton.setAttribute('disabled', true);
	document.getElementById("inputNome").value = '';
	jogador = {};
	jogadorAtual = '';
	score = 0;
	tques = questions.length;
	quesindex = 0;
	nextbutton.textContent = "PRÓXIMA PERGUNTA";
	esconderResultado();
	esconderQuiz();
	esconderPlacar();
	mostrarCadastro();
	give_ques(0);
}

function verPlacar() {
	ordenarTabela();
	esconderResultado();
	esconderCadastro();
	esconderQuiz();
	mostrarPlacar();
	var tabela = document.getElementById('tabelaPlacar');
	if (!tabela) {
		tabela = document.createElement('table');
		tabela.setAttribute('id', 'tabelaPlacar')
		placarDiv.appendChild(tabela);
	}
	var conteudoTabela = "<tr><th>Nome</th><th>Pontos</th></tr>";
	for (var i = 0; i<placar.length; i++) {
		conteudoTabela += "<tr><td>"+placar[i].nome+"</td>"+"<td>"+placar[i].pontos+"</td></tr>";
	}
	tabela.innerHTML = conteudoTabela;	
}

esconderQuiz();
give_ques(0);

function nextques() {
	var selected_ans = document.querySelector('input[type=radio]:checked');
	if(!selected_ans) {
		alert("SELECIONE UMA OPÇÃO");
		return;
	}

	quiz.classList.remove('correto');
	ques.classList.remove('correto');
	quiz.classList.remove('errado');
	ques.classList.remove('errado');
	selected_ans.checked = false;
	responderbutton.removeAttribute('disabled');
	nextbutton.setAttribute('disabled', true);
	quesindex++;


	if( quesindex == tques-1 ) {
		nextbutton.textContent = "FIM";
	}
	
	if(quesindex == tques) {
		q.style.display = 'none';
		quiz.style.display = 'none';
		result.style.display = '';
		pontuacaoFinal.textContent = "PONTOS: " + score;
		jogador = {nome: jogadorAtual, pontos: score}
		placar.push(jogador);
		ordenarTabela();
		return;
	}
	
	give_ques(quesindex);

}

function responder() {
	var selected_ans = document.querySelector('input[type=radio]:checked');
	if(!selected_ans) {
		alert("SELECIONE UMA OPÇÃO");
		return;
	}

	if(selected_ans.value == questions[quesindex].resposta) {
		score = score + 1;
		quiz.classList.add('correto');
		ques.classList.add('correto');
		selected_ans.parentElement.classList.add('correto');
		// mensagem de correto
		// modal abrir ovo
	} else {
		quiz.classList.add('errado');
		ques.classList.add('errado');
		selected_ans.parentElement.classList.add('errado');
	}

	nextbutton.removeAttribute('disabled');
	responderbutton.setAttribute('disabled', true);
}