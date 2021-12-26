var count = 0
var temporalSpacing = 10

/*
function pauseAll() {
	var vid = document.getElementsByTagName('video')
	for (var i = 0 ; i < vid.length ; i++) {
		var v = vid[i]
		v.pause()
	}
} 
*/

function onClick(e) {
	var vid = document.getElementsByTagName('video')
	for (var i = 0;i < vid.length ; i++) {
		var r = vid[i].getBoundingClientRect()
		if  (r.left <= e.clientX && e.clientX < r.right && r.top <= e.clientY && e.clientY < r.bottom) {
			vid[i].approved = true
		}
	}
}

/*
function clearHandlers() {
	console.log("approved")
	for (var i=0;i<playHandlers.length;i++) {
		var p = playHandlers[i]
		p[0].removeEventListener('play', p[1])
	}
}
*/

document.addEventListener("click", onClick)

function handleNewVideo(v) {
	if (! v.approved) {
		v.pause()
		if (! v.processedByMe) {
			console.log("processing ")
			function onPlay() {
				if (! v.approved) {
					console.log("forcing pause")
					v.pause()
				}
				else {
					console.log("playing approved video")
				}
			}
			v.addEventListener('play', onPlay )
			v.processedByMe = true
		}
	}
}

function watchForVideos() {
	var vid = document.getElementsByTagName('video')
	for (var i = 0; i < vid.length ; i++) {
		handleNewVideo(vid[i])
	}
	count++;
	if (count % 100 == 0) {
		temporalSpacing *= 2
		if (temporalSpacing > 1000)
			temporalSpacing = 1000
	} 
	setTimeout(watchForVideos, temporalSpacing)
}

/*obs = new MutationObserver(function(m) {
	for (var i=0; i<m.length; i++) {
		var a = m[i].addedNodes
		for (var  j=0; j<a.length; j++) {
			if (a[j].nodeName == 'video') {
				handleNewVideo(a[j])
			}
		}
	}
})
obs.observe(document, {childList:true, subtree:true}) */
watchForVideos()