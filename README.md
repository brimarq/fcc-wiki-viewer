# Build a Wikipedia Viewer  

Code challenge at freeCodeCamp:  
https://www.freecodecamp.org/challenges/build-a-wikipedia-viewer   

---

This page has a searchbar with two buttons - one which triggers a search using the search term in the search input box and another that opens a random Wikipedia page in a new window.   

The search button (or enter key) initiates an ajax request to the Wikipedia API with the query data, then returns results in JSON, which are then used to display the results by appending html list group items to the Bootstrap list group. Clicking on any of the results will open a new tab with that content.   


[Demo @ CodePen.io](https://codepen.io/brimarq/pen/JvmZNo)  