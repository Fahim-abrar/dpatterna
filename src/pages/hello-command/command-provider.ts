import {
    Light,
    LightOnCommand,
    LightOffCommand, 
    RedLightIncreaseCommand, 
    RedLightDecreaseCommand,  
    RemoteControl,
    RedLightOnCommand,
} from  '../../patterns/command/command-remote'



let remote = new RemoteControl();
let light = new Light();


export function controlLight(bulb: string){
    if(bulb === 'on'){
        remote.setCommand(new LightOnCommand(light));
    }
    if(bulb === 'off'){
        remote.setCommand(new LightOffCommand(light));
    }
    if(bulb === 'increaseLum'){
        remote.setCommand(new RedLightIncreaseCommand(light));
    }
    if(bulb === 'decreaseLum'){
        remote.setCommand(new RedLightDecreaseCommand(light));
    }
    if(bulb === 'redLight'){
        remote.setCommand(new RedLightOnCommand(light));
    }
    return remote.buttonWasPressed()
}