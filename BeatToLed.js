// I used VB Cable and set the virtual spreaker (in) to default and the virtual microphone (out) to play recorded audio on my real speakers
// this is neccessary to make naudiodon be able to record loopback audio direktly from Windows

// color of the moving bar
const color1 = {
    red   : 0xA9,
    green : 0x00,
    blue  : 0xFF,
};

// "background color"
const color2 = {
    red   : 0,
    green : 0,
    blue  : 0,
};

// amount of leds used
const led_count = 54;

// the device id in open rgb
const open_rgb_id = 1;

// OpenRGB config, ms polling rate
const ip = "192.168.2.208";
const port = 6742;
const ms = 100;




const fs = require('fs');
const portAudio = require('naudiodon');
const {MusicBeatDetector, MusicBeatScheduler, MusicGraph} = require('./music-beat-detector');
const { Client } = require("openrgb-sdk")
const musicGraph = new MusicGraph();



// this array is globally used to set animations
// it is beeing pulled for output
var led_output = [];


// capturing music stream, detecting beats, starting the animation 
function startMusicDetection () {

    // settings for the audio capture
    var ai = new portAudio.AudioIO({
      inOptions: {
        channelCount: 2,
        sampleFormat: portAudio.SampleFormat16Bit,
        sampleRate: 44100,
        deviceId: -1,
        closeOnError: false
      }
    });

    // settings for the beat detector
    const musicBeatDetector = new MusicBeatDetector({
      plotter: musicGraph.getPlotter(),
      sensitivity: 0.5,
      minThreashold: 100,
    },(height) => { 
        // on peak do
        taktAnimation(led_count);
    })

    ai.on('data', buf => {
        // .pipe sucked hard so I had to rewrite the original module to work without it :)
        musicBeatDetector.getAnalyzer(buf, (err) => {} )
    });

    // start audio capture
    ai.start();

    // restart every now and then to prevent the overflow of MusicBeatDetector
    setTimeout(_ => { 
        ai.quit();
        startMusicDetection();
    }, 120000)  

}
startMusicDetection();


// if you want your captured audio to be visualized in an svg
// it's a function of music-beat-detector so why not :)
function svg () {
    fs.writeFileSync('graph.svg', musicGraph.getSVG());
    setTimeout(_ => { 
        svg ();
    }, 1000)    
}
// disabled by default
// svg();



// the main function of the tool
// connect to OpenRGB, poll led_output, send update
async function start () {
    const client = new Client("Example", port, ip)
    await client.connect()
    console.log("connected to: " + ip + ":" + port + ", refresh rate: " + ms + "ms");

    const amount = await client.getControllerCount()
    await setDirectMode(client,amount);

    async function loop (offset = 0) {    
        // send update to OpenRGB  
        await client.updateLeds(open_rgb_id, led_output);

        // restart the loop
        setTimeout(_ => loop(offset + 1), ms)
    }
    loop()
}
start()



// HELPER FUNCTIONS


// the animation function of one beat
// played around a bit and this looked the best to me
var animation_counter = 0;
var level   = 0;
function taktAnimation ( LEDs ) {
    var id = ++animation_counter;
    if ( id > 40 ) animation_counter = 0; 

    level = LEDs;

    async function loop (offset = 0) {

        led_output = fillArray(color1, color2, LEDs, level);
        level--;

        setTimeout(_ => {
            if ( animation_counter != id ) return;
            if ( level >= 0 ) loop(offset + 1);
        }, 4)
    }
    loop()
}


// build an array of led_count length with color1 and color2
function fillArray( first_color, second_color, size, fill ) {
    var filled = new Array(fill).fill(first_color);
    var empty  = fill < size ? new Array(size - fill).fill(second_color) : [];
    return [...filled,...empty];
}

// set OpenRGB mode to direct control for every device
// so that it can be controlled by this module
async function setDirectMode ( client, deviceCount ) {
    for (let deviceId = 0; deviceId < deviceCount; deviceId++) {
        await client.updateMode(deviceId, 0)
    }
}