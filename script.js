 const URL_CSV = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSVZqqB69Q0odqdX9f9agouRKyqgjK2cdAstWra6-bKHAibzlxyxbrprmyXUFDEOjkaQpUIlq8UDSxq/pub?gid=1936348581&single=true&output=csv";

async function carregarConfirmados() {
  const res = await fetch(URL_CSV);
  const data = await res.text();
  const linhas = data.split("\n").slice(1);
  let html = "";

  let count = 0;
  for (const linha of linhas) {
    const colunas = linha.split(",");
    const nome = colunas[1]?.trim(); // Nome
    const presença = colunas[2]?.trim(); // Comparecer?
    const fralda = colunas[3]?.trim(); // Fralda

    if (presença === "Sim") {
      html += `<div class="confirmado-item">
        <strong>${nome}</strong><br/>
        Fralda: ${fralda}
      </div>`;
      count++;
    }

    if (count % 2 === 0 && count !== 0) {
      html += `<hr style="border-top:1px dashed #ccc"/>`;
    }
  }

  document.getElementById("lista-confirmados").innerHTML = html || "Nenhuma confirmação ainda.";
}

carregarConfirmados();
setInterval(carregarConfirmados, 60000); // atualiza a cada 1 min
