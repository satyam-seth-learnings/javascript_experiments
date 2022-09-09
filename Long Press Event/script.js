class ClickAndHold {

    /**
     * @param {EventTarget} target The HTML element to apply the event to
     * @param {Function} callback The function to run once the target is clicked and held
     */
    constructor(target, callback) {
        this.target = target;
        this.callback = callback;
        this.isHeld = false;
        this.activeHoldTimeoutId = null;

        // start timer
        this.target.addEventListener('mousedown', this._onHoldStart.bind(this));
        this.target.addEventListener('touchstart', this._onHoldStart.bind(this));

        // stop timer
        this.target.addEventListener('mouseup', this._onHoldEnd.bind(this));
        this.target.addEventListener('mouseout', this._onHoldEnd.bind(this));
        this.target.addEventListener('mouseleave', this._onHoldEnd.bind(this));
        this.target.addEventListener('touchend', this._onHoldEnd.bind(this));
        this.target.addEventListener('touchcancel', this._onHoldEnd.bind(this));
    }

    _onHoldStart() {
        console.log('Start Pressing');
        this.isHeld = true;

        this.activeHoldTimeoutId = setTimeout(() => {
            if (this.isHeld) {
                this.callback();
            }
        }, 1000)
    }

    _onHoldEnd() {
        console.log('Stop Pressing');
        this.isHeld = false;

        clearTimeout(this.activeHoldTimeoutId);
    }

    /**
     * @param {EventTarget} target The HTML element to apply the event to
     * @param {Function} callback The function to run once the target is clicked and held
     */
    static apply(target, callback) {
        new ClickAndHold(target, callback);
    }
}

window.onload = () => {
    const demoButton = document.querySelector('button');

    // Using new keyword
    // new ClickAndHold(demoButton, () => {
    //     console.log('Long Press');
    //     alert('Long Press Directed');
    // });

    // Without using new keyword
    ClickAndHold.apply(demoButton, () => {
        console.log('Long Press');
        alert('Long Press Directed');
    });
}