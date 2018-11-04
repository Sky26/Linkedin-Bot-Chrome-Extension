function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

async function work() {
	window.scrollTo(0, document.body.scrollHeight);

	await sleep(1000);

	var iterator = document.evaluate(
		'//button[contains(@data-control-name, "srp_profile_actions")]',
		document,
		null,
		XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
		null
	);

	console.log("Users available: " + iterator.snapshotLength);

	for (let i = 0; i < iterator.snapshotLength; i++) {
		var thisNode = iterator.snapshotItem(i);

		if (thisNode !== null) {
			thisNode.click();

			await sleep(1000);

			var iterator2 = document.evaluate(
				"//div[1]/div/section/div/div[2]/button[2]",
				document,
				null,
				XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
				null
			);

			var thisNode2 = iterator2.snapshotItem(0);

			if (thisNode2 !== null) thisNode2.click();

			await sleep(1000);
		}

		console.log(`User ${i + 1} invited`);
		await sleep(1000);
	}

	var currentLocation = document.URL;
	var array = currentLocation.split("&");
	var index = array.findIndex(e => {
		if (e.includes("page")) return e;
	});

	if (index !== -1) {
		var pageId = parseInt(array[index].split("=")[1]);
		array[index] = "page=" + ++pageId;
	} else {
		array[array.length] = "page=2";
	}

	var newUrl = array.join("&");
	console.log("newUrl: " + newUrl);
	window.location.href = newUrl;
}

work();
