document.getElementById("checklistForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const ganhos = parseFloat(document.getElementById("ganhos").value);
  const horas = parseFloat(document.getElementById("horas").value);
  const viagens = parseInt(document.getElementById("viagens").value);

  if (isNaN(ganhos) || isNaN(horas) || isNaN(viagens) || horas <= 0 || viagens <= 0) {
    document.getElementById("resultado").innerHTML = "⚠️ Preencha todos os campos corretamente.";
    return;
  }

  const ganhoHora = ganhos / horas;
  const ganhoViagem = ganhos / viagens;
  const eficiencia = ((ganhoHora / 47) * 40) + ((ganhoViagem / 18) * 30) + ((viagens / (horas * 3)) * 30);
  const eficienciaFinal = eficiencia > 100 ? 100 : eficiencia;

  // Recomendações detalhadas
  let recomendacao = "<h3>📌 Recomendação Automática</h3>";

  // Avaliar ganhos totais
  if (ganhos >= 360) {
    recomendacao += "💰 Ganhos totais estão dentro do esperado. Mantenha o padrão.<br>";
  } else {
    recomendacao += "💡 Ganhos totais abaixo da meta. Foque em corridas melhores e horários de pico.<br>";
  }

  // Avaliar horas online
  if (horas <= 7.5) {
    recomendacao += "⏱ Horas online adequadas. Não exceda para evitar fadiga.<br>";
  } else {
    recomendacao += "⚠️ Horas online acima do recomendado. Considere pausas para manter eficiência.<br>";
  }

  // Avaliar ganhos/hora
  if (ganhoHora >= 47) {
    recomendacao += `🚀 Ganhos por hora (${ganhoHora.toFixed(2)}) excelentes. Continue priorizando corridas lucrativas.<br>`;
  } else if (ganhoHora >= 40) {
    recomendacao += `👍 Ganhos por hora (${ganhoHora.toFixed(2)}) bons. Mantenha foco nas melhores corridas.<br>`;
  } else {
    recomendacao += `⚠️ Ganhos por hora (${ganhoHora.toFixed(2)}) abaixo da meta. Aceite apenas corridas com boa taxa R$/km e R$/h.<br>`;
  }

  // Avaliar ganhos/viagem
  if (ganhoViagem >= 18) {
    recomendacao += `🏆 Ganhos por viagem (${ganhoViagem.toFixed(2)}) ótimos. Continue focando em corridas médias (10–25 min).<br>`;
  } else if (ganhoViagem >= 12) {
    recomendacao += `✅ Ganhos por viagem (${ganhoViagem.toFixed(2)}) bons. Evite corridas curtas (R$5–7).<br>`;
  } else {
    recomendacao += `❌ Ganhos por viagem (${ganhoViagem.toFixed(2)}) baixos. Priorize corridas lucrativas e revise região/hora.<br>`;
  }

  // Avaliar eficiência geral
  if (eficienciaFinal >= 90) {
    recomendacao += `🌟 Eficiência geral: ${eficienciaFinal.toFixed(2)}% - Excelente! Mantenha ritmo.<br>`;
  } else if (eficienciaFinal >= 75) {
    recomendacao += `⚡ Eficiência geral: ${eficienciaFinal.toFixed(2)}% - Boa, mas atenção às oportunidades.<br>`;
  } else {
    recomendacao += `⚠️ Eficiência geral: ${eficienciaFinal.toFixed(2)}% - Ajuste a estratégia, escolha corridas lucrativas e horários de pico.<br>`;
  }

  // Estratégia de horário
  recomendacao += "⏰ Trabalhe nos picos (manhã cedo e fim da tarde/noite). Observe sempre a dinâmica ativa para aceitar apenas boas chamadas.<br>";

  document.getElementById("resultado").innerHTML = `
    <h3>📊 Resultados</h3>
    <p><strong>Ganhos/Hora:</strong> R$ ${ganhoHora.toFixed(2)}</p>
    <p><strong>Ganhos/Viagem:</strong> R$ ${ganhoViagem.toFixed(2)}</p>
    <p><strong>Eficiência Geral:</strong> ${eficienciaFinal.toFixed(2)}%</p>
    ${recomendacao}
  `;
});
