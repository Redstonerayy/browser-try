function createWebview(url) {
	webview = document.createElement("webview");
	webview.setAttribute("id", "test");
	webview.setAttribute("src", url);
	return webview;
}

document.querySelector(".webpage").appendChild(createWebview("https://github.com"))
