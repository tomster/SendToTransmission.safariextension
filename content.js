// Keep track of the last right-clicked element.
var lastRightClickedElement;
// Keep the timestamp of when lastRightClickedElement is saved.
var lastContextMenuEventTime;

// Register for the contextmenu event.
document.addEventListener("contextmenu", handleContextMenu, false);

function handleContextMenu(event)
{
    lastRightClickedElement = event.target;
    lastContextMenuEventTime = new Date().getTime();
    // Pass the right-clicked element's tag name, target url and the timestamp up to the global page.
    safari.self.tab.setContextMenuEventUserInfo(event, { "tagName": event.target.tagName, 
        "timestamp": lastContextMenuEventTime, "target_url": event.target.href });
}
