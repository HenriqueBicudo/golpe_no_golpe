function fadeInOut(element) {
  element.style.opacity = 0;
  element.style.display = 'block';

  var op = 0.1; 
  var timerIn = setInterval(function () {
      if (op >= 1) {
          clearInterval(timerIn);
          setTimeout(function () {
              fadeOut(element);
          }, 2000);  
      }
      element.style.opacity = op;
      op += 0.1;
  }, 150);
}

function changeMessage(message, responses) {
  var text1 = document.getElementById("text1");
  var opcaoResposta = document.getElementById("opcao_resposta");

  fadeInOut(text1);
  fadeInOut(opcaoResposta);

  setTimeout(function () {
      text1.innerHTML = message;
      opcaoResposta.innerHTML = responses;
  },75);  
}

function continue_game() {
  var message = "Compreendemos a sua preocupação com a segurança. Para garantir a legitimidade, você pode verificar nossa identidade ligando para o número oficial da empresa, listado no site. Enquanto isso, podemos fornecer mais informações sobre o problema que estamos detectando em sua conta.";
  var responses = '<div id="balao_resposta" onclick="final_game()"><p>1 - Agradeço pela orientação. Posso verificar minha conta no site oficial e entrar em contato com o suporte. Me dê mais detalhes sobre o problema que vocês estão detectando.</p></div><div id="balao_resposta" onclick="ganhou()"><p>2 - Isso parece razoável. Vou entrar em contato com o número oficial da empresa para confirmar.</p></div><div id="balao_resposta" onclick="perdeu()"><p>3 - Não estou convencido. Não vou fornecer mais informações. Estou encerrando a conversa.</p></div>';
  changeMessage(message, responses);
}

function final_game() {
  var message = "Ótimo! Você está certo em ser cauteloso. Para confirmar, entre em contato conosco através do número oficial da empresa e verifique a situação diretamente com nosso suporte. Quanto ao problema de segurança, estamos detectando atividades incomuns em sua conta, e podemos ajudá-lo a tomar as medidas necessárias para garantir a segurança da sua conta.";
  var responses = '<div id="balao_resposta" onclick="perdeu()"><p>1 - Não, isso ainda parece suspeito demais para mim. Não vou seguir adiante com isso. Estou encerrando a conversa.</p></div><div id="balao_resposta" onclick="perdeu()"><p>2 - Acho que não preciso de mais detalhes. Já estou cuidando disso por conta própria. Encerro a conversa aqui.</p></div><div id="balao_resposta" onclick="ganhou()"><p>3 - Excelente! Vou entrar em contato com o suporte oficial agora mesmo. Quanto ao problema de segurança, ficarei atento às instruções de vocês. Obrigado pela assistência!</p></div>';
  changeMessage(message, responses);
}

function mudaJogo() {
  window.location.href = 'golpeBancario.html';
}
document.addEventListener('DOMContentLoaded', () => {
  
  const mudaJogoButton = document.getElementById('mudaJogo');

  mudaJogoButton.addEventListener('click', mudaJogo);
});

function refreshPage() {
  location.reload();
}

document.addEventListener('DOMContentLoaded', () => {
  // Selecione o botão pelo ID
  const tenteNovamente = document.getElementById('tenteNovamente');

  // Adicione um ouvinte de evento de clique para o botão e chame a função refreshPage
  tenteNovamente.addEventListener('click', refreshPage);
});

function perdeu() {
  document.getElementById("text1").innerHTML = "Bom, assim fica complicado exercer meu trabalho, entrarei em contato com seu chefe, pois foi ele quem passou seu contato para prestarmos suporte."
  document.getElementById("msg_fim").innerHTML = '<div id="resposta_fim_de_jogo" style="display: flex"><p id="text1">Essa não era uma situação de golpeLembre-se sempre: a realidade dos golpes muitas vezes se disfarça em situações aparentemente normais. Os golpistas são mestres em imitar a vida real, usando abordagens que parecem autênticas. Mantenha-se atento às sutilezas, pois eles frequentemente adotam uma linguagem profissional para enganar. Continue cultivando a consciência e a vigilância para proteger-se contra possíveis fraudes. Sua habilidade em distinguir a verdade da falsidade é uma ferramenta valiosa na prevenção de golpes. Fique seguro e esteja sempre atento às pistas que podem revelar a verdade por trás das aparências. O conhecimento é sua melhor defesa contra os golpes!</p></div><div id="btn_final_div" style="display: flex"><button id="tenteNovamente" class="text1" onclick="refreshPage()">Tentar novamente</button></div></div>'
  var hide_responses = '';
  document.getElementById("container_respostas").innerHTML = hide_responses;
}

function ganhou() {
  document.getElementById("text1").innerHTML = "Recebi a informação de que você verificou se o suporte foi acionado. Fico satisfeito em saber que você está atento aos detalhes. No entanto, não se preocupe, pois o suporte já foi acionado e está em contato."    
  document.getElementById("msg_fim").innerHTML = '<div id="resposta_fim_de_jogo" style="display: flex"><p id="text1">Desta vez, não era uma situação de golpe, mas isso destaca a importância de permanecermos sempre alertas. Os golpistas são especialistas em criar cenários que parecem genuínos, e a sua capacidade de discernir a autenticidade é fundamental. Continue aprimorando sua vigilância, pois a prevenção é a melhor defesa. Esteja atento às pistas sutis e mantenha-se informado para proteger-se contra possíveis fraudes. A jornada da conscientização nunca termina, e sua dedicação em reconhecer possíveis golpes é uma habilidade valiosa. Continue a ser um defensor da segurança e da honestidade. Parabéns mais uma vez e esteja sempre alerta!</p></div><div id="btn_final_div" style="display: flex"><button id="mudaJogo" onclick="mudaJogo()"><p id="text1">Tentar outro Jogo</p></button></div>'
  var hide_responses = '';
  document.getElementById("container_respostas").innerHTML = hide_responses;
}
