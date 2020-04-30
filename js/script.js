window.onload = function () {
    var name = "NILL";
    if (localStorage.length > 0) {
        if (localStorage.checkvalue != undefined) {
            name = JSON.parse(localStorage.getItem("nameoftheperson"));
            name += "   " + JSON.parse(localStorage.getItem("score"));
        }
    }
    document.getElementById("name").innerHTML = name;
    var i = 1;
    let anArrayOfUniqueNumbers = [];
    let numberGenerator = function (arr) {
        if (arr.length >= 9) return;
        let newNumber = Math.floor(Math.random() * 10 + 1);
        if (arr.indexOf(newNumber) < 0 && newNumber != 10) {
            arr.push(newNumber);
            document.getElementById(newNumber).src = "assets/img/" + i + ".jpg";
            i++;
        }
        numberGenerator(arr);
    };
    numberGenerator(anArrayOfUniqueNumbers);
}
var imgsrc, thisval, score = 0;
$(document).ready(function () {
    setTimeout(function(){
        alert("Puzzle Tutorial : \n1.Click the image in the second table\n2.Again click the corresponding First table\n3.After set a all image click the submit button ");
    },500);
    $(".right td").click(function () {
        $("td").removeClass("active");
        $(this).addClass("active");
        imgsrc = $("img", this).attr("src");
    });
    $(".left td").click(function () {
        score += 1;
        $("td").removeClass("active");
        $(this).addClass("active");
        if(imgsrc!=null){
           $(this).css({
            padding: "0px"
        });
           }

        $("img", this).attr("src", imgsrc);
        imgsrc = null;
        // $(thisval).removeAttr("src");
    });
    $("button").click(function () {
        var count = 0,countallclick=0;
        for (var i = 9, j = 1; i >= 1; i--, j++) {
            var mul = i + 10;
            var checkimgsrc = document.getElementById(mul).src;
            if(checkimgsrc){
                countallclick+=1;
            }
            var checkimg = checkimgsrc.charAt(checkimgsrc.length - 5);
            if (checkimg == j) {
                count += 1;
            }
        }
        if (count == 9) {
            var value = 19 - score;
            if (value > 0) {
                alert("you're WIN\nYour score is "+value);
                var nameoftheperson = prompt("ENTER YOUR NAME");

              if (localStorage.checkvalue != undefined) {
                    var conditionval=JSON.parse(localStorage.getItem("score"));
                    if (Number(conditionval) < value) {
                        localStorage.setItem("nameoftheperson", JSON.stringify(nameoftheperson));
                        localStorage.setItem("score", JSON.stringify(value));
                    }
                }
                else {
                    localStorage.setItem("nameoftheperson", JSON.stringify(nameoftheperson));
                    localStorage.setItem("score", JSON.stringify(value));
                }
                localStorage.checkvalue=1;
            } else {
                alert("Your score is 0 so it is not consider your best score");
            }
            window.location.reload();
        }
        else  if(countallclick<9) {
            alert("Please fill "+countallclick+" more box");
        }
        else{
            alert("You're loss! Try again");
            window.location.reload();
        }
        
    });
});
