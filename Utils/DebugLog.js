class DebugLog {
	constructor(){
		this.ColorGreen = "color:#00BB00;";
		this.ColorOrange = "color:#FF7000;";
		this.ColorSkyBlue = "color:#0099FF;";
		this.ColorRed = "color:#FF0000;";
	}

	log(msg, ...subst) {
    	console.log(`${this.getTime()} ${msg}`, ...subst);
	}

	green(msg, ...subst) {
    	console.log(`%c${this.getTime()} ${msg}`, this.ColorGreen, ...subst);
	}

	orange(msg, ...subst) {
    	console.log(`%c${this.getTime()} ${msg}`, this.ColorOrange, ...subst);
	}

	skyBlue(msg, ...subst) {
    	console.log(`%c${this.getTime()} ${msg}`, this.ColorSkyBlue, ...subst);
	}

	red(msg, ...subst) {
    	console.log(`%c${this.getTime()} ${msg}`, this.ColorRed, ...subst);
	}

	warn(msg, ...subst) {
    	console.warn(`${this.getTitle()} ${msg}`, ...subst);
	}
	
	error(msg, ...subst) {
    	console.error(`${this.getTitle()} ${msg}`, ...subst);
	}

	getTime() {
		let d = new Date();
		return `[${d.toLocaleString()}:${d.getMilliseconds()}]`;
	}
}