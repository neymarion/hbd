import logo from './logo512.png';
import flame from './flame.png';
import cupcake from './cupcake.png';
import lys from './candle_without_light.png';
import {useState, useEffect} from "react"
import './App.css';

function App() {
  const [isBlowing, setIsBlowing] = useState(false);
  const [blowingDetected, setBlowingDetected] = useState(false);

  const handleStartDetection = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const analyser = audioContext.createAnalyser();
      const microphone = audioContext.createMediaStreamSource(stream);
      microphone.connect(analyser);
      analyser.fftSize = 256;

      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      const detectBlowing = () => {
        analyser.getByteFrequencyData(dataArray);
        const average = dataArray.reduce((acc, val) => acc + val, 0) / bufferLength;
        if (average > 100 && !blowingDetected) { // Adjust this threshold as needed
          setIsBlowing(true);
          setBlowingDetected(true);
        }
        requestAnimationFrame(detectBlowing);
      };

      detectBlowing();
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  handleStartDetection()
  return (
    <div className="App">
      <header className="App-header">


        {!isBlowing && <img src={flame} className="flame" alt="logo" />}
        <img src={lys} className="lys" alt="logo" />

        <img src={cupcake} className="cupcake" alt="logo" />
        <p className='text'>
          gratulere med dagen ! 💗 
        </p>
        <p className='text2'>
          (blow the mic to blow the candle)
        </p>
        
      </header>
      <p className='bottom'>© 2024 Marion.</p>
    </div>
  );
}

export default App;
