function Stopwatch () {
		// Private vars
		var	startAt	= 0;	// Time of last start / resume. (0 if not running)
		var	lapTime	= 0;	// Time on the clock when last stopped in milliseconds

		var	now	= function() {
				return (new Date()).getTime(); 
			}; 
 
		// Public methods
		// Start or resume
		this.start = function() {
				startAt	= startAt ? startAt : now();
			};

		// Stop or pause
		this.stop = function() {
				// If running, update elapsed time otherwise keep it
				lapTime	= startAt ? lapTime + now() - startAt : lapTime;
				startAt	= 0; // Paused
			};

		// Reset
		this.reset = function() {
				lapTime = startAt = 0;
			};

		// Duration
		this.duration = function() {
				return lapTime + (startAt ? now() - startAt : 0); 
			};
	};

 	this.log = function () {
      	var currentTime = now;
      	if(this.lapTime === undefined){
        	this.lapTime = 0;
      	}
      	if(this.startAt === -1){
        	console.log(this.lapTime % 1000);
      	}else{
        	this.lapTime = this.lapTime + currentTime - this.startAt;
        	this.startAt = currentTime;
        	console.log(this.lapTime % 1000);
      	}
      	return this;
    };
    
 }


 function Racer() {
  this.stopWatch = new StopWatch();
  Racer.all.push(this);
}

Racer.racers = [];

Racer.all.start = function() {
  for (var i = 0; i < Racer.all.length; i++) {
    Racer.all[i].start();
  }
};

Racer.getWinner = function() {
  var found = Racer.all[0];
  for (var i = 0; i < Racer.all.length; i++) {
    if (Racer.all[i].stopWatch.getDuration() < found.stopWatch.getDuration())
      found = racer;
  }
  return found;  
};

Racer.prototype.start = function(){
  this.stopWatch.start();
  return this;
};

Racer.prototype.stop = function() {
  this.stopWatch.stop();
  return this;
};

Racer.prototype.log = function() {
  console.log(this.stopWatch.getDuration());
  return this.stopWatch.getDuration();
};