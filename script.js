const startBtn = document.getElementById("startBtn");
const clearBtn = document.getElementById("clearBtn");
const list = document.getElementById("list");

let codes = JSON.parse(localStorage.getItem("codes")) || [];
let scanner = null;

function render() {
  list.innerHTML = "";
  codes.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.code} | ${item.time}`;
    list.appendChild(li);
  });
}

startBtn.onclick = () => {
  scanner = new Html5Qrcode("reader");

  scanner.start(
    { facingMode: "environment" },
    { fps: 10, qrbox: 250 },
    (decodedText) => {

      const alreadyExists = codes.some(c => c.code === decodedText);
      if (!alreadyExists) {
        codes.push({
          code: decodedText,
          time: new Date().toLocaleString()
        });
        localStorage.setItem("codes", JSON.stringify(codes));
        render();
      }

      scanner.stop();
    },
    (error) => {}
  );
};

clearBtn.onclick = () => {
  localStorage.removeItem("codes");
  codes = [];
  render();
};

render();
