(window.webpackJsonp=window.webpackJsonp||[]).push([[39],{99:function(t,e,n){"use strict";n.r(e),n.d(e,"storyContent",function(){return o}),n.d(e,"text",function(){return r}),n.d(e,"compilerOutput",function(){return a});const o={inkVersion:19,root:[[{"->":"conversation_loop"},["done",{"#n":"g-0"}],null],"done",{conversation_loop:[["ev","str","^Talk about the weather","/str","/ev",{"*":".^.c-0",flg:20},"ev","str","^Talk about the children","/str","/ev",{"*":".^.c-1",flg:20},{"*":".^.c-2",flg:8},{"c-0":["^ ",{"->":"chat_weather"},"\n",{"#f":5}],"c-1":["^ ",{"->":"chat_children"},"\n",{"#f":5}],"c-2":[{"->":"sit_in_silence_again"},"\n",null]}],{"#f":3}],chat_weather:["^Looks like a storm coming, huh?","\n",{"->":"conversation_loop"},{"#f":3}],chat_children:["^They're so much taller than the last time I saw them.","\n",{"->":"conversation_loop"},{"#f":3}],sit_in_silence_again:["^There's nothing much left to say, but I've always felt that the truest test of friendship is how well you can be silent together.","\n","done",{"#f":3}],"#f":3}],listDefs:{}},r="-> conversation_loop\r\n\r\n=== conversation_loop ===\r\n  *\t[Talk about the weather] -> chat_weather \r\n  *\t[Talk about the children] -> chat_children \r\n  +\t-> sit_in_silence_again\r\n\r\n=== chat_weather ===\r\nLooks like a storm coming, huh?\r\n-> conversation_loop\r\n\r\n=== chat_children ===\r\nThey're so much taller than the last time I saw them.\r\n-> conversation_loop\r\n\r\n=== sit_in_silence_again ===\r\nThere's nothing much left to say, but I've always felt that the truest test of friendship is how well you can be silent together.\r\n-> DONE",a=[]}}]);
//# sourceMappingURL=39.96f17825.chunk.js.map