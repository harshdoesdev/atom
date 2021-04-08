/* atom | MIT License | By Harsh Singh (@rwbeast) */

const isFn = v => typeof v === 'function'; // checks if value is of type 'function'

const atom = initVal => {

    let val = initVal, // set the initial value, does not triggers any event
        
        subscribers = []; // array of subscribers

    return {

        get() {
            return val; // simply return the current value
        },

        set(newVal) {
            
            let prevVal = val; // hold the previous value
            
            if(isFn(newVal)) { // if the newVal is a function
                newVal = newVal(prevVal); // pass the prevVal to it and assign the returned value
            }

            if(newVal !== prevVal) { // if the newVal is different from prevVal
                val = newVal; // set the current value to new value
                subscribers.forEach(fn => fn(val, prevVal)); // notify the subscribers about the change
            }

        },

        unsubscribe(fn) {
            subscribers = subscribers.filter(_fn => _fn !== fn); // filters out all instances of the subscriber
        },

        subscribe(fn) {
            if(!isFn(fn)) return; // if the fn is not function, simply exit
            subscribers.push(fn); // else push the fn to the subscribers array
            return () => this.unsubscribe(fn); // return an unsubscribe function
        }

    }

};

export default atom;
