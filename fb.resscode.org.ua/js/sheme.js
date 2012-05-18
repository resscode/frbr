/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function(){
    // Cache elements
    var $canvas = $('canvas');
    $canvas.on('mousedown', function() {
       // alert("Pusm me again");
    });
    // Red rectangle
$canvas.addLayer({
  method: 'drawLine',
  fillStyle: '#c33',
  x1: 200, y1: 200,
  x2: 100, y2: 200,
  x3: 50, y3: 50,
  closed: true,
  radius: 100,
  // Event bindings
  mousedown: function(params) {
          $h1.html('You pushed RED!');
          params.fillStyle = '#333';
  },
  mouseup: function(params) {
          params.fillStyle = '#c33';
  }
})

// Blue rectangle
$canvas.addLayer({
    method: 'drawRect',
    fillStyle: '#36a',
    x: 200, y: 100,
    width: 100, height: 50,
    radius: 50,
    // Event bindings
    mousedown: function(params) {
        $h1.html('You pushed BLUE!');
    }
})
.drawLayers();

    
//    window['defaultColor']='#eaeaf2';
//    window['rowCount']=2;
//    window['threadCount']=4;
//    window['isStartFrom1_2']=true;
//    window['colors']=[];
//    for(thread=0;thread<window['threadCount'];thread++)
//    {
//        window['colors'][thread]=window['defaultColor'];
//    }
//    displaySch(window['rowCount'],window['threadCount'],window['isStartFrom1_2']);
});
function SavePicture(){
    
}
function changeThreadsColors(colors,row,threadCount)
{
    for(thread=0;thread<threadCount;thread++)
    {
        tmp=document.getElementById('thread_'+row+'_'+thread); 
        $(tmp).css('backgroundColor', colors[thread]);
    }

}
function changeColors(threadCount)
{
    rowCount=window['rowCount'];
    threadCount=window['threadCount'];
    isStart1_2=window['isStartFrom1_2'];
    var tmpColors=[];
    for(t=0;t<threadCount;t++)
    {
        tmpColors[t]=window['colors'][t];
    }
    var knotCount;
    var shift=0;
    //first thread row
    changeThreadsColors(tmpColors,0,threadCount);
    //threads and knots    
    for(row=0;row<rowCount;row++)
    {
        if(isStart1_2)
        {
            knotCount=threadCount/2-threadCount%2;
            shift=0;
        }
        else
        {
            knotCount=(threadCount-1)/2-(threadCount-1)%2;
            shift=1;
        }
        isStart1_2=!isStart1_2;        
        for(knot=0;knot<knotCount;knot++)
        {
            tmp=document.getElementById('knot_'+row+'_'+knot);                
            val=tmp.value;           
            switch(val)
            {
                case '0':
                    // tmp.innerHTML='.';
                    $(tmp).css('backgroundColor', window['defaultColor']);
                    break;
                case '1':
                {
                    //tmp.innerHTML='\\';
                    $(tmp).css('backgroundColor', tmpColors[knot*2+shift]);
                    tmpCol=tmpColors[knot*2+shift];
                    tmpColors[knot*2+shift]=tmpColors[knot*2+shift+1];
                    tmpColors[knot*2+shift+1]=tmpCol;
                    break;
                }
                case '2':
                    //tmp.innerHTML='>';
                    $(tmp).css('backgroundColor', tmpColors[knot*2+shift]);
                    break;
                case '3':
                    //tmp.innerHTML='/';
                    $(tmp).css('backgroundColor', tmpColors[knot*2+shift+1]);
                    tmpCol=tmpColors[knot*2+shift];
                    tmpColors[knot*2+shift]=tmpColors[knot*2+shift+1];
                    tmpColors[knot*2+shift+1]=tmpCol;
                    break;
                case '4':
                    //tmp.innerHTML='<';
                    $(tmp).css('backgroundColor', tmpColors[knot*2+shift+1]);
                    break;
            }
            changeThreadsColors(tmpColors,row+1,threadCount);
        }
    }
}
function AddRow(){
    window['rowCount']+=2;
    displaySch(window['rowCount'],window['threadCount'],window['isStartFrom1_2']);
}
function DelRow(){
    if(window['rowCount']>2)
    {
        window['rowCount']-=2;
        displaySch(window['rowCount'],window['threadCount'],window['isStartFrom1_2']);
    }
}
function AddThread()
{
    
    window['colors'][window['threadCount']]=window['defaultColor'];
    window['threadCount']++;
    displaySch(window['rowCount'],window['threadCount'],window['isStartFrom1_2']);
//changeColors(window['threadCount']);
}
function DelThread()
{
    if(window['threadCount']>4)
    {
        window['threadCount']--;
        displaySch(window['rowCount'],window['threadCount'],window['isStartFrom1_2']);
    }
}
function changeType(idButton)
{
    tmp=document.getElementById(idButton)
    tmp.value=parseInt(tmp.value)+1;
    if(parseInt(tmp.value)>4) {
        tmp.value=0;
    }
    switch(tmp.value)
    {
        case '0':
            tmp.innerHTML='.';
            break;
        case '1':
            tmp.innerHTML='\\';
            break;
        case '2':
            tmp.innerHTML='>';
            break;
        case '3':
            tmp.innerHTML='/';
            break;
        case '4':
            tmp.innerHTML='<';
            break;
    }
    changeColors(window['threadCount']);
}
function getKnotRowHtml(rowType,row,knotCount)
{
    var str='<div class="'+rowType+'">';    
    for(column=0;column<knotCount;column++)
    {
        name='knot_'+row+'_'+column;
        str+='<button class="knot" id="'+name+'" onclick="changeType(this.id)" value=1>\\</button>';
    }
    str+='</div>';
    return str;	
}
function getThreadRowHtml(isStartFrom1,row,threadCount)
{
    var str='<div class="threads">';
    var threadType='';
    for (thread=0;thread<threadCount; thread++)
    {
        if(thread%2==0)
        {
            if (isStartFrom1)
                threadType='threadLR';
            else threadType='threadRL';
        }
        else
        {
            if (isStartFrom1)
                threadType='threadRL';
            else threadType='threadLR';
        }
        name='thread_'+row+'_'+thread; 
        str+='<button class="'+threadType+'"value="'+thread+'" id="'+name+'"> </button>';
    }
    str+='</div>';
    return str;
}
function addColorSelectorToFirstRowThread(threadCount)
{
    for(thread=0;thread<threadCount;thread++)
    {
        document.getElementById('thread_0_'+thread).onclick=function()
        {
            addColorSelecter(this.id);
        };
    }
}
function addColorSelecter(identifier){
    // color selector add
    tmp=document.getElementById(identifier);
    $(tmp).ColorPicker({
        color: '#0000ff',
        onShow: function (colpkr) {
            $(colpkr).fadeIn(500);
            return false;
        },
        onHide: function (colpkr) {
            $(colpkr).fadeOut(500);
            return false;
        },
        onChange: function (hsb, hex, rgb) {
            // $(document.getElementById(identifier).id).css('backgroundColor', '#' + hex);
            tmp=document.getElementById(identifier);
            $(tmp).css('backgroundColor', '#' + hex);
            window['colors'][parseInt(tmp.value)]='#' + hex;
            changeColors(window['threadCount']);
        
        }
    });
}
function displaySch(rowCount,threadCount,isStartFrom1_2)
{
    var sch=document.getElementById('FBscheme');
    sch.innerHTML='';
    sch.innerHTML+=getThreadRowHtml(isStartFrom1_2,0,threadCount);
    addColorSelectorToFirstRowThread(threadCount);
    
    for(row=0; row<rowCount;row=row+=2)
    {	
        var str='';
        if(isStartFrom1_2)
        {
            strRowType1='first';
            strRowType2='second';
            firstRowAdj=0;
            secondRowAdj=1;
        }
        else 
        {
            strRowType1='second';
            strRowType2='first';
            firstRowAdj=1;
            secondRowAdj=0;
        }
					
        str+=getKnotRowHtml(strRowType1,row,(threadCount-firstRowAdj)/2-(threadCount-firstRowAdj)%2);
        str+=getThreadRowHtml(!isStartFrom1_2,row+1,threadCount);
        str+=getKnotRowHtml(strRowType2,row+1,(threadCount-secondRowAdj)/2-(threadCount-secondRowAdj)%2);
        str+=getThreadRowHtml(isStartFrom1_2,row+2,threadCount);
        sch.innerHTML+=str;
    // addColorSelectorToFirstRowThread(threadCount);
    //changeThreadsColors(threadCount);
    //changeColors(threadCount);
    }
    addColorSelectorToFirstRowThread(threadCount);	
    changeColors(threadCount);
}