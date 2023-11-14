#include <iostream>
#include <cmath>
#include <fstream>

const int sampleRate = 44100;
const int bitDepth = 16;
using namespace std;

class SineOscillator{
    float frequency;
    float amplitutde;
    float angle = 0.0f;
    float offset = 0.0f;

    public:
        SineOscillator(float frequency, float amplitutde): frequency(frequency), amplitutde(amplitutde) {
            offset = 2 * M_PI * frequency / sampleRate;
        }
        float process(){
            float sample =  amplitutde * sin(angle);
            angle += offset;
            return sample;
        }
        float reset(){
            angle = 0.0f; //recreated periodic function
        }
};

int main(int argc, char *argv[]){
    float seconds = 1.0;    
    ofstream sampleValues;
    sampleValues.open("waveform.wav", ios::binary);
    
    //SineOscillator highOscilator(19000, 0.5); //high frequency = 1 bit
    //SineOscillator lowOscilator(18000, 0.5); //low frequency = 0 bit
    
    SineOscillator highOscilator(700, 0.5); //high frequency = 1 bit Note F5 ~698 hz
    SineOscillator lowOscilator(400, 0.5); //low frequency = 0 bit Note G4 ~392 hz

    int maximumAmplitude =  pow(2, bitDepth - 1) - 1;
    int fmtSize = 16;
    int compressionCode = 1;
    int channelNum = 1;
    int byteRate = sampleRate * bitDepth / 8;
    int blockAlign = bitDepth / 8;

    int bitDepths = bitDepth;
    int sampleRates = sampleRate;

    //create riff header
    sampleValues << "RIFF";
    sampleValues << "----";
    sampleValues << "WAVE";

    //create fmt chunk
    sampleValues << "fmt ";
    sampleValues.write( reinterpret_cast<char *> (&fmtSize),  4);
    sampleValues.write( reinterpret_cast<char *> (&compressionCode),  2);
    sampleValues.write( reinterpret_cast<char *> (&channelNum),  2);
    sampleValues.write( reinterpret_cast<char *> (&sampleRates),  4);
    sampleValues.write( reinterpret_cast<char *> (&byteRate),  4);
    sampleValues.write( reinterpret_cast<char *> (&blockAlign),  2);
    sampleValues.write( reinterpret_cast<char *> (&bitDepths),  2);

    //create data chunk
    sampleValues << "data";
    sampleValues << "----";
    int ogPosition = sampleValues.tellp();
    
    ifstream f(argv[1], ios::binary | ios::in);
    char c;
    int count = 0;
    while (f.get(c))
    {
        for (int i = 7; i >= 0; i--){
            int bit = ((c >> i) & 1);
           
            if(bit == 0){
                //encode lowbit
                for(int k = 0; k < sampleRate * seconds; k++){
                    float result = lowOscilator.process(); 
                    int sample = static_cast<int> (result * maximumAmplitude);
                    sampleValues.write( reinterpret_cast<char *> (&sample),  2);
                }
                lowOscilator.reset();
            }
            
            else if(bit == 1){
                //encode highbit
                for(int j = 0; j < sampleRate * seconds; j++){
                    float result = highOscilator.process();
                    int sample = static_cast<int> (result * maximumAmplitude);
                    sampleValues.write( reinterpret_cast<char *> (&sample),  2);
                   
                }
                 highOscilator.reset();
            }

            count += 1;

        }

    }
    int postPosition = sampleValues.tellp();
    
    sampleValues.seekp(ogPosition - 4);
    int datasize = postPosition - ogPosition;
    sampleValues.write( reinterpret_cast<char *> (&datasize),  4);

    sampleValues.seekp(4, ios::beg);
    int fileSize = postPosition - 8;
    sampleValues.write( reinterpret_cast<char *> (&fileSize),  4);

    sampleValues.close();

    printf("\n%d\n", count);

    return 0;
}