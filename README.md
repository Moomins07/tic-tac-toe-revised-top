# Odin Project tic-tac-toe.

This is a revised version of the tic-tac-toe game that I developed during The Odin Project JavaScript course using Bootstrap5, SASS, CSS and Vanilla JavaScript.

Approximately 6months ago when I first attempted this project, I struggled with many areas of the project and found myself using tutorials and essentially slowly refactoring my work. In fact, I have another version of this same project called 'tic-toe-toe-revised' wherein I attempted to recreate the project with less help from a YouTube tutorial I originally followed for help.

So now, with this... Revised, revised version of the tic-toe-toe project, I've re-factored and leared even more.

### Key takeaways from this project

Before my first attempt at this project, I followed a a YouTube video which took a functional approach and, typical of a YouTube tutorial, kept the code in the global scope.

One of the key constraints of this project are as follows:

> Your main goal here is to have as little global code as possible. Try tucking as much as you can inside factories. If you only need a single instance of something (e.g. the gameboard, the displayController etc.) then wrap the factory inside an IIFE (module pattern) so it cannot be reused to create additional instances.

With this is mind, during my first 'revised' version of this project, I essentially wrapped all of the code in an IIFE module called 'TicTacToe'. I also created a second module called 'utils' that I included a few useful functions in such as 'capitaliseFirstLetter', which was mostly just for the sake of trying to reinforce my learning and understanding of modules.
However, although I had technically adhered to the constraints of the project, I wanted to take this further; I am also guilty of including a lot of logic in the project that was taken from a tutorial and wasn't _really_ my own code, even though I understand the code. This also meant that I hadn't used any factory functions at all, which was also another key constraint I had missed.

In this version of the project, I've attempted to push further and try to truly understand the strengths and reasons behind encapsulating code in modules, specifically whilst using factory functions. I've also removed any logic that was not my own, in hope to re-do it myself from scratch.

I have broken the original single TicTacToe module into modules that organise the code more. I now have 2 main modules, GameUI and GameBoard, that use factory functions to keep data private, only returning the functions that I need to use in other modules. In GameUI, I store functions that modify the DOM, in GameBoard, I store functions that modify the game's state.

Private and public functions now make a lot more sense, whereas before I felt that I wasn't really able to confidently decide whether or not a function needed to be private or public. This is also where I had a lot of confusion with ES6 classes, which essentially do the same thing in a different way.
