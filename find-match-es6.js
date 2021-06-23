"use strict";

class MatchFinder {
    /**
     * Create a MatchFinder instance
     * @param element {object} - the element that accepts user input, example html: <input type="text" name="match" id="match-input">
     * @param box {object} - the element that displays a search suggestion, example html: <div id="suggestion"></div>
     */
    constructor(element, box) {
        if (element && box) {
            this.element = element;
            this.suggestionBox = box;

            this.onKeyUp();
        }
    }

    onKeyUp() {
        this.element.addEventListener('onkeyup', (e) => {
            this.processInput(e.target.value)
        });
    }

    /**
     * Process user input
     * @param {string} value - the string of user input
     */
    processInput(value) {
        if (!value) {
            this.clearSuggestionBox();
            return;
        }

        this.getList().then( (terms) => {
            this.updateSuggestion(value, terms);
        }).catch((error) => {
            console.log('Error: ' + error);
        });
    }

    getList() {
        return new Promise(function (resolve) {

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
    }

    /**
     * Search for a match in the dictionary of terms, and update the suggestion box
     * @param {string} value - the string of user input
     * @param termsList {array} - array of terms return by the dictionary
     */
    updateSuggestion(value, termsList) {
        let matchFound = false;

        const stringRegExp = new RegExp('^' + value, 'i');

        // loop through list of terms
        for (let i = 0; i < termsList.length; i++) {
            const term = termsList[i];

            const matchString = stringRegExp.test(term);

            if (matchString) {
                matchFound = true;
                this.suggestionBox.innerText = term;
                break;
            }
        }

        if (!matchFound) {
            this.clearSuggestionBox();
        }
    }

    clearSuggestionBox() {
        this.suggestionBox.innerText = '';
    }
}

export default MatchFinder;