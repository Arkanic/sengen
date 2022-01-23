export enum ParticleType {
    Standard = 0,
    Linked
}

export interface StandardSegment {
    type:ParticleType.Standard,
    words:Array<string>
}

export type LinkedSegmentPattern = Array<String>

export interface LinkedSegment {
    type:ParticleType.Linked,
    master:string,
    sets:{[unit:string]:LinkedSegmentPattern}
}

export interface Wordlist {
    name:string,
    author:string,
    description:string,
    version:number,

    particles:{[unit:string]:StandardSegment | LinkedSegment}
}

export type Sentence = {[unit:string]:string}

function randomElement<T>(arr:Array<T>):T {
    return arr[Math.floor(Math.random() * arr.length)];
}

function objLength(obj:any):number {
    return Object.keys(obj).length;
}

function recursiveSegmentOk(wl:Wordlist, sentence:Sentence, name:string):boolean {
    let currentParticle = wl.particles[name];
    if(currentParticle.type == ParticleType.Standard) return true;
    else if(currentParticle.type = ParticleType.Linked) {
        if(sentence[currentParticle.master]) return recursiveSegmentOk(wl, sentence, currentParticle.master);
        else return false;
    }

    return false;
}

function getRandom(wl:Wordlist, sentence:Sentence, name:string):string {
    let segment = wl.particles[name];
    if(segment.type == ParticleType.Standard) {
        return randomElement(segment.words);
    } else if(segment.type == ParticleType.Linked) {
        let arr = segment.sets[sentence[segment.master]] as Array<string>;
        return randomElement(arr);
    }

    return "";
}

export function generateSentence(wl:Wordlist):Sentence {
    let sentence:Sentence = {};
    while(objLength(sentence) != objLength(wl.particles)) {
        for(let particle in wl.particles) {
            if(sentence[particle]) continue;
            let word = getRandom(wl, sentence, particle);;
            sentence[particle] = word;
        }
    }

    return sentence;
}