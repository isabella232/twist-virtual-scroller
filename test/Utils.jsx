/*
 *  Copyright 2018 Adobe Systems Incorporated. All rights reserved.
 *  This file is licensed to you under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License. You may obtain a copy
 *  of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software distributed under
 *  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 *  OF ANY KIND, either express or implied. See the License for the specific language
 *  governing permissions and limitations under the License.
 *
 */

// Utilities for testing

import ReactDOM from 'react-dom';

/**
 * Render the given JSX to the DOM - this remembers the elements so it's
 * easy to dispose later, via render.dispose();
 */
let renderedElements = [];
export function render(jsx, parentElement) {
    var el = document.createElement('div');
    if (parentElement) {
        parentElement.appendChild(el);
    }

    if (typeof jsx === 'function') {
        // Put it in a component
        @Component
        class RenderComponent {
            render() {
                return jsx();
            }
        }
        ReactDOM.render(<RenderComponent />, el);
    }
    else {
        ReactDOM.render(jsx, el);
    }

    renderedElements.push(el);
    return el;
}

/**
 * Shorthand for rendering into the document body
 */
render.intoBody = (jsx) => {
    return render(jsx, document.body);
};

/**
 * Dispose any rendered JSX elements
 */
render.dispose = () => {
    renderedElements.forEach(el => {
        ReactDOM.unmountComponentAtNode(el);
        if (el.parentNode) {
            el.parentNode.removeChild(el);
        }
    });
    renderedElements = [];
};
