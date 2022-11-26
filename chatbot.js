/* ---------- Iraklibot ----------- */

function chatBot() {
  
    // user
    this.input;
    
    /**
     * @param input - input
     * @return reply
     */
    this.respondTo = function(input) {

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
            "კაი",
          ];

    var randomanswer = myArray[Math.floor(Math.random()*myArray.length)];


    
      this.input = input.toLowerCase();
      
      if(this.match('^[a-zA-Z]'))
        return "არ მესმის რას ამბობ, #წერექართულად";
      
    if(this.match('\\?'))
        return "სანამ კითხვას დამისვამ, ჯერ შენ დაფიქრდი პასუხზე.";

    if(this.match('ტესტ|სატესტო'))
        return "ტესტის პასუხია უარყოფითი";
      
      if(this.match('გამარჯობ|ზდ|სალამ|ჰაიი|ჰეიი|პრივეტ'))
        return "კიდევ ერთხელ მოგესალმო?";
      
      if(this.match('^არა$|^ნოუპ$|^ნააჰ$|^არანაირად$'))
        return "კი.";

        if(this.match('^კი$|^კიი$|დიახ|^კიი$'))
        return "არა.";
      
      if(this.match('(ჰაჰა|სასაცილო|სულელ)'))
        return ["დამცინი კიდეც?"];
      
      if(this.match('^კარგად$|^ნახვამდის$|^კარგაად$|^მადლობა$|^გაიხარე$'))
        return ["აბა ჰე"];

      return randomanswer;
    }
    
    /**
     * match
     * 
     * @param regex - regex
     * @return boolean
     */
    this.match = function(regex) {
    
      return new RegExp(regex).test(this.input);
    }
  }
  
  /* ---------- Start IrakliBot ----------- */
  
  $(function() {
  
    var you = 'შენ';
    var robot = 'ირაკლი';
    
    var delayStart = 1000;
    var delayEnd = 2000;
    
    // initialize
    var bot = new chatBot();
    var chat = $('.chat');
    var waiting = 0;
    $('.busy').text(robot + ' ფიქრობს...');
    
    // submit user input and get reply
    var submitChat = function() {
    
      var input = $('.input input').val();
      if(input == '') return;
      
      $('.input input').val('');
      updateChat(you, input);
      
      var reply = bot.respondTo(input);
      if(reply == null) return;
      
      var latency = Math.floor((Math.random() * (delayEnd - delayStart)) + delayStart);
      $('.busy').css('display', 'block');
      waiting++;
      setTimeout( function() {
        if(typeof reply === 'string') {
          updateChat(robot, reply);
        } else {
          for(var r in reply) {
            updateChat(robot, reply[r]);
          }
        }
        if(--waiting == 0) $('.busy').css('display', 'none');
      }, latency);
    }
    
    // add a new line to the chat
    var updateChat = function(party, text) {
    
      var style = 'you';
      if(party != you) {
        style = 'other';
      }
      
      var line = $('<div><span class="party"></span> <span class="text"></span></div>');
      line.find('.party').addClass(style).text(party + ':');
      line.find('.text').text(text);
      
      chat.append(line);
      
      chat.stop().animate({ scrollTop: chat.prop("scrollHeight")});
    
    }
    
    // event binding
    $('.input').bind('keydown', function(e) {
      if(e.keyCode == 13) {
        submitChat();
      }
    });
    $('.input a').bind('click', submitChat);
    
    // initial chat state
    updateChat(robot, 'გაუმარჯოს, გისმენ');
  
  });