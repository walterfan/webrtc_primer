import numpy as np
from matplotlib import pyplot as plt
from scipy.fft import fft, fftfreq

SAMPLE_RATE = 44100  # Hertz
DURATION = 5  # Seconds

def generate_sine_wave(freq, sample_rate, duration):
    x = np.linspace(0, duration, sample_rate * duration, endpoint=False)
    frequencies = x * freq
    # 2pi because np.sin takes radians
    y = np.sin((2 * np.pi) * frequencies)
    return x, y



fig, axs = plt.subplots(4)
fig.suptitle('FFT Demo')


nice_x, nice_tone = generate_sine_wave(400, SAMPLE_RATE, DURATION)
noise_x, noise_tone = generate_sine_wave(4000, SAMPLE_RATE, DURATION)
noise_tone = noise_tone * 0.3

mixed_tone = nice_tone + noise_tone

normalized_tone = np.int16((mixed_tone / mixed_tone.max()) * 32767)

axs[0].plot(nice_tone[:1000])
axs[1].plot(noise_tone[:1000])
axs[2].plot(normalized_tone[:1000])


N = SAMPLE_RATE * DURATION

yf = fft(normalized_tone)
xf = fftfreq(N, 1 / SAMPLE_RATE)

axs[3].plot(xf, np.abs(yf))
plt.show()