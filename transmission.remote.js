/*
 * Copyright © Dave Perrett and Malcolm Jarvis
 * This code is licensed under the GPL version 2.
 * For details, see http://www.gnu.org/licenses/old-licenses/gpl-2.0.html
 *
 * Class TransmissionRemote
 */

function RPC() { }

// Constants
RPC._Root                   = '/transmission/rpc';
RPC._DaemonVersion          = 'version';
RPC._Encryption             = 'encryption';
RPC._EncryptionPreferred    = 'preferred';
RPC._EncryptionRequired     = 'required';
RPC._UpSpeedLimit           = 'speed-limit-up';
RPC._DownSpeedLimit         = 'speed-limit-down';
RPC._DownloadDir            = 'download-dir';
RPC._PeerPort               = 'peer-port';
RPC._UpSpeedLimited         = 'speed-limit-up-enabled';
RPC._DownSpeedLimited       = 'speed-limit-down-enabled';
RPC._TurtleState            = 'alt-speed-enabled';
RPC._TurtleUpSpeedLimit     = 'alt-speed-up';
RPC._TurtleDownSpeedLimit   = 'alt-speed-down';
RPC._TurtleTimeEnabled      = 'alt-speed-time-enabled';
RPC._TurtleTimeBegin        = 'alt-speed-time-begin';
RPC._TurtleTimeEnd          = 'alt-speed-time-end';
RPC._TurtleTimeDay          = 'alt-speed-time-day';
RPC._StartAddedTorrent      = 'start-added-torrents';

function TransmissionRemote( transmission_url )
{
	this.initialize( transmission_url );
	return this;
}

TransmissionRemote.prototype =
{
	/*
	 * Constructor
	 */
	initialize: function(transmission_url) {
	    this._transmission_url = transmission_url
		this._error = '';
		this._token = '';
	},

	/*
	 * Display an error if an ajax request fails, and stop sending requests
	 * or on a 409, globally set the X-Transmission-Session-Id and resend
	 */
	ajaxError: function(request, error_string, exception, ajaxObject) {
		var token;
		remote = this;

		// set the Transmission-Session-Id on a 409
		if(request.status == 409 && (token = request.getResponseHeader('X-Transmission-Session-Id'))){
			remote._token = token;
			jQuery.ajax(ajaxObject);
			return;
		}

		remote._error = request.responseText
					? request.responseText.trim().replace(/(<([^>]+)>)/ig,"")
					: "";
		if( !remote._error.length )
			remote._error = 'Server not responding';

	},

	appendSessionId: function(XHR) {
		XHR.setRequestHeader('X-Transmission-Session-Id', this._token);
	},

	sendRequest: function( data, success, async ) {
		remote = this;
		if( typeof async != 'boolean' )
			async = true;

		var ajaxSettings = {
			url: remote._transmission_url + RPC._Root,
			type: 'POST',
			contentType: 'json',
			dataType: 'json',
			cache: false,
			data: jQuery.toJSON(data),
			beforeSend: function(XHR){ remote.appendSessionId(XHR) },
			error: function(request, error_string, exception){ remote.ajaxError(request, error_string, exception, ajaxSettings) },
			success: success,
			async: async
		};

		jQuery.ajax( ajaxSettings );
	},

	addTorrentByUrl: function( url, options, success ) {
		var remote = this;
		var remote_options = {
			method: 'torrent-add',
			arguments: {
				paused: (options.paused),
				filename: url
			}
		};
		this.sendRequest(remote_options, success, false );
	},
};
