const DEBUG = false;

export type EffectsChain = {
  destination: BiquadFilterNode;
  xyEffect: (x: number, y: number) => void;
  close: () => void;
};

/**
 * No operation function.
 * @param {function} fn - Function to be passed through.
 * @returns {function} - The original function.
 */
const noop = (fn: Function, arg: any) => fn;

/**
 * Creates and manages a stutter audio effect.
 * Utilizes Web Audio API for precise scheduling of stutters.
 * @param {AudioContext} audioContext - The audio context.
 * @param {AudioNode} destination - The destination audio node.
 * @param {number} bpm - Beats per minute.
 * @returns {object} - The stutter effect control interface.
 */
export const createStutterEffect = (
  audioContext: AudioContext,
  destination: AudioNode,
  bpm = 90
) => {
  const input = new GainNode(audioContext, { gain: 1 });
  const stutterGain = new GainNode(audioContext, { gain: 0 });
  const wet = new GainNode(audioContext, { gain: 0 });
  const dry = new GainNode(audioContext, { gain: 1 });

  const startTime = audioContext.currentTime;
  input.connect(dry).connect(destination);
  input.connect(wet).connect(stutterGain).connect(destination);

  const beatsPerSecond = bpm / 60;
  let noteDivision = 8;
  let stutterInterval = 1 / ((beatsPerSecond * noteDivision) / 4);

  const calculateNoteDivision = (fxValue: number) => {
    if (fxValue < 0.2) {
      return 6;
    } else if (fxValue < 0.4) {
      return 8;
    } else if (fxValue < 0.6) {
      return 12;
    } else if (fxValue < 0.9) {
      return 16;
    } else {
      return 32;
    }
  };

  const updateStutterInterval = () => {
    const notesPerSecond = (beatsPerSecond * noteDivision) / 4;
    stutterInterval = 1 / notesPerSecond;
  };

  const scheduleStutter = () => {
    const elapsedTime = audioContext.currentTime - startTime;
    const nextStutterTime =
      startTime + Math.ceil(elapsedTime / stutterInterval) * stutterInterval;

    if (nextStutterTime - 0.001 > 0)
      stutterGain.gain.setValueAtTime(0, nextStutterTime - 0.001);
    // Start ramping up 10ms before nextStutterTime
    stutterGain.gain.linearRampToValueAtTime(1, nextStutterTime);

    // Then, immediately start ramping down from nextStutterTime
    stutterGain.gain.linearRampToValueAtTime(
      0,
      nextStutterTime + stutterInterval / 2
    );

    // Schedule the next stutter event
    const timeUntilNextStutter = nextStutterTime - audioContext.currentTime;
    setTimeout(scheduleStutter, timeUntilNextStutter * 1000);
  };

  // Start the first stutter event
  scheduleStutter();

  return {
    fx: (fxValue: number) => {
      const newNoteDivision = calculateNoteDivision(fxValue);
      if (newNoteDivision !== noteDivision) {
        noteDivision = newNoteDivision;
        updateStutterInterval();
        // Immediately schedule the next stutter to account for the new interval
      }

      let scaledWetGainValue;
      if (fxValue > 0) {
        // Start at 0.5 when fxValue > 0, increase linearly to 1.5 at fxValue = 1
        scaledWetGainValue = 0.7 + fxValue * 1.6;
        scaledWetGainValue = Math.min(scaledWetGainValue, 1.8); // Cap at 1.5
      } else {
        scaledWetGainValue = 0.5; // Default to 0.5 when fxValue is 0 or less
      }

      let dryGainValue;
      if (fxValue > 0.3) {
        dryGainValue = 0; // Set dry gain to 0 when fxValue is greater than 0.3
      } else {
        // Reduce linearly from 1 to 0 as fxValue increases from 0 to 0.3
        dryGainValue = 1 - fxValue / 0.3;
      }

      if (DEBUG)
        console.info(
          `Setting dry gain to ${dryGainValue} and wet gain to ${scaledWetGainValue}`
        );

      dry.gain.setValueAtTime(dryGainValue, audioContext.currentTime);
      wet.gain.setValueAtTime(scaledWetGainValue, audioContext.currentTime);
    },
    input,
    close: () => {
      dry.disconnect();
      wet.disconnect();
      stutterGain.disconnect();
    },
  };
};

/**
 * Creates a delay effect.
 * @param {AudioContext} audioContext - The audio context.
 * @param {AudioNode} destination - The destination audio node.
 * @param {number} bpm - Beats per minute.
 * @returns {object} - The delay effect.
 */
export const createDelayEffect = (
  audioContext: AudioContext,
  destination: AudioNode,
  bpm = 90
) => {
  if (DEBUG)
    console.info('audio:effects |  Creating delay effect with bpm:', bpm);
  const input = new GainNode(audioContext, { gain: 1 });
  const delay = new DelayNode(audioContext, { delayTime: 0 });
  const feedback = new GainNode(audioContext, { gain: 0 });
  const wet = new GainNode(audioContext, { gain: 0 });

  input.connect(wet);
  wet.connect(delay);
  input.connect(destination);
  delay.connect(feedback);
  feedback.connect(delay);
  delay.connect(destination);

  const beatsPerSecond = bpm / 60;
  const sixteenthsPerSecond = beatsPerSecond * 4;

  const delayTimes = [
    1 / sixteenthsPerSecond,
    1.5 / sixteenthsPerSecond,
    3 / sixteenthsPerSecond,
  ];

  const transformToSyncedDelay = (delayTime: number) => {
    if (delayTime < 0.33) {
      return delayTimes[0];
    } else if (delayTime < 0.66) {
      return delayTimes[1];
    } else {
      return (
        delayTimes[1] +
        ((delayTime - 0.66) * (delayTimes[2] - delayTimes[1])) / 0.34
      );
    }
  };

  const scaleFeedback = (value: number) => value * value * 0.4; // Smooth quadratic ramp-up
  const scaleWet = (value: number) => Math.pow(value, 1.5) * 0.75; // Smooth power ramp-up

  let fxValue = 0;
  const fx = (value?: number) => {
    if (value === undefined) {
      return fxValue;
    }
    fxValue = value;
    const delayTime = transformToSyncedDelay(value);
    if (DEBUG)
      console.info('audio:effects |  Applying delay effect with value:', value);
    linearRamp(audioContext, delay.delayTime, delayTime, 0.5);
    linearRamp(audioContext, feedback.gain, scaleFeedback(value), 0.5);
    linearRamp(audioContext, wet.gain, scaleWet(value), 0.2);
  };

  return {
    fx,
    input,
    close: () => {
      if (DEBUG) console.info('audio:effects |  Closing delay effect');
      delay.disconnect();
      feedback.disconnect();
    },
  };
};

/**
 * Creates an impulse response.
 * @param {AudioContext} audioContext - The audio context.
 * @param {number} duration - The duration of the impulse response.
 * @param {number} decay - The decay of the impulse response.
 * @param {boolean} reverse - Whether to reverse the impulse response.
 * @returns {AudioBuffer} - The impulse response.
 */
function impulseResponse(
  audioContext: {
    sampleRate: any;
    createBuffer: (arg0: number, arg1: number, arg2: any) => any;
  },
  duration: number,
  decay: number,
  reverse: boolean
) {
  if (DEBUG)
    console.info(
      'Creating impulse response with duration:',
      duration,
      'decay:',
      decay,
      'reverse:',
      reverse
    );
  var sampleRate = audioContext.sampleRate;
  var length = sampleRate * duration;
  var impulse = audioContext.createBuffer(2, length, sampleRate);
  var impulseL = impulse.getChannelData(0);
  var impulseR = impulse.getChannelData(1);

  if (!decay) decay = 2;
  for (var i = 0; i < length; i++) {
    var n = reverse ? length - i : i;
    impulseL[i] = (Math.random() * 2 - 1) * Math.pow(1 - n / length, decay);
    impulseR[i] = (Math.random() * 2 - 1) * Math.pow(1 - n / length, decay);
  }
  return impulse;
}

/**
 * Creates a reverb effect.
 * @param {AudioContext} audioContext - The audio context.
 * @param {AudioNode} destination - The destination audio node.
 * @returns {object} - The reverb effect.
 */
export const createReverb = (
  audioContext: BaseAudioContext,
  destination: AudioNode
) => {
  if (DEBUG) console.info('audio:effects |  Creating reverb effect');
  const impulse = impulseResponse(audioContext, 2, 2, false);
  const convolver = audioContext.createConvolver();
  convolver.buffer = impulse;

  const highPassFilter = new BiquadFilterNode(audioContext, {
    type: 'highpass',
    frequency: 100,
  });
  convolver.connect(highPassFilter);

  const input = new GainNode(audioContext, { gain: 1 });
  const wet = new GainNode(audioContext, { gain: 0 });
  const dry = new GainNode(audioContext, { gain: 1 });
  input.connect(wet);
  input.connect(dry);
  wet.connect(convolver);
  highPassFilter.connect(destination);
  dry.connect(destination);

  const fx = (value: number) => {
    if (DEBUG)
      console.info(
        'audio:effects |  Applying reverb effect with value:',
        value
      );
    linearRamp(audioContext, dry.gain, 1 - Math.sqrt(value * 0.5)); // Smooth square root ramp-down
    linearRamp(audioContext, wet.gain, Math.sqrt(value) * 3); // Smooth square root ramp-up
  };

  return {
    fx,
    input,
    close: () => {
      if (DEBUG) console.info('audio:effects |  Closing reverb effect');
      convolver.disconnect();
      highPassFilter.disconnect();
    },
  };
};

/**
 * Transforms a value using a function and a getter/setter.
 * @param {function} fn - The function to transform the value.
 * @param {function} getterSetter - The getter/setter for the value.
 * @returns {function} - The transformed value.
 */
const transform =
  (
    fn: { (value: any): number; (arg0: any): any },
    getterSetter: (args?: any) => any
  ) =>
  (value: undefined) => {
    if (value === undefined) {
      return getterSetter();
    }
    getterSetter(fn(value));
  };

/**
 * Creates a linear ramp.
 * @param {AudioContext} audioContext - The audio context.
 * @param {AudioParam} audioParam - The audio parameter to ramp.
 * @param {number} value - The value to ramp to.
 * @param {number} rampTime - The time to ramp over.
 * @returns {function} - The linear ramp.
 */
export const linearRamp = noop(
  (
    audioContext: { currentTime: number },
    audioParam: {
      setValueAtTime: (arg0: any, arg1: any) => void;
      value: any;
      cancelAndHoldAtTime: (arg0: any) => void;
      linearRampToValueAtTime: (arg0: any, arg1: any) => void;
    },
    value: any,
    rampTime = 0.2
  ) => {
    if (DEBUG)
      console.info(
        'Linear ramping',
        audioParam,
        'to value:',
        value,
        'over time:',
        rampTime
      );
    audioParam.setValueAtTime(audioParam.value, audioContext.currentTime);

    // currently not supported in firefox
    // audioParam.cancelAndHoldAtTime(audioContext.currentTime);

    audioParam.linearRampToValueAtTime(
      value,
      audioContext.currentTime + rampTime
    );
  },
  20
);

/**
 * Creates a player channel effect.
 * @param {AudioContext} audioContext - The audio context.
 * @param {AudioNode} dryDestination - The dry destination audio node.
 * @param {AudioNode} fxDestination - The FX destination audio node.
 * @returns {object} - The player channel effect.
 */
export function playerChannelFX(
  audioContext: { createGain: () => any },
  dryDestination: any,
  fxDestination: any
) {
  if (DEBUG) console.info('audio:effects |  Creating player channel FX');
  const muteNode = audioContext.createGain();
  const dryGain = audioContext.createGain();
  dryGain.gain.value = 0;
  const wetGain = audioContext.createGain();
  wetGain.gain.value = 1;
  dryGain.connect(dryDestination);
  wetGain.connect(fxDestination);
  muteNode.connect(dryGain);
  muteNode.connect(wetGain);

  const fxEnabled = getterAndSetter((on: any) => {
    if (DEBUG) console.info('audio:effects |  FX enabled:', on);
    // use the gain nodes to turn fx on or off
    linearRamp(audioContext, dryGain.gain, on ? 0 : 1, 0.1);
    linearRamp(audioContext, wetGain.gain, on ? 1 : 0, 0.1);
  }, true);
  // fxEnabled(initialFxValue);

  const gain = smoothedGetterAndSetter(audioContext, muteNode, 'gain');
  // gain(initialGainValue);

  return { destination: muteNode, fxEnabled, gain };
}

/**
 * Creates a smoothed getter and setter.
 * @param {AudioContext} audioContext - The audio context.
 * @param {AudioNode} audioNode - The audio node.
 * @param {string} property - The property to get/set.
 * @returns {function} - The smoothed getter and setter.
 */
export const smoothedGetterAndSetter =
  (
    audioContext: any,
    audioNode: BiquadFilterNode,
    property: keyof BiquadFilterNode
  ) =>
  (value?: number) => {
    if (value === undefined) {
      if (typeof audioNode[property] === 'number') return audioNode[property];
      return (audioNode[property] as AudioParam).value;
    }
    if (DEBUG)
      console.info(
        'audio:effects |  Smoothly setting',
        property,
        'to value:',
        value
      );
    linearRamp(audioContext, audioNode[property], value);
  };

/**
 * Creates a getter and setter.
 * @param {function} f - The function to get/set.
 * @param {any} initialValue - The initial value.
 * @returns {function} - The getter and setter.
 */
export const getterAndSetter = (
  f: { (on: any): void; (arg0: null): void },
  initialValue: any = null
) => {
  let value = initialValue;
  return (newValue: null | undefined) => {
    if (newValue === undefined) {
      return value;
    }
    value = newValue;
    if (DEBUG) console.info('audio:effects |  Setting value:', value);
    f(value);
  };
};

/**
 * Gets an XY effect.
 * @param {object} params - The parameters for the effect.
 * @returns {function} - The XY effect.
 */
export function getXYEffect({
  stutter,
  lowPassFilter,
  highPassFilter,
  reverb,
}: {
  stutter: any;
  lowPassFilter: any;
  highPassFilter: any;
  reverb: any;
}) {
  return (x: number, y: number) => {
    const delaxFxAmount = Math.max(0, x - 0.5) * 2;
    const lowpassAmount = 1 - Math.max(0, y - 0.5) * 2 * 0.5;
    const highpassAmount = Math.max(1 - y * 2, 0);
    const reverbAmount = Math.max(1 - x * 2, 0);
    if (DEBUG)
      console.info('audio:effects |  Applying XY effect with values:', {
        delaxFxAmount,
        lowpassAmount,
        highpassAmount,
        reverbAmount,
      });
    stutter.fx(delaxFxAmount);
    lowPassFilter.frequency(lowpassAmount);
    highPassFilter.frequency(highpassAmount);
    reverb.fx(reverbAmount);
  };
}

/**
 * Creates an effects chain.
 * @param {AudioContext} audioContext - The audio context.
 * @param {AudioNode} destination - The destination audio node.
 * @param {number} bpm - Beats per minute.
 * @returns {object} - The effects chain.
 */
export const effectsChain = (
  audioContext: AudioContext,
  destination: AudioNode,
  bpm: number | undefined
): EffectsChain => {
  if (DEBUG)
    console.info('audio:effects |  Creating effects chain with bpm:', bpm);
  const stutter = createStutterEffect(audioContext, destination, bpm);
  const reverb = createReverb(audioContext, stutter.input);
  const lowPassFilter = createFilter(audioContext, reverb.input, {
    type: 'lowpass',
    frequency: 16000,
  });
  const highPassFilter = createFilter(audioContext, lowPassFilter.input, {
    type: 'highpass',
    frequency: 25,
    Q: 1.2,
  }); // Increased resonance
  const xyEffect = getXYEffect({
    highPassFilter,
    stutter,
    lowPassFilter,
    reverb,
  });

  const close = () => {
    if (DEBUG) console.info('audio:effects |  Closing effects chain');
    stutter.close();
    reverb.close();
    lowPassFilter.close();
    highPassFilter.close();
  };
  return { destination: highPassFilter.input, xyEffect, close };
};

/**
 * Creates a filter.
 * @param {AudioContext} audioContext - The audio context.
 * @param {AudioNode} destination - The destination audio node.
 * @param {object} props - The properties for the filter.
 * @returns {object} - The filter.
 */
export const createFilter = (
  audioContext: BaseAudioContext,
  destination: AudioNode,
  props = {}
) => {
  const filter = new BiquadFilterNode(audioContext, {
    type: 'lowpass',
    frequency: 8000,
    ...props,
  });
  filter.connect(destination);

  const frequency = transform(
    (value: number) => {
      if (DEBUG) console.info('audio:effects |  set frequency value', value);
      return Math.pow(10, value * 4) + 50;
    },
    smoothedGetterAndSetter(audioContext, filter, 'frequency')
  );
  if (DEBUG)
    console.info('audio:effects |  filter type', filter.type, 'props', props);

  return {
    frequency,
    input: filter,
    close: () => {
      filter.disconnect();
    },
  };
};
/**
 * Creates a master FX.
 * @param {AudioContext} audioContext - The audio context.
 * @returns {GainNode} - The master gain node.
 */
export function masterFx(audioContext: BaseAudioContext) {
  if (DEBUG) console.info('audio:effects |  Creating master FX');
  const masterGain = audioContext.createGain();

  // we don't increase the master gain because it seems the compressor
  // already applies make up gain
  masterGain.gain.value = 0.7;

  // create compressor after master gain. it should have a slow release time
  const compressor = new DynamicsCompressorNode(audioContext, {
    ratio: 20,
    threshold: -9,
    attack: 0.01,
    release: 0.5,
    knee: 5,
  });
  masterGain.connect(compressor);
  return { masterInput: masterGain, masterOutput: compressor };
}

/**
 * Wraps a scaling function to transition smoothly to a target value as input approaches zero.
 * It uses the original scaling function above a specified threshold and blends towards
 * the target value below this threshold.
 *
 * @param {number} threshold - Control value below which the transition begins.
 * @param {number} targetValue - Target value for the function output as input nears zero.
 * @param {function} originalScalingFunction - Original function to be modified.
 * @returns {function} Modified scaling function with smooth transition to target value.
 */
function smoothTransitionToValue(
  originalScalingFunction: (arg0: any) => number,
  targetValue: number,
  threshold = 0.1
) {
  return (value: number) => {
    if (value > threshold) {
      // Use the original scaling function if the value is above the threshold
      return originalScalingFunction(value);
    } else {
      // Calculate the scaling factor based on how close the value is to zero
      const scaleDownFactor = value / threshold;
      // Interpolate between the target value and the scaled value
      return (
        scaleDownFactor * originalScalingFunction(value) +
        (1 - scaleDownFactor) * targetValue
      );
    }
  };
}

// get level
export function getLevelAnalyser(
  audioContext: { createAnalyser: () => any },
  source: { connect: (arg0: any) => void }
) {
  if (DEBUG) console.info('audio:effects |  Creating level analyser');
  const analyser = audioContext.createAnalyser();
  analyser.fftSize = 32; // Use a smaller FFT size to use less resources
  source.connect(analyser);
  const data = new Uint8Array(analyser.frequencyBinCount);

  const getCurrentLevel = () => {
    analyser.getByteFrequencyData(data);
    let values = 0;
    const length = data.length;
    for (var i = 0; i < length; i++) {
      values += data[i];
    }
    const average = values / length;
    return average / 255;
  };
  return getCurrentLevel;
}
