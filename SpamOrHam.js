var menuExpanded = false;
$(window).load(function () {
    var height = window.innerHeight,
        x = 0, y = height / 2,
        curveX = 10,
        curveY = 0,
        targetX = 0,
        xitteration = 0,
        yitteration = 0,


        blob = $('#blob'),
        blobPath = $('#blob-path'),

        hamburger = $('.hamburger');

    $(this).on('mousemove', function (e) {
        x = e.pageX;

        y = e.pageY;
    });

    $('.hamburger, .menu-inner').on('mouseenter', function () {
        $(this).parent().addClass('expanded');
        menuExpanded = true;
    });

    $('.menu-inner').on('mouseleave', function () {
        menuExpanded = false;
        $(this).parent().removeClass('expanded');
    });

    function easeOutExpo(currentIteration, startValue, changeInValue, totalIterations) {
        return changeInValue * (-Math.pow(2, -10 * currentIteration / totalIterations) + 1) + startValue;
    }

    var hoverZone = 150;
    var expandAmount = 20;
    var element = document.getElementById("display");


    function svgCurve() {
        if ((curveX > x - 1) && (curveX < x + 1)) {
            xitteration = 0;
        } else {
            if (menuExpanded) {

                element.style.paddingLeft = "300px";
                targetX = 0;
            } else {
                element.style.paddingLeft = "60px";
                xitteration = 0;
                if (x > hoverZone) {
                    targetX = 0;
                } else {
                    targetX = -(((60 + expandAmount) / 100) * (x - hoverZone));
                }
            }
            xitteration++;
        }

        if ((curveY > y - 1) && (curveY < y + 1)) {
            yitteration = 0;
        } else {
            yitteration = 0;
            yitteration++;
        }

        curveX = easeOutExpo(xitteration, curveX, targetX - curveX, 100);
        curveY = easeOutExpo(yitteration, curveY, y - curveY, 100);

        var anchorDistance = 200;
        var curviness = anchorDistance - 40;

        var newCurve2 = "M60," + height + "H0V0h60v" + (curveY - anchorDistance) + "c0," + curviness + "," + curveX + "," + curviness + "," + curveX + "," + anchorDistance + "S60," + (curveY) + ",60," + (curveY + (anchorDistance * 2)) + "V" + height + "z";

        blobPath.attr('d', newCurve2);

        blob.width(curveX + 60);

        hamburger.css('transform', 'translate(' + curveX + 'px, ' + curveY + 'px)');

        $('h2').css('transform', 'translateY(' + curveY + 'px)');
        window.requestAnimationFrame(svgCurve);
    }

    window.requestAnimationFrame(svgCurve);

});

document.addEventListener('DOMContentLoaded', function () {

    document.getElementById('goBackButton').addEventListener('click', function () {
        // Use JavaScript's history.back() function to navigate to the previous page
        window.history.back();
    });
    document.getElementById('showSpam').addEventListener('click', function () {
        document.getElementById('display').innerHTML = "";
        fetch('http://127.0.0.1:5000/load_data')
            .then((response) => {
                // console.log(response)
                return response.json();
            })
            .then((data) => {



                function GFG_Fun(text, fullEmail) {


                    var a = document.createElement('a');


                    var link = document.createTextNode(text);


                    a.appendChild(link);


                    a.title = text;
                    a.className = "list-group-item list-group-item-action";

                    a.href = '/emailShow.html?emailText=' + encodeURIComponent(fullEmail);

                    document.getElementById('display').appendChild(a);
                    var lineBreak = document.createElement('br');


                    document.getElementById('display').appendChild(lineBreak);
                }

                function displayData(specificData) {

                    const list2 = []
                    var i = 0
                    specificData.forEach(row => {

                        if (row.predictions === '1') {
                            list2.push(row.text)
                        }



                    })
                    for (var i = 0; i < list2.length; i++) {


                        // Find the index of "Subject:" and "Email:"
                        var startIndex = list2[i].indexOf("Subject:") + "Subject:".length;
                        var endIndex = list2[i].indexOf("Email:");

                        // Extract the substring between "Subject:" and "Email:"
                        var substring = list2[i].substring(startIndex, endIndex).trim();

                        var sIndex = list2[i].indexOf('Email:') + "Email:".length;
                        var eIndex = list2[i].length;

                        var subStringFull = list2[i].substring(sIndex, eIndex).trim();

                        GFG_Fun(substring, subStringFull)
                    }


                }

                function showSpam() {
                    const spamData = data.filter(row => row.predictions === '1');
                    // document.getElementById('title').innerHTML = 'SPAM'
                    displayData(spamData);
                }

                showSpam()

            })
            .catch((error) => {
                console.log(error)
            })

    });
    document.getElementById('showHam').addEventListener('click', function () {
        document.getElementById('display').innerHTML = "";
        fetch('http://127.0.0.1:5000/load_data')
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                function GFG_Fun(text, fullEmail) {


                    var a = document.createElement('a');


                    var link = document.createTextNode(text);


                    a.appendChild(link);


                    a.title = text;
                    a.className = "list-group-item list-group-item-action";

                    a.href = '/emailShow.html?emailText=' + encodeURIComponent(fullEmail);

                    document.getElementById('display').appendChild(a);
                    var lineBreak = document.createElement('br');


                    document.getElementById('display').appendChild(lineBreak);
                }

                function displayDatas(specificData) {

                    const list2 = []

                    specificData.forEach(row => {

                        if (row.predictions === '0') {
                            list2.push(row.text)
                        }
                    })
                    for (var i = 0; i < list2.length; i++) {


                        // Find the index of "Subject:" and "Email:"
                        var startIndex = list2[i].indexOf("Subject:") + "Subject:".length;
                        var endIndex = list2[i].indexOf("Email:");

                        // Extract the substring between "Subject:" and "Email:"
                        var substring = list2[i].substring(startIndex, endIndex).trim();

                        var sIndex = list2[i].indexOf('Email:') + "Email:".length;
                        var eIndex = list2[i].length;

                        var subStringFull = list2[i].substring(sIndex, eIndex).trim();

                        GFG_Fun(substring, subStringFull)
                    }
                }

                function showHam() {
                    const hamData = data.filter(row => row.predictions === '0');
                    // document.getElementById('title').innerHTML = 'HAM'
                    displayDatas(hamData);
                }

                showHam()

            })
            .catch((error) => {
                console.log(error)
            })

    });





});