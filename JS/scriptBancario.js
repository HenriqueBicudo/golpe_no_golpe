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
  }, 100);
}

function changeMessage(message, responses) {
  var text1 = document.getElementById("text1");
  var opcaoResposta = document.getElementById("opcao_resposta");

  fadeInOut(text1);
  fadeInOut(opcaoResposta);

  setTimeout(function () {
      text1.innerHTML = message;
      opcaoResposta.innerHTML = responses;
  },50);  
}


// Função para continuar o jogo
function continue_game() {
  var text1 = document.getElementById("text1");
  var opcaoResposta = document.getElementById("opcao_resposta");

  fadeInOut(text1);
  fadeInOut(opcaoResposta);

  setTimeout(function () {
    text1.innerHTML = "Claro, entendo a sua preocupação com a segurança. Aqui está o número do protocolo: BSG123456. Agora, para verificarmos a atividade suspeita em sua conta, preciso que você confirme algumas informações pessoais, como data de nascimento e código de segurança do seu cartão.";
    var continue_response1 = '<div id="balao_resposta" onclick="final_game()"><p>1 - Obrigado por fornecer o número do protocolo. Agora, como medida de segurança adicional, poderíamos agendar uma reunião na agência bancária para discutir esse problema? Isso me deixaria mais tranquilo.</p></div><div id="balao_resposta" onclick="perdeu()"><p>2 - Claro, aqui estão as informações que você pediu: minha data de nascimento é 10/08/1990 e o código de segurança do meu cartão é 123. Por favor, me ajude a resolver isso rapidamente.</p></div><div id="balao_resposta" onclick="ganhou()"><p>3 - Desculpe, mas não me sinto confortável compartilhando minhas informações pessoais por mensagem. Acredito que seja mais seguro resolver isso pessoalmente em uma agência bancária.</p></div>';
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
    text1.innerHTML = "Claro, compreendo a sua preocupação. No entanto, devido à urgência dessa situação, aconselho que evitemos o deslocamento à agência bancária. Vamos continuar aqui para resolver o problema. Agora, para verificarmos as transações suspeitas, precisamos que você confirme sua senha de internet banking.";
    var continue_response1 = '<div id="balao_resposta" onclick="perdeu()"><p>1 - Claro, entendo a urgência. Minha senha de internet banking é 123456. Por favor, verifique as transações rapidamente.</p></div><div id="balao_resposta" onclick="perdeu()"><p>2 - Eu realmente preciso resolver isso logo. Minha senha de internet banking é minhanha123. Por favor, me ajude.</p></div><div id="balao_resposta" onclick="ganhou()"><p>3 - Compreendo a gravidade da situação, mas minha senha é pessoal e confidencial. Vou entrar em contato com o suporte ao cliente agora mesmo para resolver essa situação da maneira mais segura possível.</p></div>';
    opcaoResposta.innerHTML = continue_response1;
  }, 75);
}

function mudaJogo() {
  window.location.href = 'golpeDoPix.html';
}
document.addEventListener('DOMContentLoaded', () => {
  
  const mudaJogoButton = document.getElementById('mudaJogo');

  mudaJogoButton.addEventListener('click', mudaJogo);
});