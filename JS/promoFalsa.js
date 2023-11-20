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
    var message = "Claro, o número do sorteio é 12345, e ocorreu em 15 de novembro. Agora, por favor, forneça os detalhes necessários para que possamos processar seu prêmio.";
    var responses = '<div id="balao_resposta" onclick="final_game()"><p>1 - Obrigado pela informação. Antes de prosseguir, gostaria de confirmar a autenticidade da promoção entrando em contato diretamente com a empresa organizadora. Isso é possível?</p></div><div id="balao_resposta" onclick="ganhou()"><p>2 - Agradeço pela oferta, mas prefiro garantir a segurança das minhas informações. Se eu realmente ganhei, ficarei feliz em entrar em contato diretamente com a empresa para confirmar os detalhes.</p></div><div id="balao_resposta" onclick="perdeu()"><p>3 - Ótimo! Aqui estão meus detalhes. Mal posso esperar para receber meu prêmio!</p></div>';
    changeMessage(message, responses);
}

function final_game() {
    var message = "Percebo sua preocupação, mas garantimos que este sorteio é legítimo. No entanto, para processar seu prêmio, precisamos dos seus dados o mais rápido possível.";
    var responses = '<div id="balao_resposta" onclick="perdeu()"><p>1 - Ok, entendo. Estou empolgado para receber meu prêmio! Aqui estão meus detalhes.</p></div><div id="balao_resposta" onclick="perdeu()"><p>2 - Entendi. Vamos prosseguir então. Aqui estão meus detalhes. Mal posso esperar para receber meu prêmio!</p></div><div id="balao_resposta" onclick="ganhou()"><p>3 - Não posso aceitar isso. Se ganhei, devo ter o direito de verificar a autenticidade do prêmio. Se não posso entrar em contato com a empresa, prefiro não prosseguir. Obrigado, mas não estou interessado.</p></div>';
    changeMessage(message, responses);
}

function mudaJogo() {
  window.location.href = 'suporteVerdadeiro.html';
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
