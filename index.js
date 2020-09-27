// General purpose hanlders
const thrush = x => f => f(x);

const pipe = (f, g) => x => g(f(x));

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
const observable = new Observable();

const double = x => x * 2;

// Passing a function as an observer which is going to subscribe to the observable
observable.subscribe( 
	pipe(
		double,
		console.log
	)
);

// Emitting some stream of data
observable.emit(10);
observable.emit(15);
observable.emit(25);
observable.emit(50);