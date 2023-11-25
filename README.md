# Ultra Sonic Covert Channel

## Overview
There are primarily two components to this ultra sonic covert communications channel.  The implant that will be installed and ran on the "infected" machine.  The infected machine is also considered to be the sender in the current state of the program.  The other component is the fileServer which is where encoded audio files and recordings can be uploaded for decoding and reconstruction of files.

## Implant
The implants code can be found in the file frequencyEncoder.cpp.  This was compiled using the g++ compiler on a Windows 11 Dell XPS 15 9510 laptop.  There are three compiled versions that showcase different bit rates, sample rates, and encode at different frequencies.  

```
1. hear.exe - this is an encoder with a bit rate of 1 bit every second and encodes a 0-bit with a 400 hz wave and 1-bit with a 700 hz wave.  
2. us.exe - this is an encoder with a bit rate of 1 bit every second and encodes a 0-bit with a 17986 hz wave and 1-bit with a 19000 hz wave.
3. fast.exe - this is an encoder with a bit rate of a 100 bits every second and encodes a 0-bit with a 18000 hz wave and a 1-bit with a 19000 hz wave.
```

On top of this all three executables are to be ran from the command line and take a single command line argument of a file path to a file that you would like to encode.  The program will then go through identify and encode the bits and then produce a waveform.wav file in the same directory containing the encoded bits.  This file can either be directly uploaded to the file server for decoding (more on that later), or it can be recorded using a recording device and the corresponding .wav file can be sent to the decoding server.

### Usage Example
All of these variants can be ran using this example command down below.  (This uses the fast.exe variant but feel free to subsitute whatever variant you would like)
```
.\fast.exe [filepath]
```

## Fileserver
The file server is located in the file app.py.  This is a python flask application and can be ran using the python executable. Once started and you visit the server homepage there will be three options to upload files to.  These account for and decode the three executable variations that was discussed in the implants section.  The file server was both tested locally on the same system as the implant as well as another computer seperate from the implant machine and both work fine in recreating the decoded file.

```
1. ultrasonic decoding - is for us.exe
2. normal decoding - is for hear.exe
3. fast decoding - is for fast.exe
```

Once the file is uploaded to the server it will be found in the uploads directory and it will begin to analyze and decode the .wav file.  Eventually after the decoding routine is completed a decoded file will be created in the fileServer directory containing the decoded file.

### Usage example
This is how to start the flask server
```
python3 app.py
```

## Paper

If you would like to learn more please visit this link [fill with link] to read our full paper detailing more of the underlying capabilities of the channel and our research.

## Reccomendations and Thoughts 
Any improvements or reccomendations are appreciated. 
