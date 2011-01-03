SendToTransmission is an extension for the Safari Browser (version 5 and up) that adds a command 'Send to Transmission' to the context menu you get when right-clicking on a URL on web page.

Selecting that command will send the torrent to a (remote, see below) instance of a Transmission bit torrent client (version 2 and up). Transmission will then download the torrent and start it automatically.

Why?
====

But why go through all this trouble, if I can simply download the torrent with one click and Transmission can automatically start downloading that? Well, the answer is, that this only works, if Transmission is running locally.

Configuration
=============

If you go to Safari's preferences and there click on the 'Extensions' tab, you should see an entry for 'Send to Transmission'. Clicking on that will allow you to change the URL of the (somewhat non-sensical) localhost default to that of a remote machine.

Authentication
**************

Authentication (you *did* activate authentication for your remotely reachable Transmission instance, right?!) is currently only supported by the ``http://USERNAME:PASSWORD@hostname.tld:9091`` schema. A future update might add proper support for authentication. Buy me a beer and I'll look into it :)

Installation
============

The easiest way is to `download the latest pre-built package from github <https://github.com/downloads/tomster/SendToTransmission.safariextension/SendToTransmission-0.1alpha2.safariextz>`_. Download it, double-click it, presto!

If you want to install from source, you will need to follow `these instructions from the Apple Developer Connection <http://developer.apple.com/library/safari/#documentation/Tools/Conceptual/SafariExtensionGuide/UsingExtensionBuilder/UsingExtensionBuilder.html#//apple_ref/doc/uid/TP40009977-CH2-SW1>`_.

It's not working!!
==================

This is the first version of my first Safari extension. It's not even beta. It works fine for me™, consider yourself lucky, if it does for you, too :) If not, open a issue here at github and I'll take a look, thanks for caring!

Changes
=======

0.1alpha2 - 2011-01-03
**********************

 * Return success message only if torrent has been verified to be actually been added
 * Improved error handling
 * Use Safari's update mechanism


0.1alpha1 - 2011-01-01
**********************

 * Initial release

TODO
====

- explicit authentication support
- optional link to take you to the transmission web ui upon successful adding
