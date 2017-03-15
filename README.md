<h1>Navigation Links Tool Tab</h1>

<h2>Project Description</h2>
The motivation behind this project it to enhance the “Navigation Link” experience of Coresight. Currently, Coresight supports adding links to other Coresight displays or external sites to symbols on display. While this feature works as intended, it is difficult for users to know, just by looking at the display, whether the display has any navigation links.

In our project, we used the Tool Pane Extension feature of the Coresight Extensibility model to create a new navigation tool pane that provides Navigation Link information for displays. With this feature, when a user opens a display, the navigation tool pane automatically populates a list of displays/links defined on the current display. 

This tool tab extension can be shown on an existing Coresight installation by copying and pasting them into the ext folder under the tools folder.

<h2>Functionality</h2>
Users can interact with the tool pane in the following ways:
* Click on the link name – This action opens the link in a new tab
..* All non-display links will only be clickable on their display name and will all open in a new tab regardless of the link's setting for "Open in new tab"
* Drill-in by clicking the arrow – This action opens the linked display in the same window
..* Only Coresight displays have the option of opening in the same window, clicking the arrow will open in the same window regardless of the link's setting for "Open in new tab"
..* When opening a link for a Coresight display, the link that is opened does utilize the original link's options for including asset context and time context when navigating. In order to better visualize the asset context being passed, when hovering over a link item in the tool tab, the associated symbol is also selected

As a user drills down into sub-displays, the tab keeps track of what displays you've visited in a hierarchy format. Clicking any of the parents in the hierarchy will bring you back to that display. The hierarchy will also be created when navigating to display links entered in the URL bar.

<h2>Additional Code Modifications</h2>

In order to implement symbol selection on hover, we modified the breadcrumblist directive to accept a "mouse-over" callback. This was designed in a similar fashion to the "selected" callback. An "ng-mouseover" was added to the "breadcrumblist-child" node in breadcrumblist.html which simply calls the "mouse-over" callback, if it exists. However, this modification isn't necessary for the core functionality of the tab and the link navigation will still work without it. In addition, the symbol selection will still be possible when hovering over the display name or when selecting the link item itself.

<h2>Limitations</h2>

Our prototype has the following known limitations:

1. Display name uses the name configured in the navigation link URL. This may be inconsistent with the display's actual name if it has been renamed or if it contains URL encoded/escaped characters.

2. The tool does not automatically update when navigation links are added/removed/updated on the display.

3. The link tab does not actively check for saved Event Comparison displays and currently returns an error.
