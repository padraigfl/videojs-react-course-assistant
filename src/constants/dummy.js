import { ytTimeToSeconds } from '../helpers';

const initialPlaylist = {
  total: 20,
  items: {
    OE2qEpkWWoQ: {
      videoId: 'OE2qEpkWWoQ',
      thumbnail: {
        url: 'https://i.ytimg.com/vi/OE2qEpkWWoQ/default.jpg',
        width: 120,
        height: 90
      },
      posterImage: 'https://i.ytimg.com/vi/OE2qEpkWWoQ/hqdefault.jpg',
      channelId: 'UC-1rVsh8pvXBAMZ5q_B3CEg',
      channelTitle: 'Full Album!',
      title: 'Carly Rae Jepsen - Run Away With Me (Audio)',
      duration: 260,
      description:
        'Album: E•MO•TION\nRelease date: August 21, 2015\nBuy E•MO•TION on iTunes: http://smarturl.it/E-MO-TION'
    },
    '_-XWAQ1wCAA': {
      videoId: '_-XWAQ1wCAA',
      thumbnail: {
        url: 'https://i.ytimg.com/vi/_-XWAQ1wCAA/default.jpg',
        width: 120,
        height: 90
      },
      posterImage: 'https://i.ytimg.com/vi/_-XWAQ1wCAA/hqdefault.jpg',
      channelId: 'UC-1rVsh8pvXBAMZ5q_B3CEg',
      channelTitle: 'Full Album!',
      title: 'Carly Rae Jepsen - Emotion (Audio)',
      duration: 260,
      description:
        'Album: E•MO•TION\nRelease date: August 21, 2015 Buy E•MO•TION on iTunes: http://smarturl.it/E-MO-TION'
    },
    '77PzXCKDyVQ': {
      videoId: '77PzXCKDyVQ',
      thumbnail: {
        url: 'https://i.ytimg.com/vi/77PzXCKDyVQ/default.jpg',
        width: 120,
        height: 90
      },
      posterImage: 'https://i.ytimg.com/vi/77PzXCKDyVQ/hqdefault.jpg',
      channelId: 'UC-1rVsh8pvXBAMZ5q_B3CEg',
      channelTitle: 'Full Album!',
      title: 'Carly Rae Jepsen - I Really Like You (Audio)',
      duration: 260,
      description:
        'Get E•MO•TION on iTunes now: http://smarturl.it/E-MO-TION\n\nSign up for Carly Rae Jepsen news here: http://smarturl.it/CRJ.News\n\nMusic video by Carly Rae Jepsen performing I Really Like You. (C) 2015 School Boy/Interscope Records'
    },
    OKsAnpPg15c: {
      videoId: 'OKsAnpPg15c',
      thumbnail: {
        url: 'https://i.ytimg.com/vi/OKsAnpPg15c/default.jpg',
        width: 120,
        height: 90
      },
      posterImage: 'https://i.ytimg.com/vi/OKsAnpPg15c/hqdefault.jpg',
      channelId: 'UC-1rVsh8pvXBAMZ5q_B3CEg',
      channelTitle: 'Full Album!',
      title: 'Carly Rae Jepsen - Gimmie Love (Audio)',
      duration: 260,
      description:
        'Album: E•MO•TION\nRelease date: August 21, 2015 Buy E•MO•TION on iTunes: http://smarturl.it/E-MO-TION'
    },
    W374tWnsk70: {
      videoId: 'W374tWnsk70',
      thumbnail: {
        url: 'https://i.ytimg.com/vi/W374tWnsk70/default.jpg',
        width: 120,
        height: 90
      },
      posterImage: 'https://i.ytimg.com/vi/W374tWnsk70/hqdefault.jpg',
      channelId: 'UC-1rVsh8pvXBAMZ5q_B3CEg',
      channelTitle: 'Full Album!',
      title: 'Carly Rae Jepsen - All That (Audio)',
      duration: 260,
      description:
        'Get E•MO•TION on iTunes now: http://smarturl.it/E-MO-TION\n\nSign up for Carly Rae Jepsen news here: http://smarturl.it/CRJ.News'
    },
    YSf_i1SUFhM: {
      videoId: 'YSf_i1SUFhM',
      thumbnail: {
        url: 'https://i.ytimg.com/vi/YSf_i1SUFhM/default.jpg',
        width: 120,
        height: 90
      },
      posterImage: 'https://i.ytimg.com/vi/YSf_i1SUFhM/hqdefault.jpg',
      channelId: 'UC-1rVsh8pvXBAMZ5q_B3CEg',
      channelTitle: 'Full Album!',
      title: 'Carly Rae Jepsen - Boy Problems (Audio)',
      duration: 260,
      description:
        'Album: E•MO•TION\nRelease date: August 21, 2015\nBuy E•MO•TION on iTunes: http://smarturl.it/E-MO-TION'
    },
    gBOhnT6bUaY: {
      videoId: 'gBOhnT6bUaY',
      thumbnail: {
        url: 'https://i.ytimg.com/vi/gBOhnT6bUaY/default.jpg',
        width: 120,
        height: 90
      },
      posterImage: 'https://i.ytimg.com/vi/gBOhnT6bUaY/hqdefault.jpg',
      channelId: 'UC-1rVsh8pvXBAMZ5q_B3CEg',
      channelTitle: 'Full Album!',
      title: 'Carly Rae Jepsen - Making The Most Of The Night (Audio)',
      duration: 260,
      description:
        'Album: E•MO•TION\nRelease date: August 21, 2015\nBuy E•MO•TION on iTunes: http://smarturl.it/E-MO-TION'
    },
    _98VZT9s7M0: {
      videoId: '_98VZT9s7M0',
      thumbnail: {
        url: 'https://i.ytimg.com/vi/_98VZT9s7M0/default.jpg',
        width: 120,
        height: 90
      },
      posterImage: 'https://i.ytimg.com/vi/_98VZT9s7M0/hqdefault.jpg',
      channelId: 'UC-1rVsh8pvXBAMZ5q_B3CEg',
      channelTitle: 'Full Album!',
      title: 'Carly Rae Jepsen - Your Type (Audio)',
      duration: 260,
      description:
        'Get E•MO•TION on iTunes now: http://smarturl.it/E-MO-TION\n\nArt by Kelsey Montague\nInstagram: https://instagram.com/kelseymontagueart/\nFacebook: https://www.facebook.com/pages/Kelsey-Montague-Art/379278752084914\nTwitter: https://twitter.com/kelsmontagueart\nWebsite: http://kelseymontagueart.com/\n\nConnect with Carly Rae Jepsen:\nOfficial - http://www.carlyraemusic.com \nYouTube: https://www.youtube.com/user/CarlyRaeMusic \nTwitter - https://twitter.com/CarlyRaeJepsen \nFacebook - https://www.facebook.com/CarlyRaeJepsen \nInstagram - http://instagram.com/CarlyRaeJepsen \nSign up for Carly Rae Jepsen news here: http://smarturl.it/CRJ.News\n\nhttp://vevo.ly/ac4m7w'
    },
    S2BGjJ_4BTk: {
      videoId: 'S2BGjJ_4BTk',
      thumbnail: {
        url: 'https://i.ytimg.com/vi/S2BGjJ_4BTk/default.jpg',
        width: 120,
        height: 90
      },
      posterImage: 'https://i.ytimg.com/vi/S2BGjJ_4BTk/hqdefault.jpg',
      channelId: 'UC-1rVsh8pvXBAMZ5q_B3CEg',
      channelTitle: 'Full Album!',
      title: "Carly Rae Jepsen - Let's Get Lost (Audio)",
      duration: 260,
      description:
        'Album: E•MO•TION\nRelease date: August 21, 2015\nBuy E•MO•TION on iTunes: http://smarturl.it/E-MO-TION'
    },
    RPrZUiDVHrM: {
      videoId: 'RPrZUiDVHrM',
      thumbnail: {
        url: 'https://i.ytimg.com/vi/RPrZUiDVHrM/default.jpg',
        width: 120,
        height: 90
      },
      posterImage: 'https://i.ytimg.com/vi/RPrZUiDVHrM/hqdefault.jpg',
      channelId: 'UC-1rVsh8pvXBAMZ5q_B3CEg',
      channelTitle: 'Full Album!',
      title: 'Carly Rae Jepsen - LA Hallucinations (Audio)',
      duration: 260,
      description:
        'Album: E•MO•TION\nRelease date: August 21, 2015\nBuy E•MO•TION on iTunes: http://smarturl.it/E-MO-TION'
    },
    iBPw0l26L58: {
      videoId: 'iBPw0l26L58',
      thumbnail: {
        url: 'https://i.ytimg.com/vi/iBPw0l26L58/default.jpg',
        width: 120,
        height: 90
      },
      posterImage: 'https://i.ytimg.com/vi/iBPw0l26L58/hqdefault.jpg',
      channelId: 'UC-1rVsh8pvXBAMZ5q_B3CEg',
      channelTitle: 'Full Album!',
      title: 'Carly Rae Jepsen - Warm Blood (Audio)',
      duration: 260,
      description:
        'Get E•MO•TION on iTunes now: http://smarturl.it/E-MO-TION\n\nArt by Shelby Edwards of LITTLEDRILL\nInstagram: http://instagram.com/LITTLEDRILL\nTwitter: http://twitter.com/itsLITTLEDRILL\nTumblr: http://LITTLEDRILL.tumblr.com\n\nConnect with Carly Rae Jepsen:\nOfficial - http://www.carlyraemusic.com\nYouTube: http://www.youtube.com/carlyraejepsen...\nTwitter - https://twitter.com/CarlyRaeJepsen\nFacebook - https://www.facebook.com/CarlyRaeJepsen\nInstagram - http://instagram.com/CarlyRaeJepsen\n\n“Warm Blood” was produced by Rostam Batmanglij.\n\nSign up for Carly Rae Jepsen news here: http://smarturl.it/CRJ.News\n\nhttp://vevo.ly/vqKKkx'
    },
    'FLkj9zr0-sQ': {
      videoId: 'FLkj9zr0-sQ',
      thumbnail: {
        url: 'https://i.ytimg.com/vi/FLkj9zr0-sQ/default.jpg',
        width: 120,
        height: 90
      },
      posterImage: 'https://i.ytimg.com/vi/FLkj9zr0-sQ/hqdefault.jpg',
      channelId: 'UC-1rVsh8pvXBAMZ5q_B3CEg',
      channelTitle: 'Full Album!',
      title: 'Carly Rae Jepsen - When I Needed You (Audio)',
      duration: 260,
      description:
        'Album: E•MO•TION\nRelease date: August 21, 2015\nBuy E•MO•TION on iTunes: http://smarturl.it/E-MO-TION'
    },
    a79Y7Mbqx1I: {
      videoId: 'a79Y7Mbqx1I',
      thumbnail: {
        url: 'https://i.ytimg.com/vi/a79Y7Mbqx1I/default.jpg',
        width: 120,
        height: 90
      },
      posterImage: 'https://i.ytimg.com/vi/a79Y7Mbqx1I/hqdefault.jpg',
      channelId: 'UC-1rVsh8pvXBAMZ5q_B3CEg',
      channelTitle: 'Full Album!',
      title: 'Carly Rae Jepsen - Black Heart (Audio)',
      duration: 260,
      description:
        'Album: E•MO•TION\nRelease date: August 21, 2015\nBuy E•MO•TION on iTunes: http://smarturl.it/E-MO-TION'
    },
    '6_zD5-ij7So': {
      videoId: '6_zD5-ij7So',
      thumbnail: {
        url: 'https://i.ytimg.com/vi/6_zD5-ij7So/default.jpg',
        width: 120,
        height: 90
      },
      posterImage: 'https://i.ytimg.com/vi/6_zD5-ij7So/hqdefault.jpg',
      channelId: 'UC-1rVsh8pvXBAMZ5q_B3CEg',
      channelTitle: 'Full Album!',
      title: "Carly Rae Jepsen - I Didn't Just Come Here To Dance (Audio)",
      duration: 260,
      description:
        'Album: E•MO•TION\nRelease date: August 21, 2015\nBuy E•MO•TION on iTunes: http://smarturl.it/E-MO-TION'
    },
    '0gpGqGHEr_8': {
      videoId: '0gpGqGHEr_8',
      thumbnail: {
        url: 'https://i.ytimg.com/vi/0gpGqGHEr_8/default.jpg',
        width: 120,
        height: 90
      },
      posterImage: 'https://i.ytimg.com/vi/0gpGqGHEr_8/hqdefault.jpg',
      channelId: 'UC-1rVsh8pvXBAMZ5q_B3CEg',
      channelTitle: 'Full Album!',
      title: 'Carly Rae Jepsen - Favourite Colour (Audio)',
      duration: 260,
      description:
        'Album: E•MO•TION\nRelease date: August 21, 2015\nBuy E•MO•TION on iTunes: http://smarturl.it/E-MO-TION'
    },
    qvApKIuJ68M: {
      videoId: 'qvApKIuJ68M',
      thumbnail: {
        url: 'https://i.ytimg.com/vi/qvApKIuJ68M/default.jpg',
        width: 120,
        height: 90
      },
      posterImage: 'https://i.ytimg.com/vi/qvApKIuJ68M/hqdefault.jpg',
      channelId: 'UC-1rVsh8pvXBAMZ5q_B3CEg',
      channelTitle: 'Full Album!',
      title: 'Carly Rae Jepsen - Never Get to Hold You (Audio)',
      duration: 260,
      description:
        'Album: E•MO•TION\nRelease date: August 21, 2015\nBuy E•MO•TION on iTunes: http://smarturl.it/E-MO-TION'
    },
    z7Zmc838tCE: {
      videoId: 'z7Zmc838tCE',
      thumbnail: {
        url: 'https://i.ytimg.com/vi/z7Zmc838tCE/default.jpg',
        width: 120,
        height: 90
      },
      posterImage: 'https://i.ytimg.com/vi/z7Zmc838tCE/hqdefault.jpg',
      channelId: 'UC-1rVsh8pvXBAMZ5q_B3CEg',
      channelTitle: 'Full Album!',
      title: 'Carly Rae Jepsen - Love Again (Audio)',
      duration: 260,
      description:
        'Album: E•MO•TION\nRelease date: August 21, 2015\nBuy E•MO•TION on iTunes: http://smarturl.it/E-MO-TION'
    },
    ucshSaH5Jv4: {
      videoId: 'ucshSaH5Jv4',
      thumbnail: {
        url: 'https://i.ytimg.com/vi/ucshSaH5Jv4/default.jpg',
        width: 120,
        height: 90
      },
      posterImage: 'https://i.ytimg.com/vi/ucshSaH5Jv4/hqdefault.jpg',
      channelId: 'UC-1rVsh8pvXBAMZ5q_B3CEg',
      channelTitle: 'Full Album!',
      title:
        'Carly Rae Jepsen - I Really Like You (Liam Keegan Remix Radio Edit) (Audio)',
      duration: 260,
      description:
        'Album: E•MO•TION\nRelease date: August 21, 2015\nBuy E•MO•TION on iTunes: http://smarturl.it/E-MO-TION'
    },
    n5g_xj0FWyw: {
      videoId: 'n5g_xj0FWyw',
      thumbnail: {
        url: 'https://i.ytimg.com/vi/n5g_xj0FWyw/default.jpg',
        width: 120,
        height: 90
      },
      posterImage: 'https://i.ytimg.com/vi/n5g_xj0FWyw/hqdefault.jpg',
      channelId: 'UC-1rVsh8pvXBAMZ5q_B3CEg',
      channelTitle: 'Full Album!',
      title: 'Carly Rae Jepsen - First Time (Audio)',
      duration: 260,
      description: 'Album: EMOTION REMIXED +\nRelease date: March 18, 2016'
    },
    'Ao-HiX7w9GQ': {
      videoId: 'Ao-HiX7w9GQ',
      thumbnail: {
        url: 'https://i.ytimg.com/vi/Ao-HiX7w9GQ/default.jpg',
        width: 120,
        height: 90
      },
      posterImage: 'https://i.ytimg.com/vi/Ao-HiX7w9GQ/hqdefault.jpg',
      channelId: 'UC-1rVsh8pvXBAMZ5q_B3CEg',
      channelTitle: 'Full Album!',
      title: 'Carly Rae Jepsen - Fever (Audio)',
      duration: 260,
      description: 'Album: EMOTION REMIXED +\nRelease date: March 18, 2016'
    }
  },
  order: [
    'OE2qEpkWWoQ',
    '_-XWAQ1wCAA',
    '77PzXCKDyVQ',
    'OKsAnpPg15c',
    'W374tWnsk70',
    'YSf_i1SUFhM',
    'gBOhnT6bUaY',
    '_98VZT9s7M0',
    'S2BGjJ_4BTk',
    'RPrZUiDVHrM',
    'iBPw0l26L58',
    'FLkj9zr0-sQ',
    'a79Y7Mbqx1I',
    '6_zD5-ij7So',
    '0gpGqGHEr_8',
    'qvApKIuJ68M',
    'z7Zmc838tCE',
    'ucshSaH5Jv4',
    'n5g_xj0FWyw',
    'Ao-HiX7w9GQ'
  ]
};

export default initialPlaylist;
