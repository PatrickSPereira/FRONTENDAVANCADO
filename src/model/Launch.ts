export class Launch {
    constructor(
        public description: string = "",
        public value      : number = 0,
        public typeLaunch : string = "",
        public dateLaunch : Date,
        public account    : string = "" ) {        
    }    
}