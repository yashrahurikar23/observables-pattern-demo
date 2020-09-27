// General purpose hanlders
const thrush = x => f => f(x);

const pipe = (f, g) => x => g(f(x));

// Tap is responsible for performing some side effect first and then
// return  whatever we received as an arguement.
// Works when we want a funnction who is supposed to return void to return something
// For example console.log return void but if we wish to continue 
// the pipe line we need that intial x arguement which console log receives.
const tap = f => x => { f(x); return x };

class Observable {
	constructor() {
		this.observers = [];
	}

	// Method to allow the observers to subscribe to the observable
	subscribe(cb) {
		// Mutating the observer variable here !
		this.observers.push(cb);
	}

	// Method to emit a data packet for the observers
	emit(x) {
		this.observers.forEach(thrush(x));
	}
}


// Example 1:
// Creating an instance of an observable
const observable1 = new Observable();

const double = x => x * 2;

// Passing a function as an observer which is going to subscribe to the observable
observable1.subscribe( 
	pipe(
		tap(console.log),
		double,
	)
);

// Emitting some stream of data
observable1.emit(10);
observable1.emit(15);
observable1.emit(25);
observable1.emit(50);