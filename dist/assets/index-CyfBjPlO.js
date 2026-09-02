(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const h of document.querySelectorAll('link[rel="modulepreload"]'))n(h);new MutationObserver(h=>{for(const f of h)if(f.type==="childList")for(const a of f.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function t(h){const f={};return h.integrity&&(f.integrity=h.integrity),h.referrerPolicy&&(f.referrerPolicy=h.referrerPolicy),h.crossOrigin==="use-credentials"?f.credentials="include":h.crossOrigin==="anonymous"?f.credentials="omit":f.credentials="same-origin",f}function n(h){if(h.ep)return;h.ep=!0;const f=t(h);fetch(h.href,f)}})();function $t(s){let e=s.replace(/^(\s*\.)+\s*/,"").replace(/Ifyouâve youâ€™ve/g,"If you've").replace(/If you've you've/gi,"If you've").replace(/youâve/g,"you've").replace(/youâ€™ve/g,"you've").replace(/theyâre/g,"they're").replace(/theyâ€™re/g,"they're").replace(/weâve/g,"we've").replace(/weâ€™ve/g,"we've").replace(/donât/g,"don't").replace(/donâ€™t/g,"don't").replace(/friendâs/g,"friend's").replace(/friendâ€™s/g,"friend's").replace(/trendâkind/g,"trend - kind").replace(/trendâ€”kind/g,"trend - kind").replace(/regularworkingclass/g,"regular working-class").replace(/shallowaestheticobsessed/g,"shallow, aesthetic-obsessed").replace(/inlowpoly/g,"in low-poly").replace(/lowrise/g,"low-rise").replace(/Miu Miumicroskirt/g,"Miu Miu micro-skirt").replace(/â€™/g,"'").replace(/â€”/g," - ").replace(/—/g," - ").replace(/â€œ/g,'"').replace(/â€/g,'"').replace(/\b(you've)\s+(you've)\b/gi,"$1").replace(/\s+/g," ").trim();return e=e.replace(/^[,;?!\-–—.\s]+/,"").trim(),e}function je(s){const[e,t]=s.trim().split(","),[n,h,f]=e.split(":").map(Number);return n*3600+h*60+f+parseInt(t||"0",10)/1e3}function Tt(s){const t=s.replace(/\r\n/g,`
`).replace(/\r/g,`
`).split(/\n\n+/),n=[];for(const h of t){const f=h.trim().split(`
`);if(f.length<2)continue;const a=parseInt(f[0].trim(),10),i=f[1].match(/(\d{2}:\d{2}:\d{2},\d{3})\s*-->\s*(\d{2}:\d{2}:\d{2},\d{3})/);if(!i)continue;const p=je(i[1]),x=je(i[2]),o=f.slice(2).join(" "),r=$t(o);r.length>0&&n.push({id:a,start:p,end:x,text:o,cleanText:r,words:r.split(" ").filter(l=>l.length>0)})}return n}function rt(s,e){for(const t of s)if(e>=t.start&&e<=t.end)return t;return null}class Mt{constructor(e=1920,t=1080){Object.defineProperty(this,"baseWidth",{enumerable:!0,configurable:!0,writable:!0,value:1920}),Object.defineProperty(this,"baseHeight",{enumerable:!0,configurable:!0,writable:!0,value:1080}),Object.defineProperty(this,"current",{enumerable:!0,configurable:!0,writable:!0,value:{centerX:960,centerY:540,zoom:1}}),Object.defineProperty(this,"target",{enumerable:!0,configurable:!0,writable:!0,value:{centerX:960,centerY:540,zoom:1}}),Object.defineProperty(this,"isInstantCut",{enumerable:!0,configurable:!0,writable:!0,value:!1}),this.baseWidth=e,this.baseHeight=t}setImmediate(e){this.target={...this.target,...e},this.current={...this.target},this.isInstantCut=!0}cutTo(e,t,n=1){this.setImmediate({centerX:e,centerY:t,zoom:n})}setTarget(e,t,n){typeof e=="number"?this.target={centerX:e,centerY:t??this.target.centerY,zoom:n??this.target.zoom}:this.target={...this.target,...e}}setWide(){this.setTarget(960,540,1)}shake(e=1){}triggerShake(e=1){}update(e,t=.28){if(this.isInstantCut){this.isInstantCut=!1;return}this.current.centerX+=(this.target.centerX-this.current.centerX)*t,this.current.centerY+=(this.target.centerY-this.current.centerY)*t,this.current.zoom+=(this.target.zoom-this.current.zoom)*t}getViewBox(e=0){const t=Math.max(.5,Math.min(3,this.current.zoom)),n=this.baseWidth/t,h=this.baseHeight/t,f=n/2,a=h/2,i=this.current.centerX,p=this.current.centerY,x=i-f,o=p-a;return`${x.toFixed(2)} ${o.toFixed(2)} ${n.toFixed(2)} ${h.toFixed(2)}`}}function pe(s,e){let{x:t=0,y:n=0,scale:h=1,rotation:f=0,expression:a,timeSec:i=0,isTalking:p=!0,spineLean:x=0,headTilt:o,pose:r,gazeX:l=.45,gazeY:g=-.2,pointTarget:d,leftHandTarget:k,isWalking:m=!1,bodyFacing:u="right",blink:y=!1,eyeStyle:c,eyebrowTilt:w=0,eyebrowHeight:S=0,eyebrowRaiseLeft:L,mouthShape:_,mouthOpen:D=0,leftArmAngle1:B=160,leftArmAngle2:v=-15,rightArmAngle1:P=20,rightArmAngle2:R=15,leftHandProp:W="none",rightHandProp:ne="none",leftLegAngle1:ce=118,leftLegAngle2:Fe=0,rightLegAngle1:fe=62,rightLegAngle2:Re=0,costume:yt="none",comicFx:T,alpha:xt=1}=e;if(i>0){const b=Math.sin(i*3)*3.2,$=Math.sin(i*1.6)*2;if(n+=b,x=(x??0)+$*.7,e.blink===void 0){const C=i%3.4;y=C>3.25&&C<3.39}if(l=(l??.45)+Math.sin(i*1.5)*.05,g=(g??-.2)+Math.cos(i*2)*.03,p&&D===0&&(!_||_==="smile_teeth"||_==="talking_open"||_==="talking_flap")){const C=Math.sin(i*14.5)*.5+Math.sin(i*22)*.3+.2;C>.1&&(_="talking_open",D=Math.min(1,Math.max(.12,C)))}}if(a&&(a.startsWith("disgust_")?(o??(o=10),c??(c="squint"),_??(_="cringe_wavy"),L??(L=!0),r??(r="shrug"),T??(T="sweat_drop")):a.startsWith("cringe_")?(o??(o=12),c??(c="squint"),_??(_="cringe_wavy"),r??(r="facepalm"),T??(T="sweat_drop")):a.startsWith("fear_")?(o??(o=0),c??(c="shock"),_??(_="open_o"),r??(r="facepalm"),T??(T="sweat_drop")):a.startsWith("frustration_")?(o??(o=12),c??(c="deadpan_dots"),_??(_="deadpan_line"),r??(r="facepalm"),T??(T="sweat_drop")):a.startsWith("rage_")?(o??(o=0),c??(c="laser"),_??(_="scream"),r??(r="mind_blown"),T??(T="shock_lightning")):a.startsWith("deadpan_")?(o??(o=0),c??(c="deadpan_dots"),_??(_="deadpan_line"),r??(r="default"),T??(T="none")):a.startsWith("smug_")?(o??(o=-8),c??(c="normal"),_??(_="smirk"),L??(L=!0),r??(r="hands_on_hips"),T??(T="none")):a.startsWith("skeptical_")||a.startsWith("confused_")?(o??(o=14),c??(c="squint"),_??(_="deadpan_line"),L??(L=!0),r??(r="crossed_arms"),T??(T="question_marks")):a.startsWith("shock_")?(o??(o=0),c??(c="eye_pop"),_??(_="jaw_drop"),r??(r="mind_blown"),T??(T="exclamation")):a.startsWith("mind_blown_")?(o??(o=0),c??(c="sparkle_star"),_??(_="jaw_drop"),r??(r="mind_blown"),T??(T="shock_lightning")):(a.startsWith("crying_")||a.startsWith("sad_")||a.startsWith("defeated_"))&&(o??(o=12),c??(c="tear_crying"),_??(_="jaw_drop"),r??(r="facepalm"),T??(T="sweat_drop"))),o=(o??-6)+Math.sin(i*2.4)*1.5+(p?Math.sin(i*6.5)*1.8:0),r??(r="default"),c??(c="normal"),L??(L=!1),_??(_="smile_teeth"),T??(T="none"),r==="shrug")B=(e.leftArmAngle1??205)+Math.sin(i*3.6)*4,v=(e.leftArmAngle2??-65)+Math.cos(i*3.2)*3,P=(e.rightArmAngle1??-25)-Math.sin(i*3.6)*4,R=(e.rightArmAngle2??65)-Math.cos(i*3.2)*3,o+=10,_==="smile_teeth"&&(_="smirk"),S===0&&(S=8);else if(r==="point_camera"){const b=p?Math.sin(i*5.5)*3.5:Math.sin(i*2.5)*1.5;P=(e.rightArmAngle1??0)+b,R=(e.rightArmAngle2??0)-b*.5,B=(e.leftArmAngle1??150)+Math.cos(i*2.8)*4,v=e.leftArmAngle2??-20,o+=2,l=0,g=0}else if(r==="facepalm"){const b=Math.sin(i*2)*2;P=(e.rightArmAngle1??-75)+b,R=(e.rightArmAngle2??135)-b,B=(e.leftArmAngle1??150)+Math.cos(i*2.5)*3,v=e.leftArmAngle2??-20,o+=-9+b,_==="smile_teeth"&&(_="deadpan_line")}else if(r==="hands_on_hips"){const b=Math.sin(i*2)*3;B=(e.leftArmAngle1??125)+b,v=e.leftArmAngle2??-95,P=(e.rightArmAngle1??55)-b,R=e.rightArmAngle2??95,o+=4}else if(r==="crossed_arms"){const b=Math.sin(i*3)*2.5;B=(e.leftArmAngle1??110)+b,v=e.leftArmAngle2??-115,P=(e.rightArmAngle1??70)-b,R=e.rightArmAngle2??115,o+=-4}else if(r==="mind_blown"){const b=Math.sin(i*18)*3.5;B=(e.leftArmAngle1??-115)+b,v=(e.leftArmAngle2??110)-b,P=(e.rightArmAngle1??-65)-b,R=(e.rightArmAngle2??-110)+b,o+=Math.sin(i*12)*2,c="shock",_="open_o"}else if(r==="waving"){const b=Math.sin(i*8)*26;P=(e.rightArmAngle1??-70)+b,R=(e.rightArmAngle2??45)+b*.4,B=(e.leftArmAngle1??160)+Math.sin(i*3)*3,v=e.leftArmAngle2??-15}else if(p){const b=Math.sin(i*4.2)*12+Math.sin(i*7.1)*6,$=Math.cos(i*4.8)*14-Math.sin(i*8.3)*5;B=(e.leftArmAngle1??160)+b,v=(e.leftArmAngle2??-15)+b*.6,P=(e.rightArmAngle1??20)+$,R=(e.rightArmAngle2??15)-$*.6}else{const b=Math.sin(i*2.2)*3;B=(e.leftArmAngle1??160)+b,v=e.leftArmAngle2??-15,P=(e.rightArmAngle1??20)-b,R=e.rightArmAngle2??15}const gt=0,ze=-120,K=-95,J=55;if(d){const b=(d.x-t)/(h??1.32),$=(d.y-n)/(h??1.32),C=b-10,z=$-K;P=Math.atan2(z,C)*180/Math.PI+Math.sin(i*6)*3,R=-8+Math.cos(i*5)*4}if(k){const b=(k.x-t)/(h??1.32),$=(k.y-n)/(h??1.32),C=b- -10,z=$-K;B=Math.atan2(z,C)*180/Math.PI+Math.sin(i*6)*3,v=8-Math.cos(i*5)*4}if(m){const b=i*9,$=Math.sin(b);ce=(ce??90)+$*32,fe=(fe??90)-$*32,Fe=$>0?$*35:0,Re=$<0?-$*35:0,d||(P=(P??90)+$*35),k||(B=(B??90)-$*35)}const de=78,he=78,He=B*Math.PI/180,be=-10+Math.cos(He)*de,_e=K+Math.sin(He)*de,Oe=(B+v)*Math.PI/180,ee=be+Math.cos(Oe)*he,te=_e+Math.sin(Oe)*he,Ye=P*Math.PI/180,Se=10+Math.cos(Ye)*de,$e=K+Math.sin(Ye)*de,De=(P+R)*Math.PI/180,ie=Se+Math.cos(De)*he,re=$e+Math.sin(De)*he,ye=85,xe=85,Ne=ce*Math.PI/180,Te=Math.cos(Ne)*ye,Me=J+Math.sin(Ne)*ye,Ge=(ce+Fe)*Math.PI/180,kt=Te+Math.cos(Ge)*xe,Le=Me+Math.sin(Ge)*xe,We=fe*Math.PI/180,Ce=Math.cos(We)*ye,Ae=J+Math.sin(We)*ye,Qe=(fe+Re)*Math.PI/180,pt=Ce+Math.cos(Qe)*xe,Ee=Ae+Math.sin(Qe)*xe,E=l*6,I=g*5;let Y="";if(y?Y=`
      <path d="M -44 -16 Q -24 -6 -4 -16" stroke="#111" stroke-width="7" stroke-linecap="round" fill="none"/>
      <path d="M 22 -14 Q 38 -4 54 -14" stroke="#111" stroke-width="7" stroke-linecap="round" fill="none"/>
    `:c==="deadpan_dots"?Y=`
      <line x1="-36" y1="-16" x2="-12" y2="-16" stroke="#111" stroke-width="7" stroke-linecap="round"/>
      <line x1="26" y1="-14" x2="50" y2="-14" stroke="#111" stroke-width="7" stroke-linecap="round"/>
    `:c==="side_eye"?Y=`
      <ellipse cx="-24" cy="-16" rx="21" ry="25" fill="#ffffff" stroke="#111111" stroke-width="6"/>
      <circle cx="-10" cy="-16" r="8" fill="#111111"/>
      <ellipse cx="38" cy="-14" rx="17" ry="26" fill="#ffffff" stroke="#111111" stroke-width="6"/>
      <circle cx="50" cy="-14" r="7" fill="#111111"/>
    `:c==="sparkle_star"?Y=`
      <ellipse cx="-24" cy="-16" rx="22" ry="26" fill="#fff" stroke="#111" stroke-width="6"/>
      <ellipse cx="38" cy="-14" rx="18" ry="26" fill="#fff" stroke="#111" stroke-width="6"/>
      <text x="-24" y="-8" font-size="24" fill="#eab308" text-anchor="middle" font-weight="bold">★</text>
      <text x="38" y="-6" font-size="20" fill="#eab308" text-anchor="middle" font-weight="bold">★</text>
    `:c==="tear_crying"?Y=`
      <ellipse cx="-24" cy="-16" rx="21" ry="25" fill="#ffffff" stroke="#111111" stroke-width="6"/>
      <circle cx="-20" cy="-14" r="6" fill="#111"/>
      <ellipse cx="38" cy="-14" rx="17" ry="26" fill="#ffffff" stroke="#111111" stroke-width="6"/>
      <circle cx="42" cy="-12" r="5" fill="#111"/>
      <!-- Flowing Tears -->
      <path d="M -24 -2 Q -35 25 -28 55" fill="none" stroke="#38bdf8" stroke-width="6" stroke-linecap="round" filter="url(#glow)"/>
      <path d="M 38 0 Q 48 25 42 55" fill="none" stroke="#38bdf8" stroke-width="6" stroke-linecap="round" filter="url(#glow)"/>
    `:c==="eye_pop"?Y=`
      <path d="M -24 -16 Q -50 -40 -70 -20" stroke="#111" stroke-width="5" fill="none"/>
      <ellipse cx="-75" cy="-20" rx="26" ry="32" fill="#fff" stroke="#111" stroke-width="6" filter="url(#cardShadow)"/>
      <circle cx="-75" cy="-20" r="10" fill="#ef4444"/>

      <path d="M 38 -14 Q 60 -40 85 -20" stroke="#111" stroke-width="5" fill="none"/>
      <ellipse cx="90" cy="-20" rx="24" ry="30" fill="#fff" stroke="#111" stroke-width="6" filter="url(#cardShadow)"/>
      <circle cx="90" cy="-20" r="9" fill="#ef4444"/>
    `:c==="tim_burton"?Y=`
      <ellipse cx="-24" cy="-12" rx="28" ry="24" fill="#352936" opacity="0.6"/>
      <ellipse cx="38" cy="-10" rx="24" ry="24" fill="#352936" opacity="0.6"/>
      <ellipse cx="-24" cy="-16" rx="20" ry="22" fill="#fdfaf0" stroke="#111" stroke-width="6"/>
      <ellipse cx="38" cy="-14" rx="18" ry="22" fill="#fdfaf0" stroke="#111" stroke-width="6"/>
      <circle cx="-24" cy="-16" r="5" fill="#111"/>
      <circle cx="38" cy="-14" r="5" fill="#111"/>
    `:c==="ps1"?Y=`
      <polygon points="-44,-16 -24,-34 -4,-16 -24,2" fill="#55ff55" stroke="#003300" stroke-width="4"/>
      <polygon points="20,-14 38,-32 56,-14 38,4" fill="#55ff55" stroke="#003300" stroke-width="4"/>
      <rect x="-29" y="-21" width="10" height="10" fill="#000"/>
      <rect x="33" y="-19" width="10" height="10" fill="#000"/>
    `:c==="shock"?Y=`
      <ellipse cx="-24" cy="-16" rx="25" ry="28" fill="#ffffff" stroke="#111111" stroke-width="7"/>
      <ellipse cx="38" cy="-14" rx="22" ry="28" fill="#ffffff" stroke="#111111" stroke-width="7"/>
      <circle cx="-24" cy="-16" r="4" fill="#111111"/>
      <circle cx="38" cy="-14" r="4" fill="#111111"/>
    `:c==="laser"?Y=`
      <ellipse cx="-24" cy="-16" rx="22" ry="26" fill="#fff" stroke="#111" stroke-width="6"/>
      <ellipse cx="38" cy="-14" rx="18" ry="26" fill="#fff" stroke="#111" stroke-width="6"/>
      <circle cx="-24" cy="-16" r="12" fill="#ff0033"/>
      <circle cx="38" cy="-14" r="12" fill="#ff0033"/>
    `:Y=`
      <path d="M -44 -34 Q -28 -44 -12 -36" fill="none" stroke="#111111" stroke-width="4" stroke-linecap="round"/>
      <ellipse cx="-24" cy="-16" rx="21" ry="25" fill="#ffffff" stroke="#111111" stroke-width="6"/>
      <path d="M ${-20+E} ${-36+I} C ${-8+E} ${-36+I} ${-2+E} ${-24+I} ${-8+E} ${-6+I} C ${-14+E} ${8+I} ${-26+E} ${6+I} ${-26+E} ${-8+I} C ${-26+E} ${-24+I} ${-26+E} ${-36+I} ${-20+E} ${-36+I} Z" fill="#111111"/>
      <ellipse cx="38" cy="-14" rx="17" ry="26" fill="#ffffff" stroke="#111111" stroke-width="6"/>
      <path d="M ${42+E} ${-34+I} C ${54+E} ${-34+I} ${58+E} ${-22+I} ${54+E} ${-4+I} C ${49+E} ${10+I} ${39+E} ${8+I} ${39+E} ${-6+I} C ${39+E} ${-22+I} ${38+E} ${-34+I} ${42+E} ${-34+I} Z" fill="#111111"/>
    `,e.gazeTarget){const b=e.gazeTarget.x-t,$=e.gazeTarget.y-(n-120),C=Math.hypot(b,$)||1;l=Math.max(-1,Math.min(1,b/Math.max(300,C*.7))),g=Math.max(-1,Math.min(1,$/Math.max(300,C*.7))),o??(o=Math.max(-14,Math.min(14,$/C*12)))}const mt=e.eyebrowLeftHeight??S,ut=e.eyebrowRightHeight??S;let ge=-48-mt,Ie=-44-ut;(L||e.eyebrowLeftHeight&&e.eyebrowLeftHeight>8)&&(ge-=14);const Xe=e.eyebrowLeftTilt!==void 0?e.eyebrowLeftTilt:w*8,Ze=e.eyebrowRightTilt!==void 0?e.eyebrowRightTilt:w*8,wt=`
    <path d="M -45 ${ge+Xe} Q -25 ${ge-14} -5 ${ge-Xe}" fill="none" stroke="#111111" stroke-width="6" stroke-linecap="round"/>
    <path d="M 22 ${Ie-Ze} Q 42 ${Ie-14} 62 ${Ie+Ze}" fill="none" stroke="#111111" stroke-width="6" stroke-linecap="round"/>
  `,Q=32,le=Math.max(16,26+D*18);let N="";if(e.mouthWobble&&e.mouthWobble>.15){const b=e.mouthWobble*10;N=`
      <g id="mouth" transform="translate(0, ${Q}) rotate(4)">
        <path d="M -26 0 Q -15 ${-b} -4 0 Q 8 ${b} 20 0" fill="none" stroke="#111111" stroke-width="6" stroke-linecap="round"/>
      </g>
    `}else _==="deadpan_line"||e.mouthSmile!==void 0&&Math.abs(e.mouthSmile)<.15?N=`
      <g id="mouth" transform="translate(0, ${Q}) rotate(4)">
        <line x1="-28" y1="0" x2="22" y2="0" stroke="#111111" stroke-width="7" stroke-linecap="round"/>
      </g>
    `:_==="cringe_wavy"?N=`
      <g id="mouth" transform="translate(0, ${Q}) rotate(4)">
        <path d="M -26 0 Q -15 -8 -4 0 Q 8 8 20 0" fill="none" stroke="#111111" stroke-width="6" stroke-linecap="round"/>
      </g>
    `:_==="jaw_drop"?N=`
      <g id="mouth" transform="translate(0, ${Q})">
        <path d="M -25 -10 L 25 -10 L 20 85 C 0 95 -10 95 -20 85 Z" fill="#2b0a0a" stroke="#111111" stroke-width="6"/>
        <rect x="-18" y="-8" width="36" height="12" rx="3" fill="#ffffff"/>
        <!-- Long floppy tongue -->
        <path d="M -12 40 Q 0 90 25 75 Q 10 50 12 40 Z" fill="#ef4444" stroke="#b91c1c" stroke-width="2"/>
      </g>
    `:_==="open_o"?N=`
      <g id="mouth" transform="translate(0, ${Q}) rotate(4)">
        <ellipse cx="-2" cy="0" rx="16" ry="20" fill="#221111" stroke="#111111" stroke-width="6"/>
        <ellipse cx="-2" cy="8" rx="10" ry="6" fill="#e11d48"/>
      </g>
    `:_==="smirk"?N=`
      <g id="mouth" transform="translate(0, ${Q}) rotate(4)">
        <path d="M -24 4 Q 0 8 26 -6" fill="none" stroke="#111111" stroke-width="7" stroke-linecap="round"/>
      </g>
    `:_==="wide_grin"?N=`
      <g id="mouth" transform="translate(0, ${Q}) rotate(4)">
        <path d="M -28 -6 Q 0 26 28 -6 Z" fill="#ffffff" stroke="#111111" stroke-width="6" stroke-linejoin="round"/>
        <line x1="-28" y1="-6" x2="28" y2="-6" stroke="#111111" stroke-width="4"/>
        <line x1="-10" y1="-6" x2="-10" y2="10" stroke="#111111" stroke-width="3"/>
        <line x1="8" y1="-6" x2="8" y2="10" stroke="#111111" stroke-width="3"/>
      </g>
    `:_==="scream"?N=`
      <g id="mouth" transform="translate(0, ${Q}) rotate(4)">
        <ellipse cx="-2" cy="10" rx="26" ry="34" fill="#1b0808" stroke="#111111" stroke-width="7"/>
        <rect x="-20" y="-5" width="40" height="10" rx="3" fill="#fff"/>
        <ellipse cx="-2" cy="28" rx="14" ry="8" fill="#e84a5f"/>
      </g>
    `:N=`
      <g id="mouth" transform="translate(0, ${Q}) rotate(4)">
        <path d="M -30 ${-le/2} L 24 ${-le/2+2} L 18 ${le/2} L -28 ${le/2-2} Z" fill="#ffffff" stroke="#111111" stroke-width="6" stroke-linejoin="round"/>
        ${le>28?'<line x1="-27" y1="0" x2="20" y2="0" stroke="#111111" stroke-width="3" opacity="0.3"/>':""}
      </g>
    `;let ae="";T==="sweat_drop"?ae=`
      <g transform="translate(75, -80)">
        <path d="M 0 -20 C 15 -10 15 15 0 20 C -15 15 -15 -10 0 -20 Z" fill="#38bdf8" stroke="#0284c7" stroke-width="3" filter="url(#glow)"/>
      </g>
    `:T==="question_marks"?ae=`
      <g transform="translate(85, -110)">
        <text x="0" y="0" font-family="'Impact', sans-serif" font-size="36" fill="#f43f5e" filter="url(#glow)">?</text>
        <text x="25" y="-20" font-family="'Impact', sans-serif" font-size="28" fill="#ec4899">?</text>
      </g>
    `:T==="exclamation"?ae=`
      <g transform="translate(0, -175)">
        <polygon points="0,0 -20,-30 0,-25 20,-30" fill="#eab308" stroke="#ca8a04" stroke-width="3" filter="url(#glow)"/>
        <text x="0" y="-35" font-family="'Impact', sans-serif" font-size="48" font-weight="bold" fill="#ef4444" text-anchor="middle" filter="url(#glow)">!</text>
      </g>
    `:T==="speed_lines"&&(ae=`
      <g stroke="#94a3b8" stroke-width="4" opacity="0.6">
        <line x1="-120" y1="-80" x2="-60" y2="-80"/>
        <line x1="-140" y1="-40" x2="-70" y2="-40"/>
        <line x1="-130" y1="0" x2="-65" y2="0"/>
      </g>
    `);function Ue(b,$,C,z){return b==="none"?"":b==="pointer"?`
        <g transform="translate(${$} ${C}) rotate(${z})">
          <line x1="0" y1="0" x2="110" y2="-70" stroke="#8b4513" stroke-width="6" stroke-linecap="round"/>
          <circle cx="110" cy="-70" r="6" fill="#e74c3c"/>
        </g>
      `:b==="phone"?`
        <g transform="translate(${$} ${C}) rotate(${z})">
          <rect x="-16" y="-36" width="32" height="52" rx="6" fill="#222" stroke="#111" stroke-width="4"/>
          <rect x="-13" y="-30" width="26" height="40" fill="#673ab7"/>
          <circle cx="0" cy="12" r="3" fill="#fff"/>
        </g>
      `:b==="caliper"?`
        <g transform="translate(${$} ${C}) rotate(${z})">
          <path d="M 0 0 L 120 -60" stroke="#475569" stroke-width="8" stroke-linecap="round"/>
          <path d="M 120 -60 L 120 -20 M 60 -30 L 60 -10" stroke="#0ea5e9" stroke-width="6" stroke-linecap="round"/>
          <rect x="50" y="-45" width="40" height="20" rx="3" fill="#0284c7" stroke="#0369a1" stroke-width="2"/>
          <text x="70" y="-31" font-family="'Courier New', monospace" font-size="11" font-weight="bold" fill="#fff" text-anchor="middle">0.02mm</text>
        </g>
      `:b==="stamp"?`
        <g transform="translate(${$} ${C}) rotate(${z})">
          <rect x="-18" y="-45" width="36" height="15" rx="4" fill="#b91c1c" stroke="#111" stroke-width="3"/>
          <rect x="-8" y="-30" width="16" height="30" fill="#78350f" stroke="#111" stroke-width="3"/>
          <circle cx="0" cy="5" r="14" fill="#92400e"/>
        </g>
      `:b==="diet_coke"?`
        <g transform="translate(${$} ${C}) rotate(${z})">
          <rect x="-14" y="-38" width="28" height="46" rx="4" fill="#c41230" stroke="#111" stroke-width="4"/>
          <rect x="-12" y="-36" width="24" height="8" fill="#e0e0e0"/>
          <text x="0" y="-12" font-family="'Impact', sans-serif" font-size="12" fill="#ffffff" text-anchor="middle" font-weight="bold">Diet</text>
          <text x="0" y="-1" font-family="'Impact', sans-serif" font-size="11" fill="#ffffff" text-anchor="middle">Coke</text>
        </g>
      `:b==="fidget_spinner"?`
        <g transform="translate(${$} ${C}) rotate(${z})">
          <circle cx="0" cy="0" r="12" fill="#111"/>
          <circle cx="0" cy="-24" r="10" fill="#06b6d4"/>
          <circle cx="21" cy="12" r="10" fill="#f59e0b"/>
          <circle cx="-21" cy="12" r="10" fill="#ec4899"/>
        </g>
      `:b==="coffee_cup"?`
        <g transform="translate(${$} ${C}) rotate(${z})">
          <rect x="-14" y="-30" width="28" height="38" rx="4" fill="#ffffff" stroke="#111" stroke-width="4"/>
          <path d="M 14 -20 Q 26 -15 14 -5" fill="none" stroke="#111" stroke-width="4"/>
          <rect x="-12" y="-18" width="24" height="14" fill="#854d0e"/>
        </g>
      `:b==="syringe"?`
        <g transform="translate(${$} ${C}) rotate(${z})">
          <rect x="-8" y="-35" width="16" height="42" rx="3" fill="#38bdf8" stroke="#111" stroke-width="3"/>
          <line x1="0" y1="7" x2="0" y2="24" stroke="#94a3b8" stroke-width="3" stroke-linecap="round"/>
          <rect x="-14" y="-42" width="28" height="8" rx="2" fill="#0284c7"/>
        </g>
      `:b==="money_bag"?`
        <g transform="translate(${$} ${C}) rotate(${z})">
          <circle cx="0" cy="0" r="22" fill="#eab308" stroke="#a16207" stroke-width="4"/>
          <text x="0" y="7" font-family="'Impact', sans-serif" font-size="20" fill="#713f12" text-anchor="middle">$</text>
        </g>
      `:b==="bread"?`
        <g transform="translate(${$} ${C}) rotate(${z})">
          <ellipse cx="0" cy="0" rx="28" ry="16" fill="#fde047" stroke="#ca8a04" stroke-width="4"/>
          <line x1="-12" y1="-8" x2="-6" y2="8" stroke="#a16207" stroke-width="3"/>
          <line x1="6" y1="-8" x2="12" y2="8" stroke="#a16207" stroke-width="3"/>
        </g>
      `:""}const H=e.gender??"male",V=e.hairStyle??(H==="female"?"female_long":H==="doctor"?"doctor_cap":H==="bodybuilder"?"bodybuilder_bald":H==="widow"?"widow_veil":"host_classic"),U=e.clothes??(H==="female"?"dress_pink":H==="doctor"?"doctor_scrubs":H==="bodybuilder"?"bodybuilder_tank":H==="widow"?"dress_black":"none"),bt=e.eyelashes??(H==="female"||H==="widow"),_t=e.blush??(H==="female"||H==="widow");let G="";U==="dress_pink"?G=`
      <path d="M -22 -75 C -30 -45 -14 -10 -26 55 L 26 55 C 14 -10 30 -45 22 -75 Z" fill="#f472b6" stroke="#db2777" stroke-width="5"/>
      <path d="M -26 55 Q 0 78 26 55" stroke="#db2777" stroke-width="4" fill="#f472b6"/>
      <!-- Sparkly necklace -->
      <path d="M -15 -75 Q 0 -60 15 -75" stroke="#fde047" stroke-width="3" fill="none"/>
      <circle cx="0" cy="-60" r="4" fill="#ec4899"/>
    `:U==="dress_black"?G=`
      <path d="M -24 -80 C -32 -50 -16 -10 -30 60 L 30 60 C 16 -10 32 -50 24 -80 Z" fill="#18181b" stroke="#09090b" stroke-width="5"/>
      <!-- Lace Collar -->
      <path d="M -24 -80 Q 0 -60 24 -80" stroke="#f4f4f5" stroke-width="4" fill="none"/>
    `:U==="crop_top_leggings"?G=`
      <path d="M -24 -85 C -30 -65 -18 -52 -18 -52 L 18 -52 C 18 -52 30 -65 24 -85 Z" fill="#06b6d4" stroke="#0891b2" stroke-width="4"/>
      <!-- Exposed Midriff -->
      <rect x="-16" y="-50" width="32" height="22" fill="#fed89b"/>
      <!-- High-Waisted Leggings -->
      <polygon points="-22,-28 22,-28 26,55 -26,55" fill="#18181b" stroke="#0f172a" stroke-width="4"/>
      <line x1="-20" y1="-28" x2="-24" y2="55" stroke="#06b6d4" stroke-width="2"/>
      <line x1="20" y1="-28" x2="24" y2="55" stroke="#06b6d4" stroke-width="2"/>
    `:U==="doctor_scrubs"?G=`
      <polygon points="-30,-90 30,-90 34,50 -34,50" fill="#0d9488" stroke="#115e59" stroke-width="5"/>
      <polygon points="-12,-90 0,-65 12,-90" fill="#fed89b"/>
      <!-- Stethoscope -->
      <path d="M -20,-90 Q 0,-25 20,-90" stroke="#475569" stroke-width="5" fill="none"/>
      <circle cx="0" cy="-30" r="8" fill="#94a3b8" stroke="#334155" stroke-width="2"/>
    `:U==="bodybuilder_tank"?G=`
      <!-- Massive Bulging Traps, Deltoids, Pecs, and Tapered Waist -->
      <path d="M -65 -85 C -88 -75 -85 -35 -55 -30 L -32 50 L 32 50 L 55 -30 C 85 -35 88 -75 65 -85 Z" fill="#eab308" stroke="#ca8a04" stroke-width="5"/>
      <!-- Pec Cleavage Separation -->
      <path d="M 0 -80 L 0 -15 M -40 -35 Q 0 -15 40 -35" stroke="#ca8a04" stroke-width="4" fill="none"/>
      <!-- 8-Pack Abs Lines -->
      <line x1="0" y1="-15" x2="0" y2="45" stroke="#a16207" stroke-width="4"/>
      <line x1="-16" y1="-2" x2="16" y2="-2" stroke="#a16207" stroke-width="3"/>
      <line x1="-16" y1="14" x2="16" y2="14" stroke="#a16207" stroke-width="3"/>
      <line x1="-16" y1="30" x2="16" y2="30" stroke="#a16207" stroke-width="3"/>
    `:U==="patient_gown"?G=`
      <polygon points="-28,-85 28,-85 36,55 -36,55" fill="#e0f2fe" stroke="#38bdf8" stroke-width="5"/>
      <circle cx="-10" cy="-40" r="3" fill="#0284c7"/>
      <circle cx="10" cy="-20" r="3" fill="#0284c7"/>
    `:U==="suit"?G=`
      <polygon points="-28,-90 28,-90 32,55 -32,55" fill="#1e293b" stroke="#0f172a" stroke-width="5"/>
      <polygon points="-10,-90 0,-40 10,-90" fill="#ffffff"/>
      <polygon points="-4,-90 0,-30 4,-90 0,0" fill="#ef4444"/> <!-- Red Tie -->
    `:U==="hoodie"?G=`
      <polygon points="-28,-90 28,-90 32,55 -32,55" fill="#64748b" stroke="#334155" stroke-width="5"/>
      <rect x="-18" y="10" width="36" height="25" rx="4" fill="#475569"/> <!-- Pocket -->
    `:yt==="tech_bro"&&(G=`
      <path d="M -35 -90 L 35 -90 L 40 10 L -40 10 Z" fill="#1a365d" stroke="#0f172a" stroke-width="5"/>
      <path d="M 0 -90 L 0 10" stroke="#cbd5e1" stroke-width="4"/>
      <rect x="12" y="-70" width="18" height="8" rx="2" fill="#e2e8f0"/>
    `);let X="";V==="female_long"?X=`
      <!-- Flowing Long Brunette/Black Hair Framing Face -->
      <path d="
        M -85 140
        C -125 50 -130 -60 -75 -125
        C -20 -170 70 -170 115 -115
        C 155 -55 150 50 120 140
        C 95 100 80 35 70 -5
        L -65 -5
        C -75 35 -90 100 -85 140 Z"
        fill="#291811" stroke="#160d09" stroke-width="6" stroke-linejoin="round"/>
    `:V==="female_ponytail"?X=`
      <!-- High Ponytail Hair with Bangs -->
      <path d="M -80 -10 C -110 -80 -40 -155 20 -155 C 90 -155 130 -80 100 -10 Z" fill="#1c1917" stroke="#111" stroke-width="6"/>
      <!-- Swinging Ponytail Tail -->
      <path d="M 80 -110 C 150 -140 185 -70 155 30 C 130 60 110 0 90 -80 Z" fill="#1c1917" stroke="#111" stroke-width="5"/>
      <ellipse cx="85" cy="-95" rx="12" ry="8" fill="#f43f5e"/> <!-- Cute Scrunchie -->
    `:V==="female_blonde"?X=`
      <!-- Voluminous Glam Blonde Curls -->
      <path d="
        M -90 125
        C -140 40 -130 -80 -70 -135
        C -15 -175 75 -175 125 -115
        C 165 -50 155 40 120 125
        C 95 70 80 20 70 -5
        L -65 -5
        C -75 20 -90 70 -90 125 Z"
        fill="#fde047" stroke="#ca8a04" stroke-width="6" stroke-linejoin="round"/>
    `:V==="doctor_cap"?X=`
      <!-- Surgical Cap & Headlamp -->
      <path d="M -80 0 C -90 -85 -50 -140 0 -140 C 60 -140 95 -85 85 0 Z" fill="#0d9488" stroke="#115e59" stroke-width="6"/>
      <rect x="-75" y="-15" width="155" height="18" rx="4" fill="#14b8a6"/>
      <!-- Forehead Surgical Lamp -->
      <circle cx="0" cy="-60" r="20" fill="#e2e8f0" stroke="#475569" stroke-width="4"/>
      <circle cx="0" cy="-60" r="12" fill="#38bdf8" filter="url(#glow)"/>
    `:V==="bodybuilder_bald"?X=`
      <!-- Bald Head with Red Sweatband -->
      <rect x="-70" y="-30" width="140" height="20" rx="4" fill="#dc2626" stroke="#991b1b" stroke-width="3"/>
    `:V==="widow_veil"?X=`
      <!-- Black Victorian Lace Mourning Veil -->
      <path d="
        M -95 160
        C -130 60 -120 -80 -60 -135
        C 0 -170 70 -170 120 -115
        C 160 -50 160 60 125 160 Z"
        fill="#09090b" opacity="0.9" stroke="#18181b" stroke-width="6"/>
      <circle cx="-35" cy="-120" r="14" fill="#450a0a" stroke="#18181b" stroke-width="3"/>
    `:V==="none"?X="":X=`
      <path id="hair-back" d="
        M -75 25
        C -115 15 -125 -45 -85 -70
        C -115 -115 -60 -160 -15 -152
        C 15 -185 85 -175 105 -130
        C 145 -110 160 -45 130 -5
        C 160 45 135 110 90 95
        C 80 55 75 25 65 -5
        L -65 0 Z"
        fill="#0d0d0d" stroke="#0d0d0d" stroke-width="6" stroke-linejoin="round"/>
    `;let Pe="";return bt&&(Pe+=`
      <path d="M -44 -28 L -52 -36 M -36 -34 L -40 -44 M -20 -36 L -20 -46" stroke="#111" stroke-width="4" stroke-linecap="round"/>
      <path d="M 44 -26 L 52 -34 M 36 -32 L 40 -42 M 20 -34 L 20 -44" stroke="#111" stroke-width="4" stroke-linecap="round"/>
    `),_t&&(Pe+=`
      <ellipse cx="-48" cy="18" rx="14" ry="8" fill="#fb7185" opacity="0.6"/>
      <ellipse cx="48" cy="18" rx="14" ry="8" fill="#fb7185" opacity="0.6"/>
    `),`
    <g id="${s}" class="stick-figure" data-gender="${H}" data-expression="${a??"default"}" data-pose="${r??"default"}" transform="translate(${t}, ${n}) rotate(${f}) scale(${h})" opacity="${xt}">
      <!-- Floor Drop Shadow -->
      <ellipse cx="0" cy="${Le>Ee?Le+10:Ee+10}" rx="65" ry="14" fill="#111111" opacity="0.16"/>

      <!-- Legs (Back to Front) -->
      <g id="legs" stroke="#111111" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" fill="none">
        <line x1="0" y1="${J}" x2="${Te}" y2="${Me}"/>
        <line x1="${Te}" y1="${Me}" x2="${kt}" y2="${Le}"/>

        <line x1="0" y1="${J}" x2="${Ce}" y2="${Ae}"/>
        <line x1="${Ce}" y1="${Ae}" x2="${pt}" y2="${Ee}"/>
      </g>

      <!-- Spine & Torso with arms -->
      <g id="torso" transform="rotate(${x} 0 ${J})">
        <line x1="0" y1="${ze}" x2="0" y2="${J}" stroke="#111111" stroke-width="8" stroke-linecap="round"/>

        ${G}

        <!-- Left Arm with 2-finger V hand -->
        <g id="left-arm" class="arms" stroke="#111111" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" fill="none">
          <line x1="0" y1="${K}" x2="${be}" y2="${_e}"/>
          <line x1="${be}" y1="${_e}" x2="${ee}" y2="${te}"/>
          <!-- 2-finger open V hand -->
          <line x1="${ee}" y1="${te}" x2="${ee-22}" y2="${te-12}"/>
          <line x1="${ee}" y1="${te}" x2="${ee-18}" y2="${te+20}"/>
          ${Ue(W,ee,te,B+v)}
        </g>

        <!-- Right Arm with 2-finger V hand -->
        <g id="right-arm" class="arms" stroke="#111111" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" fill="none">
          <line x1="0" y1="${K}" x2="${Se}" y2="${$e}"/>
          <line x1="${Se}" y1="${$e}" x2="${ie}" y2="${re}"/>
          <!-- 2-finger open V hand -->
          <line x1="${ie}" y1="${re}" x2="${ie+22}" y2="${re-14}"/>
          <line x1="${ie}" y1="${re}" x2="${ie+20}" y2="${re+18}"/>
          ${Ue(ne,ie,re,P+R)}
        </g>

        <!-- HEAD GROUP (Crisp Casually Explained / Alex Meyers proportions) -->
        <g id="head" transform="translate(${gt}, ${ze}) rotate(${o}) scale(0.72)">
          ${ae}
          ${X}

          <!-- Warm Creamy Peach Head Skin (tilted egg/oval shape) -->
          <path id="head-skin" d="
            M -68 15
            C -82 -40 -68 -80 -18 -85
            C 38 -87 76 -50 78 15
            C 78 68 48 88 5 88
            C -40 88 -68 70 -68 15 Z"
            fill="#fed89b" stroke="#111111" stroke-width="8" stroke-linejoin="round"/>

          <!-- Nose/Cheek Tick Mark (from reference image) -->
          <path d="M -12 8 L -10 20" fill="none" stroke="#111111" stroke-width="5" stroke-linecap="round"/>

          <!-- Facial Features -->
          <g id="face">
            ${wt}
            ${Y}
            ${Pe}
            ${N}
          </g>
        </g>
      </g>
    </g>
  `}function Ve(s,e,t=!1){return`
    <g class="cast-paparazzi" transform="translate(${s}, ${e})">
      <line x1="0" y1="0" x2="0" y2="70" stroke="#111" stroke-width="6" stroke-linecap="round"/>
      <line x1="0" y1="70" x2="-20" y2="120" stroke="#111" stroke-width="6" stroke-linecap="round"/>
      <line x1="0" y1="70" x2="20" y2="120" stroke="#111" stroke-width="6" stroke-linecap="round"/>

      <line x1="0" y1="20" x2="25" y2="0" stroke="#111" stroke-width="6" stroke-linecap="round"/>
      <line x1="0" y1="20" x2="15" y2="-10" stroke="#111" stroke-width="6" stroke-linecap="round"/>

      <g transform="translate(20, -10)">
        <rect x="0" y="-15" width="40" height="30" rx="4" fill="#334155" stroke="#111" stroke-width="3"/>
        <rect x="35" y="-10" width="30" height="20" rx="3" fill="#1e293b" stroke="#111" stroke-width="2"/>
        <circle cx="20" cy="0" r="8" fill="#0284c7"/>

        ${t?`
          <g transform="translate(15, -25)">
            <polygon points="0,0 -40,-40 -15,-60 10,-70 35,-50 20,-20" fill="#fde047" opacity="0.9" filter="url(#glow)"/>
            <circle cx="0" cy="-20" r="35" fill="#ffffff" opacity="0.8"/>
            <text x="35" y="-35" font-family="'Impact', sans-serif" font-size="20" fill="#ef4444">*FLASH!*</text>
          </g>
        `:""}
      </g>

      <g transform="translate(0, -30)">
        <circle cx="0" cy="0" r="22" fill="#fddfb0" stroke="#111" stroke-width="4"/>
        <ellipse cx="6" cy="-2" rx="4" ry="5" fill="#111"/>
        <ellipse cx="0" cy="-14" rx="28" ry="8" fill="#475569"/>
        <rect x="-18" y="-28" width="36" height="16" rx="4" fill="#475569"/>
        <rect x="10" y="-32" width="14" height="10" fill="#ffffff"/>
        <text x="17" y="-24" font-size="7" font-weight="bold" fill="#dc2626" text-anchor="middle">PRESS</text>
      </g>
    </g>
  `}function Lt(s){const{x:e,y:t,scale:n=1.35,isDucking:h=!1,timeSec:f=0}=s,a=h?Math.sin(f*30)*4:0;return`
    <g id="cast-couch-guy" transform="translate(${e+a}, ${t}) scale(${n})">
      <!-- Armchair Shadow -->
      <ellipse cx="0" cy="110" rx="110" ry="16" fill="#000000" opacity="0.18"/>

      <!-- Leather Armchair Body -->
      <rect x="-95" y="10" width="190" height="100" rx="16" fill="#78350f" stroke="#451a03" stroke-width="6" filter="url(#cardShadow)"/>
      <rect x="-115" y="0" width="35" height="110" rx="12" fill="#92400e" stroke="#451a03" stroke-width="5"/>
      <rect x="80" y="0" width="35" height="110" rx="12" fill="#92400e" stroke="#451a03" stroke-width="5"/>
      <rect x="-85" y="-55" width="170" height="75" rx="14" fill="#92400e" stroke="#451a03" stroke-width="5"/>

      <!-- Bag of Chips -->
      <g transform="translate(50, 15)">
        <polygon points="-16,0 16,0 22,45 -22,45" fill="#eab308" stroke="#ca8a04" stroke-width="3"/>
        <text x="0" y="28" font-family="'Impact', sans-serif" font-size="12" fill="#dc2626" text-anchor="middle">CHIPS</text>
      </g>

      ${h?`
        <g transform="translate(0, 25)">
          <ellipse cx="0" cy="0" rx="32" ry="26" fill="#38bdf8" stroke="#0284c7" stroke-width="4"/>
          <line x1="-15" y1="20" x2="-35" y2="45" stroke="#64748b" stroke-width="8" stroke-linecap="round"/>
          <line x1="15" y1="20" x2="35" y2="45" stroke="#64748b" stroke-width="8" stroke-linecap="round"/>
          <path d="M -30 0 Q -25 -35 0 -25 Q 25 -35 30 0" fill="none" stroke="#fddfb0" stroke-width="8" stroke-linecap="round"/>

          <circle cx="0" cy="-10" r="28" fill="#fddfb0" stroke="#111" stroke-width="4"/>
          <ellipse cx="-9" cy="-12" rx="5" ry="7" fill="#111"/>
          <ellipse cx="9" cy="-12" rx="5" ry="7" fill="#111"/>
          <path d="M -10 4 Q -5 0 0 4 Q 5 8 10 4" fill="none" stroke="#111" stroke-width="3"/>
          <path d="M -9 -6 Q -16 15 -13 32" fill="none" stroke="#38bdf8" stroke-width="5" stroke-linecap="round"/>
          <path d="M 9 -6 Q 16 15 13 32" fill="none" stroke="#38bdf8" stroke-width="5" stroke-linecap="round"/>
        </g>
      `:`
        <g transform="translate(0, 0)">
          <path d="M -24 10 L 24 10 L 28 70 L -28 70 Z" fill="#38bdf8" stroke="#0284c7" stroke-width="5"/>
          <line x1="-14" y1="70" x2="-22" y2="92" stroke="#64748b" stroke-width="8" stroke-linecap="round"/>
          <line x1="14" y1="70" x2="22" y2="92" stroke="#64748b" stroke-width="8" stroke-linecap="round"/>
          <path d="M 24 20 Q 40 30 50 25" fill="none" stroke="#fddfb0" stroke-width="7" stroke-linecap="round"/>

          <g transform="translate(0, -28)">
            <circle cx="0" cy="0" r="30" fill="#fddfb0" stroke="#111" stroke-width="4"/>
            <path d="M -30 -8 C -38 -38 28 -42 30 -8 C 16 -22 -16 -22 -30 -8 Z" fill="#713f12"/>
            <ellipse cx="-10" cy="-2" rx="7" ry="7" fill="#ffffff" stroke="#111" stroke-width="2"/>
            <ellipse cx="10" cy="-2" rx="7" ry="7" fill="#ffffff" stroke="#111" stroke-width="2"/>
            <circle cx="-9" cy="-2" r="3.5" fill="#111"/>
            <circle cx="11" cy="-2" r="3.5" fill="#111"/>
            <path d="M -8 14 Q 0 18 8 14" fill="none" stroke="#111" stroke-width="3" stroke-linecap="round"/>
          </g>
        </g>
      `}
    </g>
  `}function Ct(s,e,t=0){const n=Math.sin(t*8)*12,h=Math.sin(t*8)*35,f=-h,a=t*30%40;return`
    <g id="cast-evicted-organs" transform="translate(${s}, ${e})">
      <!-- 1. Cute Cartoon Liver with Bowler Hat & Suitcase -->
      <g transform="translate(-160, ${n})">
        <!-- Shadow -->
        <ellipse cx="0" cy="140" rx="70" ry="16" fill="#000" opacity="0.18"/>
        <!-- Stick Legs Walking -->
        <line x1="-25" y1="80" x2="${-35+h}" y2="135" stroke="#111" stroke-width="8" stroke-linecap="round"/>
        <line x1="25" y1="80" x2="${35+f}" y2="135" stroke="#111" stroke-width="8" stroke-linecap="round"/>

        <!-- Liver Body (Big Deep Red Blob) -->
        <path d="M -80 20 C -90 -60 70 -70 90 20 C 90 80 -40 90 -80 20 Z" fill="#991b1b" stroke="#7f1d1d" stroke-width="8" filter="url(#cardShadow)"/>
        <!-- Cute Eyes -->
        <circle cx="-24" cy="-10" r="12" fill="#fff"/>
        <circle cx="24" cy="-10" r="12" fill="#fff"/>
        <circle cx="-20" cy="-10" r="6" fill="#111"/>
        <circle cx="28" cy="-10" r="6" fill="#111"/>
        <!-- Sad Wavy Mouth -->
        <path d="M -16 30 Q 0 20 16 30" fill="none" stroke="#fff" stroke-width="6" stroke-linecap="round"/>

        <!-- Bowler Hat -->
        <ellipse cx="0" cy="-56" rx="40" ry="12" fill="#1e293b"/>
        <rect x="-24" y="-80" width="48" height="30" rx="8" fill="#1e293b"/>

        <!-- Brown Leather Suitcase -->
        <g transform="translate(70, 40)">
          <rect x="0" y="0" width="56" height="44" rx="6" fill="#78350f" stroke="#451a03" stroke-width="4"/>
          <path d="M 16 0 Q 28 -16 40 0" fill="none" stroke="#111" stroke-width="4"/>
        </g>
      </g>

      <!-- 2. Cute Cartoon Stomach Crying with Handkerchief -->
      <g transform="translate(120, ${-n})">
        <!-- Shadow -->
        <ellipse cx="0" cy="140" rx="70" ry="16" fill="#000" opacity="0.18"/>
        <!-- Stick Legs Walking -->
        <line x1="-25" y1="80" x2="${-35+f}" y2="135" stroke="#111" stroke-width="8" stroke-linecap="round"/>
        <line x1="25" y1="80" x2="${35+h}" y2="135" stroke="#111" stroke-width="8" stroke-linecap="round"/>

        <!-- Pink J-Shape Stomach -->
        <path d="M -60 -50 C 0 -70 70 -30 70 30 C 70 90 -50 90 -70 30 C -80 -10 -70 -40 -60 -50 Z" fill="#f472b6" stroke="#db2777" stroke-width="8" filter="url(#cardShadow)"/>
        <!-- Big Sad Eyes with Moving Tears -->
        <circle cx="-20" cy="-4" r="14" fill="#fff"/>
        <circle cx="24" cy="-4" r="14" fill="#fff"/>
        <circle cx="-16" cy="-4" r="7" fill="#111"/>
        <circle cx="28" cy="-4" r="7" fill="#111"/>
        <!-- Animated Crying Tear Stream -->
        <path d="M -28 15 Q -40 40 -35 ${60+a}" fill="none" stroke="#38bdf8" stroke-width="8" stroke-linecap="round" filter="url(#glow)"/>
        <path d="M 16 15 Q 8 40 12 ${60+a}" fill="none" stroke="#38bdf8" stroke-width="8" stroke-linecap="round" filter="url(#glow)"/>
        <!-- Sad Quivering Mouth -->
        <path d="M -12 36 Q 4 24 20 36" fill="none" stroke="#831843" stroke-width="6" stroke-linecap="round"/>

        <!-- White Handkerchief -->
        <polygon points="50,20 80,50 60,70" fill="#ffffff" stroke="#cbd5e1" stroke-width="4"/>
      </g>
    </g>
  `}function At(s,e,t=0){const n=Math.sin(t*10)*25,h=Math.sin(t*4)*15;return`
    <g id="cast-flying-carbs" transform="translate(${s}, ${e+h})">
      <!-- 1. Pizza Slice with Halo & Angel Wings -->
      <g transform="translate(-120, 0)">
        <!-- Glowing Yellow Halo -->
        <ellipse cx="0" cy="-70" rx="35" ry="10" fill="none" stroke="#eab308" stroke-width="5" filter="url(#glow)"/>

        <!-- Flapping Angel Wings -->
        <g id="wings" fill="#ffffff" stroke="#cbd5e1" stroke-width="3">
          <!-- Left Wing -->
          <path d="M -30 -10 C -70 ${-40+n} -80 ${20+n} -30 10 Z"/>
          <!-- Right Wing -->
          <path d="M 30 -10 C 70 ${-40+n} 80 ${20+n} 30 10 Z"/>
        </g>

        <!-- Pizza Slice -->
        <polygon points="0,55 -45,-45 45,-45" fill="#facc15" stroke="#ca8a04" stroke-width="4"/>
        <path d="M -45 -45 Q 0 -58 45 -45" stroke="#b45309" stroke-width="12" stroke-linecap="round"/>
        <!-- Pepperonis -->
        <circle cx="-10" cy="-20" r="10" fill="#dc2626"/>
        <circle cx="15" cy="-10" r="9" fill="#dc2626"/>
        <circle cx="0" cy="15" r="8" fill="#dc2626"/>

        <text x="0" y="85" font-family="'Impact', sans-serif" font-size="18" fill="#ca8a04" text-anchor="middle">R.I.P. PIZZA</text>
      </g>

      <!-- 2. Holy Bread Loaf Ascending with Sparkles -->
      <g transform="translate(120, -30)">
        <ellipse cx="0" cy="-55" rx="30" ry="8" fill="none" stroke="#eab308" stroke-width="4" filter="url(#glow)"/>
        <!-- Wings -->
        <g fill="#ffffff" stroke="#cbd5e1" stroke-width="3">
          <path d="M -30 0 C -65 ${-30+n} -75 ${25+n} -25 15 Z"/>
          <path d="M 30 0 C 65 ${-30+n} 75 ${25+n} 25 15 Z"/>
        </g>
        <!-- Loaf -->
        <ellipse cx="0" cy="0" rx="45" ry="25" fill="#d97706" stroke="#92400e" stroke-width="4"/>
        <path d="M -20 -15 Q -10 -5 -5 -15 M 5 -15 Q 15 -5 20 -15" stroke="#78350f" stroke-width="3" stroke-linecap="round"/>
        <text x="0" y="50" font-family="'Impact', sans-serif" font-size="16" fill="#d97706" text-anchor="middle">BREAD (EVICTED)</text>
      </g>
    </g>
  `}function qe(s,e,t=0){const n=t*40%60;return`
    <g id="cast-boss-shadow" transform="translate(${s}, ${e})">
      <!-- Dark Looming Ominous Silhouette -->
      <path d="M -180 300 C -180 80 -120 0 0 0 C 120 0 180 80 180 300 Z" fill="#09090b" opacity="0.85"/>
      <!-- Glowing Menacing Yellow Eyes -->
      <ellipse cx="-45" cy="90" rx="22" ry="14" fill="#eab308" filter="url(#glow)"/>
      <ellipse cx="45" cy="90" rx="22" ry="14" fill="#eab308" filter="url(#glow)"/>
      <circle cx="-42" cy="90" r="6" fill="#09090b"/>
      <circle cx="48" cy="90" r="6" fill="#09090b"/>

      <!-- Coffee Mug in Giant Shadow Hand -->
      <g transform="translate(110, 160)">
        <rect x="0" y="0" width="55" height="65" rx="6" fill="#ffffff" stroke="#09090b" stroke-width="4"/>
        <path d="M 55 15 Q 75 32 55 50" fill="none" stroke="#ffffff" stroke-width="6"/>
        <text x="27" y="42" font-family="'Impact', sans-serif" font-size="14" fill="#09090b" text-anchor="middle">#1 BOSS</text>
        <!-- Steam curls -->
        <path d="M 20 -5 Q 10 ${-20-n} 25 ${-40-n}" fill="none" stroke="#cbd5e1" stroke-width="3" opacity="0.7"/>
        <path d="M 35 -5 Q 45 ${-20-n} 30 ${-40-n}" fill="none" stroke="#cbd5e1" stroke-width="3" opacity="0.7"/>
      </g>
    </g>
  `}const st=s=>s<0?0:s>1?1:s,Et=s=>{const e=st(s);return e<.5?4*e*e*e:1-Math.pow(-2*e+2,3)/2},ot=1.70158,It=ot+1,Pt=s=>{const e=st(s)-1;return 1+It*e*e*e+ot*e*e};function oe(s,e=.25,t={x:0,y:0}){if(s<=0)return{x:t.x,y:t.y,scaleX:0,scaleY:0,rotation:0,opacity:0};if(s>=e)return{x:t.x,y:t.y,scaleX:1,scaleY:1,rotation:0,opacity:1};const n=s/e,h=Pt(n),f=Math.max(0,h),a=1+(f-1)*.5,i=1/Math.max(.01,a);return{x:t.x,y:t.y,scaleX:f*a,scaleY:f*i,rotation:(1-n)*-8,opacity:Math.min(1,n*3)}}function Z(s,e=.16,t={x:0,y:0},n=400){if(s<=0)return{x:t.x,y:t.y-n,scaleX:.9,scaleY:1.2,rotation:0,opacity:0,impactOccurred:!1,screenShake:0};if(s<e){const o=Math.pow(s/e,2);return{x:t.x,y:t.y-n*(1-o),scaleX:.95,scaleY:1.15,rotation:0,opacity:1,impactOccurred:!1,screenShake:0}}const h=s-e,a=Math.min(1,h/.22),i=Math.sin(a*Math.PI)*Math.max(0,1-a),p=1+i*.35,x=1-i*.25;return{x:t.x,y:t.y,scaleX:p,scaleY:x,rotation:0,opacity:1,impactOccurred:!0,screenShake:0,shakeOffset:{x:0,y:0}}}function lt(s,e=2,t=6){const n=Math.sin(s*e)*t,h=Math.cos(s*e*.7)*1.5;return{dy:n,drot:h}}function Bt(s,e=8,t=.5,n=160){if(s<=0||s>=t)return[];const h=s/t,f=[];for(let a=0;a<e;a++){const i=a/e*2*Math.PI+a*.5,p=.7+a%3*.2,x=h*n*p;f.push({x:Math.cos(i)*x,y:Math.sin(i)*x,radius:Math.max(1,(1-h)*(10+a%4*4)),opacity:1-h})}return f}function F(s,e,t,n){const h=e.x-s.x,f=e.y-s.y,a=Math.atan2(f,h),i=Math.sin(t*16)*3,p=Math.cos(t*14)*3,x=s.x+h*.5+Math.sin(a+Math.PI/2)*(15+i),o=s.y+f*.5+Math.cos(a+Math.PI/2)*(15+p),r=28,l=.45,g=e.x-Math.cos(a-l)*r,d=e.y-Math.sin(a-l)*r,k=e.x-Math.cos(a+l)*r,m=e.y-Math.sin(a+l)*r;return`
    <g class="comic-arrow" stroke="#ef4444" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" fill="none" opacity="0.95">
      <!-- Curved sketchy arrow shaft -->
      <path d="M ${s.x} ${s.y} Q ${x} ${o} ${e.x} ${e.y}" />
      <!-- Sketchy arrowhead -->
      <path d="M ${g} ${d} L ${e.x} ${e.y} L ${k} ${m}" />
      ${n?`
        <text x="${x}" y="${o-18}" font-family="'Patrick Hand', 'Comic Sans MS', cursive, sans-serif" font-size="24" font-weight="bold" fill="#dc2626" stroke="none" text-anchor="middle">
          ${n}
        </text>
      `:""}
    </g>
  `}function A(s,e,t,n,h){const f=Math.sin(n*18)*2.5,a=e+f,i=t-f,p=`M ${s.x-a} ${s.y} C ${s.x-a} ${s.y-i*1.1}, ${s.x+a*1.05} ${s.y-i*.95}, ${s.x+a} ${s.y}`,x=`C ${s.x+a*.95} ${s.y+i*1.05}, ${s.x-a*1.1} ${s.y+i*.95}, ${s.x-a+6} ${s.y-8}`;return`
    <g class="comic-circle" opacity="0.95">
      <path d="${p} ${x}" fill="none" stroke="#ef4444" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round" />
      ${h?`
        <text x="${s.x}" y="${s.y-t-14}" font-family="'Patrick Hand', 'Comic Sans MS', cursive, sans-serif" font-size="22" font-weight="bold" fill="#dc2626" text-anchor="middle">
          ${h}
        </text>
      `:""}
    </g>
  `}function M(s,e,t){const n=[],f=Math.sin(t*22)*15;for(let a=0;a<14;a++){const i=a/14*Math.PI*2,p=e+30+(a%2===0?20:0)+f,x=p+60+(a%3===0?30:0),o=s.x+Math.cos(i)*p,r=s.y+Math.sin(i)*p,l=s.x+Math.cos(i)*x,g=s.y+Math.sin(i)*x;n.push(`<line x1="${o.toFixed(1)}" y1="${r.toFixed(1)}" x2="${l.toFixed(1)}" y2="${g.toFixed(1)}" stroke="#0f172a" stroke-width="${3+a%3}" stroke-linecap="round" opacity="0.65"/>`)}return`<g class="action-lines">${n.join(`
`)}</g>`}const vt={id:"scene_01_ecosystem",name:"Hollywood Red Carpet & Instagram Ecosystem",startTime:0,endTime:8.62,render(s){const{sceneTime:e,camera:t}=s,n=e>=1,h=e>=2,f=e>=4.8,a=e>=7.5;let i=360,p=650,x=0,o="deadpan_classic",r=!1,l,g="";const d=Math.sin(e*18)>.3,k=Math.cos(e*22)>.3;let m=`
      <!-- Infinite full-bleed backdrop -->
      <rect x="-4000" y="-4000" width="10000" height="10000" fill="#f8fafc"/>
      <line x1="-4000" y1="840" x2="6000" y2="840" stroke="#e2e8f0" stroke-width="4"/>

      <!-- Hollywood Hills Backdrop -->
      <path d="M -1000 540 Q 400 360 1000 500 T 2600 400 L 2600 840 L -1000 840 Z" fill="#e2e8f0"/>

      <!-- Red Carpet Runway & Gold Stanchions -->
      <polygon points="300,840 960,520 1620,840" fill="#dc2626"/>
      <line x1="300" y1="840" x2="960" y2="520" stroke="#b91c1c" stroke-width="6"/>
      <line x1="1620" y1="840" x2="960" y2="520" stroke="#b91c1c" stroke-width="6"/>

      <!-- Gold Stanchions -->
      <line x1="260" y1="670" x2="520" y2="630" stroke="#991b1b" stroke-width="8"/>
      <line x1="1660" y1="630" x2="1400" y2="670" stroke="#991b1b" stroke-width="8"/>
      <circle cx="260" cy="560" r="18" fill="#eab308" stroke="#ca8a04" stroke-width="4"/>
      <line x1="260" y1="560" x2="260" y2="840" stroke="#eab308" stroke-width="8"/>
      <circle cx="1660" cy="560" r="18" fill="#eab308" stroke="#ca8a04" stroke-width="4"/>
      <line x1="1660" y1="560" x2="1660" y2="840" stroke="#eab308" stroke-width="8"/>

      <!-- Paparazzi flashing in background -->
      <g transform="translate(140, 640) scale(1.15)">
        ${Ve(0,0,d)}
      </g>
      <g transform="translate(1780, 640) scale(1.15)">
        ${Ve(0,0,k)}
      </g>
    `;if(n){const c=oe(e-1,.32,{x:1040,y:440});m+=`
        <g transform="translate(${c.x}, ${c.y}) scale(${c.scaleX*1.3}, ${c.scaleY*1.3})" opacity="${c.opacity}" filter="url(#cardShadow)">
          <rect x="-90" y="-60" width="180" height="130" rx="10" fill="#0f172a" stroke="#ffffff" stroke-width="4"/>
          <!-- Diagonal zebra stripes -->
          <polygon points="-90,-60 -50,-60 -70,-35 -90,-35" fill="#ffffff"/>
          <polygon points="-30,-60 10,-60 -10,-35 -50,-35" fill="#ffffff"/>
          <polygon points="30,-60 70,-60 50,-35 10,-35" fill="#ffffff"/>
          <text x="0" y="0" font-family="'Impact', sans-serif" font-size="18" fill="#facc15" text-anchor="middle">HOLLYWOOD</text>
          <text x="0" y="25" font-family="'Courier New', monospace" font-size="13" font-weight="bold" fill="#ffffff" text-anchor="middle">SCENE 1: REDUX</text>
        </g>
      `}if(h){const c=oe(e-2,.35,{x:1420,y:450}),w=lt(e,2.5,3);m+=`
        <g transform="translate(${c.x}, ${c.y+w.dy}) scale(${c.scaleX*1.15}, ${c.scaleY*1.15})" opacity="${c.opacity}" filter="url(#cardShadow)">
          <rect x="-160" y="-270" width="320" height="540" rx="34" fill="#0f172a" stroke="#334155" stroke-width="6"/>
          <rect x="-145" y="-235" width="290" height="470" rx="18" fill="#ffffff"/>
          <g transform="translate(-120, -200)">
            <circle cx="16" cy="16" r="16" fill="#ec4899"/>
            <text x="40" y="22" font-family="sans-serif" font-size="14" font-weight="bold" fill="#0f172a">@celeb_life</text>
          </g>
          <!-- Celery Stick Feast -->
          <rect x="-120" y="-150" width="240" height="190" rx="8" fill="#f0fdf4" stroke="#dcfce7" stroke-width="2"/>
          <line x1="-70" y1="25" x2="70" y2="-25" stroke="#16a34a" stroke-width="14" stroke-linecap="round"/>
          <text x="0" y="18" font-family="'Impact', sans-serif" font-size="14" fill="#15803d" text-anchor="middle">DINNER: 1 CELERY</text>
          <g transform="translate(-110, 80)">
            <path d="M 0 0 C -6 -10 -18 0 0 16 C 18 0 6 -10 0 0 Z" fill="#ef4444"/>
            <text x="25" y="12" font-family="sans-serif" font-size="16" font-weight="bold" fill="#0f172a">2.4M likes</text>
          </g>
        </g>
      `,e<4.8&&(g+=A({x:1420,y:390},130,95,e,"FEASTING"),g+=F({x:600,y:520},{x:1250,y:420},e))}if(f){const c=Z(e-4.8,.22,{x:1240,y:240},360);c.impactOccurred&&e<5.3&&c.screenShake,m+=`
        <g transform="translate(${c.x}, ${c.y}) scale(${c.scaleX*1.05}, ${c.scaleY*1.05})" opacity="${c.opacity}" filter="url(#cardShadow)">
          <line x1="-240" y1="-260" x2="-240" y2="-60" stroke="#475569" stroke-width="7" stroke-dasharray="14 8"/>
          <line x1="240" y1="-260" x2="240" y2="-60" stroke="#475569" stroke-width="7" stroke-dasharray="14 8"/>
          <rect x="-290" y="-60" width="580" height="130" rx="16" fill="#0f172a" stroke="#ef4444" stroke-width="7"/>
          <text x="0" y="-10" font-family="'Impact', sans-serif" font-size="38" fill="#ffffff" letter-spacing="3" text-anchor="middle">
            HOLLYWOOD ECOSYSTEM
          </text>
          <text x="0" y="38" font-family="'Courier New', monospace" font-size="20" font-weight="bold" fill="#facc15" text-anchor="middle">
            [ DOWNSIZED TO ZERO CALORIES ]
          </text>
        </g>
      `,e<7.5&&(g+=M({x:1240,y:240},260,e))}if(n)n&&!h?(i=400,x=6,o="confused_squint",l={x:1040,y:440}):h&&!f?(i=420,x=10,o="skeptical_side_eye",l={x:1420,y:420}):f&&!a?(i=420,x=-14,o="shock_eye_pop",l={x:1240,y:240}):(t.cutTo(420,540,1.35),i=420,x=0,o="deadpan_slow_blink",l=void 0);else{const c=Math.min(1,e/1);i=260+c*140,r=c<1,o="deadpan_classic"}const u={id:"host_stick",state:{x:i,y:p,scale:1.34,timeSec:e,spineLean:x,expression:o,isWalking:r,pointTarget:l,gazeTarget:l}},y={id:"red_carpet_model",state:{x:960,y:640,scale:1.25,gender:"female",hairStyle:"female_long",clothes:"dress_pink",expression:a?"smug_peace_sign":"smug_chef_kiss",pose:"waving",timeSec:e}};return{backgroundSvg:m+g,stickFigures:[u,y],shake:0}}},Ft={id:"scene_02_techbro",name:"Thicc to Stick & Tech Bro Pivot",startTime:8.62,endTime:15.334,render(s){const{sceneTime:e,camera:t}=s,n=e>=1.2&&e<3.28,h=e>=3.28&&e<4.68,f=e>=4.68,a=e>=6.16;let i="";const p=e<1.2?0:Math.min(1,(e-1.2)/1.5),x=Et(p),o=720+x*540;let r=420,l=0,g="deadpan_classic",d=!1,k,m;n?(t.setTarget(960,540,1.08),r=420+x*180,l=14,d=!0,g="frustration_groan",m={x:o,y:185}):h?(t.setTarget(960,540,1.08),r=420,l=-14,g="shock_eye_pop",k={x:1380,y:500}):f&&!a?(t.setTarget(960,540,1.05),r=420,l=8,g="smug_rock_eyebrow",k={x:1260,y:240}):(t.cutTo(420,540,1.35),r=420,l=0,g="smug_finger_guns",k=void 0);let u=`
      <!-- Silicon Valley Tech Loft Backdrop -->
      <rect x="-4000" y="-4000" width="10000" height="10000" fill="#f1f5f9"/>
      
      <!-- San Francisco Skyline through Glass Window -->
      <rect x="200" y="100" width="1520" height="600" rx="20" fill="#e0f2fe" stroke="#94a3b8" stroke-width="8"/>
      <!-- City Silhouettes -->
      <polygon points="300,700 300,320 420,320 420,700" fill="#cbd5e1"/>
      <polygon points="450,700 450,220 540,160 630,220 630,700" fill="#94a3b8"/> <!-- Transamerica Pyramid -->
      <polygon points="660,700 660,280 780,280 780,700" fill="#cbd5e1"/>
      <polygon points="800,700 800,180 920,180 920,700" fill="#64748b"/> <!-- Salesforce Tower -->
      <polygon points="950,700 950,340 1080,340 1080,700" fill="#94a3b8"/>
      <polygon points="1120,700 1120,260 1260,260 1260,700" fill="#cbd5e1"/>

      <!-- Window Panes Grid -->
      <line x1="200" y1="380" x2="1720" y2="380" stroke="#94a3b8" stroke-width="6"/>
      <line x1="700" y1="100" x2="700" y2="700" stroke="#94a3b8" stroke-width="6"/>
      <line x1="1220" y1="100" x2="1220" y2="700" stroke="#94a3b8" stroke-width="6"/>

      <!-- Server Rack on Far Left -->
      <g transform="translate(80, 480)">
        <rect x="0" y="0" width="90" height="360" rx="8" fill="#0f172a" stroke="#334155" stroke-width="4"/>
        <line x1="10" y1="60" x2="80" y2="60" stroke="#334155" stroke-width="3"/>
        <line x1="10" y1="120" x2="80" y2="120" stroke="#334155" stroke-width="3"/>
        <line x1="10" y1="180" x2="80" y2="180" stroke="#334155" stroke-width="3"/>
        <line x1="10" y1="240" x2="80" y2="240" stroke="#334155" stroke-width="3"/>
        <line x1="10" y1="300" x2="80" y2="300" stroke="#334155" stroke-width="3"/>
        <!-- Blinking LEDs -->
        <circle cx="25" cy="40" r="4" fill="#22c55e" filter="url(#glow)"/>
        <circle cx="45" cy="40" r="4" fill="#06b6d4" filter="url(#glow)"/>
        <circle cx="65" cy="40" r="4" fill="${Math.sin(e*12)>0?"#ef4444":"#3b82f6"}" filter="url(#glow)"/>
      </g>

      <!-- Polished Office Wood Floor -->
      <rect x="-4000" y="800" width="10000" height="4000" fill="#e2e8f0"/>
      <line x1="-4000" y1="800" x2="6000" y2="800" stroke="#cbd5e1" stroke-width="6"/>
      <line x1="-4000" y1="940" x2="6000" y2="940" stroke="#94a3b8" stroke-width="3" stroke-dasharray="24 16"/>

      <!-- PERSISTENT TOP ASSET: Animated Velocity Slider Track -->
      <g transform="translate(0, 170)">
        <rect x="720" y="0" width="540" height="30" rx="15" fill="#e2e8f0" stroke="#0f172a" stroke-width="5" filter="url(#cardShadow)"/>
        <rect x="720" y="0" width="${x*540}" height="30" rx="15" fill="#38bdf8"/>

        <!-- Markers -->
        <circle cx="720" cy="15" r="26" fill="#f43f5e" stroke="#0f172a" stroke-width="5"/>
        <text x="720" y="70" font-family="'Impact', sans-serif" font-size="26" fill="#be123c" text-anchor="middle">"THICC"</text>
        <circle cx="1260" cy="15" r="26" fill="#0284c7" stroke="#0f172a" stroke-width="5"/>
        <text x="1260" y="70" font-family="'Impact', sans-serif" font-size="26" fill="#0369a1" text-anchor="middle">"STICK"</text>

        <!-- Dynamic Knob -->
        <circle cx="${o}" cy="15" r="30" fill="#eab308" stroke="#0f172a" stroke-width="6" filter="url(#glow)"/>
      </g>
    `;if(!h&&!f)n&&(i+=F({x:740,y:280},{x:o,y:210},e,"SPEEDRUN"));else if(h){const w=Bt(e-3.28,14,.9,260);u+=`
        <!-- Radial Crypto Shatter Burst -->
        ${w.map((S,L)=>`
          <g transform="translate(${1380+S.x}, ${500+S.y}) rotate(${e*300+L*30})" opacity="${S.opacity}">
            <circle cx="0" cy="0" r="${S.radius+6}" fill="#f59e0b" stroke="#0f172a" stroke-width="3"/>
            <text x="0" y="5" font-family="sans-serif" font-size="${Math.max(8,S.radius+2)}" font-weight="bold" fill="#fff" text-anchor="middle">₿</text>
          </g>
        `).join("")}
      `,i+=M({x:1380,y:500},240,e)}else{const w="PROMPT: /imagine tech_founder --v 6.0 --no calories",S=Math.min(w.length,Math.floor((e-4.68)*24)),L=w.slice(0,S),_=Math.sin(e*12)>0,D=lt(e,2,3);u+=`
        <!-- Floating Prompt Window -->
        <g transform="translate(1260, ${260+D.dy})">
          <rect x="-240" y="-60" width="480" height="120" rx="14" fill="#0f172a" stroke="#06b6d4" stroke-width="5" filter="url(#glow)"/>
          <rect x="-225" y="-45" width="450" height="90" rx="8" fill="#1e293b"/>
          <text x="-200" y="-12" font-family="'Courier New', monospace" font-size="17" font-weight="bold" fill="#22d3ee">
            ${L}${_?"█":" "}
          </text>
          <text x="-200" y="20" font-family="'Courier New', monospace" font-size="14" fill="#a5f3fc">
            --ar 16:9 --fast --chaos 100
          </text>
        </g>
      `,e<6.16&&(i+=A({x:1260,y:260},260,70,e,"PIVOT TO AI"))}const y={id:"host_stick",state:{x:r,y:650,scale:1.34,timeSec:e,spineLean:l,expression:g,isWalking:d,pointTarget:k,leftHandTarget:m,gazeTarget:k||m||(h?{x:1380,y:500}:void 0)}},c={id:"tech_bro_figure",state:{x:f?1260:1380,y:640,scale:1.28,gender:"tech_bro",hairStyle:"male_short",clothes:f?"suit":"hoodie",expression:h?"fear_screaming":f?"smug_rock_eyebrow":"smug_finger_guns",timeSec:e}};return{backgroundSvg:u+i,stickFigures:[y,c],shake:0}}};function Rt(s){const{x:e,y:t,scale:n=1,rotation:h=0,jawGap:f=20,lcdValue:a="0.02 mm",laserActive:i=!0}=s;return`
    <g id="prop-caliper-rig" transform="translate(${e}, ${t}) rotate(${h}) scale(${n})">
      <!-- Main Caliper Beam -->
      <rect x="-180" y="-18" width="360" height="36" rx="6" fill="#cbd5e1" stroke="#334155" stroke-width="5" filter="url(#cardShadow)"/>
      
      <!-- Fixed Left Jaw -->
      <path d="M -180 -18 L -180 110 L -140 70 L -140 -18 Z" fill="#94a3b8" stroke="#334155" stroke-width="5"/>

      <!-- Movable Right Jaw (Driven by jawGap) -->
      <g transform="translate(${-180+f+60}, 0)">
        <path d="M 0 -18 L 0 110 L -40 70 L -40 -18 Z" fill="#64748b" stroke="#1e293b" stroke-width="5"/>
        <!-- Digital Slider Display Unit -->
        <rect x="-50" y="-38" width="100" height="76" rx="10" fill="#0f172a" stroke="#38bdf8" stroke-width="4" filter="url(#cardShadow)"/>
        <!-- Glowing Green LCD Screen -->
        <rect x="-40" y="-24" width="80" height="32" rx="4" fill="#022c22" stroke="#10b981" stroke-width="2"/>
        <text x="0" y="-2" font-family="'Courier New', monospace" font-size="16" font-weight="bold" fill="#34d399" filter="url(#glow)" text-anchor="middle">
          ${a}
        </text>
      </g>

      ${i?`
        <!-- Red Laser Precision Measurement Sweep -->
        <line x1="-180" y1="65" x2="${-180+f+20}" y2="65" stroke="#ef4444" stroke-width="4" stroke-dasharray="6 3" filter="url(#glow)"/>
        <circle cx="${-180+f/2}" cy="65" r="4" fill="#f87171" filter="url(#glow)"/>
      `:""}
    </g>
  `}function zt(s){const{x:e,y:t,scale:n=1,rotation:h=0,isCancelled:f=!1,stampProgress:a=0,stampAngle:i=-14}=s,p=f?1+Math.max(0,1-a)*1.5:0,x=f?Math.min(1,a*2):0;return`
    <g id="prop-saas-modal-rig" transform="translate(${e}, ${t}) rotate(${h}) scale(${n})">
      <!-- Modal Window Card -->
      <rect x="-240" y="-160" width="480" height="320" rx="20" fill="#ffffff" stroke="#0f172a" stroke-width="8" filter="url(#cardShadow)"/>
      
      <!-- Window Header Bar -->
      <path d="M -240 -160 L 240 -160 L 240 -100 L -240 -100 Z" fill="#f1f5f9" stroke="#0f172a" stroke-width="8"/>
      <circle cx="-200" cy="-130" r="10" fill="#ef4444"/>
      <circle cx="-170" cy="-130" r="10" fill="#eab308"/>
      <circle cx="-140" cy="-130" r="10" fill="#22c55e"/>
      <text x="0" y="-120" font-family="'Impact', sans-serif" font-size="22" fill="#0f172a" text-anchor="middle">
        SUBSCRIPTION SETTINGS
      </text>

      <!-- Modal Body -->
      <text x="0" y="-45" font-family="sans-serif" font-size="24" font-weight="bold" fill="#0f172a" text-anchor="middle">
        Cancel Biological Hunger?
      </text>
      <text x="0" y="-10" font-family="sans-serif" font-size="16" fill="#64748b" text-anchor="middle">
        Plan: Daily Lunch &amp; Carbohydrates ($120/mo)
      </text>

      <!-- Keep Subscription Button -->
      <rect x="-190" y="35" width="170" height="60" rx="12" fill="#e2e8f0" stroke="#94a3b8" stroke-width="4"/>
      <text x="-105" y="72" font-family="sans-serif" font-size="18" font-weight="bold" fill="#475569" text-anchor="middle">
        Keep Lunch
      </text>

      <!-- Unsubscribe Button -->
      <rect x="20" y="35" width="170" height="60" rx="12" fill="#dc2626" stroke="#991b1b" stroke-width="4"/>
      <text x="105" y="72" font-family="sans-serif" font-size="18" font-weight="bold" fill="#ffffff" text-anchor="middle">
        Unsubscribe
      </text>

      ${f?`
        <!-- Animated CANCELLED Stamp Slam -->
        <g transform="translate(0, 20) rotate(${i}) scale(${p})" opacity="${x}">
          <rect x="-190" y="-55" width="380" height="110" rx="16" fill="#fee2e2" stroke="#dc2626" stroke-width="12" filter="url(#glow)"/>
          <text x="0" y="20" font-family="'Impact', sans-serif" font-size="64" fill="#dc2626" letter-spacing="6" text-anchor="middle">
            CANCELLED
          </text>
          <!-- Shockwave action spikes -->
          <line x1="-210" y1="0" x2="-235" y2="0" stroke="#dc2626" stroke-width="6"/>
          <line x1="210" y1="0" x2="235" y2="0" stroke="#dc2626" stroke-width="6"/>
        </g>
      `:""}
    </g>
  `}const Ht={id:"scene_03_celebrities",name:"Jenna Ortega, Emma Stone, Ariana & Cheekbone Calipers",startTime:15.334,endTime:22.805,render(s){const{sceneTime:e,camera:t}=s,n=e<1.2,h=e>=1.2,f=e>=3.36,a=e>=4.666,i=e>=5.866,p=e>=6.88;let x=360,o=0,r="deadpan_classic",l=!1,g,d="none",k="";n?(t.setTarget(960,540,1.05),x=440):f?a?i?p?(t.cutTo(440,540,1.35),x=440,o=-10,r="shock_eye_pop"):(t.setTarget(960,540,1.15),x=440,o=14,l=!1,d="caliper",g={x:1460,y:450},r="confused_squint"):(t.setTarget(960,540,1.08),x=420,g={x:1460,y:500},r="confused_tilted_head"):(t.setTarget(960,540,1.08),x=420,g={x:1100,y:500},r="confused_squint"):(t.setTarget(960,540,1.05),x=420,o=8,g={x:750,y:500},r="skeptical_side_eye");let m=`
      <!-- Beverly Hills Vanity Salon Backdrop -->
      <rect x="-4000" y="-4000" width="10000" height="10000" fill="#fdf2f8"/>
      
      <!-- Striped Salon Wallpaper -->
      <path d="M 0,0 L 2000,0" stroke="#fbcfe8" stroke-width="40" stroke-dasharray="40 80"/>
      
      <!-- 3 Arched Vanity Dressing Mirrors -->
      <!-- Mirror 1 (Jenna) -->
      <path d="M 600 800 L 600 320 A 150 150 0 0 1 900 320 L 900 800 Z" fill="#e0f2fe" stroke="#f472b6" stroke-width="8" opacity="0.6"/>
      <!-- Mirror 2 (Emma) -->
      <path d="M 950 800 L 950 320 A 150 150 0 0 1 1250 320 L 1250 800 Z" fill="#e0f2fe" stroke="#34d399" stroke-width="8" opacity="0.6"/>
      <!-- Mirror 3 (Ariana) -->
      <path d="M 1310 800 L 1310 320 A 150 150 0 0 1 1610 320 L 1610 800 Z" fill="#e0f2fe" stroke="#a78bfa" stroke-width="8" opacity="0.6"/>

      <!-- Glowing Vanity Marquee Light Bulbs -->
      ${[600,650,750,850,900,950,1e3,1100,1200,1250,1310,1360,1460,1560,1610].map(c=>`
        <circle cx="${c}" cy="200" r="10" fill="#fef08a" stroke="#ca8a04" stroke-width="2" filter="url(#glow)"/>
      `).join("")}

      <!-- Gold Trim Baseboard & Velvet Floor -->
      <rect x="-4000" y="800" width="10000" height="4000" fill="#831843"/>
      <line x1="-4000" y1="800" x2="6000" y2="800" stroke="#facc15" stroke-width="10"/>
    `;if(h&&(m+=`
        <!-- Character Label Card -->
        <g transform="translate(750, 260)">
          <rect x="-120" y="-25" width="240" height="50" rx="10" fill="#0f172a" stroke="#dc2626" stroke-width="4" filter="url(#cardShadow)"/>
          <text x="0" y="8" font-family="'Impact', sans-serif" font-size="20" fill="#ffffff" letter-spacing="1" text-anchor="middle">
            JENNA ORTEGA
          </text>
        </g>
      `),f&&(m+=`
        <!-- Character Label Card -->
        <g transform="translate(1100, 260)">
          <rect x="-120" y="-25" width="240" height="50" rx="10" fill="#064e3b" stroke="#10b981" stroke-width="4" filter="url(#cardShadow)"/>
          <text x="0" y="8" font-family="'Impact', sans-serif" font-size="20" fill="#ffffff" letter-spacing="1" text-anchor="middle">
            EMMA STONE
          </text>
        </g>
      `),a&&(m+=`
        <!-- Character Label Card -->
        <g transform="translate(1460, 260)">
          <rect x="-120" y="-25" width="240" height="50" rx="10" fill="#581c87" stroke="#c084fc" stroke-width="4" filter="url(#cardShadow)"/>
          <text x="0" y="8" font-family="'Impact', sans-serif" font-size="20" fill="#ffffff" letter-spacing="1" text-anchor="middle">
            ARIANA GRANDE
          </text>
        </g>
      `),i){const c=e-5.866,w=Math.min(1,c/.4),S=65-w*42,L=w<1?((1-w)*14.4+.02).toFixed(2)+" mm":"0.02 mm";m+=`
        <!-- Forensic Radar Target Grid on Cheekbones -->
        <g stroke="#ef4444" stroke-width="2.5" opacity="0.75">
          <circle cx="1460" cy="500" r="95" fill="none" stroke-dasharray="8 6"/>
          <line x1="1340" y1="500" x2="1580" y2="500"/>
          <line x1="1460" y1="380" x2="1460" y2="620"/>
        </g>

        <!-- Mechanical Digital Caliper Rig -->
        ${Rt({x:1460,y:450,scale:1.8,jawGap:S,lcdValue:L,laserActive:!0})}
      `,e>6.2&&(k+=A({x:1460,y:450},140,90,e,"FAT: ZERO"),k+=F({x:1200,y:380},{x:1400,y:440},e))}p&&(k+=M({x:650,y:560},160,e));let y=[{id:"host_stick",state:{x,y:650,scale:1.34,timeSec:e,spineLean:o,isWalking:l,rightHandProp:d,pointTarget:g,expression:r,gazeTarget:g||{x:960,y:630}}}];return h&&y.push({id:"jenna_stick",state:{x:750,y:640,scale:1.25,gender:"female",hairStyle:"female_bob",clothes:"dress_black",expression:"deadpan_soul_stare",timeSec:e}}),f&&y.push({id:"emma_stick",state:{x:1100,y:640,scale:1.25,gender:"female",hairStyle:"female_blonde",clothes:"dress_pink",expression:"smug_chef_kiss",timeSec:e}}),a&&y.push({id:"ariana_stick",state:{x:1460,y:640,scale:1.25,gender:"female",hairStyle:"female_ponytail",clothes:"crop_top_leggings",expression:i?"cringe_teeth_grit":"smug_peace_sign",timeSec:e}}),{backgroundSvg:m+k,stickFigures:y}}},Ot={id:"scene_04_unsubscribe",name:"Unsubscribe from Carbs & Cancel Lunch",startTime:22.805,endTime:32.967,render(s){const{sceneTime:e,camera:t}=s,n=e>=3.2,h=e>=5.8,f=e>=7.12,a=e>=9.6;let i=420,p=650,x=0,o="deadpan_classic",r=!1,l,g,d="";n?n&&!h?(t.setTarget(960,540,1.08),i=420,x=16,o="crying_waterfalls",g={x:1380,y:320},l={x:1380,y:380}):h&&!f?(t.setTarget(960,540,1.08),i=420,x=0,o="shock_home_alone",l={x:1380,y:440}):f&&!a?(t.setTarget(960,540,1.15),i=420-Math.min(1,(e-7.12)/.3)*120,x=-22,o="fear_screaming",l={x:1380,y:480}):(t.cutTo(420,540,1.35),i=300,x=0,o="deadpan_slow_blink",l=void 0):(t.setTarget(960,540,1.05),i=420,x=0,o="deadpan_classic",l={x:1380,y:570});let k=`
      <!-- Italian Restaurant Trattoria Backdrop -->
      <rect x="-4000" y="-4000" width="10000" height="10000" fill="#fdf2f8"/>
      
      <!-- Rustic Warm Brick Walls & Archway -->
      <rect x="150" y="80" width="1620" height="720" rx="14" fill="#991b1b" stroke="#7f1d1d" stroke-width="8"/>
      <!-- Brick mortar lines -->
      ${[160,240,320,400,480,560,640,720].map(w=>`
        <line x1="150" y1="${w}" x2="1770" y2="${w}" stroke="#7f1d1d" stroke-width="4"/>
      `).join("")}

      <!-- Chalkboard Daily Specials Menu on Wall -->
      <g transform="translate(420, 240)">
        <rect x="-140" y="-80" width="280" height="160" rx="8" fill="#064e3b" stroke="#78350f" stroke-width="8" filter="url(#cardShadow)"/>
        <text x="0" y="-45" font-family="'Impact', sans-serif" font-size="20" fill="#facc15" text-anchor="middle">MENU DEL GIORNO</text>
        <line x1="-110" y1="-30" x2="110" y2="-30" stroke="#facc15" stroke-width="2"/>
        <text x="0" y="-5" font-family="serif" font-size="16" fill="#ffffff" text-anchor="middle">1. Pizza Margherita</text>
        <text x="0" y="25" font-family="serif" font-size="16" fill="#ffffff" text-anchor="middle">2. Fresh Sourdough Bread</text>
        <text x="0" y="55" font-family="serif" font-size="16" fill="#f87171" font-weight="bold" text-anchor="middle">[UNSUBSCRIBED]</text>
      </g>

      <!-- Overhead Warm Restaurant Lamp & Cone of Light -->
      <g transform="translate(1380, 0)">
        <line x1="0" y1="0" x2="0" y2="160" stroke="#334155" stroke-width="5"/>
        <path d="M -70 160 Q 0 120 70 160 Z" fill="#78350f" stroke="#451a03" stroke-width="4"/>
        <polygon points="-70,160 70,160 380,780 -380,780" fill="#fef08a" opacity="0.22"/>
      </g>

      <!-- Restaurant Terracotta Tile Floor -->
      <rect x="-4000" y="780" width="10000" height="4000" fill="#7c2d12"/>
      <line x1="-4000" y1="780" x2="6000" y2="780" stroke="#451a03" stroke-width="8"/>

      <!-- Red & White Checkered Restaurant Table -->
      <ellipse cx="1380" cy="840" rx="340" ry="30" fill="#000000" opacity="0.25"/>
      <line x1="1120" y1="650" x2="1100" y2="840" stroke="#78350f" stroke-width="14" stroke-linecap="round"/>
      <line x1="1640" y1="650" x2="1660" y2="840" stroke="#78350f" stroke-width="14" stroke-linecap="round"/>
      <!-- Checkered Table Top -->
      <ellipse cx="1380" cy="650" rx="340" ry="95" fill="#dc2626" stroke="#b91c1c" stroke-width="7" filter="url(#cardShadow)"/>
      <path d="M 1040 650 Q 1380 550 1720 650 Q 1380 750 1040 650 Z" fill="#ffffff" opacity="0.4" stroke="#dc2626" stroke-width="10" stroke-dasharray="30 30"/>
    `;const m=-20-e*40%80,u=-30-(e+.6)*35%80;if(k+=`
      <g transform="translate(1380, 570) scale(1.4)">
        <polygon points="-80,20 -10,-40 30,30" fill="#f59e0b" stroke="#b45309" stroke-width="4"/>
        <circle cx="-35" cy="0" r="8" fill="#ef4444"/>
        <circle cx="-10" cy="15" r="7" fill="#ef4444"/>
        <ellipse cx="60" cy="0" rx="55" ry="30" fill="#d97706" stroke="#78350f" stroke-width="4"/>
        <path d="M 30 -10 Q 60 -25 90 -10" stroke="#fde68a" stroke-width="3" fill="none"/>
        <path d="M -30 ${m} Q -40 ${m-20} -25 ${m-40}" fill="none" stroke="#cbd5e1" stroke-width="3" stroke-linecap="round" opacity="0.6"/>
        <path d="M 60 ${u} Q 50 ${u-20} 65 ${u-40}" fill="none" stroke="#cbd5e1" stroke-width="3" stroke-linecap="round" opacity="0.6"/>
      </g>
    `,n){const w=Math.max(160,520-(e-3.2)*85),S=.22+Math.sin(e*4)*.08;k+=`
        <!-- Heavenly Spotlight Rays -->
        <polygon points="1380,-200 980,840 1780,840" fill="#fef08a" opacity="${S}"/>
        ${At(1380,w,e)}
      `,h||(d+=F({x:900,y:560},{x:1300,y:w+20},e,"GOODBYE PIZZA"))}if(h){const w=f?Math.min(1,(e-7.12)/.35):0;if(f){const S=Z(e-7.12,.22,{x:1380,y:460},380);S.impactOccurred&&e<7.6&&S.screenShake}k+=`
        ${zt({x:1380,y:460,scale:1.25,isCancelled:f,stampProgress:w})}
      `,f&&e<8.5&&(d+=M({x:1380,y:460},280,e))}const y={id:"host_stick",state:{x:i,y:p,scale:1.34,timeSec:e,spineLean:x,isWalking:r,pointTarget:l,leftHandTarget:g,expression:o,gazeTarget:l||g}},c={id:"waiter_stick",state:{x:1600,y:640,scale:1.25,gender:"male",hairStyle:"male_short",clothes:"suit",expression:f?"fear_panic_run":"shock_eye_pop",timeSec:e}};return{backgroundSvg:k+d,stickFigures:[y,c],shake:0}}},Yt={id:"scene_05_timburton_ps1",name:"Tim Burton Aesthetic & Low-Poly PS1 Graphics",startTime:32.967,endTime:43.729,render(s){const{sceneTime:e,camera:t}=s,n=e<3.92,h=e>=3.92&&e<6.88,f=e>=6.88&&e<8.96,a=e>=8.96&&e<10.16;let i=520,p=650,x=1.34,o=0,r="deadpan_classic",l,g="";n?(t.setTarget(960,540,1.05),i=440,o=12,l={x:1260,y:380},r="deadpan_classic"):h?(t.cutTo(960,540,1.35),i=960,x=1.45,o=Math.sin(e*4)*4,r="dark_circles_insomnia"):f?(t.setTarget(960,540,1.08),i=440,o=8,l={x:1260,y:460},r="confused_squint"):a?(t.setTarget(960,540,1.15),i=440,r="mind_blown_galaxy_brain",l={x:1260,y:440}):(t.cutTo(440,540,1.35),i=440,r="deadpan_side_glance");let d=`
      <!-- Full-bleed background -->
      <rect x="-4000" y="-4000" width="10000" height="10000" fill="#f8fafc"/>
      <line x1="-4000" y1="840" x2="6000" y2="840" stroke="#e2e8f0" stroke-width="4"/>
    `;if(n||h){const u=Math.sin(e*18)*16;d=`
        <rect x="-4000" y="-4000" width="10000" height="10000" fill="#09090b"/>
        <line x1="-4000" y1="840" x2="6000" y2="840" stroke="#27272a" stroke-width="6"/>

        <!-- Glowing Eerie Crescent Moon -->
        <ellipse cx="1450" cy="220" rx="100" ry="100" fill="#fef08a" filter="url(#glow)"/>
        <ellipse cx="1490" cy="200" rx="90" ry="90" fill="#09090b"/>

        <!-- Iconic Tim Burton Curly Spiral Mountain Peak -->
        <path d="M 700 840 C 900 660 1150 380 1380 400 C 1500 410 1540 520 1440 570 C 1320 620 1380 730 1500 790 C 1620 840 1800 840 2200 840 L 2200 840 L 700 840 Z" fill="#18181b" stroke="#3f3f46" stroke-width="8"/>

        <!-- Twisted Gothic Dead Trees with Curled Branches -->
        <path d="M 1750 840 L 1730 580 Q 1660 480 1580 440 M 1730 580 Q 1810 490 1840 400 M 1730 660 Q 1820 630 1900 590" stroke="#27272a" stroke-width="16" fill="none" stroke-linecap="round"/>

        <!-- Fluttering Bats -->
        <g transform="translate(${1350-e*50}, 140) scale(1.4)">
          <path d="M -30 0 Q -15 ${-20+u} 0 0 Q 15 ${-20+u} 30 0 Q 15 15 0 6 Q -15 15 -30 0 Z" fill="#52525b"/>
        </g>
      `,n&&e>1.5&&(g+=F({x:680,y:480},{x:1300,y:380},e,"SPEEDRUN BURTON")),h&&(d+=`
          <g transform="translate(960, 280)">
            <rect x="-140" y="-30" width="280" height="60" rx="6" fill="#000000" opacity="0.7"/>
            <text x="0" y="8" font-family="'Courier New', monospace" font-size="22" font-weight="bold" fill="#22d3ee" text-anchor="middle">
              MAY 1997 - SP ▷
            </text>
          </g>
        `)}else{const u=(e-6.88)*2.5,y=Math.cos(u),c=Math.sin(u),w=1380,S=460,L=240,_=`${w+y*L},${S-140}`,D=`${w-y*L},${S-140}`,B=`${w-c*(L*.9)},${S+140}`,v=`${w+c*(L*.9)},${S+140}`,P=`${w},${S-240}`,R=`${w},${S+240}`;d=`
        <rect x="-4000" y="-4000" width="10000" height="10000" fill="#022c22"/>
        <line x1="-4000" y1="840" x2="6000" y2="840" stroke="#059669" stroke-width="4"/>

        <!-- PS1 Retro Wireframe Floor Grid -->
        <g stroke="#10b981" stroke-width="2.5" opacity="0.75">
          ${[480,550,630,720,840,980].map(W=>`<line x1="-2000" y1="${W}" x2="4000" y2="${W}"/>`).join("")}
          ${[200,500,800,1100,1380,1660,1960,2260].map(W=>`<line x1="${W}" y1="480" x2="${W+(W-1380)*1.8}" y2="1080"/>`).join("")}
        </g>

        <!-- Spinning 3D Polygonal Mesh (Low-Poly Character) -->
        <polygon points="${P} ${_} ${v}" fill="#34d399" stroke="#047857" stroke-width="5"/>
        <polygon points="${P} ${D} ${B}" fill="#059669" stroke="#047857" stroke-width="5"/>
        <polygon points="${R} ${B} ${v}" fill="#047857" stroke="#065f46" stroke-width="5"/>
        <polygon points="${P} ${_} ${D}" fill="#6ee7b7" stroke="#059669" stroke-width="5"/>

        <!-- Retro PS1 HUD Badge -->
        <g transform="translate(1380, 160)">
          <rect x="-180" y="-30" width="360" height="60" rx="8" fill="#0f172a" stroke="#10b981" stroke-width="4" filter="url(#glow)"/>
          <text x="0" y="10" font-family="'Courier New', monospace" font-size="24" font-weight="bold" fill="#34d399" text-anchor="middle">
            PS1 : 240p | 14 POLYS
          </text>
        </g>

        <!-- CRT Scanline Overlay -->
        <g stroke="#000000" stroke-width="3" opacity="0.35">
          ${Array.from({length:45}).map((W,ne)=>`<line x1="-2000" y1="${ne*24}" x2="4000" y2="${ne*24}"/>`).join("")}
        </g>
      `,(f||a)&&(g+=A({x:1380,y:460},220,160,e,"14 POLYGONS"))}let m=[{id:"host_stick",state:{x:i,y:p,scale:x,timeSec:e,spineLean:o,pointTarget:l,expression:r,gazeTarget:l}}];return n&&m.push({id:"gothic_widow_figure",state:{x:1380,y:640,scale:1.25,gender:"widow",hairStyle:"widow_veil",clothes:"dress_black",expression:"dark_circles_insomnia",timeSec:e}}),{backgroundSvg:d+g,stickFigures:m}}},Dt={id:"scene_06_pendulum",name:"The Beauty Standard Pendulum & Slouching Couch Guy",startTime:43.729,endTime:57.809,render(s){const{sceneTime:e,camera:t}=s,n=e<3.657,h=e>=3.657&&e<7.771,f=e>=7.771&&e<10.771,a=e>=10.771&&e<13.937;let i=540,p=650,x=0,o="deadpan_classic",r="none",l,g="";n?(t.setTarget(960,540,1.05),i=440,x=8,r="pointer",l={x:1280,y:480},o="deadpan_classic"):h?(t.setTarget(960,540,1.08),i=440,x=-14,l={x:1280,y:380},o="skeptical_raised_brow"):f?(t.setTarget(960,540,1.12),i=440,x=-18,l={x:1280,y:680},o="cringe_teeth_grit"):a?(t.cutTo(440,540,1.35),i=440,o="deadpan_shrug"):(t.cutTo(440,540,1.35),i=440,o="deadpan_classic");const d=1380,k=-60,m=700,u=n?0:Math.sin((e-3.657)*3.8)*.65,y=d+Math.sin(u)*m,c=k+Math.cos(u)*m,w=!n&&Math.abs(u)<.35;let S=`
      <!-- University Physics Lecture Hall Backdrop -->
      <rect x="-4000" y="-4000" width="10000" height="10000" fill="#fef3c7"/>
      
      <!-- Wood Paneling Wall -->
      <rect x="-4000" y="0" width="10000" height="840" fill="#fef08a" opacity="0.3"/>
      ${[200,400,600,800,1e3,1200,1400,1600,1800].map(D=>`
        <line x1="${D}" y1="0" x2="${D}" y2="800" stroke="#ca8a04" stroke-width="2" opacity="0.4"/>
      `).join("")}

      <!-- Giant Green Chalkboard on Wall -->
      <rect x="580" y="160" width="1280" height="580" rx="14" fill="#064e3b" stroke="#78350f" stroke-width="18" filter="url(#cardShadow)"/>
      <rect x="560" y="740" width="1320" height="24" rx="4" fill="#92400e"/> <!-- Chalk Tray -->
      <!-- Scattered Chalk Pieces -->
      <rect x="620" y="745" width="24" height="10" rx="2" fill="#ffffff"/>
      <rect x="660" y="745" width="30" height="10" rx="2" fill="#fde047"/>
      <rect x="710" y="745" width="20" height="10" rx="2" fill="#93c5fd"/>

      <!-- Wooden Lecture Stage Floor -->
      <rect x="-4000" y="800" width="10000" height="4000" fill="#78350f"/>
      <line x1="-4000" y1="800" x2="6000" y2="800" stroke="#451a03" stroke-width="8"/>
    `;n?(S+=`
        <g transform="translate(1280, 440)">
          <text x="0" y="-120" font-family="'Impact', sans-serif" font-size="38" fill="#ffffff" text-anchor="middle">HUMAN BEAUTY DYNAMICS 101</text>
          <path d="M -300 -40 Q 0 160 300 -40" stroke="#ffffff" stroke-width="6" stroke-dasharray="14 10" fill="none"/>
          <text x="-260" y="40" font-family="sans-serif" font-size="28" font-weight="bold" fill="#facc15" text-anchor="middle">1990s: ZERO CALORIES</text>
          <text x="260" y="40" font-family="sans-serif" font-size="28" font-weight="bold" fill="#38bdf8" text-anchor="middle">2010s: MAXIMUM BBL</text>
          <circle cx="0" cy="60" r="14" fill="#ef4444"/>
          <text x="0" y="110" font-family="sans-serif" font-size="22" fill="#f87171" text-anchor="middle">[YOU ARE HERE]</text>
        </g>
      `,e>1.2&&(g+=A({x:1380,y:480},220,120,e,"CYCLE OF DOOM"))):(S+=`
        <line x1="${d}" y1="${k}" x2="${y}" y2="${c}" stroke="#475569" stroke-width="10"/>
        <circle cx="${d}" cy="${k}" r="22" fill="#1e293b"/>

        <!-- Giant Spiked Wrecking Ball -->
        <g id="wrecking-ball" transform="translate(${y}, ${c})">
          <circle cx="0" cy="0" r="130" fill="#1e293b" stroke="#0f172a" stroke-width="12" filter="url(#cardShadow)"/>
          <ellipse cx="-40" cy="-40" rx="65" ry="40" fill="#475569" opacity="0.6"/>
          <polygon points="0,-55 -45,40 45,40" fill="#ef4444"/>
          <text x="0" y="28" font-family="'Impact', sans-serif" font-size="40" fill="#ffffff" text-anchor="middle">BEAUTY</text>
        </g>

        <!-- Couch Guy Grounded on Floor (Scale: 1.40) -->
        ${Lt({x:1380,y:720,scale:1.4,isDucking:w||a,timeSec:e})}
      `,f&&w&&(S+=`
          <g fill="#eab308" stroke="#ca8a04" stroke-width="2">
            <circle cx="1320" cy="620" r="8"/>
            <circle cx="1440" cy="610" r="10"/>
            <circle cx="1390" cy="580" r="6"/>
          </g>
        `,g+=M({x:1380,y:700},160,e)),a&&(g+=F({x:1100,y:640},{x:1300,y:700},e,"NO ESCAPE")));let _=[{id:"host_stick",state:{x:i,y:p,scale:1.34,timeSec:e,spineLean:x,rightHandProp:r,pointTarget:l,expression:o,gazeTarget:l}}];return n||_.push({id:"couch_guy_stick",state:{x:1380,y:660,scale:1.22,gender:"male",hairStyle:"male_short",clothes:"hoodie",expression:w?"fear_screaming":"deadpan_classic",spineLean:w?-20:0,timeSec:e}}),{backgroundSvg:S+g,stickFigures:_}}},Nt={id:"scene_07_heroinchic",name:"90s Heroin Chic, Food Pyramid & Victorian Disease",startTime:57.809,endTime:80.457,render(s){const{sceneTime:e,camera:t}=s,n=e<7.44,h=e>=7.44&&e<16.065,f=e>=16.065&&e<21.825,a=e>=21.825;let i=460,p=650,x=0,o=!1,r="deadpan_classic",l="none",g,d="";n?(t.setTarget(960,540,1.05),i=440,x=8,g={x:1260,y:550},r="deadpan_classic"):h?(t.setTarget(960,540,1.08),i=440,x=10,l="diet_coke",g={x:1260,y:320},r="deadpan_side_glance"):f?(t.setTarget(960,540,1.08),i=440,x=12,l="coffee_cup",g={x:1260,y:640},r="smug_sipping_tea"):(t.cutTo(440,540,1.35),i=440,r="smug_finger_guns");let k=`
      <!-- High Fashion Milan Runway Backdrop -->
      <rect x="-4000" y="-4000" width="10000" height="10000" fill="#0f172a"/>
      
      <!-- Overhead Light Truss System -->
      <line x1="-1000" y1="80" x2="3000" y2="80" stroke="#334155" stroke-width="8"/>
      <line x1="-1000" y1="120" x2="3000" y2="120" stroke="#334155" stroke-width="8"/>
      ${[200,500,800,1100,1400,1700].map(y=>`
        <line x1="${y}" y1="80" x2="${y+40}" y2="120" stroke="#475569" stroke-width="4"/>
        <line x1="${y+40}" y1="80" x2="${y}" y2="120" stroke="#475569" stroke-width="4"/>
        <!-- Downward Spotlights -->
        <polygon points="${y+20},120 ${y-100},800 ${y+140},800" fill="#fef08a" opacity="0.12"/>
      `).join("")}

      <!-- Glossy Black Runway Floor with Reflection -->
      <polygon points="200,800 1720,800 2100,1200 -200,1200" fill="#020617"/>
      <line x1="-4000" y1="800" x2="6000" y2="800" stroke="#38bdf8" stroke-width="4" filter="url(#glow)"/>
    `;if(n){const y=Math.sin(e*14)>.5;k+=`
        <polygon points="1350,-100 1060,840 1640,840" fill="#fef08a" opacity="0.25"/>
        <ellipse cx="1350" cy="840" rx="290" ry="50" fill="#fde047" opacity="0.35"/>
        <ellipse cx="1350" cy="840" rx="90" ry="18" fill="#000000" opacity="0.25"/>

        <!-- Side Runway Strobe Lights -->
        <circle cx="1020" cy="800" r="${y?24:12}" fill="${y?"#ffffff":"#cbd5e1"}" filter="${y?"url(#glow)":"none"}"/>
        <circle cx="1680" cy="800" r="${y?24:12}" fill="${y?"#ffffff":"#cbd5e1"}" filter="${y?"url(#glow)":"none"}"/>
      `}else if(h){const y=e-7.44,c=Z(y,.22,{x:1380,y:460},300);c.impactOccurred&&y<.5&&c.screenShake;const w=y>=1.5,S=y>=3.5,L=y>=6;k+=`
        <g transform="translate(${c.x}, ${c.y}) scale(${c.scaleX}, ${c.scaleY})">
          <polygon points="0,-220 -300,200 300,200" fill="#f1f5f9" stroke="#0f172a" stroke-width="9" filter="url(#cardShadow)"/>
          <line x1="-140" y1="10" x2="140" y2="10" stroke="#0f172a" stroke-width="7"/>
          <line x1="-80" y1="-100" x2="80" y2="-100" stroke="#0f172a" stroke-width="7"/>

          <!-- Top Tier: Diet Coke Can -->
          ${w?`
            <g transform="translate(0, -155) scale(1.3)">
              <rect x="-35" y="-60" width="70" height="110" rx="10" fill="#dc2626" stroke="#111" stroke-width="5" filter="url(#cardShadow)"/>
              <rect x="-28" y="-50" width="56" height="20" fill="#ffffff"/>
              <text x="0" y="-35" font-family="'Impact', sans-serif" font-size="16" fill="#dc2626" text-anchor="middle">DIET</text>
              <text x="0" y="20" font-family="'Impact', sans-serif" font-size="28" fill="#ffffff" text-anchor="middle">Coke</text>
            </g>
          `:""}

          <!-- Middle Tier: Parliament Cigarettes with rising smoke -->
          ${S?`
            <g transform="translate(-80, -40) scale(1.2)">
              <rect x="-45" y="-35" width="90" height="75" rx="6" fill="#1e3a8a" stroke="#111" stroke-width="4"/>
              <text x="0" y="8" font-family="sans-serif" font-size="12" font-weight="bold" fill="#ffffff" text-anchor="middle">PARLIAMENT</text>
            </g>
            <g transform="translate(80, -40) scale(1.2)">
              <rect x="-45" y="-35" width="90" height="75" rx="6" fill="#1e3a8a" stroke="#111" stroke-width="4"/>
              <text x="0" y="8" font-family="sans-serif" font-size="12" font-weight="bold" fill="#ffffff" text-anchor="middle">LIGHTS</text>
            </g>
          `:""}

          <!-- Bottom Base Tier: Pure Unfiltered Apathy -->
          ${L?`
            <g transform="translate(0, 110)">
              <rect x="-250" y="-35" width="500" height="70" rx="10" fill="#0f172a" stroke="#0284c7" stroke-width="5"/>
              <text x="0" y="12" font-family="'Impact', sans-serif" font-size="28" fill="#38bdf8" letter-spacing="2" text-anchor="middle">
                PURE UNFILTERED APATHY
              </text>
            </g>
          `:""}
        </g>
      `,w&&!S&&(d+=A({x:1380,y:300},70,70,e,"ESSENTIAL NUTRIENT")),L&&(d+=F({x:700,y:560},{x:1140,y:570},e,"FOUNDATION"))}else{const y=oe(e-16.065,.35,{x:1380,y:680});k+=`
        <!-- Victorian Chaise Lounge with Contact Shadow -->
        <g transform="translate(${y.x}, ${y.y}) scale(${y.scaleX*1.35}, ${y.scaleY*1.35})" opacity="${y.opacity}">
          <ellipse cx="0" cy="85" rx="200" ry="18" fill="#000000" opacity="0.22"/>
          <path d="M -190 40 Q -170 -70 -100 -60 L 150 -30 Q 190 -20 190 40 Z" fill="#831843" stroke="#500724" stroke-width="7" filter="url(#cardShadow)"/>
          <line x1="-150" y1="40" x2="-160" y2="85" stroke="#713f12" stroke-width="10" stroke-linecap="round"/>
          <line x1="150" y1="40" x2="160" y2="85" stroke="#713f12" stroke-width="10" stroke-linecap="round"/>

          <!-- Fainting Victorian Stick Figure -->
          <line x1="-100" y1="-30" x2="70" y2="10" stroke="#111" stroke-width="7"/>
          <circle cx="-110" cy="-45" r="26" fill="#fddfb0" stroke="#111" stroke-width="5"/>
          <path d="M -90 -30 Q -100 -60 -125 -50" stroke="#111" stroke-width="6" fill="none"/>
          
          <!-- Ornate Vintage Amber Apothecary Tonic Bottle -->
          <g transform="translate(160, -70) scale(1.3)">
            <rect x="-18" y="-35" width="36" height="70" rx="8" fill="#78350f" stroke="#451a03" stroke-width="3" filter="url(#cardShadow)"/>
            <rect x="-12" y="-18" width="24" height="36" fill="#fef3c7"/>
            <text x="0" y="4" font-family="serif" font-size="10" font-weight="bold" fill="#78350f" text-anchor="middle">TONIC</text>
          </g>

          ${a?`
            <!-- "DEAL WITH IT" 8-Bit Pixel Shades -->
            <g transform="translate(-110, -50) scale(0.9)">
              <rect x="-24" y="-8" width="20" height="16" fill="#000000"/>
              <rect x="4" y="-8" width="20" height="16" fill="#000000"/>
              <rect x="-4" y="-4" width="8" height="6" fill="#000000"/>
            </g>
          `:""}
        </g>
      `,a&&(d+=M({x:1240,y:620},140,e))}let u=[{id:"host_stick",state:{x:i,y:p,scale:1.34,timeSec:e,spineLean:x,isWalking:o,leftHandProp:l,pointTarget:g,expression:r,gazeTarget:g}}];return n?u.push({id:"kate_moss_stick",state:{x:1350,y:640,scale:1.28,gender:"female",hairStyle:"female_bob",clothes:"crop_top_leggings",expression:"deadpan_soul_stare",timeSec:e}}):(f||a)&&u.push({id:"victorian_patient_stick",state:{x:1380,y:640,scale:1.22,gender:"female",hairStyle:"female_long",clothes:"patient_gown",expression:a?"smug_peace_sign":"exhausted_melting",spineLean:-12,timeSec:e}}),{backgroundSvg:k+d,stickFigures:u,shake:0}}},Gt={id:"scene_08_pixarmom",name:"2010s BBL & Pixar Mom Gravitational Field",startTime:80.457,endTime:108.199,render(s){const{sceneTime:e,camera:t}=s,n=e<4.963,h=e>=4.963&&e<14.054,f=e>=14.054&&e<23.654,a=e>=23.654&&e<27.174;let i=520,p=650,x=0,o=!1,r="deadpan_classic",l,g,d="";n?(t.setTarget(960,540,1.05),i=440,x=-14,r="shock_home_alone"):h?(t.setTarget(960,540,1.08),i=440,x=8,l={x:1260,y:540},r="confused_squint"):f?(t.setTarget(960,540,1.12),i=440,x=20,g={x:1260,y:520},l={x:1260,y:460},r="fear_screaming"):a?(t.setTarget(960,540,1.05),i=440,l={x:1260,y:320},r="smug_rock_eyebrow"):(t.cutTo(440,540,1.35),i=440,r="smug_finger_guns");let k=`
      <!-- Miami South Beach Art Deco Backdrop -->
      <rect x="-4000" y="-4000" width="10000" height="10000" fill="#fdf2f8"/>
      
      <!-- Pastel Sunset Sky Gradient -->
      <rect x="-4000" y="0" width="10000" height="600" fill="#fce7f3"/>
      <circle cx="960" cy="500" r="260" fill="#fbcfe8" opacity="0.5"/> <!-- Sunset Sun -->

      <!-- Art Deco Hotel Facades on Ocean Drive -->
      <!-- Hotel 1 (Pink) -->
      <rect x="250" y="320" width="340" height="480" rx="8" fill="#f472b6" stroke="#db2777" stroke-width="6"/>
      <rect x="350" y="260" width="140" height="60" rx="20" fill="#fbcfe8" stroke="#db2777" stroke-width="5"/>
      <text x="420" y="300" font-family="'Impact', sans-serif" font-size="20" fill="#9d174d" text-anchor="middle">THE BBL</text>

      <!-- Hotel 2 (Turquoise) -->
      <rect x="640" y="280" width="380" height="520" rx="8" fill="#2dd4bf" stroke="#0d9488" stroke-width="6"/>
      <rect x="760" y="220" width="140" height="60" rx="20" fill="#99f6e4" stroke="#0d9488" stroke-width="5"/>
      <text x="830" y="260" font-family="'Impact', sans-serif" font-size="20" fill="#115e59" text-anchor="middle">CURVES</text>

      <!-- Hotel 3 (Pastel Yellow) -->
      <rect x="1070" y="340" width="360" height="460" rx="8" fill="#fde047" stroke="#ca8a04" stroke-width="6"/>

      <!-- Palm Trees on Boulevard -->
      ${[200,600,1040,1480].map(y=>`
        <path d="M ${y} 800 Q ${y+20} 500 ${y+40} 380" stroke="#78350f" stroke-width="12" fill="none"/>
        <path d="M ${y+40} 380 Q ${y-40} 320 ${y-90} 360" stroke="#16a34a" stroke-width="10" fill="none"/>
        <path d="M ${y+40} 380 Q ${y+10} 290 ${y-20} 310" stroke="#16a34a" stroke-width="10" fill="none"/>
        <path d="M ${y+40} 380 Q ${y+80} 300 ${y+120} 340" stroke="#16a34a" stroke-width="10" fill="none"/>
        <path d="M ${y+40} 380 Q ${y+100} 360 ${y+140} 420" stroke="#16a34a" stroke-width="10" fill="none"/>
      `).join("")}

      <!-- Ocean Drive Sidewalk & Street -->
      <rect x="-4000" y="800" width="10000" height="4000" fill="#475569"/>
      <line x1="-4000" y1="800" x2="6000" y2="800" stroke="#f472b6" stroke-width="8"/>
    `;if(n){const y=Math.sin(e*6)*.8,c=1400+Math.sin(y)*500,w=-50+Math.cos(y)*500;k+=`
        <g stroke="#f43f5e" stroke-width="4" opacity="0.7">
          <line x1="900" y1="200" x2="1800" y2="200" stroke-dasharray="30 15"/>
          <line x1="850" y1="300" x2="1850" y2="300" stroke-dasharray="40 20"/>
        </g>
        <line x1="1400" y1="-50" x2="${c}" y2="${w}" stroke="#475569" stroke-width="10"/>
        <circle cx="${c}" cy="${w}" r="95" fill="#f43f5e" stroke="#be123c" stroke-width="10"/>
        <text x="${c}" y="${w+14}" font-family="'Impact', sans-serif" font-size="32" fill="#ffffff" text-anchor="middle">2010s</text>
      `}else if(h)k+=`
        <!-- High-Visibility Comic Card -->
        <g transform="translate(1380, 230)">
          <rect x="-180" y="-25" width="360" height="50" rx="12" fill="#0f172a" stroke="#ec4899" stroke-width="4" filter="url(#cardShadow)"/>
          <text x="0" y="8" font-family="'Impact', sans-serif" font-size="22" fill="#f43f5e" letter-spacing="2" text-anchor="middle">
            THE 2010s BBL METAGAME
          </text>
        </g>
      `,e>8&&(d+=A({x:1380,y:560},180,100,e,"GRAVITATIONAL ANOMALY"));else if(f)k+=`
        <g stroke="#f43f5e" stroke-width="2.5" fill="none" opacity="0.65">
          <ellipse cx="1260" cy="540" rx="420" ry="140" stroke-dasharray="16 10"/>
          <ellipse cx="1260" cy="540" rx="540" ry="180" stroke-dasharray="20 12"/>
        </g>

        <!-- High-Visibility Comic Card -->
        <g transform="translate(1260, 230)">
          <rect x="-220" y="-25" width="440" height="50" rx="12" fill="#0f172a" stroke="#ec4899" stroke-width="4" filter="url(#cardShadow)"/>
          <text x="0" y="8" font-family="'Impact', sans-serif" font-size="22" fill="#f43f5e" letter-spacing="2" text-anchor="middle">
            GRAVITATIONAL PULL: 10,000G
          </text>
        </g>
      `,d+=M({x:1260,y:540},320,e);else{const y=e-23.654,c=Z(y,.22,{x:1260,y:320},280);c.impactOccurred&&y<.4&&c.screenShake;const w=850+y*180%1e3;k+=`
        <!-- Swaying Palm Trees -->
        <path d="M 1740 840 Q 1690 550 1760 380" stroke="#78350f" stroke-width="18" fill="none" stroke-linecap="round"/>
        <path d="M 1760 380 Q 1640 320 1560 360 M 1760 380 Q 1690 250 1660 200 M 1760 380 Q 1840 250 1920 260 M 1760 380 Q 1890 340 1940 400" stroke="#16a34a" stroke-width="16" fill="none" stroke-linecap="round"/>

        <!-- Miami BBL Billboard -->
        <g transform="translate(${c.x}, ${c.y}) scale(${c.scaleX}, ${c.scaleY})" opacity="${c.opacity}">
          <rect x="-220" y="-90" width="440" height="180" rx="16" fill="#fdf4ff" stroke="#ec4899" stroke-width="6" filter="url(#cardShadow)"/>
          <text x="0" y="-30" font-family="'Impact', sans-serif" font-size="34" fill="#be185d" text-anchor="middle">MIAMI CLINIC</text>
          <text x="0" y="18" font-family="sans-serif" font-size="22" font-weight="bold" fill="#0284c7" text-anchor="middle">1-Way Flight: $299</text>
          <text x="0" y="58" font-family="sans-serif" font-size="18" font-style="italic" fill="#e11d48" text-anchor="middle">"Definitely not squats"</text>
        </g>

        <!-- Jet Airliner Taking Off -->
        <g transform="translate(${w}, 180) rotate(-18) scale(1.2)">
          <path d="M -60 0 L 60 0 L 80 -15 L -40 -15 Z" fill="#ffffff" stroke="#0f172a" stroke-width="4"/>
          <polygon points="0,-15 20,-45 40,-15" fill="#38bdf8"/>
          <polygon points="-40,-15 -55,-40 -30,-15" fill="#f43f5e"/>
          <circle cx="-75" cy="-8" r="16" fill="#cbd5e1" opacity="0.8"/>
          <circle cx="-110" cy="-8" r="22" fill="#e2e8f0" opacity="0.6"/>
        </g>
      `,e>24.5&&(d+=F({x:900,y:440},{x:1200,y:380},e,"NOT SQUATS"))}let u=[{id:"host_stick",state:{x:i,y:p,scale:1.34,timeSec:e,spineLean:x,isWalking:o,pointTarget:l,leftHandTarget:g,expression:r,gazeTarget:l||g}}];return(h||f||a)&&u.push({id:"pixar_mom_stick",state:{x:1260,y:640,scale:1.28,gender:"female",hairStyle:"female_long",clothes:"crop_top_leggings",expression:f?"smug_peace_sign":"smug_chef_kiss",timeSec:e}}),{backgroundSvg:k+d,stickFigures:u,shake:0}}},Wt={id:"scene_09_hourglass_pr",name:"Overfilled Hourglass & Corporate PR Body Positivity",startTime:108.199,endTime:129.384,render(s){const{sceneTime:e,camera:t}=s,n=e<5.199,h=e>=5.199&&e<12.399,f=e>=12.399&&e<17.839,a=e>=17.839&&e<20.639,i=e>=20.639;let p=520,x=650,o=0,r=!1,l="deadpan_classic",g,d="";n?(t.setTarget(960,540,1.05),p=440,o=8,g={x:1260,y:620},l="confused_tilted_head"):h?(t.setTarget(960,540,1.08),p=440,o=10,g={x:1260,y:520},l="skeptical_side_eye"):f?(t.setTarget(960,540,1.08),p=440,g={x:1260,y:240},l="deadpan_side_glance"):a?(t.setTarget(960,540,1.12),p=440,o=-14,g={x:1260,y:520},l="cringe_teeth_grit"):(t.cutTo(440,540,1.35),p=440,l="frustration_facepalm");let k=`
      <!-- Madison Avenue Corporate PR Boardroom Backdrop -->
      <rect x="-4000" y="-4000" width="10000" height="10000" fill="#0f172a"/>
      
      <!-- Skyscraper Panoramic Window Grid -->
      <rect x="200" y="80" width="1520" height="700" rx="14" fill="#1e293b" stroke="#334155" stroke-width="8"/>
      <!-- Background Sky & Distant Tower Lights -->
      <line x1="200" y1="350" x2="1720" y2="350" stroke="#334155" stroke-width="4"/>
      <line x1="200" y1="580" x2="1720" y2="580" stroke="#334155" stroke-width="4"/>
      <line x1="680" y1="80" x2="680" y2="780" stroke="#334155" stroke-width="4"/>
      <line x1="1240" y1="80" x2="1240" y2="780" stroke="#334155" stroke-width="4"/>

      <!-- Glowing Corporate Stock Ticker on Wall -->
      <g transform="translate(300, 160)">
        <rect x="0" y="0" width="1320" height="50" rx="8" fill="#022c22" stroke="#10b981" stroke-width="3"/>
        <text x="30" y="34" font-family="'Courier New', monospace" font-size="22" font-weight="bold" fill="#34d399" filter="url(#glow)">
          ▲ GLP-1 PHARMA +420%  ▲ BBL REVISION +88%  ▼ CARBOHYDRATES -99.9%  ▲ BEAUTY STOCKS +1200%
        </text>
      </g>

      <!-- Luxury Executive Carpet Floor -->
      <rect x="-4000" y="780" width="10000" height="4000" fill="#1e1b4b"/>
      <line x1="-4000" y1="780" x2="6000" y2="780" stroke="#4338ca" stroke-width="8"/>
    `;if(n||h||f){const y=e*35%200,c=oe(e,.35,{x:1380,y:520});if(k+=`
        <!-- Ground Contact Shadow -->
        <ellipse cx="1380" cy="840" rx="220" ry="25" fill="#000000" opacity="0.2"/>

        <g id="overfilled-hourglass" transform="translate(${c.x}, ${c.y}) scale(${c.scaleX*1.2}, ${c.scaleY*1.2})">
          <!-- Victorian Brass Plates -->
          <rect x="-160" y="-230" width="320" height="28" rx="8" fill="#ca8a04" stroke="#854d0e" stroke-width="7"/>
          <rect x="-160" y="210" width="320" height="28" rx="8" fill="#ca8a04" stroke="#854d0e" stroke-width="7"/>

          <!-- Polished Brass Pillars -->
          <line x1="-140" y1="-230" x2="-140" y2="210" stroke="#eab308" stroke-width="14" stroke-linecap="round"/>
          <line x1="140" y1="-230" x2="140" y2="210" stroke="#eab308" stroke-width="14" stroke-linecap="round"/>

          <!-- Overfilled Bulb with Specular Glint -->
          <path d="
            M -90 -202
            C -90 -90 -20 -15 -10 0
            C -20 15 -190 80 -190 210
            L 190 210
            C 190 80 20 15 10 0
            C 20 -15 90 -90 90 -202 Z"
            fill="#e0f2fe" fill-opacity="0.4" stroke="#38bdf8" stroke-width="6" filter="url(#cardShadow)"/>

          <!-- Falling Gold Sand -->
          <ellipse cx="0" cy="190" rx="160" ry="35" fill="#eab308"/>
          <line x1="0" y1="0" x2="0" y2="${y}" stroke="#eab308" stroke-width="7" stroke-dasharray="10 8"/>

          ${h||f?`
            <!-- Corporate PR Construction Scaffolding & Banner with Slam Drop -->
            <g id="pr-scaffolding" transform="translate(0, 0)">
              <line x1="-180" y1="-50" x2="180" y2="-50" stroke="#f59e0b" stroke-width="12"/>
              <line x1="-180" y1="50" x2="180" y2="50" stroke="#f59e0b" stroke-width="12"/>
              <line x1="-150" y1="-50" x2="150" y2="50" stroke="#ef4444" stroke-width="7"/>
              <line x1="150" y1="-50" x2="-150" y2="50" stroke="#ef4444" stroke-width="7"/>
              
              <rect x="-150" y="-30" width="300" height="60" rx="10" fill="#fdf4ff" stroke="#ec4899" stroke-width="5" filter="url(#cardShadow)"/>
              <text x="0" y="9" font-family="'Impact', sans-serif" font-size="24" fill="#be185d" text-anchor="middle">
                "BODY POSITIVITY™"
              </text>
            </g>
          `:""}
        </g>
      `,n&&e>1.5&&(d+=A({x:1380,y:640},140,80,e,"OVERFILLED")),f){const w=Z(e-12.399,.2,{x:960,y:240},200);k+=`
          <g transform="translate(${w.x}, ${w.y}) scale(${w.scaleX}, ${w.scaleY})">
            <rect x="-180" y="-30" width="360" height="60" rx="8" fill="#ffffff" stroke="#0f172a" stroke-width="3" filter="url(#cardShadow)"/>
            <text x="0" y="8" font-family="sans-serif" font-size="14" font-weight="bold" fill="#dc2626" text-anchor="middle">
              *Offer valid until Q4 pharma rollout
            </text>
          </g>
        `,d+=F({x:740,y:450},{x:920,y:280},e,"FINE PRINT")}}else{const y=Z(e-17.839,.22,{x:1260,y:520},280);y.impactOccurred&&e-17.839<.4&&y.screenShake,k+=`
        <ellipse cx="1260" cy="840" rx="220" ry="25" fill="#000000" opacity="0.2"/>
        <g transform="translate(${y.x}, ${y.y}) scale(${y.scaleX*1.2}, ${y.scaleY*1.2})">
          <rect x="-160" y="-230" width="320" height="28" rx="8" fill="#ca8a04" stroke="#854d0e" stroke-width="7"/>
          <rect x="-160" y="210" width="320" height="28" rx="8" fill="#ca8a04" stroke="#854d0e" stroke-width="7"/>

          <!-- Peeled PR Sticker -->
          <g transform="translate(-50, -10) rotate(-22)">
            <rect x="-110" y="-28" width="220" height="56" rx="8" fill="#fdf4ff" stroke="#ec4899" stroke-width="4" opacity="0.7"/>
            <text x="0" y="9" font-family="'Impact', sans-serif" font-size="18" fill="#be185d" text-anchor="middle">"BODY POSITIVITY"</text>
          </g>

          <!-- Big Pharma Cash Vault underneath -->
          <g transform="translate(0, 30)">
            <rect x="-210" y="-60" width="420" height="130" rx="14" fill="#064e3b" stroke="#10b981" stroke-width="7" filter="url(#glow)"/>
            <text x="0" y="-12" font-family="'Impact', sans-serif" font-size="26" fill="#34d399" letter-spacing="2" text-anchor="middle">
              Q4 PHARMA REVENUE
            </text>
            <text x="0" y="38" font-family="'Courier New', monospace" font-size="32" font-weight="bold" fill="#6ee7b7" text-anchor="middle">
              +$42,000,000,000
            </text>
          </g>
        </g>
      `,a&&(d+=M({x:1260,y:520},240,e))}let u=[{id:"host_stick",state:{x:p,y:x,scale:1.34,timeSec:e,spineLean:o,isWalking:r,pointTarget:g,expression:l,gazeTarget:g}}];return(a||i)&&u.push({id:"corporate_pr_stick",state:{x:1260,y:640,scale:1.28,gender:"female",hairStyle:"female_bob",clothes:"suit",expression:"smug_rock_eyebrow",timeSec:e}}),{backgroundSvg:k+d,stickFigures:u,shake:0}}},Qt={id:"scene_10_boss_closes_tab",name:"Fidget Spinner, Podcast & Boss Closes Tab",startTime:129.384,endTime:150.857,render(s){const{sceneTime:e,camera:t}=s,n=e<6,h=e>=6&&e<8.804,f=e>=8.804&&e<17.924,a=e>=17.924&&e<20.884;let i=460,p=650,x=0,o="deadpan_classic",r="none",l="none",g,d,k="";n?(t.setTarget(960,540,1.05),i=460,r="fidget_spinner",g={x:1260,y:440},o="deadpan_classic"):h?(t.setTarget(960,540,1.05),i=460,l="mic",g={x:1260,y:480},o="crying_waterfalls"):f?(t.setTarget(960,540,1.08),i=460,x=Math.sin(e*24)*4,o="fear_sweat_freeze",g={x:1260,y:480}):a?(t.setTarget(960,540,1.15),i=460,x=18,g={x:1260,y:520},d={x:1260,y:520},o="fear_screaming"):(t.cutTo(460,540,1.35),i=460,o="exhausted_melting");let m=`
      <!-- Late Night 2:00 AM Office Cubicle Backdrop -->
      <rect x="-4000" y="-4000" width="10000" height="10000" fill="#020617"/>
      
      <!-- Cubicle Fabric Partition Walls -->
      <rect x="100" y="200" width="1720" height="600" rx="10" fill="#1e293b" stroke="#334155" stroke-width="8"/>
      <line x1="720" y1="200" x2="720" y2="800" stroke="#334155" stroke-width="8"/>
      <line x1="1340" y1="200" x2="1340" y2="800" stroke="#334155" stroke-width="8"/>

      <!-- Pinned Sticky Notes on Cubicle Wall -->
      <rect x="220" y="280" width="80" height="80" fill="#fef08a" transform="rotate(-6 220 280)" filter="url(#cardShadow)"/>
      <text x="235" y="320" font-family="sans-serif" font-size="11" font-weight="bold" fill="#713f12">DEADLINE: YESTERDAY</text>
      <rect x="340" y="290" width="80" height="80" fill="#fbcfe8" transform="rotate(8 340 290)" filter="url(#cardShadow)"/>
      <text x="355" y="330" font-family="sans-serif" font-size="11" font-weight="bold" fill="#831843">PLEASE WORK</text>

      <!-- Dim Ceiling Fluorescent Light -->
      <rect x="700" y="20" width="520" height="30" rx="6" fill="#f8fafc" opacity="${.7+Math.sin(e*30)*.15}" filter="url(#glow)"/>

      <!-- Office Carpet Floor -->
      <rect x="-4000" y="800" width="10000" height="4000" fill="#0f172a"/>
      <line x1="-4000" y1="800" x2="6000" y2="800" stroke="#1e293b" stroke-width="8"/>
    `;if(n){const c=e*1440;m+=`
        <g transform="translate(1380, 440) scale(1.35)">
          <circle cx="0" cy="0" r="170" fill="none" stroke="#38bdf8" stroke-width="5" stroke-dasharray="24 16" opacity="0.6"/>
          <circle cx="0" cy="0" r="230" fill="none" stroke="#ec4899" stroke-width="4" stroke-dasharray="32 20" opacity="0.4"/>

          <g transform="rotate(${c})">
            <circle cx="0" cy="0" r="40" fill="#0f172a" stroke="#ffffff" stroke-width="6"/>
            <g transform="rotate(0)">
              <rect x="-26" y="-130" width="52" height="130" rx="26" fill="#06b6d4" stroke="#0f172a" stroke-width="7"/>
              <circle cx="0" cy="-100" r="18" fill="#ffffff" stroke="#0f172a" stroke-width="4"/>
            </g>
            <g transform="rotate(120)">
              <rect x="-26" y="-130" width="52" height="130" rx="26" fill="#f59e0b" stroke="#0f172a" stroke-width="7"/>
              <circle cx="0" cy="-100" r="18" fill="#ffffff" stroke="#0f172a" stroke-width="4"/>
            </g>
            <g transform="rotate(240)">
              <rect x="-26" y="-130" width="52" height="130" rx="26" fill="#ec4899" stroke="#0f172a" stroke-width="7"/>
              <circle cx="0" cy="-100" r="18" fill="#ffffff" stroke="#0f172a" stroke-width="4"/>
            </g>
          </g>

          <text x="0" y="230" font-family="'Impact', sans-serif" font-size="32" fill="#0f172a" text-anchor="middle">
            3600 RPM SPEEDRUN
          </text>
        </g>
      `,k+=A({x:1380,y:440},180,180,e,"OBSOLETE IN 2 WEEKS")}else if(h)m+=`
        <g transform="translate(1380, 480) scale(1.3)">
          <line x1="0" y1="120" x2="0" y2="360" stroke="#475569" stroke-width="14"/>
          <ellipse cx="0" cy="360" rx="90" ry="24" fill="#334155"/>
          <rect x="-35" y="20" width="70" height="115" rx="35" fill="#64748b" stroke="#334155" stroke-width="7"/>
          <rect x="-26" y="30" width="52" height="46" rx="5" fill="#1e293b"/>

          <g transform="translate(0, -75)">
            <rect x="-160" y="-35" width="320" height="70" rx="12" fill="#fee2e2" stroke="#dc2626" stroke-width="5" filter="url(#cardShadow)"/>
            <text x="0" y="10" font-family="'Impact', sans-serif" font-size="26" fill="#991b1b" text-anchor="middle">
              PODCAST (0 LISTENERS)
            </text>
          </g>
        </g>
      `,k+=F({x:740,y:520},{x:1200,y:420},e,"NO AUDIENCE");else if(f)m+=`
        ${qe(1380,220,e)}
      `,k+=M({x:540,y:560},180,e);else{const c=Z(e-17.116,.18,{x:1320,y:500},300);m+=`
        ${qe(1540,220,e)}

        <!-- Browser Window Tab -->
        <g transform="translate(1320, 240)">
          <rect x="-260" y="-40" width="520" height="80" rx="12" fill="#1e293b" stroke="#0f172a" stroke-width="5" filter="url(#cardShadow)"/>
          <text x="-230" y="10" font-family="sans-serif" font-size="18" fill="#94a3b8">reddit.com/r/memes</text>
          <circle cx="220" cy="0" r="16" fill="#ef4444"/>
          <text x="220" y="7" font-family="sans-serif" font-size="18" font-weight="bold" fill="#fff" text-anchor="middle">X</text>
        </g>

        <!-- Colossal Red 3D Keycap Press Slamming -->
        <g transform="translate(${c.x}, ${c.y}) scale(${c.scaleX*1.15}, ${c.scaleY*1.15})" opacity="${c.opacity}">
          <rect x="-240" y="-80" width="480" height="160" rx="20" fill="#991b1b" stroke="#7f1d1d" stroke-width="8" filter="url(#cardShadow)"/>
          <rect x="-220" y="-70" width="440" height="130" rx="14" fill="#ef4444"/>
          <text x="0" y="16" font-family="'Impact', sans-serif" font-size="62" fill="#ffffff" letter-spacing="5" text-anchor="middle">
            Ctrl + W
          </text>
          <text x="0" y="52" font-family="sans-serif" font-size="16" font-weight="bold" fill="#fee2e2" letter-spacing="2" text-anchor="middle">
            EMERGENCY TAB CLOSE
          </text>
        </g>
      `,e>17.3&&e<19.5&&(k+=M({x:1320,y:500},300,e))}let y=[{id:"host_stick",state:{x:i,y:p,scale:1.34,timeSec:e,spineLean:x,leftHandProp:r,rightHandProp:l,pointTarget:g,leftHandTarget:d,mouthWobble:f?.9:0,expression:o,gazeTarget:f?{x:1380,y:220}:g}}];return(f||a)&&y.push({id:"boss_figure",state:{x:1380,y:640,scale:1.35,gender:"male",hairStyle:"male_short",clothes:"suit",expression:"rage_laser_eyes",pose:"hands_on_hips",timeSec:e}}),{backgroundSvg:m+k,stickFigures:y,shake:0}}},Xt={id:"scene_11_y2k_fashion",name:"Y2K Organ-Hostile Fashion & Miu Miu Micro-Belt",startTime:150.857,endTime:183.851,render(s){const{sceneTime:e,camera:t}=s,n=e<5.68,h=e>=5.68&&e<12.323,f=e>=12.323&&e<16.106,a=e>=16.106&&e<19.386,i=e>=19.386&&e<25.306;let p=440,x=650,o=0,r=!1,l="deadpan_classic",g,d="";n?(t.setTarget(960,540,1.05),p=440,o=8,g={x:1260,y:500},l="smug_rock_eyebrow"):h?(t.setTarget(960,540,1.05),p=440,o=14,g={x:1260,y:640},l="disgust_shudder"):f?(t.setTarget(960,540,1.08),p=440,g={x:1260,y:490},l="shock_eye_pop"):a?(t.setTarget(960,540,1.08),p=440,g={x:1260,y:490},l="confused_squint"):i?(t.setTarget(960,540,1.15),p=440,o=-14,g={x:1260,y:620},l="shock_eye_pop"):(t.cutTo(440,540,1.35),p=440,g={x:1260,y:480},l="deadpan_shrug");let k=`
      <!-- Y2K Cyber Mall Boutique Backdrop -->
      <rect x="-4000" y="-4000" width="10000" height="10000" fill="#f5f3ff"/>
      
      <!-- Metallic Silver Boutique Wall Panels -->
      <rect x="150" y="120" width="1620" height="660" rx="16" fill="#ede9fe" stroke="#c084fc" stroke-width="8"/>
      
      <!-- Neon Hot Pink Sign -->
      <g transform="translate(960, 180)">
        <rect x="-240" y="-40" width="480" height="80" rx="20" fill="#0f172a" stroke="#ec4899" stroke-width="6" filter="url(#glow)"/>
        <text x="0" y="14" font-family="'Impact', sans-serif" font-size="34" fill="#f472b6" letter-spacing="3" text-anchor="middle">
          ★ Y2K FASHION LAB ★
        </text>
      </g>

      <!-- Clothes Rack on Left -->
      <g transform="translate(180, 520)">
        <line x1="0" y1="0" x2="160" y2="0" stroke="#94a3b8" stroke-width="6"/>
        <line x1="10" y1="0" x2="10" y2="280" stroke="#94a3b8" stroke-width="8"/>
        <line x1="150" y1="0" x2="150" y2="280" stroke="#94a3b8" stroke-width="8"/>
        <!-- Hanging 1-inch Baby Tees -->
        <rect x="30" y="10" width="40" height="24" rx="2" fill="#f43f5e"/>
        <rect x="85" y="10" width="35" height="20" rx="2" fill="#38bdf8"/>
      </g>

      <!-- Y2K Checkerboard Boutique Floor -->
      <rect x="-4000" y="780" width="10000" height="4000" fill="#7c3aed"/>
      <line x1="-4000" y1="780" x2="6000" y2="780" stroke="#e879f9" stroke-width="8"/>
    `;if(n){const y=oe(e,.35,{x:1250,y:480});k+=`
        <g transform="translate(${y.x}, ${y.y}) scale(${y.scaleX*1.8}, ${y.scaleY*1.8})" opacity="${y.opacity}">
          <path d="M -90 -40 L 90 -40 L 110 180 L 30 180 L 15 20 L -15 20 L -30 180 L -110 180 Z" fill="#e0f2fe" stroke="#0284c7" stroke-width="6" stroke-dasharray="14 10"/>
          <rect x="-140" y="-80" width="280" height="40" rx="8" fill="#0f172a" stroke="#0284c7" stroke-width="3"/>
          <text x="0" y="-54" font-family="'Impact', sans-serif" font-size="20" fill="#38bdf8" text-anchor="middle">Y2K LOW-RISE DENIM META</text>
        </g>
      `}else if(h){const y=e-6.243,c=Z(y,.22,{x:1250,y:260},300);c.impactOccurred&&y<.4&&c.screenShake,k+=`
        <!-- Evicted Organs Grounded on Floor (Scale 2.0) -->
        <g transform="translate(1250, 640) scale(1.9)">
          ${Ct(0,0,e)}
        </g>

        <!-- Slamming Red Eviction Notice Stamp -->
        <g transform="translate(${c.x}, ${c.y}) rotate(-8) scale(${c.scaleX*1.3}, ${c.scaleY*1.3})" opacity="${c.opacity}">
          <rect x="-180" y="-50" width="360" height="100" rx="16" fill="#fee2e2" stroke="#dc2626" stroke-width="9" filter="url(#cardShadow)"/>
          <text x="0" y="14" font-family="'Impact', sans-serif" font-size="34" fill="#991b1b" letter-spacing="3" text-anchor="middle">
            EVICTION NOTICE
          </text>
          <text x="0" y="38" font-family="sans-serif" font-size="14" font-weight="bold" fill="#dc2626" text-anchor="middle">
            [ALL ORGANS MUST VACATE BY 2002]
          </text>
        </g>
      `,d+=F({x:650,y:580},{x:1050,y:640},e,"INTERNAL ORGANS LEAVING")}else if(f){const y=oe(e-12.826,.35,{x:1250,y:540});k+=`
        <g transform="translate(${y.x}, ${y.y}) scale(${y.scaleX*1.85}, ${y.scaleY*1.85})" opacity="${y.opacity}">
          <ellipse cx="0" cy="180" rx="75" ry="18" fill="#334155" stroke="#0f172a" stroke-width="4" filter="url(#cardShadow)"/>
          <line x1="0" y1="60" x2="0" y2="180" stroke="#475569" stroke-width="12"/>

          <circle cx="0" cy="-120" r="32" fill="none" stroke="#111" stroke-width="7"/>
          <line x1="0" y1="-88" x2="0" y2="30" stroke="#111" stroke-width="8"/>
          
          <!-- Napkin Baby Tee -->
          <rect x="-45" y="-75" width="90" height="52" rx="6" fill="#f43f5e" stroke="#111" stroke-width="5"/>
          <text x="0" y="-44" font-family="'Impact', sans-serif" font-size="18" fill="#fff" text-anchor="middle">BABY TEE</text>

          <polygon points="-60,-20 60,-20 90,75 -90,75" fill="#a16207" stroke="#78350f" stroke-width="7"/>
          <line x1="-25" y1="75" x2="-25" y2="178" stroke="#111" stroke-width="8"/>
          <line x1="25" y1="75" x2="25" y2="178" stroke="#111" stroke-width="8"/>

          <!-- High-Visibility Label Badge -->
          <g transform="translate(0, -180)">
            <rect x="-230" y="-30" width="460" height="60" rx="10" fill="#0f172a" stroke="#f43f5e" stroke-width="5" filter="url(#cardShadow)"/>
            <text x="0" y="8" font-family="'Impact', sans-serif" font-size="22" fill="#fda4af" letter-spacing="1" text-anchor="middle">
              ACTUAL SIZE: DINNER NAPKIN
            </text>
          </g>
        </g>
      `,d+=A({x:1250,y:440},140,90,e,"4x4 INCHES")}else if(a){const y=Math.sin((e-19.386)*8)*Math.exp(-(e-19.386)*.3)*22;k+=`
        <g transform="translate(1250, 540) scale(1.85)">
          <ellipse cx="0" cy="180" rx="75" ry="18" fill="#334155" stroke="#0f172a" stroke-width="4" filter="url(#cardShadow)"/>
          <line x1="0" y1="-10" x2="0" y2="180" stroke="#475569" stroke-width="12"/>

          <circle cx="0" cy="-120" r="32" fill="none" stroke="#111" stroke-width="7"/>
          <line x1="0" y1="-88" x2="0" y2="30" stroke="#111" stroke-width="8"/>
          <rect x="-45" y="-75" width="90" height="52" rx="6" fill="#f43f5e" stroke="#111" stroke-width="5"/>
          <text x="0" y="-44" font-family="'Impact', sans-serif" font-size="18" fill="#fff" text-anchor="middle">BABY TEE</text>

          <!-- Microscopic 1-Inch Leather Belt -->
          <rect x="-70" y="-20" width="140" height="26" rx="4" fill="#78350f" stroke="#451a03" stroke-width="6"/>
          <rect x="-15" y="-26" width="30" height="38" rx="5" fill="#eab308" stroke="#a16207" stroke-width="4"/>

          <line x1="-25" y1="-10" x2="-25" y2="178" stroke="#111" stroke-width="8"/>
          <line x1="25" y1="-10" x2="25" y2="178" stroke="#111" stroke-width="8"/>

          <!-- Dangling Gold Foil $2,400.00 Price Tag on String -->
          <g transform="translate(70, -10) rotate(${y})">
            <line x1="0" y1="0" x2="55" y2="55" stroke="#94a3b8" stroke-width="4.5" stroke-dasharray="6 4"/>
            <g transform="translate(55, 55) rotate(10)">
              <polygon points="-15,-5 240,-35 270,65 15,95" fill="#fef08a" stroke="#ca8a04" stroke-width="6" filter="url(#glow)"/>
              <circle cx="15" cy="18" r="8" fill="#78350f"/>
              <text x="135" y="42" font-family="'Impact', sans-serif" font-size="42" fill="#dc2626" text-anchor="middle">
                $2,400.00
              </text>
            </g>
          </g>
        </g>
      `,d+=A({x:1450,y:580},180,110,e,"JUST A BELT"),d+=M({x:1450,y:580},220,e)}else{const y=Z(e-25.914,.2,{x:1250,y:480},220);k+=`
        <g transform="translate(${y.x}, ${y.y}) scale(${y.scaleX*1.4}, ${y.scaleY*1.4})" opacity="${y.opacity}">
          <rect x="-240" y="-120" width="480" height="240" rx="16" fill="#0f172a" stroke="#ef4444" stroke-width="7" filter="url(#cardShadow)"/>
          <text x="0" y="-60" font-family="'Impact', sans-serif" font-size="34" fill="#ef4444" text-anchor="middle">
            [ERROR 404]
          </text>
          <text x="0" y="-15" font-family="sans-serif" font-size="20" font-weight="bold" fill="#ffffff" text-anchor="middle">
            DIGESTIVE SYSTEM INCOMPATIBLE
          </text>
          <text x="0" y="22" font-family="sans-serif" font-size="17" fill="#94a3b8" text-anchor="middle">
            WITH CURRENT FASHION META
          </text>
          
          <g transform="translate(0, 75)">
            <rect x="-45" y="-18" width="90" height="36" rx="5" fill="#fef3c7" stroke="#d97706" stroke-width="4"/>
            <circle cx="-20" cy="0" r="2.5" fill="#b45309"/>
            <circle cx="0" cy="0" r="2.5" fill="#b45309"/>
            <circle cx="20" cy="0" r="2.5" fill="#b45309"/>
          </g>
        </g>
      `}let u=[{id:"host_stick",state:{x:p,y:x,scale:1.34,timeSec:e,spineLean:o,isWalking:r,pointTarget:g,expression:l,gazeTarget:g}}];return(n||f||a||i)&&u.push({id:"y2k_model_stick",state:{x:1260,y:640,scale:1.28,gender:"female",hairStyle:"female_ponytail",clothes:"crop_top_leggings",expression:i?"smug_peace_sign":"smug_chef_kiss",pose:i?"waving":"hands_on_hips",timeSec:e}}),{backgroundSvg:k+d,stickFigures:u,shake:0}}},Zt={id:"scene_12_glp1_cheat_code",name:"GLP-1 Cheat Code, Chained Stomach & French Baguette",startTime:183.92,endTime:238.74,render(s){const{sceneTime:e,camera:t}=s,n=e<13.78,h=e>=13.78&&e<18.48,f=e>=18.48&&e<23.736,a=e>=23.736&&e<26.993,i=e>=26.993&&e<40.513,p=e>=40.513&&e<46.327,x=e>=46.327&&e<51.88;let o=420,r=650,l=8,g=!1,d="deadpan_classic",k="",m="",u=[];if(n){e<6?t.cutTo(960,540,1.05):t.cutTo(1260,480,1.28);const y=Math.min(1,e/1.5);o=260+y*160,g=y<1,l=8,d=e<6?"deadpan_classic":"smug_rock_eyebrow",m=`
        <!-- High-Tech Pharmacy Backdrop -->
        <rect x="-4000" y="-4000" width="10000" height="10000" fill="#f0fdfa"/>
        <rect x="150" y="80" width="1620" height="720" rx="14" fill="#ccfbf1" stroke="#14b8a6" stroke-width="8"/>
        
        <!-- Pharmacy Shelves with Medicine Bottles -->
        ${[200,340,480,620].map(c=>`
          <line x1="200" y1="${c}" x2="800" y2="${c}" stroke="#0d9488" stroke-width="6"/>
          ${[240,320,400,480,560,640,720].map(w=>`
            <rect x="${w}" y="${c-50}" width="36" height="50" rx="4" fill="#ffffff" stroke="#0f766e" stroke-width="3"/>
            <rect x="${w+4}" y="${c-60}" width="28" height="10" rx="2" fill="#f43f5e"/>
          `).join("")}
        `).join("")}

        <!-- Pharmacy Tile Floor -->
        <rect x="-4000" y="800" width="10000" height="4000" fill="#0f766e"/>
        <line x1="-4000" y1="800" x2="6000" y2="800" stroke="#14b8a6" stroke-width="8"/>
      `,u.push({id:"host_stick",state:{x:o,y:r,scale:1.32,timeSec:e,spineLean:l,isWalking:g,pointTarget:{x:1260,y:480},expression:d}}),k+=A({x:1260,y:480},190,130,e,"GLP-1 AGONIST")}else if(h)t.cutTo(1260,520,1.22),o=380,l=-10,d="shock_eye_pop",m=`
        <!-- Hospital Clinic Examination Room -->
        <rect x="-4000" y="-4000" width="10000" height="10000" fill="#f0f9ff"/>
        <rect x="150" y="80" width="1620" height="720" rx="14" fill="#e0f2fe" stroke="#0284c7" stroke-width="8"/>
        
        <!-- Hospital Floor -->
        <rect x="-4000" y="800" width="10000" height="4000" fill="#64748b"/>
        <line x1="-4000" y1="800" x2="6000" y2="800" stroke="#38bdf8" stroke-width="8"/>
      `,u.push({id:"host_stick",state:{x:o,y:r,scale:1.3,timeSec:e,spineLean:l,pointTarget:{x:1260,y:520},expression:d}},{id:"pharma_doctor",state:{x:1260,y:640,scale:1.3,gender:"doctor",hairStyle:"doctor_cap",clothes:"doctor_scrubs",expression:"smug_rock_eyebrow",rightHandProp:"syringe",timeSec:e}}),k+=M({x:1260,y:480},240,e);else if(f){t.cutTo(1260,500,1.3),o=380,l=-16,d="cringe_teeth_grit";const y=((e-18.48)*.08).toFixed(2);m=`
        <!-- X-Ray Digestive Radiology Lab -->
        <rect x="-4000" y="-4000" width="10000" height="10000" fill="#020617"/>
        <rect x="150" y="80" width="1620" height="720" rx="14" fill="#0f172a" stroke="#38bdf8" stroke-width="8"/>
        
        <!-- Dial-Up Gastric Emptying Progress Bar -->
        <g transform="translate(1260, 200)">
          <rect x="-260" y="-30" width="520" height="60" rx="10" fill="#0f172a" stroke="#f59e0b" stroke-width="4"/>
          <rect x="-240" y="-10" width="${Math.min(480,(e-18.48)*90)}" height="20" rx="4" fill="#f59e0b"/>
          <text x="0" y="22" font-family="'Courier New', monospace" font-size="14" font-weight="bold" fill="#fef08a" text-anchor="middle">
            GASTRIC SPEED: 56k DIAL-UP [${y} KB/s]
          </text>
        </g>

        <!-- Lab Floor -->
        <rect x="-4000" y="800" width="10000" height="4000" fill="#020617"/>
        <line x1="-4000" y1="800" x2="6000" y2="800" stroke="#38bdf8" stroke-width="8"/>
      `,u.push({id:"host_stick",state:{x:o,y:r,scale:1.3,timeSec:e,spineLean:l,pointTarget:{x:1260,y:520},expression:d}},{id:"patient_stomach_shiver",state:{x:1260,y:640,scale:1.25,gender:"male",hairStyle:"male_short",clothes:"patient_gown",expression:"disgust_shudder",pose:"hands_on_hips",timeSec:e}}),k+=F({x:740,y:520},{x:1080,y:480},e,"0 MOTILITY")}else a?(t.cutTo(1260,520,1.25),o=380,l=10,d="confused_squint",m=`
        <!-- Grand Luxury Banquet Room -->
        <rect x="-4000" y="-4000" width="10000" height="10000" fill="#450a0a"/>
        <rect x="150" y="80" width="1620" height="720" rx="14" fill="#7f1d1d" stroke="#ca8a04" stroke-width="8"/>
        
        <!-- Floor -->
        <rect x="-4000" y="800" width="10000" height="4000" fill="#1c1917"/>
        <line x1="-4000" y1="800" x2="6000" y2="800" stroke="#ca8a04" stroke-width="8"/>
      `,u.push({id:"host_stick",state:{x:o,y:r,scale:1.3,timeSec:e,spineLean:l,pointTarget:{x:1260,y:520},expression:d}},{id:"cracker_fainter",state:{x:1260,y:640,scale:1.25,gender:"female",hairStyle:"female_ponytail",clothes:"dress_pink",expression:"exhausted_melting",spineLean:-20,timeSec:e}}),k+=A({x:1260,y:520},140,100,e,"ENTIRE MEAL")):i?(e<33.5?t.cutTo(540,500,1.25):t.cutTo(1380,500,1.25),m=`
        <!-- Split Screen Environment -->
        <rect x="-4000" y="-4000" width="10000" height="10000" fill="#0f172a"/>
        
        <!-- LEFT PANEL: Hardcore Gym Hell -->
        <rect x="150" y="80" width="780" height="720" rx="12" fill="#7f1d1d" stroke="#ef4444" stroke-width="6"/>
        <text x="540" y="150" font-family="'Impact', sans-serif" font-size="28" fill="#fca5a5" text-anchor="middle">
          2 HRS TREADMILL + KALE
        </text>

        <!-- RIGHT PANEL: 1-Second Shot Luxury Spa -->
        <rect x="990" y="80" width="780" height="720" rx="12" fill="#064e3b" stroke="#34d399" stroke-width="6"/>
        <text x="1380" y="150" font-family="'Impact', sans-serif" font-size="28" fill="#6ee7b7" text-anchor="middle">
          1-SECOND WEEKLY SHOT
        </text>
      `,u.push({id:"gym_sufferer",state:{x:540,y:650,scale:1.22,gender:"male",hairStyle:"male_short",clothes:"hoodie",expression:"exhausted_melting",isWalking:!0,timeSec:e}},{id:"spa_chiller",state:{x:1380,y:650,scale:1.25,gender:"female",hairStyle:"female_blonde",clothes:"bathrobe",expression:"blissful_serenity",timeSec:e}})):p?(t.cutTo(1260,520,1.25),o=380,l=10,d="skeptical_side_eye",m=`
        <!-- Hollywood Gala Red Carpet Stage -->
        <rect x="-4000" y="-4000" width="10000" height="10000" fill="#18181b"/>
        <rect x="150" y="80" width="1620" height="720" rx="14" fill="#27272a" stroke="#eab308" stroke-width="8"/>
        
        <!-- Floor -->
        <rect x="-4000" y="800" width="10000" height="4000" fill="#991b1b"/>
        <line x1="-4000" y1="800" x2="6000" y2="800" stroke="#ca8a04" stroke-width="8"/>
      `,u.push({id:"host_stick",state:{x:o,y:r,scale:1.3,timeSec:e,spineLean:l,pointTarget:{x:1260,y:520},expression:d}},{id:"oxygen_diet_female",state:{x:1260,y:640,scale:1.28,gender:"female",hairStyle:"female_long",clothes:"dress_pink",expression:"smug_chef_kiss",pose:"waving",timeSec:e}}),k+=M({x:1260,y:480},220,e)):x?(t.cutTo(1320,460,1.3),o=380,l=-14,d="fear_screaming",m=`
        <!-- Dark Messy Bedroom at 3:00 AM -->
        <rect x="-4000" y="-4000" width="10000" height="10000" fill="#020617"/>
        <rect x="150" y="80" width="1620" height="720" rx="14" fill="#0f172a" stroke="#1e293b" stroke-width="8"/>
        
        <!-- Huge Glowing iPhone: Texting Your Ex -->
        <g transform="translate(1320, 460)" filter="url(#cardShadow)">
          <rect x="-100" y="-170" width="200" height="340" rx="26" fill="#18181b" stroke="#38bdf8" stroke-width="6"/>
          <!-- Text Bubble -->
          <rect x="-80" y="-120" width="160" height="90" rx="12" fill="#22c55e"/>
          <text x="-70" y="-90" font-family="sans-serif" font-size="14" font-weight="bold" fill="#ffffff">
            Hey... u awake?
          </text>
          <text x="-70" y="-60" font-family="sans-serif" font-size="14" font-weight="bold" fill="#ffffff">
            I miss us 😭💔
          </text>
        </g>

        <!-- Floor -->
        <rect x="-4000" y="800" width="10000" height="4000" fill="#020617"/>
        <line x1="-4000" y1="800" x2="6000" y2="800" stroke="#1e293b" stroke-width="8"/>
      `,u.push({id:"host_stick",state:{x:o,y:r,scale:1.3,timeSec:e,spineLean:l,pointTarget:{x:1320,y:460},expression:d}},{id:"bed_texter",state:{x:1050,y:640,scale:1.25,gender:"male",hairStyle:"male_short",clothes:"hoodie",expression:"fear_panic_run",timeSec:e}}),k+=A({x:1320,y:460},140,200,e,"DO NOT SEND")):(t.cutTo(1260,500,1.22),o=380,l=0,d="smug_finger_guns",m=`
        <!-- Charming Parisian French Bakery -->
        <rect x="-4000" y="-4000" width="10000" height="10000" fill="#fef3c7"/>
        <rect x="150" y="80" width="1620" height="720" rx="14" fill="#fffbeb" stroke="#d97706" stroke-width="8"/>
        
        <!-- Red & White Striped Awning -->
        <g transform="translate(1260, 140)">
          ${[-300,-240,-180,-120,-60,0,60,120,180,240,300].map((y,c)=>`
            <rect x="${y}" y="-40" width="60" height="80" fill="${c%2===0?"#dc2626":"#ffffff"}" stroke="#991b1b" stroke-width="3"/>
          `).join("")}
        </g>

        <!-- Floor -->
        <rect x="-4000" y="800" width="10000" height="4000" fill="#78716c"/>
        <line x1="-4000" y1="800" x2="6000" y2="800" stroke="#d97706" stroke-width="8"/>
      `,u.push({id:"host_stick",state:{x:o,y:r,scale:1.3,timeSec:e,spineLean:l,expression:d}},{id:"french_baker_female",state:{x:1260,y:640,scale:1.28,gender:"female",hairStyle:"female_long",clothes:"dress_pink",rightHandProp:"bread",expression:"smug_chef_kiss",timeSec:e}}),k+=M({x:1260,y:480},240,e));return{backgroundSvg:m+k,stickFigures:u,shake:0}}},Ut={id:"scene_13_hollywood_denial",name:"Hollywood Denial: Gale, Couch Coins & Firehose",startTime:238.74,endTime:308.2,render(s){const{sceneTime:e,camera:t}=s,n=e<14.47,h=e>=14.47&&e<24.777,f=e>=24.777&&e<30.517,a=e>=30.517&&e<38.387,i=e>=38.387&&e<51.874,p=e>=51.874&&e<60.342;let x=420,o=650,r=8,l="deadpan_classic",g="",d="",k=[];return n?(t.cutTo(1260,480,1.25),x=380,r=14,l="deadpan_classic",d=`
        <!-- Windy Outdoor Premiere Street -->
        <rect x="-4000" y="-4000" width="10000" height="10000" fill="#e0f2fe"/>
        <rect x="150" y="80" width="1620" height="720" rx="14" fill="#bae6fd" stroke="#0284c7" stroke-width="8"/>
        
        <!-- Bending Palm Trees in Gale Force Wind -->
        <g transform="translate(1400, 800)">
          <path d="M 0 0 Q -100 -250 -220 -450" stroke="#78350f" stroke-width="18" fill="none"/>
          <path d="M -220 -450 Q -380 -480 -450 -420" stroke="#16a34a" stroke-width="14" fill="none"/>
          <path d="M -220 -450 Q -340 -540 -400 -520" stroke="#16a34a" stroke-width="14" fill="none"/>
        </g>

        <!-- Red Carpet Boulevard Floor -->
        <rect x="-4000" y="800" width="10000" height="4000" fill="#991b1b"/>
        <line x1="-4000" y1="800" x2="6000" y2="800" stroke="#ca8a04" stroke-width="8"/>
      `,k.push({id:"host_stick",state:{x,y:o,scale:1.3,timeSec:e,spineLean:r,pointTarget:{x:1260,y:450},expression:l}},{id:"flying_actress",state:{x:1260-e*20,y:500-Math.sin(e*3)*40,scale:1.22,gender:"female",hairStyle:"female_blonde",clothes:"dress_pink",expression:"shock_speed_zoom",leftArmAngle1:-80,leftArmAngle2:-20,rightArmAngle1:60,rightArmAngle2:30,spineLean:-25,timeSec:e}}),g+=M({x:1260,y:480},240,e)):h?(t.cutTo(1260,500,1.25),x=380,r=-10,l="skeptical_raised_brow",d=`
        <!-- Hollywood Step-and-Repeat Wall -->
        <rect x="-4000" y="-4000" width="10000" height="10000" fill="#1e1b4b"/>
        <rect x="150" y="80" width="1620" height="720" rx="14" fill="#312e81" stroke="#6366f1" stroke-width="8"/>
        ${[200,450,700,950,1200,1450,1700].map(m=>`
          <text x="${m}" y="180" font-family="'Impact', sans-serif" font-size="18" fill="#a5b4fc" text-anchor="middle">★ HOLLYWOOD ★</text>
          <text x="${m}" y="320" font-family="'Impact', sans-serif" font-size="18" fill="#818cf8" text-anchor="middle">★ DIET & EXERCISE ★</text>
        `).join("")}

        <!-- Microphones Thrusting In -->
        <g transform="translate(1260, 560)">
          <g transform="translate(-120, 40) rotate(-35)">
            <rect x="-10" y="-40" width="20" height="50" rx="4" fill="#ef4444"/>
            <circle cx="0" cy="-45" r="14" fill="#111"/>
            <line x1="0" y1="10" x2="0" y2="80" stroke="#94a3b8" stroke-width="6"/>
          </g>
          <g transform="translate(120, 40) rotate(35)">
            <rect x="-10" y="-40" width="20" height="50" rx="4" fill="#3b82f6"/>
            <circle cx="0" cy="-45" r="14" fill="#111"/>
            <line x1="0" y1="10" x2="0" y2="80" stroke="#94a3b8" stroke-width="6"/>
          </g>
        </g>

        <!-- Red Carpet Floor -->
        <rect x="-4000" y="800" width="10000" height="4000" fill="#991b1b"/>
        <line x1="-4000" y1="800" x2="6000" y2="800" stroke="#ca8a04" stroke-width="8"/>
      `,k.push({id:"host_stick",state:{x,y:o,scale:1.3,timeSec:e,spineLean:r,pointTarget:{x:1260,y:520},expression:l}},{id:"celebrity_female",state:{x:1260,y:640,scale:1.28,gender:"female",hairStyle:"female_long",clothes:"dress_pink",expression:"smug_chef_kiss",timeSec:e}}),g+=A({x:1260,y:480},200,120,e,"HOLLYWOOD SPEAK")):f?(t.cutTo(1260,500,1.25),x=380,r=12,l="smug_rock_eyebrow",d=`
        <!-- Living Room with Giant Retro Sofa -->
        <rect x="-4000" y="-4000" width="10000" height="10000" fill="#fef3c7"/>
        <rect x="150" y="80" width="1620" height="720" rx="14" fill="#fef08a" opacity="0.3"/>
        
        <!-- Giant Green Velvet Couch -->
        <g transform="translate(1260, 600)">
          <!-- Couch Back -->
          <rect x="-240" y="-120" width="480" height="140" rx="20" fill="#065f46" stroke="#047857" stroke-width="8"/>
          <!-- Couch Cushions -->
          <rect x="-220" y="20" width="140" height="80" rx="12" fill="#047857"/>
          <rect x="-70" y="20" width="140" height="80" rx="12" fill="#047857"/>
          <rect x="80" y="20" width="140" height="80" rx="12" fill="#047857"/>
        </g>

        <!-- Wood Floor -->
        <rect x="-4000" y="800" width="10000" height="4000" fill="#78350f"/>
        <line x1="-4000" y1="800" x2="6000" y2="800" stroke="#451a03" stroke-width="8"/>
      `,k.push({id:"host_stick",state:{x,y:o,scale:1.3,timeSec:e,spineLean:r,pointTarget:{x:1260,y:520},expression:l}},{id:"diving_stickman",state:{x:1260,y:540,scale:1.25,gender:"male",hairStyle:"male_short",clothes:"hoodie",expression:"shock_jaw_drop",rotation:180,timeSec:e}}),g+=F({x:740,y:520},{x:1080,y:480},e,"LOOSE CHANGE")):a?(t.cutTo(1260,480,1.25),x=380,r=-8,l="smug_chef_kiss",d=`
        <!-- Grand Hollywood Gaslighting Awards Hall -->
        <rect x="-4000" y="-4000" width="10000" height="10000" fill="#0f172a"/>
        <rect x="150" y="80" width="1620" height="720" rx="14" fill="#1e293b" stroke="#ca8a04" stroke-width="8"/>
        
        <!-- Giant Golden Oscar for Gaslighting -->
        <g transform="translate(1260, 460)" filter="url(#cardShadow)">
          <rect x="-80" y="140" width="160" height="50" rx="8" fill="#78350f" stroke="#ca8a04" stroke-width="4"/>
          <text x="0" y="172" font-family="'Impact', sans-serif" font-size="18" fill="#facc15" text-anchor="middle">
            BEST GASLIGHTING 2024
          </text>
        </g>

        <!-- Red Carpet Stage Floor -->
        <rect x="-4000" y="800" width="10000" height="4000" fill="#881337"/>
        <line x1="-4000" y1="800" x2="6000" y2="800" stroke="#ca8a04" stroke-width="8"/>
      `,k.push({id:"host_stick",state:{x,y:o,scale:1.3,timeSec:e,spineLean:r,pointTarget:{x:1260,y:500},expression:l}},{id:"gaslight_winner",state:{x:1260,y:640,scale:1.28,gender:"female",hairStyle:"female_blonde",clothes:"dress_pink",expression:"smug_finger_guns",timeSec:e}}),g+=M({x:1260,y:480},240,e)):i?(e<43?t.cutTo(400,480,1.25):e<47.5?t.cutTo(930,480,1.25):t.cutTo(1460,480,1.25),d=`
        <!-- 3-Way Comic Split Screen -->
        <rect x="-4000" y="-4000" width="10000" height="10000" fill="#020617"/>
        
        <!-- PANEL 1: Water Submersion -->
        <rect x="150" y="80" width="500" height="720" rx="10" fill="#0284c7" stroke="#38bdf8" stroke-width="5"/>
        <text x="400" y="140" font-family="'Impact', sans-serif" font-size="22" fill="#ffffff" text-anchor="middle">
          1. "MORE WATER"
        </text>

        <!-- PANEL 2: Sahara Long Walks -->
        <rect x="680" y="80" width="500" height="720" rx="10" fill="#d97706" stroke="#fbbf24" stroke-width="5"/>
        <text x="930" y="140" font-family="'Impact', sans-serif" font-size="22" fill="#ffffff" text-anchor="middle">
          2. "LONG WALKS"
        </text>

        <!-- PANEL 3: Cryo Stasis 8 Hours Sleep -->
        <rect x="1210" y="80" width="500" height="720" rx="10" fill="#1e1b4b" stroke="#818cf8" stroke-width="5"/>
        <text x="1460" y="140" font-family="'Impact', sans-serif" font-size="22" fill="#ffffff" text-anchor="middle">
          3. "8 HRS SLEEP"
        </text>
      `,k.push({id:"water_female",state:{x:400,y:650,scale:1.2,gender:"female",hairStyle:"female_ponytail",clothes:"crop_top_leggings",expression:"shock_eye_pop",timeSec:e}},{id:"desert_walker",state:{x:930,y:650,scale:1.2,gender:"male",hairStyle:"male_short",clothes:"hoodie",expression:"exhausted_melting",isWalking:!0,timeSec:e}},{id:"cryo_sleeper",state:{x:1460,y:650,scale:1.2,gender:"male",hairStyle:"male_short",clothes:"patient_gown",expression:"sleeping_drool",timeSec:e}})):p?(t.cutTo(1260,480,1.25),x=380,r=-14,l="confused_squint",d=`
        <!-- French Gourmet Cheese Shop Backdrop -->
        <rect x="-4000" y="-4000" width="10000" height="10000" fill="#fef3c7"/>
        <rect x="150" y="80" width="1620" height="720" rx="14" fill="#fef08a" opacity="0.3"/>
        
        <!-- Hanging Giant Cheese Wheels -->
        ${[750,950,1550,1720].map(m=>`
          <line x1="${m}" y1="80" x2="${m}" y2="220" stroke="#78350f" stroke-width="4"/>
          <ellipse cx="${m}" cy="240" rx="40" ry="24" fill="#facc15" stroke="#ca8a04" stroke-width="4"/>
        `).join("")}

        <!-- Floor -->
        <rect x="-4000" y="800" width="10000" height="4000" fill="#78350f"/>
        <line x1="-4000" y1="800" x2="6000" y2="800" stroke="#ca8a04" stroke-width="8"/>
      `,k.push({id:"host_stick",state:{x,y:o,scale:1.3,timeSec:e,spineLean:r,pointTarget:{x:1260,y:520},expression:l}},{id:"cheese_refuser",state:{x:1260,y:640,scale:1.28,gender:"female",hairStyle:"female_bob",clothes:"dress_pink",expression:"disgust_pinched_nose",pose:"hands_on_hips",timeSec:e}}),g+=A({x:1260,y:480},180,120,e,"ZERO DAIRY")):(t.cutTo(1260,500,1.2),x=360,r=14,l="shock_eye_pop",d=`
        <!-- Industrial Fire Station Hydration Climax -->
        <rect x="-4000" y="-4000" width="10000" height="10000" fill="#0f172a"/>
        <rect x="150" y="80" width="1620" height="720" rx="14" fill="#1e293b" stroke="#ef4444" stroke-width="8"/>
        
        <!-- Giant Red Fire Hydrant Blasting 10,000 PSI Water Stream -->
        <g transform="translate(850, 580)">
          <rect x="-40" y="-80" width="80" height="180" rx="16" fill="#dc2626" stroke="#991b1b" stroke-width="6"/>
          <circle cx="0" cy="-80" r="30" fill="#ef4444"/>
          <!-- Massive Water Torrent Cannon -->
          <path d="M 40 -30 Q 300 -120 700 -20 Q 750 30 700 80 Q 300 20 40 30 Z" fill="#38bdf8" opacity="0.9" filter="url(#glow)"/>
          <text x="350" y="10" font-family="'Impact', sans-serif" font-size="34" fill="#ffffff" text-anchor="middle">
            HYDRATION 10,000 PSI 🌊
          </text>
        </g>

        <!-- Floor -->
        <rect x="-4000" y="800" width="10000" height="4000" fill="#020617"/>
        <line x1="-4000" y1="800" x2="6000" y2="800" stroke="#38bdf8" stroke-width="8"/>
      `,k.push({id:"host_stick",state:{x,y:o,scale:1.3,timeSec:e,spineLean:r,expression:l}},{id:"blasted_female",state:{x:1380,y:580,scale:1.25,gender:"female",hairStyle:"female_blonde",clothes:"dress_pink",expression:"fear_panic_run",spineLean:-25,timeSec:e}}),g+=M({x:1260,y:480},280,e)),{backgroundSvg:d+g,stickFigures:k,shake:0}}},jt={id:"scene_14_mcu_superhero",name:"MCU Superhero Dehydration, Shrink-Wrapped Ham & Boiled Chicken",startTime:308.2,endTime:349.46,render(s){const{sceneTime:e,camera:t}=s,n=e<6.461,h=e>=6.461&&e<16.319,f=e>=16.319&&e<26.079;let a=420,i=650,p=8,x="deadpan_classic",o="",r="",l=[];return n?(t.cutTo(960,540,1.05),r=`
        <!-- Split-Screen Background -->
        <rect x="-4000" y="-4000" width="10000" height="10000" fill="#0f172a"/>
        
        <!-- LEFT: Actresses Runway -->
        <rect x="150" y="80" width="780" height="720" rx="12" fill="#831843" stroke="#f472b6" stroke-width="6"/>
        <text x="540" y="150" font-family="'Impact', sans-serif" font-size="28" fill="#fbcfe8" text-anchor="middle">
          ACTRESSES: DANGEROUSLY THIN
        </text>

        <!-- RIGHT: Actors MCU Superhero Poster -->
        <rect x="990" y="80" width="780" height="720" rx="12" fill="#1e3a8a" stroke="#60a5fa" stroke-width="6"/>
        <text x="1380" y="150" font-family="'Impact', sans-serif" font-size="28" fill="#93c5fd" text-anchor="middle">
          ACTORS: MCU SHREDDED
        </text>
        
        <!-- Floor -->
        <rect x="-4000" y="800" width="10000" height="4000" fill="#020617"/>
        <line x1="-4000" y1="800" x2="6000" y2="800" stroke="#f472b6" stroke-width="8"/>
      `,l.push({id:"actress_female",state:{x:540,y:650,scale:1.22,gender:"female",hairStyle:"female_blonde",clothes:"dress_pink",expression:"smug_finger_guns",timeSec:e}},{id:"superhero_bodybuilder",state:{x:1380,y:650,scale:1.28,gender:"bodybuilder",hairStyle:"bodybuilder_bald",clothes:"bodybuilder_tank",expression:"rage_clenched_fists",timeSec:e}})):h?(t.cutTo(1260,500,1.25),a=380,p=-14,x="shock_eye_pop",r=`
        <!-- Hardcore Industrial Bodybuilding Gym -->
        <rect x="-4000" y="-4000" width="10000" height="10000" fill="#1c1917"/>
        <rect x="150" y="80" width="1620" height="720" rx="14" fill="#7f1d1d" stroke="#450a0a" stroke-width="8"/>
        
        <!-- Barbell Weights on Floor -->
        <g transform="translate(1260, 520)">
          <line x1="-120" y1="0" x2="120" y2="0" stroke="#94a3b8" stroke-width="10" stroke-linecap="round"/>
          <circle cx="-100" cy="0" r="45" fill="#111" stroke="#334155" stroke-width="4"/>
          <circle cx="100" cy="0" r="45" fill="#111" stroke="#334155" stroke-width="4"/>
          <text x="-100" y="6" font-family="'Impact', sans-serif" font-size="16" fill="#fff" text-anchor="middle">45</text>
          <text x="100" y="6" font-family="'Impact', sans-serif" font-size="16" fill="#fff" text-anchor="middle">45</text>
        </g>

        <!-- Gym Mat Floor -->
        <rect x="-4000" y="800" width="10000" height="4000" fill="#0c0a09"/>
        <line x1="-4000" y1="800" x2="6000" y2="800" stroke="#f59e0b" stroke-width="8"/>
      `,l.push({id:"host_stick",state:{x:a,y:i,scale:1.3,timeSec:e,spineLean:p,pointTarget:{x:1260,y:520},expression:x}},{id:"gym_bodybuilder",state:{x:1260,y:640,scale:1.32,gender:"bodybuilder",hairStyle:"bodybuilder_bald",clothes:"bodybuilder_tank",expression:"rage_furious_screaming",pose:"mind_blown",timeSec:e}}),o+=M({x:1260,y:480},240,e)):f?(t.cutTo(1260,520,1.25),a=380,p=-12,x="disgust_shudder",r=`
        <!-- Industrial Depressing Meal Prep Kitchen -->
        <rect x="-4000" y="-4000" width="10000" height="10000" fill="#0f172a"/>
        <rect x="150" y="80" width="1620" height="720" rx="14" fill="#334155" stroke="#64748b" stroke-width="8"/>
        
        <!-- Stacks of Grey Tupperware Meal Prep Containers -->
        ${[850,950,1550,1650].map(g=>`
          ${[300,380,460,540].map(d=>`
            <rect x="${g-40}" y="${d}" width="80" height="40" rx="6" fill="#475569" stroke="#94a3b8" stroke-width="3"/>
            <rect x="${g-30}" y="${d+8}" width="30" height="24" rx="4" fill="#cbd5e1"/>
            <circle cx="${g+18}" cy="${d+20}" r="10" fill="#15803d"/>
          `).join("")}
        `).join("")}

        <!-- Kitchen Floor -->
        <rect x="-4000" y="800" width="10000" height="4000" fill="#1e293b"/>
        <line x1="-4000" y1="800" x2="6000" y2="800" stroke="#64748b" stroke-width="8"/>
      `,l.push({id:"host_stick",state:{x:a,y:i,scale:1.3,timeSec:e,spineLean:p,pointTarget:{x:1260,y:550},expression:x}},{id:"crying_mealprepper",state:{x:1260,y:640,scale:1.25,gender:"male",hairStyle:"male_short",clothes:"hoodie",expression:"crying_waterfalls",leftArmAngle1:140,leftArmAngle2:-70,spineLean:14,timeSec:e}}),o+=A({x:1260,y:520},180,100,e,"0 SEASONING")):(t.cutTo(1260,500,1.25),a=380,p=0,x="smug_rock_eyebrow",r=`
        <!-- Secret TRT Locker Room -->
        <rect x="-4000" y="-4000" width="10000" height="10000" fill="#1e1b4b"/>
        <rect x="150" y="80" width="1620" height="720" rx="14" fill="#312e81" stroke="#818cf8" stroke-width="8"/>
        
        <!-- 4:00 AM Digital Clock on Wall -->
        <g transform="translate(1260, 200)" filter="url(#glow)">
          <rect x="-120" y="-40" width="240" height="80" rx="10" fill="#0f172a" stroke="#ef4444" stroke-width="4"/>
          <text x="0" y="16" font-family="'Courier New', monospace" font-size="38" font-weight="bold" fill="#ef4444" text-anchor="middle">
            04:00 AM
          </text>
        </g>

        <!-- Floor -->
        <rect x="-4000" y="800" width="10000" height="4000" fill="#0f172a"/>
        <line x1="-4000" y1="800" x2="6000" y2="800" stroke="#818cf8" stroke-width="8"/>
      `,l.push({id:"host_stick",state:{x:a,y:i,scale:1.3,timeSec:e,spineLean:p,pointTarget:{x:1260,y:500},expression:x}},{id:"trt_bodybuilder",state:{x:1260,y:640,scale:1.32,gender:"bodybuilder",hairStyle:"bodybuilder_bald",clothes:"bodybuilder_tank",expression:"smug_rock_eyebrow",rightHandProp:"syringe",timeSec:e}}),o+=M({x:1260,y:480},260,e)),{backgroundSvg:r+o,stickFigures:l,shake:0}}};function Vt(s,e,t=0){return`
    <g id="asset-buccal-boss-fight" transform="translate(${s}, ${e}) scale(1.65)" filter="url(#cardShadow)">
      <rect x="-220" y="-120" width="440" height="240" rx="18" fill="#0f172a" stroke="#f97316" stroke-width="7"/>
      <text x="0" y="-60" font-family="'Impact', sans-serif" font-size="24" fill="#fb923c" letter-spacing="2" text-anchor="middle">
        AESTHETIC BOSS FIGHT #2
      </text>
      <text x="0" y="8" font-family="'Impact', sans-serif" font-size="34" fill="#ffffff" letter-spacing="2" text-anchor="middle">
        BUCCAL FAT REMOVAL
      </text>
      <text x="0" y="78" font-family="'Courier New', monospace" font-size="16" font-weight="bold" fill="#ef4444" text-anchor="middle">
        [ -$5,000 PER PROCEDURE ]
      </text>
    </g>
  `}const qt={id:"scene_15_buccal_fat",name:"Buccal Fat Pumpkin, Deli Slicer & Victorian Gothic",startTime:349.46,endTime:408.63,render(s){const{sceneTime:e,camera:t}=s,n=e<5.755,h=e>=5.755&&e<18.094,f=e>=18.094&&e<30.27,a=e>=30.27&&e<42,i=e>=42&&e<52;let p=420,x=650,o=8,r="deadpan_classic",l={x:1260,y:480},g="",d="",k=[];return n?(t.cutTo(1260,480,1.25),p=420,o=8,l={x:1260,y:480},r="deadpan_classic",d=`
        <!-- Operating Theater Backdrop -->
        <rect x="-4000" y="-4000" width="10000" height="10000" fill="#042f2e"/>
        <rect x="150" y="80" width="1620" height="720" rx="14" fill="#0f766e" stroke="#115e59" stroke-width="8"/>
        <!-- Floor -->
        <rect x="-4000" y="800" width="10000" height="4000" fill="#0f172a"/>
        <line x1="-4000" y1="800" x2="6000" y2="800" stroke="#14b8a6" stroke-width="8"/>
      `,d+=Vt(1260,480,e),g+=A({x:1260,y:480},190,120,e,"BOSS FIGHT"),k.push({id:"host_stick",state:{x:p,y:x,scale:1.34,timeSec:e,spineLean:o,pointTarget:l,expression:r,gazeTarget:l}})):h?(t.cutTo(1260,480,1.25),p=380,o=6,l={x:1260,y:480},r="confused_squint",d=`
        <!-- Medical Clinic Chalkboard -->
        <rect x="-4000" y="-4000" width="10000" height="10000" fill="#022c22"/>
        <rect x="150" y="80" width="1620" height="720" rx="14" fill="#064e3b" stroke="#10b981" stroke-width="8"/>
        
        <!-- Floor -->
        <rect x="-4000" y="800" width="10000" height="4000" fill="#0f172a"/>
        <line x1="-4000" y1="800" x2="6000" y2="800" stroke="#10b981" stroke-width="8"/>
      `,k.push({id:"host_stick",state:{x:p,y:x,scale:1.32,timeSec:e,spineLean:o,pointTarget:{x:1200,y:550},expression:r}},{id:"patient_female",state:{x:1260,y:640,scale:1.25,gender:"female",hairStyle:"female_ponytail",clothes:"crop_top_leggings",expression:"fear_sweat_freeze",eyes:"eye_pop",mouth:"open_o",spineLean:10,timeSec:e}})):f?(t.cutTo(1200,500,1.25),p=360,o=-14,r="cringe_teeth_grit",d=`
        <!-- Operating Theater with Surgical Light -->
        <rect x="-4000" y="-4000" width="10000" height="10000" fill="#042f2e"/>
        <rect x="150" y="80" width="1620" height="720" rx="14" fill="#0f766e" stroke="#115e59" stroke-width="8"/>
        
        <!-- Surgical Lamp Over Operating Chair -->
        <g transform="translate(1260, 0)">
          <line x1="0" y1="0" x2="0" y2="140" stroke="#475569" stroke-width="6"/>
          <circle cx="0" cy="140" r="50" fill="#cbd5e1"/>
          <polygon points="-50,140 50,140 320,800 -320,800" fill="#ccfbf1" opacity="0.25"/>
        </g>

        <!-- Dental / Surgery Recliner Chair -->
        <g transform="translate(1360, 600)">
          <rect x="-60" y="40" width="120" height="20" fill="#334155"/>
          <line x1="0" y1="40" x2="0" y2="-40" stroke="#475569" stroke-width="18"/>
          <polygon points="-50,-80 50,-80 40,40 -40,40" fill="#1e293b" stroke="#0ea5e9" stroke-width="4"/>
          <!-- Headrest -->
          <rect x="-30" y="-120" width="60" height="35" rx="8" fill="#0f172a" stroke="#0ea5e9" stroke-width="3"/>
        </g>

        <!-- Giant Ice Cream Scoop Prop with Scoop of Yellow Fat Pad -->
        <g transform="translate(${1140+Math.sin(e*6)*15}, ${510+Math.cos(e*6)*10}) rotate(${Math.sin(e*6)*20})">
          <line x1="-50" y1="0" x2="30" y2="0" stroke="#94a3b8" stroke-width="8" stroke-linecap="round"/>
          <circle cx="45" cy="0" r="22" fill="#cbd5e1" stroke="#64748b" stroke-width="4"/>
          <!-- Yellow Fat Pad in Scoop -->
          <circle cx="45" cy="-8" r="14" fill="#facc15" stroke="#ca8a04" stroke-width="3" filter="url(#glow)"/>
          <text x="45" y="-28" font-family="'Impact', sans-serif" font-size="14" fill="#ef4444" text-anchor="middle">SCOOP</text>
        </g>

        <!-- Floor -->
        <rect x="-4000" y="800" width="10000" height="4000" fill="#0f172a"/>
        <line x1="-4000" y1="800" x2="6000" y2="800" stroke="#14b8a6" stroke-width="8"/>
      `,k.push({id:"host_stick",state:{x:p,y:x,scale:1.3,timeSec:e,spineLean:o,pointTarget:{x:1100,y:520},expression:r}},{id:"surgeon_doctor",state:{x:1040,y:640,scale:1.3,gender:"doctor",hairStyle:"doctor_cap",clothes:"doctor_scrubs",expression:"smug_rock_eyebrow",pointTarget:{x:1360,y:520},timeSec:e}},{id:"patient_female",state:{x:1360,y:640,scale:1.25,gender:"female",hairStyle:"female_ponytail",clothes:"patient_gown",expression:"fear_screaming",eyes:"eye_pop",mouth:"scream",spineLean:-12,timeSec:e}}),g+=M({x:1260,y:480},220,e)):a?(t.cutTo(1200,520,1.25),p=380,o=-16,r="shock_home_alone",d=`
        <!-- NYC Kosher Deli Counter -->
        <rect x="-4000" y="-4000" width="10000" height="10000" fill="#7f1d1d"/>
        <rect x="150" y="80" width="1620" height="720" rx="14" fill="#991b1b" stroke="#7f1d1d" stroke-width="8"/>
        
        <!-- Deli Meat Slicer -->
        <g transform="translate(1260, 540)" filter="url(#cardShadow)">
          <rect x="-140" y="20" width="280" height="60" rx="10" fill="#475569" stroke="#1e293b" stroke-width="6"/>
          <circle cx="-30" cy="-20" r="70" fill="#cbd5e1" stroke="#94a3b8" stroke-width="5"/>
          <ellipse cx="60" cy="-20" rx="40" ry="16" fill="#f43f5e" stroke="#be123c" stroke-width="3" filter="url(#glow)"/>
        </g>

        <!-- Floor -->
        <rect x="-4000" y="800" width="10000" height="4000" fill="#450a0a"/>
        <line x1="-4000" y1="800" x2="6000" y2="800" stroke="#fca5a5" stroke-width="8"/>
      `,k.push({id:"host_stick",state:{x:p,y:x,scale:1.3,timeSec:e,spineLean:o,pointTarget:{x:1260,y:520},expression:r}},{id:"butcher_male",state:{x:1060,y:640,scale:1.28,gender:"male",hairStyle:"male_short",clothes:"suit",expression:"smug_chef_kiss",pointTarget:{x:1260,y:520},timeSec:e}},{id:"customer_female",state:{x:1420,y:640,scale:1.25,gender:"female",hairStyle:"female_long",clothes:"dress_pink",expression:"cringe_teeth_grit",spineLean:10,timeSec:e}})):i?(t.cutTo(1260,520,1.25),p=380,o=-12,r="deadpan_classic",d=`
        <!-- Tim Burton Victorian Gothic Cemetery -->
        <rect x="-4000" y="-4000" width="10000" height="10000" fill="#09090b"/>
        <rect x="150" y="80" width="1620" height="720" rx="14" fill="#18181b" stroke="#3f3f46" stroke-width="8"/>
        
        <!-- Crooked Dead Trees & Full Moon -->
        <circle cx="1500" cy="200" r="50" fill="#f4f4f5" filter="url(#glow)"/>
        
        <!-- Victorian Headstone -->
        <g transform="translate(1080, 580)" filter="url(#cardShadow)">
          <path d="M -90 80 L -90 -60 C -90 -120 90 -120 90 -60 L 90 80 Z" fill="#475569" stroke="#1e293b" stroke-width="6"/>
          <text x="0" y="-60" font-family="serif" font-size="24" font-weight="bold" fill="#f8fafc" text-anchor="middle">R.I.P.</text>
          <text x="0" y="-25" font-family="serif" font-size="16" font-weight="bold" fill="#38bdf8" text-anchor="middle">BUCCAL FAT</text>
          <text x="0" y="5" font-family="serif" font-size="13" fill="#cbd5e1" text-anchor="middle">2010 - 2024</text>
        </g>

        <!-- Floor -->
        <rect x="-4000" y="800" width="10000" height="4000" fill="#09090b"/>
        <line x1="-4000" y1="800" x2="6000" y2="800" stroke="#71717a" stroke-width="8"/>
      `,k.push({id:"host_stick",state:{x:p,y:x,scale:1.3,timeSec:e,spineLean:o,pointTarget:{x:1280,y:550},expression:r}},{id:"widow_female",state:{x:1300,y:650,scale:1.28,gender:"widow",hairStyle:"widow_veil",clothes:"dress_black",expression:"crying_waterfalls",leftArmAngle1:150,leftArmAngle2:-110,spineLean:-14,timeSec:e}})):(t.cutTo(960,540,1.08),p=440,o=0,r="smug_finger_guns",d=`
        <rect x="-4000" y="-4000" width="10000" height="10000" fill="#020617"/>
        <rect x="150" y="80" width="1620" height="720" rx="14" fill="#0f172a" stroke="#ef4444" stroke-width="8"/>
        <!-- Floor -->
        <rect x="-4000" y="800" width="10000" height="4000" fill="#020617"/>
        <line x1="-4000" y1="800" x2="6000" y2="800" stroke="#ef4444" stroke-width="8"/>
      `,k.push({id:"host_stick",state:{x:p,y:x,scale:1.34,timeSec:e,spineLean:o,expression:r}},{id:"cyborg_female",state:{x:1260,y:640,scale:1.25,gender:"female",hairStyle:"female_bob",clothes:"crop_top_leggings",expression:"deadpan_classic",timeSec:e}})),{backgroundSvg:d+g,stickFigures:k,shake:0}}},Kt={id:"scene_16_tiktok_tribunal",name:"TikTok Tribunal, Wednesday Dance & Zapruder 8mm",startTime:408.63,endTime:474.34,render(s){const{sceneTime:e,camera:t}=s,n=e<6,h=e>=6&&e<12,f=e>=12&&e<18,a=e>=18&&e<23.304,i=e>=23.304&&e<35,p=e>=35&&e<47.853,x=e>=47.853&&e<54,o=e>=54&&e<60,r=e>=60;let l=420,g=650,d=8,k="deadpan_classic",m="";n||h?(t.cutTo(1260,480,1.25),l=420,d=8,k="confused_squint"):f?(t.cutTo(1260,520,1.25),l=440,d=-10,k="smug_rock_eyebrow"):a?(t.cutTo(960,540,1.05),l=420,d=-14,k="shock_eye_pop"):i?(t.cutTo(1260,480,1.3),l=440,d=-8,k="shock_eye_pop"):p?(t.cutTo(1260,480,1.25),l=440,d=10,k="skeptical_raised_brow"):x||o?(t.cutTo(1260,500,1.25),l=440,d=12,k="confused_squint"):r&&(t.cutTo(1260,480,1.35),l=420,d=-16,k="cringe_teeth_grit");let u=[],y=`
      <!-- TikTok Forensic Courtroom Backdrop -->
      <rect x="-4000" y="-4000" width="10000" height="10000" fill="#2e1065"/>
      
      <!-- Mahogany Judicial Wood Wall Panels -->
      <rect x="150" y="80" width="1620" height="720" rx="14" fill="#451a03" stroke="#78350f" stroke-width="8"/>
      <!-- Classical Courtroom Pillars -->
      <rect x="220" y="80" width="80" height="720" fill="#78350f"/>
      <rect x="1620" y="80" width="80" height="720" fill="#78350f"/>

      <!-- Glowing Neon TikTok Scale of Justice -->
      <g transform="translate(960, 160)">
        <circle cx="0" cy="0" r="50" fill="#0f172a" stroke="#ec4899" stroke-width="5" filter="url(#glow)"/>
        <text x="0" y="15" font-family="'Impact', sans-serif" font-size="34" fill="#f472b6" text-anchor="middle">⚖️</text>
      </g>

      <!-- Judicial Courtroom Hardwood Floor -->
      <rect x="-4000" y="800" width="10000" height="4000" fill="#1c1917"/>
      <line x1="-4000" y1="800" x2="6000" y2="800" stroke="#a855f7" stroke-width="8"/>
    `;return n||h?(u.push({id:"host_stick",state:{x:l,y:g,scale:1.3,timeSec:e,spineLean:d,pointTarget:{x:1260,y:520},expression:k}},{id:"jenna_ortega_figure",state:{x:1260,y:640,scale:1.28,gender:"female",hairStyle:"female_bob",clothes:"dress_black",expression:"deadpan_soul_stare",timeSec:e}}),m+=A({x:1260,y:480},180,120,e,"SCRUTINY")):f?(u.push({id:"host_stick",state:{x:l,y:g,scale:1.3,timeSec:e,spineLean:d,pointTarget:{x:1260,y:500},expression:k}},{id:"wednesday_dancer",state:{x:1260,y:640,scale:1.28,gender:"female",hairStyle:"female_bob",clothes:"dress_black",expression:"smug_rock_eyebrow",leftArmAngle1:200,leftArmAngle2:-90,rightArmAngle1:-20,rightArmAngle2:90,timeSec:e}}),m+=M({x:1260,y:480},220,e)):a?(u.push({id:"host_stick",state:{x:l,y:g,scale:1.3,timeSec:e,spineLean:d,pointTarget:{x:1260,y:500},expression:k}},{id:"judge_stickman",state:{x:1260,y:640,scale:1.3,gender:"male",hairStyle:"male_short",clothes:"suit",expression:"rage_furious_screaming",rightArmAngle1:-60,rightArmAngle2:60,rightHandProp:"stamp",timeSec:e}}),m+=A({x:1260,y:480},180,110,e,"DIGITAL COURT")):i||p?(u.push({id:"host_stick",state:{x:l,y:g,scale:1.3,timeSec:e,spineLean:d,pointTarget:{x:1260,y:500},expression:k}},{id:"forensic_detective",state:{x:1100,y:640,scale:1.28,gender:"male",hairStyle:"male_short",clothes:"hoodie",expression:"confused_squint",rightHandProp:"pointer",pointTarget:{x:1400,y:480},timeSec:e}},{id:"suspect_female",state:{x:1450,y:640,scale:1.25,gender:"female",hairStyle:"female_long",clothes:"dress_pink",expression:"cringe_teeth_grit",timeSec:e}}),m+=F({x:740,y:520},{x:1080,y:480},e,"FRAME BY FRAME")):(u.push({id:"host_stick",state:{x:l,y:g,scale:1.3,timeSec:e,spineLean:d,expression:k}},{id:"size4_female",state:{x:1260,y:640,scale:1.28,gender:"female",hairStyle:"female_ponytail",clothes:"crop_top_leggings",expression:"confused_shrug_what",pose:"shrug",timeSec:e}}),m+=M({x:1260,y:480},260,e)),{backgroundSvg:y+m,stickFigures:u,shake:0}}},Jt={id:"scene_17_cyborg_monoculture",name:"Cyborg RPG Creator, Carbs 2008 & Frozen Forehead",startTime:474.34,endTime:540.354,render(s){const{sceneTime:e,camera:t}=s,n=e<6,h=e>=6&&e<12.413,f=e>=12.413&&e<17.376,a=e>=17.376&&e<24,i=e>=24&&e<32,p=e>=32&&e<43.312,x=e>=43.312&&e<50,o=e>=50&&e<57;let r=420,l=650,g=8,d="deadpan_classic",k="";n?(t.cutTo(1260,460,1.25),r=260+Math.min(1,e/1.5)*160,g=8,d="deadpan_classic"):h?(t.cutTo(1260,480,1.3),r=420,g=-10,d="shock_eye_pop"):f||a?(t.cutTo(1260,480,1.25),r=440,g=8,d="confused_squint"):i||p?(t.cutTo(1260,480,1.25),r=440,g=-12,d="cringe_teeth_grit"):x||o?(t.cutTo(1260,500,1.3),r=420,g=14,d="smug_rock_eyebrow"):(t.cutTo(440,540,1.35),r=440,g=0,d="smug_finger_guns");let m=[],u=`
      <!-- Cybernetic Cloning Facility Backdrop -->
      <rect x="-4000" y="-4000" width="10000" height="10000" fill="#030712"/>
      
      <!-- Titanium Cleanroom Wall Grid -->
      <rect x="150" y="80" width="1620" height="720" rx="14" fill="#0f172a" stroke="#06b6d4" stroke-width="6"/>
      <line x1="150" y1="360" x2="1770" y2="360" stroke="#1e293b" stroke-width="4"/>
      <line x1="150" y1="580" x2="1770" y2="580" stroke="#1e293b" stroke-width="4"/>

      <!-- Cybernetic Glowing Floor -->
      <rect x="-4000" y="800" width="10000" height="4000" fill="#020617"/>
      <line x1="-4000" y1="800" x2="6000" y2="800" stroke="#06b6d4" stroke-width="8" filter="url(#glow)"/>
    `;return n?(m.push({id:"host_stick",state:{x:r,y:l,scale:1.3,timeSec:e,spineLean:g,pointTarget:{x:1260,y:500},expression:d}},{id:"cyborg_model",state:{x:1260,y:640,scale:1.28,gender:"female",hairStyle:"female_bob",clothes:"crop_top_leggings",expression:"deadpan_soul_stare",timeSec:e}}),k+=A({x:1260,y:480},220,140,e,"RPG CREATOR")):h?(m.push({id:"host_stick",state:{x:r,y:l,scale:1.3,timeSec:e,spineLean:g,pointTarget:{x:1260,y:500},expression:d}},{id:"battery_cyborg",state:{x:1260,y:640,scale:1.28,gender:"tech_bro",hairStyle:"male_short",clothes:"suit",expression:"rage_laser_eyes",timeSec:e}}),k+=M({x:1260,y:480},220,e)):f||a?(u+=`
        <!-- Museum Glass Display with 2008 Carbohydrate Croissant -->
        <g transform="translate(1260, 560)" filter="url(#cardShadow)">
          <rect x="-100" y="20" width="200" height="40" fill="#475569" stroke="#1e293b" stroke-width="4"/>
          <ellipse cx="0" cy="-20" rx="60" ry="30" fill="#fde047" stroke="#ca8a04" stroke-width="5" filter="url(#glow)"/>
          <text x="0" y="45" font-family="'Impact', sans-serif" font-size="18" fill="#facc15" text-anchor="middle">CARBS 2008</text>
        </g>
      `,m.push({id:"host_stick",state:{x:r,y:l,scale:1.3,timeSec:e,spineLean:g,pointTarget:{x:1260,y:520},expression:d}},{id:"worshipping_female",state:{x:1040,y:650,scale:1.25,gender:"female",hairStyle:"female_ponytail",clothes:"dress_pink",expression:"shock_eye_pop",leftArmAngle1:150,leftArmAngle2:-70,spineLean:18,timeSec:e}}),k+=F({x:740,y:520},{x:1100,y:480},e,"ERA OF CARBS")):(m.push({id:"host_stick",state:{x:r,y:l,scale:1.3,timeSec:e,spineLean:g,expression:d}},{id:"frozen_forehead_female",state:{x:1260,y:640,scale:1.28,gender:"female",hairStyle:"female_blonde",clothes:"dress_pink",expression:"crying_waterfalls",timeSec:e}}),k+=M({x:1260,y:480},240,e)),{backgroundSvg:u+k,stickFigures:m,shake:0}}},e0={id:"scene_18_economic_outro",name:"Economic Flex, Gold Wheelbarrow, Butler & Outro",startTime:540.354,endTime:644.08,render(s){const{sceneTime:e,camera:t}=s,n=e<8,h=e>=8&&e<16,f=e>=16&&e<24.85,a=e>=24.85&&e<32,i=e>=32&&e<40,p=e>=40&&e<48,x=e>=48&&e<55.05,o=e>=55.05&&e<65,r=e>=65&&e<75,l=e>=75&&e<84.65,g=e>=84.65&&e<94;let d=420,k=650,m=8,u="deadpan_classic",y="";n||h||f||a?(t.cutTo(1260,520,1.25),d=420,m=8,u="deadpan_classic"):i||p||x?(t.cutTo(1260,500,1.28),d=420,m=-14,u="shock_eye_pop"):o?(t.cutTo(1260,480,1.25),d=440,m=10,u="smug_rock_eyebrow"):r?(t.cutTo(1260,480,1.28),d=440,m=-8,u="smug_chef_kiss"):l?(t.cutTo(1260,480,1.3),d=440,m=8,u="confused_squint"):g?(t.cutTo(960,540,1.15),d=440,m=-10,u="smug_rock_eyebrow"):(t.cutTo(960,540,1.2),d=440,m=0,u="smug_finger_guns");let c=[],w=`
      <!-- Ultra-Luxury Manhattan Penthouse Skyline Backdrop -->
      <rect x="-4000" y="-4000" width="10000" height="10000" fill="#020617"/>
      
      <!-- Panoramic Night Skyline through Glass -->
      <rect x="150" y="80" width="1620" height="720" rx="14" fill="#0f172a" stroke="#ca8a04" stroke-width="8"/>
      <!-- Distant Glowing Skyscrapers -->
      <polygon points="250,800 250,300 380,300 380,800" fill="#1e293b"/>
      <polygon points="420,800 420,200 560,200 560,800" fill="#334155"/>
      <polygon points="600,800 600,380 720,380 720,800" fill="#1e293b"/>
      <polygon points="760,800 760,150 880,150 880,800" fill="#475569"/>
      <polygon points="920,800 920,280 1060,280 1060,800" fill="#1e293b"/>
      <polygon points="1100,800 1100,220 1240,220 1240,800" fill="#334155"/>
      <polygon points="1280,800 1280,340 1420,340 1420,800" fill="#1e293b"/>

      <!-- Polished Italian White Marble Penthouse Floor -->
      <rect x="-4000" y="800" width="10000" height="4000" fill="#f8fafc"/>
      <line x1="-4000" y1="800" x2="6000" y2="800" stroke="#ca8a04" stroke-width="10"/>
      <line x1="-4000" y1="940" x2="6000" y2="940" stroke="#cbd5e1" stroke-width="4" stroke-dasharray="30 20"/>
    `;if(n||h||f||a)c.push({id:"host_stick",state:{x:d,y:k,scale:1.3,timeSec:e,spineLean:m,pointTarget:{x:1260,y:520},expression:u}},{id:"billionaire_stickman",state:{x:1260,y:640,scale:1.3,gender:"male",hairStyle:"male_short",clothes:"suit",expression:"smug_finger_guns",timeSec:e}}),y+=A({x:1260,y:480},190,120,e,"ECONOMIC DIVIDE");else if(i||p||x||o||r)c.push({id:"host_stick",state:{x:d,y:k,scale:1.3,timeSec:e,spineLean:m,pointTarget:{x:1260,y:520},expression:u}},{id:"concierge_doctor",state:{x:1080,y:640,scale:1.28,gender:"doctor",hairStyle:"doctor_cap",clothes:"doctor_scrubs",expression:"smug_rock_eyebrow",rightHandProp:"syringe",pointTarget:{x:1380,y:550},timeSec:e}},{id:"penthouse_client",state:{x:1400,y:640,scale:1.25,gender:"female",hairStyle:"female_blonde",clothes:"bathrobe",expression:"blissful_serenity",timeSec:e}}),y+=M({x:1260,y:480},240,e);else if(l)w+=`
        <!-- Giant #10 White Business Envelope -->
        <g transform="translate(1260, 560)" filter="url(#cardShadow)">
          <rect x="-180" y="-80" width="360" height="180" rx="10" fill="#ffffff" stroke="#94a3b8" stroke-width="5"/>
          <polygon points="-180,-80 0,20 180,-80" fill="none" stroke="#94a3b8" stroke-width="4"/>
          <text x="0" y="75" font-family="'Impact', sans-serif" font-size="20" fill="#be185d" text-anchor="middle">
            #10 BUSINESS ENVELOPE (FITS 1 CELEB)
          </text>
        </g>
      `,c.push({id:"host_stick",state:{x:d,y:k,scale:1.3,timeSec:e,spineLean:m,pointTarget:{x:1260,y:500},expression:u}},{id:"envelope_female",state:{x:1260,y:600,scale:1.15,gender:"female",hairStyle:"female_bob",clothes:"dress_pink",expression:"smug_peace_sign",timeSec:e}}),y+=A({x:1260,y:480},190,100,e,"FITS IN ENVELOPE");else{const S=Math.sin(e*6)>0;w+=`
        <g transform="translate(960, 320)" filter="url(#cardShadow)">
          <rect x="-220" y="-130" width="440" height="260" rx="18" fill="#0f172a" stroke="#ef4444" stroke-width="6"/>
          <g transform="translate(0, -35) scale(${S?.95:1})">
            <rect x="-150" y="-35" width="300" height="70" rx="35" fill="#dc2626" filter="url(#glow)"/>
            <text x="0" y="10" font-family="'Impact', sans-serif" font-size="30" fill="#ffffff" letter-spacing="2" text-anchor="middle">
              ${S?"SUBSCRIBED ✓":"SUBSCRIBE"}
            </text>
          </g>
          <polygon points="40,-5 40,35 52,24 66,48 78,42 64,18 84,18" fill="#ffffff" stroke="#000" stroke-width="2"/>
          <text x="0" y="65" font-family="'Patrick Hand', cursive, sans-serif" font-size="26" fill="#cbd5e1" text-anchor="middle">
            (Or don't. I'm not your dad.)
          </text>
        </g>
      `,c.push({id:"host_stick",state:{x:480,y:k,scale:1.34,timeSec:e,spineLean:m,rightHandProp:"bread",expression:"smug_finger_guns",pointTarget:{x:960,y:320}}}),y+=M({x:960,y:320},220,e)}return{backgroundSvg:w+y,stickFigures:c,shake:0}}},q=[vt,Ft,Ht,Ot,Yt,Dt,Nt,Gt,Wt,Qt,Xt,Zt,Ut,jt,qt,Kt,Jt,e0];function at(s){for(const e of q)if(s>=e.startTime&&s<e.endTime)return e;return s>=q[q.length-1].endTime?q[q.length-1]:q[0]}class t0{constructor(e){Object.defineProperty(this,"audio",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"isLoaded",{enumerable:!0,configurable:!0,writable:!0,value:!1}),Object.defineProperty(this,"listeners",{enumerable:!0,configurable:!0,writable:!0,value:[]}),this.audio=new Audio(e),this.audio.preload="auto",this.audio.addEventListener("loadedmetadata",()=>{this.isLoaded=!0,console.log(`[AudioSync] Audio loaded: ${this.audio.duration}s`)}),this.audio.addEventListener("timeupdate",()=>{this.notify(this.audio.currentTime)})}get audioElement(){return this.audio}get currentTime(){return this.audio.currentTime}get duration(){return this.audio.duration||185}get isPlaying(){return!this.audio.paused&&!this.audio.ended}play(){return this.audio.play()}pause(){this.audio.pause()}toggle(){this.isPlaying?this.pause():this.play()}seek(e){const t=Math.max(0,Math.min(this.duration,e));this.audio.currentTime=t,this.notify(t)}setPlaybackRate(e){this.audio.playbackRate=e}onTimeUpdate(e){return this.listeners.push(e),()=>{this.listeners=this.listeners.filter(t=>t!==e)}}notify(e){for(const t of this.listeners)t(e)}}let me=[];const j=new Mt(1920,1080),O=new t0("/audio.mp3"),i0=document.querySelector("#app");i0.innerHTML=`
  <div class="header-bar">
    <div class="header-title">
      <span class="badge-tag">CASUALLY EXPLAINED</span>
      <h1>The Great Hollywood Thinning & The GLP-1 Meta</h1>
    </div>
    <div class="stats-pill" id="stats-readout">FPS: 60 | SCENE 1/11</div>
  </div>

  <div class="viewport-container">
    <svg id="animation-svg" viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid meet">
      <defs>
        <!-- Card Drop Shadow Filter -->
        <filter id="cardShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="#000000" flood-opacity="0.18"/>
        </filter>
        <!-- Glow Filter for lasers / divine items -->
        <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="12" result="blur"/>
          <feMerge>
            <feMergeNode in="blur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        <!-- Laser Gradient -->
        <linearGradient id="laserGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#ef4444" stop-opacity="0.9"/>
          <stop offset="100%" stop-color="#dc2626" stop-opacity="0.1"/>
        </linearGradient>
      </defs>

      <!-- Background Scene Layer -->
      <g id="scene-background"></g>

      <!-- Main Stick Figure Character Layer -->
      <g id="scene-character"></g>

      <!-- Foreground Scene Layer -->
      <g id="scene-foreground"></g>
    </svg>

    <!-- Kinetic Subtitles -->
    <div class="subtitle-box" id="subtitle-box" style="display: none;">
      <div class="subtitle-text" id="subtitle-text"></div>
    </div>
  </div>

  <div class="controls-bar">
    <div class="timeline-row">
      <button id="btn-play" class="primary">▶ Play</button>
      <input type="range" id="scrubber" class="scrubber" min="0" max="644.10" step="0.05" value="0" />
      <span class="time-readout" id="time-readout">00:00 / 10:44</span>
    </div>

    <div class="actions-row">
      <div class="button-group">
        <button id="btn-restart">↻ Restart</button>
        <button id="btn-back-5s">-5s</button>
        <button id="btn-fwd-5s">+5s</button>
      </div>

      <div class="button-group">
        <label style="font-size: 0.85rem; color: #94a3b8;">Scene:</label>
        <select id="scene-select" class="scene-selector">
          ${q.map((s,e)=>`<option value="${s.startTime}">Scene ${s.id}: ${s.name} (${s.startTime.toFixed(0)}s)</option>`).join("")}
        </select>

        <label style="font-size: 0.85rem; color: #94a3b8; margin-left: 8px;">Speed:</label>
        <select id="speed-select">
          <option value="0.75">0.75x</option>
          <option value="1.0" selected>1.0x</option>
          <option value="1.25">1.25x</option>
          <option value="1.5">1.5x</option>
          <option value="2.0">2.0x</option>
        </select>
      </div>
    </div>
  </div>
`;const nt=document.querySelector("#animation-svg"),ct=document.querySelector("#scene-background"),se=document.querySelector("#scene-character"),ft=document.querySelector("#scene-foreground"),ue=document.querySelector("#subtitle-box"),dt=document.querySelector("#subtitle-text"),Ke=document.querySelector("#btn-play"),we=document.querySelector("#scrubber"),r0=document.querySelector("#time-readout"),s0=document.querySelector("#stats-readout"),Je=document.querySelector("#scene-select"),et=document.querySelector("#speed-select"),o0=document.querySelector("#btn-restart"),l0=document.querySelector("#btn-back-5s"),a0=document.querySelector("#btn-fwd-5s");async function n0(){try{const s=await fetch("/subtitles.srt");if(s.ok){const e=await s.text();me=Tt(e),console.log(`[SRT] Loaded ${me.length} subtitle cues.`)}}catch(s){console.error("[SRT] Failed to load subtitles.srt",s)}}n0();function c0(s){const e=Math.floor(s/60),t=Math.floor(s%60);return`${String(e).padStart(2,"0")}:${String(t).padStart(2,"0")}`}Ke.addEventListener("click",()=>{O.toggle(),Ke.textContent=O.isPlaying?"❚❚ Pause":"▶ Play"});we.addEventListener("input",()=>{const s=parseFloat(we.value);O.seek(s)});Je.addEventListener("change",()=>{const s=parseFloat(Je.value);O.seek(s)});et.addEventListener("change",()=>{O.setPlaybackRate(parseFloat(et.value))});o0.addEventListener("click",()=>{O.seek(0)});l0.addEventListener("click",()=>{O.seek(O.currentTime-5)});a0.addEventListener("click",()=>{O.seek(O.currentTime+5)});let ve=0,tt=performance.now(),Be=0,ke=0,it=60;function ht(s){const e=(s-tt)/1e3;tt=s,Be++,ke+=e,ke>=.5&&(it=Math.round(Be/ke),Be=0,ke=0);let t=0;O.isPlaying?(t=O.currentTime,ve=t):t=ve;const n=at(t),h=n.endTime-n.startTime,f=t-n.startTime,a=Math.min(1,Math.max(0,f/Math.max(.1,h))),i=rt(me,t),x=i!==null?Math.sin(t*16)*.5+.5:0,o={timeSec:t,sceneTime:f,progress:a,talkingFlap:x,camera:j},r=n.render(o);if(r.cameraTarget&&j.setTarget(r.cameraTarget.x,r.cameraTarget.y,r.cameraTarget.zoom),r.shake&&j.shake(r.shake),j.update(s),nt.setAttribute("viewBox",j.getViewBox(t)),ct.innerHTML=r.backgroundSvg||"",r.stickFigures&&r.stickFigures.length>0?se.innerHTML=r.stickFigures.map(l=>pe(l.id,l.state)).join(`
`):r.hostState?se.innerHTML=pe("host-figure",r.hostState):se.innerHTML="",ft.innerHTML=r.foregroundSvg||"",i){ue.style.display="block";const l=i.cleanText.replace(/(Thicc|stick|Jenna Ortega|Emma Stone|Ariana Grande|unsubscribe|lunch|Tim Burton|PS1 graphics|Heroin Chick|Kate Moss|Diet Coke|apathy|Victorian|BBL|Pixar Mom|squats|hourglass|body positivity|fidget spinners|podcast|pharmaceutical|boss|Y2K|low-rise|Miu Miu|two thousand dollars|digestive tract)/gi,'<span class="highlight">$1</span>');dt.innerHTML=l}else ue.style.display="none";Math.abs(parseFloat(we.value)-t)>.1&&O.isPlaying&&(we.value=String(t)),r0.textContent=`${c0(t)} / 10:44`,s0.textContent=`FPS: ${it} | SCENE ${n.id} (${n.name})`,requestAnimationFrame(ht)}window.__seekAnimation=s=>{ve=s;const e=at(s),t=s-e.startTime,n=Math.min(1,Math.max(0,t/Math.max(.1,e.endTime-e.startTime))),h=rt(me,s),a=h!==null?Math.sin(s*16)*.5+.5:0,i=e.render({timeSec:s,sceneTime:t,progress:n,talkingFlap:a,camera:j});i.cameraTarget&&j.setImmediate({centerX:i.cameraTarget.x,centerY:i.cameraTarget.y,zoom:i.cameraTarget.zoom}),nt.setAttribute("viewBox",j.getViewBox(s)),ct.innerHTML=i.backgroundSvg||"",i.stickFigures&&i.stickFigures.length>0?se.innerHTML=i.stickFigures.map(p=>pe(p.id,p.state)).join(`
`):i.hostState?se.innerHTML=pe("host-figure",i.hostState):se.innerHTML="",ft.innerHTML=i.foregroundSvg||"",h?(ue.style.display="block",dt.innerHTML=h.cleanText):ue.style.display="none"};requestAnimationFrame(ht);
