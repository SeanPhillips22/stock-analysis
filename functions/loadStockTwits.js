// Load the StockTwits widget
const loadStockTwits = (symbol) => {
	// Add the stocktwits div to the container
	var wrap = document.getElementById('altwrap');
	wrap.innerHTML = '<div id="stw"></div>';

	// Get container width
	let wrapWidth = wrap.clientWidth;
	let wrapHeight;
	if (wrapWidth < 500) {
		wrapHeight = 3500;
	} else {
		wrapHeight = 2800;
	}

	let STWT = window.STWT || {};
	(function () {
		function e() {
			var e = [];
			this.add = function (t, n) {
				e.push({ name: t, value: n });
			};
			this.toString = function () {
				var t = [];
				for (var n = 0; n < e.length; n++) {
					t[n] =
						encodeURIComponent(e[n].name) +
						'=' +
						encodeURIComponent(e[n].value);
				}
				return t.join('&');
			};
		}
		if (STWT && STWT.Widget) {
			return;
		}
		STWT.Widget = function (t) {
			function c() {
				var e =
					'https://api.stocktwits.com/addon/widget/2/widget-streams.min.js?1370378977';
				return [
					'<body style="border:0;margin:0" onload="',
					'var d=document;d._stwtWidgetIdx=' +
						window._stwtWidget.num +
						';',
					"d.getElementsByTagName('head')[0].appendChild(d.createElement('script')).src='",
					e,
					'\';"></body>',
				].join('');
			}
			t = t || {};
			var n = document.createElement('iframe');
			var r = new e();
			var i = [
				'avatars',
				'scrollbars',
				'times',
				'streaming',
				'header',
				'limit',
				'title',
				'partner',
				'symbol',
				'user',
				'canned_stream',
			];
			var s = [
				'stream_option',
				'message_option',
				'footer_option',
				'border_color',
				'border_color_2',
				'box_color',
				'header_text_color',
				'header_option',
				'divider_color',
				'stream_color',
				'username_color',
				'username_hover_color',
				'username_font',
				'username_size',
				'divider_type',
				'link_color',
				'link_hover_color',
				'link_ticker_color',
				'link_ticker_hover_color',
				'font',
				'font_option',
				'font_size',
				'text_color',
				'time_color',
				'time_font_size',
			];
			var o = document.getElementById(t.container || 'stocktwits-widget');
			var u, a, f, l;
			n.setAttribute('allowtranparency', 'true');
			n.setAttribute('frameBorder', '0');
			n.setAttribute('border', '0');
			n.setAttribute('style', 'border: 0');
			n.setAttribute('scrolling', 'no');
			a = /\d+/.test(t.width) ? t.width : 300;
			f = /\d+/.test(t.height) ? t.height : 300;
			n.style.width = a + 'px';
			n.style.height = f + 'px';
			r.add('width', a);
			r.add('height', f);
			r.add('domain', document.domain);
			if (t) {
				for (u = 0; u < i.length; u++) {
					if (t[i[u]] !== undefined) {
						r.add(i[u], t[i[u]]);
					}
				}
				if (t.style) {
					for (u = 0; u < s.length; u++) {
						if (t.style[s[u]] !== undefined) {
							r.add(s[u], t.style[s[u]]);
						}
					}
				}
			}
			o.appendChild(n);
			window._stwtWidget = window._stwtWidget || { num: 0, widgets: {} };
			window._stwtWidget.num += 1;
			window._stwtWidget[window._stwtWidget.num] = {
				w: a,
				h: f,
				param: r.toString(),
			};
			window._stwtWParam = { w: a, h: f, param: r.toString() };
			try {
				n.contentWindow.document.open();
			} catch (h) {
				l =
					"javascript:var d=document.open();d.domain='" +
					document.domain +
					"';";
				n.src = l + 'void(0);';
			}
			try {
				var p = n.contentWindow.document;
				p.write(c());
				p.close();
			} catch (h) {
				n.src =
					l + 'd.write("' + c().replace(/"/g, '\\"') + '");d.close();';
			}
		};
	})();

	STWT.Widget({
		container: 'stw',
		symbol: symbol,
		width: wrapWidth,
		height: wrapHeight,
		limit: '30',
		scrollbars: 0,
		streaming: 'false',
		title: '',
		style: {
			link_color: '000000',
			link_hover_color: '4871a8',
			header_text_color: '000000',
			border_color: 'transparent',
			border_color_2: 'transparent',
			divider_color: 'cecece',
			divider_type: 'solid',
			box_color: 'transparent',
			stream_color: 'transparent',
			text_color: '000000',
			time_color: '666666',
			font: '-apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
			font_size: 16,
			username_color: '000000',
			time_font_size: 12,
		},
	});
};

export default loadStockTwits;
