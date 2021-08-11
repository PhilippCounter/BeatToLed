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

Then install VB Cable from: https://vb-audio.com/Cable/

( you can use other software but as far as I now, you need to have your general audio passed through a microphone channel to use naudiodon because it can't setup a loopback for recording, will probably replace this as soon as I get something else to work, "fmedia" was so far the most promising alternative )
- don't panic if you have no audio, follow this tutorial: https://kast.zendesk.com/hc/en-us/articles/360032189351-Setting-Up-a-Virtual-Cable-on-Windows-by-Colelision

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
