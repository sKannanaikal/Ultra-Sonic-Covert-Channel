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

