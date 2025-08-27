import { useEffect, useRef, useState } from "react";

const MusicVisualizer = () => {
  const canvasRef = useRef(null);
  const audioCtxRef = useRef(null);
  const analyserRef = useRef(null);
  const bgRef = useRef({ r: 0, g: 0, b: 0 });
  const dbRef = useRef(0);
  const trailRef = useRef([]);
  const [mode, setMode] = useState("bar");

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    trailRef.current = [];

    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        audioCtxRef.current =
          new (window.AudioContext || window.webkitAudioContext)();
        const source = audioCtxRef.current.createMediaStreamSource(stream);
        analyserRef.current = audioCtxRef.current.createAnalyser();
        analyserRef.current.fftSize = 2048;
        source.connect(analyserRef.current);

        const bufferLength = analyserRef.current.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        const WIDTH = canvas.width;
        const HEIGHT = canvas.height;

        const draw = () => {
          requestAnimationFrame(draw);
          analyserRef.current.getByteFrequencyData(dataArray);

          const sum = dataArray.reduce((a, b) => a + b, 0);
          const avg = sum / dataArray.length;
          dbRef.current = avg.toFixed(0);

          bgRef.current.r = Math.floor(avg);
          bgRef.current.g = Math.floor(avg * 0.5);
          bgRef.current.b = Math.floor(avg * 0.25);

          ctx.fillStyle = `rgb(0, 0, 0)`;
          ctx.fillRect(0, 0, WIDTH, HEIGHT);

          if (mode === "bar" || mode === "bassTreble") {
            const barWidth = (WIDTH / bufferLength) * 1.5;
            let x = 0;
            for (let i = 0; i < bufferLength; i++) {
              const barHeight = dataArray[i];
              ctx.fillStyle = `rgb(${barHeight + 100}, 50, 200)`;
              ctx.fillRect(x, HEIGHT - barHeight / 2, barWidth, barHeight / 2);
              x += barWidth + 1;
            }

            if (mode === "bassTreble") {
              const bass = dataArray.slice(0, bufferLength / 3);
              const mid = dataArray.slice(bufferLength / 3, (2 * bufferLength) / 3);
              const treble = dataArray.slice((2 * bufferLength) / 3);

              const avgBass = bass.reduce((a, b) => a + b, 0) / bass.length;
              const avgMid = mid.reduce((a, b) => a + b, 0) / mid.length;
              const avgTreble = treble.reduce((a, b) => a + b, 0) / treble.length;

              ctx.fillStyle = "#0f0";
              ctx.fillRect(WIDTH - 80, HEIGHT - avgBass, 20, avgBass);
              ctx.fillStyle = "#ff0";
              ctx.fillRect(WIDTH - 55, HEIGHT - avgMid, 20, avgMid);
              ctx.fillStyle = "#f0f";
              ctx.fillRect(WIDTH - 30, HEIGHT - avgTreble, 20, avgTreble);

              ctx.fillStyle = "#fff";
              ctx.fillText("Bass", WIDTH - 80, HEIGHT - avgBass - 5);
              ctx.fillText("Mid", WIDTH - 55, HEIGHT - avgMid - 5);
              ctx.fillText("Treble", WIDTH - 30, HEIGHT - avgTreble - 5);
            }
          }

          if (mode === "circle") {
            const centerX = WIDTH / 2;
            const centerY = HEIGHT / 2;
            const radius = 80;

            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
            ctx.strokeStyle = "#fff";
            ctx.lineWidth = 1;
            ctx.stroke();

            const bars = 64;
            for (let i = 0; i < bars; i++) {
              const angle = (i / bars) * 2 * Math.PI;
              const barLen = dataArray[i] / 2;
              const x1 = centerX + Math.cos(angle) * radius;
              const y1 = centerY + Math.sin(angle) * radius;
              const x2 = centerX + Math.cos(angle) * (radius + barLen);
              const y2 = centerY + Math.sin(angle) * (radius + barLen);

              ctx.beginPath();
              ctx.moveTo(x1, y1);
              ctx.lineTo(x2, y2);
              ctx.strokeStyle = `rgb(255, ${dataArray[i]}, 180)`;
              ctx.lineWidth = 2;
              ctx.stroke();
            }
          }

          if (mode === "pulseCircle") {
            const centerX = WIDTH / 2;
            const centerY = HEIGHT / 2;
            const radius = 60 + avg;

            const gradient = ctx.createRadialGradient(
              centerX,
              centerY,
              radius * 0.8,
              centerX,
              centerY,
              radius * 1.6
            );
            gradient.addColorStop(0, `rgba(${avg + 100}, ${avg}, 255, 0.3)`);
            gradient.addColorStop(1, `rgba(0, 0, 0, 0)`);
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius * 1.6, 0, 2 * Math.PI);
            ctx.fill();

            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
            ctx.strokeStyle = `rgb(${255 - avg}, ${avg + 50}, ${avg})`;
            ctx.lineWidth = 6;
            ctx.stroke();
          }

          if (mode === "waveform") {
            analyserRef.current.getByteTimeDomainData(dataArray);
            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.strokeStyle = "#0ff";
            ctx.moveTo(0, HEIGHT / 2);

            for (let i = 0; i < bufferLength; i++) {
              const y = (dataArray[i] / 128.0) * (HEIGHT / 2);
              const x = (i / bufferLength) * WIDTH;
              ctx.lineTo(x, y);
            }

            ctx.stroke();
          }

          if (mode === "spectrum") {
            for (let i = 0; i < bufferLength; i++) {
              const barHeight = dataArray[i];
              const hue = (i / bufferLength) * 360;
              ctx.fillStyle = `hsl(${hue}, 100%, 50%)`;
              ctx.fillRect(i * 2, HEIGHT - barHeight, 1.5, barHeight);
            }
          }

          if (mode === "bassBars") {
  const bass = dataArray.slice(0, bufferLength / 3);
  const mid = dataArray.slice(bufferLength / 3, (2 * bufferLength) / 3);
  const treble = dataArray.slice((2 * bufferLength) / 3);

  const avgBass = bass.reduce((a, b) => a + b, 0) / bass.length;
  const avgMid = mid.reduce((a, b) => a + b, 0) / mid.length;
  const avgTreble = treble.reduce((a, b) => a + b, 0) / treble.length;

  const barW = 60;
  const spacing = 40;
  const baseX = WIDTH / 2 - (barW + spacing);
  const baseY = HEIGHT - 60;

  const drawBar = (x, avg, color, label) => {
    const height = avg;
    ctx.fillStyle = color;
    ctx.fillRect(x, baseY - height, barW, height);

    ctx.font = "bold 16px monospace";
    ctx.fillStyle = "#fff";
    ctx.textAlign = "center";
    ctx.fillText(label, x + barW / 2, baseY - height - 10);
  };

  drawBar(baseX, avgBass, "#0f0", "Bass");
  drawBar(baseX + barW + spacing, avgMid, "#ff0", "Mid");
  drawBar(baseX + (barW + spacing) * 2, avgTreble, "#f0f", "Treble");
}


    if (mode === "dotTrail") {
  const centerX = WIDTH / 2;
  const spacing = 100;
  const third = Math.floor(bufferLength / 3);

  const bass = dataArray.slice(0, third);
  const mid = dataArray.slice(third, third * 2);
  const treble = dataArray.slice(third * 2);

  const avgBass = bass.reduce((a, b) => a + b, 0) / bass.length;
  const avgMid = mid.reduce((a, b) => a + b, 0) / mid.length;
  const avgTreble = treble.reduce((a, b) => a + b, 0) / treble.length;

  const freqs = [
    { key: "bass", avg: avgBass, color: "#0f0", label: "Bass", offset: -spacing },
    { key: "mid", avg: avgMid, color: "#ff0", label: "Mid", offset: 0 },
    { key: "treble", avg: avgTreble, color: "#f0f", label: "Treble", offset: spacing },
  ];

  freqs.forEach(({ key, avg, color, label, offset }) => {
    const dotY = HEIGHT - avg * 2 - 50;
    if (!trailRef.current[key]) trailRef.current[key] = [];
    const lastY = trailRef.current[key][0] ?? dotY;
    const smoothY = lastY + (dotY - lastY) * 0.2;

    trailRef.current[key].unshift(smoothY);
    if (trailRef.current[key].length > WIDTH) trailRef.current[key].pop();

    ctx.save();
    ctx.translate(centerX + offset, 0);

    // Trail line
    ctx.beginPath();
    for (let i = 0; i < trailRef.current[key].length; i++) {
      const x = -i;
      const y = trailRef.current[key][i];
      ctx.lineTo(x, y);
    }
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.globalAlpha = 0.8;
    ctx.shadowColor = color;
    ctx.shadowBlur = 12;
    ctx.stroke();

    // Glowing dot
    ctx.beginPath();
    ctx.arc(0, smoothY, 7, 0, Math.PI * 2);
    ctx.fillStyle = "#fff";
    ctx.shadowColor = color;
    ctx.shadowBlur = 25;
    ctx.fill();

    // Text label
    ctx.font = "bold 14px monospace";
    ctx.fillStyle = "#fff";
    ctx.shadowBlur = 0;
    ctx.fillText(label, -20, smoothY - 15);

    ctx.restore();
  });
}



          // meter
          const dbHeight = (avg / 255) * 250;
          const meterX = 20;
          const meterY = 20;
          const meterWidth = 14;
          const meterHeight = 100;

          const gradient = ctx.createLinearGradient(0, meterY + meterHeight, 0, meterY);
          gradient.addColorStop(0, "red");
          gradient.addColorStop(0.5, "yellow");
          gradient.addColorStop(1, "lime");

          ctx.fillStyle = gradient;
          ctx.fillRect(meterX, meterY + (meterHeight - dbHeight), meterWidth, dbHeight);

          ctx.strokeStyle = "#fff";
          ctx.lineWidth = 1.5;
          ctx.strokeRect(meterX, meterY, meterWidth, meterHeight);

          ctx.font = "bold 14px monospace";
          ctx.fillStyle = "#fff";
          ctx.fillText(`dB: ${dbRef.current}`, meterX + 20, meterY + 20);
        };

        draw();
      });

    return () => {
      audioCtxRef.current?.close();
      trailRef.current = [];
    };
  }, [mode]);

  return (
    <div style={{ background: "#000", height: "100vh", overflow: "hidden" }}>
      <h2 style={{ color: "white", textAlign: "center", padding: "10px" }}>
        Visualizer Musik Langsung 🎵
      </h2>

      {/* TOMBOL MODE */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "12px",
          marginBottom: "30px",
        }}
      >
        {[
          { mode: "bar", label: "Bar", icon: "📊" },
          { mode: "circle", label: "Circle", icon: "⭕" },
          { mode: "waveform", label: "Wave", icon: "🌊" },
          { mode: "spectrum", label: "Spectrum", icon: "🌈" },
          { mode: "pulseCircle", label: "Pulse", icon: "💥" },
          { mode: "dotTrail", label: "Trail", icon: "🌀" },
          { mode: "bassTreble", label: "Bass/Treble", icon: "🎚️" },
        ].map(({ mode: m, label, icon }) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            style={{
              padding: "12px 18px",
              borderRadius: "12px",
              border: "none",
              background:
                mode === m
                  ? "linear-gradient(145deg, #00ffe1, #00aaff)"
                  : "linear-gradient(145deg, #111, #1a1a1a)",
              color: mode === m ? "#000" : "#0ff",
              fontWeight: "bold",
              cursor: "pointer",
              fontSize: "16px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              boxShadow:
                mode === m
                  ? "0 0 15px rgba(0,255,255,0.8)"
                  : "0 4px 10px rgba(0,255,255,0.2)",
              transform: mode === m ? "scale(1.08)" : "scale(1)",
              transition: "all 0.3s ease-in-out",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
            onMouseLeave={(e) =>
              (e.currentTarget.style.transform = mode === m ? "scale(1.08)" : "scale(1)")
            }
          >
            <span style={{ fontSize: "20px" }}>{icon}</span>
            {label}
          </button>
        ))}
      </div>

      <canvas
        ref={canvasRef}
        width={window.innerWidth}
        height={window.innerHeight - 120}
      />
    </div>
  );
};

export default MusicVisualizer;
