var fontSize=16;
var sm=fontSize*34-16-1;
var md=fontSize*48-16-1;
var lg=fontSize*62-16-1;
var xl=fontSize*75-16-1;
var cards=[];

$(function(){
	$.ajax({
		url:"xml/cards.xml",
		type:"GET",
		dataType:"xml",
		timeout:1000,
		success:function(xml){
			$(xml).find("card").each(function(){
				var card=[];
				card["title"]=$(this).find("title").text();
				card["text"]=$(this).find("text").text();
				card["img"]=$(this).find("img").text();
				card["url"]=$(this).find("url").text();
				cards.push(card);
			});
			ifInsertCards(cards);
		}
	});	
	$(window).resize(function(){
		ifInsertCards(cards);
	});
});

function ifInsertCards(cards){
	var width=$(window).width();
	if(width<sm){
		insertCards(cards,1);
	}else if(width<md){
		insertCards(cards,2);
	}else if(width<lg){
		insertCards(cards,3);
	}else if(width<xl){
		insertCards(cards,4);
	}else{
		insertCards(cards,6);
	}
}

function insertCards(cards,columnNum){
	var value="";
	for(var j=0; j<columnNum; j++){
		value+='<div class="col-sm-6 col-md-4 col-lg-3 col-xl-2">';
		for(var i=j; i<cards.length; i+=columnNum){
			value+='<div class="card">';
			value+='<img class="card-img-top img-responsive" src="img/'+cards[i]["img"]+'" alt="Card Image" name="'+cards[i]["url"]+'">';
			value+='<div class="card-block">';
			value+='<h4 class="card-title">'+cards[i]["title"]+'</h4>';
			value+='<p class="card-text">'+cards[i]["text"]+'</p>';
			value+='<button id="'+cards[i]["url"]+'" class="btn btn-primary view-more">View More</button>';
			value+='</div>';
			value+='</div>';
		}
		value+='</div>';
	}
	$("#main").html(value);
	$(".view-more").click(function(){
		var loadFile="html/"+this.id;
		$("#individual").load(loadFile);
		var position=$("#individual").offset().top;
		$('html,body').animate({scrollTop:position},500,'swing');
	});
	$(".card-img-top").click(function(){
		var loadFile="html/"+this.name;
		$("#individual").load(loadFile);
		var position=$("#individual").offset().top;
		$('html,body').animate({scrollTop:position},500,"swing");
	});
}