// ==UserScript==
// @name         UpVSDown
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  try to take over the world!
// @author       Adventure10
// @match        https://artofproblemsolving.com/upvsdown
// @icon         https://www.google.com/s2/favicons?domain=tampermonkey.net
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    if (window.location.href == 'https://artofproblemsolving.com/upvsdown') {
        fetch('http://localhost:8080/aops', { method: 'POST' })
            .then(response => response.text())
            .then(result => build_game(result))
    }

    function build_game(game) {
        document.getElementById('main-content').innerHTML = ` <div id='main-contentr'>
        <div class="containter">
            <div id='number'>
                500
            </div>
        </div><br>
        <div class="container">
            <div id='up' class='btn btn-primary'>
                Up
            </div>
            <div id='down' class='btn btn-primary'>
                Down
            </div>
            <div id='flip' class='btn btn-primary'>
                Flip
            </div>
            <div class="container">
                <div id="log">
                    <!--
                    <div class='log'>
                        <span class='name'>
                                Adventure10
                            </span>
                        <span class="text">
                                moved the number
                            </span>
                        <span class='direction'>
                                down.
                        </span>
                    </div>-->
                </div>
            </div>
        </div>
        <div id='down-wins'>
            <span class='top-text'>
                Team down has 
            </span>
            <span class='number' id='down-num'>
                0
            </span>
            <span class='top-text'>
                wins.
            </span>
        </div>
        <div id='up-wins'>
            <span class='top-text'>
                Team up has 
            </span>
            <span class='number' id='up-num'>
                0
            </span>
            <span class='top-text'>
                wins.
            </span>
        </div>
        <div id='how-to'>
            <a href='javascript:void(0)' class="closebtn">&times;</a>
            <div class="instruction">
                This is up vs down, a popular game where the players try to move the number up or down.<br><br>Either team wins when they reach 1000 or 0.
            </div>
        </div><br><br><br><br><br>
        <span id='instruction-container'>
            <span style="font-size:30px;cursor:pointer">
                &#128712;info
            </span>
        </span>
    </div>`
        document.getElementsByTagName('head')[0].innerHTML += `<style>
        .log,
        #up-wins,
        #down-wins,
        #number,
        #instruction-container,
        .instruction {
            font-family: "Lucida Console", "Courier New", monospace;
            user-select: none;
            cursor: default;
        }
        
        #instruction-container {
            cursor: pointer;
            text-align: left;
            padding-left: 20px;
            float: left;
        }
        
        div {
            text-align: center;
        }
        
        .btn-primary {
            color: #fff;
            background-color: #1b365d;
        }
        
        .btn {
            display: inline-block;
            font-weight: 700;
            height: 24px;
            padding: 0 12px;
            margin-bottom: 0;
            font-size: 14px;
            line-height: 24px;
            text-align: center;
            white-space: nowrap;
            vertical-align: middle;
            cursor: pointer;
            border: none;
            border-radius: 0;
            font-family: Roboto, sans-serif;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            -o-user-select: none;
            user-select: none;
            margin: 0px 3px;
        }
        
        .btn-primary:hover {
            color: #fff;
            background-color: #135b7b;
            border-color: #135b7b;
            text-decoration: none;
        }
        
        #number {
            margin: 20px;
            font-size: 50px;
            font-weight: 400;
            padding: 10px;
            border: 3px solid black;
            background-color: #1b365d;
            display: inline-block;
            border-radius: 10px;
            color: white;
            vertical-align: middle;
            padding-top: 15px;
            cursor: default;
            width: 120px;
            user-select: none;
        }
        
        .name {
            font-weight: 600;
        }
        
        .log {
            margin: 10px 0px;
        }
        
        #log {
            margin-top: 4px;
            height: 400px;
            overflow-y: auto;
        }
        
        #up-wins {
            position: fixed;
            top: 0;
            right: 0;
            float: right;
            margin: 3px;
            font-size: 20px;
        }
        
        #down-wins {
            position: fixed;
            top: 0;
            left: 0;
            margin: 3px;
            font-size: 20px;
        }
        
        #how-to {
            height: 100%;
            width: 0;
            position: fixed;
            z-index: 1;
            top: 0;
            left: 0;
            opacity: 98%;
            background-color: #111;
            overflow-x: hidden;
            overflow-y: auto;
            transition: .5s;
            padding-top: 60px;
            text-align: center;
        }
        
        .instruction {
            padding: 8px 8px 8px 32px;
            text-decoration: none;
            font-size: 20px;
            color: #DDDDDD;
            display: block;
            transition: .3s;
        }
        
        .closebtn {
            position: absolute;
            top: 0;
            right: 25px;
            font-size: 36px;
            margin-top: 20px;
            margin-left: 50px;
            color: #AAAAAA;
            text-decoration: none;
        }
        
        .closebtn:hover {
            color: white;
        }
        
        @media screen and (max-height: 450px) {
            #how-to {
                padding-top: 15px;
            }
            #how-to.instruction {
                font-size: 12px;
            }
        }
    </style>`
    }
    build_game()

    function setCookie(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toGMTString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

    function getCookie(cname) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    function checkCookie() {
        var time = getCookie("id");
        if (time != "") {
            return time
        } else {
            return false
        }
    }
    let number = 500
    var id;
    let username;
    var url = 'http://127.0.0.1:5000/'
    timeb4 = new Date().getTime()
    console.log(timeb4)
    id = checkCookie()
    if (id == false) {
        getname()
        fetch(url + 'join', {
                method: 'POST',
                body: JSON.stringify({
                    name: username
                })
            })
            .then(response => response.json())
            .then(result => make_id(result))
    } else {
        if (typeof(id) == "string") {
            id = parseInt(id)
        }
        fetch(url + 'is_id', {
                method: 'POST',
                body: JSON.stringify({
                    id: id
                })
            })
            .then(response => response.json())
            .then(result => check_id(result))
    }

    function check_id(data) {
        if (data.id = 'false') {
            document.cookie.split(";").forEach(function(c) {
                document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
            });
            window.location.reload()
        }
    }

    function make_id(stuff) {
        console.log(new Date().getTime() - timeb4)
        id = stuff.id
        console.log(id)
        setCookie('id', id, 3000000000)
    }
    window.onunload = function() {
        alert('leave')
        return true;
    }
    document.getElementById('up').onclick = function() {
        /*
                    number += 1
                    document.getElementById('number').innerHTML = number
                    document.getElementById('log').innerHTML = `<div class='log'>
                                <span class='name'>
                                        ${username}
                                    </span>
                                <span class="text">
                                        moved the number
                                    </span>
                                <span class='direction'>
                                        up.
                                </span>
                            </div>` + document.getElementById('log').innerHTML
                    check_for_win()*/
        fetch(url + 'up', {
            method: 'POST',
            body: JSON.stringify({
                id: id
            })
        })
        console.log('up')
    }
    document.getElementById('down').onclick = function() {
        /*
                    number -= 1
                    document.getElementById('number').innerHTML = number
                    document.getElementById('log').innerHTML = `<div class='log'>
                                <span class='name'>
                                        ${username}
                                    </span>
                                <span class="text">
                                        moved the number
                                    </span>
                                <span class='direction'>
                                        down.
                                </span>
                            </div>` + document.getElementById('log').innerHTML
                    check_for_win()*/
        fetch(url + 'down', {
            method: 'POST',
            body: JSON.stringify({
                id: id
            })
        })
        console.log('down')
    }
    document.getElementById('flip').onclick = function() {
        /*
                    if (number < 10) {
                        number = parseInt(reverse('00' + number.toString()))
                    } else if (number < 100) {
                        number = parseInt(reverse('0' + number.toString()))
                    } else {
                        number = parseInt(reverse(number.toString()))
                    }
                    document.getElementById('number').innerHTML = number
                    document.getElementById('log').innerHTML = `<div class='log'>
                                <span class='name'>
                                        ${username}
                                    </span>
                                <span class="text">
                                        flipped the number.
                                    </span>
                            </div>` + document.getElementById('log').innerHTML
                    check_for_win()*/
        fetch(url + 'flip', {
            method: 'POST',
            body: JSON.stringify({
                id: id
            })
        })
        console.log(flip)
    }

    function getname() {
        username = window.prompt('Enter your name:')
        console.log(username)
        if (username == null || username == '') {
            getname()
        }
        return username
    }
    setInterval(function() {
        fetch(url + 'number', {
                method: 'POST'
            })
            .then(response => response.json())
            .then(result => build_numbers(result))
    }, 200)

    function build_numbers(numbers) {
        document.getElementById('number').innerHTML = numbers.number
        document.getElementById('up-num').innerHTML = numbers.upwins
        document.getElementById('down-num').innerHTML = numbers.downwins
    }
    setInterval(function() {
        fetch(url + 'log', {
                method: 'POST',
                body: JSON.stringify({
                    id: id
                })
            })
            .then(response => response.json())
            .then(result => build_log(result))
    }, 200)

    function build_log(logger) {
        if (logger.length > 0) {
            console.log(logger)
        }
        for (var item of logger.reverse()) {
            console.log(item)
            document.getElementById('log').innerHTML = `<div class='log'>
                                <span class='name'>
                                        ${item.user}
                                    </span>
                                <span class="text">
                                        ${item.text}
                                    </span>
                            </div>` + document.getElementById('log').innerHTML
        }
    }

    function reverse(str) {
        return str.split('').reverse().join('')
    }

    function check_for_win() {
        if (number <= 0) {
            clear_onclick()
            downwins += 1
            document.getElementById('down-num').innerHTML = downwins
            document.getElementById('log').innerHTML = `<div class='log'>
                    <span class='name'>
                            ${username}
                        </span>
                    <span class="text">
                            gave team down a win.
                    </span>
                </div>` + document.getElementById('log').innerHTML
        } else if (number >= 1000) {
            clear_onclick()
            upwins += 1
            document.getElementById('up-num').innerHTML = upwins
            document.getElementById('log').innerHTML = `<div class='log'>
                    <span class='name'>
                            ${username}
                        </span>
                    <span class="text">
                            gave team up a win.
                        </span>
                </div>` + document.getElementById('log').innerHTML
        }

    }
    upwins = 0
    downwins = 0

    function clear_onclick() {
        /*
                    for (let element of document.getElementsByTagName('*')) {
                        element.onclick = function() {}
                    }*/
        number = 500
        document.getElementById('number').innerHTML = number
    }
    document.getElementsByClassName('closebtn')[0].onclick = function() {
        document.getElementById('how-to').style.width = "0";
    }
    document.getElementById('instruction-container').style = ''
    document.getElementById('instruction-container').onclick = function() {
            document.getElementById('how-to').style.width = '100%';
        }
        //TODO:
        //Chat
        //Help
})();
