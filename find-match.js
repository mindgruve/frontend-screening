(function () {

    // html: <input type="text" name="match" id="match-input">
    const input = document.getElementById('match-input');

    // html: <div id="suggestion"></div>
    const suggestionBox = document.getElementById('suggestion');

    function MatchFinder(element, box) {
        if (element && box) {
            this.element = element;
            this.suggestionBox = box;

            this.init();
        }
    }

    MatchFinder.prototype.init = function() {
        this.onKeyUp();
    };

    MatchFinder.prototype.onKeyUp = function() {
        const _this = this;

        this.element.onkeyup = function(e) {
            _this.processInput(e.target.value)
        };
    };

    MatchFinder.prototype.processInput = function(val) {
        const _this = this;

        this.getList().then(function (terms) {
            _this.updateSuggestion(val, terms);
        }).catch(function(error){
            console.log('Error: ' + error);
        });

    };

    MatchFinder.prototype.getList = function() {
        return new Promise(function(resolve) {

            //typically we might kick off some ajax here, but for speediness, lets return some results
            const list = [
                'frontend',
                'backend',
                'developer',
                'designer',
                'ping',
                'ping pong'
            ];

            // resolve our promise
            resolve(list);
        });
    };

    MatchFinder.prototype.updateSuggestion = function(value, termsList) {
        // if input is empty, clear out the suggestion box and exit
        if (!value) {
            this.clearSuggestionBox();
            return;
        }

        // setting a variable to check against later
        let noMatchFound = true;

        // declare regex outside of loop for performance gain
        // testing for beginning of string to match our input value
        const stringRegExp = new RegExp('^' + value, 'i');

        // loop through list of terms
        for (let i = 0; i < termsList.length; i++) {
            const term = termsList[i];

            // test if input string matches a term
            const matchString = stringRegExp.test(term);

            // regex matches, update suggestion box
            if (matchString) {
                noMatchFound = false;
                this.suggestionBox.innerText = term;

                // we've found a match, so break the loop
                break;
            }
        }

        // if no results, clear out the suggestion box
        if (noMatchFound) {
            this.clearSuggestionBox();
        }
    };

    MatchFinder.prototype.clearSuggestionBox = function() {
        this.suggestionBox.innerText = '';
    };

    const finder = new MatchFinder(input, suggestionBox);
})();