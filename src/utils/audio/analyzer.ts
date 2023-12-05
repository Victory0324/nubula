/*
      NEED TO REVISIT THIS. THIS CURRENTLY BREAKS THE MEDIA PLAYER

       const audioContext = new AudioContext();

      if (waveformRef.current) {
        const audio = waveformRef.current.getMediaElement();
        const mediaNode = audioContext.createMediaElementSource(audio);

        const analyser = audioContext.createAnalyser();
        analyser.fftSize = 512 * 2;

        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        mediaNode.connect(analyser);

        function getAverageFrequency() {
          let value = 0;
          analyser.getByteFrequencyData(dataArray);
          for (let i = 0; i < dataArray.length; i++) {
            value += dataArray[i];
          }
          return value / dataArray.length;
        }

        waveformRef.current.on('timeupdate', () => {
          const avgFrequency = getAverageFrequency();
          setAverageFrequency(avgFrequency);
        });
      }
       */
