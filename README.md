


<h1>Additional Code Modifications</h1>

In order to implement symbol selection on hover, we modified the breadcrumblist directive to accept a "mouse-over" callback. This was designed in a similar fashion to the "selected" callback. An "ng-mouseover" was added to the "breadcrumblist-child" node in breadcrumblist.html which simply calls the "mouse-over" callback, if it exists.

<h1>Limitations</h1>

Our prototype has the following known limitations:

1. Display name uses the name configured in the navigation link URL. This may be inconsistent with the display's actual name if it has been renamed or if it contains URL encoded/escaped characters.

2. The tool does not automatically update when navigation links are added/removed/updated on the display.
