/*The Fortune Teller*/

function tellFortune(jobTitle, location, partner, numKids) {
    var future = 'You will be a ' + jobTitle + ' in ' + location + ' and married to ' +
   partner + ' ' + ' with ' + numKids + ' kids.';
    console.log(future);
}

tellFortune('football player', 'Spain', 'Rafael Nadal', 3);
tellFortune('architect', 'Japan', 'Gillian Anderson', 3000);
tellFortune('writer', 'Russia', 'Angelina Jolie', 0);