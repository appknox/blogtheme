// Create this file inside /js/ directory!
 
var getRecentPosts = function(amount, callback) {
	var rss = $("link[type='application/rss+xml']").attr("href");
	console.log(rss);
	$.get(rss, function(data) {
		var recent = [];
		var parsed = $.parseXML(data);
		var posts  = $(data).find("item");
		
		if (amount) posts = posts.slice(0, amount); // Only display the first number of posts (defined by amount)
		
		for (var i = 0; posts && i < posts.length; i++) {
			var post = posts.eq(i);
			recent.push({
				title: 	 post.find("title").text(),
				content: post.find("description").text(),
				url: 	 post.find("link").text(),
				date: 	 post.find("pubDate").text()
			});
		}
		
		callback(recent); // Done collecting posts, process to callback
	});
};
 
var crop = function(str, words) {
    var cache = str.split(/\s+/, words);
    return cache.join(" ");
}
 
// Gets called on document ready
$(function() {
	var num_posts = 5;
	
	getRecentPosts(num_posts, function(posts) { // Display [x-null] posts!
		var template = "";
		for (var i = 0; i < posts.length; i++) {
			var post = posts[i];
		    template += "<li><a href='" + post.url + "'>" + post.title + " </a></li>";
		}
		$("#posts_list").html(template)
	});
});