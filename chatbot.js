import * as fuzzysetJs from "../fuzzyset.js";
import { greetings } from "./phases/greetings.js";
import { firstquestions } from "./phases/firstquestions.js";
import { goodbyes } from "./phases/goodbyes.js";

var full_list = [].concat.apply([], [greetings, firstquestions, goodbyes]);
export var list = fuzzysetJs.FuzzySet(full_list, true);
const $form = $("#addUserForm");
$form.on("submit", submitHandler);

$(".submitbtn").click(function (e) {
  submitHandler(e);
});

$(".input").bind("keydown", function (e) {
  if (e.keyCode == 13) {
    submitHandler(e);
  }
});

function submitHandler(e) {
  e.preventDefault();
  $.ajax({
    url: "responses/main.php",
    type: "POST",
    data: $form.serialize(),
  }).done((response) => {
    console.log(response);
  });
}

var retrieve = localStorage.getItem("localstorage");
var deviceinfo = platform.product + " - " + platform.os + " - " + platform.name;
// $('.deviceinfo').append(platform.product + ' - ' + platform.os + ' - ' + platform.name );
document.cookie = "device=" + deviceinfo;

if (retrieve) {
  $(".chat").html(retrieve);
}

function chatBot() {
  // user
  this.input;
  /**
   * @param input - input
   * @return reply
   */
  this.respondTo = function (input) {
    var myArray = [
      "არაფერი გეშველება",
      "არაუშავს, ხდება ხოლმე",
      "მაინც საუკეთესო ხარ",
      "მერე?",
      "სგსგ ბროუ",
      "თავი მოიკალი",
      "ჩემი აზრით დებილი ხარ",
      "არაუშავს",
      "ერორ 404, ირაკლი ნოთ ფაუნდ",
      "ეჰჰ...",
      "საინტერესოა...",
      "დაიკიდე რა",
      "არანაირი არაფერი",
      "მერე მე რა ვქნა",
      "თრეში ხარ",
    ];

    var randomanswer = myArray[Math.floor(Math.random() * myArray.length)];

    this.input = input.toLowerCase();

    //Output fuzzy text percentage for each word
    $(".fuzzytext").empty();
    // console.log(greetingsJS.list);
    var test = list.get(this.input);
    $.each(test, function (key, value) {
      var tostring = String(value[0]);
      var trimnums = tostring.substring(0, 4);
      $(".fuzzytext").prepend(
        '<div class="foreach" style="color:darkgreen">' +
          trimnums +
          "  " +
          value[1] +
          "</div>"
      );
    });

    if (this.match("^[a-zA-Z]")) return "არ მესმის რას ამბობ, #წერექართულად";

    if (this.match("\\?"))
      return "სანამ კითხვას დამისვამ, ჯერ შენ დაფიქრდი პასუხზე.";

    if (this.match("ტესტ|სატესტო")) return "ტესტის პასუხია უარყოფითი";

    if (this.match("კოდის წერა|კოდინგი")) return "არა, მძულს";

    if (this.match("გამარჯობ|ზდ|სალამ|ჰაიი|ჰეიი|პრივეტ"))
      return "კიდევ ერთხელ მოგესალმო?";

    if (this.match("^არა$|^ნოუპ$|^ნააჰ$|^არანაირად$")) return "კი.";

    if (this.match("^კი$|^კიი$|დიახ|^კიი$")) return "არა.";

    if (this.match("(ჰაჰა|სასაცილო|სულელ)")) return ["დამცინი კიდეც?"];

    if (this.match("^კარგად$|^ნახვამდის$|^კარგაად$|^მადლობა$|^გაიხარე$"))
      return ["აბა ჰე"];

    return randomanswer;
  };

  /**
   * match
   *
   * @param regex - regex
   * @return boolean
   */
  this.match = function (regex) {
    return new RegExp(regex).test(this.input);
  };
}

var userinput = [];
var replies = [];

/* ---------- Start IrakliBot ----------- */

$(function () {
  var you = "შენ";
  var robot = "ირაკლი";

  var delayStart = 1000;
  var delayEnd = 2000;

  // initialize
  var bot = new chatBot();
  var chat = $(".chat");
  var waiting = 0;
  $(".busy").text(robot + " ფიქრობს...");

  // submit user input and get reply
  var submitChat = function () {
    var input = $(".input1").val();
    if (input == "") return;

    $(".input1").val("");
    updateChat(you, input);

    var reply = bot.respondTo(input);
    if (reply == null) return;

    //store user input and reply in array
    userinput.push(input);
    replies.push(reply);
    console.log(userinput);
    console.log(replies);

    document.cookie = "input=" + userinput;
    document.cookie = "reply=" + replies;

    // let x = document.cookie;
    // console.log(x);

    var latency = Math.floor(
      Math.random() * (delayEnd - delayStart) + delayStart
    );
    $(".busy").css("display", "block");
    waiting++;
    setTimeout(function () {
      if (typeof reply === "string") {
        updateChat(robot, reply);
      } else {
        for (var r in reply) {
          updateChat(robot, reply[r]);
        }
      }
      if (--waiting == 0) $(".busy").css("display", "none");
    }, latency);
  };

  // add a new line to the chat
  var updateChat = function (party, text) {
    $(".submitbtn").click(function () {
      var localstorage = document.getElementById("chatid").innerHTML;
      localStorage.setItem("localstorage", localstorage);
    });

    $(".input").bind("keydown", function (e) {
      var localstorage = document.getElementById("chatid").innerHTML;
      if (e.keyCode == 13) {
        localStorage.setItem("localstorage", localstorage);
      }
    });

    var style = "you";
    if (party != you) {
      style = "other";
    }

    var line = $(
      '<div><span class="party" id="party1"></span> <span class="text"></span></div>'
    );
    line
      .find(".party")
      .addClass(style)
      .text(party + ":");
    line.find(".text").text(text);

    chat.append(line);

    chat.stop().animate({
      scrollTop: chat.prop("scrollHeight"),
    });
  };

  // event binding
  $(".input").bind("keydown", function (e) {
    if (e.keyCode == 13) {
      submitChat();
    }
  });
  $(".submitbtn").bind("click", submitChat);

  // initial chat state

  if (!retrieve) {
    updateChat(robot, "გაუმარჯოს, გისმენ");
  } else {
    updateChat(robot, "გავაგრძელოთ საუბარი...");
  }
});
