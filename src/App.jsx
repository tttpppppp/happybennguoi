import { Fireworks } from "@fireworks-js/react";
import { useRef, useState, useEffect } from "react";
import "./App.css";

function App() {
  const [countdown, setCountdown] = useState(0); // Countdown in seconds
  const [showFireworks, setShowFireworks] = useState(false); // Flag to show fireworks
  const fireworksRef = useRef(null);
  const audioRef = useRef(null);
  const [muted, setMuted] = useState(true);
  const handleAudioPlay = () => {
    const audio = audioRef.current;
    if (audio) {
      setMuted(false); // Bỏ mute
      audio.play().catch((error) => {
        console.log("Error playing audio:", error);
      });
    }
  };
  // Calculate the time remaining until midnight (00:00)
  const getTimeUntilMidnight = () => {
    const now = new Date();
    const midnight = new Date(now);
    midnight.setHours(24, 0, 0, 0); // Set to 00:00 of the next day

    const timeDiff = midnight - now; // Time difference in milliseconds
    return Math.floor(timeDiff / 1000); // Convert milliseconds to seconds
  };

  useEffect(() => {
    const initialCountdown = getTimeUntilMidnight();
    setCountdown(initialCountdown);

    const timer = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown <= 1) {
          clearInterval(timer); // Stop the countdown
          setShowFireworks(true); // Show fireworks when countdown reaches zero
          if (fireworksRef.current) {
            fireworksRef.current.start(); // Start fireworks if ref is available
          }
          return 0;
        }
        return prevCountdown - 1; // Decrease countdown by 1 second
      });
    }, 1000);

    return () => clearInterval(timer); // Cleanup the timer when the component unmounts
  }, []);

  // Function to format seconds into "HH:MM:SS"
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="container" onClick={handleAudioPlay}>
      <audio
        ref={audioRef}
        src="/fireworks-tqd/fireworks-29629.mp3"
        preload="auto"
        loop
        autoPlay
        muted={muted}
      />

      <div className="fireworks-area">
        {showFireworks && (
          <Fireworks
            ref={fireworksRef}
            options={{
              opacity: 0.7,
              particles: 200,
              explosion: 3,
              intensity: 40,
              friction: 0.99,
            }}
          />
        )}
      </div>

      <div className="content">
        <h1 className="title">
          Happy Lunar New Year!
          <br />
          <div className="animate-color">
            <div className="animate-color__item"></div>
            <div className="animate-color__item"></div>
            <div className="animate-color__item"></div>
            <div className="animate-color__item"></div>
          </div>
        </h1>

        {!showFireworks && (
          <div className="countdown">
            <p>Countdown to Midnight: {formatTime(countdown)}</p>
          </div>
        )}

        {showFireworks && (
          <div className="wishes">
            <p>Hi ,Công chúa</p>
            <p>🎉 Chúc mừng năm mới, người đặc biệt của anh!</p>
            <p>🌹 Chúc em luôn xinh đẹp, rạng rỡ và hạnh phúc mỗi ngày.</p>
            <p>
              🍀 Hy vọng năm mới sẽ mang đến thật nhiều niềm vui và may mắn cho
              em!
            </p>
            <p>
              💌 Anh sẽ luôn ở đây, âm thầm ủng hộ và chúc em thành công trên
              mọi hành trình.
            </p>
            <p>✨ Mong rằng chúng ta sẽ có thêm nhiều kỷ niệm đẹp bên nhau!</p>
            <p>
              🌈 Hy vọng năm nay, mỗi khoảnh khắc bên em sẽ đều là những điều kỳ
              diệu và ngọt ngào nhất.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
