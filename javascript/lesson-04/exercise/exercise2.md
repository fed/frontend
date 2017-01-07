#Exercise: Models in MVC
In this exercise, you will take an app and split it into a Model and View.
Go through these steps, and do as many as you can in the time we have:

1. Download this file and save it into your project folder. Open it up in your browser and make sure it works. You should see a list of videos, and when you click on them, a modal pops up that plays the video.
2. Read through the code and try to understand what it's doing.
3. Create a `VideoModel` object that represents a video. Your model object should take in a JSON object and store title, author, and youtubeID properties. It should also calculate an embed and thumbnail URL.
4. Create a `VideoCollection` object that represents a collection of videos. It should take in JSON and turn it into an internal `items` array of `VideoModel` instances.
5. Modify the code in `document.ready` to create a new instance of a `VideoCollection`, using the data from the `videosJSON` array stored in the page.
6. Change the for loop to iterate through the items in the `VideoCollection` and pass them to the `addVideoToList` function.
7. Try loading the page now and see if your code works. Are there any errors? Look at the console and work through them one by one. You may have to modify a few things in your `addVideoToList` function.
8. Bonus: Add a sort() method to the collection that sorts the items based on title. (Hint: Check out [String.localeCompare](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/localeCompare)). Call the `sort()` method on the collection before displaying them.


Make sure that you use your browser developer tools to make debugging easier while working on this. Check for errors, and use console.log() to figure out how far your code makes it, and what the values of your variables are along the way.