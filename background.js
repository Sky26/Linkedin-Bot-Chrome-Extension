let run = false;
let linkedinSearchUrl = "https://www.linkedin.com/search/results/";

chrome.browserAction.onClicked.addListener(function(tab) {
	run = run ? false : true;

	console.log(`Running status: ${run}`);

	if (run) {
		chrome.browserAction.setIcon({ path: "green-i.png" }, () => {
			console.log("green");
		});

		chrome.tabs.query({}, function(tabs) {
			tabs.forEach(element => {
				if (element.url.includes(linkedinSearchUrl)) {
					work(element);
				}
			});
		});
	} else {
		chrome.browserAction.setIcon({ path: "red-i.png" }, () => {
			console.log("red");
		});
	}
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
	if (run && tab.url.includes(linkedinSearchUrl)) {
		work(tab);
	}
});

function work(tab) {
	if (run) {
		if (tab.status == "complete") {
			console.log(`${tab.url} loading completed`);

			if (tab.url.includes(linkedinSearchUrl)) {
				console.log(`Running the script for ${tab.url}`);

				chrome.tabs.executeScript(tab.id, {
					file: "inject.js"
				});
			} else {
				console.log(`${tab.url} not a Linkedin search page`);
			}
		} else {
			// console.log(`${tab.url} loading not completed`);
		}
	} else {
		console.log("Not running");
	}
}
