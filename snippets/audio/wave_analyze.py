import matplotlib.pyplot as plt
import numpy as np
import scipy.io

from os.path import dirname, join as pjoin
from scipy.io import wavfile
from scipy import signal


wav_fname = "../../material/StarWars3.wav"
sample_rate, samples = wavfile.read(wav_fname)

length = samples.shape[0] / sample_rate

print(f"length = {length}s, sample_rate={sample_rate}")
if len(samples.shape) > 1:
    print(f"number of channels = {samples.shape[1]}")

fig, axs = plt.subplots(2)
fig.suptitle('Wave file analysiis')

time = np.linspace(0., length, samples.shape[0])
axs[0].plot(time, samples[:], label="1st channel")
axs[0].legend()
axs[0].set(xlabel='Time [s]', ylabel='Amplitude')




frequencies, times, Zxx = signal.stft(samples, fs=sample_rate,  nperseg=1000)
#print(times, frequencies)

cmap = plt.get_cmap('viridis')
axs[1].pcolormesh(times, frequencies, np.abs(Zxx), cmap=cmap)
#frequencies, times, spectrogram = signal.spectrogram(samples, sample_rate)
#axs[1].pcolormesh(times, frequencies, spectrogram, cmap=cmap)
#axs[1].imshow(spectrogram)
axs[1].set(xlabel='Time [sec]', ylabel='Frequency [Hz]')

plt.show()