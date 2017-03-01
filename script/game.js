function createTable(){var a=document.getElementById("grid");rows=a.options[a.selectedIndex].value;var b=rows;grid=new Array(2*rows-1);for(var c=0;c<grid.length;c++)grid[c]=new Array(2*b-1);for(var c=0;c<grid.length;c++)for(var d=0;d<grid.length;d++)grid[c][d]=1;for(var e="<table id='gameTable' cellpadding='0' cellspacing='0' border='0' align='center'>",c=0;c<2*rows-1;c++){e+="<tr>";for(var d=0;d<2*b-1;d++)c%2==0&&d%2==0?e+="<td><img id='dot' src='image/black.gif'></td>":c%2==0&&d%2!=0?e+="<td class='horizantalLine' id='"+c+"-"+d+"' onclick=makeHorizontalLine('"+c+"-"+d+"','P') ></td>":c%2!=0&&d%2==0?e+="<td class='verticalLine' id='"+c+"-"+d+"' onclick=makeVerticalLine('"+c+"-"+d+"','P') ></td>":c%2!=0&&d%2!=0&&(e+="<td class='square' id='"+c+"-"+d+"' ></td>");e+="</tr>"}e+="</table>",document.getElementById("table").innerHTML=e,document.getElementById("player").value=0,document.getElementById("comp").value=0,document.getElementById("computer").checked&&computerMove()}function clearAll(){window.location="SquareIT.html"}function hdottedline(a){var b=a.split("-"),c=parseInt(b[0]),d=parseInt(b[1]),e="<img id='dhline' src='image/hline.png'>";0!=grid[c][d]&&(document.getElementById(a).innerHTML=e)}function vdottedline(a){var b=a.split("-"),c=parseInt(b[0]),d=parseInt(b[1]),e="<img id='dvline' src='image/vline.png'>";0!=grid[c][d]&&(document.getElementById(a).innerHTML=e)}function dismissline(a){var b=a.split("-"),c=parseInt(b[0]),d=parseInt(b[1]);0!=grid[c][d]&&(document.getElementById(a).innerHTML="")}function changeColor(a){var b=a.split("-"),c=parseInt(b[0]),d=parseInt(b[1]);c%2==0&&d%2!=0?document.getElementById(a).innerHTML="<img id='line' src='image/red.gif'>":c%2!=0&&d%2==0&&(document.getElementById(a).innerHTML="<img id='vline' src='image/red.gif'>")}function checkScore(a){for(var b=0,c=0,d=0;d<grid.length;d++)for(var e=0;e<grid.length;e++)d%2!=0&&e%2!=0&&("P"==grid[d][e]?b++:"C"==grid[d][e]&&c++);return"P"==a?b:c}function isFinished(){var a=checkDone(),b=!1;if("-"!=a){if("P"==a){var c=document.getElementById("name").value;""==c&&(c="Player");var d="Hurray!! "+c+" you have won the game!<img src='image/won.gif'>";BootstrapDialog.show({title:"Square It",message:""+d})}else"C"==a?BootstrapDialog.show({title:"Square It",message:"Computer has won the game"}):BootstrapDialog.show({title:"Square It",message:"Its a draw game"});b=!0}return b}function updateProgress(){var player=eval(checkScore("P")),comp=eval(checkScore("C")),p=player/((rows-1)*(rows-1)),c=comp/((rows-1)*(rows-1));player=Math.ceil(100*p),comp=Math.floor(100*c),document.getElementById("perPlayer").style.width=player+"%",document.getElementById("perPlayer").innerHTML=player+"%",document.getElementById("perComp").style.width=comp+"%",document.getElementById("perComp").innerHTML=comp+"%"}function play(){var a=document.getElementById("audio");a.play()}function swapUser(){document.getElementById("playerBorder").style.border="5px solid red",document.getElementById("compBorder").style.border="0px"}function swapComp(){document.getElementById("playerBorder").style.border="0px",document.getElementById("compBorder").style.border="5px solid red"}function makeHorizontalLine(a,b){var c=a.split("-"),d=parseInt(c[0]),e=parseInt(c[1]);d%2==0&&e%2!=0&&1==grid[d][e]&&(grid[d][e]=0,""!=last&&(changeColor(last),last=""),"P"==b?(document.getElementById(a).innerHTML="<img id='line' src='image/blue.gif'>",checkIfSquare(a,b)?(updateProgress(),document.getElementById("player").value=checkScore(b),isFinished()):setTimeout(computerMove,200)):(last=a,document.getElementById(a).innerHTML="<img id='line' src='image/green.gif'>",checkIfSquare(a,b)&&(updateProgress(),changeColor(last),last="",document.getElementById("comp").value=checkScore(b),0==isFinished()&&setTimeout(computerMove(),200))))}function makeVerticalLine(a,b){var c=a.split("-"),d=parseInt(c[0]),e=parseInt(c[1]);d%2!=0&&e%2==0&&1==grid[d][e]&&(grid[d][e]=0,""!=last&&(changeColor(last),last=""),"P"==b?(document.getElementById(a).innerHTML="<img id='vline' src='image/blue.gif'>",checkIfSquare(a,b)?(updateProgress(),document.getElementById("player").value=checkScore(b),isFinished()):setTimeout(computerMove,200)):(last=a,document.getElementById(a).innerHTML="<img id='vline' src='image/green.gif'>",checkIfSquare(a,b)&&(updateProgress(),changeColor(last),last="",document.getElementById("comp").value=checkScore(b),0==isFinished()&&setTimeout(computerMove,200))))}function checkIfSquare(location,user){var a=location.split("-"),r=parseInt(a[0]),c=parseInt(a[1]),found=!1,m,n,id,rc;if(r%2==0&&c%2!=0||r%2!=0&&c%2==0){var x=0,y=0;r%2==0&&c%2!=0?(m=eval(r+1)+"-"+c,n=eval(r-1)+"-"+c,rc=1,0==r?x=!grid[r+1][c-1]&&!grid[r+1][c+1]&&!grid[r+2][c]:r==grid.length-1?y=!grid[r-1][c-1]&&!grid[r-1][c+1]&&!grid[r-2][c]:(x=!grid[r+1][c-1]&&!grid[r+1][c+1]&&!grid[r+2][c],y=!grid[r-1][c-1]&&!grid[r-1][c+1]&&!grid[r-2][c])):r%2!=0&&c%2==0&&(m=r+"-"+eval(c+1),n=r+"-"+eval(c-1),rc=2,0==c?x=!grid[r-1][c+1]&&!grid[r+1][c+1]&&!grid[r][c+2]:c==grid.length-1?y=!grid[r-1][c-1]&&!grid[r+1][c-1]&&!grid[r][c-2]:(x=!grid[r-1][c+1]&&!grid[r+1][c+1]&&!grid[r][c+2],y=!grid[r-1][c-1]&&!grid[r+1][c-1]&&!grid[r][c-2])),1==x&&1==y?(found=!0,"P"==user?(document.getElementById(m).innerHTML="<img id='square' src='image/human.gif'>",document.getElementById(n).innerHTML="<img id='square' src='image/human.gif'>",1==rc?(grid[eval(r+1)][c]="P",grid[eval(r-1)][c]="P"):2==rc&&(grid[r][eval(c+1)]="P",grid[r][eval(c-1)]="P")):(document.getElementById(m).innerHTML="<img id='square' src='image/comp.gif'>",document.getElementById(n).innerHTML="<img id='square' src='image/comp.gif'>",1==rc?(grid[eval(r+1)][c]="C",grid[eval(r-1)][c]="C"):2==rc&&(grid[r][eval(c+1)]="C",grid[r][eval(c-1)]="C"))):1!=x&&1!=y||(1==x?id=m:1==y&&(id=n),found=!0,"P"==user?(document.getElementById(id).innerHTML="<img id='square' src='image/human.gif'>",1==rc?1==x?grid[eval(r+1)][c]="P":1==y&&(grid[eval(r-1)][c]="P"):2==rc&&(1==x?grid[r][eval(c+1)]="P":1==y&&(grid[r][eval(c-1)]="P"))):(document.getElementById(id).innerHTML="<img id='square' src='image/comp.gif'>",1==rc?1==x?grid[eval(r+1)][c]="C":1==y&&(grid[eval(r-1)][c]="C"):2==rc&&(1==x?grid[r][eval(c+1)]="C":1==y&&(grid[r][eval(c-1)]="C"))))}return found}function checkDone(){for(var a=!0,b=0,c=0,d=0;d<grid.length;d++)for(var e=0;e<grid.length;e++)d%2!=0&&e%2!=0&&a&&1==grid[d][e]&&(a=!1);if(a){for(var d=0;d<grid.length;d++)for(var e=0;e<grid.length;e++)d%2!=0&&e%2!=0&&a&&("P"==grid[d][e]?b++:"C"==grid[d][e]&&c++);return b>c?"P":b<c?"C":"D"}return"-"}function computerMove(){for(var pos0=new Array,pos1=new Array,pos2=new Array,pos3=new Array,pos4=new Array,yrow=0;yrow<grid.length;yrow++)for(var ycol=0;ycol<grid[yrow].length;ycol++)yrow%2==1&&ycol%2==1&&(grid[yrow-1][ycol]||grid[yrow+1][ycol]||grid[yrow][ycol-1]||grid[yrow][ycol+1]?grid[yrow-1][ycol]||grid[yrow+1][ycol]||grid[yrow][ycol-1]?grid[yrow-1][ycol]||grid[yrow+1][ycol]||grid[yrow][ycol+1]?grid[yrow-1][ycol]||grid[yrow][ycol-1]||grid[yrow][ycol+1]?grid[yrow+1][ycol]||grid[yrow][ycol-1]||grid[yrow][ycol+1]?grid[yrow-1][ycol]||grid[yrow+1][ycol]?grid[yrow-1][ycol]||grid[yrow][ycol-1]?grid[yrow-1][ycol]||grid[yrow][ycol+1]?grid[yrow+1][ycol]||grid[yrow][ycol-1]?grid[yrow+1][ycol]||grid[yrow][ycol+1]?grid[yrow][ycol-1]||grid[yrow][ycol+1]?grid[yrow-1][ycol]?grid[yrow+1][ycol]?grid[yrow][ycol-1]?grid[yrow][ycol+1]?(pos0[pos0.length]=eval(yrow+1)+"-"+ycol,pos0[pos0.length]=eval(yrow-1)+"-"+ycol,pos0[pos0.length]=yrow+"-"+eval(ycol-1),pos0[pos0.length]=yrow+"-"+eval(ycol+1)):(pos1[pos1.length]=eval(yrow+1)+"-"+ycol,pos1[pos1.length]=eval(yrow-1)+"-"+ycol,pos1[pos1.length]=yrow+"-"+eval(ycol-1)):(pos1[pos1.length]=eval(yrow+1)+"-"+ycol,pos1[pos1.length]=eval(yrow-1)+"-"+ycol,pos1[pos1.length]=yrow+"-"+eval(ycol+1)):(pos1[pos1.length]=eval(yrow-1)+"-"+ycol,pos1[pos1.length]=yrow+"-"+eval(ycol-1),pos1[pos1.length]=yrow+"-"+eval(ycol+1)):(pos1[pos1.length]=eval(yrow+1)+"-"+ycol,pos1[pos1.length]=yrow+"-"+eval(ycol-1),pos1[pos1.length]=yrow+"-"+eval(ycol+1)):(pos2[pos2.length]=eval(yrow+1)+"-"+ycol,pos2[pos2.length]=eval(yrow-1)+"-"+ycol):(pos2[pos2.length]=eval(yrow-1)+"-"+ycol,pos2[pos2.length]=yrow+"-"+eval(ycol-1)):(pos2[pos2.length]=eval(yrow-1)+"-"+ycol,pos2[pos2.length]=yrow+"-"+eval(ycol+1)):(pos2[pos2.length]=eval(yrow+1)+"-"+ycol,pos2[pos2.length]=yrow+"-"+eval(ycol-1)):(pos2[pos2.length]=eval(yrow+1)+"-"+ycol,pos2[pos2.length]=yrow+"-"+eval(ycol+1)):(pos2[pos2.length]=yrow+"-"+eval(ycol-1),pos2[pos2.length]=yrow+"-"+eval(ycol+1)):pos3[pos3.length]=eval(yrow-1)+"-"+ycol:pos3[pos3.length]=eval(yrow+1)+"-"+ycol:pos3[pos3.length]=yrow+"-"+eval(ycol-1):pos3[pos3.length]=yrow+"-"+eval(ycol+1):pos4[pos4.length]=yrow+"-"+ycol);var found=!1;if(pos3.length>0){var r=parseInt(pos3[0].split("-")[0]),c=parseInt(pos3[0].split("-")[1]);return r%2==0&&c%2==1?void makeHorizontalLine(pos3[0],"C"):void makeVerticalLine(pos3[0],"C")}if(pos0.length>0||pos1.length>0){var location,redo=!1;do{var inP1=!1;redo=!1,location=Math.floor(Math.random()*(pos0.length+pos1.length)),location>=pos0.length?(location-=pos0.length,inP1=!0):inP1=!1,(!inP1&&pos2.indexOf(pos0[location])!=-1||inP1&&pos2.indexOf(pos1[location])!=-1)&&(redo=!0,inP1?(pos1[location]=pos1[pos1.length-1],pos1.length--):(pos0[location]=pos0[pos0.length-1],pos0.length--))}while(redo);if(!inP1){var r=parseInt(pos0[location].split("-")[0]),c=parseInt(pos0[location].split("-")[1]);return r%2==0&&c%2==1?void makeHorizontalLine(pos0[location],"C"):void makeVerticalLine(pos0[location],"C")}if(pos1.length>0){var r=parseInt(pos1[location].split("-")[0]),c=parseInt(pos1[location].split("-")[1]);return r%2==0&&c%2==1?void makeHorizontalLine(pos1[location],"C"):void makeVerticalLine(pos1[location],"C")}}if(pos2.length>0){var location;"e"==document.getElementById("level").value?location=easy():"m"==document.getElementById("level").value&&(location=medium());var r=parseInt(location.split("-")[0]),c=parseInt(location.split("-")[1]);return r%2==0&&c%2==1?void makeHorizontalLine(location,"C"):void makeVerticalLine(location,"C")}}function easy(){for(var location,pos4=new Array,pos3=new Array,pos2=new Array,pos1=new Array,pos0=new Array,yrow=0;yrow<grid.length;yrow++)for(var ycol=0;ycol<grid[yrow].length;ycol++)yrow%2==1&&ycol%2==1&&(grid[yrow-1][ycol]||grid[yrow+1][ycol]||grid[yrow][ycol-1]||grid[yrow][ycol+1]?grid[yrow-1][ycol]||grid[yrow+1][ycol]||grid[yrow][ycol-1]?grid[yrow-1][ycol]||grid[yrow+1][ycol]||grid[yrow][ycol+1]?grid[yrow-1][ycol]||grid[yrow][ycol-1]||grid[yrow][ycol+1]?grid[yrow+1][ycol]||grid[yrow][ycol-1]||grid[yrow][ycol+1]?grid[yrow-1][ycol]||grid[yrow+1][ycol]?grid[yrow-1][ycol]||grid[yrow][ycol-1]?grid[yrow-1][ycol]||grid[yrow][ycol+1]?grid[yrow+1][ycol]||grid[yrow][ycol-1]?grid[yrow+1][ycol]||grid[yrow][ycol+1]?grid[yrow][ycol-1]||grid[yrow][ycol+1]?grid[yrow-1][ycol]?grid[yrow+1][ycol]?grid[yrow][ycol-1]?grid[yrow][ycol+1]?(pos0[pos0.length]=eval(yrow+1)+"-"+ycol,pos0[pos0.length]=eval(yrow-1)+"-"+ycol,pos0[pos0.length]=yrow+"-"+eval(ycol-1),pos0[pos0.length]=yrow+"-"+eval(ycol+1)):(pos1[pos1.length]=eval(yrow+1)+"-"+ycol,pos1[pos1.length]=eval(yrow-1)+"-"+ycol,pos1[pos1.length]=yrow+"-"+eval(ycol-1)):(pos1[pos1.length]=eval(yrow+1)+"-"+ycol,pos1[pos1.length]=eval(yrow-1)+"-"+ycol,pos1[pos1.length]=yrow+"-"+eval(ycol+1)):(pos1[pos1.length]=eval(yrow-1)+"-"+ycol,pos1[pos1.length]=yrow+"-"+eval(ycol-1),pos1[pos1.length]=yrow+"-"+eval(ycol+1)):(pos1[pos1.length]=eval(yrow+1)+"-"+ycol,pos1[pos1.length]=yrow+"-"+eval(ycol-1),pos1[pos1.length]=yrow+"-"+eval(ycol+1)):(pos2[pos2.length]=eval(yrow+1)+"-"+ycol,pos2[pos2.length]=eval(yrow-1)+"-"+ycol):(pos2[pos2.length]=eval(yrow-1)+"-"+ycol,pos2[pos2.length]=yrow+"-"+eval(ycol-1)):(pos2[pos2.length]=eval(yrow-1)+"-"+ycol,pos2[pos2.length]=yrow+"-"+eval(ycol+1)):(pos2[pos2.length]=eval(yrow+1)+"-"+ycol,pos2[pos2.length]=yrow+"-"+eval(ycol-1)):(pos2[pos2.length]=eval(yrow+1)+"-"+ycol,pos2[pos2.length]=yrow+"-"+eval(ycol+1)):(pos2[pos2.length]=yrow+"-"+eval(ycol-1),pos2[pos2.length]=yrow+"-"+eval(ycol+1)):pos3[pos3.length]=eval(yrow-1)+"-"+ycol:pos3[pos3.length]=eval(yrow+1)+"-"+ycol:pos3[pos3.length]=yrow+"-"+eval(ycol-1):pos3[pos3.length]=yrow+"-"+eval(ycol+1):pos4[pos4.length]=yrow+"-"+ycol);return location=Math.floor(Math.random()*pos2.length),pos2[location]}function medium(){var dummy;dummy=new Array(2*rows-1);for(var i=0;i<grid.length;i++)dummy[i]=new Array(2*rows-1);for(var n=0;n<grid.length;n++)for(var m=0;m<grid.length;m++)dummy[n][m]=grid[n][m];for(var pos2=new Array,pos3=new Array,pos4=new Array,box=new Array,location,yrow=0;yrow<dummy.length;yrow++)for(var ycol=0;ycol<dummy.length;ycol++)yrow%2!=0&&ycol%2!=0&&(dummy[yrow-1][ycol]||dummy[yrow+1][ycol]||dummy[yrow][ycol-1]||dummy[yrow][ycol+1]?dummy[yrow-1][ycol]||dummy[yrow+1][ycol]||dummy[yrow][ycol-1]?dummy[yrow-1][ycol]||dummy[yrow+1][ycol]||dummy[yrow][ycol+1]?dummy[yrow-1][ycol]||dummy[yrow][ycol-1]||dummy[yrow][ycol+1]?dummy[yrow+1][ycol]||dummy[yrow][ycol-1]||dummy[yrow][ycol+1]?dummy[yrow-1][ycol]||dummy[yrow+1][ycol]?dummy[yrow-1][ycol]||dummy[yrow][ycol-1]?dummy[yrow-1][ycol]||dummy[yrow][ycol+1]?dummy[yrow+1][ycol]||dummy[yrow][ycol-1]?dummy[yrow+1][ycol]||dummy[yrow][ycol+1]?dummy[yrow][ycol-1]||dummy[yrow][ycol+1]||(pos2[pos2.length]=eval(yrow+1)+"-"+ycol,pos2[pos2.length]=eval(yrow-1)+"-"+ycol):(pos2[pos2.length]=eval(yrow-1)+"-"+ycol,pos2[pos2.length]=yrow+"-"+eval(ycol-1)):(pos2[pos2.length]=eval(yrow-1)+"-"+ycol,pos2[pos2.length]=yrow+"-"+eval(ycol+1)):(pos2[pos2.length]=eval(yrow+1)+"-"+ycol,pos2[pos2.length]=yrow+"-"+eval(ycol-1)):(pos2[pos2.length]=eval(yrow+1)+"-"+ycol,pos2[pos2.length]=yrow+"-"+eval(ycol+1)):(pos2[pos2.length]=yrow+"-"+eval(ycol-1),pos2[pos2.length]=yrow+"-"+eval(ycol+1)):pos3[pos3.length]=eval(yrow-1)+"-"+ycol:pos3[pos3.length]=eval(yrow+1)+"-"+ycol:pos3[pos3.length]=yrow+"-"+eval(ycol-1):pos3[pos3.length]=yrow+"-"+eval(ycol+1):pos4[pos4.length]=yrow+"-"+ycol);for(var i=0;i<pos2.length;i++){var r=parseInt(pos2[i].split("-")[0]),c=parseInt(pos2[i].split("-")[1]),count=0;dummy[r][c]=0;for(var yrow=0;yrow<dummy.length;yrow++)for(var ycol=0;ycol<dummy.length;ycol++)yrow%2!=0&&ycol%2!=0&&(dummy[yrow-1][ycol]||dummy[yrow+1][ycol]||dummy[yrow][ycol-1]||dummy[yrow][ycol+1]?dummy[yrow-1][ycol]||dummy[yrow+1][ycol]||dummy[yrow][ycol-1]?dummy[yrow-1][ycol]||dummy[yrow+1][ycol]||dummy[yrow][ycol+1]?dummy[yrow-1][ycol]||dummy[yrow][ycol-1]||dummy[yrow][ycol+1]?dummy[yrow+1][ycol]||dummy[yrow][ycol-1]||dummy[yrow][ycol+1]||(pos3[pos3.length]=eval(yrow-1)+"-"+ycol):pos3[pos3.length]=eval(yrow+1)+"-"+ycol:pos3[pos3.length]=yrow+"-"+eval(ycol-1):pos3[pos3.length]=yrow+"-"+eval(ycol+1):pos4[pos4.length]=yrow+"-"+ycol);for(;0!=pos3.length;){var r=parseInt(pos3[0].split("-")[0]),c=parseInt(pos3[0].split("-")[1]);dummy[r][c]=0,pos3=new Array,count++;for(var yrow=0;yrow<dummy.length;yrow++)for(var ycol=0;ycol<dummy.length;ycol++)yrow%2!=0&&ycol%2!=0&&(dummy[yrow-1][ycol]||dummy[yrow+1][ycol]||dummy[yrow][ycol-1]||dummy[yrow][ycol+1]?dummy[yrow-1][ycol]||dummy[yrow+1][ycol]||dummy[yrow][ycol-1]?dummy[yrow-1][ycol]||dummy[yrow+1][ycol]||dummy[yrow][ycol+1]?dummy[yrow-1][ycol]||dummy[yrow][ycol-1]||dummy[yrow][ycol+1]?dummy[yrow+1][ycol]||dummy[yrow][ycol-1]||dummy[yrow][ycol+1]||(pos3[pos3.length]=eval(yrow-1)+"-"+ycol):pos3[pos3.length]=eval(yrow+1)+"-"+ycol:pos3[pos3.length]=yrow+"-"+eval(ycol-1):pos3[pos3.length]=yrow+"-"+eval(ycol+1):pos4[pos4.length]=yrow+"-"+ycol)}box[i]=pos2[i]+"__"+count;for(var n=0;n<grid.length;n++)for(var m=0;m<grid.length;m++)dummy[n][m]=grid[n][m]}for(var min=eval(box[0].split("__")[1]),r=0;r<box.length;r++)min>eval(box[r].split("__")[1])&&(min=eval(box[r].split("__")[1]));for(var found=!1,l=0;l<box.length&&!found;)box[l].split("__")[1]==min?found=!0:l++;return found&&(location=l),box[location].split("__")[0]}function howToPlay(){BootstrapDialog.show({title:"<b>HOW TO PLAY</b>",message:"<pre>* User and The computer take turns to place a line between two adjacent dots trying to form a box.<br>* The one who makes a box must take another turn.<br>* The one who makes the most boxes by the time all dots are connected wins.</pre>",buttons:[{id:"btn-close",label:"Close",cssClass:"btn-primary",autospin:!1,action:function(a){a.close()}}]})}function rules(){BootstrapDialog.show({title:"<b>Rules</b>",message:'The game play area of Dots & Boxes consists of an n x n grid of "dots". A players turn consists of connecting two horizontally or vertically adjacent dots with a line - diagonal lines are not allowed and the dots must be next to each other. A point is scored each time a player completes a square. When a square is created, the turn stays with the player who made the square, otherwise the turns alternate.<br>Notice that the player must complete the square to get points - even if you provide three of the sides, if your opponent fills in the fourth side, he gets the points. It is customary to fill in the square with the initial of the player who won the square. Since both players usually avoid putting lines close together until they have to, when it becomes possible to make one square, there is a whole cascade of possible squares. The player who makes the first square in such a cascade can elect to take any or all of the possible squares - there are some strategic schools of thought that say it is better not to take them all. The game is over when all the dots are connected and n*n squares have been made',buttons:[{id:"btn-close",label:"Close",cssClass:"btn-primary",autospin:!1,action:function(a){a.close()}}]})}function credits(){BootstrapDialog.show({title:"<b>Credits</b>",message:"<ul type=none><li>Developed By :</li><ul><li> J Revathi (Team Leader)</li><li> Prasad M</li><li> Naga Babu</li></ul></ul><br/><br/>Version 1.0",buttons:[{id:"btn-close",label:"Close",cssClass:"btn-primary",autospin:!0,action:function(a){a.close()}}]})}var grid,last="",rows;
