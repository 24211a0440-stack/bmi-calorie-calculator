function toggleMenu() {
  let menu = document.getElementById("menu-links");
  menu.style.display = (menu.style.display === "block") ? "none" : "block";
}

function showCalculator(type) {
  document.getElementById("bmi-calculator").classList.add("hidden");
  document.getElementById("calorie-calculator").classList.add("hidden");

  if (type === "bmi") {
    document.getElementById("bmi-calculator").classList.remove("hidden");
  } else {
    document.getElementById("calorie-calculator").classList.remove("hidden");
  }

  document.getElementById("menu-links").style.display = "none";
}

// Draw BMI chart
const ctx = document.getElementById('bmiChart').getContext('2d');
new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['Underweight (<18.5)', 'Normal (18.5-24.9)', 'Overweight (25-29.9)', 'Obesity (30+)'],
    datasets: [{
      label: 'BMI Range',
      data: [18.5, 24.9, 29.9, 35], // Just to visualize ranges
      backgroundColor: ['#FFD54F', '#81C784', '#FFB74D', '#E57373']
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: { display: false }
    },
    scales: {
      y: { beginAtZero: true, max: 40 }
    }
  }
});

// BMI Calculator
function calculateBMI() {
  let age = document.getElementById("age").value;
  let weight = document.getElementById("weight").value;
  let height = document.getElementById("height").value;

  if (age === "" || weight === "" || height === "") {
    document.getElementById("bmi-result").innerText = "Please fill all fields.";
    return;
  }

  height = height / 100; // convert cm to meters
  let bmi = (weight / (height * height)).toFixed(2);

  let category = "";
  if (age < 20) {
    category = "Note: For children/teens, BMI uses growth charts.";
  } else {
    if (bmi < 18.5) category = "Underweight";
    else if (bmi < 24.9) category = "Normal weight";
    else if (bmi < 29.9) category = "Overweight";
    else category = "Obese";
  }

  document.getElementById("bmi-result").innerText = `Your BMI is ${bmi} (${category})`;
}

// Calorie Calculator (Mifflin-St Jeor Equation)
function calculateCalories() {
  let age = document.getElementById("cal-age").value;
  let gender = document.getElementById("cal-gender").value;
  let weight = document.getElementById("cal-weight").value;
  let height = document.getElementById("cal-height").value;
  let activity = document.getElementById("activity").value;

  if (age === "" || weight === "" || height === "") {
    document.getElementById("calorie-result").innerText = "Please fill all fields.";
    return;
  }

  let bmr;
  if (gender === "male") {
    bmr = 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    bmr = 10 * weight + 6.25 * height - 5 * age - 161;
  }

  let maintenance = bmr * activity;

  let result = `
    Maintain weight: ${maintenance.toFixed(0)} kcal/day
    \nMild weight loss: ${(maintenance - 250).toFixed(0)} kcal/day
    \nWeight loss: ${(maintenance - 500).toFixed(0)} kcal/day
    \nExtreme weight loss: ${(maintenance - 1000).toFixed(0)} kcal/day
    \nMild weight gain: ${(maintenance + 250).toFixed(0)} kcal/day
    \nExtreme weight gain: ${(maintenance + 500).toFixed(0)} kcal/day
  `;

  document.getElementById("calorie-result").innerText = result;
}
