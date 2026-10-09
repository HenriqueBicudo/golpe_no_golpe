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


// Função para continuar o jogo
function continue_game() {
  var text1 = document.getElementById("text1");
  var opcaoResposta = document.getElementById("opcao_resposta");

  fadeInOut(text1);
  fadeInOut(opcaoResposta);

  setTimeout(function () {
    text1.innerHTML = "Então, foi complicado, roubaram meu carro e meu celular, mas estou bem. Obrigado por se preocupar. Mas agora preciso de sua ajuda. Preciso que você transfira R$ 1.000,00 para minha conta. Estou sem celular e não consigo acessar meu internet banking. Você pode fazer isso por mim?";
    
    var continue_response1 = '<div id="balao_resposta" onclick="ganhou()"><p>1 - Sinto muito pela situação, mas não acho que é uma boa ideia. Se quiser, eu peço um Uber para você voltar para casa. O que acha?</p></div><div id="balao_resposta" onclick="final_game()"><p>2 - Vamos pensar em alternativas seguras. Talvez eu possa contatar alguém da sua família ou amigos para ajudar nessa situação.</p></div><div id="balao_resposta" onclick="perdeu()"><p>3 - Bom, eu não consigo os seus mil reais, mas metade eu consigo pra te ajudar. Vou transferir 500 reais para esse celular.</p></div>';
    
    opcaoResposta.innerHTML = continue_response1;
  }, 75);
}

// Função para a tela final do jogo
function final_game() {
  var text1 = document.getElementById("text1");
  var opcaoResposta = document.getElementById("opcao_resposta");

  fadeInOut(text1);
  fadeInOut(opcaoResposta);

  setTimeout(function () {
    text1.innerHTML = "Não, não quero envolver ninguém mais nisso. Você é minha única esperança. Se não puder ajudar, estou perdido. Por favor, eu estou desesperado.";
    
    var continue_response1 = '<div id="balao_resposta" onclick="perdeu()"><p>1 - Claro, entendo a urgência. Estou fazendo o PIX para você conseguir resolver seu problema.</p></div><div id="balao_resposta" onclick="perdeu()"><p>2 - A pessoa que pode me ajudar é a Claudineia. O número dela é 41 99193921, e ela tem mais dinheiro para te ajudar. Se estiver perto do bairro Santa Maria, ela mora na rua João do Carmo.</p></div><div id="balao_resposta" onclick="ganhou()"><p>3 - Bom, você não me pareceu muito convincente. Se quiser, pode me ligar ou qualquer outra coisa que prove que é quem diz ser, mas não vou transferir dinheiro nenhum até ter certeza se é você mesmo.</p></div>';
    
    opcaoResposta.innerHTML = continue_response1;
  }, 75);
}

function mudaJogo() {
  window.location.href = 'promoFalsa.html';
}

document.addEventListener('DOMContentLoaded', () => {
  const mudaJogoButton = document.getElementById('mudaJogo');
  mudaJogoButton.addEventListener('click', mudaJogo);
});
