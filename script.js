function validateInput() {
    const cpfInput = document.getElementById("cpfInput").value.trim();
    const fileInput = document.getElementById("fileInput");
    const resultDiv = document.getElementById("result");

    // Verifica se o usuário digitou um CPF
    if (cpfInput) {
        const isValid = validateCPF(cpfInput);
        const resultClass = isValid ? "valid" : "invalid";
        resultDiv.innerHTML = `<p class="${resultClass}">CPF: ${cpfInput} - ${isValid ? "Válido" : "Inválido"}</p>`;
    } 
    // Verifica se o usuário selecionou um arquivo
    else if (fileInput.files.length) {
        const file = fileInput.files[0];
        const reader = new FileReader();

        reader.onload = function(e) {
            const text = e.target.result;
            const cpfs = text.split("\n").map(cpf => cpf.trim()).filter(Boolean);
            
            let resultHtml = "";

            cpfs.forEach(cpf => {
                const isValid = validateCPF(cpf);
                const resultClass = isValid ? "valid" : "invalid";
                resultHtml += `<p class="${resultClass}">CPF: ${cpf} - ${isValid ? "Válido" : "Inválido"}</p>`;
            });

            resultDiv.innerHTML = resultHtml;
        };

        reader.readAsText(file);
    } 
    // Caso não tenha CPF digitado nem arquivo carregado
    else {
        resultDiv.innerHTML = "Por favor, digite um CPF ou carregue um arquivo.";
    }
}

function validateCPF(cpf) {
    // Remove caracteres não numéricos
    cpf = cpf.replace(/[^\d]/g, "");

    // Verifica se o CPF tem 11 dígitos
    if (cpf.length !== 11 || !/^\d+$/.test(cpf)) {
        return false;
    }

    const digits = cpf.split("").map(Number);

    // Cálculo do primeiro dígito verificador
    let sum = 0;
    for (let i = 0; i < 9; i++) {
        sum += digits[i] * (10 - i);
    }
    let firstVerifier = (sum * 10) % 11;
    if (firstVerifier === 10 || firstVerifier === 11) {
        firstVerifier = 0;
    }
    if (firstVerifier !== digits[9]) {
        return false;
    }

    // Cálculo do segundo dígito verificador
    sum = 0;
    for (let i = 0; i < 10; i++) {
        sum += digits[i] * (11 - i);
    }
    let secondVerifier = (sum * 10) % 11;
    if (secondVerifier === 10 || secondVerifier === 11) {
        secondVerifier = 0;
    }
    if (secondVerifier !== digits[10]) {
        return false;
    }

    return true;
}
