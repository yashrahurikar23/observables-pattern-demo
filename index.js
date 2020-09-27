// General purpose hanlders
const thrush = x => f => f(x);

// Two ary pipe function which takes in only two functions to create a 
// pipe out of it. A simpler version of the below pipe function
// const pipe = (f, g) => x => g(f(x));

const pipe = (...fs) => x => 
	fs.reduce((acc, f) => f(acc), x);

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

// Testing pipe
// console.log(
// 	pipe(
// 		tap(console.log),
// 		double,
// 		tap(console.log),
// 		double,
// 		tap(console.log),
// 		double,
// 		tap(console.log),
// 		double
// 	)(10)
);


// Passing a function as an observer which is going to subscribe to the observable
observable1.subscribe( 
	pipe(
		tap(console.log),
		double,
		tap(console.log),
	)
);

// Emitting some stream of data
observable1.emit(10);
observable1.emit(15);
observable1.emit(25);
observable1.emit(50);