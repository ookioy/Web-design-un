const sw = new Stopwatch();

const timerEl = document.getElementById("timer");
const lapsEl = document.getElementById("laps");

document.getElementById("start").onclick = () => sw.start();
document.getElementById("pause").onclick = () => sw.pause();
document.getElementById("resume").onclick = () => sw.resume();
document.getElementById("reset").onclick = () => {
    sw.reset();
    lapsEl.innerHTML = "";
};

document.getElementById("lap").onclick = () => {
    sw.lap();
    renderLaps();
};

function renderLaps() {
    const laps = sw.getLaps();
    lapsEl.innerHTML = laps.map(l => `
        <tr>
            <td>${l.id}</td>
            <td>${Stopwatch.format(l.timeMs)}</td>
            <td>${Stopwatch.format(l.deltaMs)}</td>
        </tr>
    `).join("");
}

setInterval(() => {
    timerEl.textContent = Stopwatch.format(sw.getTime());
}, 100);
