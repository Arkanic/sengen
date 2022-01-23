import "./css/global.css";
import * as generate from "./ts/generate";


let wl:generate.Wordlist = {
    name: "name",
    author: "bobo",
    description: "fhfhfhfh",
    version: 2,

    particles: {
        "1": {
            type: generate.ParticleType.Standard,
            words: [
                "ichi",
                "ni"
            ]
        },
        "2": {
            type: generate.ParticleType.Linked,
            master: "1",
            sets: {
                "ichi": [
                    "1",
                    "1"
                ],
                "ni": [
                    "2",
                    "2"
                ]
            }
        },
        "3": {
            type: generate.ParticleType.Linked,
            master: "2",
            sets: {
                "1": [
                    "one",
                    "One"
                ],
                "2": [
                    "two",
                    "Two"
                ]
            }
        }
    }
}

for(let i = 0; i < 100; i++) {
    console.log(generate.generateSentence(wl));
}