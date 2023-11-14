from flask import Flask, render_template, request
import matplotlib.pyplot as plt
import numpy as np
from scipy.io import wavfile
from scipy.fft import *
from scipy.fftpack import fft

app = Flask(__name__)

@app.route("/")
def homepage():
    return render_template("index.html")

@app.route("/ultrasonic", methods=['POST'])
def uploadPhoneFile():
    if request.method == 'POST':
        encodedFile = request.files['file']
        filepath = f'.\\uploads\\{encodedFile.filename}'
        encodedFile.save(filepath)
        print('[+] File Upload Complete')
        decodeUltraSonic(filepath=filepath)
        return 'Success'

@app.route("/normal", methods=['POST'])
def uploadComputerFile():
    if request.method == 'POST':
        encodedFile = request.files['file']
        filepath = f'.\\uploads\\{encodedFile.filename}'
        encodedFile.save(filepath)
        print('[+] File Upload Complete')
        decodeNormal(filepath=filepath)
        return 'Success'

def identifyDominantFrequencySingleChannel(filepath, start_time, end_time):
    sr, data = wavfile.read(filepath)
    dataToRead = data[int(start_time * sr / 1000) : int(end_time * sr / 1000) + 1]

    N = len(dataToRead)
    yf = rfft(dataToRead)
    try:
        xf = rfftfreq(N, 1 / sr)
    except ZeroDivisionError:
        print('Division by zero error')
        return 0
    idx = np.argmax(np.abs(yf))
    freq = xf[idx]
    return freq

def decodeNormal(filepath):
    sampFreq, sound = wavfile.read(filepath)
    sound = sound / 2.0**(16-1)
    secondsLength = sound.shape[0] / sampFreq
    time = np.arange(sound.shape[0]) / sound.shape[0] * secondsLength
    bits = ''
    previous = 0
    count = 0
    print(secondsLength)
    for i in range(1, int(secondsLength) + 1):
        maxSeconds = i * 1000
        frequency = identifyDominantFrequencySingleChannel(filepath, previous, maxSeconds)
        previous = maxSeconds

        roundedFrequency = round(frequency)
        if roundedFrequency == 400:
            print(f'{count}: 0 {roundedFrequency}')
            bits += '0'

        elif roundedFrequency == 700:
            print(f'{count}: 1 {roundedFrequency}')
            bits += '1'
        
        else:
            print(roundedFrequency)
    
    print(bits)
    print(count)

    with open('decoded', 'bw') as file:
        i = 0
        byteBuffer = bytearray()
        while(i < len(bits)):
            byteBuffer.append(int(bits[i:i+8], 2))
            i+= 8
        file.write(byteBuffer) #that last byte is messed up

def decodeUltraSonic(filepath): #currently set to decode at ultra sonic range
    sampFreq, sound = wavfile.read(filepath)
    sound = sound / 2.0**(16-1)
    secondsLength = sound.shape[0] / sampFreq
    time = np.arange(sound.shape[0]) / sound.shape[0] * secondsLength
    bits = ''
    previous = 0
    count = 0
    print(secondsLength)
    for i in range(1, int(secondsLength) + 1):
        maxSeconds = i * 1000
        frequency = identifyDominantFrequencySingleChannel(filepath, previous, maxSeconds)
        previous = maxSeconds

        roundedFrequency = round(frequency)
    
        if roundedFrequency == 17986:
            print(f'{count}: 0 {roundedFrequency}')
            bits += '0'

        elif roundedFrequency == 19000:
            print(f'{count}: 1 {roundedFrequency}')
            bits += '1'
        
        else:
            print(roundedFrequency)
    

        count += 1

    print(bits)
    print(count)

    with open('decoded', 'bw') as file:
        i = 0
        byteBuffer = bytearray()
        while(i < len(bits)):
            byteBuffer.append(int(bits[i:i+8], 2))
            i+= 8
        file.write(byteBuffer) #that last byte is messed up

if __name__ == '__main__':
    app.run()