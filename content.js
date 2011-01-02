// Keep track of the last right-clicked element.
var lastRightClickedElement;
// Keep the timestamp of when lastRightClickedElement is saved.
var lastContextMenuEventTime;

// Register for the contextmenu event.
document.addEventListener("contextmenu", handleContextMenu, false);

// use custom traverser to avoid including jQuery here, since this method
// is called on *every* page load
function findParentNode(parentTagName, childObj) {
    var testObj = childObj;
    while(testObj.tagName != parentTagName) {
        testObj = testObj.parentNode;
        if (testObj.tagName == 'HTML') {
            return null;
        };
    }
    return testObj;
}

function handleContextMenu(event)
{
    lastRightClickedElement = event.target;
    lastContextMenuEventTime = new Date().getTime();
    target = findParentNode('A', event.target)
    if (target != null) {
        // Pass the right-clicked element's target url and the timestamp up to the global page.
        safari.self.tab.setContextMenuEventUserInfo(event, {
            "timestamp": lastContextMenuEventTime, "target_url": target.href });
    }
}
