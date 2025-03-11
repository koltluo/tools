let specChart = null;
let lastSelectedSpec = null;
let lastRequiredCurrent = null;

const standardSpecs = [
    { power: 0.75, current: 2.5, voltage: 380 },
    { power: 1.5, current: 4, voltage: 380 },
    { power: 2.2, current: 5.5, voltage: 380 },
    { power: 3.7, current: 8, voltage: 380 },
    { power: 5.5, current: 12, voltage: 380 },
    { power: 7.5, current: 16, voltage: 380 },
    { power: 11, current: 22, voltage: 380 },
    { power: 15, current: 30, voltage: 380 },
    { power: 18.5, current: 37, voltage: 380 },
    { power: 22, current: 45, voltage: 380 },
    { power: 30, current: 60, voltage: 380 },
    { power: 37, current: 75, voltage: 380 },
    { power: 45, current: 90, voltage: 380 },
    { power: 55, current: 110, voltage: 380 },
    { power: 75, current: 150, voltage: 380 },
    { power: 90, current: 180, voltage: 380 },
    { power: 110, current: 220, voltage: 380 },
    { power: 132, current: 265, voltage: 380 },
    { power: 160, current: 320, voltage: 380 },
    { power: 200, current: 400, voltage: 380 },
    { power: 250, current: 500, voltage: 380 },
    { power: 315, current: 630, voltage: 380 },
    { power: 400, current: 800, voltage: 380 },
    { power: 500, current: 1000, voltage: 380 },
    { power: 630, current: 1260, voltage: 380 },
    { power: 800, current: 1600, voltage: 380 },
    { power: 22, current: 28, voltage: 690 },
    { power: 30, current: 38, voltage: 690 },
    { power: 37, current: 47, voltage: 690 },
    { power: 45, current: 57, voltage: 690 },
    { power: 55, current: 70, voltage: 690 },
    { power: 75, current: 95, voltage: 690 },
    { power: 90, current: 115, voltage: 690 },
    { power: 110, current: 140, voltage: 690 },
    { power: 132, current: 170, voltage: 690 },
    { power: 160, current: 205, voltage: 690 },
    { power: 200, current: 260, voltage: 690 },
    { power: 250, current: 325, voltage: 690 },
    { power: 315, current: 410, voltage: 690 },
    { power: 355, current: 460, voltage: 690 },
    { power: 400, current: 520, voltage: 690 },
    { power: 500, current: 650, voltage: 690 },
    { power: 630, current: 820, voltage: 690 },
    { power: 800, current: 1040, voltage: 690 }
    // 请根据实际需求补充完整规格表
].sort((a, b) => a.current - b.current);



function updateVoltage() {
    const voltageClass = document.getElementById('voltageClass').value;
    document.getElementById('voltage').value = voltageClass;
    document.getElementById('result').style.display = 'none';
}

function calculate() {
    try {
        showLoader(true);
        const params = {
            power: parseFloat(document.getElementById('power').value),
            voltage: parseFloat(document.getElementById('voltage').value),
            powerFactor: parseFloat(document.getElementById('powerFactor').value),
            efficiency: parseFloat(document.getElementById('efficiency').value) / 100,
            overload: parseFloat(document.getElementById('overload').value) / 100,
            loadType: parseFloat(document.getElementById('loadType').value)
        };
        if (Object.values(params).some(v => isNaN(v) || v <= 0)) {
            alert("请填写所有有效参数！");
            return;
        }
        const baseCurrent = (params.power * 1000) / 
            (Math.sqrt(3) * params.voltage * params.powerFactor * params.efficiency);
        const requiredCurrent = baseCurrent * 
            Math.max(params.overload, params.loadType) * 1.2;
        let selectedSpec = standardSpecs.find(spec => 
            spec.current >= requiredCurrent && 
            Math.abs(spec.voltage - params.voltage) <= 100
        );
        const resultDiv = document.getElementById('result');
        if (selectedSpec) {
            const modelSeries = selectedSpec.voltage === 690 ? 'SKF300' : 'SKF600';
            document.getElementById('rec-power').textContent = `${selectedSpec.power}kW`;
            document.getElementById('rec-current').textContent = `${selectedSpec.current}A`;
            document.getElementById('rec-model').textContent = `${modelSeries}-${selectedSpec.power}T`;
            document.getElementById('rec-voltage').textContent = `${selectedSpec.voltage}V`;
            resultDiv.style.display = 'block';
            lastSelectedSpec = selectedSpec;
            lastRequiredCurrent = requiredCurrent;
            drawComparisonChart(selectedSpec, requiredCurrent);
            updateOrderForm(selectedSpec);
        } else {
            alert(`需求电流：${requiredCurrent.toFixed(1)}A\n最大可用规格：${standardSpecs[standardSpecs.length-1].current}A\n请联络技术支持定制解决方案`);
            resultDiv.style.display = 'none';
        }
    } finally {
        showLoader(false);
    }
}

function showLoader(show) {
    document.querySelector('.loader').style.display = show ? 'flex' : 'none';
}

function drawComparisonChart(spec, current) {
    if (specChart) specChart.destroy();
    const ctx = document.getElementById('specChart').getContext('2d');
    specChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['需求电流', '选定型号'],
            datasets: [{
                label: '电流对比 (A)',
                data: [current, spec.current],
                backgroundColor: ['#1890ff', '#40a9ff'],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: { beginAtZero: true, ticks: { color: '#666' }, grid: { color: '#eee' } }
            },
            plugins: { legend: { display: false } }
        }
    });
}


async function exportPDF() {
    showLoader(true);
    try {
        // 获取选型结果
        const recPower = document.getElementById('rec-power').textContent;
        const recCurrent = document.getElementById('rec-current').textContent;
        const recModel = document.getElementById('rec-model').textContent;
        const recVoltage = document.getElementById('rec-voltage').textContent;
        const contactText = document.querySelector('.contact-card').innerText.split('\n');

        // PDF 内容定义
        const docDefinition = {
            content: [
                { text: '森阔® 变频器选型报告', style: 'header' },
                {
                    table: {
                        headerRows: 1,
                        widths: ['*', '*', '*', '*'],
                        body: [
                            ['推荐功率', '额定电流', '适配型号', '电压等级'],
                            [recPower, recCurrent, recModel, recVoltage]
                        ]
                    },
                    layout: 'lightHorizontalLines'
                },
                { text: '联系我们', style: 'subheader', margin: [0, 20, 0, 10] },
                { text: contactText, style: 'contact' }
            ],
            styles: {
                header: { fontSize: 18, bold: true, margin: [0, 0, 0, 10] },
                subheader: { fontSize: 14, bold: true },
                contact: { fontSize: 12 }
            },
            defaultStyle: {
                font: 'Roboto' // 使用中文字体
            }
        };

        // 生成 PDF
        pdfMake.createPdf(docDefinition).download('selection-report.pdf');
    } finally {
        showLoader(false);
    }
}





updateVoltage();