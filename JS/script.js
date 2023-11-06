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
    document.getElementById("text1").innerHTML = "Haha, parece que você caiu direitinho na minha armadilha! Agora, seus dados estão em minhas mãos, e não há nada que você possa fazer a respeito. Da próxima vez, talvez pense duas vezes antes de pensar que pode me derrotar. Adeus, e obrigado por contribuir para o meu sucesso!"
    var img_changer = '<div id="img_Perfil"><img src="../components/perfil_perdeu.png" alt=""></div>';
    document.getElementById("img_Perfil").innerHTML = img_changer;
    document.getElementById("msg_fim").innerHTML = '<div id="resposta_fim_de_jogo" style="display: flex"><p id="text1">Infelizmente, você caiu em um golpe e perdeu nesta rodada. Mas não desanime, a segurança é um processo contínuo e aprender com os erros é fundamental. Lembre-se sempre de verificar a fonte das mensagens, desconfiar de promessas muito boas para serem verdade e nunca compartilhar informações pessoais ou financeiras sem verificar a legitimidade. A prevenção é a sua melhor defesa contra golpes. Sinta-se à vontade para tentar novamente e aprimorar suas habilidades de detecção de golpes. Estamos aqui para ajudar você a se tornar mais esperto e protegido no mundo virtual.</p></div><div id="btn_final_div" style="display: flex"><button id="tenteNovamente" class="text1" onclick="refreshPage()">Tentar novamente</button></div></div>'
    var hide_responses = '';
    document.getElementById("container_respostas").innerHTML = hide_responses;
  }
  
  function ganhou() {
    document.getElementById("text1").innerHTML = "Ah, droga! Parece que não conseguimos enganar mais uma pessoa com esse truque. Essas pessoas estão ficando cada vez mais espertas."
    var img_changer = '<div id="img_Perfil"><img src="../components/perfil_ganhou.png" alt=""></div>';
    document.getElementById("img_Perfil").innerHTML = img_changer;
    document.getElementById("msg_fim").innerHTML = '<div id="resposta_fim_de_jogo" style="display: flex"><p id="text1">Parabéns! Você conseguiu dar um golpe no golpe com astúcia e perspicácia. Sua atenção aos detalhes e cautela foram impressionantes. Continue assim, sempre questionando e verificando antes de tomar decisões importantes. Lembre-se, a melhor defesa contra golpes é o conhecimento e a prevenção. Fique seguro e esteja um passo à frente dos golpistas!</p></div><div id="btn_final_div" style="display: flex"><button href="mododejogo.html"><p id="text1">Tentar novamente</p></button></div>'
    var hide_responses = '';
    document.getElementById("container_respostas").innerHTML = hide_responses;
  }
  
  //continua jogo
  function continue_game() {
    document.getElementById("text1").innerHTML = "Claro, entendo a sua preocupação com a segurança. Aqui está o número do protocolo: BSG123456. Agora, para verificarmos a atividade suspeita em sua conta, preciso que você confirme algumas informações pessoais, como data de nascimento e código de segurança do seu cartão."
    var continue_response1 = '<div id="balao_resposta" onclick="final_game()"><p>1 - Obrigado por fornecer o número do protocolo. Agora, como medida de segurança adicional, poderíamos agendar uma reunião na agência bancária para discutir esse problema? Isso me deixaria mais tranquilo.</p></div><div id="balao_resposta" onclick="perdeu()"><p>2 -Claro, aqui estão as informações que você pediu: minha data de nascimento é 10/08/1990 e o código de segurança do meu cartão é 123. Por favor, me ajude a resolver isso rapidamente.</p></div><div id="balao_resposta" onclick="ganhou()"><p>3- Desculpe, mas não me sinto confortável compartilhando minhas informações pessoais por mensagem. Acredito que seja mais seguro resolver isso pessoalmente em uma agência bancária.</p></div>';
    document.getElementById("opcao_resposta").innerHTML = continue_response1;
  }
  
  //tela final
  function final_game() {
    document.getElementById("text1").innerHTML = "Claro, compreendo a sua preocupação. No entanto, devido à urgência dessa situação, aconselho que evitemos o deslocamento à agência bancária. Vamos continuar aqui para resolver o problema. Agora, para verificarmos as transações suspeitas, precisamos que você confirme sua senha de internet banking."
    var continue_response1 = '<div id="balao_resposta" onclick="perdeu()"><p>1 - Claro, entendo a urgência. Minha senha de internet banking é 123456. Por favor, verifique as transações rapidamente.</p></div><div id="balao_resposta" onclick="perdeu()"><p>2 - Eu realmente preciso resolver isso logo. Minha senha de internet banking é minhanha123. Por favor, me ajude.</p></div><div id="balao_resposta" onclick="ganhou()"><p>3 - Compreendo a gravidade da situação, mas minha senha é pessoal e confidencial. Vou entrar em contato com o suporte ao cliente agora mesmo para resolver essa situação da maneira mais segura possível.</p></div>';
    document.getElementById("opcao_resposta").innerHTML = continue_response1;
  }
  