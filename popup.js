document.getElementById("resumirBtn").addEventListener("click", async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript(
    {
      target: { tabId: tab.id },
      func: () => window.getSelection().toString()
    },
    (injectionResults) => {
      const selectedText = injectionResults[0].result;
      const resultadoDiv = document.getElementById("resultado");

      if (!selectedText) {
        resultadoDiv.innerText = "Selecione algum texto na página.";
        return;
      }

      resultadoDiv.innerText = "Resumindo localmente...";

      
      const resumo = resumirTextoSimples(selectedText, 5);

      resultadoDiv.innerText = resumo || "Não foi possível gerar resumo.";
    }
  );
});

function resumirTextoSimples(texto, maxFrases = 5) {
  const frases = texto.match(/[^\.!\?]+[\.!\?]+/g) || [];
  return frases.slice(0, maxFrases).join(' ').trim();
}
