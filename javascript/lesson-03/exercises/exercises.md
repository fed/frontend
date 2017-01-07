#Closures


##Exercise 01

Create a function which takes a value as a maximum and returns a function which takes another value to compare with the first one and return true if greater.


##Exercise 02

Create a function ```santaClaus``` which has a list of presents. The function should return a function ```givePresent()``` which randomly returns and removes one present from the list.


##Exercise 03 (advanced)

Create function ```counter``` which takes as a parameter a ```max value```. Each time the function is executed, use a ```setInterval``` to create a timer, log each interval, and remove it when the ```max value``` is reached. You could add a unique id to each instance of the function.


##Exercise 04 (advanced)

Based on the same logic as before, create a pingpong counter. It should count points for 2 players, declare the winner and finish the game if one is declared. The initial function could take a default score for each player instead of starting from 0.


#This & bind

##Exercise 05

Create an object which has 2 properties ```.firstname``` and ```.lastname```, and 2 methods ```.nowYouAre()``` and ```.whoAreYou()```.
These methods should return or modify the first and last name propreties.


##Exercise 06

Create a function ```whichColorsIsTheDress()``` that will ```console.log()``` the ```colorsSeen``` var. This function will be bound to 2 objects ```regularGuy``` and ```weirdGuy```, each one having a property ```colorsSeen```. The result of the bound should be stored into a variable and executed to see the result.



#IIFE

##Exercise 07

Create an IIFE which will ```console.log()``` the current time (hh:mm:ss) each second.


##Exercise 08

Create an IIFE which will mimic the jQuery object. We will keep it very basic, the object ```$$$``` will return a function which by default will take as a value a DOM selector (class or id) and return the found (or not) results. Also the ```$$$``` object will have a ```.select()``` to do eactly the same.



#jQuery

##Exercise 09

Create a *div#hello*, hidden by default, center it on the page and then make it fade in.


##Exercise 10

Create a *div#infos* where we can see the viewport's dimensions and the mouse position.


##Exercise 11

Add this image to an HTML page and, when loaded, make it take full width/height of the viewport, also when resizing, no matter if it becomes disproportionated.

```
http://4231.vn/wp-content/uploads/2015/03/priceless-messi.jpg
```


##Exercise 12

Create a button that disappears after being clicked.


##Exercise 13

Create a text input *input#name* which will be listening for the *change blur* events. When these are triggered, check if the input is empty or not and depending on that add a *valid* or *error* class.


##Exercise 14 (advanced)

Create a link *a#link* with the same value in the `href` as in the link itself. When clicked, remove its default behavior and prevent any redirection, and also execute a function that will remove letters from it, one by one, until there is nothing, then reset its value based on the href and continue indefinitely the letters-removing stuff.


##Exercise 15 (advanced)

Create a table *table#ceo* with a *thead* containing the categories' title and a *tbody* for the entries.
Sort the tbody's entries regarding its category when the *thead*'s title was clicked.
By default sort it ascendingly, if it was already the case, sort it descendingly.
Add the class to the title element in the *thead* ('asc' or 'desc').


##Exercise 16 (advanced)

Fill the full page with empty *div*'s, position them accordingly and add a rollover effect (opacity?) that can be observed.


##Exercise 17 (advanced)

Create a *select#filter* with some *option*'s in it. Create a *div#fake* with a *span* and an empty *ul* element. You will have to simulate then select with a fake one. First, add the options in the *ul* based on the ones in the *select*. Use the *opened* class on the fake select to show/hide the list of option (*ul*).
Finally update the real *select* according which fake option was clicked.
