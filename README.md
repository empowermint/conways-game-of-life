# Conway's Game of Life

This is a web-page implementation of Conway's Game of Life inspired by the disco dancefloors of the 70s!

## Background

I encountered [Conway's Game of Life](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life) in [an (excellent) book about coding for Python by Al Sweigart](https://inventwithpython.com/bigbookpython/project13.html).

There are lots of implementations of Life out there, so I wanted to do one with a bit of visual swagger. The flashing squares of the Life grid remind me of the light-up dancefloor from *Saturday Night Fever*, so I've gone all in and piled on the disco references for maximum 70s joy! (Also, I like the idea of a Turing complete dancefloor.)

As a challenge to myself, I also decided to make my own version without using native JavaScript only - no libraries!

## Technologies

- HTML
- CSS
- JavaScript

## Launch

You can [view the game live right here on GitHub!](https://empowermint.github.io/conways-game-of-life/)

## Challenges

### Handling board edges

I decided to apply the rules to the edges as though there were permanatly dead cells wrapped all around the grid. Most browsers throw an error of `undefined` if you try to access an item in an array that does not exist, so I had to use a `try...catch` statement to treat all non-grid cells as dead.

(Sweigart's Python implentation instead takes advantage of Python's ability to use negative indices to select data from the end of an array (like `array[-1]`) to make a spherical field.)

### Flashing colours

Having each cell light up in a different colour is an essential part of my implementation because that's what makes the grid look like a dancefloor! I initially approached this by having the JS reassign the `style.background` of each cell directly, but this stopped the native checkbox behaviour from working normally because the JS styles were overriding the `:checked` CSS psudoproperty.

I did toy with re-writing the click to turn on/off functionality of the checkboxes using JS, but in the end found a more elegant solution: each cell colour is defined as a its own CSS class, which can then be re-assigned easily using JS. The moral of the story? Native JS/CSS expect you to keep all of the design in your CSS - and it's much easier if you go along with that in the first place!

### User input

The Python implementation does not have any user customisation. Mine lets the user choose their own grid size and set the chance of each cell being alive at the start of the game.

### Large grid sizes

I let the user choose their own grid size for the game, which means the app needs to find a sensible way to display an arbitarily-sized grid at any given screen size.
