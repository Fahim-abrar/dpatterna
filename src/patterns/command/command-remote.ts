//Vendor class
export class Light {
    public HIGH:number = 3;
    public MEDIUM:number = 2;
    public LOW:number = 1;
    public VERYLOW:number = 0;
    RedLightOn:boolean;
    LightOn:boolean;
    luminosity:number;

    constructor(){
        this.luminosity = this.VERYLOW
        this.RedLightOn = false
        this.LightOn = false
    }

    public on(){
        this.LightOn = true;
        this.RedLightOn = false;
        return "on";
    }
    public off(){
        this.LightOn = false;
        this.RedLightOn = false;
        return "off"
    }
    public redZero(){
        this.luminosity=this.VERYLOW;
        return 'red0';
    }
    public redOne(){
        this.luminosity=this.LOW;
        this.RedLightOn = true;
        return "red1"
    }
    public redTwo(){
        this.luminosity=this.MEDIUM;
        return "red2"
    }
    public redThree(){
        this.luminosity=this.HIGH;
        return "red3"
    }
    public  getLuminosity(){
        return this.luminosity;
    }
    public getRedLightStatus(){
        return this.RedLightOn;
    }
    public getLightOnStatus(){
        return this.LightOn;
    }
}

export class LightOnCommand implements Command {
    light:Light;
    constructor(light:Light) {
        this.light = light;
    }
    execute():string{
        return this.light.on()
    }
}

export class LightOffCommand implements Command {
    light:Light;
    constructor(light:Light) {
        this.light = light;
    }
    execute():string{
        return this.light.off()
    }
}


export interface Command {
    execute():string
}

export class RedLightIncreaseCommand implements Command {
    light:Light;
    prevLuminosity:number;
    RedLightOn:boolean;
    LightOn:boolean;
    constructor(light:Light) {
        this.light = light;
        this.prevLuminosity=light.getLuminosity();
        this.RedLightOn=light.getRedLightStatus();
        this.LightOn=light.getLightOnStatus();
    }
    execute():string{
        if(!this.LightOn){
            return this.light.off()
        }
        else if(!this.RedLightOn){
            return this.light.on();
        }
        else if(this.prevLuminosity === this.light.HIGH){
           return this.light.redThree()
        }
        else if(this.prevLuminosity === this.light.MEDIUM){
           return this.light.redThree();
        }
        else if(this.prevLuminosity === this.light.LOW){
           return this.light.redTwo();
        }
        else {
           return this.light.redOne();
        }
    }
}

export class RedLightDecreaseCommand implements Command {
    light:Light;
    prevLuminosity:number;
    RedLightOn:boolean;
    LightOn:boolean;
    constructor(light:Light) {
        this.light = light;
        this.prevLuminosity=light.getLuminosity();
        this.RedLightOn=light.getRedLightStatus();
        this.LightOn=light.getLightOnStatus();
    }
    execute():string{
        if(!this.LightOn){
            return this.light.off()
        }
        else if(!this.RedLightOn){
            return this.light.on();
        }
        else if(this.prevLuminosity === this.light.HIGH){
           return this.light.redTwo()
        }
        else if(this.prevLuminosity === this.light.MEDIUM){
           return this.light.redOne();
        }
        else if(this.prevLuminosity === this.light.LOW){
           return this.light.redZero();
        }
        else {
           return this.light.redZero();
        }
    }
}

export class RedLightOnCommand implements Command {
    light:Light;
    prevLuminosity:number;
    LightOn:boolean;
    constructor(light:Light) {
        this.light = light;
        this.prevLuminosity=light.getLuminosity();
        this.LightOn=light.getLightOnStatus()
    }
    execute():string{
        if(this.LightOn){
            return this.light.redOne();
        }else{
            return this.light.off();
        }
    }
}

export class RemoteControl{
    command!:Command

    setCommand(command:Command){
        this.command = command
    }

    buttonWasPressed(){
       return this.command.execute()
    }
}