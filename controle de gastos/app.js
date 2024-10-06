let transactions = [];
let balanceAmount = document.getElementById('balance-amount');
let expenseChart;
const loginForm = document.getElementById('login-form');
const dashboard = document.getElementById('dashboard');
const loginContainer = document.getElementById('login-container');

// Simulando um usuário e senha corretos (em produção, utilize JWT ou OAuth)
const validEmail = "user@teste.com";
const validPassword = "123456";

// Autenticação simples
loginForm.addEventListener('submit', function(e) {
    e.preventDefault();  // Impede o recarregamento da página ao submeter o formulário
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (email === validEmail && password === validPassword) {
        // Esconde a tela de login e mostra o dashboard
        loginContainer.style.display = "none";
        dashboard.style.display = "block";
    } else {
        // Exibe alerta de erro se as credenciais forem inválidas
        Swal.fire({
            icon: 'error',
            title: 'Erro!',
            text: 'Credenciais inválidas',
        });
    }
});

// Funções adicionais como adicionar transação, exportação e gráfico
document.getElementById('transaction-form').addEventListener('submit', function(e) {
    e.preventDefault();
    let description = document.getElementById('description').value;
    let amount = parseFloat(document.getElementById('amount').value);

    transactions.push({ description, amount, date: new Date() });
    updateDashboard();
    updateChart();
    checkNegativeBalance();
});

function updateDashboard() {
    let totalBalance = transactions.reduce((acc, transaction) => acc + transaction.amount, 0);
    balanceAmount.innerText = `R$ ${totalBalance.toFixed(2)}`;
}

function checkNegativeBalance() {
    let totalBalance = transactions.reduce((acc, transaction) => acc + transaction.amount, 0);
    if (totalBalance < 0) {
        Swal.fire({
            icon: 'warning',
            title: 'Atenção!',
            text: 'Seu saldo está negativo.',
        });
    }
}

function updateChart() {
    const ctx = document.getElementById('expenseChart').getContext('2d');
    const labels = transactions.map(transaction => transaction.description);
    const data = transactions.map(transaction => transaction.amount);

    if (expenseChart) {
        expenseChart.destroy();
    }

    expenseChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                label: 'Despesas',
                data: data,
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                hoverOffset: 4
            }]
        }
    });
}

// Exportar para PDF
document.getElementById('export-pdf').addEventListener('click', () => {
    const doc = new jspdf.jsPDF();
    doc.text("Relatório de Gastos", 10, 10);
    transactions.forEach((transaction, index) => {
        doc.text(`${transaction.description}: R$ ${transaction.amount}`, 10, 20 + index * 10);
    });
    doc.save('relatorio-de-gastos.pdf');
});

// Exportar para Excel
document.getElementById('export-excel').addEventListener('click', () => {
    let worksheet = XLSX.utils.json_to_sheet(transactions);
    let workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Gastos");
    XLSX.writeFile(workbook, 'relatorio-de-gastos.xlsx');
});
