/**
 * video.js v2.0
 * http://www.bawdystreaming.com
 *
 * JS file for VOD/Video On Demand page
 * Dynamically load VOD videos based on user selection
 * 
 * showsListObj  			: an object with an array of all shows with functions to populate the array with showObj objects.
 * showObj 						: individual show objects with details and functions to lookup performer names and populate performer list
 * performersListObj 	: list of performers object with an array of performerObj objects with details of each performer
 * performerObj 			: individual performer's details in an object (id, name, profile pic URL, etc)
 *
 * 1) Initialise performersListObj and populate with getPerformersList
 * 2) Initialise showsListObj and populate with getShows
 * 3) when shows populated, initialise getVideoPlayer with first video
 *
 * Copyright 2017, Rubeun Tan
 * http://www.rubeun.com
 */


// ######################### FUNCTIONS #########################

/**
 * ### showsListObj ###
 * 
 * Init:
 * Initialises array of showObj objects in showsList
 * 
 * Functions:
 * # getShows #
 * Calls updateShowPerformersListView with JSON for performer details (for name lookup)
 * Calls updateShowHTMLView to populate each show's htmlView so it can be added to showsHTML
 * Update DOM with showsHTML  
 *
 * # getVideoPlayer #
 * Sets default video to the first video in the array
 * Gets template for video player and populates videoHTML
 * Update DOM with videoHTML
 *
 * # updateVideoPlayer #
 * Takes input showID and looks up its corresponding dacastSRC and title to update video player
 */
function showsListObj () {
	var self = this;
	self.showsList = [];
	self.defaultVideoSRC = "";
	self.defaultVideoTitle = "";
	self.videoHTML = "";
	self.showsHTML = "";
	
	// # getShows #
	self.getShows = function(showsURL, performersURL, gotAllShows) {
		$.getJSON(showsURL, function(response) {
			//console.log(response);
			for (var i = 0; i < response.shows.length; i++) {
				self.showsList.push( new showObj(response.shows[i], i) );
				self.showsList[i].updateShowPerformersListView(performersURL, function () { 
					console.log("created performers list for show" + i);
				});		
				self.showsList[i].updateShowHTMLView(function() {
					console.log("show html view updated");
					
					for (var i = 0; i < self.showsList.length; i++) {
						//console.log(self.showsList[i].htmlView);
						self.showsHTML += self.showsList[i].htmlView;
			
					}
					$("#vod-box").html(self.showsHTML);
					
					//console.log(self.showsHTML);
				});
				
				// #### TODO: Populate Musical Act. #####
				
			} 
			gotAllShows();		
		});
		
	}
	
	// # getVideoPlayer #
	self.getVideoPlayer =  function() {
		// set default video as the first video in list
		self.defaultVideoSRC = self.showsList[0].dacastSRC;
		self.defaultVideoTitle = self.showsList[0].title;
		//console.log(self.defaultVideoSRC);		

		
		$.get("../video_player.html", function(template) {
		
			self.videoHTML = template.replace("{video-title}", self.defaultVideoTitle).replace("{dacast-src}", self.defaultVideoSRC);
			
		}).then(function(){
			//console.log(self.videoHTML);
			$("#dacast-video-player").html(self.videoHTML);	
		});
		
		//$("#vod-box").html(self.showsHTML);
	
	}
	
	
	// # updateVideoPlayer #
	self.updateVideoPlayer = function(showID) {
		
		console.log("Show selected is " + showID);
		// need to find self.showList.id that matches with showID

		for (var i = 0; i < self.showsList.length; i++) {
			
			if (self.showsList[i].id === showID) {
				
				self.defaultVideoTitle = self.showsList[i].getVideoTitle();
				self.defaultVideoSRC = self.showsList[i].getVideoSRC();

				$.get("../video_player.html", function(template) {
				
					self.videoHTML = template.replace("{video-title}", self.defaultVideoTitle).replace("{dacast-src}", self.defaultVideoSRC);
					
				}).then(function(){
					//console.log(self.videoHTML);
					$("#dacast-video-player").html(self.videoHTML);	
				});
			
			}		
		}
	}
	
}

/**
 * ### showObj ###
 * 
 * Init:
 * Initialises local variables with details for one show including an array of performers and musical acts
 * 
 * Functions:
 * # updateShowPerformersListView #
 * Takes input performersURL (JSON of all performer details), uses it to look up names in performersList to populate performersListView
 * 
 * # updateShowHTMLView #
 * Gets template for a show's html and populates htmlView
 */
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
	self.performersList = show.performers;
	self.musicalActList = show.musicalAct;
	self.performersListView = "";
	self.musicalActListView = "";
	self.notes = show.notes;
	self.htmlView = "";
	
	// # updateShowPerformersListView #
	self.updateShowPerformersListView = function(performersURL, gotAllPerformers) {
	
		//console.log("create performers list");
		//console.log(show.performers);
		
		// populate self.performersListView with <li>'s of all the peformers (by looking up in performers.json)
		$.getJSON(performersURL, function(response) {
			console.log("start JSON lookup");
			for (var i = 0; i < response.performers.length; i++) {
				console.log("start JSON loop");
				var performerIndex = self.performersList.indexOf(response.performers[i].id);
				
				if (performerIndex !== -1) {
					console.log(response.performers[performerIndex].name);
					self.performersListView += "<li>" + response.performers[performerIndex].name + "</li>";
				} 
												
			}
			
		}).done(function(){
			//console.log(self.performersListView);
			console.log("getJSON succeeded")
			gotAllPerformers();
		}).fail(function() {
			console.log("getJSON failed");
		});
		
		//console.log(self.performersList);
		
		
		
		// call function to populate self.musicalActListView with <li> of performer.
		
	
	
	}
	
	// # updateShowHTMLView #
	self.updateShowHTMLView = function(htmlViewUpdated) {
		
		// populate self.htmlView with template replacing with self variables
		$.get("../video_template.html", function(template){
			
			self.htmlView = template.replace("{show-id}", self.id).replace("{show-title}", self.title).replace("{show-name}", self.name).replace("{second-half-start}", self.secondHalfStartTime).replace("{performers-list}", self.performersListView).replace("{musical-list}", self.musicalActListView).replace("{facebook-url}", self.facebookURL).replace("{show-note}", self.notes);
			
		}).then(function() {
			htmlViewUpdated();
			console.log("html view populated");
			//console.log(self.htmlView);
		});	
		
	}
	
	// # getVideoSRC #
	self.getVideoSRC = function(showID) {
		return self.dacastSRC;
	}
	
	// # getVideoTitle #
	self.getVideoTitle = function(showID) {
		return self.title;
	}
	
	
}

/**
 * ### performersListObj ###
 *
 * Init:
 * Initialises an array of performerObj objects in performersList
 *
 * Functions:
 * # getPerformersList #
 * Takes input performersURL to create performerObj objects and populate performersList array
 * Calls performerObj's function updatePerformerDetails to populate each performers details
 */
function performersListObj() {
	var self = this;
	self.performersList = [];
	
	// # getPerformersList #
	self.getPerformersList = function(performersURL, performersListUpdated) {
		
		$.getJSON(performersURL, function(response) {
		
			for (var i=0; i < response.performers.length; i++) {
			
				self.performersList.push( new performerObj(response.performers[i].id, i) );
				self.performersList[i].updatePerformerDetails(performersURL, function() {
					console.log("performer details updated");
				});		
			
			}
		
		
		});
		//console.log(self.performersList);
		
	}
	
}
 

/**
 * ### performerObj ###
 *
 * Init:
 * Initialises performer details
 *
 * Functions:
 * # updatePerformerDetails #
 * Takes input performersURL (JSON of all performers details) to look up and update the performer's details
 */
function performerObj(performer, i) {

	var self = this;
	self.id = performer;
	self.name = "";
	self.pictureURL = "/img/performers/" + performer + ".jpg";
	
	// # updatePerformerDetails #	
	self.updatePerformerDetails = function(performersURL, performerUpdated) {
		$.getJSON(performersURL, function(response) {
			
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


// ######################### PAGE INIT #########################

$( document ).ready(function() {	

	// # shows & performers data #
	var showsURL = "../shows.json";
	var performersURL = "../performers.json";
	
	
	// # Initialise performers & shows #
	var performers = new performersListObj();
	performers.getPerformersList(performersURL, function() {
		console.log("got performers");
	});
	
	var shows = new showsListObj();
	shows.getShows(showsURL, performersURL, function() {
		
		console.log("got shows");
		shows.getVideoPlayer();
	
	});
	
	
/*
	// Initialise & Set Default Video Source and Title for page
	var dacastSrc = "//iframe.dacast.com/b/52952/f/477152";
	var videoTitle = "Bawdy Storytelling November 2017";
	document.getElementById('video-title').innerHTML = "Now Playing: " + videoTitle;
*/

	// ####### MUST FIX - Hack because shows not loaded before accordian set #######
	setTimeout(function() {

		//console.log(shows);
	
		$('#vod-box').accordion({
			animate: 500,
			active: 0,
			collapsible: true,
			event: "click",
			heightStyle: "content"
		});

		$("#vod-box h4").on("click", function() {
			
			shows.updateVideoPlayer(this.id);
		
		});

		$("#dacast-video-player").css("opacity", "1").css("visibility", "visible");
		$('.vod').css("opacity", "1").css("visibility", "visible");
		
	}, 2000);		
    
}); // !document.ready