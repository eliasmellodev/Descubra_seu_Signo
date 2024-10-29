document.getElementById("formSigno").addEventListener("submit", function (event) {
    event.preventDefault();
  
    const dataNascimento = new Date(document.getElementById("dataNascimento").value);
    if (isNaN(dataNascimento)) {
      document.getElementById("resultado").innerText = "Por favor, insira uma data válida.";
      return;
    }
  
    // Converte a data de nascimento para um formato MM-DD
    const mesDiaNascimento = `${(dataNascimento.getMonth() + 1).toString().padStart(2, '0')}-${dataNascimento.getDate().toString().padStart(2, '0')}`;
  
    fetch("signos.xml")
      .then(response => response.text())
      .then(data => {
        const parser = new DOMParser();
        const xml = parser.parseFromString(data, "application/xml");
        const signos = xml.getElementsByTagName("signo");
  
        let signoEncontrado = "";
  
        for (let i = 0; i < signos.length; i++) {
          const nome = signos[i].getElementsByTagName("nome")[0].textContent;
          const dataInicio = signos[i].getElementsByTagName("dataInicio")[0].textContent;
          const dataFim = signos[i].getElementsByTagName("dataFim")[0].textContent;
  
          // Verifica se a data de nascimento está dentro do intervalo do signo
          if (
            (mesDiaNascimento >= dataInicio && mesDiaNascimento <= dataFim) ||
            (dataInicio > dataFim && (mesDiaNascimento >= dataInicio || mesDiaNascimento <= dataFim))
          ) {
            signoEncontrado = nome;
            break;
          }
        }
  
        document.getElementById("resultado").innerText = signoEncontrado
          ? `Seu signo é ${signoEncontrado}.`
          : "Signo não encontrado.";
      })
      .catch(error => {
        console.error("Erro ao carregar o arquivo XML:", error);
        document.getElementById("resultado").innerText = "Erro ao consultar signo.";
      });
  });
  
