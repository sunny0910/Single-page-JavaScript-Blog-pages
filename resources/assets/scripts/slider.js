var data = {};
var arr=[];
var flag=1;
var posts=[];
var grid=[];
var slider=[];
var posts_per_page= 4;
var s_ppp= 4;
var current_page=1;
var no_of_pages=0;
var search_pages;
var page_start=1,page_end=5;
var search_start=1,search_end=5;
var g_length=0,s_length=0,p_length=0;

$.ajax({
  url: "./data/bigdata.json",
  context: document.body
}).done(function(result) {
	data = result;
	posts= data.posts;
	posts.sort(function(a, b) {return b.datetime-a.datetime});
	grid= data.grid;
	slider= data.slider;
	g_length= grid.length;
	s_length= slider.length;
	p_length=posts.length;
	no_of_pages=Math.ceil(posts.length/posts_per_page);
	create_slider();
	create_grid();
	featured_posts();
	create_recent(current_page);
	pagination();

});

$('#pages-ul').on('click','.left-arrow',function() {
	if (flag==0) {
		current_page--;
		if(current_page>3) {
			search_start--;
			search_end--;
		}
		search_recent(arr);
		search_pagination(arr);
	} else {
		if (current_page==1){
			return false;
		}
		current_page--;
		if (current_page>3) {
			page_start--;
			page_end--;
		}
		create_recent(current_page);
		pagination();
    }
});

$('#pages-ul').on('click','.right-arrow',function() {
	if (flag==0) {
		current_page++;
		if (current_page<=search_pages-3) {
			search_start++;
			search_end++;
		}
		search_recent(arr);
		search_pagination(arr);
	} else {
		if(current_page==no_of_pages) {
			return false;
		}
		current_page++;
		if (current_page<=no_of_pages-3) {
			page_start++;
			page_end++;
		}
		create_recent(current_page);
		pagination();
	}
});



$('#pages-ul').on('click','.buttons',function() {
	var id;
	if(flag==0) {
		id=$(this).attr('id');
		if(id==current_page) {
			return false;
		}
		current_page=id;
		if (current_page<search_pages-1 && current_page>2) {
			search_start=current_page-2;
			search_end=Number(current_page) + 2;
		}
		search_recent(arr);
		search_pagination(arr);
	} else {
		id=$(this).attr('id');
		if(id==current_page) {
			return false;
		}
		current_page=id;
		if(current_page<no_of_pages-1 && current_page>2) {
				page_start=current_page-2;
				page_end=Number(current_page) + 2;
		}
		create_recent(current_page);
		pagination();
	}
});

$('#search-input').on('keyup',function() {
  var text=$('#search-input').val();
  if(text == '') {
		flag=1;
		$('#recent_h1, .recent, .pages').css('display','block');
		$('.noresult').css('display','block');
		create_recent(current_page);
		pagination();
		return false
	}
  flag=0;
  search(posts,text);
});

function search(obj,key) {
	arr=[];
	for (var i=0;i<obj.length;i++) {
		if (obj[i].title.indexOf(key)==0){ arr.push(obj[i]);}
	}
	if (obj.length==0) {
		$('#recent_h1, .recent, .pages').css('display','none');
		$('.noresult').css('display','block');
		return false;
	}
	current_page=1;
	search_recent(arr);
	search_pagination(arr);
}

function search_pagination(obj) {
	$('#pages-ul').empty();
	var no_of_search= obj.length;
	var pages = Math.ceil(no_of_search/s_ppp);
	search_pages= pages
	var j;

	if(current_page>=3) {
		$('#pages-ul').append("<button><li class='left-arrow'><a><i class='fa fa-chevron-circle-left' aria-hidden='true'></i></a></li></button>");
	}
	for (j=search_start;j<search_end+1;j++)	{
		if(j==current_page) {
			$('#pages-ul').append("<button><li><a class='active-button' id='"+j+"'>"+j+"</a></li></button>");
			continue;
		}
		$('#pages-ul').append("<button><li><a class='buttons' id='"+j+"'>"+j+"</a></li></button>");
	}
	if(current_page<=pages-2) {
		$('#pages-ul').append("<button><li class='right-arrow'><a><i class='fa fa-chevron-circle-right' aria-hidden='true'></i></li></button>");
	}
}

function search_recent(obj)
{
	$('.recent').empty();
	var i=0;
	var start=(current_page-1)*s_ppp;
    var end= obj.length < start+3 ? obj.length-1 : start+3 ;
    for (i=start; i<=end; i++) {
		$('.recent').append("<div class='article'>"+
							"<div class='preview'>"+
							"<img src='"+obj[i]['img']+"'>"+
							"<div class='tag'><a href='#'>"+obj[i]['category']+"</a></div></div>"+
							"<div class='description'>"+
							"<div class='header'><h2>"+obj[i]['title']+"</h2></div>"+
							"<div class='datestamp'><p>"+get_date(obj[i]['datetime'])+" <b>By : "+obj[i]['author']+"</b></p></div>"+
							"<div class='blog-content'><p>"+obj[i]['desc']+"</p></div>"+
							"<div class='blog-footer'><p>CONTINUE READING <i class='fa fa-long-arrow-right' aria-hidden='true'></i></p></div>"+
							"<div class='comments'><p><i class='fa fa-comment-o'></i> "+obj[i]['comment_count']+" Comments</p></div>"+
							"</div></div>"
							);
		if(i%2 == 1) {
			$('.recent').append("<div class='clear'></div>");
		}
	}
}


function pagination() {
	$('#pages-ul').empty();
	var j=0;
	current_page=Number(current_page);
	if(current_page>no_of_pages-2) {
		page_end=no_of_pages;
		page_start=current_page-3;
	}
	if(current_page<3) {
		page_start=1;
		page_end=5;
	}

	if(current_page>=3) {
		$('#pages-ul').append("<button><li class='left-arrow'><a><i class='fa fa-chevron-circle-left' aria-hidden='true'></i></a></li></button>");
	}

	for (j=page_start;j<=page_end;j++) {
		if(j==current_page) {
			$('#pages-ul').append("<button><li><a class='active-button' id='"+j+"'>"+j+"</a></li></button>");
			continue;
		}
		$('#pages-ul').append("<button><li><a class='buttons' id='"+j+"'>"+j+"</a></li></button>");
	}

	if(current_page<=no_of_pages-1) {
		$('#pages-ul').append("<button><li class='right-arrow'><a><i class='fa fa-chevron-circle-right' aria-hidden='true'></i></li></button>");
	}
}

function create_recent(current_page) {
	$('.recent').empty();
	var start=(current_page-1)*posts_per_page;
	var end= posts.length < start+3 ? posts.length-1 : start+3 ;
	var i=0;
	for( i=start; i<=end;i++) {
		$('.recent').append("<div class='article'>"+
							"<div class='preview'>"+
							"<img src='"+posts[i]['img']+"'>"+
							"<div class='tag'><a href='#'>"+posts[i]['category']+"</a></div></div>"+
							"<div class='description'>"+
							"<div class='header'><h2>"+posts[i]['title']+"</h2></div>"+
							"<div class='datestamp'><p>"+get_date(posts[i]['datetime'])+" <b>By : "+posts[i]['author']+"</b></p></div>"+
							"<div class='blog-content'><p>"+posts[i]['desc']+"</p></div>"+
							"<div class='blog-footer'><p>CONTINUE READING <i class='fa fa-long-arrow-right' aria-hidden='true'></i></p></div>"+
							"<div class='comments'><p><i class='fa fa-comment-o'></i> "+posts[i]['comment_count']+" Comments</p></div>"+
							"</div></div>"
							);
		if(i%2 == 1) $('.recent').append("<div class='clear'></div>");
	}
}

function get_date(datetime) {
	var date = new Date(datetime * 1000)
	var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

	return date.getDate() + ' ' + monthNames[date.getMonth()] + ' ' + date.getFullYear() + ' ' + date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }) + ' /'
}

function create_slider() {
	var i;
	for(i=0; i< s_length; i++) {
		if (i==0)  {
			$(".carousel-inner").append("<div class='item active'>"+
				"<img src="+slider[i]['img']+">"+
				"<div class='cover-description'>"+
				"<h2>"+slider[i]['title']+"</h2>"+
				"<p>"+slider[i]['desc']+"</p>"+
				"<p>READ MORE <i class='fa fa-long-arrow-right' aria-hidden='true'></i></p>"+
				"</div></div>");
		} else {
			$(".carousel-inner").append("<div class='item'>"+
				"<img src="+slider[i]['img']+">"+
				"<div class='cover-description'>"+
				"<h2>"+slider[i].title+"</h2>"+
				"<p>"+slider[i]['desc']+"</p>"+
				"<p>READ MORE <i class='fa fa-long-arrow-right' aria-hidden='true'></i></p>"+
				"</div></div>");
		}
	}
}

function create_grid() {
	var i;
	for (i=1; i<=g_length; i++) {
			$(".footer-images").append("<div class='f-image'><a href='"+grid[i-1]['large-img']+"' data-lightbox= 'image-"+i+"' data-title='"+grid[i-1]['title']+"'> <img src='"+grid[i-1]['small-img']+"'></a></div>");
		}

}

function featured_posts() {
	var i;
	var count=0;
	for( i=0; i<p_length; i++) {
		if(count<4 && posts[i]['is_featured']==1) {
				if(count === 0) {
					$('.ls').append("<img class='pr' src='"+posts[i]['img']+"'>");
					count++;
					} else if (count=== 1 ) {
						$('.ls').append("<img src='"+posts[i]['img']+"'>");
						count++;
					} else if (count=== 2) {
						$('.rs').append("<img class='pr' src='"+posts[i]['img']+"'>");
						count++;
					} else if (count=== 3) {
						$('.rs').append("<img src='"+posts[i]['img']+"'>");
						count++;
					}
			}
		if(count==4) {
			break;
		}
	}
}