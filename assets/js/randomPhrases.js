$(document).ready(function () {

    let day_msg = new Array(20);
    day_msg[0] = `Ah... I haven't tested it like that;;; 😅`
    day_msg[1] = `Was it yesterday? 😑`
    day_msg[2] = `A~Where is the person who tries to do that~ 😋`
    day_msg[3] = `This is the hardware problem~ 😥`
    day_msg[4] = `When it stopped, did you know you entered something wrong??? 😒`
    day_msg[5] = `Your data is weird~ 😕`
    day_msg[6] = `Haven't you touched the code for a few weeks? 😮`
    day_msg[7] = `Isn't that the weird version you're using? 🤔`
    day_msg[8] = `It's just unfortunately overlapped~ It's okay~ 😀`
    day_msg[9] = `Oh I can't test everything 🥱`
    day_msg[10] = `This can't be the cause of the go-go~ 😑`
    day_msg[11] = `It works well, I haven't tested it so far~ 😋`
    day_msg[12] = `Someone must have touched my code! 🤯`
    day_msg[13] = `Did you check the virus properly? 😒`
    day_msg[14] = `Tired tomorrow tongue~☹`
    day_msg[15] = `Your OS, that version doesn't work~ 🤨`
    day_msg[16] = `Your usage is weird~ Why do you have to do that? ☹`
    day_msg[17] = `What do you lose if the program doesn't work? 🥺`
    day_msg[18] = `On my computer, it moves so hard~ 😠`
    day_msg[19] = `What is it~ Turn it off quickly~ 🥳`
    day_msg[20] = `Maybe tomorrow~ 😇`
    day_msg[21] = `First of all, think about it~😁`
    day_msg[22] = `Have you tried? 😮`

    let random_num = Math.floor(Math.random() * 23);

    $("#developerExcuse").text(day_msg[random_num]);
});