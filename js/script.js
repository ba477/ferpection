// $(document).ready(function() {
//     "use strict";
//
//
//     function clignotement(){
//     $(".wait").toggleClass( "opacity" );
//     }
//     setInterval("clignotement()", 450);
//     $(".commande").click(function(){
//         $(".trash").addClass("displaynone");
//     });
//     // mise en place de l appel régulier de la fonction toutes les 0.5 secondes
//
//
//
//
//
// });
//
//
$(document).ready(function() {
    "use strict";


    // COMMANDES
    function clear() {
        terminal.text("");
    }

    function help() {
        terminal.append("I need somebody"+ bump);
    }

    function echo(args) {
        var str = args.join(" ");
        terminal.append(str + bump);
    }
    function add() {
        var termLenght = command.length;
        var oneQuest = command.slice(5, termLenght -1);
        terminal.append(oneQuest + bump);
        questions.push( oneQuest );
    }
    function listQuestions() {
        for (var i = 0; i <= questions.length-1; i++){
            terminal.append("." + (i+1) +" "+ questions[i] + bump);
        }
    }
    function addAnswers() {
        var termLenght = command.length;
        var oneAnsw = command.slice(9, termLenght );
        terminal.append(oneAnsw + bump);
        answers.push( oneAnsw );
    }
    function listAnswers() {
        for (var i = 0; i <= questions.length-1; i++){
            terminal.append("." + (i+1) +" "+ questions[i] + " " + answers[i] +  bump);
        }
    }
    function justQuest() {
        for (var i = 0; i <= questions.length-1; i++){
            terminal.append(questions[i] + bump);
        }
    }
    // FIN COMMANDES
    var questions = [];
    var answers = [];

    var bump = "\n" ;
    var title = $(".title");
    var terminal = $(".terminal");
    var base = "C:/User/Unicorn/Dev/ferpection/";

    var commandHistory = [];
    var historyIndex = 0;

    var command = "";
    var commands = [{
        "name": "clear",
        "function": clear
    }, {
        "name": "help",
        "function": help
    }, {
        "name": "echo",
        "function": echo
    }, {
        "name": "add",
        "function": add
    }, {
        "name": "list_questions",
        "function": listQuestions
    }, {
        "name": "answer",
        "function": addAnswers
    }, {
        "name": "list_answers",
        "function": listAnswers
    }, {
        "name": "list_unanswered_questions",
        "function": justQuest
    }];

    function processCommand() {
        var isValid = false;



        var args = command.split(" ");
        var cmd = args[0];
        args.shift();

        // On recherche la commande
        for (var i = 0; i < commands.length; i++) {
            if (cmd === commands[i].name) {
                commands[i].function(args);
                isValid = true;
                break;
            }
        }

        // Si commande null
        if (!isValid) {
            terminal.append( "'" +command + "'" + " n’est pas reconnu en tant que commande interne" +  "\n");
        }

        // Ajouter à l'historique des commandes
        commandHistory.push(command);
        historyIndex = commandHistory.length;
        command = "";
    }

    function displayPrompt() {
        terminal.append("<span class=\"prompt\">" + base + "</span> ");
    }

    // Delete n number of characters from the end of our output
    function erase(n) {
        command = command.slice(0, -n);
        terminal.html(terminal.html().slice(0, -n));
    }

    function clearCommand() {
        if (command.length > 0) {
            erase(command.length);
        }
    }

    function appendCommand(str) {
        terminal.append(str);
        command += str;
    }


     // Retrouver les différentes commandes


    $(document).keydown(function(e) {
        e = e || window.event;
        var keyCode = typeof e.which === "number" ? e.which : e.keyCode;

        // BACKSPACE
        if (keyCode === 8 && e.target.tagName !== "INPUT" && e.target.tagName !== "TEXTAREA") {
            e.preventDefault();
            if (command !== "") {
                erase(1);
            }
        }

        // UP or DOWN
        if (keyCode === 38 || keyCode === 40) {
            // Move up or down the history
            if (keyCode === 38) {
                // UP
                historyIndex--;
                if (historyIndex < 0) {
                    historyIndex++;
                }
            } else if (keyCode === 40) {
                // DOWN
                historyIndex++;
                if (historyIndex > commandHistory.length - 1) {
                    historyIndex--;
                }
            }

            var cmd = commandHistory[historyIndex];
            if (cmd !== undefined) {
                clearCommand();
                appendCommand(cmd);
            }
        }
    });

    $(document).keypress(function(e) {
        // Make sure we get the right event
        e = e || window.event;
        var keyCode = typeof e.which === "number" ? e.which : e.keyCode;

        switch (keyCode) {
            // ENTER
            case 13:
            {
                terminal.append("\n");

                processCommand();
                displayPrompt();
                break;
            }
            default:
            {
                appendCommand(String.fromCharCode(keyCode));
            }
        }
    });

    // Titre de la fenètre
    title.text("Selection Invite de commandes");

    // Date
    var date = new Date().toString(); date = date.substr(0, date.indexOf("GMT") - 1);

    // Message de base
    terminal.append( base + date + "\n" ); displayPrompt();
});
//
