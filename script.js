// Score Chart
const ctx = document.getElementById("scoreChart").getContext("2d");
const score = 69;
const angle = (score / 100) * Math.PI;
const values = [47, 3, 14, 3, 20, 3, 20];
const colors = [
  "#FFA800",
  "transparent",
  "#FFC960",
  "transparent",
  "#FEEA3A",
  "transparent",
  "#7FE47E",
];

new Chart(ctx, {
  type: "doughnut",
  data: {
    datasets: [
      {
        data: values,
        backgroundColor: colors,

        borderRadius: 8,
        borderWidth: 0,
        cutout: "92%",
        circumference: 180,
        rotation: 270,
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
    },
  },
  plugins: [
    {
      id: "center-score",
      afterDraw(chart) {
        const { ctx, chartArea } = chart;
        const cx = chart.width / 2;
        const cy = chartArea.bottom;

        const scoreAngle = (score / 100) * Math.PI; // 0 to π
        const radius = chart._metasets[0].data[0].outerRadius - 2;

        const angle = Math.PI + scoreAngle;
        const x = cx + radius * Math.cos(angle);
        const y = cy + radius * Math.sin(angle);

        ctx.beginPath();
        ctx.arc(x, y, 11, 0, 2 * Math.PI);
        ctx.fillStyle = "#ffffff";
        ctx.shadowColor = "rgba(10, 10, 10, 0.15)";
        ctx.shadowBlur = 8;
        ctx.fill();

        ctx.save();
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.font = "bold 60px Inter";
        ctx.fillStyle = "#1A1A2E";
        ctx.fillText(`${score}`, cx - 20, cy - 20);
        ctx.font = "bold 16px Inter";
        ctx.fillText(`/100`, cx + 35, cy - 10);
        ctx.restore();

        ctx.restore();
      },
    },
  ],
});

// Radar Chart

const radarctx = document.getElementById("radarChart").getContext("2d");

new Chart(radarctx, {
  type: "radar",
  data: {
    labels: [
      "AI Skill #1",
      "BAI Skill #2",
      "AI Skill #3",
      "AI Skill #4",
      "AI Skill #5",
    ],
    datasets: [
      {
        label: "Gray Base",
        data: [87, 85, 80, 100, 90],
        backgroundColor: "rgba(185, 185, 185, 0.5)",
        borderColor: "#B9B9B9",
        pointRadius: 0,
        pointHoverRadius: 0,
        borderWidth: 2,
        fill: true,
      },
      {
        label: "Blue Layer",
        data: [65, 65, 55, 67, 56],
        backgroundColor: "rgba(0, 130, 248, 0.8)",
        borderColor: "#0082F8",
        pointRadius: 0,
        pointHoverRadius: 0,
        borderWidth: 2,
        fill: true,
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
    },
    scales: {
      r: {
        angleLines: {
          color: "#aaa",
        },
        grid: {
          color: "#ddd",
        },
        pointLabels: {
          font: {
            size: 11,
            weight: "bold",
          },
          color: "#000",
        },
        ticks: {
          display: false,
        },
        suggestedMin: 0,
        suggestedMax: 100,
      },
    },
  },
});
// Line Chart
const linectx = document.getElementById("growthChart").getContext("2d");

new Chart(linectx, {
  type: "line",
  data: {
    labels: ["2025", "2026", "2027", "2028", "2029", "2030", "2031"],
    datasets: [
      {
        label: "Target Projection",
        data: [1000, 1100, 1400, 1900, 2600, 3400, 4200],
        borderColor: "#0082F8",

        tension: 0.4,
        pointRadius: 0,
        borderWidth: 3,
      },
      {
        label: "Market Average",
        data: [1000, 1050, 1200, 1500, 1800, 2100, 2500],
        borderColor: "#4E4E4E",

        tension: 0.4,
        pointRadius: 0,
        borderWidth: 2,
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
      annotation: {
        annotations: {
          current: {
            type: "label",
            xValue: "2025",
            yValue: 1000,
            backgroundColor: "#ccc",
            borderRadius: 4,
            content: ["You're here", "$80k - $100k"],
            color: "#FFFFFF",
            font: {
              weight: "bold",
              size: 16,
            },
            padding: 8,
            yAdjust: -40,
            xAdjust: 60,
          },
          target: {
            type: "label",
            xValue: "2031",
            yValue: 3900,
            backgroundColor: "#61B0F7",
            borderRadius: 4,
            content: ["$400k - $450k"],
            color: "#FFFFFF",
            font: {
              weight: "bold",
              size: 16,
            },
            padding: 8,
            yAdjust: 43,
            xAdjust: -70,
          },
          average: {
            type: "label",
            xValue: "2030",
            yValue: 2100,
            backgroundColor: "#ccc",
            borderRadius: 4,
            content: ["$200k - $300k"],
            color: "#FFFFFF",
            font: {
              weight: "bold",
              size: 16,
            },
            padding: 8,
            yAdjust: 15,
            xAdjust: 90,
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1000,
          callback: (value) => `${value / 1000}k`,
          font: {
            size: 16,
          },
          color: "#615E83",
        },

        min: 0,
        max: 4000,
      },
      x: {
        ticks: {
          font: {
            size: 16,
          },
        },
        grid: {
          display: false,
        },
      },
    },
  },
});

// Ratio Chart
const ratioCanvas = document.getElementById("ratioChart");
const ratioCtx = ratioCanvas.getContext("2d");
const centerImage = new Image();
centerImage.src = "images/agentup.svg";

const centerImagePlugin = {
  id: "centerImage",
  afterDraw(chart) {
    const { ctx, width, height } = chart;
    const centerX = width / 2;
    const centerY = height / 2;

    const imageSize = Math.min(width, height) * 0.3;
    if (centerImage.complete) {
      ctx.drawImage(
        centerImage,
        centerX - imageSize / 2,
        centerY - imageSize / 2,
        imageSize,
        imageSize
      );
    } else {
      centerImage.onload = () => chart.draw();
    }
  },
};

new Chart(ratioCtx, {
  type: "doughnut",
  data: {
    datasets: [
      {
        data: [55, 2, 45, 2],
        backgroundColor: ["#4A90E2", "transparent", "#E5F0FF", "transparent"],
        borderRadius: 8,
        cutout: "60%",
        circumference: 360,
        rotation: 360,
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
    },
  },
  plugins: [
    centerImagePlugin,
    {
      id: "center-icon",
      afterDraw(chart) {
        const { ctx, chartArea, width } = chart;
        const centerX = width / 2;
        const centerY = chartArea.top + (chartArea.bottom - chartArea.top) / 2;

        const baseFontSize = Math.min(width * 0.05, 13);
        ctx.font = `bold ${baseFontSize}px Inter`;

        const radius = chart.getDatasetMeta(0).data[0].outerRadius * 0.85;

        // 55%
        ctx.save();
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "#ffffff";

        let angle55 = -Math.PI / 2 + Math.PI * 2 * (55 / 2 / 100);
        ctx.fillText(
          "55%",
          centerX + radius * Math.cos(angle55),
          centerY + radius * Math.sin(angle55)
        );

        ctx.fillStyle = "#3576EA";

        let angle45 = -Math.PI / 2 + Math.PI * 2 * ((55 + 2 + 45 / 2) / 100);
        ctx.fillText(
          "45%",
          centerX + radius * Math.cos(angle45),
          centerY + radius * Math.sin(angle45)
        );
        ctx.restore();
      },
    },
  ],
});
