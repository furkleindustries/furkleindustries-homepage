(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{75:function(e,t,s){"use strict";s.r(t),s.d(t,"storyContent",function(){return r}),s.d(t,"text",function(){return n}),s.d(t,"compilerOutput",function(){return i});const r={inkVersion:19,root:[[{"->":"start"},["done",{"#n":"g-0"}],null],"done",{start:[["ev","str","^Go to Paris","/str",{"CNT?":"visit_paris"},"!","/ev",{"*":".^.c-0",flg:21},"ev","str","^Return to Paris","/str",{"CNT?":"visit_paris"},"/ev",{"*":".^.c-1",flg:5},"ev","str","^Telephone Mme Estelle","/str",{"CNT?":"visit_paris.met_estelle"},"/ev",{"*":".^.c-2",flg:21},{"c-0":["^ ",{"->":"visit_paris"},"\n",{"#f":5}],"c-1":["^ ",{"->":"visit_paris"},"\n",null],"c-2":["^ ",{"->":"phone_estelle"},"\n",{"#f":5}]}],{"#f":3}],visit_paris:["^It's so lovely this time of year. La Tour D'Eiffel, perchance?","\n",{"->":".^.met_estelle"},{met_estelle:["^Bonjour, Mme Estelle!","\n",{"->":"start"},{"#f":3}],"#f":3}],phone_estelle:["^Allo? Mme Estelle? Comment vas-tu?","\n",{"->":"start"},{"#f":3}],"#f":3}],listDefs:{}},n="-> start\r\n\r\n=== start ===\r\n*\t{ not visit_paris } \t      [Go to Paris] -> visit_paris\r\n+ { visit_paris } \t\t        [Return to Paris] -> visit_paris \r\n*\t{ visit_paris.met_estelle } [Telephone Mme Estelle] -> phone_estelle\r\n\r\n=== visit_paris ===\r\nIt's so lovely this time of year. La Tour D'Eiffel, perchance?\r\n\r\n-> met_estelle\r\n\r\n= met_estelle\r\nBonjour, Mme Estelle!\r\n\r\n-> start\r\n\r\n=== phone_estelle ===\r\nAllo? Mme Estelle? Comment vas-tu?\r\n-> start",i=[]}}]);
//# sourceMappingURL=15.15546d60.chunk.js.map