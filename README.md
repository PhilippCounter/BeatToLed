# BeatToLed
Music Visualizer to OpenRGB (tested on Windows 11 with Node 16.6.1)
-------------

First setup NodeJS ( I used version 16.6.1 )
- All 16.6.1 downloadables: https://nodejs.org/dist/v16.6.1/
- The Win x64 setup: https://nodejs.org/dist/v16.6.1/node-v16.6.1-x64.msi

---
Install OpenRGB

- fairly easy, it also has a GUI https://openrgb.org/
- if your LED Controller is listed within the tool, it can be controlled

---
Audio to mic - variant 1: Check if your driver supports stereomix

- install your latest audio driver (for me it was the Realtek Audio Driver)
- follow this tutorial to enable stereomix: https://www.howtogeek.com/howto/39532/how-to-enable-stereo-mix-in-windows-7-to-record-audio/
- after enabeling set the device to you default option

---

Audio to mic - variant 2: if you still have no option to record your audio use VB Cable from: https://vb-audio.com/Cable/

( you can use other software but as far as I now, you need to have your general audio passed through a microphone channel to use naudiodon because it can't setup a loopback for recording )
- don't panic if you have no audio, follow this tutorial: https://kast.zendesk.com/hc/en-us/articles/360032189351-Setting-Up-a-Virtual-Cable-on-Windows-by-Colelision

---

Edit the BeatToLed.js

- edit the first few lines to your personal preferenceses ( led,ip setup etc. )

---

Now setup the node app itself

- go to the path where you put it ( in this folder should, among other things, be the BeatToLed.js and the package.json )
- run "npm install" from your windows-terminal
- run "npm start"

---

If this isn't enough

- go to ./music-beat-detector and remove the node_modules folder and the package-lock.json
- then run "npm install" in the ./music-beat-detector folder
- try to run "npm start" in the main-folder again, it shoud now work as intended

---

I hope you like it and have fun with it
