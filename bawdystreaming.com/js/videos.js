/**
 * video.js v2.0
 * http://www.bawdystreaming.com
 *
 * JS file for VOD/Video On Demand page
 * Dynamically load VOD videos based on user selection
 * 
 * Copyright 2017, Rubeun Tan
 * http://www.rubeun.com
 */


function showListObj () {
	var self = this;
	self.showList = [];
	self.defaultVideoSRC = "";
	self.defaultVideoTitle = "";
	
	self.getShows = function(url, gotAllShows) {
		$.getJSON(url, function(response) {
			//console.log(response);
			for (var i = 0; i < response.shows.length; i++) {
				self.showList.push( new showObj(response.shows[i], i) );
				self.showList[i].updatePerformersListView(function () { 
					console.log("created performers list for show" + i);
					self.showList[i].updateHTMLView();
				})		
				// populate musical act? maybe inside showObj function?
				console.log(self.showList[i].htmlView);
			} 
			gotAllShows();		
		});
		
		// set default video as the first video in list
		//self.defaultVideoSRC = self.showList[0].dacastSRC;
		//self.defaultVideoTitle = self.showList[0].title;
				
	}
	
	self.updateDom =  function() {
		var thisHTML = "";
		for (var i = 0; i < self.showList.length; i++) {
			console.log(self.showList[i].htmlView);
			thisHTML += self.showList[i].htmlView;

		}
		$("#vod-box").html(thisHTML);
	
	}
	
}

function showObj(show, i) {
	var self = this;
	self.index = i;
	self.id = show.id;
	self.date = show.date;
	self.time = show.time;
	self.title = show.title;
	self.name = show.name;
	self.secondHalfStartTime = show.secondHalfStartTime;
	self.dacastSRC = show.dacastSRC;
	self.facebookURL = show.facebookURL;
	self.performersList = [];
	self.musicalActList = [];
	self.performersListView = "";
	self.musicalActListView = "";
	self.notes = show.notes;
	self.htmlView = "";
	
	
	self.updatePerformersListView = function(gotAllPerformers) {
	
		//console.log("create performers list");
		//console.log(show.performers);
		
		// call function to populate self.performersListView with <li>'s of all the peformers (in performerObj function)
		for (var i = 0; i < show.performers.length; i++) {
			self.performersList.push( new performerObj(show.performers[i], i) );
			self.performersList[i].updatePerformer(function() {
				//console.log("performer " + i + " updated")
				console.log(self.performersList[i].name);
				//self.performersListView += "<li>" + self.performersList[i].name + "</li>";
				gotAllPerformers();
			});
			//console.log(self.performersList[i]);
		}
		
		
		//console.log(self.performersList);
		
		
		
		// call function to populate self.musicalActListView with <li> of performer.
		
	
	
	}
	
	self.updateHTMLView = function(updatedHTMLView) {
		
		// populate self.htmlView with template replacing with self variables
		$.get("../video_template.html", function(template){
			
			self.htmlView = template.replace("{show-id}", self.id).replace("{show-title}", self.title).replace("{show-name}", self.name).replace("{second-half-start}", self.secondHalfStartTime).replace("{performers-list}", self.performersListView).replace("{musical-list}", self.musicalActListView).replace("{facebook-url}", self.facebookURL).replace("{show-note}", self.notes);
			
		}).then(function() {
			updatedHTMLView();
			console.log("html view populated");
			//console.log(self.htmlView);
		});
		
		
		
		
	}
	
}

function performerObj(performer, i) {
	var performerURL = "../performers.json";

	var self = this;
	self.id = performer;
	self.name = "";
	self.pictureURL = "/img/performers/" + performer + ".jpg";
	
	self.showName = function() { return self.name; }
	
	self.updatePerformer = function(performerUpdated) {
		$.getJSON(performerURL, function(response) {
			
			for (var i = 0; i < response.performers.length; i++) {
				
				if (response.performers[i].id === self.id) {
					//console.log(self.id + " found");
					self.name = response.performers[i].name;
					performerUpdated();
				}
				
			}
						
		});
	}
	
}


$( document ).ready(function() {	

	var showURL = "../shows.json";

	var shows = new showListObj();
	
	shows.getShows(showURL, function() {
		
		console.log("got shows");
		shows.updateDom();
	
	});
	
	

/*
	// Initialise & Set Default Video Source and Title for page
	var dacastSrc = "//iframe.dacast.com/b/52952/f/477152";
	var videoTitle = "Bawdy Storytelling November 2017";
	document.getElementById('video-title').innerHTML = "Now Playing: " + videoTitle;
*/

	$('#vod-box').accordion({
		animate: 500,
		active: 0,
		collapsible: true,
		event: "click",
		heightStyle: "content"
	});


/*
	$("#vod-box h4").on("click", function() {

		
		// Video page ID associates with DaCast video iframe source   
		switch (this.id) {
			
			case "bawdy-11-2017":				
				videoTitle = "Bawdy Storytelling November 2017";
				dacastSrc = "//iframe.dacast.com/b/52952/f/477152";
			break;	 
			case "bawdy-10-2017":				
				videoTitle = "Bawdy Storytelling October 2017";
				dacastSrc = "//iframe.dacast.com/b/52952/f/463595";
			break;	 
			case "bawdy-09-2017":				
				videoTitle = "Bawdy Storytelling September 2017";
				dacastSrc = "//iframe.dacast.com/b/52952/f/449294";
			break;	 
			case "bawdy-07-2017":				
				videoTitle = "Bawdy Storytelling July 2017";
				dacastSrc = "//iframe.dacast.com/b/52952/f/430243";
			break;	 
			case "bawdy-05-2017":				
				videoTitle = "Bawdy Storytelling May 2017";
				dacastSrc = "//iframe.dacast.com/b/52952/f/410368";
			break;	 
			case "bawdy1-02-2017":				
				videoTitle = "Bawdy Storytelling February 2017 7pm";
				dacastSrc = "//iframe.dacast.com/b/52952/f/378991";
			break;	 
			case "bawdy2-02-2017":				
				videoTitle = "Bawdy Storytelling February 2017 10pm";
				dacastSrc = "//iframe.dacast.com/b/52952/f/378892";
			break;	 						
			case "bawdy-01-2017":				
				videoTitle = "Bawdy Storytelling January 2017";
				dacastSrc = "//iframe.dacast.com/b/52952/f/364902";
			break;	 
			case "bawdy-12-2016":				
				videoTitle = "Bawdy Storytelling December 2016";
				dacastSrc = "//iframe.dacast.com/b/52952/f/354265";
			break;	 
			case "bawdy-11-2016":				
				videoTitle = "Bawdy Storytelling November 2016";
				dacastSrc = "//iframe.dacast.com/b/52952/f/339340";
			break;	 
			case "bawdy-10-2016":				
				videoTitle = "Bawdy Storytelling October 2016";
				dacastSrc = "//iframe.dacast.com/b/52952/f/333799";
			break;	 
			case "bawdy2-9-2016":				
				videoTitle = "Bawdy Storytelling September FSF 2016";
				dacastSrc = "//iframe.dacast.com/b/52952/f/328452";
			break;	 
			case "bawdy1-9-2016":				
				videoTitle = "Bawdy Storytelling September 2016";
				dacastSrc = "//iframe.dacast.com/b/52952/f/327345";
			break;	 
		
			case "bonafide-9-2016":
				videoTitle = "Bona Fide Storytelling September 2016";
				dacastSrc = "//iframe.dacast.com/b/52952/f/327405";
			break;	 
		
			case "bawdy-7-2016":
				videoTitle = "Bawdy Storytelling July 2016";
				dacastSrc = "//iframe.dacast.com/b/52952/f/317802";
			break;	 
		
			case "bonafide-7-2016":
				videoTitle = "Bona Fide Storytelling July 2016";
				dacastSrc = "//iframe.dacast.com/b/52952/f/317799";
			break;	 		
		
			case "bawdy-6-2016":				
				videoTitle = "Bawdy Storytelling June 2016";
				dacastSrc = "//iframe.dacast.com/b/52952/f/327792";
			break;	 

			case "bonafide-5-2016":				
				videoTitle = "Bona Fide Storytelling May 2016";
				dacastSrc = "//iframe.dacast.com/b/52952/f/327769";
			break;	 

			case "bawdy-summer-package-2016":				
				videoTitle = "Bawdy Storytelling Summer Package 2016";
				dacastSrc = "//iframe.dacast.com/b/52952/p/260148";
			break;	 		
				
		}
		
		// Change iFrame source to new Video's source & update the video's title		
		document.getElementById('video-iframe').src = dacastSrc;
		document.getElementById('video-title').innerHTML = "Now Playing: " + videoTitle;
		
	});  
*/
	
    
});