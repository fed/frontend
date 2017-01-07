#Exercise: Views in MVC

In this exercise, you will take an app and split it into a Model and View.

Go through these steps, and do as many as you can in the time we have:

1. Start with the solution from the last exercise.
2. Create a `VideoItem` view. It should be very similar to `addVideoToList`, but instead of appending to the global UL (`#videos-list`), it should return a LI.
3. In the for loop in document.ready, change the code to create a new `VideoItem` object, and append the resulting LI to the global `#videos-list` UL there instead.
4. Try loading the page and see if your code works!
5. Bonus: Test the reusability of your code now by creating a new UL in the HTML `#videos2-list` and see if you can create new item views to insert in that UL.


Make sure that you use your browser developer tools to make debugging easier while working on this. Check for errors, and use `console.log()` to figure out how far your code makes it, and what the values of your variables are along the way.