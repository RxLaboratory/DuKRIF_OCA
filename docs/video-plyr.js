"object" == typeof navigator && function ( e, t ) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define( "Plyr", t ) : ( e = "undefined" != typeof globalThis ? globalThis : e || self ).Plyr = t()
}( this, ( function () {
    "use strict";

    function e( e, t, i ) {
        return t in e ? Object.defineProperty( e, t, {
            value: i,
            enumerable: !0,
            configurable: !0,
            writable: !0
        } ) : e[ t ] = i, e
    }

    function t( e, t ) {
        for ( var i = 0; i < t.length; i++ ) {
            var s = t[ i ];
            s.enumerable = s.enumerable || !1, s.configurable = !0, "value" in s && ( s.writable = !0 ), Object.defineProperty( e, s.key, s )
        }
    }

    function i( e, t, i ) {
        return t in e ? Object.defineProperty( e, t, {
            value: i,
            enumerable: !0,
            configurable: !0,
            writable: !0
        } ) : e[ t ] = i, e
    }

    function s( e, t ) {
        var i = Object.keys( e );
        if ( Object.getOwnPropertySymbols ) {
            var s = Object.getOwnPropertySymbols( e );
            t && ( s = s.filter( ( function ( t ) {
                return Object.getOwnPropertyDescriptor( e, t ).enumerable
            } ) ) ), i.push.apply( i, s )
        }
        return i
    }

    function n( e ) {
        for ( var t = 1; t < arguments.length; t++ ) {
            var n = null != arguments[ t ] ? arguments[ t ] : {};
            t % 2 ? s( Object( n ), !0 ).forEach( ( function ( t ) {
                i( e, t, n[ t ] )
            } ) ) : Object.getOwnPropertyDescriptors ? Object.defineProperties( e, Object.getOwnPropertyDescriptors( n ) ) : s( Object( n ) ).forEach( ( function ( t ) {
                Object.defineProperty( e, t, Object.getOwnPropertyDescriptor( n, t ) )
            } ) )
        }
        return e
    }
    var a = {
        addCSS: !0,
        thumbWidth: 15,
        watch: !0
    };

    function l( e, t ) {
        return function () {
            return Array.from( document.querySelectorAll( t ) ).includes( this )
        }.call( e, t )
    }
    var o = function ( e ) {
            return null != e ? e.constructor : null
        },
        r = function ( e, t ) {
            return !!( e && t && e instanceof t )
        },
        c = function ( e ) {
            return null == e
        },
        h = function ( e ) {
            return o( e ) === Object
        },
        u = function ( e ) {
            return o( e ) === String
        },
        d = function ( e ) {
            return Array.isArray( e )
        },
        m = function ( e ) {
            return r( e, NodeList )
        },
        p = u,
        g = d,
        f = m,
        b = function ( e ) {
            return r( e, Element )
        },
        y = function ( e ) {
            return r( e, Event )
        },
        v = function ( e ) {
            return c( e ) || ( u( e ) || d( e ) || m( e ) ) && !e.length || h( e ) && !Object.keys( e ).length
        };

    function w( e, t ) {
        if ( 1 > t ) {
            var i = function ( e ) {
                var t = "".concat( e ).match( /(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/ );
                return t ? Math.max( 0, ( t[ 1 ] ? t[ 1 ].length : 0 ) - ( t[ 2 ] ? +t[ 2 ] : 0 ) ) : 0
            }( t );
            return parseFloat( e.toFixed( i ) )
        }
        return Math.round( e / t ) * t
    }
    var T = function () {
        function e( t, i ) {
            ( function ( e, t ) {
                if ( !( e instanceof t ) ) throw new TypeError( "Cannot call a class as a function" )
            } )( this, e ), b( t ) ? this.element = t : p( t ) && ( this.element = document.querySelector( t ) ), b( this.element ) && v( this.element.rangeTouch ) && ( this.config = n( {}, a, {}, i ), this.init() )
        }
        return function ( e, i, s ) {
            i && t( e.prototype, i ), s && t( e, s )
        }( e, [ {
            key: "init",
            value: function () {
                e.enabled && ( this.config.addCSS && ( this.element.style.userSelect = "none", this.element.style.webKitUserSelect = "none", this.element.style.touchAction = "manipulation" ), this.listeners( !0 ), this.element.rangeTouch = this )
            }
        }, {
            key: "destroy",
            value: function () {
                e.enabled && ( this.config.addCSS && ( this.element.style.userSelect = "", this.element.style.webKitUserSelect = "", this.element.style.touchAction = "" ), this.listeners( !1 ), this.element.rangeTouch = null )
            }
        }, {
            key: "listeners",
            value: function ( e ) {
                var t = this,
                    i = e ? "addEventListener" : "removeEventListener";
                [ "touchstart", "touchmove", "touchend" ].forEach( ( function ( e ) {
                    t.element[ i ]( e, ( function ( e ) {
                        return t.set( e )
                    } ), !1 )
                } ) )
            }
        }, {
            key: "get",
            value: function ( t ) {
                if ( !e.enabled || !y( t ) ) return null;
                var i, s = t.target,
                    n = t.changedTouches[ 0 ],
                    a = parseFloat( s.getAttribute( "min" ) ) || 0,
                    l = parseFloat( s.getAttribute( "max" ) ) || 100,
                    o = parseFloat( s.getAttribute( "step" ) ) || 1,
                    r = s.getBoundingClientRect(),
                    c = 100 / r.width * ( this.config.thumbWidth / 2 ) / 100;
                return 0 > ( i = 100 / r.width * ( n.clientX - r.left ) ) ? i = 0 : 100 < i && ( i = 100 ), 50 > i ? i -= ( 100 - 2 * i ) * c : 50 < i && ( i += 2 * ( i - 50 ) * c ), a + w( i / 100 * ( l - a ), o )
            }
        }, {
            key: "set",
            value: function ( t ) {
                e.enabled && y( t ) && !t.target.disabled && ( t.preventDefault(), t.target.value = this.get( t ), function ( e, t ) {
                    if ( e && t ) {
                        var i = new Event( t, {
                            bubbles: !0
                        } );
                        e.dispatchEvent( i )
                    }
                }( t.target, "touchend" === t.type ? "change" : "input" ) )
            }
        } ], [ {
            key: "setup",
            value: function ( t ) {
                var i = 1 < arguments.length && void 0 !== arguments[ 1 ] ? arguments[ 1 ] : {},
                    s = null;
                if ( v( t ) || p( t ) ? s = Array.from( document.querySelectorAll( p( t ) ? t : 'input[type="range"]' ) ) : b( t ) ? s = [ t ] : f( t ) ? s = Array.from( t ) : g( t ) && ( s = t.filter( b ) ), v( s ) ) return null;
                var o = n( {}, a, {}, i );
                if ( p( t ) && o.watch ) {
                    var r = new MutationObserver( ( function ( i ) {
                        Array.from( i ).forEach( ( function ( i ) {
                            Array.from( i.addedNodes ).forEach( ( function ( i ) {
                                b( i ) && l( i, t ) && new e( i, o )
                            } ) )
                        } ) )
                    } ) );
                    r.observe( document.body, {
                        childList: !0,
                        subtree: !0
                    } )
                }
                return s.map( ( function ( t ) {
                    return new e( t, i )
                } ) )
            }
        }, {
            key: "enabled",
            get: function () {
                return "ontouchstart" in document.documentElement
            }
        } ] ), e
    }();
    const k = e => null != e ? e.constructor : null,
        C = ( e, t ) => Boolean( e && t && e instanceof t ),
        A = e => null == e,
        S = e => k( e ) === Object,
        E = e => k( e ) === String,
        P = e => k( e ) === Function,
        N = e => Array.isArray( e ),
        M = e => C( e, NodeList ),
        x = e => A( e ) || ( E( e ) || N( e ) || M( e ) ) && !e.length || S( e ) && !Object.keys( e ).length;
    var I = A,
        L = S,
        $ = e => k( e ) === Number && !Number.isNaN( e ),
        _ = E,
        O = e => k( e ) === Boolean,
        q = P,
        j = N,
        D = M,
        H = e => null !== e && "object" == typeof e && 1 === e.nodeType && "object" == typeof e.style && "object" == typeof e.ownerDocument,
        F = e => C( e, Event ),
        R = e => C( e, KeyboardEvent ),
        V = e => C( e, TextTrack ) || !A( e ) && E( e.kind ),
        B = e => C( e, Promise ) && P( e.then ),
        U = e => {
            if ( C( e, window.URL ) ) return !0;
            if ( !E( e ) ) return !1;
            let t = e;
            e.startsWith( "http://" ) && e.startsWith( "https://" ) || ( t = `http://${e}` );
            try {
                return !x( new URL( t ).hostname )
            } catch ( e ) {
                return !1
            }
        },
        W = x;
    const z = ( () => {
        const e = document.createElement( "span" ),
            t = {
                WebkitTransition: "webkitTransitionEnd",
                MozTransition: "transitionend",
                OTransition: "oTransitionEnd otransitionend",
                transition: "transitionend"
            },
            i = Object.keys( t ).find( ( t => void 0 !== e.style[ t ] ) );
        return !!_( i ) && t[ i ]
    } )();

    function K( e, t ) {
        setTimeout( ( () => {
            try {
                e.hidden = !0, e.offsetHeight, e.hidden = !1
            } catch ( e ) {}
        } ), t )
    }
    const Y = {
        isIE: Boolean( window.document.documentMode ),
        isEdge: window.navigator.userAgent.includes( "Edge" ),
        isWebkit: "WebkitAppearance" in document.documentElement.style && !/Edge/.test( navigator.userAgent ),
        isIPhone: /(iPhone|iPod)/gi.test( navigator.platform ),
        isIos: /(iPad|iPhone|iPod)/gi.test( navigator.platform )
    };

    function Q( e, t ) {
        return t.split( "." ).reduce( ( ( e, t ) => e && e[ t ] ), e )
    }

    function X( e = {}, ...t ) {
        if ( !t.length ) return e;
        const i = t.shift();
        return L( i ) ? ( Object.keys( i ).forEach( ( t => {
            L( i[ t ] ) ? ( Object.keys( e ).includes( t ) || Object.assign( e, {
                [ t ]: {}
            } ), X( e[ t ], i[ t ] ) ) : Object.assign( e, {
                [ t ]: i[ t ]
            } )
        } ) ), X( e, ...t ) ) : e
    }

    function J( e, t ) {
        const i = e.length ? e : [ e ];
        Array.from( i ).reverse().forEach( ( ( e, i ) => {
            const s = i > 0 ? t.cloneNode( !0 ) : t,
                n = e.parentNode,
                a = e.nextSibling;
            s.appendChild( e ), a ? n.insertBefore( s, a ) : n.appendChild( s )
        } ) )
    }

    function G( e, t ) {
        H( e ) && !W( t ) && Object.entries( t ).filter( ( ( [ , e ] ) => !I( e ) ) ).forEach( ( ( [ t, i ] ) => e.setAttribute( t, i ) ) )
    }

    function Z( e, t, i ) {
        const s = document.createElement( e );
        return L( t ) && G( s, t ), _( i ) && ( s.innerText = i ), s
    }

    function ee( e, t, i, s ) {
        H( t ) && t.appendChild( Z( e, i, s ) )
    }

    function te( e ) {
        D( e ) || j( e ) ? Array.from( e ).forEach( te ) : H( e ) && H( e.parentNode ) && e.parentNode.removeChild( e )
    }

    function ie( e ) {
        if ( !H( e ) ) return;
        let {
            length: t
        } = e.childNodes;
        for ( ; t > 0; ) e.removeChild( e.lastChild ), t -= 1
    }

    function se( e, t ) {
        return H( t ) && H( t.parentNode ) && H( e ) ? ( t.parentNode.replaceChild( e, t ), e ) : null
    }

    function ne( e, t ) {
        if ( !_( e ) || W( e ) ) return {};
        const i = {},
            s = X( {}, t );
        return e.split( "," ).forEach( ( e => {
            const t = e.trim(),
                n = t.replace( ".", "" ),
                a = t.replace( /[[\]]/g, "" ).split( "=" ),
                [ l ] = a,
                o = a.length > 1 ? a[ 1 ].replace( /["']/g, "" ) : "";
            switch ( t.charAt( 0 ) ) {
                case ".":
                    _( s.class ) ? i.class = `${s.class} ${n}` : i.class = n;
                    break;
                case "#":
                    i.id = t.replace( "#", "" );
                    break;
                case "[":
                    i[ l ] = o
            }
        } ) ), X( s, i )
    }

    function ae( e, t ) {
        if ( !H( e ) ) return;
        let i = t;
        O( i ) || ( i = !e.hidden ), e.hidden = i
    }

    function le( e, t, i ) {
        if ( D( e ) ) return Array.from( e ).map( ( e => le( e, t, i ) ) );
        if ( H( e ) ) {
            let s = "toggle";
            return void 0 !== i && ( s = i ? "add" : "remove" ), e.classList[ s ]( t ), e.classList.contains( t )
        }
        return !1
    }

    function oe( e, t ) {
        return H( e ) && e.classList.contains( t )
    }

    function re( e, t ) {
        const {
            prototype: i
        } = Element;
        return ( i.matches || i.webkitMatchesSelector || i.mozMatchesSelector || i.msMatchesSelector || function () {
            return Array.from( document.querySelectorAll( t ) ).includes( this )
        } ).call( e, t )
    }

    function ce( e ) {
        return this.elements.container.querySelectorAll( e )
    }

    function he( e ) {
        return this.elements.container.querySelector( e )
    }

    function ue( e = null, t = !1 ) {
        H( e ) && ( e.focus( {
            preventScroll: !0
        } ), t && le( e, this.config.classNames.tabFocus ) )
    }
    const de = {
            "audio/ogg": "vorbis",
            "audio/wav": "1",
            "video/webm": "vp8, vorbis",
            "video/mp4": "avc1.42E01E, mp4a.40.2",
            "video/ogg": "theora"
        },
        me = {
            audio: "canPlayType" in document.createElement( "audio" ),
            video: "canPlayType" in document.createElement( "video" ),
            check( e, t, i ) {
                const s = Y.isIPhone && i && me.playsinline,
                    n = me[ e ] || "html5" !== t;
                return {
                    api: n,
                    ui: n && me.rangeInput && ( "video" !== e || !Y.isIPhone || s )
                }
            },
            pip: !( Y.isIPhone || !q( Z( "video" ).webkitSetPresentationMode ) && ( !document.pictureInPictureEnabled || Z( "video" ).disablePictureInPicture ) ),
            airplay: q( window.WebKitPlaybackTargetAvailabilityEvent ),
            playsinline: "playsInline" in document.createElement( "video" ),
            mime( e ) {
                if ( W( e ) ) return !1;
                const [ t ] = e.split( "/" );
                let i = e;
                if ( !this.isHTML5 || t !== this.type ) return !1;
                Object.keys( de ).includes( i ) && ( i += `; codecs="${de[e]}"` );
                try {
                    return Boolean( i && this.media.canPlayType( i ).replace( /no/, "" ) )
                } catch ( e ) {
                    return !1
                }
            },
            textTracks: "textTracks" in document.createElement( "video" ),
            rangeInput: ( () => {
                const e = document.createElement( "input" );
                return e.type = "range", "range" === e.type
            } )(),
            touch: "ontouchstart" in document.documentElement,
            transitions: !1 !== z,
            reducedMotion: "matchMedia" in window && window.matchMedia( "(prefers-reduced-motion)" ).matches
        },
        pe = ( () => {
            let e = !1;
            try {
                const t = Object.defineProperty( {}, "passive", {
                    get: () => ( e = !0, null )
                } );
                window.addEventListener( "test", null, t ), window.removeEventListener( "test", null, t )
            } catch ( e ) {}
            return e
        } )();

    function ge( e, t, i, s = !1, n = !0, a = !1 ) {
        if ( !e || !( "addEventListener" in e ) || W( t ) || !q( i ) ) return;
        const l = t.split( " " );
        let o = a;
        pe && ( o = {
            passive: n,
            capture: a
        } ), l.forEach( ( t => {
            this && this.eventListeners && s && this.eventListeners.push( {
                element: e,
                type: t,
                callback: i,
                options: o
            } ), e[ s ? "addEventListener" : "removeEventListener" ]( t, i, o )
        } ) )
    }

    function fe( e, t = "", i, s = !0, n = !1 ) {
        ge.call( this, e, t, i, !0, s, n )
    }

    function be( e, t = "", i, s = !0, n = !1 ) {
        ge.call( this, e, t, i, !1, s, n )
    }

    function ye( e, t = "", i, s = !0, n = !1 ) {
        const a = ( ...l ) => {
            be( e, t, a, s, n ), i.apply( this, l )
        };
        ge.call( this, e, t, a, !0, s, n )
    }

    function ve( e, t = "", i = !1, s = {} ) {
        if ( !H( e ) || W( t ) ) return;
        const n = new CustomEvent( t, {
            bubbles: i,
            detail: {
                ...s,
                plyr: this
            }
        } );
        e.dispatchEvent( n )
    }

    function we() {
        this && this.eventListeners && ( this.eventListeners.forEach( ( e => {
            const {
                element: t,
                type: i,
                callback: s,
                options: n
            } = e;
            t.removeEventListener( i, s, n )
        } ) ), this.eventListeners = [] )
    }

    function Te() {
        return new Promise( ( e => this.ready ? setTimeout( e, 0 ) : fe.call( this, this.elements.container, "ready", e ) ) ).then( ( () => {} ) )
    }

    function ke( e ) {
        B( e ) && e.then( null, ( () => {} ) )
    }

    function Ce( e ) {
        return j( e ) ? e.filter( ( ( t, i ) => e.indexOf( t ) === i ) ) : e
    }

    function Ae( e, t ) {
        return j( e ) && e.length ? e.reduce( ( ( e, i ) => Math.abs( i - t ) < Math.abs( e - t ) ? i : e ) ) : null
    }
    const Se = [
        [ 1, 1 ],
        [ 4, 3 ],
        [ 3, 4 ],
        [ 5, 4 ],
        [ 4, 5 ],
        [ 3, 2 ],
        [ 2, 3 ],
        [ 16, 10 ],
        [ 10, 16 ],
        [ 16, 9 ],
        [ 9, 16 ],
        [ 21, 9 ],
        [ 9, 21 ],
        [ 32, 9 ],
        [ 9, 32 ]
    ].reduce( ( ( e, [ t, i ] ) => ( {
        ...e,
        [ t / i ]: [ t, i ]
    } ) ), {} );

    function Ee( e ) {
        if ( !( j( e ) || _( e ) && e.includes( ":" ) ) ) return !1;
        return ( j( e ) ? e : e.split( ":" ) ).map( Number ).every( $ )
    }

    function Pe( e ) {
        if ( !j( e ) || !e.every( $ ) ) return null;
        const [ t, i ] = e, s = ( e, t ) => 0 === t ? e : s( t, e % t ), n = s( t, i );
        return [ t / n, i / n ]
    }

    function Ne( e ) {
        const t = e => Ee( e ) ? e.split( ":" ).map( Number ) : null;
        let i = t( e );
        if ( null === i && ( i = t( this.config.ratio ) ), null === i && !W( this.embed ) && j( this.embed.ratio ) && ( {
                ratio: i
            } = this.embed ), null === i && this.isHTML5 ) {
            const {
                videoWidth: e,
                videoHeight: t
            } = this.media;
            i = Pe( [ e, t ] )
        }
        return i
    }

    function Me( e ) {
        if ( !this.isVideo ) return {};
        const {
            wrapper: t
        } = this.elements, i = Ne.call( this, e );
        if ( !j( i ) ) return {};
        const [ s, n ] = i, a = 100 / s * n;
        if ( !!window.CSS && window.CSS.supports( `aspect-ratio: ${s}/${n}` ) ? t.style.aspectRatio = `${s}/${n}` : t.style.paddingBottom = `${a}%`, this.isVimeo && !this.config.vimeo.premium && this.supported.ui ) {
            const e = 100 / this.media.offsetWidth * parseInt( window.getComputedStyle( this.media ).paddingBottom, 10 ),
                i = ( e - a ) / ( e / 50 );
            this.fullscreen.active ? t.style.paddingBottom = null : this.media.style.transform = `translateY(-${i}%)`
        } else this.isHTML5 && t.classList.toggle( this.config.classNames.videoFixedRatio, null !== i );
        return {
            padding: a,
            ratio: i
        }
    }

    function xe( e, t, i = .05 ) {
        const s = e / t,
            n = Ae( Object.keys( Se ), s );
        return Math.abs( n - s ) <= i ? Se[ n ] : [ e, t ]
    }
    const Ie = {
        getSources() {
            if ( !this.isHTML5 ) return [];
            return Array.from( this.media.querySelectorAll( "source" ) ).filter( ( e => {
                const t = e.getAttribute( "type" );
                return !!W( t ) || me.mime.call( this, t )
            } ) )
        },
        getQualityOptions() {
            return this.config.quality.forced ? this.config.quality.options : Ie.getSources.call( this ).map( ( e => Number( e.getAttribute( "size" ) ) ) ).filter( Boolean )
        },
        setup() {
            if ( !this.isHTML5 ) return;
            const e = this;
            e.options.speed = e.config.speed.options, W( this.config.ratio ) || Me.call( e ), Object.defineProperty( e.media, "quality", {
                get() {
                    const t = Ie.getSources.call( e ).find( ( t => t.getAttribute( "src" ) === e.source ) );
                    return t && Number( t.getAttribute( "size" ) )
                },
                set( t ) {
                    if ( e.quality !== t ) {
                        if ( e.config.quality.forced && q( e.config.quality.onChange ) ) e.config.quality.onChange( t );
                        else {
                            const i = Ie.getSources.call( e ).find( ( e => Number( e.getAttribute( "size" ) ) === t ) );
                            if ( !i ) return;
                            const {
                                currentTime: s,
                                paused: n,
                                preload: a,
                                readyState: l,
                                playbackRate: o
                            } = e.media;
                            e.media.src = i.getAttribute( "src" ), ( "none" !== a || l ) && ( e.once( "loadedmetadata", ( () => {
                                e.speed = o, e.currentTime = s, n || ke( e.play() )
                            } ) ), e.media.load() )
                        }
                        ve.call( e, e.media, "qualitychange", !1, {
                            quality: t
                        } )
                    }
                }
            } )
        },
        cancelRequests() {
            this.isHTML5 && ( te( Ie.getSources.call( this ) ), this.media.setAttribute( "src", this.config.blankVideo ), this.media.load(), this.debug.log( "Cancelled network requests" ) )
        }
    };

    function Le( e, ...t ) {
        return W( e ) ? e : e.toString().replace( /{(\d+)}/g, ( ( e, i ) => t[ i ].toString() ) )
    }
    const $e = ( e = "", t = "", i = "" ) => e.replace( new RegExp( t.toString().replace( /([.*+?^=!:${}()|[\]/\\])/g, "\\$1" ), "g" ), i.toString() ),
        _e = ( e = "" ) => e.toString().replace( /\w\S*/g, ( e => e.charAt( 0 ).toUpperCase() + e.substr( 1 ).toLowerCase() ) );

    function Oe( e = "" ) {
        let t = e.toString();
        return t = function ( e = "" ) {
            let t = e.toString();
            return t = $e( t, "-", " " ), t = $e( t, "_", " " ), t = _e( t ), $e( t, " ", "" )
        }( t ), t.charAt( 0 ).toLowerCase() + t.slice( 1 )
    }

    function qe( e ) {
        const t = document.createElement( "div" );
        return t.appendChild( e ), t.innerHTML
    }
    const je = {
            pip: "PIP",
            airplay: "AirPlay",
            html5: "HTML5",
            vimeo: "Vimeo",
            youtube: "YouTube"
        },
        De = {
            get( e = "", t = {} ) {
                if ( W( e ) || W( t ) ) return "";
                let i = Q( t.i18n, e );
                if ( W( i ) ) return Object.keys( je ).includes( e ) ? je[ e ] : "";
                const s = {
                    "{seektime}": t.seekTime,
                    "{title}": t.title
                };
                return Object.entries( s ).forEach( ( ( [ e, t ] ) => {
                    i = $e( i, e, t )
                } ) ), i
            }
        };
    class He {
        constructor( t ) {
            e( this, "get", ( e => {
                if ( !He.supported || !this.enabled ) return null;
                const t = window.localStorage.getItem( this.key );
                if ( W( t ) ) return null;
                const i = JSON.parse( t );
                return _( e ) && e.length ? i[ e ] : i
            } ) ), e( this, "set", ( e => {
                if ( !He.supported || !this.enabled ) return;
                if ( !L( e ) ) return;
                let t = this.get();
                W( t ) && ( t = {} ), X( t, e ), window.localStorage.setItem( this.key, JSON.stringify( t ) )
            } ) ), this.enabled = t.config.storage.enabled, this.key = t.config.storage.key
        }
        static get supported() {
            try {
                if ( !( "localStorage" in window ) ) return !1;
                const e = "___test";
                return window.localStorage.setItem( e, e ), window.localStorage.removeItem( e ), !0
            } catch ( e ) {
                return !1
            }
        }
    }

    function Fe( e, t = "text" ) {
        return new Promise( ( ( i, s ) => {
            try {
                const s = new XMLHttpRequest;
                if ( !( "withCredentials" in s ) ) return;
                s.addEventListener( "load", ( () => {
                    if ( "text" === t ) try {
                        i( JSON.parse( s.responseText ) )
                    } catch ( e ) {
                        i( s.responseText )
                    } else i( s.response )
                } ) ), s.addEventListener( "error", ( () => {
                    throw new Error( s.status )
                } ) ), s.open( "GET", e, !0 ), s.responseType = t, s.send()
            } catch ( e ) {
                s( e )
            }
        } ) )
    }

    function Re( e, t ) {
        if ( !_( e ) ) return;
        const i = _( t );
        let s = !1;
        const n = () => null !== document.getElementById( t ),
            a = ( e, t ) => {
                e.innerHTML = t, i && n() || document.body.insertAdjacentElement( "afterbegin", e )
            };
        if ( !i || !n() ) {
            const n = He.supported,
                l = document.createElement( "div" );
            if ( l.setAttribute( "hidden", "" ), i && l.setAttribute( "id", t ), n ) {
                const e = window.localStorage.getItem( `cache-${t}` );
                if ( s = null !== e, s ) {
                    const t = JSON.parse( e );
                    a( l, t.content )
                }
            }
            Fe( e ).then( ( e => {
                W( e ) || ( n && window.localStorage.setItem( `cache-${t}`, JSON.stringify( {
                    content: e
                } ) ), a( l, e ) )
            } ) ).catch( ( () => {} ) )
        }
    }
    const Ve = e => Math.trunc( e / 60 / 60 % 60, 10 );

    function Be( e = 0, t = !1, i = !1 ) {
        if ( !$( e ) ) return Be( void 0, t, i );
        const s = e => `0${e}`.slice( -2 );
        let n = Ve( e );
        const a = ( l = e, Math.trunc( l / 60 % 60, 10 ) );
        var l;
        const o = ( e => Math.trunc( e % 60, 10 ) )( e );
        return n = t || n > 0 ? `${n}:` : "", `${i&&e>0?"-":""}${n}${s(a)}:${s(o)}`
    }
    const Ue = {
        getIconUrl() {
            const e = new URL( this.config.iconUrl, window.location ).host !== window.location.host || Y.isIE && !window.svg4everybody;
            return {
                url: this.config.iconUrl,
                cors: e
            }
        },
        findElements() {
            try {
                return this.elements.controls = he.call( this, this.config.selectors.controls.wrapper ), this.elements.buttons = {
                    play: ce.call( this, this.config.selectors.buttons.play ),
                    pause: he.call( this, this.config.selectors.buttons.pause ),
                    restart: he.call( this, this.config.selectors.buttons.restart ),
                    rewind: he.call( this, this.config.selectors.buttons.rewind ),
                    fastForward: he.call( this, this.config.selectors.buttons.fastForward ),
                    mute: he.call( this, this.config.selectors.buttons.mute ),
                    pip: he.call( this, this.config.selectors.buttons.pip ),
                    airplay: he.call( this, this.config.selectors.buttons.airplay ),
                    settings: he.call( this, this.config.selectors.buttons.settings ),
                    captions: he.call( this, this.config.selectors.buttons.captions ),
                    fullscreen: he.call( this, this.config.selectors.buttons.fullscreen )
                }, this.elements.progress = he.call( this, this.config.selectors.progress ), this.elements.inputs = {
                    seek: he.call( this, this.config.selectors.inputs.seek ),
                    volume: he.call( this, this.config.selectors.inputs.volume )
                }, this.elements.display = {
                    buffer: he.call( this, this.config.selectors.display.buffer ),
                    currentTime: he.call( this, this.config.selectors.display.currentTime ),
                    duration: he.call( this, this.config.selectors.display.duration )
                }, H( this.elements.progress ) && ( this.elements.display.seekTooltip = this.elements.progress.querySelector( `.${this.config.classNames.tooltip}` ) ), !0
            } catch ( e ) {
                return this.debug.warn( "It looks like there is a problem with your custom controls HTML", e ), this.toggleNativeControls( !0 ), !1
            }
        },
        createIcon( e, t ) {
            const i = "http://www.w3.org/2000/svg",
                s = Ue.getIconUrl.call( this ),
                n = `${s.cors?"":s.url}#${this.config.iconPrefix}`,
                a = document.createElementNS( i, "svg" );
            G( a, X( t, {
                "aria-hidden": "true",
                focusable: "false"
            } ) );
            const l = document.createElementNS( i, "use" ),
                o = `${n}-${e}`;
            return "href" in l && l.setAttributeNS( "http://www.w3.org/1999/xlink", "href", o ), l.setAttributeNS( "http://www.w3.org/1999/xlink", "xlink:href", o ), a.appendChild( l ), a
        },
        createLabel( e, t = {} ) {
            const i = De.get( e, this.config );
            return Z( "span", {
                ...t,
                class: [ t.class, this.config.classNames.hidden ].filter( Boolean ).join( " " )
            }, i )
        },
        createBadge( e ) {
            if ( W( e ) ) return null;
            const t = Z( "span", {
                class: this.config.classNames.menu.value
            } );
            return t.appendChild( Z( "span", {
                class: this.config.classNames.menu.badge
            }, e ) ), t
        },
        createButton( e, t ) {
            const i = X( {}, t );
            let s = Oe( e );
            const n = {
                element: "button",
                toggle: !1,
                label: null,
                icon: null,
                labelPressed: null,
                iconPressed: null
            };
            switch ( [ "element", "icon", "label" ].forEach( ( e => {
                Object.keys( i ).includes( e ) && ( n[ e ] = i[ e ], delete i[ e ] )
            } ) ), "button" !== n.element || Object.keys( i ).includes( "type" ) || ( i.type = "button" ), Object.keys( i ).includes( "class" ) ? i.class.split( " " ).some( ( e => e === this.config.classNames.control ) ) || X( i, {
                class: `${i.class} ${this.config.classNames.control}`
            } ) : i.class = this.config.classNames.control, e ) {
                case "play":
                    n.toggle = !0, n.label = "play", n.labelPressed = "pause", n.icon = "play", n.iconPressed = "pause";
                    break;
                case "mute":
                    n.toggle = !0, n.label = "mute", n.labelPressed = "unmute", n.icon = "volume", n.iconPressed = "muted";
                    break;
                case "captions":
                    n.toggle = !0, n.label = "enableCaptions", n.labelPressed = "disableCaptions", n.icon = "captions-off", n.iconPressed = "captions-on";
                    break;
                case "fullscreen":
                    n.toggle = !0, n.label = "enterFullscreen", n.labelPressed = "exitFullscreen", n.icon = "enter-fullscreen", n.iconPressed = "exit-fullscreen";
                    break;
                case "play-large":
                    i.class += ` ${this.config.classNames.control}--overlaid`, s = "play", n.label = "play", n.icon = "play";
                    break;
                default:
                    W( n.label ) && ( n.label = s ), W( n.icon ) && ( n.icon = e )
            }
            const a = Z( n.element );
            return n.toggle ? ( a.appendChild( Ue.createIcon.call( this, n.iconPressed, {
                class: "icon--pressed"
            } ) ), a.appendChild( Ue.createIcon.call( this, n.icon, {
                class: "icon--not-pressed"
            } ) ), a.appendChild( Ue.createLabel.call( this, n.labelPressed, {
                class: "label--pressed"
            } ) ), a.appendChild( Ue.createLabel.call( this, n.label, {
                class: "label--not-pressed"
            } ) ) ) : ( a.appendChild( Ue.createIcon.call( this, n.icon ) ), a.appendChild( Ue.createLabel.call( this, n.label ) ) ), X( i, ne( this.config.selectors.buttons[ s ], i ) ), G( a, i ), "play" === s ? ( j( this.elements.buttons[ s ] ) || ( this.elements.buttons[ s ] = [] ), this.elements.buttons[ s ].push( a ) ) : this.elements.buttons[ s ] = a, a
        },
        createRange( e, t ) {
            const i = Z( "input", X( ne( this.config.selectors.inputs[ e ] ), {
                type: "range",
                min: 0,
                max: 100,
                step: .01,
                value: 0,
                autocomplete: "off",
                role: "slider",
                "aria-label": De.get( e, this.config ),
                "aria-valuemin": 0,
                "aria-valuemax": 100,
                "aria-valuenow": 0
            }, t ) );
            return this.elements.inputs[ e ] = i, Ue.updateRangeFill.call( this, i ), T.setup( i ), i
        },
        createProgress( e, t ) {
            const i = Z( "progress", X( ne( this.config.selectors.display[ e ] ), {
                min: 0,
                max: 100,
                value: 0,
                role: "progressbar",
                "aria-hidden": !0
            }, t ) );
            if ( "volume" !== e ) {
                i.appendChild( Z( "span", null, "0" ) );
                const t = {
                        played: "played",
                        buffer: "buffered"
                    } [ e ],
                    s = t ? De.get( t, this.config ) : "";
                i.innerText = `% ${s.toLowerCase()}`
            }
            return this.elements.display[ e ] = i, i
        },
        createTime( e, t ) {
            const i = ne( this.config.selectors.display[ e ], t ),
                s = Z( "div", X( i, {
                    class: `${i.class?i.class:""} ${this.config.classNames.display.time} `.trim(),
                    "aria-label": De.get( e, this.config )
                } ), "00:00" );
            return this.elements.display[ e ] = s, s
        },
        bindMenuItemShortcuts( e, t ) {
            fe.call( this, e, "keydown keyup", ( i => {
                if ( ![ 32, 38, 39, 40 ].includes( i.which ) ) return;
                if ( i.preventDefault(), i.stopPropagation(), "keydown" === i.type ) return;
                const s = re( e, '[role="menuitemradio"]' );
                if ( !s && [ 32, 39 ].includes( i.which ) ) Ue.showMenuPanel.call( this, t, !0 );
                else {
                    let t;
                    32 !== i.which && ( 40 === i.which || s && 39 === i.which ? ( t = e.nextElementSibling, H( t ) || ( t = e.parentNode.firstElementChild ) ) : ( t = e.previousElementSibling, H( t ) || ( t = e.parentNode.lastElementChild ) ), ue.call( this, t, !0 ) )
                }
            } ), !1 ), fe.call( this, e, "keyup", ( e => {
                13 === e.which && Ue.focusFirstMenuItem.call( this, null, !0 )
            } ) )
        },
        createMenuItem( {
            value: e,
            list: t,
            type: i,
            title: s,
            badge: n = null,
            checked: a = !1
        } ) {
            const l = ne( this.config.selectors.inputs[ i ] ),
                o = Z( "button", X( l, {
                    type: "button",
                    role: "menuitemradio",
                    class: `${this.config.classNames.control} ${l.class?l.class:""}`.trim(),
                    "aria-checked": a,
                    value: e
                } ) ),
                r = Z( "span" );
            r.innerHTML = s, H( n ) && r.appendChild( n ), o.appendChild( r ), Object.defineProperty( o, "checked", {
                enumerable: !0,
                get: () => "true" === o.getAttribute( "aria-checked" ),
                set( e ) {
                    e && Array.from( o.parentNode.children ).filter( ( e => re( e, '[role="menuitemradio"]' ) ) ).forEach( ( e => e.setAttribute( "aria-checked", "false" ) ) ), o.setAttribute( "aria-checked", e ? "true" : "false" )
                }
            } ), this.listeners.bind( o, "click keyup", ( t => {
                if ( !R( t ) || 32 === t.which ) {
                    switch ( t.preventDefault(), t.stopPropagation(), o.checked = !0, i ) {
                        case "language":
                            this.currentTrack = Number( e );
                            break;
                        case "quality":
                            this.quality = e;
                            break;
                        case "speed":
                            this.speed = parseFloat( e )
                    }
                    Ue.showMenuPanel.call( this, "home", R( t ) )
                }
            } ), i, !1 ), Ue.bindMenuItemShortcuts.call( this, o, i ), t.appendChild( o )
        },
        formatTime( e = 0, t = !1 ) {
            if ( !$( e ) ) return e;
            return Be( e, Ve( this.duration ) > 0, t )
        },
        updateTimeDisplay( e = null, t = 0, i = !1 ) {
            H( e ) && $( t ) && ( e.innerText = Ue.formatTime( t, i ) )
        },
        updateVolume() {
            this.supported.ui && ( H( this.elements.inputs.volume ) && Ue.setRange.call( this, this.elements.inputs.volume, this.muted ? 0 : this.volume ), H( this.elements.buttons.mute ) && ( this.elements.buttons.mute.pressed = this.muted || 0 === this.volume ) )
        },
        setRange( e, t = 0 ) {
            H( e ) && ( e.value = t, Ue.updateRangeFill.call( this, e ) )
        },
        updateProgress( e ) {
            if ( !this.supported.ui || !F( e ) ) return;
            let t = 0;
            const i = ( e, t ) => {
                const i = $( t ) ? t : 0,
                    s = H( e ) ? e : this.elements.display.buffer;
                if ( H( s ) ) {
                    s.value = i;
                    const e = s.getElementsByTagName( "span" )[ 0 ];
                    H( e ) && ( e.childNodes[ 0 ].nodeValue = i )
                }
            };
            if ( e ) switch ( e.type ) {
                case "timeupdate":
                case "seeking":
                case "seeked":
                    s = this.currentTime, n = this.duration, t = 0 === s || 0 === n || Number.isNaN( s ) || Number.isNaN( n ) ? 0 : ( s / n * 100 ).toFixed( 2 ), "timeupdate" === e.type && Ue.setRange.call( this, this.elements.inputs.seek, t );
                    break;
                case "playing":
                case "progress":
                    i( this.elements.display.buffer, 100 * this.buffered )
            }
            var s, n
        },
        updateRangeFill( e ) {
            const t = F( e ) ? e.target : e;
            if ( H( t ) && "range" === t.getAttribute( "type" ) ) {
                if ( re( t, this.config.selectors.inputs.seek ) ) {
                    t.setAttribute( "aria-valuenow", this.currentTime );
                    const e = Ue.formatTime( this.currentTime ),
                        i = Ue.formatTime( this.duration ),
                        s = De.get( "seekLabel", this.config );
                    t.setAttribute( "aria-valuetext", s.replace( "{currentTime}", e ).replace( "{duration}", i ) )
                } else if ( re( t, this.config.selectors.inputs.volume ) ) {
                    const e = 100 * t.value;
                    t.setAttribute( "aria-valuenow", e ), t.setAttribute( "aria-valuetext", `${e.toFixed(1)}%` )
                } else t.setAttribute( "aria-valuenow", t.value );
                Y.isWebkit && t.style.setProperty( "--value", t.value / t.max * 100 + "%" )
            }
        },
        updateSeekTooltip( e ) {
            if ( !this.config.tooltips.seek || !H( this.elements.inputs.seek ) || !H( this.elements.display.seekTooltip ) || 0 === this.duration ) return;
            const t = `${this.config.classNames.tooltip}--visible`,
                i = e => le( this.elements.display.seekTooltip, t, e );
            if ( this.touch ) return void i( !1 );
            let s = 0;
            const n = this.elements.progress.getBoundingClientRect();
            if ( F( e ) ) s = 100 / n.width * ( e.pageX - n.left );
            else {
                if ( !oe( this.elements.display.seekTooltip, t ) ) return;
                s = parseFloat( this.elements.display.seekTooltip.style.left, 10 )
            }
            s < 0 ? s = 0 : s > 100 && ( s = 100 ), Ue.updateTimeDisplay.call( this, this.elements.display.seekTooltip, this.duration / 100 * s ), this.elements.display.seekTooltip.style.left = `${s}%`, F( e ) && [ "mouseenter", "mouseleave" ].includes( e.type ) && i( "mouseenter" === e.type )
        },
        timeUpdate( e ) {
            const t = !H( this.elements.display.duration ) && this.config.invertTime;
            Ue.updateTimeDisplay.call( this, this.elements.display.currentTime, t ? this.duration - this.currentTime : this.currentTime, t ), e && "timeupdate" === e.type && this.media.seeking || Ue.updateProgress.call( this, e )
        },
        durationUpdate() {
            if ( !this.supported.ui || !this.config.invertTime && this.currentTime ) return;
            if ( this.duration >= 2 ** 32 ) return ae( this.elements.display.currentTime, !0 ), void ae( this.elements.progress, !0 );
            H( this.elements.inputs.seek ) && this.elements.inputs.seek.setAttribute( "aria-valuemax", this.duration );
            const e = H( this.elements.display.duration );
            !e && this.config.displayDuration && this.paused && Ue.updateTimeDisplay.call( this, this.elements.display.currentTime, this.duration ), e && Ue.updateTimeDisplay.call( this, this.elements.display.duration, this.duration ), Ue.updateSeekTooltip.call( this )
        },
        toggleMenuButton( e, t ) {
            ae( this.elements.settings.buttons[ e ], !t )
        },
        updateSetting( e, t, i ) {
            const s = this.elements.settings.panels[ e ];
            let n = null,
                a = t;
            if ( "captions" === e ) n = this.currentTrack;
            else {
                if ( n = W( i ) ? this[ e ] : i, W( n ) && ( n = this.config[ e ].default ), !W( this.options[ e ] ) && !this.options[ e ].includes( n ) ) return void this.debug.warn( `Unsupported value of '${n}' for ${e}` );
                if ( !this.config[ e ].options.includes( n ) ) return void this.debug.warn( `Disabled value of '${n}' for ${e}` )
            }
            if ( H( a ) || ( a = s && s.querySelector( '[role="menu"]' ) ), !H( a ) ) return;
            this.elements.settings.buttons[ e ].querySelector( `.${this.config.classNames.menu.value}` ).innerHTML = Ue.getLabel.call( this, e, n );
            const l = a && a.querySelector( `[value="${n}"]` );
            H( l ) && ( l.checked = !0 )
        },
        getLabel( e, t ) {
            switch ( e ) {
                case "speed":
                    return 1 === t ? De.get( "normal", this.config ) : `${t}&times;`;
                case "quality":
                    if ( $( t ) ) {
                        const e = De.get( `qualityLabel.${t}`, this.config );
                        return e.length ? e : `${t}p`
                    }
                    return _e( t );
                case "captions":
                    return Ke.getLabel.call( this );
                default:
                    return null
            }
        },
        setQualityMenu( e ) {
            if ( !H( this.elements.settings.panels.quality ) ) return;
            const t = "quality",
                i = this.elements.settings.panels.quality.querySelector( '[role="menu"]' );
            j( e ) && ( this.options.quality = Ce( e ).filter( ( e => this.config.quality.options.includes( e ) ) ) );
            const s = !W( this.options.quality ) && this.options.quality.length > 1;
            if ( Ue.toggleMenuButton.call( this, t, s ), ie( i ), Ue.checkMenu.call( this ), !s ) return;
            const n = e => {
                const t = De.get( `qualityBadge.${e}`, this.config );
                return t.length ? Ue.createBadge.call( this, t ) : null
            };
            this.options.quality.sort( ( ( e, t ) => {
                const i = this.config.quality.options;
                return i.indexOf( e ) > i.indexOf( t ) ? 1 : -1
            } ) ).forEach( ( e => {
                Ue.createMenuItem.call( this, {
                    value: e,
                    list: i,
                    type: t,
                    title: Ue.getLabel.call( this, "quality", e ),
                    badge: n( e )
                } )
            } ) ), Ue.updateSetting.call( this, t, i )
        },
        setCaptionsMenu() {
            if ( !H( this.elements.settings.panels.captions ) ) return;
            const e = "captions",
                t = this.elements.settings.panels.captions.querySelector( '[role="menu"]' ),
                i = Ke.getTracks.call( this ),
                s = Boolean( i.length );
            if ( Ue.toggleMenuButton.call( this, e, s ), ie( t ), Ue.checkMenu.call( this ), !s ) return;
            const n = i.map( ( ( e, i ) => ( {
                value: i,
                checked: this.captions.toggled && this.currentTrack === i,
                title: Ke.getLabel.call( this, e ),
                badge: e.language && Ue.createBadge.call( this, e.language.toUpperCase() ),
                list: t,
                type: "language"
            } ) ) );
            n.unshift( {
                value: -1,
                checked: !this.captions.toggled,
                title: De.get( "disabled", this.config ),
                list: t,
                type: "language"
            } ), n.forEach( Ue.createMenuItem.bind( this ) ), Ue.updateSetting.call( this, e, t )
        },
        setSpeedMenu() {
            if ( !H( this.elements.settings.panels.speed ) ) return;
            const e = "speed",
                t = this.elements.settings.panels.speed.querySelector( '[role="menu"]' );
            this.options.speed = this.options.speed.filter( ( e => e >= this.minimumSpeed && e <= this.maximumSpeed ) );
            const i = !W( this.options.speed ) && this.options.speed.length > 1;
            Ue.toggleMenuButton.call( this, e, i ), ie( t ), Ue.checkMenu.call( this ), i && ( this.options.speed.forEach( ( i => {
                Ue.createMenuItem.call( this, {
                    value: i,
                    list: t,
                    type: e,
                    title: Ue.getLabel.call( this, "speed", i )
                } )
            } ) ), Ue.updateSetting.call( this, e, t ) )
        },
        checkMenu() {
            const {
                buttons: e
            } = this.elements.settings, t = !W( e ) && Object.values( e ).some( ( e => !e.hidden ) );
            ae( this.elements.settings.menu, !t )
        },
        focusFirstMenuItem( e, t = !1 ) {
            if ( this.elements.settings.popup.hidden ) return;
            let i = e;
            H( i ) || ( i = Object.values( this.elements.settings.panels ).find( ( e => !e.hidden ) ) );
            const s = i.querySelector( '[role^="menuitem"]' );
            ue.call( this, s, t )
        },
        toggleMenu( e ) {
            const {
                popup: t
            } = this.elements.settings, i = this.elements.buttons.settings;
            if ( !H( t ) || !H( i ) ) return;
            const {
                hidden: s
            } = t;
            let n = s;
            if ( O( e ) ) n = e;
            else if ( R( e ) && 27 === e.which ) n = !1;
            else if ( F( e ) ) {
                const s = q( e.composedPath ) ? e.composedPath()[ 0 ] : e.target,
                    a = t.contains( s );
                if ( a || !a && e.target !== i && n ) return
            }
            i.setAttribute( "aria-expanded", n ), ae( t, !n ), le( this.elements.container, this.config.classNames.menu.open, n ), n && R( e ) ? Ue.focusFirstMenuItem.call( this, null, !0 ) : n || s || ue.call( this, i, R( e ) )
        },
        getMenuSize( e ) {
            const t = e.cloneNode( !0 );
            t.style.position = "absolute", t.style.opacity = 0, t.removeAttribute( "hidden" ), e.parentNode.appendChild( t );
            const i = t.scrollWidth,
                s = t.scrollHeight;
            return te( t ), {
                width: i,
                height: s
            }
        },
        showMenuPanel( e = "", t = !1 ) {
            const i = this.elements.container.querySelector( `#plyr-settings-${this.id}-${e}` );
            if ( !H( i ) ) return;
            const s = i.parentNode,
                n = Array.from( s.children ).find( ( e => !e.hidden ) );
            if ( me.transitions && !me.reducedMotion ) {
                s.style.width = `${n.scrollWidth}px`, s.style.height = `${n.scrollHeight}px`;
                const e = Ue.getMenuSize.call( this, i ),
                    t = e => {
                        e.target === s && [ "width", "height" ].includes( e.propertyName ) && ( s.style.width = "", s.style.height = "", be.call( this, s, z, t ) )
                    };
                fe.call( this, s, z, t ), s.style.width = `${e.width}px`, s.style.height = `${e.height}px`
            }
            ae( n, !0 ), ae( i, !1 ), Ue.focusFirstMenuItem.call( this, i, t )
        },
        setDownloadUrl() {
            const e = this.elements.buttons.download;
            H( e ) && e.setAttribute( "href", this.download )
        },
        create( e ) {
            const {
                bindMenuItemShortcuts: t,
                createButton: i,
                createProgress: s,
                createRange: n,
                createTime: a,
                setQualityMenu: l,
                setSpeedMenu: o,
                showMenuPanel: r
            } = Ue;
            this.elements.controls = null, j( this.config.controls ) && this.config.controls.includes( "play-large" ) && this.elements.container.appendChild( i.call( this, "play-large" ) );
            const c = Z( "div", ne( this.config.selectors.controls.wrapper ) );
            this.elements.controls = c;
            const h = {
                class: "plyr__controls__item"
            };
            return Ce( j( this.config.controls ) ? this.config.controls : [] ).forEach( ( l => {
                if ( "restart" === l && c.appendChild( i.call( this, "restart", h ) ), "rewind" === l && c.appendChild( i.call( this, "rewind", h ) ), "play" === l && c.appendChild( i.call( this, "play", h ) ), "fast-forward" === l && c.appendChild( i.call( this, "fast-forward", h ) ), "progress" === l ) {
                    const t = Z( "div", {
                            class: `${h.class} plyr__progress__container`
                        } ),
                        i = Z( "div", ne( this.config.selectors.progress ) );
                    if ( i.appendChild( n.call( this, "seek", {
                            id: `plyr-seek-${e.id}`
                        } ) ), i.appendChild( s.call( this, "buffer" ) ), this.config.tooltips.seek ) {
                        const e = Z( "span", {
                            class: this.config.classNames.tooltip
                        }, "00:00" );
                        i.appendChild( e ), this.elements.display.seekTooltip = e
                    }
                    this.elements.progress = i, t.appendChild( this.elements.progress ), c.appendChild( t )
                }
                if ( "current-time" === l && c.appendChild( a.call( this, "currentTime", h ) ), "duration" === l && c.appendChild( a.call( this, "duration", h ) ), "mute" === l || "volume" === l ) {
                    let {
                        volume: t
                    } = this.elements;
                    if ( H( t ) && c.contains( t ) || ( t = Z( "div", X( {}, h, {
                            class: `${h.class} plyr__volume`.trim()
                        } ) ), this.elements.volume = t, c.appendChild( t ) ), "mute" === l && t.appendChild( i.call( this, "mute" ) ), "volume" === l && !Y.isIos ) {
                        const i = {
                            max: 1,
                            step: .05,
                            value: this.config.volume
                        };
                        t.appendChild( n.call( this, "volume", X( i, {
                            id: `plyr-volume-${e.id}`
                        } ) ) )
                    }
                }
                if ( "captions" === l && c.appendChild( i.call( this, "captions", h ) ), "settings" === l && !W( this.config.settings ) ) {
                    const s = Z( "div", X( {}, h, {
                        class: `${h.class} plyr__menu`.trim(),
                        hidden: ""
                    } ) );
                    s.appendChild( i.call( this, "settings", {
                        "aria-haspopup": !0,
                        "aria-controls": `plyr-settings-${e.id}`,
                        "aria-expanded": !1
                    } ) );
                    const n = Z( "div", {
                            class: "plyr__menu__container",
                            id: `plyr-settings-${e.id}`,
                            hidden: ""
                        } ),
                        a = Z( "div" ),
                        l = Z( "div", {
                            id: `plyr-settings-${e.id}-home`
                        } ),
                        o = Z( "div", {
                            role: "menu"
                        } );
                    l.appendChild( o ), a.appendChild( l ), this.elements.settings.panels.home = l, this.config.settings.forEach( ( i => {
                        const s = Z( "button", X( ne( this.config.selectors.buttons.settings ), {
                            type: "button",
                            class: `${this.config.classNames.control} ${this.config.classNames.control}--forward`,
                            role: "menuitem",
                            "aria-haspopup": !0,
                            hidden: ""
                        } ) );
                        t.call( this, s, i ), fe.call( this, s, "click", ( () => {
                            r.call( this, i, !1 )
                        } ) );
                        const n = Z( "span", null, De.get( i, this.config ) ),
                            l = Z( "span", {
                                class: this.config.classNames.menu.value
                            } );
                        l.innerHTML = e[ i ], n.appendChild( l ), s.appendChild( n ), o.appendChild( s );
                        const c = Z( "div", {
                                id: `plyr-settings-${e.id}-${i}`,
                                hidden: ""
                            } ),
                            h = Z( "button", {
                                type: "button",
                                class: `${this.config.classNames.control} ${this.config.classNames.control}--back`
                            } );
                        h.appendChild( Z( "span", {
                            "aria-hidden": !0
                        }, De.get( i, this.config ) ) ), h.appendChild( Z( "span", {
                            class: this.config.classNames.hidden
                        }, De.get( "menuBack", this.config ) ) ), fe.call( this, c, "keydown", ( e => {
                            37 === e.which && ( e.preventDefault(), e.stopPropagation(), r.call( this, "home", !0 ) )
                        } ), !1 ), fe.call( this, h, "click", ( () => {
                            r.call( this, "home", !1 )
                        } ) ), c.appendChild( h ), c.appendChild( Z( "div", {
                            role: "menu"
                        } ) ), a.appendChild( c ), this.elements.settings.buttons[ i ] = s, this.elements.settings.panels[ i ] = c
                    } ) ), n.appendChild( a ), s.appendChild( n ), c.appendChild( s ), this.elements.settings.popup = n, this.elements.settings.menu = s
                }
                if ( "pip" === l && me.pip && c.appendChild( i.call( this, "pip", h ) ), "airplay" === l && me.airplay && c.appendChild( i.call( this, "airplay", h ) ), "download" === l ) {
                    const e = X( {}, h, {
                        element: "a",
                        href: this.download,
                        target: "_blank"
                    } );
                    this.isHTML5 && ( e.download = "" );
                    const {
                        download: t
                    } = this.config.urls;
                    !U( t ) && this.isEmbed && X( e, {
                        icon: `logo-${this.provider}`,
                        label: this.provider
                    } ), c.appendChild( i.call( this, "download", e ) )
                }
                "fullscreen" === l && c.appendChild( i.call( this, "fullscreen", h ) )
            } ) ), this.isHTML5 && l.call( this, Ie.getQualityOptions.call( this ) ), o.call( this ), c
        },
        inject() {
            if ( this.config.loadSprite ) {
                const e = Ue.getIconUrl.call( this );
                e.cors && Re( e.url, "sprite-plyr" )
            }
            this.id = Math.floor( 1e4 * Math.random() );
            let e = null;
            this.elements.controls = null;
            const t = {
                id: this.id,
                seektime: this.config.seekTime,
                title: this.config.title
            };
            let i = !0;
            q( this.config.controls ) && ( this.config.controls = this.config.controls.call( this, t ) ), this.config.controls || ( this.config.controls = [] ), H( this.config.controls ) || _( this.config.controls ) ? e = this.config.controls : ( e = Ue.create.call( this, {
                id: this.id,
                seektime: this.config.seekTime,
                speed: this.speed,
                quality: this.quality,
                captions: Ke.getLabel.call( this )
            } ), i = !1 );
            let s;
            i && _( this.config.controls ) && ( e = ( e => {
                let i = e;
                return Object.entries( t ).forEach( ( ( [ e, t ] ) => {
                    i = $e( i, `{${e}}`, t )
                } ) ), i
            } )( e ) ), _( this.config.selectors.controls.container ) && ( s = document.querySelector( this.config.selectors.controls.container ) ), H( s ) || ( s = this.elements.container );
            if ( s[ H( e ) ? "insertAdjacentElement" : "insertAdjacentHTML" ]( "afterbegin", e ), H( this.elements.controls ) || Ue.findElements.call( this ), !W( this.elements.buttons ) ) {
                const e = e => {
                    const t = this.config.classNames.controlPressed;
                    Object.defineProperty( e, "pressed", {
                        enumerable: !0,
                        get: () => oe( e, t ),
                        set( i = !1 ) {
                            le( e, t, i )
                        }
                    } )
                };
                Object.values( this.elements.buttons ).filter( Boolean ).forEach( ( t => {
                    j( t ) || D( t ) ? Array.from( t ).filter( Boolean ).forEach( e ) : e( t )
                } ) )
            }
            if ( Y.isEdge && K( s ), this.config.tooltips.controls ) {
                const {
                    classNames: e,
                    selectors: t
                } = this.config, i = `${t.controls.wrapper} ${t.labels} .${e.hidden}`, s = ce.call( this, i );
                Array.from( s ).forEach( ( e => {
                    le( e, this.config.classNames.hidden, !1 ), le( e, this.config.classNames.tooltip, !0 )
                } ) )
            }
        }
    };

    function We( e, t = !0 ) {
        let i = e;
        if ( t ) {
            const e = document.createElement( "a" );
            e.href = i, i = e.href
        }
        try {
            return new URL( i )
        } catch ( e ) {
            return null
        }
    }

    function ze( e ) {
        const t = new URLSearchParams;
        return L( e ) && Object.entries( e ).forEach( ( ( [ e, i ] ) => {
            t.set( e, i )
        } ) ), t
    }
    const Ke = {
            setup() {
                if ( !this.supported.ui ) return;
                if ( !this.isVideo || this.isYouTube || this.isHTML5 && !me.textTracks ) return void( j( this.config.controls ) && this.config.controls.includes( "settings" ) && this.config.settings.includes( "captions" ) && Ue.setCaptionsMenu.call( this ) );
                var e, t;
                if ( H( this.elements.captions ) || ( this.elements.captions = Z( "div", ne( this.config.selectors.captions ) ), e = this.elements.captions, t = this.elements.wrapper, H( e ) && H( t ) && t.parentNode.insertBefore( e, t.nextSibling ) ), Y.isIE && window.URL ) {
                    const e = this.media.querySelectorAll( "track" );
                    Array.from( e ).forEach( ( e => {
                        const t = e.getAttribute( "src" ),
                            i = We( t );
                        null !== i && i.hostname !== window.location.href.hostname && [ "http:", "https:" ].includes( i.protocol ) && Fe( t, "blob" ).then( ( t => {
                            e.setAttribute( "src", window.URL.createObjectURL( t ) )
                        } ) ).catch( ( () => {
                            te( e )
                        } ) )
                    } ) )
                }
                const i = Ce( ( navigator.languages || [ navigator.language || navigator.userLanguage || "en" ] ).map( ( e => e.split( "-" )[ 0 ] ) ) );
                let s = ( this.storage.get( "language" ) || this.config.captions.language || "auto" ).toLowerCase();
                "auto" === s && ( [ s ] = i );
                let n = this.storage.get( "captions" );
                if ( O( n ) || ( {
                        active: n
                    } = this.config.captions ), Object.assign( this.captions, {
                        toggled: !1,
                        active: n,
                        language: s,
                        languages: i
                    } ), this.isHTML5 ) {
                    const e = this.config.captions.update ? "addtrack removetrack" : "removetrack";
                    fe.call( this, this.media.textTracks, e, Ke.update.bind( this ) )
                }
                setTimeout( Ke.update.bind( this ), 0 )
            },
            update() {
                const e = Ke.getTracks.call( this, !0 ),
                    {
                        active: t,
                        language: i,
                        meta: s,
                        currentTrackNode: n
                    } = this.captions,
                    a = Boolean( e.find( ( e => e.language === i ) ) );
                this.isHTML5 && this.isVideo && e.filter( ( e => !s.get( e ) ) ).forEach( ( e => {
                    this.debug.log( "Track added", e ), s.set( e, {
                        default: "showing" === e.mode
                    } ), "showing" === e.mode && ( e.mode = "hidden" ), fe.call( this, e, "cuechange", ( () => Ke.updateCues.call( this ) ) )
                } ) ), ( a && this.language !== i || !e.includes( n ) ) && ( Ke.setLanguage.call( this, i ), Ke.toggle.call( this, t && a ) ), le( this.elements.container, this.config.classNames.captions.enabled, !W( e ) ), j( this.config.controls ) && this.config.controls.includes( "settings" ) && this.config.settings.includes( "captions" ) && Ue.setCaptionsMenu.call( this )
            },
            toggle( e, t = !0 ) {
                if ( !this.supported.ui ) return;
                const {
                    toggled: i
                } = this.captions, s = this.config.classNames.captions.active, n = I( e ) ? !i : e;
                if ( n !== i ) {
                    if ( t || ( this.captions.active = n, this.storage.set( {
                            captions: n
                        } ) ), !this.language && n && !t ) {
                        const e = Ke.getTracks.call( this ),
                            t = Ke.findTrack.call( this, [ this.captions.language, ...this.captions.languages ], !0 );
                        return this.captions.language = t.language, void Ke.set.call( this, e.indexOf( t ) )
                    }
                    this.elements.buttons.captions && ( this.elements.buttons.captions.pressed = n ), le( this.elements.container, s, n ), this.captions.toggled = n, Ue.updateSetting.call( this, "captions" ), ve.call( this, this.media, n ? "captionsenabled" : "captionsdisabled" )
                }
                setTimeout( ( () => {
                    n && this.captions.toggled && ( this.captions.currentTrackNode.mode = "hidden" )
                } ) )
            },
            set( e, t = !0 ) {
                const i = Ke.getTracks.call( this );
                if ( -1 !== e )
                    if ( $( e ) )
                        if ( e in i ) {
                            if ( this.captions.currentTrack !== e ) {
                                this.captions.currentTrack = e;
                                const s = i[ e ],
                                    {
                                        language: n
                                    } = s || {};
                                this.captions.currentTrackNode = s, Ue.updateSetting.call( this, "captions" ), t || ( this.captions.language = n, this.storage.set( {
                                    language: n
                                } ) ), this.isVimeo && this.embed.enableTextTrack( n ), ve.call( this, this.media, "languagechange" )
                            }
                            Ke.toggle.call( this, !0, t ), this.isHTML5 && this.isVideo && Ke.updateCues.call( this )
                        } else this.debug.warn( "Track not found", e );
                else this.debug.warn( "Invalid caption argument", e );
                else Ke.toggle.call( this, !1, t )
            },
            setLanguage( e, t = !0 ) {
                if ( !_( e ) ) return void this.debug.warn( "Invalid language argument", e );
                const i = e.toLowerCase();
                this.captions.language = i;
                const s = Ke.getTracks.call( this ),
                    n = Ke.findTrack.call( this, [ i ] );
                Ke.set.call( this, s.indexOf( n ), t )
            },
            getTracks( e = !1 ) {
                return Array.from( ( this.media || {} ).textTracks || [] ).filter( ( t => !this.isHTML5 || e || this.captions.meta.has( t ) ) ).filter( ( e => [ "captions", "subtitles" ].includes( e.kind ) ) )
            },
            findTrack( e, t = !1 ) {
                const i = Ke.getTracks.call( this ),
                    s = e => Number( ( this.captions.meta.get( e ) || {} ).default ),
                    n = Array.from( i ).sort( ( ( e, t ) => s( t ) - s( e ) ) );
                let a;
                return e.every( ( e => ( a = n.find( ( t => t.language === e ) ), !a ) ) ), a || ( t ? n[ 0 ] : void 0 )
            },
            getCurrentTrack() {
                return Ke.getTracks.call( this )[ this.currentTrack ]
            },
            getLabel( e ) {
                let t = e;
                return !V( t ) && me.textTracks && this.captions.toggled && ( t = Ke.getCurrentTrack.call( this ) ), V( t ) ? W( t.label ) ? W( t.language ) ? De.get( "enabled", this.config ) : e.language.toUpperCase() : t.label : De.get( "disabled", this.config )
            },
            updateCues( e ) {
                if ( !this.supported.ui ) return;
                if ( !H( this.elements.captions ) ) return void this.debug.warn( "No captions element to render to" );
                if ( !I( e ) && !Array.isArray( e ) ) return void this.debug.warn( "updateCues: Invalid input", e );
                let t = e;
                if ( !t ) {
                    const e = Ke.getCurrentTrack.call( this );
                    t = Array.from( ( e || {} ).activeCues || [] ).map( ( e => e.getCueAsHTML() ) ).map( qe )
                }
                const i = t.map( ( e => e.trim() ) ).join( "\n" );
                if ( i !== this.elements.captions.innerHTML ) {
                    ie( this.elements.captions );
                    const e = Z( "span", ne( this.config.selectors.caption ) );
                    e.innerHTML = i, this.elements.captions.appendChild( e ), ve.call( this, this.media, "cuechange" )
                }
            }
        },
        Ye = {
            enabled: !0,
            title: "",
            debug: !1,
            autoplay: !1,
            autopause: !0,
            playsinline: !0,
            seekTime: 10,
            volume: 1,
            muted: !1,
            duration: null,
            displayDuration: !0,
            invertTime: !0,
            toggleInvert: !0,
            ratio: null,
            clickToPlay: !0,
            hideControls: !0,
            resetOnEnd: !1,
            disableContextMenu: !0,
            loadSprite: !0,
            iconPrefix: "plyr",
            iconUrl: "https://cdn.plyr.io/3.6.7/plyr.svg",
            blankVideo: "https://cdn.plyr.io/static/blank.mp4",
            quality: {
                default: 576,
                options: [ 4320, 2880, 2160, 1440, 1080, 720, 576, 480, 360, 240 ],
                forced: !1,
                onChange: null
            },
            loop: {
                active: !1
            },
            speed: {
                selected: 1,
                options: [ .5, .75, 1, 1.25, 1.5, 1.75, 2, 4 ]
            },
            keyboard: {
                focused: !0,
                global: !1
            },
            tooltips: {
                controls: !1,
                seek: !0
            },
            captions: {
                active: !1,
                language: "auto",
                update: !1
            },
            fullscreen: {
                enabled: !0,
                fallback: !0,
                iosNative: !1
            },
            storage: {
                enabled: !0,
                key: "plyr"
            },
            controls: [ "play-large", "play", "progress", "current-time", "mute", "volume", "captions", "settings", "pip", "airplay", "fullscreen" ],
            settings: [ "captions", "quality", "speed" ],
            i18n: {
                restart: "Restart",
                rewind: "Rewind {seektime}s",
                play: "Play",
                pause: "Pause",
                fastForward: "Forward {seektime}s",
                seek: "Seek",
                seekLabel: "{currentTime} of {duration}",
                played: "Played",
                buffered: "Buffered",
                currentTime: "Current time",
                duration: "Duration",
                volume: "Volume",
                mute: "Mute",
                unmute: "Unmute",
                enableCaptions: "Enable captions",
                disableCaptions: "Disable captions",
                download: "Download",
                enterFullscreen: "Enter fullscreen",
                exitFullscreen: "Exit fullscreen",
                frameTitle: "Player for {title}",
                captions: "Captions",
                settings: "Settings",
                pip: "PIP",
                menuBack: "Go back to previous menu",
                speed: "Speed",
                normal: "Normal",
                quality: "Quality",
                loop: "Loop",
                start: "Start",
                end: "End",
                all: "All",
                reset: "Reset",
                disabled: "Disabled",
                enabled: "Enabled",
                advertisement: "Ad",
                qualityBadge: {
                    2160: "4K",
                    1440: "HD",
                    1080: "HD",
                    720: "HD",
                    576: "SD",
                    480: "SD"
                }
            },
            urls: {
                download: null,
                vimeo: {
                    sdk: "https://player.vimeo.com/api/player.js",
                    iframe: "https://player.vimeo.com/video/{0}?{1}",
                    api: "https://vimeo.com/api/oembed.json?url={0}"
                },
                youtube: {
                    sdk: "https://www.youtube.com/iframe_api",
                    api: "https://noembed.com/embed?url=https://www.youtube.com/watch?v={0}"
                },
                googleIMA: {
                    sdk: "https://imasdk.googleapis.com/js/sdkloader/ima3.js"
                }
            },
            listeners: {
                seek: null,
                play: null,
                pause: null,
                restart: null,
                rewind: null,
                fastForward: null,
                mute: null,
                volume: null,
                captions: null,
                download: null,
                fullscreen: null,
                pip: null,
                airplay: null,
                speed: null,
                quality: null,
                loop: null,
                language: null
            },
            events: [ "ended", "progress", "stalled", "playing", "waiting", "canplay", "canplaythrough", "loadstart", "loadeddata", "loadedmetadata", "timeupdate", "volumechange", "play", "pause", "error", "seeking", "seeked", "emptied", "ratechange", "cuechange", "download", "enterfullscreen", "exitfullscreen", "captionsenabled", "captionsdisabled", "languagechange", "controlshidden", "controlsshown", "ready", "statechange", "qualitychange", "adsloaded", "adscontentpause", "adscontentresume", "adstarted", "adsmidpoint", "adscomplete", "adsallcomplete", "adsimpression", "adsclick" ],
            selectors: {
                editable: "input, textarea, select, [contenteditable]",
                container: ".plyr",
                controls: {
                    container: null,
                    wrapper: ".plyr__controls"
                },
                labels: "[data-plyr]",
                buttons: {
                    play: '[data-plyr="play"]',
                    pause: '[data-plyr="pause"]',
                    restart: '[data-plyr="restart"]',
                    rewind: '[data-plyr="rewind"]',
                    fastForward: '[data-plyr="fast-forward"]',
                    mute: '[data-plyr="mute"]',
                    captions: '[data-plyr="captions"]',
                    download: '[data-plyr="download"]',
                    fullscreen: '[data-plyr="fullscreen"]',
                    pip: '[data-plyr="pip"]',
                    airplay: '[data-plyr="airplay"]',
                    settings: '[data-plyr="settings"]',
                    loop: '[data-plyr="loop"]'
                },
                inputs: {
                    seek: '[data-plyr="seek"]',
                    volume: '[data-plyr="volume"]',
                    speed: '[data-plyr="speed"]',
                    language: '[data-plyr="language"]',
                    quality: '[data-plyr="quality"]'
                },
                display: {
                    currentTime: ".plyr__time--current",
                    duration: ".plyr__time--duration",
                    buffer: ".plyr__progress__buffer",
                    loop: ".plyr__progress__loop",
                    volume: ".plyr__volume--display"
                },
                progress: ".plyr__progress",
                captions: ".plyr__captions",
                caption: ".plyr__caption"
            },
            classNames: {
                type: "plyr--{0}",
                provider: "plyr--{0}",
                video: "plyr__video-wrapper",
                embed: "plyr__video-embed",
                videoFixedRatio: "plyr__video-wrapper--fixed-ratio",
                embedContainer: "plyr__video-embed__container",
                poster: "plyr__poster",
                posterEnabled: "plyr__poster-enabled",
                ads: "plyr__ads",
                control: "plyr__control",
                controlPressed: "plyr__control--pressed",
                playing: "plyr--playing",
                paused: "plyr--paused",
                stopped: "plyr--stopped",
                loading: "plyr--loading",
                hover: "plyr--hover",
                tooltip: "plyr__tooltip",
                cues: "plyr__cues",
                hidden: "plyr__sr-only",
                hideControls: "plyr--hide-controls",
                isIos: "plyr--is-ios",
                isTouch: "plyr--is-touch",
                uiSupported: "plyr--full-ui",
                noTransition: "plyr--no-transition",
                display: {
                    time: "plyr__time"
                },
                menu: {
                    value: "plyr__menu__value",
                    badge: "plyr__badge",
                    open: "plyr--menu-open"
                },
                captions: {
                    enabled: "plyr--captions-enabled",
                    active: "plyr--captions-active"
                },
                fullscreen: {
                    enabled: "plyr--fullscreen-enabled",
                    fallback: "plyr--fullscreen-fallback"
                },
                pip: {
                    supported: "plyr--pip-supported",
                    active: "plyr--pip-active"
                },
                airplay: {
                    supported: "plyr--airplay-supported",
                    active: "plyr--airplay-active"
                },
                tabFocus: "plyr__tab-focus",
                previewThumbnails: {
                    thumbContainer: "plyr__preview-thumb",
                    thumbContainerShown: "plyr__preview-thumb--is-shown",
                    imageContainer: "plyr__preview-thumb__image-container",
                    timeContainer: "plyr__preview-thumb__time-container",
                    scrubbingContainer: "plyr__preview-scrubbing",
                    scrubbingContainerShown: "plyr__preview-scrubbing--is-shown"
                }
            },
            attributes: {
                embed: {
                    provider: "data-plyr-provider",
                    id: "data-plyr-embed-id"
                }
            },
            ads: {
                enabled: !1,
                publisherId: "",
                tagUrl: ""
            },
            previewThumbnails: {
                enabled: !1,
                src: ""
            },
            vimeo: {
                byline: !1,
                portrait: !1,
                title: !1,
                speed: !0,
                transparent: !1,
                customControls: !0,
                referrerPolicy: null,
                premium: !1
            },
            youtube: {
                rel: 0,
                showinfo: 0,
                iv_load_policy: 3,
                modestbranding: 1,
                customControls: !0,
                noCookie: !1
            }
        },
        Qe = "picture-in-picture",
        Xe = "inline",
        Je = {
            html5: "html5",
            youtube: "youtube",
            vimeo: "vimeo"
        },
        Ge = "audio",
        Ze = "video";
    const et = () => {};
    class tt {
        constructor( e = !1 ) {
            this.enabled = window.console && e, this.enabled && this.log( "Debugging enabled" )
        }
        get log() {
            return this.enabled ? Function.prototype.bind.call( console.log, console ) : et
        }
        get warn() {
            return this.enabled ? Function.prototype.bind.call( console.warn, console ) : et
        }
        get error() {
            return this.enabled ? Function.prototype.bind.call( console.error, console ) : et
        }
    }
    class it {
        constructor( t ) {
            e( this, "onChange", ( () => {
                if ( !this.enabled ) return;
                const e = this.player.elements.buttons.fullscreen;
                H( e ) && ( e.pressed = this.active );
                const t = this.target === this.player.media ? this.target : this.player.elements.container;
                ve.call( this.player, t, this.active ? "enterfullscreen" : "exitfullscreen", !0 )
            } ) ), e( this, "toggleFallback", ( ( e = !1 ) => {
                if ( e ? this.scrollPosition = {
                        x: window.scrollX || 0,
                        y: window.scrollY || 0
                    } : window.scrollTo( this.scrollPosition.x, this.scrollPosition.y ), document.body.style.overflow = e ? "hidden" : "", le( this.target, this.player.config.classNames.fullscreen.fallback, e ), Y.isIos ) {
                    let t = document.head.querySelector( 'meta[name="viewport"]' );
                    const i = "viewport-fit=cover";
                    t || ( t = document.createElement( "meta" ), t.setAttribute( "name", "viewport" ) );
                    const s = _( t.content ) && t.content.includes( i );
                    e ? ( this.cleanupViewport = !s, s || ( t.content += `,${i}` ) ) : this.cleanupViewport && ( t.content = t.content.split( "," ).filter( ( e => e.trim() !== i ) ).join( "," ) )
                }
                this.onChange()
            } ) ), e( this, "trapFocus", ( e => {
                if ( Y.isIos || !this.active || "Tab" !== e.key || 9 !== e.keyCode ) return;
                const t = document.activeElement,
                    i = ce.call( this.player, "a[href], button:not(:disabled), input:not(:disabled), [tabindex]" ),
                    [ s ] = i,
                    n = i[ i.length - 1 ];
                t !== n || e.shiftKey ? t === s && e.shiftKey && ( n.focus(), e.preventDefault() ) : ( s.focus(), e.preventDefault() )
            } ) ), e( this, "update", ( () => {
                if ( this.enabled ) {
                    let e;
                    e = this.forceFallback ? "Fallback (forced)" : it.native ? "Native" : "Fallback", this.player.debug.log( `${e} fullscreen enabled` )
                } else this.player.debug.log( "Fullscreen not supported and fallback disabled" );
                le( this.player.elements.container, this.player.config.classNames.fullscreen.enabled, this.enabled )
            } ) ), e( this, "enter", ( () => {
                this.enabled && ( Y.isIos && this.player.config.fullscreen.iosNative ? this.player.isVimeo ? this.player.embed.requestFullscreen() : this.target.webkitEnterFullscreen() : !it.native || this.forceFallback ? this.toggleFallback( !0 ) : this.prefix ? W( this.prefix ) || this.target[ `${this.prefix}Request${this.property}` ]() : this.target.requestFullscreen( {
                    navigationUI: "hide"
                } ) )
            } ) ), e( this, "exit", ( () => {
                if ( this.enabled )
                    if ( Y.isIos && this.player.config.fullscreen.iosNative ) this.target.webkitExitFullscreen(), ke( this.player.play() );
                    else if ( !it.native || this.forceFallback ) this.toggleFallback( !1 );
                else if ( this.prefix ) {
                    if ( !W( this.prefix ) ) {
                        const e = "moz" === this.prefix ? "Cancel" : "Exit";
                        document[ `${this.prefix}${e}${this.property}` ]()
                    }
                } else( document.cancelFullScreen || document.exitFullscreen ).call( document )
            } ) ), e( this, "toggle", ( () => {
                this.active ? this.exit() : this.enter()
            } ) ), this.player = t, this.prefix = it.prefix, this.property = it.property, this.scrollPosition = {
                x: 0,
                y: 0
            }, this.forceFallback = "force" === t.config.fullscreen.fallback, this.player.elements.fullscreen = t.config.fullscreen.container && function ( e, t ) {
                const {
                    prototype: i
                } = Element;
                return ( i.closest || function () {
                    let e = this;
                    do {
                        if ( re.matches( e, t ) ) return e;
                        e = e.parentElement || e.parentNode
                    } while ( null !== e && 1 === e.nodeType );
                    return null
                } ).call( e, t )
            }( this.player.elements.container, t.config.fullscreen.container ), fe.call( this.player, document, "ms" === this.prefix ? "MSFullscreenChange" : `${this.prefix}fullscreenchange`, ( () => {
                this.onChange()
            } ) ), fe.call( this.player, this.player.elements.container, "dblclick", ( e => {
                H( this.player.elements.controls ) && this.player.elements.controls.contains( e.target ) || this.player.listeners.proxy( e, this.toggle, "fullscreen" )
            } ) ), fe.call( this, this.player.elements.container, "keydown", ( e => this.trapFocus( e ) ) ), this.update()
        }
        static get native() {
            return !!( document.fullscreenEnabled || document.webkitFullscreenEnabled || document.mozFullScreenEnabled || document.msFullscreenEnabled )
        }
        get usingNative() {
            return it.native && !this.forceFallback
        }
        static get prefix() {
            if ( q( document.exitFullscreen ) ) return "";
            let e = "";
            return [ "webkit", "moz", "ms" ].some( ( t => !( !q( document[ `${t}ExitFullscreen` ] ) && !q( document[ `${t}CancelFullScreen` ] ) ) && ( e = t, !0 ) ) ), e
        }
        static get property() {
            return "moz" === this.prefix ? "FullScreen" : "Fullscreen"
        }
        get enabled() {
            return ( it.native || this.player.config.fullscreen.fallback ) && this.player.config.fullscreen.enabled && this.player.supported.ui && this.player.isVideo
        }
        get active() {
            if ( !this.enabled ) return !1;
            if ( !it.native || this.forceFallback ) return oe( this.target, this.player.config.classNames.fullscreen.fallback );
            const e = this.prefix ? document[ `${this.prefix}${this.property}Element` ] : document.fullscreenElement;
            return e && e.shadowRoot ? e === this.target.getRootNode().host : e === this.target
        }
        get target() {
            return Y.isIos && this.player.config.fullscreen.iosNative ? this.player.media : this.player.elements.fullscreen || this.player.elements.container
        }
    }

    function st( e, t = 1 ) {
        return new Promise( ( ( i, s ) => {
            const n = new Image,
                a = () => {
                    delete n.onload, delete n.onerror, ( n.naturalWidth >= t ? i : s )( n )
                };
            Object.assign( n, {
                onload: a,
                onerror: a,
                src: e
            } )
        } ) )
    }
    const nt = {
        addStyleHook() {
            le( this.elements.container, this.config.selectors.container.replace( ".", "" ), !0 ), le( this.elements.container, this.config.classNames.uiSupported, this.supported.ui )
        },
        toggleNativeControls( e = !1 ) {
            e && this.isHTML5 ? this.media.setAttribute( "controls", "" ) : this.media.removeAttribute( "controls" )
        },
        build() {
            if ( this.listeners.media(), !this.supported.ui ) return this.debug.warn( `Basic support only for ${this.provider} ${this.type}` ), void nt.toggleNativeControls.call( this, !0 );
            H( this.elements.controls ) || ( Ue.inject.call( this ), this.listeners.controls() ), nt.toggleNativeControls.call( this ), this.isHTML5 && Ke.setup.call( this ), this.volume = null, this.muted = null, this.loop = null, this.quality = null, this.speed = null, Ue.updateVolume.call( this ), Ue.timeUpdate.call( this ), nt.checkPlaying.call( this ), le( this.elements.container, this.config.classNames.pip.supported, me.pip && this.isHTML5 && this.isVideo ), le( this.elements.container, this.config.classNames.airplay.supported, me.airplay && this.isHTML5 ), le( this.elements.container, this.config.classNames.isIos, Y.isIos ), le( this.elements.container, this.config.classNames.isTouch, this.touch ), this.ready = !0, setTimeout( ( () => {
                ve.call( this, this.media, "ready" )
            } ), 0 ), nt.setTitle.call( this ), this.poster && nt.setPoster.call( this, this.poster, !1 ).catch( ( () => {} ) ), this.config.duration && Ue.durationUpdate.call( this )
        },
        setTitle() {
            let e = De.get( "play", this.config );
            if ( _( this.config.title ) && !W( this.config.title ) && ( e += `, ${this.config.title}` ), Array.from( this.elements.buttons.play || [] ).forEach( ( t => {
                    t.setAttribute( "aria-label", e )
                } ) ), this.isEmbed ) {
                const e = he.call( this, "iframe" );
                if ( !H( e ) ) return;
                const t = W( this.config.title ) ? "video" : this.config.title,
                    i = De.get( "frameTitle", this.config );
                e.setAttribute( "title", i.replace( "{title}", t ) )
            }
        },
        togglePoster( e ) {
            le( this.elements.container, this.config.classNames.posterEnabled, e )
        },
        setPoster( e, t = !0 ) {
            return t && this.poster ? Promise.reject( new Error( "Poster already set" ) ) : ( this.media.setAttribute( "data-poster", e ), this.elements.poster.removeAttribute( "hidden" ), Te.call( this ).then( ( () => st( e ) ) ).catch( ( t => {
                throw e === this.poster && nt.togglePoster.call( this, !1 ), t
            } ) ).then( ( () => {
                if ( e !== this.poster ) throw new Error( "setPoster cancelled by later call to setPoster" )
            } ) ).then( ( () => ( Object.assign( this.elements.poster.style, {
                backgroundImage: `url('${e}')`,
                backgroundSize: ""
            } ), nt.togglePoster.call( this, !0 ), e ) ) ) )
        },
        checkPlaying( e ) {
            le( this.elements.container, this.config.classNames.playing, this.playing ), le( this.elements.container, this.config.classNames.paused, this.paused ), le( this.elements.container, this.config.classNames.stopped, this.stopped ), Array.from( this.elements.buttons.play || [] ).forEach( ( e => {
                Object.assign( e, {
                    pressed: this.playing
                } ), e.setAttribute( "aria-label", De.get( this.playing ? "pause" : "play", this.config ) )
            } ) ), F( e ) && "timeupdate" === e.type || nt.toggleControls.call( this )
        },
        checkLoading( e ) {
            this.loading = [ "stalled", "waiting" ].includes( e.type ), clearTimeout( this.timers.loading ), this.timers.loading = setTimeout( ( () => {
                le( this.elements.container, this.config.classNames.loading, this.loading ), nt.toggleControls.call( this )
            } ), this.loading ? 250 : 0 )
        },
        toggleControls( e ) {
            const {
                controls: t
            } = this.elements;
            if ( t && this.config.hideControls ) {
                const i = this.touch && this.lastSeekTime + 2e3 > Date.now();
                this.toggleControls( Boolean( e || this.loading || this.paused || t.pressed || t.hover || i ) )
            }
        },
        migrateStyles() {
            Object.values( {
                ...this.media.style
            } ).filter( ( e => !W( e ) && _( e ) && e.startsWith( "--plyr" ) ) ).forEach( ( e => {
                this.elements.container.style.setProperty( e, this.media.style.getPropertyValue( e ) ), this.media.style.removeProperty( e )
            } ) ), W( this.media.style ) && this.media.removeAttribute( "style" )
        }
    };
    class at {
        constructor( t ) {
            e( this, "firstTouch", ( () => {
                const {
                    player: e
                } = this, {
                    elements: t
                } = e;
                e.touch = !0, le( t.container, e.config.classNames.isTouch, !0 )
            } ) ), e( this, "setTabFocus", ( e => {
                const {
                    player: t
                } = this, {
                    elements: i
                } = t;
                if ( clearTimeout( this.focusTimer ), "keydown" === e.type && 9 !== e.which ) return;
                "keydown" === e.type && ( this.lastKeyDown = e.timeStamp );
                const s = e.timeStamp - this.lastKeyDown <= 20;
                ( "focus" !== e.type || s ) && ( ( () => {
                    const e = t.config.classNames.tabFocus;
                    le( ce.call( t, `.${e}` ), e, !1 )
                } )(), "focusout" !== e.type && ( this.focusTimer = setTimeout( ( () => {
                    const e = document.activeElement;
                    i.container.contains( e ) && le( document.activeElement, t.config.classNames.tabFocus, !0 )
                } ), 10 ) ) )
            } ) ), e( this, "global", ( ( e = !0 ) => {
                const {
                    player: t
                } = this;
                t.config.keyboard.global && ge.call( t, window, "keydown keyup", this.handleKey, e, !1 ), ge.call( t, document.body, "click", this.toggleMenu, e ), ye.call( t, document.body, "touchstart", this.firstTouch ), ge.call( t, document.body, "keydown focus blur focusout", this.setTabFocus, e, !1, !0 )
            } ) ), e( this, "container", ( () => {
                const {
                    player: e
                } = this, {
                    config: t,
                    elements: i,
                    timers: s
                } = e;
                !t.keyboard.global && t.keyboard.focused && fe.call( e, i.container, "keydown keyup", this.handleKey, !1 ), fe.call( e, i.container, "mousemove mouseleave touchstart touchmove enterfullscreen exitfullscreen", ( t => {
                    const {
                        controls: n
                    } = i;
                    n && "enterfullscreen" === t.type && ( n.pressed = !1, n.hover = !1 );
                    let a = 0;
                    [ "touchstart", "touchmove", "mousemove" ].includes( t.type ) && ( nt.toggleControls.call( e, !0 ), a = e.touch ? 3e3 : 2e3 ), clearTimeout( s.controls ), s.controls = setTimeout( ( () => nt.toggleControls.call( e, !1 ) ), a )
                } ) );
                const n = t => {
                        if ( !t ) return Me.call( e );
                        const s = i.container.getBoundingClientRect(),
                            {
                                width: n,
                                height: a
                            } = s;
                        return Me.call( e, `${n}:${a}` )
                    },
                    a = () => {
                        clearTimeout( s.resized ), s.resized = setTimeout( n, 50 )
                    };
                fe.call( e, i.container, "enterfullscreen exitfullscreen", ( t => {
                    const {
                        target: s,
                        usingNative: l
                    } = e.fullscreen;
                    if ( s !== i.container ) return;
                    if ( !e.isEmbed && W( e.config.ratio ) ) return;
                    const o = "enterfullscreen" === t.type,
                        {
                            padding: r,
                            ratio: c
                        } = n( o );
                    ( ( t, i, s ) => {
                        if ( !e.isVimeo || e.config.vimeo.premium ) return;
                        const n = e.elements.wrapper.firstChild,
                            [ , a ] = t,
                            [ l, o ] = Ne.call( e );
                        n.style.maxWidth = s ? a / o * l + "px" : null, n.style.margin = s ? "0 auto" : null
                    } )( c, 0, o ), o && setTimeout( ( () => K( i.container ) ), 100 ), l || ( o ? fe.call( e, window, "resize", a ) : be.call( e, window, "resize", a ) )
                } ) )
            } ) ), e( this, "media", ( () => {
                const {
                    player: e
                } = this, {
                    elements: t
                } = e;
                if ( fe.call( e, e.media, "timeupdate seeking seeked", ( t => Ue.timeUpdate.call( e, t ) ) ), fe.call( e, e.media, "durationchange loadeddata loadedmetadata", ( t => Ue.durationUpdate.call( e, t ) ) ), fe.call( e, e.media, "ended", ( () => {
                        e.isHTML5 && e.isVideo && e.config.resetOnEnd && ( e.restart(), e.pause() )
                    } ) ), fe.call( e, e.media, "progress playing seeking seeked", ( t => Ue.updateProgress.call( e, t ) ) ), fe.call( e, e.media, "volumechange", ( t => Ue.updateVolume.call( e, t ) ) ), fe.call( e, e.media, "playing play pause ended emptied timeupdate", ( t => nt.checkPlaying.call( e, t ) ) ), fe.call( e, e.media, "waiting canplay seeked playing", ( t => nt.checkLoading.call( e, t ) ) ), e.supported.ui && e.config.clickToPlay && !e.isAudio ) {
                    const i = he.call( e, `.${e.config.classNames.video}` );
                    if ( !H( i ) ) return;
                    fe.call( e, t.container, "click", ( s => {
                        ( [ t.container, i ].includes( s.target ) || i.contains( s.target ) ) && ( e.touch && e.config.hideControls || ( e.ended ? ( this.proxy( s, e.restart, "restart" ), this.proxy( s, ( () => {
                            ke( e.play() )
                        } ), "play" ) ) : this.proxy( s, ( () => {
                            ke( e.togglePlay() )
                        } ), "play" ) ) )
                    } ) )
                }
                e.supported.ui && e.config.disableContextMenu && fe.call( e, t.wrapper, "contextmenu", ( e => {
                    e.preventDefault()
                } ), !1 ), fe.call( e, e.media, "volumechange", ( () => {
                    e.storage.set( {
                        volume: e.volume,
                        muted: e.muted
                    } )
                } ) ), fe.call( e, e.media, "ratechange", ( () => {
                    Ue.updateSetting.call( e, "speed" ), e.storage.set( {
                        speed: e.speed
                    } )
                } ) ), fe.call( e, e.media, "qualitychange", ( t => {
                    Ue.updateSetting.call( e, "quality", null, t.detail.quality )
                } ) ), fe.call( e, e.media, "ready qualitychange", ( () => {
                    Ue.setDownloadUrl.call( e )
                } ) );
                const i = e.config.events.concat( [ "keyup", "keydown" ] ).join( " " );
                fe.call( e, e.media, i, ( i => {
                    let {
                        detail: s = {}
                    } = i;
                    "error" === i.type && ( s = e.media.error ), ve.call( e, t.container, i.type, !0, s )
                } ) )
            } ) ), e( this, "proxy", ( ( e, t, i ) => {
                const {
                    player: s
                } = this, n = s.config.listeners[ i ];
                let a = !0;
                q( n ) && ( a = n.call( s, e ) ), !1 !== a && q( t ) && t.call( s, e )
            } ) ), e( this, "bind", ( ( e, t, i, s, n = !0 ) => {
                const {
                    player: a
                } = this, l = a.config.listeners[ s ], o = q( l );
                fe.call( a, e, t, ( e => this.proxy( e, i, s ) ), n && !o )
            } ) ), e( this, "controls", ( () => {
                const {
                    player: e
                } = this, {
                    elements: t
                } = e, i = Y.isIE ? "change" : "input";
                if ( t.buttons.play && Array.from( t.buttons.play ).forEach( ( t => {
                        this.bind( t, "click", ( () => {
                            ke( e.togglePlay() )
                        } ), "play" )
                    } ) ), this.bind( t.buttons.restart, "click", e.restart, "restart" ), this.bind( t.buttons.rewind, "click", ( () => {
                        e.lastSeekTime = Date.now(), e.rewind()
                    } ), "rewind" ), this.bind( t.buttons.fastForward, "click", ( () => {
                        e.lastSeekTime = Date.now(), e.forward()
                    } ), "fastForward" ), this.bind( t.buttons.mute, "click", ( () => {
                        e.muted = !e.muted
                    } ), "mute" ), this.bind( t.buttons.captions, "click", ( () => e.toggleCaptions() ) ), this.bind( t.buttons.download, "click", ( () => {
                        ve.call( e, e.media, "download" )
                    } ), "download" ), this.bind( t.buttons.fullscreen, "click", ( () => {
                        e.fullscreen.toggle()
                    } ), "fullscreen" ), this.bind( t.buttons.pip, "click", ( () => {
                        e.pip = "toggle"
                    } ), "pip" ), this.bind( t.buttons.airplay, "click", e.airplay, "airplay" ), this.bind( t.buttons.settings, "click", ( t => {
                        t.stopPropagation(), t.preventDefault(), Ue.toggleMenu.call( e, t )
                    } ), null, !1 ), this.bind( t.buttons.settings, "keyup", ( t => {
                        const i = t.which;
                        [ 13, 32 ].includes( i ) && ( 13 !== i ? ( t.preventDefault(), t.stopPropagation(), Ue.toggleMenu.call( e, t ) ) : Ue.focusFirstMenuItem.call( e, null, !0 ) )
                    } ), null, !1 ), this.bind( t.settings.menu, "keydown", ( t => {
                        27 === t.which && Ue.toggleMenu.call( e, t )
                    } ) ), this.bind( t.inputs.seek, "mousedown mousemove", ( e => {
                        const i = t.progress.getBoundingClientRect(),
                            s = 100 / i.width * ( e.pageX - i.left );
                        e.currentTarget.setAttribute( "seek-value", s )
                    } ) ), this.bind( t.inputs.seek, "mousedown mouseup keydown keyup touchstart touchend", ( t => {
                        const i = t.currentTarget,
                            s = t.keyCode ? t.keyCode : t.which,
                            n = "play-on-seeked";
                        if ( R( t ) && 39 !== s && 37 !== s ) return;
                        e.lastSeekTime = Date.now();
                        const a = i.hasAttribute( n ),
                            l = [ "mouseup", "touchend", "keyup" ].includes( t.type );
                        a && l ? ( i.removeAttribute( n ), ke( e.play() ) ) : !l && e.playing && ( i.setAttribute( n, "" ), e.pause() )
                    } ) ), Y.isIos ) {
                    const t = ce.call( e, 'input[type="range"]' );
                    Array.from( t ).forEach( ( e => this.bind( e, i, ( e => K( e.target ) ) ) ) )
                }
                this.bind( t.inputs.seek, i, ( t => {
                    const i = t.currentTarget;
                    let s = i.getAttribute( "seek-value" );
                    W( s ) && ( s = i.value ), i.removeAttribute( "seek-value" ), e.currentTime = s / i.max * e.duration
                } ), "seek" ), this.bind( t.progress, "mouseenter mouseleave mousemove", ( t => Ue.updateSeekTooltip.call( e, t ) ) ), this.bind( t.progress, "mousemove touchmove", ( t => {
                    const {
                        previewThumbnails: i
                    } = e;
                    i && i.loaded && i.startMove( t )
                } ) ), this.bind( t.progress, "mouseleave touchend click", ( () => {
                    const {
                        previewThumbnails: t
                    } = e;
                    t && t.loaded && t.endMove( !1, !0 )
                } ) ), this.bind( t.progress, "mousedown touchstart", ( t => {
                    const {
                        previewThumbnails: i
                    } = e;
                    i && i.loaded && i.startScrubbing( t )
                } ) ), this.bind( t.progress, "mouseup touchend", ( t => {
                    const {
                        previewThumbnails: i
                    } = e;
                    i && i.loaded && i.endScrubbing( t )
                } ) ), Y.isWebkit && Array.from( ce.call( e, 'input[type="range"]' ) ).forEach( ( t => {
                    this.bind( t, "input", ( t => Ue.updateRangeFill.call( e, t.target ) ) )
                } ) ), e.config.toggleInvert && !H( t.display.duration ) && this.bind( t.display.currentTime, "click", ( () => {
                    0 !== e.currentTime && ( e.config.invertTime = !e.config.invertTime, Ue.timeUpdate.call( e ) )
                } ) ), this.bind( t.inputs.volume, i, ( t => {
                    e.volume = t.target.value
                } ), "volume" ), this.bind( t.controls, "mouseenter mouseleave", ( i => {
                    t.controls.hover = !e.touch && "mouseenter" === i.type
                } ) ), t.fullscreen && Array.from( t.fullscreen.children ).filter( ( e => !e.contains( t.container ) ) ).forEach( ( i => {
                    this.bind( i, "mouseenter mouseleave", ( i => {
                        t.controls.hover = !e.touch && "mouseenter" === i.type
                    } ) )
                } ) ), this.bind( t.controls, "mousedown mouseup touchstart touchend touchcancel", ( e => {
                    t.controls.pressed = [ "mousedown", "touchstart" ].includes( e.type )
                } ) ), this.bind( t.controls, "focusin", ( () => {
                    const {
                        config: i,
                        timers: s
                    } = e;
                    le( t.controls, i.classNames.noTransition, !0 ), nt.toggleControls.call( e, !0 ), setTimeout( ( () => {
                        le( t.controls, i.classNames.noTransition, !1 )
                    } ), 0 );
                    const n = this.touch ? 3e3 : 4e3;
                    clearTimeout( s.controls ), s.controls = setTimeout( ( () => nt.toggleControls.call( e, !1 ) ), n )
                } ) ), this.bind( t.inputs.volume, "wheel", ( t => {
                    const i = t.webkitDirectionInvertedFromDevice,
                        [ s, n ] = [ t.deltaX, -t.deltaY ].map( ( e => i ? -e : e ) ),
                        a = Math.sign( Math.abs( s ) > Math.abs( n ) ? s : n );
                    e.increaseVolume( a / 50 );
                    const {
                        volume: l
                    } = e.media;
                    ( 1 === a && l < 1 || -1 === a && l > 0 ) && t.preventDefault()
                } ), "volume", !1 )
            } ) ), this.player = t, this.lastKey = null, this.focusTimer = null, this.lastKeyDown = null, this.handleKey = this.handleKey.bind( this ), this.toggleMenu = this.toggleMenu.bind( this ), this.setTabFocus = this.setTabFocus.bind( this ), this.firstTouch = this.firstTouch.bind( this )
        }
        handleKey( e ) {
            const {
                player: t
            } = this, {
                elements: i
            } = t, s = e.keyCode ? e.keyCode : e.which, n = "keydown" === e.type, a = n && s === this.lastKey;
            if ( e.altKey || e.ctrlKey || e.metaKey || e.shiftKey ) return;
            if ( !$( s ) ) return;
            if ( n ) {
                const n = document.activeElement;
                if ( H( n ) ) {
                    const {
                        editable: s
                    } = t.config.selectors, {
                        seek: a
                    } = i.inputs;
                    if ( n !== a && re( n, s ) ) return;
                    if ( 32 === e.which && re( n, 'button, [role^="menuitem"]' ) ) return
                }
                switch ( [ 32, 37, 38, 39, 40, 48, 49, 50, 51, 52, 53, 54, 56, 57, 67, 70, 73, 75, 76, 77, 79 ].includes( s ) && ( e.preventDefault(), e.stopPropagation() ), s ) {
                    case 48:
                    case 49:
                    case 50:
                    case 51:
                    case 52:
                    case 53:
                    case 54:
                    case 55:
                    case 56:
                    case 57:
                        a || ( t.currentTime = t.duration / 10 * ( s - 48 ) );
                        break;
                    case 32:
                    case 75:
                        a || ke( t.togglePlay() );
                        break;
                    case 38:
                        t.increaseVolume( .1 );
                        break;
                    case 40:
                        t.decreaseVolume( .1 );
                        break;
                    case 77:
                        a || ( t.muted = !t.muted );
                        break;
                    case 39:
                        t.forward();
                        break;
                    case 37:
                        t.rewind();
                        break;
                    case 70:
                        t.fullscreen.toggle();
                        break;
                    case 67:
                        a || t.toggleCaptions();
                        break;
                    case 76:
                        t.loop = !t.loop
                }
                27 === s && !t.fullscreen.usingNative && t.fullscreen.active && t.fullscreen.toggle(), this.lastKey = s
            } else this.lastKey = null
        }
        toggleMenu( e ) {
            Ue.toggleMenu.call( this.player, e )
        }
    }
    "undefined" != typeof globalThis ? globalThis : "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self && self;
    var lt = function ( e, t ) {
        return e( t = {
            exports: {}
        }, t.exports ), t.exports
    }( ( function ( e, t ) {
        e.exports = function () {
            var e = function () {},
                t = {},
                i = {},
                s = {};

            function n( e, t ) {
                e = e.push ? e : [ e ];
                var n, a, l, o = [],
                    r = e.length,
                    c = r;
                for ( n = function ( e, i ) {
                        i.length && o.push( e ), --c || t( o )
                    }; r--; ) a = e[ r ], ( l = i[ a ] ) ? n( a, l ) : ( s[ a ] = s[ a ] || [] ).push( n )
            }

            function a( e, t ) {
                if ( e ) {
                    var n = s[ e ];
                    if ( i[ e ] = t, n )
                        for ( ; n.length; ) n[ 0 ]( e, t ), n.splice( 0, 1 )
                }
            }

            function l( t, i ) {
                t.call && ( t = {
                    success: t
                } ), i.length ? ( t.error || e )( i ) : ( t.success || e )( t )
            }

            function o( t, i, s, n ) {
                var a, l, r = document,
                    c = s.async,
                    h = ( s.numRetries || 0 ) + 1,
                    u = s.before || e,
                    d = t.replace( /[\?|#].*$/, "" ),
                    m = t.replace( /^(css|img)!/, "" );
                n = n || 0, /(^css!|\.css$)/.test( d ) ? ( ( l = r.createElement( "link" ) ).rel = "stylesheet", l.href = m, ( a = "hideFocus" in l ) && l.relList && ( a = 0, l.rel = "preload", l.as = "style" ) ) : /(^img!|\.(png|gif|jpg|svg|webp)$)/.test( d ) ? ( l = r.createElement( "img" ) ).src = m : ( ( l = r.createElement( "script" ) ).src = t, l.async = void 0 === c || c ), l.onload = l.onerror = l.onbeforeload = function ( e ) {
                    var r = e.type[ 0 ];
                    if ( a ) try {
                        l.sheet.cssText.length || ( r = "e" )
                    } catch ( e ) {
                        18 != e.code && ( r = "e" )
                    }
                    if ( "e" == r ) {
                        if ( ( n += 1 ) < h ) return o( t, i, s, n )
                    } else if ( "preload" == l.rel && "style" == l.as ) return l.rel = "stylesheet";
                    i( t, r, e.defaultPrevented )
                }, !1 !== u( t, l ) && r.head.appendChild( l )
            }

            function r( e, t, i ) {
                var s, n, a = ( e = e.push ? e : [ e ] ).length,
                    l = a,
                    r = [];
                for ( s = function ( e, i, s ) {
                        if ( "e" == i && r.push( e ), "b" == i ) {
                            if ( !s ) return;
                            r.push( e )
                        }--a || t( r )
                    }, n = 0; n < l; n++ ) o( e[ n ], s, i )
            }

            function c( e, i, s ) {
                var n, o;
                if ( i && i.trim && ( n = i ), o = ( n ? s : i ) || {}, n ) {
                    if ( n in t ) throw "LoadJS";
                    t[ n ] = !0
                }

                function c( t, i ) {
                    r( e, ( function ( e ) {
                        l( o, e ), t && l( {
                            success: t,
                            error: i
                        }, e ), a( n, e )
                    } ), o )
                }
                if ( o.returnPromise ) return new Promise( c );
                c()
            }
            return c.ready = function ( e, t ) {
                return n( e, ( function ( e ) {
                    l( t, e )
                } ) ), c
            }, c.done = function ( e ) {
                a( e, [] )
            }, c.reset = function () {
                t = {}, i = {}, s = {}
            }, c.isDefined = function ( e ) {
                return e in t
            }, c
        }()
    } ) );

    function ot( e ) {
        return new Promise( ( ( t, i ) => {
            lt( e, {
                success: t,
                error: i
            } )
        } ) )
    }

    function rt( e ) {
        e && !this.embed.hasPlayed && ( this.embed.hasPlayed = !0 ), this.media.paused === e && ( this.media.paused = !e, ve.call( this, this.media, e ? "play" : "pause" ) )
    }
    const ct = {
        setup() {
            const e = this;
            le( e.elements.wrapper, e.config.classNames.embed, !0 ), e.options.speed = e.config.speed.options, Me.call( e ), L( window.Vimeo ) ? ct.ready.call( e ) : ot( e.config.urls.vimeo.sdk ).then( ( () => {
                ct.ready.call( e )
            } ) ).catch( ( t => {
                e.debug.warn( "Vimeo SDK (player.js) failed to load", t )
            } ) )
        },
        ready() {
            const e = this,
                t = e.config.vimeo,
                {
                    premium: i,
                    referrerPolicy: s,
                    ...n
                } = t;
            i && Object.assign( n, {
                controls: !1,
                sidedock: !1
            } );
            const a = ze( {
                loop: e.config.loop.active,
                autoplay: e.autoplay,
                muted: e.muted,
                gesture: "media",
                playsinline: !this.config.fullscreen.iosNative,
                ...n
            } );
            let l = e.media.getAttribute( "src" );
            W( l ) && ( l = e.media.getAttribute( e.config.attributes.embed.id ) );
            const o = W( r = l ) ? null : $( Number( r ) ) ? r : r.match( /^.*(vimeo.com\/|video\/)(\d+).*/ ) ? RegExp.$2 : r;
            var r;
            const c = Z( "iframe" ),
                h = Le( e.config.urls.vimeo.iframe, o, a );
            if ( c.setAttribute( "src", h ), c.setAttribute( "allowfullscreen", "" ), c.setAttribute( "allow", [ "autoplay", "fullscreen", "picture-in-picture", "encrypted-media", "accelerometer", "gyroscope" ].join( "; " ) ), W( s ) || c.setAttribute( "referrerPolicy", s ), i || !t.customControls ) c.setAttribute( "data-poster", e.poster ), e.media = se( c, e.media );
            else {
                const t = Z( "div", {
                    class: e.config.classNames.embedContainer,
                    "data-poster": e.poster
                } );
                t.appendChild( c ), e.media = se( t, e.media )
            }
            t.customControls || Fe( Le( e.config.urls.vimeo.api, h ) ).then( ( t => {
                !W( t ) && t.thumbnail_url && nt.setPoster.call( e, t.thumbnail_url ).catch( ( () => {} ) )
            } ) ), e.embed = new window.Vimeo.Player( c, {
                autopause: e.config.autopause,
                muted: e.muted
            } ), e.media.paused = !0, e.media.currentTime = 0, e.supported.ui && e.embed.disableTextTrack(), e.media.play = () => ( rt.call( e, !0 ), e.embed.play() ), e.media.pause = () => ( rt.call( e, !1 ), e.embed.pause() ), e.media.stop = () => {
                e.pause(), e.currentTime = 0
            };
            let {
                currentTime: u
            } = e.media;
            Object.defineProperty( e.media, "currentTime", {
                get: () => u,
                set( t ) {
                    const {
                        embed: i,
                        media: s,
                        paused: n,
                        volume: a
                    } = e, l = n && !i.hasPlayed;
                    s.seeking = !0, ve.call( e, s, "seeking" ), Promise.resolve( l && i.setVolume( 0 ) ).then( ( () => i.setCurrentTime( t ) ) ).then( ( () => l && i.pause() ) ).then( ( () => l && i.setVolume( a ) ) ).catch( ( () => {} ) )
                }
            } );
            let d = e.config.speed.selected;
            Object.defineProperty( e.media, "playbackRate", {
                get: () => d,
                set( t ) {
                    e.embed.setPlaybackRate( t ).then( ( () => {
                        d = t, ve.call( e, e.media, "ratechange" )
                    } ) ).catch( ( () => {
                        e.options.speed = [ 1 ]
                    } ) )
                }
            } );
            let {
                volume: m
            } = e.config;
            Object.defineProperty( e.media, "volume", {
                get: () => m,
                set( t ) {
                    e.embed.setVolume( t ).then( ( () => {
                        m = t, ve.call( e, e.media, "volumechange" )
                    } ) )
                }
            } );
            let {
                muted: p
            } = e.config;
            Object.defineProperty( e.media, "muted", {
                get: () => p,
                set( t ) {
                    const i = !!O( t ) && t;
                    e.embed.setVolume( i ? 0 : e.config.volume ).then( ( () => {
                        p = i, ve.call( e, e.media, "volumechange" )
                    } ) )
                }
            } );
            let g, {
                loop: f
            } = e.config;
            Object.defineProperty( e.media, "loop", {
                get: () => f,
                set( t ) {
                    const i = O( t ) ? t : e.config.loop.active;
                    e.embed.setLoop( i ).then( ( () => {
                        f = i
                    } ) )
                }
            } ), e.embed.getVideoUrl().then( ( t => {
                g = t, Ue.setDownloadUrl.call( e )
            } ) ).catch( ( e => {
                this.debug.warn( e )
            } ) ), Object.defineProperty( e.media, "currentSrc", {
                get: () => g
            } ), Object.defineProperty( e.media, "ended", {
                get: () => e.currentTime === e.duration
            } ), Promise.all( [ e.embed.getVideoWidth(), e.embed.getVideoHeight() ] ).then( ( t => {
                const [ i, s ] = t;
                e.embed.ratio = xe( i, s ), Me.call( this )
            } ) ), e.embed.setAutopause( e.config.autopause ).then( ( t => {
                e.config.autopause = t
            } ) ), e.embed.getVideoTitle().then( ( t => {
                e.config.title = t, nt.setTitle.call( this )
            } ) ), e.embed.getCurrentTime().then( ( t => {
                u = t, ve.call( e, e.media, "timeupdate" )
            } ) ), e.embed.getDuration().then( ( t => {
                e.media.duration = t, ve.call( e, e.media, "durationchange" )
            } ) ), e.embed.getTextTracks().then( ( t => {
                e.media.textTracks = t, Ke.setup.call( e )
            } ) ), e.embed.on( "cuechange", ( ( {
                cues: t = []
            } ) => {
                const i = t.map( ( e => function ( e ) {
                    const t = document.createDocumentFragment(),
                        i = document.createElement( "div" );
                    return t.appendChild( i ), i.innerHTML = e, t.firstChild.innerText
                }( e.text ) ) );
                Ke.updateCues.call( e, i )
            } ) ), e.embed.on( "loaded", ( () => {
                if ( e.embed.getPaused().then( ( t => {
                        rt.call( e, !t ), t || ve.call( e, e.media, "playing" )
                    } ) ), H( e.embed.element ) && e.supported.ui ) {
                    e.embed.element.setAttribute( "tabindex", -1 )
                }
            } ) ), e.embed.on( "bufferstart", ( () => {
                ve.call( e, e.media, "waiting" )
            } ) ), e.embed.on( "bufferend", ( () => {
                ve.call( e, e.media, "playing" )
            } ) ), e.embed.on( "play", ( () => {
                rt.call( e, !0 ), ve.call( e, e.media, "playing" )
            } ) ), e.embed.on( "pause", ( () => {
                rt.call( e, !1 )
            } ) ), e.embed.on( "timeupdate", ( t => {
                e.media.seeking = !1, u = t.seconds, ve.call( e, e.media, "timeupdate" )
            } ) ), e.embed.on( "progress", ( t => {
                e.media.buffered = t.percent, ve.call( e, e.media, "progress" ), 1 === parseInt( t.percent, 10 ) && ve.call( e, e.media, "canplaythrough" ), e.embed.getDuration().then( ( t => {
                    t !== e.media.duration && ( e.media.duration = t, ve.call( e, e.media, "durationchange" ) )
                } ) )
            } ) ), e.embed.on( "seeked", ( () => {
                e.media.seeking = !1, ve.call( e, e.media, "seeked" )
            } ) ), e.embed.on( "ended", ( () => {
                e.media.paused = !0, ve.call( e, e.media, "ended" )
            } ) ), e.embed.on( "error", ( t => {
                e.media.error = t, ve.call( e, e.media, "error" )
            } ) ), t.customControls && setTimeout( ( () => nt.build.call( e ) ), 0 )
        }
    };

    function ht( e ) {
        e && !this.embed.hasPlayed && ( this.embed.hasPlayed = !0 ), this.media.paused === e && ( this.media.paused = !e, ve.call( this, this.media, e ? "play" : "pause" ) )
    }

    function ut( e ) {
        return e.noCookie ? "https://www.youtube-nocookie.com" : "http:" === window.location.protocol ? "http://www.youtube.com" : void 0
    }
    const dt = {
            setup() {
                if ( le( this.elements.wrapper, this.config.classNames.embed, !0 ), L( window.YT ) && q( window.YT.Player ) ) dt.ready.call( this );
                else {
                    const e = window.onYouTubeIframeAPIReady;
                    window.onYouTubeIframeAPIReady = () => {
                        q( e ) && e(), dt.ready.call( this )
                    }, ot( this.config.urls.youtube.sdk ).catch( ( e => {
                        this.debug.warn( "YouTube API failed to load", e )
                    } ) )
                }
            },
            getTitle( e ) {
                Fe( Le( this.config.urls.youtube.api, e ) ).then( ( e => {
                    if ( L( e ) ) {
                        const {
                            title: t,
                            height: i,
                            width: s
                        } = e;
                        this.config.title = t, nt.setTitle.call( this ), this.embed.ratio = xe( s, i )
                    }
                    Me.call( this )
                } ) ).catch( ( () => {
                    Me.call( this )
                } ) )
            },
            ready() {
                const e = this,
                    t = e.config.youtube,
                    i = e.media && e.media.getAttribute( "id" );
                if ( !W( i ) && i.startsWith( "youtube-" ) ) return;
                let s = e.media.getAttribute( "src" );
                W( s ) && ( s = e.media.getAttribute( this.config.attributes.embed.id ) );
                const n = W( a = s ) ? null : a.match( /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/ ) ? RegExp.$2 : a;
                var a;
                const l = Z( "div", {
                    id: `${e.provider}-${Math.floor(1e4*Math.random())}`,
                    "data-poster": t.customControls ? e.poster : void 0
                } );
                if ( e.media = se( l, e.media ), t.customControls ) {
                    const t = e => `https://i.ytimg.com/vi/${n}/${e}default.jpg`;
                    st( t( "maxres" ), 121 ).catch( ( () => st( t( "sd" ), 121 ) ) ).catch( ( () => st( t( "hq" ) ) ) ).then( ( t => nt.setPoster.call( e, t.src ) ) ).then( ( t => {
                        t.includes( "maxres" ) || ( e.elements.poster.style.backgroundSize = "cover" )
                    } ) ).catch( ( () => {} ) )
                }
                e.embed = new window.YT.Player( e.media, {
                    videoId: n,
                    host: ut( t ),
                    playerVars: X( {}, {
                        autoplay: e.config.autoplay ? 1 : 0,
                        hl: e.config.hl,
                        controls: e.supported.ui && t.customControls ? 0 : 1,
                        disablekb: 1,
                        playsinline: e.config.fullscreen.iosNative ? 0 : 1,
                        cc_load_policy: e.captions.active ? 1 : 0,
                        cc_lang_pref: e.config.captions.language,
                        widget_referrer: window ? window.location.href : null
                    }, t ),
                    events: {
                        onError( t ) {
                            if ( !e.media.error ) {
                                const i = t.data,
                                    s = {
                                        2: "The request contains an invalid parameter value. For example, this error occurs if you specify a video ID that does not have 11 characters, or if the video ID contains invalid characters, such as exclamation points or asterisks.",
                                        5: "The requested content cannot be played in an HTML5 player or another error related to the HTML5 player has occurred.",
                                        100: "The video requested was not found. This error occurs when a video has been removed (for any reason) or has been marked as private.",
                                        101: "The owner of the requested video does not allow it to be played in embedded players.",
                                        150: "The owner of the requested video does not allow it to be played in embedded players."
                                    } [ i ] || "An unknown error occured";
                                e.media.error = {
                                    code: i,
                                    message: s
                                }, ve.call( e, e.media, "error" )
                            }
                        },
                        onPlaybackRateChange( t ) {
                            const i = t.target;
                            e.media.playbackRate = i.getPlaybackRate(), ve.call( e, e.media, "ratechange" )
                        },
                        onReady( i ) {
                            if ( q( e.media.play ) ) return;
                            const s = i.target;
                            dt.getTitle.call( e, n ), e.media.play = () => {
                                ht.call( e, !0 ), s.playVideo()
                            }, e.media.pause = () => {
                                ht.call( e, !1 ), s.pauseVideo()
                            }, e.media.stop = () => {
                                s.stopVideo()
                            }, e.media.duration = s.getDuration(), e.media.paused = !0, e.media.currentTime = 0, Object.defineProperty( e.media, "currentTime", {
                                get: () => Number( s.getCurrentTime() ),
                                set( t ) {
                                    e.paused && !e.embed.hasPlayed && e.embed.mute(), e.media.seeking = !0, ve.call( e, e.media, "seeking" ), s.seekTo( t )
                                }
                            } ), Object.defineProperty( e.media, "playbackRate", {
                                get: () => s.getPlaybackRate(),
                                set( e ) {
                                    s.setPlaybackRate( e )
                                }
                            } );
                            let {
                                volume: a
                            } = e.config;
                            Object.defineProperty( e.media, "volume", {
                                get: () => a,
                                set( t ) {
                                    a = t, s.setVolume( 100 * a ), ve.call( e, e.media, "volumechange" )
                                }
                            } );
                            let {
                                muted: l
                            } = e.config;
                            Object.defineProperty( e.media, "muted", {
                                get: () => l,
                                set( t ) {
                                    const i = O( t ) ? t : l;
                                    l = i, s[ i ? "mute" : "unMute" ](), s.setVolume( 100 * a ), ve.call( e, e.media, "volumechange" )
                                }
                            } ), Object.defineProperty( e.media, "currentSrc", {
                                get: () => s.getVideoUrl()
                            } ), Object.defineProperty( e.media, "ended", {
                                get: () => e.currentTime === e.duration
                            } );
                            const o = s.getAvailablePlaybackRates();
                            e.options.speed = o.filter( ( t => e.config.speed.options.includes( t ) ) ), e.supported.ui && t.customControls && e.media.setAttribute( "tabindex", -1 ), ve.call( e, e.media, "timeupdate" ), ve.call( e, e.media, "durationchange" ), clearInterval( e.timers.buffering ), e.timers.buffering = setInterval( ( () => {
                                e.media.buffered = s.getVideoLoadedFraction(), ( null === e.media.lastBuffered || e.media.lastBuffered < e.media.buffered ) && ve.call( e, e.media, "progress" ), e.media.lastBuffered = e.media.buffered, 1 === e.media.buffered && ( clearInterval( e.timers.buffering ), ve.call( e, e.media, "canplaythrough" ) )
                            } ), 200 ), t.customControls && setTimeout( ( () => nt.build.call( e ) ), 50 )
                        },
                        onStateChange( i ) {
                            const s = i.target;
                            clearInterval( e.timers.playing );
                            switch ( e.media.seeking && [ 1, 2 ].includes( i.data ) && ( e.media.seeking = !1, ve.call( e, e.media, "seeked" ) ), i.data ) {
                                case -1:
                                    ve.call( e, e.media, "timeupdate" ), e.media.buffered = s.getVideoLoadedFraction(), ve.call( e, e.media, "progress" );
                                    break;
                                case 0:
                                    ht.call( e, !1 ), e.media.loop ? ( s.stopVideo(), s.playVideo() ) : ve.call( e, e.media, "ended" );
                                    break;
                                case 1:
                                    t.customControls && !e.config.autoplay && e.media.paused && !e.embed.hasPlayed ? e.media.pause() : ( ht.call( e, !0 ), ve.call( e, e.media, "playing" ), e.timers.playing = setInterval( ( () => {
                                        ve.call( e, e.media, "timeupdate" )
                                    } ), 50 ), e.media.duration !== s.getDuration() && ( e.media.duration = s.getDuration(), ve.call( e, e.media, "durationchange" ) ) );
                                    break;
                                case 2:
                                    e.muted || e.embed.unMute(), ht.call( e, !1 );
                                    break;
                                case 3:
                                    ve.call( e, e.media, "waiting" )
                            }
                            ve.call( e, e.elements.container, "statechange", !1, {
                                code: i.data
                            } )
                        }
                    }
                } )
            }
        },
        mt = {
            setup() {
                this.media ? ( le( this.elements.container, this.config.classNames.type.replace( "{0}", this.type ), !0 ), le( this.elements.container, this.config.classNames.provider.replace( "{0}", this.provider ), !0 ), this.isEmbed && le( this.elements.container, this.config.classNames.type.replace( "{0}", "video" ), !0 ), this.isVideo && ( this.elements.wrapper = Z( "div", {
                    class: this.config.classNames.video
                } ), J( this.media, this.elements.wrapper ), this.elements.poster = Z( "div", {
                    class: this.config.classNames.poster
                } ), this.elements.wrapper.appendChild( this.elements.poster ) ), this.isHTML5 ? Ie.setup.call( this ) : this.isYouTube ? dt.setup.call( this ) : this.isVimeo && ct.setup.call( this ) ) : this.debug.warn( "No media element found!" )
            }
        };
    class pt {
        constructor( t ) {
            e( this, "load", ( () => {
                this.enabled && ( L( window.google ) && L( window.google.ima ) ? this.ready() : ot( this.player.config.urls.googleIMA.sdk ).then( ( () => {
                    this.ready()
                } ) ).catch( ( () => {
                    this.trigger( "error", new Error( "Google IMA SDK failed to load" ) )
                } ) ) )
            } ) ), e( this, "ready", ( () => {
                var e;
                this.enabled || ( ( e = this ).manager && e.manager.destroy(), e.elements.displayContainer && e.elements.displayContainer.destroy(), e.elements.container.remove() ), this.startSafetyTimer( 12e3, "ready()" ), this.managerPromise.then( ( () => {
                    this.clearSafetyTimer( "onAdsManagerLoaded()" )
                } ) ), this.listeners(), this.setupIMA()
            } ) ), e( this, "setupIMA", ( () => {
                this.elements.container = Z( "div", {
                    class: this.player.config.classNames.ads
                } ), this.player.elements.container.appendChild( this.elements.container ), google.ima.settings.setVpaidMode( google.ima.ImaSdkSettings.VpaidMode.ENABLED ), google.ima.settings.setLocale( this.player.config.ads.language ), google.ima.settings.setDisableCustomPlaybackForIOS10Plus( this.player.config.playsinline ), this.elements.displayContainer = new google.ima.AdDisplayContainer( this.elements.container, this.player.media ), this.loader = new google.ima.AdsLoader( this.elements.displayContainer ), this.loader.addEventListener( google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED, ( e => this.onAdsManagerLoaded( e ) ), !1 ), this.loader.addEventListener( google.ima.AdErrorEvent.Type.AD_ERROR, ( e => this.onAdError( e ) ), !1 ), this.requestAds()
            } ) ), e( this, "requestAds", ( () => {
                const {
                    container: e
                } = this.player.elements;
                try {
                    const t = new google.ima.AdsRequest;
                    t.adTagUrl = this.tagUrl, t.linearAdSlotWidth = e.offsetWidth, t.linearAdSlotHeight = e.offsetHeight, t.nonLinearAdSlotWidth = e.offsetWidth, t.nonLinearAdSlotHeight = e.offsetHeight, t.forceNonLinearFullSlot = !1, t.setAdWillPlayMuted( !this.player.muted ), this.loader.requestAds( t )
                } catch ( e ) {
                    this.onAdError( e )
                }
            } ) ), e( this, "pollCountdown", ( ( e = !1 ) => {
                if ( !e ) return clearInterval( this.countdownTimer ), void this.elements.container.removeAttribute( "data-badge-text" );
                this.countdownTimer = setInterval( ( () => {
                    const e = Be( Math.max( this.manager.getRemainingTime(), 0 ) ),
                        t = `${De.get("advertisement",this.player.config)} - ${e}`;
                    this.elements.container.setAttribute( "data-badge-text", t )
                } ), 100 )
            } ) ), e( this, "onAdsManagerLoaded", ( e => {
                if ( !this.enabled ) return;
                const t = new google.ima.AdsRenderingSettings;
                t.restoreCustomPlaybackStateOnAdBreakComplete = !0, t.enablePreloading = !0, this.manager = e.getAdsManager( this.player, t ), this.cuePoints = this.manager.getCuePoints(), this.manager.addEventListener( google.ima.AdErrorEvent.Type.AD_ERROR, ( e => this.onAdError( e ) ) ), Object.keys( google.ima.AdEvent.Type ).forEach( ( e => {
                    this.manager.addEventListener( google.ima.AdEvent.Type[ e ], ( e => this.onAdEvent( e ) ) )
                } ) ), this.trigger( "loaded" )
            } ) ), e( this, "addCuePoints", ( () => {
                W( this.cuePoints ) || this.cuePoints.forEach( ( e => {
                    if ( 0 !== e && -1 !== e && e < this.player.duration ) {
                        const t = this.player.elements.progress;
                        if ( H( t ) ) {
                            const i = 100 / this.player.duration * e,
                                s = Z( "span", {
                                    class: this.player.config.classNames.cues
                                } );
                            s.style.left = `${i.toString()}%`, t.appendChild( s )
                        }
                    }
                } ) )
            } ) ), e( this, "onAdEvent", ( e => {
                const {
                    container: t
                } = this.player.elements, i = e.getAd(), s = e.getAdData();
                switch ( ( e => {
                    ve.call( this.player, this.player.media, `ads${e.replace(/_/g,"").toLowerCase()}` )
                } )( e.type ), e.type ) {
                    case google.ima.AdEvent.Type.LOADED:
                        this.trigger( "loaded" ), this.pollCountdown( !0 ), i.isLinear() || ( i.width = t.offsetWidth, i.height = t.offsetHeight );
                        break;
                    case google.ima.AdEvent.Type.STARTED:
                        this.manager.setVolume( this.player.volume );
                        break;
                    case google.ima.AdEvent.Type.ALL_ADS_COMPLETED:
                        this.player.ended ? this.loadAds() : this.loader.contentComplete();
                        break;
                    case google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED:
                        this.pauseContent();
                        break;
                    case google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED:
                        this.pollCountdown(), this.resumeContent();
                        break;
                    case google.ima.AdEvent.Type.LOG:
                        s.adError && this.player.debug.warn( `Non-fatal ad error: ${s.adError.getMessage()}` )
                }
            } ) ), e( this, "onAdError", ( e => {
                this.cancel(), this.player.debug.warn( "Ads error", e )
            } ) ), e( this, "listeners", ( () => {
                const {
                    container: e
                } = this.player.elements;
                let t;
                this.player.on( "canplay", ( () => {
                    this.addCuePoints()
                } ) ), this.player.on( "ended", ( () => {
                    this.loader.contentComplete()
                } ) ), this.player.on( "timeupdate", ( () => {
                    t = this.player.currentTime
                } ) ), this.player.on( "seeked", ( () => {
                    const e = this.player.currentTime;
                    W( this.cuePoints ) || this.cuePoints.forEach( ( ( i, s ) => {
                        t < i && i < e && ( this.manager.discardAdBreak(), this.cuePoints.splice( s, 1 ) )
                    } ) )
                } ) ), window.addEventListener( "resize", ( () => {
                    this.manager && this.manager.resize( e.offsetWidth, e.offsetHeight, google.ima.ViewMode.NORMAL )
                } ) )
            } ) ), e( this, "play", ( () => {
                const {
                    container: e
                } = this.player.elements;
                this.managerPromise || this.resumeContent(), this.managerPromise.then( ( () => {
                    this.manager.setVolume( this.player.volume ), this.elements.displayContainer.initialize();
                    try {
                        this.initialized || ( this.manager.init( e.offsetWidth, e.offsetHeight, google.ima.ViewMode.NORMAL ), this.manager.start() ), this.initialized = !0
                    } catch ( e ) {
                        this.onAdError( e )
                    }
                } ) ).catch( ( () => {} ) )
            } ) ), e( this, "resumeContent", ( () => {
                this.elements.container.style.zIndex = "", this.playing = !1, ke( this.player.media.play() )
            } ) ), e( this, "pauseContent", ( () => {
                this.elements.container.style.zIndex = 3, this.playing = !0, this.player.media.pause()
            } ) ), e( this, "cancel", ( () => {
                this.initialized && this.resumeContent(), this.trigger( "error" ), this.loadAds()
            } ) ), e( this, "loadAds", ( () => {
                this.managerPromise.then( ( () => {
                    this.manager && this.manager.destroy(), this.managerPromise = new Promise( ( e => {
                        this.on( "loaded", e ), this.player.debug.log( this.manager )
                    } ) ), this.initialized = !1, this.requestAds()
                } ) ).catch( ( () => {} ) )
            } ) ), e( this, "trigger", ( ( e, ...t ) => {
                const i = this.events[ e ];
                j( i ) && i.forEach( ( e => {
                    q( e ) && e.apply( this, t )
                } ) )
            } ) ), e( this, "on", ( ( e, t ) => ( j( this.events[ e ] ) || ( this.events[ e ] = [] ), this.events[ e ].push( t ), this ) ) ), e( this, "startSafetyTimer", ( ( e, t ) => {
                this.player.debug.log( `Safety timer invoked from: ${t}` ), this.safetyTimer = setTimeout( ( () => {
                    this.cancel(), this.clearSafetyTimer( "startSafetyTimer()" )
                } ), e )
            } ) ), e( this, "clearSafetyTimer", ( e => {
                I( this.safetyTimer ) || ( this.player.debug.log( `Safety timer cleared from: ${e}` ), clearTimeout( this.safetyTimer ), this.safetyTimer = null )
            } ) ), this.player = t, this.config = t.config.ads, this.playing = !1, this.initialized = !1, this.elements = {
                container: null,
                displayContainer: null
            }, this.manager = null, this.loader = null, this.cuePoints = null, this.events = {}, this.safetyTimer = null, this.countdownTimer = null, this.managerPromise = new Promise( ( ( e, t ) => {
                this.on( "loaded", e ), this.on( "error", t )
            } ) ), this.load()
        }
        get enabled() {
            const {
                config: e
            } = this;
            return this.player.isHTML5 && this.player.isVideo && e.enabled && ( !W( e.publisherId ) || U( e.tagUrl ) )
        }
        get tagUrl() {
            const {
                config: e
            } = this;
            if ( U( e.tagUrl ) ) return e.tagUrl;
            return `https://go.aniview.com/api/adserver6/vast/?${ze({AV_PUBLISHERID:"58c25bb0073ef448b1087ad6",AV_CHANNELID:"5a0458dc28a06145e4519d21",AV_URL:window.location.hostname,cb:Date.now(),AV_WIDTH:640,AV_HEIGHT:480,AV_CDIM2:e.publisherId})}`
        }
    }
    const gt = e => {
            const t = [];
            return e.split( /\r\n\r\n|\n\n|\r\r/ ).forEach( ( e => {
                const i = {};
                e.split( /\r\n|\n|\r/ ).forEach( ( e => {
                    if ( $( i.startTime ) ) {
                        if ( !W( e.trim() ) && W( i.text ) ) {
                            const t = e.trim().split( "#xywh=" );
                            [ i.text ] = t, t[ 1 ] && ( [ i.x, i.y, i.w, i.h ] = t[ 1 ].split( "," ) )
                        }
                    } else {
                        const t = e.match( /([0-9]{2})?:?([0-9]{2}):([0-9]{2}).([0-9]{2,3})( ?--> ?)([0-9]{2})?:?([0-9]{2}):([0-9]{2}).([0-9]{2,3})/ );
                        t && ( i.startTime = 60 * Number( t[ 1 ] || 0 ) * 60 + 60 * Number( t[ 2 ] ) + Number( t[ 3 ] ) + Number( `0.${t[4]}` ), i.endTime = 60 * Number( t[ 6 ] || 0 ) * 60 + 60 * Number( t[ 7 ] ) + Number( t[ 8 ] ) + Number( `0.${t[9]}` ) )
                    }
                } ) ), i.text && t.push( i )
            } ) ), t
        },
        ft = ( e, t ) => {
            const i = {};
            return e > t.width / t.height ? ( i.width = t.width, i.height = 1 / e * t.width ) : ( i.height = t.height, i.width = e * t.height ), i
        };
    class bt {
        constructor( t ) {
            e( this, "load", ( () => {
                this.player.elements.display.seekTooltip && ( this.player.elements.display.seekTooltip.hidden = this.enabled ), this.enabled && this.getThumbnails().then( ( () => {
                    this.enabled && ( this.render(), this.determineContainerAutoSizing(), this.loaded = !0 )
                } ) )
            } ) ), e( this, "getThumbnails", ( () => new Promise( ( e => {
                const {
                    src: t
                } = this.player.config.previewThumbnails;
                if ( W( t ) ) throw new Error( "Missing previewThumbnails.src config attribute" );
                const i = () => {
                    this.thumbnails.sort( ( ( e, t ) => e.height - t.height ) ), this.player.debug.log( "Preview thumbnails", this.thumbnails ), e()
                };
                if ( q( t ) ) t( ( e => {
                    this.thumbnails = e, i()
                } ) );
                else {
                    const e = ( _( t ) ? [ t ] : t ).map( ( e => this.getThumbnail( e ) ) );
                    Promise.all( e ).then( i )
                }
            } ) ) ) ), e( this, "getThumbnail", ( e => new Promise( ( t => {
                Fe( e ).then( ( i => {
                    const s = {
                        frames: gt( i ),
                        height: null,
                        urlPrefix: ""
                    };
                    s.frames[ 0 ].text.startsWith( "/" ) || s.frames[ 0 ].text.startsWith( "http://" ) || s.frames[ 0 ].text.startsWith( "https://" ) || ( s.urlPrefix = e.substring( 0, e.lastIndexOf( "/" ) + 1 ) );
                    const n = new Image;
                    n.onload = () => {
                        s.height = n.naturalHeight, s.width = n.naturalWidth, this.thumbnails.push( s ), t()
                    }, n.src = s.urlPrefix + s.frames[ 0 ].text
                } ) )
            } ) ) ) ), e( this, "startMove", ( e => {
                if ( this.loaded && F( e ) && [ "touchmove", "mousemove" ].includes( e.type ) && this.player.media.duration ) {
                    if ( "touchmove" === e.type ) this.seekTime = this.player.media.duration * ( this.player.elements.inputs.seek.value / 100 );
                    else {
                        const t = this.player.elements.progress.getBoundingClientRect(),
                            i = 100 / t.width * ( e.pageX - t.left );
                        this.seekTime = this.player.media.duration * ( i / 100 ), this.seekTime < 0 && ( this.seekTime = 0 ), this.seekTime > this.player.media.duration - 1 && ( this.seekTime = this.player.media.duration - 1 ), this.mousePosX = e.pageX, this.elements.thumb.time.innerText = Be( this.seekTime )
                    }
                    this.showImageAtCurrentTime()
                }
            } ) ), e( this, "endMove", ( () => {
                this.toggleThumbContainer( !1, !0 )
            } ) ), e( this, "startScrubbing", ( e => {
                ( I( e.button ) || !1 === e.button || 0 === e.button ) && ( this.mouseDown = !0, this.player.media.duration && ( this.toggleScrubbingContainer( !0 ), this.toggleThumbContainer( !1, !0 ), this.showImageAtCurrentTime() ) )
            } ) ), e( this, "endScrubbing", ( () => {
                this.mouseDown = !1, Math.ceil( this.lastTime ) === Math.ceil( this.player.media.currentTime ) ? this.toggleScrubbingContainer( !1 ) : ye.call( this.player, this.player.media, "timeupdate", ( () => {
                    this.mouseDown || this.toggleScrubbingContainer( !1 )
                } ) )
            } ) ), e( this, "listeners", ( () => {
                this.player.on( "play", ( () => {
                    this.toggleThumbContainer( !1, !0 )
                } ) ), this.player.on( "seeked", ( () => {
                    this.toggleThumbContainer( !1 )
                } ) ), this.player.on( "timeupdate", ( () => {
                    this.lastTime = this.player.media.currentTime
                } ) )
            } ) ), e( this, "render", ( () => {
                this.elements.thumb.container = Z( "div", {
                    class: this.player.config.classNames.previewThumbnails.thumbContainer
                } ), this.elements.thumb.imageContainer = Z( "div", {
                    class: this.player.config.classNames.previewThumbnails.imageContainer
                } ), this.elements.thumb.container.appendChild( this.elements.thumb.imageContainer );
                const e = Z( "div", {
                    class: this.player.config.classNames.previewThumbnails.timeContainer
                } );
                this.elements.thumb.time = Z( "span", {}, "00:00" ), e.appendChild( this.elements.thumb.time ), this.elements.thumb.container.appendChild( e ), H( this.player.elements.progress ) && this.player.elements.progress.appendChild( this.elements.thumb.container ), this.elements.scrubbing.container = Z( "div", {
                    class: this.player.config.classNames.previewThumbnails.scrubbingContainer
                } ), this.player.elements.wrapper.appendChild( this.elements.scrubbing.container )
            } ) ), e( this, "destroy", ( () => {
                this.elements.thumb.container && this.elements.thumb.container.remove(), this.elements.scrubbing.container && this.elements.scrubbing.container.remove()
            } ) ), e( this, "showImageAtCurrentTime", ( () => {
                this.mouseDown ? this.setScrubbingContainerSize() : this.setThumbContainerSizeAndPos();
                const e = this.thumbnails[ 0 ].frames.findIndex( ( e => this.seekTime >= e.startTime && this.seekTime <= e.endTime ) ),
                    t = e >= 0;
                let i = 0;
                this.mouseDown || this.toggleThumbContainer( t ), t && ( this.thumbnails.forEach( ( ( t, s ) => {
                    this.loadedImages.includes( t.frames[ e ].text ) && ( i = s )
                } ) ), e !== this.showingThumb && ( this.showingThumb = e, this.loadImage( i ) ) )
            } ) ), e( this, "loadImage", ( ( e = 0 ) => {
                const t = this.showingThumb,
                    i = this.thumbnails[ e ],
                    {
                        urlPrefix: s
                    } = i,
                    n = i.frames[ t ],
                    a = i.frames[ t ].text,
                    l = s + a;
                if ( this.currentImageElement && this.currentImageElement.dataset.filename === a ) this.showImage( this.currentImageElement, n, e, t, a, !1 ), this.currentImageElement.dataset.index = t, this.removeOldImages( this.currentImageElement );
                else {
                    this.loadingImage && this.usingSprites && ( this.loadingImage.onload = null );
                    const i = new Image;
                    i.src = l, i.dataset.index = t, i.dataset.filename = a, this.showingThumbFilename = a, this.player.debug.log( `Loading image: ${l}` ), i.onload = () => this.showImage( i, n, e, t, a, !0 ), this.loadingImage = i, this.removeOldImages( i )
                }
            } ) ), e( this, "showImage", ( ( e, t, i, s, n, a = !0 ) => {
                this.player.debug.log( `Showing thumb: ${n}. num: ${s}. qual: ${i}. newimg: ${a}` ), this.setImageSizeAndOffset( e, t ), a && ( this.currentImageContainer.appendChild( e ), this.currentImageElement = e, this.loadedImages.includes( n ) || this.loadedImages.push( n ) ), this.preloadNearby( s, !0 ).then( this.preloadNearby( s, !1 ) ).then( this.getHigherQuality( i, e, t, n ) )
            } ) ), e( this, "removeOldImages", ( e => {
                Array.from( this.currentImageContainer.children ).forEach( ( t => {
                    if ( "img" !== t.tagName.toLowerCase() ) return;
                    const i = this.usingSprites ? 500 : 1e3;
                    if ( t.dataset.index !== e.dataset.index && !t.dataset.deleting ) {
                        t.dataset.deleting = !0;
                        const {
                            currentImageContainer: e
                        } = this;
                        setTimeout( ( () => {
                            e.removeChild( t ), this.player.debug.log( `Removing thumb: ${t.dataset.filename}` )
                        } ), i )
                    }
                } ) )
            } ) ), e( this, "preloadNearby", ( ( e, t = !0 ) => new Promise( ( i => {
                setTimeout( ( () => {
                    const s = this.thumbnails[ 0 ].frames[ e ].text;
                    if ( this.showingThumbFilename === s ) {
                        let n;
                        n = t ? this.thumbnails[ 0 ].frames.slice( e ) : this.thumbnails[ 0 ].frames.slice( 0, e ).reverse();
                        let a = !1;
                        n.forEach( ( e => {
                            const t = e.text;
                            if ( t !== s && !this.loadedImages.includes( t ) ) {
                                a = !0, this.player.debug.log( `Preloading thumb filename: ${t}` );
                                const {
                                    urlPrefix: e
                                } = this.thumbnails[ 0 ], s = e + t, n = new Image;
                                n.src = s, n.onload = () => {
                                    this.player.debug.log( `Preloaded thumb filename: ${t}` ), this.loadedImages.includes( t ) || this.loadedImages.push( t ), i()
                                }
                            }
                        } ) ), a || i()
                    }
                } ), 300 )
            } ) ) ) ), e( this, "getHigherQuality", ( ( e, t, i, s ) => {
                if ( e < this.thumbnails.length - 1 ) {
                    let n = t.naturalHeight;
                    this.usingSprites && ( n = i.h ), n < this.thumbContainerHeight && setTimeout( ( () => {
                        this.showingThumbFilename === s && ( this.player.debug.log( `Showing higher quality thumb for: ${s}` ), this.loadImage( e + 1 ) )
                    } ), 300 )
                }
            } ) ), e( this, "toggleThumbContainer", ( ( e = !1, t = !1 ) => {
                const i = this.player.config.classNames.previewThumbnails.thumbContainerShown;
                this.elements.thumb.container.classList.toggle( i, e ), !e && t && ( this.showingThumb = null, this.showingThumbFilename = null )
            } ) ), e( this, "toggleScrubbingContainer", ( ( e = !1 ) => {
                const t = this.player.config.classNames.previewThumbnails.scrubbingContainerShown;
                this.elements.scrubbing.container.classList.toggle( t, e ), e || ( this.showingThumb = null, this.showingThumbFilename = null )
            } ) ), e( this, "determineContainerAutoSizing", ( () => {
                ( this.elements.thumb.imageContainer.clientHeight > 20 || this.elements.thumb.imageContainer.clientWidth > 20 ) && ( this.sizeSpecifiedInCSS = !0 )
            } ) ), e( this, "setThumbContainerSizeAndPos", ( () => {
                if ( this.sizeSpecifiedInCSS ) {
                    if ( this.elements.thumb.imageContainer.clientHeight > 20 && this.elements.thumb.imageContainer.clientWidth < 20 ) {
                        const e = Math.floor( this.elements.thumb.imageContainer.clientHeight * this.thumbAspectRatio );
                        this.elements.thumb.imageContainer.style.width = `${e}px`
                    } else if ( this.elements.thumb.imageContainer.clientHeight < 20 && this.elements.thumb.imageContainer.clientWidth > 20 ) {
                        const e = Math.floor( this.elements.thumb.imageContainer.clientWidth / this.thumbAspectRatio );
                        this.elements.thumb.imageContainer.style.height = `${e}px`
                    }
                } else {
                    const e = Math.floor( this.thumbContainerHeight * this.thumbAspectRatio );
                    this.elements.thumb.imageContainer.style.height = `${this.thumbContainerHeight}px`, this.elements.thumb.imageContainer.style.width = `${e}px`
                }
                this.setThumbContainerPos()
            } ) ), e( this, "setThumbContainerPos", ( () => {
                const e = this.player.elements.progress.getBoundingClientRect(),
                    t = this.player.elements.container.getBoundingClientRect(),
                    {
                        container: i
                    } = this.elements.thumb,
                    s = t.left - e.left + 10,
                    n = t.right - e.left - i.clientWidth - 10;
                let a = this.mousePosX - e.left - i.clientWidth / 2;
                a < s && ( a = s ), a > n && ( a = n ), i.style.left = `${a}px`
            } ) ), e( this, "setScrubbingContainerSize", ( () => {
                const {
                    width: e,
                    height: t
                } = ft( this.thumbAspectRatio, {
                    width: this.player.media.clientWidth,
                    height: this.player.media.clientHeight
                } );
                this.elements.scrubbing.container.style.width = `${e}px`, this.elements.scrubbing.container.style.height = `${t}px`
            } ) ), e( this, "setImageSizeAndOffset", ( ( e, t ) => {
                if ( !this.usingSprites ) return;
                const i = this.thumbContainerHeight / t.h;
                e.style.height = e.naturalHeight * i + "px", e.style.width = e.naturalWidth * i + "px", e.style.left = `-${t.x*i}px`, e.style.top = `-${t.y*i}px`
            } ) ), this.player = t, this.thumbnails = [], this.loaded = !1, this.lastMouseMoveTime = Date.now(), this.mouseDown = !1, this.loadedImages = [], this.elements = {
                thumb: {},
                scrubbing: {}
            }, this.load()
        }
        get enabled() {
            return this.player.isHTML5 && this.player.isVideo && this.player.config.previewThumbnails.enabled
        }
        get currentImageContainer() {
            return this.mouseDown ? this.elements.scrubbing.container : this.elements.thumb.imageContainer
        }
        get usingSprites() {
            return Object.keys( this.thumbnails[ 0 ].frames[ 0 ] ).includes( "w" )
        }
        get thumbAspectRatio() {
            return this.usingSprites ? this.thumbnails[ 0 ].frames[ 0 ].w / this.thumbnails[ 0 ].frames[ 0 ].h : this.thumbnails[ 0 ].width / this.thumbnails[ 0 ].height
        }
        get thumbContainerHeight() {
            if ( this.mouseDown ) {
                const {
                    height: e
                } = ft( this.thumbAspectRatio, {
                    width: this.player.media.clientWidth,
                    height: this.player.media.clientHeight
                } );
                return e
            }
            return this.sizeSpecifiedInCSS ? this.elements.thumb.imageContainer.clientHeight : Math.floor( this.player.media.clientWidth / this.thumbAspectRatio / 4 )
        }
        get currentImageElement() {
            return this.mouseDown ? this.currentScrubbingImageElement : this.currentThumbnailImageElement
        }
        set currentImageElement( e ) {
            this.mouseDown ? this.currentScrubbingImageElement = e : this.currentThumbnailImageElement = e
        }
    }
    const yt = {
        insertElements( e, t ) {
            _( t ) ? ee( e, this.media, {
                src: t
            } ) : j( t ) && t.forEach( ( t => {
                ee( e, this.media, t )
            } ) )
        },
        change( e ) {
            Q( e, "sources.length" ) ? ( Ie.cancelRequests.call( this ), this.destroy.call( this, ( () => {
                this.options.quality = [], te( this.media ), this.media = null, H( this.elements.container ) && this.elements.container.removeAttribute( "class" );
                const {
                    sources: t,
                    type: i
                } = e, [ {
                    provider: s = Je.html5,
                    src: n
                } ] = t, a = "html5" === s ? i : "div", l = "html5" === s ? {} : {
                    src: n
                };
                Object.assign( this, {
                    provider: s,
                    type: i,
                    supported: me.check( i, s, this.config.playsinline ),
                    media: Z( a, l )
                } ), this.elements.container.appendChild( this.media ), O( e.autoplay ) && ( this.config.autoplay = e.autoplay ), this.isHTML5 && ( this.config.crossorigin && this.media.setAttribute( "crossorigin", "" ), this.config.autoplay && this.media.setAttribute( "autoplay", "" ), W( e.poster ) || ( this.poster = e.poster ), this.config.loop.active && this.media.setAttribute( "loop", "" ), this.config.muted && this.media.setAttribute( "muted", "" ), this.config.playsinline && this.media.setAttribute( "playsinline", "" ) ), nt.addStyleHook.call( this ), this.isHTML5 && yt.insertElements.call( this, "source", t ), this.config.title = e.title, mt.setup.call( this ), this.isHTML5 && Object.keys( e ).includes( "tracks" ) && yt.insertElements.call( this, "track", e.tracks ), ( this.isHTML5 || this.isEmbed && !this.supported.ui ) && nt.build.call( this ), this.isHTML5 && this.media.load(), W( e.previewThumbnails ) || ( Object.assign( this.config.previewThumbnails, e.previewThumbnails ), this.previewThumbnails && this.previewThumbnails.loaded && ( this.previewThumbnails.destroy(), this.previewThumbnails = null ), this.config.previewThumbnails.enabled && ( this.previewThumbnails = new bt( this ) ) ), this.fullscreen.update()
            } ), !0 ) ) : this.debug.warn( "Invalid source format" )
        }
    };
    class vt {
        constructor( t, i ) {
            if ( e( this, "play", ( () => q( this.media.play ) ? ( this.ads && this.ads.enabled && this.ads.managerPromise.then( ( () => this.ads.play() ) ).catch( ( () => ke( this.media.play() ) ) ), this.media.play() ) : null ) ), e( this, "pause", ( () => this.playing && q( this.media.pause ) ? this.media.pause() : null ) ), e( this, "togglePlay", ( e => ( O( e ) ? e : !this.playing ) ? this.play() : this.pause() ) ), e( this, "stop", ( () => {
                    this.isHTML5 ? ( this.pause(), this.restart() ) : q( this.media.stop ) && this.media.stop()
                } ) ), e( this, "restart", ( () => {
                    this.currentTime = 0
                } ) ), e( this, "rewind", ( e => {
                    this.currentTime -= $( e ) ? e : this.config.seekTime
                } ) ), e( this, "forward", ( e => {
                    this.currentTime += $( e ) ? e : this.config.seekTime
                } ) ), e( this, "increaseVolume", ( e => {
                    const t = this.media.muted ? 0 : this.volume;
                    this.volume = t + ( $( e ) ? e : 0 )
                } ) ), e( this, "decreaseVolume", ( e => {
                    this.increaseVolume( -e )
                } ) ), e( this, "airplay", ( () => {
                    me.airplay && this.media.webkitShowPlaybackTargetPicker()
                } ) ), e( this, "toggleControls", ( e => {
                    if ( this.supported.ui && !this.isAudio ) {
                        const t = oe( this.elements.container, this.config.classNames.hideControls ),
                            i = void 0 === e ? void 0 : !e,
                            s = le( this.elements.container, this.config.classNames.hideControls, i );
                        if ( s && j( this.config.controls ) && this.config.controls.includes( "settings" ) && !W( this.config.settings ) && Ue.toggleMenu.call( this, !1 ), s !== t ) {
                            const e = s ? "controlshidden" : "controlsshown";
                            ve.call( this, this.media, e )
                        }
                        return !s
                    }
                    return !1
                } ) ), e( this, "on", ( ( e, t ) => {
                    fe.call( this, this.elements.container, e, t )
                } ) ), e( this, "once", ( ( e, t ) => {
                    ye.call( this, this.elements.container, e, t )
                } ) ), e( this, "off", ( ( e, t ) => {
                    be( this.elements.container, e, t )
                } ) ), e( this, "destroy", ( ( e, t = !1 ) => {
                    if ( !this.ready ) return;
                    const i = () => {
                        document.body.style.overflow = "", this.embed = null, t ? ( Object.keys( this.elements ).length && ( te( this.elements.buttons.play ), te( this.elements.captions ), te( this.elements.controls ), te( this.elements.wrapper ), this.elements.buttons.play = null, this.elements.captions = null, this.elements.controls = null, this.elements.wrapper = null ), q( e ) && e() ) : ( we.call( this ), Ie.cancelRequests.call( this ), se( this.elements.original, this.elements.container ), ve.call( this, this.elements.original, "destroyed", !0 ), q( e ) && e.call( this.elements.original ), this.ready = !1, setTimeout( ( () => {
                            this.elements = null, this.media = null
                        } ), 200 ) )
                    };
                    this.stop(), clearTimeout( this.timers.loading ), clearTimeout( this.timers.controls ), clearTimeout( this.timers.resized ), this.isHTML5 ? ( nt.toggleNativeControls.call( this, !0 ), i() ) : this.isYouTube ? ( clearInterval( this.timers.buffering ), clearInterval( this.timers.playing ), null !== this.embed && q( this.embed.destroy ) && this.embed.destroy(), i() ) : this.isVimeo && ( null !== this.embed && this.embed.unload().then( i ), setTimeout( i, 200 ) )
                } ) ), e( this, "supports", ( e => me.mime.call( this, e ) ) ), this.timers = {}, this.ready = !1, this.loading = !1, this.failed = !1, this.touch = me.touch, this.media = t, _( this.media ) && ( this.media = document.querySelectorAll( this.media ) ), ( window.jQuery && this.media instanceof jQuery || D( this.media ) || j( this.media ) ) && ( this.media = this.media[ 0 ] ), this.config = X( {}, Ye, vt.defaults, i || {}, ( () => {
                    try {
                        return JSON.parse( this.media.getAttribute( "data-plyr-config" ) )
                    } catch ( e ) {
                        return {}
                    }
                } )() ), this.elements = {
                    container: null,
                    fullscreen: null,
                    captions: null,
                    buttons: {},
                    display: {},
                    progress: {},
                    inputs: {},
                    settings: {
                        popup: null,
                        menu: null,
                        panels: {},
                        buttons: {}
                    }
                }, this.captions = {
                    active: null,
                    currentTrack: -1,
                    meta: new WeakMap
                }, this.fullscreen = {
                    active: !1
                }, this.options = {
                    speed: [],
                    quality: []
                }, this.debug = new tt( this.config.debug ), this.debug.log( "Config", this.config ), this.debug.log( "Support", me ), I( this.media ) || !H( this.media ) ) return void this.debug.error( "Setup failed: no suitable element passed" );
            if ( this.media.plyr ) return void this.debug.warn( "Target already setup" );
            if ( !this.config.enabled ) return void this.debug.error( "Setup failed: disabled by config" );
            if ( !me.check().api ) return void this.debug.error( "Setup failed: no support" );
            const s = this.media.cloneNode( !0 );
            s.autoplay = !1, this.elements.original = s;
            const n = this.media.tagName.toLowerCase();
            let a = null,
                l = null;
            switch ( n ) {
                case "div":
                    if ( a = this.media.querySelector( "iframe" ), H( a ) ) {
                        if ( l = We( a.getAttribute( "src" ) ), this.provider = function ( e ) {
                                return /^(https?:\/\/)?(www\.)?(youtube\.com|youtube-nocookie\.com|youtu\.?be)\/.+$/.test( e ) ? Je.youtube : /^https?:\/\/player.vimeo.com\/video\/\d{0,9}(?=\b|\/)/.test( e ) ? Je.vimeo : null
                            }( l.toString() ), this.elements.container = this.media, this.media = a, this.elements.container.className = "", l.search.length ) {
                            const e = [ "1", "true" ];
                            e.includes( l.searchParams.get( "autoplay" ) ) && ( this.config.autoplay = !0 ), e.includes( l.searchParams.get( "loop" ) ) && ( this.config.loop.active = !0 ), this.isYouTube ? ( this.config.playsinline = e.includes( l.searchParams.get( "playsinline" ) ), this.config.youtube.hl = l.searchParams.get( "hl" ) ) : this.config.playsinline = !0
                        }
                    } else this.provider = this.media.getAttribute( this.config.attributes.embed.provider ), this.media.removeAttribute( this.config.attributes.embed.provider );
                    if ( W( this.provider ) || !Object.values( Je ).includes( this.provider ) ) return void this.debug.error( "Setup failed: Invalid provider" );
                    this.type = Ze;
                    break;
                case "video":
                case "audio":
                    this.type = n, this.provider = Je.html5, this.media.hasAttribute( "crossorigin" ) && ( this.config.crossorigin = !0 ), this.media.hasAttribute( "autoplay" ) && ( this.config.autoplay = !0 ), ( this.media.hasAttribute( "playsinline" ) || this.media.hasAttribute( "webkit-playsinline" ) ) && ( this.config.playsinline = !0 ), this.media.hasAttribute( "muted" ) && ( this.config.muted = !0 ), this.media.hasAttribute( "loop" ) && ( this.config.loop.active = !0 );
                    break;
                default:
                    return void this.debug.error( "Setup failed: unsupported type" )
            }
            this.supported = me.check( this.type, this.provider, this.config.playsinline ), this.supported.api ? ( this.eventListeners = [], this.listeners = new at( this ), this.storage = new He( this ), this.media.plyr = this, H( this.elements.container ) || ( this.elements.container = Z( "div", {
                tabindex: 0
            } ), J( this.media, this.elements.container ) ), nt.migrateStyles.call( this ), nt.addStyleHook.call( this ), mt.setup.call( this ), this.config.debug && fe.call( this, this.elements.container, this.config.events.join( " " ), ( e => {
                this.debug.log( `event: ${e.type}` )
            } ) ), this.fullscreen = new it( this ), ( this.isHTML5 || this.isEmbed && !this.supported.ui ) && nt.build.call( this ), this.listeners.container(), this.listeners.global(), this.config.ads.enabled && ( this.ads = new pt( this ) ), this.isHTML5 && this.config.autoplay && this.once( "canplay", ( () => ke( this.play() ) ) ), this.lastSeekTime = 0, this.config.previewThumbnails.enabled && ( this.previewThumbnails = new bt( this ) ) ) : this.debug.error( "Setup failed: no support" )
        }
        get isHTML5() {
            return this.provider === Je.html5
        }
        get isEmbed() {
            return this.isYouTube || this.isVimeo
        }
        get isYouTube() {
            return this.provider === Je.youtube
        }
        get isVimeo() {
            return this.provider === Je.vimeo
        }
        get isVideo() {
            return this.type === Ze
        }
        get isAudio() {
            return this.type === Ge
        }
        get playing() {
            return Boolean( this.ready && !this.paused && !this.ended )
        }
        get paused() {
            return Boolean( this.media.paused )
        }
        get stopped() {
            return Boolean( this.paused && 0 === this.currentTime )
        }
        get ended() {
            return Boolean( this.media.ended )
        }
        set currentTime( e ) {
            if ( !this.duration ) return;
            const t = $( e ) && e > 0;
            this.media.currentTime = t ? Math.min( e, this.duration ) : 0, this.debug.log( `Seeking to ${this.currentTime} seconds` )
        }
        get currentTime() {
            return Number( this.media.currentTime )
        }
        get buffered() {
            const {
                buffered: e
            } = this.media;
            return $( e ) ? e : e && e.length && this.duration > 0 ? e.end( 0 ) / this.duration : 0
        }
        get seeking() {
            return Boolean( this.media.seeking )
        }
        get duration() {
            const e = parseFloat( this.config.duration ),
                t = ( this.media || {} ).duration,
                i = $( t ) && t !== 1 / 0 ? t : 0;
            return e || i
        }
        set volume( e ) {
            let t = e;
            _( t ) && ( t = Number( t ) ), $( t ) || ( t = this.storage.get( "volume" ) ), $( t ) || ( {
                volume: t
            } = this.config ), t > 1 && ( t = 1 ), t < 0 && ( t = 0 ), this.config.volume = t, this.media.volume = t, !W( e ) && this.muted && t > 0 && ( this.muted = !1 )
        }
        get volume() {
            return Number( this.media.volume )
        }
        set muted( e ) {
            let t = e;
            O( t ) || ( t = this.storage.get( "muted" ) ), O( t ) || ( t = this.config.muted ), this.config.muted = t, this.media.muted = t
        }
        get muted() {
            return Boolean( this.media.muted )
        }
        get hasAudio() {
            return !this.isHTML5 || ( !!this.isAudio || ( Boolean( this.media.mozHasAudio ) || Boolean( this.media.webkitAudioDecodedByteCount ) || Boolean( this.media.audioTracks && this.media.audioTracks.length ) ) )
        }
        set speed( e ) {
            let t = null;
            $( e ) && ( t = e ), $( t ) || ( t = this.storage.get( "speed" ) ), $( t ) || ( t = this.config.speed.selected );
            const {
                minimumSpeed: i,
                maximumSpeed: s
            } = this;
            t = function ( e = 0, t = 0, i = 255 ) {
                return Math.min( Math.max( e, t ), i )
            }( t, i, s ), this.config.speed.selected = t, setTimeout( ( () => {
                this.media.playbackRate = t
            } ), 0 )
        }
        get speed() {
            return Number( this.media.playbackRate )
        }
        get minimumSpeed() {
            return this.isYouTube ? Math.min( ...this.options.speed ) : this.isVimeo ? .5 : .0625
        }
        get maximumSpeed() {
            return this.isYouTube ? Math.max( ...this.options.speed ) : this.isVimeo ? 2 : 16
        }
        set quality( e ) {
            const t = this.config.quality,
                i = this.options.quality;
            if ( !i.length ) return;
            let s = [ !W( e ) && Number( e ), this.storage.get( "quality" ), t.selected, t.default ].find( $ ),
                n = !0;
            if ( !i.includes( s ) ) {
                const e = Ae( i, s );
                this.debug.warn( `Unsupported quality option: ${s}, using ${e} instead` ), s = e, n = !1
            }
            t.selected = s, this.media.quality = s, n && this.storage.set( {
                quality: s
            } )
        }
        get quality() {
            return this.media.quality
        }
        set loop( e ) {
            const t = O( e ) ? e : this.config.loop.active;
            this.config.loop.active = t, this.media.loop = t
        }
        get loop() {
            return Boolean( this.media.loop )
        }
        set source( e ) {
            yt.change.call( this, e )
        }
        get source() {
            return this.media.currentSrc
        }
        get download() {
            const {
                download: e
            } = this.config.urls;
            return U( e ) ? e : this.source
        }
        set download( e ) {
            U( e ) && ( this.config.urls.download = e, Ue.setDownloadUrl.call( this ) )
        }
        set poster( e ) {
            this.isVideo ? nt.setPoster.call( this, e, !1 ).catch( ( () => {} ) ) : this.debug.warn( "Poster can only be set for video" )
        }
        get poster() {
            return this.isVideo ? this.media.getAttribute( "poster" ) || this.media.getAttribute( "data-poster" ) : null
        }
        get ratio() {
            if ( !this.isVideo ) return null;
            const e = Pe( Ne.call( this ) );
            return j( e ) ? e.join( ":" ) : e
        }
        set ratio( e ) {
            this.isVideo ? _( e ) && Ee( e ) ? ( this.config.ratio = Pe( e ), Me.call( this ) ) : this.debug.error( `Invalid aspect ratio specified (${e})` ) : this.debug.warn( "Aspect ratio can only be set for video" )
        }
        set autoplay( e ) {
            const t = O( e ) ? e : this.config.autoplay;
            this.config.autoplay = t
        }
        get autoplay() {
            return Boolean( this.config.autoplay )
        }
        toggleCaptions( e ) {
            Ke.toggle.call( this, e, !1 )
        }
        set currentTrack( e ) {
            Ke.set.call( this, e, !1 )
        }
        get currentTrack() {
            const {
                toggled: e,
                currentTrack: t
            } = this.captions;
            return e ? t : -1
        }
        set language( e ) {
            Ke.setLanguage.call( this, e, !1 )
        }
        get language() {
            return ( Ke.getCurrentTrack.call( this ) || {} ).language
        }
        set pip( e ) {
            if ( !me.pip ) return;
            const t = O( e ) ? e : !this.pip;
            q( this.media.webkitSetPresentationMode ) && this.media.webkitSetPresentationMode( t ? Qe : Xe ), q( this.media.requestPictureInPicture ) && ( !this.pip && t ? this.media.requestPictureInPicture() : this.pip && !t && document.exitPictureInPicture() )
        }
        get pip() {
            return me.pip ? W( this.media.webkitPresentationMode ) ? this.media === document.pictureInPictureElement : this.media.webkitPresentationMode === Qe : null
        }
        static supported( e, t, i ) {
            return me.check( e, t, i )
        }
        static loadSprite( e, t ) {
            return Re( e, t )
        }
        static setup( e, t = {} ) {
            let i = null;
            return _( e ) ? i = Array.from( document.querySelectorAll( e ) ) : D( e ) ? i = Array.from( e ) : j( e ) && ( i = e.filter( H ) ), W( i ) ? null : i.map( ( e => new vt( e, t ) ) )
        }
    }
    var wt;
    return vt.defaults = ( wt = Ye, JSON.parse( JSON.stringify( wt ) ) ), vt
} ) );
