/**
 * @fileOverview A set of global functions abstracting and extending the HTML5 audio element. If this is your first time using the library, please be sure to check the console for messages as you do so – most if not all failure conditions have specific warnings that will appear therein. The easing functions in the FuSound library are adapted from Robert Penner's ActionScript easing functions; the terms of use can be found here: <a href="http://www.robertpenner.com/easing_terms_of_use.html">http://www.robertpenner.com/easing_terms_of_use.html</a>.
 * @author furkle, http://furkleindustries.com
 * @version 0.0.1 
 */

(function() {
	var INCLUDE_MASTER_VOLUME_SLIDER = true;
	var MASTER_VOLUME_PARENT = 'body';
	var MASTER_VOLUME_ID = 'masterVolumeSlider';
	var MASTER_VOLUME_CLASS = '';
	var MASTER_VOLUME_LEVEL = 1;
	var MASTER_VOLUME_STEP = 0.01;

	if (INCLUDE_MASTER_VOLUME_SLIDER) {
		var masterVolumeSlider = document.createElement('input');
		masterVolumeSlider.setAttribute('id', MASTER_VOLUME_ID);
		masterVolumeSlider.setAttribute('class', MASTER_VOLUME_CLASS);
		masterVolumeSlider.setAttribute('type', 'range');
		masterVolumeSlider.setAttribute('max', 1);
		masterVolumeSlider.setAttribute('min', 0);
		masterVolumeSlider.setAttribute('value', MASTER_VOLUME_LEVEL);
		masterVolumeSlider.setAttribute('step', MASTER_VOLUME_STEP);
		masterVolumeSlider.addEventListener('input', function() {
			window.fuSetMasterVolume(Number(masterVolumeSlider.value));
		});
		document.querySelector(MASTER_VOLUME_PARENT).appendChild(masterVolumeSlider);
	}

	var DEBUG = true;
	var DEBUG_PANEL_PARENT = 'body';
	var DEBUG_PANEL_ID = 'debugPanel';
	var DEBUG_PANEL_CLASS = '';
	if (DEBUG) {
		var debugPanel = document.createElement('div');
		debugPanel.setAttribute('id', DEBUG_PANEL_ID);
		debugPanel.setAttribute('class', DEBUG_PANEL_CLASS);
		document.querySelector(DEBUG_PANEL_PARENT).appendChild(debugPanel);
	}

	var fuMasterVolume = 1;
	/** 
	 * An object containing all FuSound objects created in the current session. The keys of this object are identical to the name of the corresponding FuSound Value. For example, a successfully created FuSound with the name 'sound' will be automatically assigned to fuSoundCollection['sound']/fuSoundCollection.sound. However, there is never a need to access fuSoundCollection; all public fuSound methods will use valid FuSound names to access the relevant FuSound within the collection.
	 * @type {Object.<string, number>}
	 * @global
	 */
	window.fuSoundCollection = {};
	/** 
	 * An immutable enum-like object containing the possible values for easings used to fade sounds. It is impossible to change anything within this object or add to it. In ES6, attempting to do so will produce a log message; changes made in earlier versions of ES will fail silently.
	 * @global
	 * @enum {string}
	 * @const
	 */
	window.fuSoundEasings = {
		/** Move at a linear rate from start to finish. Note: timing does not affect linear fading. volume = x. */
		LINEAR: 'linear',
		/** Move at a quadratic rate from start to finish. volume = x^2. */
		QUADRATIC: 'quadratic',
		/** Move at a cubic rate from start to finish. volume = x^3. */
		CUBIC: 'cubic',
		/** Move at a quartic rate from start to finish. volume = x^4. */
		QUARTIC: 'quartic',
		/** Move at a quintic rate from start to finish. volume = x^5. */
		QUINTIC: 'quintic',
		/** Move at a exponential rate from start to finish. volume = x^10. */
		EXPONENTIAL: 'exponential'
	};
	Object.freeze(Object.seal(window.fuSoundEasings));
	if (typeof(Proxy) === 'function') {
		window.fuSoundEasings = new Proxy(window.fuSoundEasings, {
			set: function() {
				console.log('window.fuSoundEasings is frozen and sealed, and cannot be altered.');
			}
		});
	}
	/** 
	 * An immutable enum-like object containing the possible values for timings used to fade sounds. It is impossible to change anything within this object or add to it. In ES6, attempting to do so will produce a log message; changes made in earlier versions of ES will fail silently.
	 * @global
	 * @enum {string}
	 * @const
	 */
	window.fuSoundTimings = {
		/** Perform easing during the first half of the fade. */
		EASEIN: 'easeIn',
		/** Perform easing during the second half of the fade. */
		EASEOUT: 'easeOut',
		/** Perform easing at for the whole of the fade. */
		EASEINOUT: 'easeInOut'
	};
	Object.freeze(Object.seal(window.fuSoundTimings));
	if (typeof(Proxy) === 'function') {
		window.fuSoundTimings = new Proxy(window.fuSoundTimings, {
			set: function() {
				console.log('window.fuSoundTimings is frozen and sealed, and cannot be altered.');
			}
		});
	}

	// default constants
	var ELEMENT_VOLUME = 1;
	var FADING_STATUS = false;
	var FADING_EASING_TYPE = window.fuSoundEasings.LINEAR;
	var FADING_TIMING_TYPE = window.fuSoundTimings.EASEINOUT;
	var FADING_DURATION = 1000;
	var FADING_STEPS = 100;
	
	/** 
	 * Encapsulates the audio element and related metadata.
	 * @constructor
	 * @param {string} name The name of the sound object. This corresponds exactly to the string:FuSound key-value pair within window.fuSoundCollection.
	 * @param {string} src The source of the audio file to be played by the object.
	 * @param {boolean} [autoplay=false] Whether the sound should begin playing as soon as the object is constructed.
	 * @param {boolean} [loop=false] Whether the sound should loop back to the beginning and continue playing after the end of the track is reached.
	 * @param {string|number} [volume=1] The volume to be assigned to the sound object. This is multiplied by the master volume level to determine the real volume of the element.
	 * @param {boolean|string|object} [fade={@link FuSound#fade link}] The precise manner in which the sound fades in and out.
	 */
	function FuSound(name, src, autoplay, loop, volume, fade) {
		if (typeof(name) !== 'string' || !name) {
			console.log('The name property (' + name + '), in the FuSound constructor, is not a valid string.');
			return;
		} else if (typeof(src) !== 'string' || !src) {
			console.log('The src property (' + src + '), in the FuSound constructor, is not a valid string.');
			return;
		}

		/**
		 * @type {string}
		 */
		this.name = name;

		/**
		 * @type {HTMLAudioElement}
		 */
		this.audioElement = createAudioWithErrorHandling();
		this.audioElement.src = src;

		if (autoplay === true) {
			this.audioElement.autoplay = true;
		}

		if (loop === true) {
			this.audioElement.loop = true;
		}
		
		/**
		 * @type {number}
		 */
		this.volume = ELEMENT_VOLUME;
		this.audioElement.volume = ELEMENT_VOLUME;
		if (validateVolume(volume, 'FuSound constructor', true)) {
			this.volume = Number(volume);
			this.audioElement.volume = Number(volume);
		}

		/** Contains the
		 * @type {object}
		 * @property {boolean} [fade.isFading=false]
		 * @property {string} [fade.easing='linear']
		 * @property {string} [fade.timing='easeInOut']
		 * @property {number} [fade.duration=1000]
		 * @property {number} [fade.steps=100]
		 */
		this.fade = {
			isFading: FADING_STATUS,
			easing: FADING_EASING_TYPE,
			timing: FADING_TIMING_TYPE,
			duration: FADING_DURATION,
			steps: FADING_STEPS
		};
		var newFade = initializeFade(fade, this.fade, true);
		if (newFade) {
			this.fade = newFade;
		}
		/**
		 * Plays the audio element. Calls the audio element's play method.
		 * @returns {undefined}
		 */
		this.play = function() {
			this.audioElement.play();
		};
		/**
		 * Pauses the audio element. Calls the audio element's pause method.
		 * @returns {undefined}
		 */
		this.pause = function() {
			this.audioElement.pause();
		};
	}
	var DEBUG_SOUND_CLASS = 'debugSound';
	var DEBUG_SOUND_STYLE = 'display: inline-block';
	var DEBUG_SOUND_TITLE_CLASS = 'debugSoundTitle';
	var DEBUG_SOUND_SLIDER_CLASS = 'debugSoundSlider';
	var DEBUG_SOUND_NAME_ATTR = 'data-sound-name';

	window.REPLACE_DUPLICATE_FUSOUND_KEYS = true;
	/**
	 * The factory method for creating FuSound objects. If either of the mandatory arguments (name and src) are invalid, the method will return undefined.
	 * @global
	 * @param {string} name The name of the sound object. This corresponds exactly to the string:FuSound key-value pair within window.fuSoundCollection.
	 * @param {string} src The source of the audio file to be played by the object.
	 * @param {boolean} [autoplay=false] Whether the sound should begin playing as soon as the object is constructed.
	 * @param {boolean} [loop=false] Whether the sound should loop back to the beginning and continue playing after the end of the track is reached.
	 * @param {string|number} [volume=1] The volume to be assigned to the sound object. This is multiplied by the master volume level to determine the real volume of the element.
	 * @param {boolean|string|object} [fade] The precise manner in which the sound fades in and out. How FuSound.fade is set depends on the type as the fade argument. If fade is a boolean, fade.isFading takes on that value. If fade is a string, and the string is the same one of the types of easings or timings, then fade.easing or fade.timing are set, respectively. If fade is an object, the properties corresponding with FuSound.fade's properties are assigned to FuSound.fade if their values are valid.
	 * @param {boolean} [fade.isFading=false] Determines whether or not the volume is faded when an action (play, pause, stop, individual FuSound volume adjustment) is performed.
	 * @param {string} [fade.easing='linear'] Determines which of the easing functions ({@link fuSoundEasings}) to use.
	 * @param {string} [fade.timing='easeInOut'] Determines which of the timing types ({@link fuSoundTimings}) to use. Every easing save for linear has different effects based on the selected timing.
	 * @param {number} [fade.duration=1000] Determines how long the fade will last, from start to end. This value represents the number of milliseconds that will elapse.
	 * @param {number} [fade.steps=100] Determines the number of steps the easing function will take to fade the volume from start to finish.
	 * @returns {FuSound|undefined}
	 */
	window.fuMakeSound = function(name, src, autoplay, loop, volume, fade) {
		if (typeof(name) !== 'string' || !name) {
			console.log('The name property (' + name + '), in the FuSound constructor, is not a valid string. Aborting construction of new FuSound.');
			return;
		} else if (typeof(src) !== 'string' || !src) {
			console.log('The src property (' + src + '), in the FuSound constructor, is not a valid string. Aborting construction of new FuSound.');
			return;
		}

		if (Object.getOwnPropertyNames(fuSoundCollection).indexOf(name) !== -1) {
			if (REPLACE_DUPLICATE_FUSOUND_KEYS) {
				console.log('A FuSound object with the name "' + name + '" already exists! Replacing with new FuSound.');
				var dupe = document.querySelector('.' + DEBUG_SOUND_CLASS + '[' + DEBUG_SOUND_NAME_ATTR + '="' + name + '"]');
				if (dupe && dupe.remove) {
					dupe.remove();
				}
			} else {
				console.log('A FuSound object with the name "' + name + '" already exists! Aborting construction of new FuSound.');
				return;
			}
		}

		var sound = new FuSound(name, src, autoplay, loop, volume, fade);
		window.fuSoundCollection[name] = sound;

		if (DEBUG && document.querySelector('#' + DEBUG_PANEL_ID)) {
			var debugSound = document.createElement('div');
			debugSound.setAttribute('class', DEBUG_SOUND_CLASS);
			debugSound.setAttribute('style', DEBUG_SOUND_STYLE);
			debugSound.setAttribute(DEBUG_SOUND_NAME_ATTR, name);

			var debugSoundTitle = document.createElement('p');
			debugSoundTitle.setAttribute('class', DEBUG_SOUND_TITLE_CLASS);
			debugSoundTitle.textContent = sound.name;
			debugSound.appendChild(debugSoundTitle);

			var debugSoundSlider = document.createElement('input');
			debugSoundSlider.setAttribute('class', DEBUG_SOUND_SLIDER_CLASS);
			debugSoundSlider.setAttribute('type', 'range');
			debugSoundSlider.setAttribute('max', 1);
			debugSoundSlider.setAttribute('min', 0);
			debugSoundSlider.setAttribute('value', sound.volume);
			debugSoundSlider.setAttribute('step', MASTER_VOLUME_STEP);
			debugSoundSlider.setAttribute(DEBUG_SOUND_NAME_ATTR, sound.name);
			debugSoundSlider.addEventListener('input', function() {
				setVolume(Number(debugSoundSlider.value), sound, true);
			});
			debugSound.appendChild(debugSoundSlider);

			document.querySelector('#' + DEBUG_PANEL_ID).appendChild(debugSound);
		}

		return sound;
	};
	/**
	 * Plays the provided FuSounds, or the FuSounds corresponding to the names provided. As many FuSound names or FuSound objects (or mix thereof) as desired can be supplied as arguments. If no arguments are supplied to the function, all FuSounds which exist at the time the function is called will be played.
	 * @global
	 * @param {...string|FuSound} [variadic]
	 * @returns {undefined}
	 */
	window.fuPlaySound = function() {
		if (arguments.length === 0) {
			getNamedPropertyValues(window.fuSoundCollection).forEach(function(aa) {
				playSound(aa);
			});
			return;
		}
		var flatArgs = flattenArray(Array.prototype.slice.call(arguments));
		for (var ii = 0; ii < flatArgs.length; ii++) {
			var target = flatArgs[ii];
			var obj;
			if (typeof(target) === 'object') {
				obj = target;
			} else if (typeof(target) === 'string') {
				if (window.fuSoundCollection[target]) {
					obj = window.fuSoundCollection[target];
				} else {
					obj = createAudioWithErrorHandling();
					obj.src = target;
				}
			} else {
				console.log('A target parameter (' + target + '), in the fuPlaySound method, is not valid.');
				continue;
			}

			playSound(obj);
		}
	};
	function playSound(soundObj) {
		if (!validateAudioTarget(soundObj, 'playSound method')) {
			return;
		}
		if (soundObj.fade && soundObj.fade.isFading) {
			doFade(soundObj, 'play');
		} else {
			soundObj.play();
		}
	}
	/**
	 * Sets the master volume level, affecting all FuSound objects. When volume calculations are performed, the volume of each individual FuSound object is multiplied by this value to produce their real volume. The value must be between [0, 1]; setting the value outside that range will likely in errors each time a FuSound's volume is set or faded.
	 * @global
	 * @param {string|number} value A number between [0, 1] or string representation thereof.
	 * @returns {undefined}
	 */
	window.fuSetMasterVolume = function(value) {
		if (!validateVolume(value, 'fuSetMasterVolume method')) {
			return;
		}
		fuMasterVolume = Number(value);
		getNamedPropertyValues(window.fuSoundCollection).forEach(function(aa) {
			setVolume(aa.volume, aa, true);
		});
		var volSlider = document.querySelector('#' + MASTER_VOLUME_ID);
		if (volSlider && volSlider.value) {
			volSlider.value = fuMasterVolume;
		}
	};
	/**
	 * Sets the volume of the provided FuSounds, or the FuSounds corresponding to the names provided. As many FuSound names or FuSound objects (or mix thereof) as desired can be supplied as arguments. If no arguments are supplied to the function, all FuSounds which exist at the time the function is called will be set to the provided volume.
	 * @global
	 * @param {string|number} value
	 * @param {...string|FuSound} [variadic]
	 * @returns {undefined}
	 */
	window.fuSetVolume = function(value) {
		if (!validateVolume(value, 'fuSetVolume method')) {
			return;
		} else if (arguments.length === 1) {
			getNamedPropertyValues(window.fuSoundCollection).forEach(function(aa) {
				setVolume(Number(value), aa);
			});
			return;
		}
		var flatArgs = flattenArray(Array.prototype.slice.call(arguments).slice(1));
		if (!validateAudioTarget(flatArgs, 'fuSetVolume method')) {
			return;
		}
		for (var ii = 0; ii < flatArgs.length; ii++) {
			var target = flatArgs[ii];
			if (typeof(target) === 'object') {
				setVolume(value, target);
			} else if (typeof(target) === 'string') {
				if (window.fuSoundCollection[target]) {
					setVolume(value, window.fuSoundCollection[target]);
				} else {
					console.log('A target parameter string (' + target + ') does not correspond to a property of the window.fuSoundCollection object.');
				}
			}  else {
				console.log('A target parameter (' + target + '), in the fuSetVolume method, is not valid.');
			}
		}
	};
	function setVolume(value, soundObj, overrideFade) {
		if (!validateVolume(value, 'setVolume method') ||
			!validateAudioTarget(soundObj, 'setVolume method')) 
		{
			return;
		}
		var val = Number(value);
		if (soundObj.fade && soundObj.fade.isFading && !overrideFade) {
			doFade(soundObj, 'volume', val);
		} else {
			soundObj.volume = val;
			soundObj.audioElement.volume = val * fuMasterVolume;
		}
		var slider = document.querySelector('input.' + DEBUG_SOUND_SLIDER_CLASS + '[' + DEBUG_SOUND_NAME_ATTR + '="' + soundObj.name + '"]');
		if (slider) {
			slider.value = val;
		}
	}
	/**
	 * Pauses the provided FuSounds, or the FuSounds corresponding to the names provided. As many FuSound names or FuSound objects (or mix thereof) as desired can be supplied as arguments. If no arguments are supplied to the function, all FuSounds which exist at the time the function is called will be paused.
	 * @global
	 * @param {...string|FuSound} [variadic]
	 * @returns {undefined}
	 */
	window.fuPauseSound = function() {
		if (arguments.length === 0) {
			getNamedPropertyValues(window.fuSoundCollection).forEach(function(aa) {
				pauseSound(aa);
			});
			return;
		}
		var flatArgs = flattenArray(Array.prototype.slice.call(arguments));
		if (!validateAudioTarget(flatArgs, 'fuPauseSound method')) {
			return;
		}
		for (var ii = 0; ii < flatArgs.length; ii++) {
			var target = flatArgs[ii];
			if (typeof(target) === 'object') {
				pauseSound(target);
			} else if (typeof(target) === 'string') {
				if (window.fuSoundCollection[target]) {
					pauseSound(window.fuSoundCollection[target]);
				} else {
					console.log('A target parameter string (' + target + ') does not correspond to a property of the window.fuSoundCollection object.');
				}
			}  else {
				console.log('A target parameter (' + target + '), in the fuPauseSound method, is not valid.');
			}
		}
	};
	function pauseSound(target) {
		if (!validateAudioTarget(target, 'pauseSound method')) {
			return;
		}
		if (target.fade && target.fade.isFading) {
			doFade(target, 'pause');
		} else {
			target.pause();
		}
	}
	/**
	 * Pauses the provided FuSounds, or the FuSounds corresponding to the names provided. As many FuSound names or FuSound objects (or mix thereof) as desired can be supplied as arguments. If no arguments are supplied to the function, all FuSounds which exist at the time the function is called will be paused.
	 * @global
	 * @param {...string|FuSound} [variadic]
	 * @returns {undefined}
	 */
	window.fuStopSound = function() {
		if (arguments.length === 0) {
			getNamedPropertyValues(window.fuSoundCollection).forEach(function(aa) {
				stopSound(aa);
			});
			return;
		}
		var flatArgs = flattenArray(Array.prototype.slice.call(arguments));
		if (!validateAudioTarget(flatArgs, 'fuStopSound method')) {
			return;
		}
		for (var ii = 0; ii < flatArgs.length; ii++) {
			var target = flatArgs[ii];
			if (typeof(target) === 'object') {
				stopSound(target);
			} else if (typeof(target) === 'string') {
				if (window.fuSoundCollection[target]) {
					stopSound(window.fuSoundCollection[target]);
				} else {
					console.log('A target parameter string (' + target + ') does not correspond to a property of the window.fuSoundCollection object.');
				}
			}  else {
				console.log('A target parameter (' + target + '), in the fuStopSound method, is not valid.');
			}
		}
	};
	function stopSound(target) {
		if (!validateAudioTarget(target, 'pauseSound method')) {
			return;
		}
		if (target.fade && target.isFading) {
			doFade(target, 'stop');
		} else {
			var targetEl;
			if (target.audioElement) {
				targetEl = target.audioElement;
			} else {
				targetEl = target;
			}
			pauseSound(targetEl);
			targetEl.currentTime = 0;
		}
	}
	/**
	 * Rewinds the provided FuSounds, or the FuSounds corresponding to the names provided. As many FuSound names or FuSound objects (or mix thereof) as desired can be supplied as arguments. If no arguments are supplied to the function, the tracks of all FuSounds which exist at the time the function is called will be rewound to their beginning.
	 * @global
	 * @param {...string|FuSound} [variadic]
	 * @returns {undefined}
	 */
	window.fuRewindSound = function() {
		if (arguments.length === 0) {
			getNamedPropertyValues(window.fuSoundCollection).forEach(function(aa) {
				rewindSound(aa);
			});
			return;
		}
		var flatArgs = flattenArray(Array.prototype.slice.call(arguments));
		if (!validateAudioTarget(flatArgs, 'fuRewindSound method')) {
			return;
		}
		for (var ii = 0; ii < flatArgs.length; ii++) {
			var target = flatArgs[ii];
			if (typeof(target) === 'object') {
				rewindSound(target);
			} else if (typeof(target) === 'string') {
				if (window.fuSoundCollection[target]) {
					rewindSound(window.fuSoundCollection[target]);
				} else {
					console.log('A target parameter string (' + target + ') does not correspond to a property of the window.fuSoundCollection object.');
				}
			}  else {
				console.log('A target parameter (' + target + '), in the fuRewindSound method, is not valid.');
			}
		}
	};
	function rewindSound(target) {
		if (!validateAudioTarget(target, 'pauseSound method')) {
			return;
		} 

		var targetEl;
		if (target.audioElement) {
			targetEl = target.audioElement;
		} else {
			targetEl = target;
		}
		targetEl.currentTime = 0;
	}
	/**
	 * Lowers the volume of the provided FuSounds, or the FuSounds corresponding to the names provided. As many FuSound names or FuSound objects (or mix thereof) as desired can be supplied as arguments. If no arguments are supplied to the function, the volumes of all FuSounds which exist at the time the function is called will lowered by 0.1. If the resultant value is less than 0 for any FuSound, the volume of that object will be set to 0.
	 * @global
	 * @param {...string|FuSound} [variadic]
	 * @returns {undefined}
	 */
	window.fuQuieter = function() {
		var quietVal;
		if (arguments.length === 0) {
			getNamedPropertyValues(window.fuSoundCollection).forEach(function(aa) {
				quietVal = aa.volume - 0.1;
				if (quietVal < 0) {
					quietVal = 0;
				}
				setVolume(quietVal, aa);
			});
			return;
		}

		var flatArgs = flattenArray(Array.prototype.slice.call(arguments));
		if (!validateAudioTarget(flatArgs, 'fuQuieter method')) {
			return;
		}
		for (var ii = 0; ii < flatArgs.length; ii++) {
			var target = flatArgs[ii];
			if (typeof(target) === 'object') {
				quietVal = target.volume - 0.1;
				if (quietVal < 0) {
					quietVal = 0;
				}
				setVolume(quietVal, target);
			} else if (typeof(target) === 'string') {
				if (window.fuSoundCollection[target]) {
					quietVal = target.volume - 0.1;
					if (quietVal < 0) {
						quietVal = 0;
					}
					setVolume(quietVal, window.fuSoundCollection[target]);
				} else {
					console.log('A target parameter string (' + target + ') does not correspond to a property of the window.fuSoundCollection object.');
				}
			}  else {
				console.log('A target parameter (' + target + '), in the fuQuieter method, is not valid.');
			}
		}
	};
	/**
	 * Raises the volume of the provided FuSounds, or the FuSounds corresponding to the names provided. As many FuSound names or FuSound objects (or mix thereof) as desired can be supplied as arguments. If no arguments are supplied to the function, the volumes of all FuSounds which exist at the time the function is called will increased by 0.1. If the resultant value is greater than 1 for any FuSound, the volume of that object will be set to 1.
	 * @global
	 * @param {...string|FuSound} [variadic]
	 * @returns {undefined}
	 */
	window.fuLouder = function() {
		var loudVal;
		if (arguments.length === 0) {
			getNamedPropertyValues(window.fuSoundCollection).forEach(function(aa) {
				loudVal = aa.volume + 0.1;
				if (loudVal > 1) {
					loudVal = 1;
				}
				setVolume(loudVal, aa);
			});
			return;
		}

		var flatArgs = flattenArray(Array.prototype.slice.call(arguments));
		if (!validateAudioTarget(flatArgs, 'fuQuieter method')) {
			return;
		}
		for (var ii = 0; ii < flatArgs.length; ii++) {
			var target = flatArgs[ii];
			if (typeof(target) === 'object') {
				loudVal = target.volume + 0.1;
				if (loudVal > 1) {
					loudVal = 1;
				}
				setVolume(loudVal, target);
			} else if (typeof(target) === 'string') {
				if (window.fuSoundCollection[target]) {
					loudVal = target.volume + 0.1;
					if (loudVal > 0) {
						loudVal = 1;
					}
					setVolume(loudVal, window.fuSoundCollection[target]);
				} else {
					console.log('A target parameter string (' + target + ') does not correspond to a property of the window.fuSoundCollection object.');
				}
			}  else {
				console.log('A target parameter (' + target + '), in the fuLouder method, is not valid.');
			}
		}
	};
	/**
	 * Sets the provided FuSounds, or the FuSounds corresponding to the names provided, to repeat playing infinitely. When the end of the track is reached, it begins again from the start. As many FuSound names or FuSound objects (or mix thereof) as desired can be supplied as arguments. If no arguments are supplied to the function, all FuSounds which exist at the time the function is called will be set to loop.
	 * @global
	 * @param {...string|FuSound} [variadic]
	 * @returns {undefined}
	 */
	window.fuLoopSound = function() {
		if (arguments.length === 0) {
			getNamedPropertyValues(window.fuSoundCollection).forEach(function(aa) {
				doLoop(aa, 'loop');
			});
			return;
		}
		var flatArgs = flattenArray(Array.prototype.slice.call(arguments));
		if (!validateAudioTarget(flatArgs, 'fuLoopSound method')) {
			return;
		}
		for (var ii = 0; ii < flatArgs.length; ii++) {
			var target = flatArgs[ii];
			if (typeof(target) === 'object') {
				doLoop(target, 'loop');
			} else if (typeof(target) === 'string') {
				if (window.fuSoundCollection[target]) {
					doLoop(window.fuSoundCollection[target], 'loop');
				} else {
					console.log('A target parameter string (' + target + ') does not correspond to a property of the window.fuSoundCollection object.');
				}
			}  else {
				console.log('A target parameter (' + target + '), in the fuLoopSound method, is not valid.');
			}
		}
	};
	/**
	 * Sets the provided FuSounds, or the FuSounds corresponding to the names provided, to end after they complete their track. As many FuSound names or FuSound objects (or mix thereof) as desired can be supplied as arguments. If no arguments are supplied to the function, all FuSounds which exist at the time the function is called will be set to loop.
	 * @global
	 * @param {...string|FuSound} [variadic]
	 * @returns {undefined}
	 */
	window.fuUnloopSound = function() {
		if (arguments.length === 0) {
			getNamedPropertyValues(window.fuSoundCollection).forEach(function(aa) {
				doLoop(aa, 'unloop');
			});
			return;
		}
		var flatArgs = flattenArray(Array.prototype.slice.call(arguments));
		if (!validateAudioTarget(flatArgs, 'fuUnloopSound method')) {
			return;
		}
		for (var ii = 0; ii < flatArgs.length; ii++) {
			var target = flatArgs[ii];
			if (typeof(target) === 'object') {
				doLoop(target, 'unloop');
			} else if (typeof(target) === 'string') {
				if (window.fuSoundCollection[target]) {
					doLoop(window.fuSoundCollection[target], 'unloop');
				} else {
					console.log('A target parameter string (' + target + ') does not correspond to a property of the window.fuSoundCollection object.');
				}
			}  else {
				console.log('A target parameter (' + target + '), in the fuUnloopSound method, is not valid.');
			}
		}
	};
	function doLoop(target, action) {
		if (action !== 'loop' && action !== 'unloop') {
			console.log('The action parameter (' + action + '), in the doLoop method, is not valid. Acceptable values are "loop" and "unloop".');
			return;
		}
		var val;
		if (action === 'loop') {
			val = true;
		} else if (action === 'unloop') {
			val = false;
		}
		if (typeof(target) === 'undefined') {
			getNamedPropertyValues(window.fuSoundCollection).forEach(function(aa) {
				aa.audioElement.loop = val;
			});
		}
		if (!validateAudioTarget(target, 'doLoop method')) {
			return;
		}
		if (typeof(target) === 'string') { 
			window.fuSoundCollection[target].audioElement.loop = val;
		} else if (typeof(target) === 'object') {
			var targetEl;
			if (target.audioElement) {
				targetEl = target.audioElement;
			} else {
				targetEl = target;
			}
			targetEl.loop = val;
		}
	}
	/**
	 * Sets the fade options for the provided FuSounds, or the FuSounds corresponding to the names provided. As many FuSound names or FuSound objects (or mix thereof) as desired can be supplied as arguments. If no arguments are supplied to the function, the provided (valid) fade will be applied to all FuSounds which exist at the time the function is called. Details on the forms the fade argument can take can be found {@link fuMakeSound here}. Note: if the value of fade is not false, and fade.isFading is not false, fade.isFading will be set to false when fuSetFade() completes.
	 * @global
	 * @param {boolean|string|object} fade {@link fuMakeSound link}
	 * @param {...string|FuSound} [variadic]
	 * @returns {undefined}
	 */
	window.fuSetFade = function(fade) {
		if (arguments.length === 1) {
			getNamedPropertyValues(window.fuSoundCollection).forEach(function(aa) {
				setFade(fade, aa);
			});
			return;
		}
		var flatArgs = flattenArray(Array.prototype.slice.call(arguments).slice(1));
		if (!validateAudioTarget(flatArgs, 'fuSetFade method')) {
			return;
		}
		for (var ii = 0; ii < flatArgs.length; ii++) {
			var target = flatArgs[ii];
			if (typeof(target) === 'object') {
				setFade(fade, target);
			} else if (typeof(target) === 'string') {
				if (window.fuSoundCollection[target]) {
					setFade(fade, window.fuSoundCollection[target]);
				} else {
					console.log('A target parameter string (' + target + ') does not correspond to a property of the window.fuSoundCollection object.');
				}
			}  else {
				console.log('A target parameter (' + target + '), in the fuSetFade method, is not valid.');
			}
		}
	};
	function setFade(value, soundObj) {
		var newFade = initializeFade(value, soundObj.fade);
		if (!newFade) {
			return;
		}
		if (value &&
			value !== false &&
			value.isFading !== false &&
			typeof(newFade.isFading) === 'boolean' &&
			getNamedPropertyValues(window.fuSoundEasings).indexOf(newFade.easing) !== -1 &&
			getNamedPropertyValues(window.fuSoundTimings).indexOf(newFade.timing) !== -1 &&
			typeof(newFade.duration) === 'number' &&
			!Number.isNaN(newFade.duration) &&
			newFade.duration > 0 &&
			typeof(newFade.steps) === 'number' &&
			!Number.isNaN(newFade.steps) &&
			newFade.steps > 0)
		{
			newFade.isFading = true;
		}
		soundObj.fade = newFade;
	}
	var easingFunctions = [];
	easingFunctions[window.fuSoundEasings.LINEAR] = linearEasing;
	easingFunctions[window.fuSoundEasings.QUADRATIC] = quadEasing;
	easingFunctions[window.fuSoundEasings.CUBIC] = cubeEasing;
	easingFunctions[window.fuSoundEasings.QUARTIC] = quartEasing;
	easingFunctions[window.fuSoundEasings.QUINTIC] = quintEasing;
	easingFunctions[window.fuSoundEasings.EXPONENTIAL] = expEasing;
	function doFade(soundObj, action, value) {
		if (!validateAudioTarget(soundObj, 'doFade method')) {
			return;
		}
		switch (action) {
			case 'play':
				if (!soundObj.audioElement.paused) {
					console.log('Can\'t fade to play – the element is already playing.');
					return;
				}
				break;
			case 'pause':
				if (soundObj.audioElement.paused) {
					console.log('Can\'t fade to pause – the element is already paused.');
					return;
				}
				break;
			case 'stop':
				if (soundObj.audioElement.paused && 
					soundObj.audioElement.currentTime === 0)
				{
					console.log('Can\'t fade to stop – the element is already stopped.');
					return;
				}
				break;
			case 'volume':
				if (!validateVolume(value)) {
					return;
				} else if (Number(value) === soundObj.volume) {
					console.log('Can\'t fade to volume (' + value + ') – the currently set volume is the same.');
					return;
				}
				break;
			default:
				console.log('The action parameter (' + action + '), in the doFade method, is not recognized.');
				return;
		}
		if (typeof(timing) !== 'string' && soundObj.fade.easing !== window.fuSoundEasings.LINEAR) {
			console.log('The sound object\'s fade.easing property is set to ' + soundObj.fade.easing + ', which requires the sound object\'s fade.timing property to be set to a valid timing property. However, the current value of fade.timing is ' + soundObj.fade.timing);
		}
		var time = 0;
		var initial;
		var change;
		if (action === 'play') {
			initial = 0;
			change = soundObj.volume;
			soundObj.play();
		} else if (action === 'pause' || action === 'stop') {
			initial = soundObj.volume;
			change = -soundObj.volume;
		} else if (action === 'volume') {
			initial = soundObj.volume;
			change = Number(value) - soundObj.volume;
		}
		var duration = soundObj.fade.duration;
		var step = duration / soundObj.fade.steps;
		var timing = soundObj.fade.timing;
		var func = easingFunctions[soundObj.fade.easing];
		var fadeInterval = window.setInterval(function() {
			var stepVolume = func(time, initial, change, duration, timing);
			if (typeof(stepVolume) === 'undefined' || Number.isNaN(stepVolume)) {
				window.clearInterval(fadeInterval);
				return;
			}
			soundObj.audioElement.volume = stepVolume * fuMasterVolume;
			console.log(soundObj.audioElement.volume);

			time += step;
			if (time >= duration) {
				if (action === 'volume') {
					soundObj.volume = initial + change;
				} else {
					soundObj.audioElement.volume = soundObj.volume * fuMasterVolume;
				}
				window.clearInterval(fadeInterval);
				return;
			}
		}, step);
	}
	/* ============================================================================================
	 * Adapted from Robert Penner's Easing Equations v2.0
	 * (c) 2003 Robert Penner, all rights reserved. 
	 * These equations are subject to the terms in http://www.robertpenner.com/easing_terms_of_use.html.
	 * ============================================================================================ */
	function linearEasing(time, initial, change, duration) {
		return change * time / duration + initial;
	}
	function quadEasing(time, initial, change, duration, timing) {
		if (timing === window.fuSoundTimings.EASE_IN) {
			return change * (time /= duration) * time + initial;
		} else if (timing === window.fuSoundTimings.EASE_OUT) {
			return -change * (time /= duration) * (time - 2) + initial;
		} else if (timing === window.fuSoundTimings.EASE_IN_OUT) {
			if ((time /= duration / 2) < 1) {
				return change / 2 * time * time + initial;
			}
			return -change / 2 * ((--time) * (time - 2) - 1) + initial;
		}
	}
	function cubeEasing(time, initial, change, duration, timing) {
		if (timing === window.fuSoundTimings.EASE_IN) {
			return change * (time /= duration) * time * time + initial;
		} else if (timing === window.fuSoundTimings.EASE_OUT) {
			return change * ((time = time / duration - 1) * time * time + 1) + initial;
		} else if (timing === window.fuSoundTimings.EASE_IN_OUT) {
			if ((time /= duration / 2) < 1) {
				return change / 2 * time * time * time + initial;
			}
			return change / 2 * ((time -= 2) * time * time + 2) + initial;
		}
	}
	function quartEasing(time, initial, change, duration, timing) {
		if (timing === window.fuSoundTimings.EASE_IN) {
			return change * (time /= duration) * time * time * time + initial;
		} else if (timing === window.fuSoundTimings.EASE_OUT) {
			return -change * ((time = time / duration - 1) * time * time * time - 1) + initial;
		} else if (timing === window.fuSoundTimings.EASE_IN_OUT) {
			if ((time /= duration / 2) < 1) {
				return change / 2 * time * time * time * time + initial;
			}
			return -change / 2 * ((time -= 2) * time * time * time - 2) + initial;
		}
	}
	function quintEasing(time, initial, change, duration, timing) {
		if (timing === window.fuSoundTimings.EASE_IN) {
			return change * (time /= duration) * time * time * time * time + initial;
		} else if (timing === window.fuSoundTimings.EASE_OUT) {
			return change * ((time = time / duration - 1) * time * time * time * time + 1) + initial;
		} else if (timing === window.fuSoundTimings.EASE_IN_OUT) {
			if ((time /= duration / 2) < 1) {
				return change / 2 * time * time * time * time * time + initial;
			}
			return change / 2 * ((time -= 2) * time * time * time * time + 2) + initial;
		}
	}
	function expEasing(time, initial, change, duration, timing) {
		if (timing === window.fuSoundTimings.EASE_IN) {
			return (time === 0) ? initial : change * Math.pow(2, 10 * (time / duration - 1)) + initial;
		} else if (timing === window.fuSoundTimings.EASE_OUT) {
			return (time === duration) ? initial + change : change * (-Math.pow(2, -10 * time / duration) + 1) + initial;
		} else if (timing === window.fuSoundTimings.EASE_IN_OUT) {
			if (time === 0) {
				return initial;
			} else if (time === duration) {
				return initial + change;
			} else if ((time /= duration / 2) < 1) {
				return change / 2 * Math.pow(2, 10 * (time - 1)) + initial;
			}
			return change / 2 * (-Math.pow(2, -10 * --time) + 2) + initial;
		}
	}
	function initializeFade(value, currentFade, suppressLogs) {
		if (typeof(value) === 'boolean') {
			currentFade.isFading = value;
		} else if (!value) {
			if (!suppressLogs) {
				console.log('The value parameter (' + value + '), in the initializeFade method, is not valid.');
			}
			return;
		} else if (!currentFade || typeof(currentFade) !== 'object') {
			if (!suppressLogs) {
				console.log('The currentFade parameter (' + currentFade + '), in the initializeFade method, is not valid.');
			}
			return;
		} else if (typeof(value) === 'string') {
			if (Object.getOwnPropertyNames(window.fuSoundEasings).indexOf(value.toUpperCase()) !== -1) {
				currentFade.easing = window.fuSoundEasings[value.toUpperCase()];
			} else if (Object.getOwnPropertyNames(window.fuSoundTimings).indexOf(value.toUpperCase()) !== -1) {
				currentFade.timing = window.fuSoundTimings[value.toUpperCase()];
			} else {
				if (!suppressLogs) {
					console.log('The string passed to the value parameter (' + value + ') is not a valid easing or timing.');
				}
				return;
			}
		} else if (typeof(value) === 'object') {
			if (typeof(value.isFading) === 'boolean') {
				currentFade.isFading = value.isFading;
			}
			if (value.easing && typeof(value.easing) === 'string') {
				if (Object.getOwnPropertyNames(window.fuSoundEasings).indexOf(value.easing.toUpperCase()) !== -1) {
					currentFade.easing = window.fuSoundEasings[value.easing.toUpperCase()];
				}
			} else if (typeof(value.easing) === 'object') {
				// custom easing support here
			}
			if (value.timing && typeof(value.timing) === 'string') {
				if (Object.getOwnPropertyNames(window.fuSoundTimings).indexOf(value.timing.toUpperCase()) !== -1) {
					console.log(value.timing);
					currentFade.timing = window.fuSoundTimings[value.timing.toUpperCase()];
				}
			}
			if (value.duration && Number(value.duration) > 0) {
				currentFade.duration = value.duration;
			}
			if (value.steps && Number(value.steps) > 0) {
				currentFade.steps = value.steps;
			}
		}

		return currentFade;
	}
	/**
	 * Deletes the provided FuSounds, or the FuSounds corresponding to the names provided. As many FuSound names or FuSound objects (or mix thereof) as desired can be supplied as arguments. Unlike most other functions herein, this function will do nothing and exit if no arguments are provided.
	 * @global
	 * @param {...string|FuSound} [variadic]
	 * @returns {undefined}
	 */
	window.fuRemoveSound = function() {
		if (arguments.length === 0) {
			console.log('No FuSound objects specified in fuRemoveSound.');
			return;
		}
		var flatArgs = flattenArray(Array.prototype.slice.call(arguments));
		if (!validateAudioTarget(flatArgs, 'fuRemoveSound method')) {
			return;
		}
		for (var ii = 0; ii < flatArgs.length; ii++) {
			var target = flatArgs[ii];
			if (typeof(target) === 'object') {
				removeSound(target, 'unloop');
			} else if (typeof(target) === 'string') {
				if (window.fuSoundCollection[target]) {
					removeSound(window.fuSoundCollection[target], 'unloop');
				} else {
					console.log('A target parameter string (' + target + ') does not correspond to a property of the window.fuSoundCollection object.');
				}
			}  else {
				console.log('A target parameter (' + target + '), in the fuRemoveSound method, is not valid.');
			}
		}
	}
	function removeSound(soundObj) {
		if (window.fuSoundCollection[soundObj.name]) {
			var toDelete = document.querySelector('.' + DEBUG_SOUND_CLASS + '[' + DEBUG_SOUND_NAME_ATTR + '="' + soundObj.name + '"]');
			if (toDelete && toDelete.remove) {
				toDelete.remove();
			}
			delete window.fuSoundCollection[soundObj.name];
		}
	}
	/**
	 * Stops a playing FuSound and plays a stopped or paused FuSound, fading the two in/out in an identical fashion. The FuSound being faded out must be playing, and the FuSound being faded in must be paused, otherwise the crossfade will not be performed. By default, the specific manner in which the fades are performed on both FuSounds are taken from the sound being faded out and applied to both. However, if the which argument is either "in" or equal to the FuSound being faded in, the fade information will be taken from the FuSound being faded in.
	 * @global
	 * @param {string|FuSound} outSoundObj The sound to be stopped and faded out.
	 * @param {string|FuSound} inSoundObj The sound to be played and faded in.
	 * @param {string|FuSound} [which] If the value of which is "in," or the value of which is equal to the inSoundObj argument, inSoundObj.fade will be used to determine how the fade is performed, rather than outSoundObj.fade.
	 * @returns {undefined}
	 */
	window.fuCrossFade = function(outSoundObj, inSoundObj, which) {
		if (!outSoundObj || 
			(typeof(outSoundObj) !== 'string' && typeof(outSoundObj) !== 'object')) 
		{
			console.log('The outSoundObj argument (' + outSoundObj + ') is invalid.');
			return;
		}
		if (!inSoundObj || 
			(typeof(inSoundObj) !== 'string' && typeof(inSoundObj) !== 'object')) 
		{
			console.log('The inSoundObj argument (' + inSoundObj + ') is invalid.');
			return;
		}
		if (typeof(outSoundObj) === 'string') {
			outSoundObj = window.fuSoundCollection[outSoundObj];
			if (typeof(outSoundObj) !== 'object') {
				console.log('The key provided for the outSoundObj argument (' + outSoundObj + ') does not correspond to a property of the window.fuSoundCollection object.');
				return;
			}
		}
		if (typeof(inSoundObj) === 'string') {
			inSoundObj = window.fuSoundCollection[inSoundObj];
			if (typeof(outSoundObj) !== 'object') {
				console.log('The key provided for the inSoundObj argument (' + inSoundObj + ') does not correspond to a property of the window.fuSoundCollection object.');
				return;
			}
		}
		if (outSoundObj.audioElement.paused) {
			console.log('Cannot fade – the outSoundObj is not playing.');
			return;
		}
		if (!inSoundObj.audioElement.paused) {
			console.log('Cannot fade – the inSoundObj is already playing.');
			return;
		}
		var fader = outSoundObj.fade;
		if (which === 'in' || which === inSoundObj) {
			fader = inSoundObj.fade;
		}
		if (typeof(fader.isFading) !== 'boolean' ||
			getNamedPropertyValues(window.fuSoundEasings).indexOf(fader.easing) === -1 ||
			getNamedPropertyValues(window.fuSoundTimings).indexOf(fader.timing) === -1 ||
			typeof(fader.duration) !== 'number' ||
			fader.duration <= 0 ||
			typeof(fader.steps) !== 'number' ||
			fader.steps <= 0)
		{
			console.log('One or more of the values in the outSoundObj\'s fade property is invalid. Aborting crossfade.');
			return;
		}
		var outTime = 0;
		var outInitial = outSoundObj.volume;
		var outChange = -outSoundObj.volume;

		var inTime = 0;
		var inInitial = 0;
		var inChange = outInitial;

		var duration = fader.duration;
		var step = duration / fader.steps;
		var timing = fader.timing;
		var func = easingFunctions[fader.easing];
		var outFadeInterval = window.setInterval(function() {
			var stepVolume = func(outTime, outInitial, outChange, duration, timing);
			if (typeof(stepVolume) === 'undefined' || Number.isNaN(stepVolume)) {
				window.clearInterval(fadeInterval);
				return;
			}
			outSoundObj.audioElement.volume = stepVolume * fuMasterVolume;

			outTime += step;
			if (outTime >= duration) {
				outSoundObj.audioElement.volume = outSoundObj.volume * fuMasterVolume;
				fuStopSound(outSoundObj);
				window.clearInterval(outFadeInterval);
				return;
			}
		}, step);
		inSoundObj.play();
		var inFadeInterval = window.setInterval(function() {
			var stepVolume = func(inTime, inInitial, inChange, duration, timing);
			if (typeof(stepVolume) === 'undefined' || Number.isNaN(stepVolume)) {
				window.clearInterval(outFadeInterval);
				return;
			}
			inSoundObj.audioElement.volume = stepVolume * fuMasterVolume;

			inTime += step;
			if (inTime >= duration) {
				inSoundObj.audioElement.volume = inSoundObj.volume * fuMasterVolume;
				window.clearInterval(inFadeInterval);
				return;
			}
		}, step);
	}

	function createAudioWithErrorHandling() {
		var audio = new Audio();
		audio.addEventListener('error', function(e) {
			var err = e.target.error;
			switch (err.code) {
				case err.MEDIA_ERR_ABORTED:
					console.log('You aborted the video playback.');
					break;
				case err.MEDIA_ERR_NETWORK:
					console.log('A network error caused the audio download to fail.');
					break;
				case err.MEDIA_ERR_DECODE:
					console.log('The audio playback was aborted due to a corruption problem or because the video used features your browser did not support.');
					break;
				case err.MEDIA_ERR_SRC_NOT_SUPPORTED:
					console.log('The video audio not be loaded, either because the server or network failed or because the format is not supported.');
					break;
				default:
					console.log('An unknown error occurred.');
					break;
			}
		});
		return audio;
	}
	function getNamedPropertyValues(object) {
		if (!object || typeof(object) !== 'object') {
			console.log('The object passed to getNamedPropertyValues ()');
		}
		var props = Object.getOwnPropertyNames(object);
		var vals = [];
		for (var ii = 0; ii < props.length; ii++) {
			vals.push(object[props[ii]]);
		}
		return vals;
	}
	function validateVolume(value, source, suppressLogs) {
		if (!source) {
			source = '(source not provided)';
		}
		if (!value && value !== 0 && value !== '0') {
			if (!suppressLogs) {
				console.log('The volume value parameter (' + value + '), in the ' + source + ', is not valid. The parameter must be a Number or a string representation of a valid Number.');
			}
			return false;
		} else if (Number.isNaN(Number(value))) {
			if (!suppressLogs) {
				console.log('The volume value parameter (' + value + '), in the ' + source + ', is not a number.');
			}
			return false;
		} else if (Number(value) < 0) {
			if (!suppressLogs) {
				console.log('The volume value parameter (' + value + '), in the ' + source + ', is less than 0.');
			}
			return false;
		} else if (Number(value) > 1) {
			if (!suppressLogs) {
				console.log('The volume value parameter (' + value + '), in the ' + source + ', is greater than 1.');
			}
			return false;
		}
		return true;
	}
	function validateAudioTarget(target, source, suppressLogs) {
		if (!target) {
			if (!suppressLogs) {
				console.log('The target parameter (' + target + '), in the ' + source + ', is not valid.');
			}
			return false;
		}

		var targetArr;
		if (target.length && typeof(target) !== 'string') {
			targetArr = target;
		} else {
			targetArr = [target];
		}
		for (var ii = 0; ii < targetArr.length; ii++) {
			var targetEl;
			if (targetArr[ii].audioElement) {
				targetEl = targetArr[ii].audioElement;
			} else if (typeof(targetArr[ii]) === 'string' && 
				window.fuSoundCollection[targetArr[ii]] &&
				window.fuSoundCollection[targetArr[ii]].audioElement)
			{
				targetEl = window.fuSoundCollection[targetArr[ii]].audioElement;
			} else {
				targetEl = targetArr[ii];
			}
			if (typeof(targetEl.volume) === 'undefined') {
				if (!suppressLogs) {
					console.log('The target parameter (' + target + '), in the ' + source + ', does not have a volume property.');
				}
				return false;
			} else if (typeof(targetEl.autoplay) === 'undefined') {
				if (!suppressLogs) {
					console.log('The target parameter (' + target + '), in the ' + source + ', does not have an autoplay property.');
				}
				return false;
			} else if (typeof(targetEl.loop) === 'undefined') {
				if (!suppressLogs) {
					console.log('The target parameter (' + target + '), in the ' + source + ', does not have a loop property.');
				}
				return false;
			} else if (typeof(targetEl.play) !== 'function') {
				if (!suppressLogs) {
					console.log('The target parameter (' + target + '), in the ' + source + ', does not have a play function.');
				}
				return false;
			} else if (typeof(targetEl.pause) !== 'function') {
				if (!suppressLogs) {
					console.log('The target parameter (' + target + '), in the ' + source + ', does not have a pause function.');
				}
				return false;
			}
		}

		return true;
	}
	function flattenArray(source, toReturn) {
		if (typeof(toReturn) !== 'object' ||
			typeof(toReturn.push) === 'undefined') 
		{
			toReturn = [];
		}
		for (var ii = 0; ii < source.length; ii++){
			if (source[ii].constructor === Array) {
				flattenArray(source[ii], toReturn);
			} else {
				toReturn.push(source[ii]);
			}
		}
		return toReturn;
	}
}());