const axios = require('axios');

function convert(time){
  var date = new Date(`${time}`);
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var seconds = date.getSeconds();
  var formattedDate = `${ day < 10 ? "0" + day : day}` + "/" +`${ month < 10 ? "0" + month : month}` + "/" + year + "||" + `${ hours < 10 ? "0" + hours : hours}` + ":" + `${ minutes < 10 ? "0" + minutes : minutes}` + ":" + `${ seconds < 10 ? "0" + seconds : seconds}`;
  return formattedDate;
}

module.exports = async (req, res) => {
  axios.get(`https://graph.facebook.com/v1.0/${req.query.uid}?fields=id,is_verified,cover,created_time,work,hometown,username,link,name,locale,location,about,website,birthday,gender,relationship_status,significant_other,quotes,first_name,subscribers.limit(0)&access_token=EAAD6V7os0gcBQZAmZAE5P4eN4ouaGOjKN4vJJnOV04ZCOU7CiaEHzcVZAitu22MMHB2ZCWAbnK0ZA76Lwlcjti8ovZBQ1y0TfHFedDzzwDOgMIXanRDuls8Glz82uGlmktjxbnSWe7B2I64wP4gCzJz1iYZAJLhUqcz7N4TNjEnVrxp08pGaTZCTxXazKkZC5EHM956AZDZD`,{
    headers: {
      "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 12_0 like) Version/12.0 eWebKit/605.1.15 (KHTML, like Gecko) Version/12.0 Mobile/15E148 Safari/604.1",
      "accept": "application/json, text/plain, */*",
      "cookie": "xs=19%3AEqx5Bk2ezY4JeQ%3A2%3A1769807161%3A-1%3A-1; fbl_st=101421541%3BT%3A29661720; ps_l=1; fr=0KHMiWIIQhHsYE9vv.AWfvYzPaZFf7qT-TtA7sKbs0rM6P808lh6enhzJaHfd72BjArD4.BqFByF..AAA.0.0.BqFB24.AWfgzjgrVCTu9foGC6s3mspw5BU; c_user=100000233785625; datr=lcZ8abUD_S5MbC4a5X2q1UO0; locale=vi_VN; wl_cbv=v2%3Bclient_version%3A3170%3Btimestamp%3A1779703208; sb=lcZ8aUsxINrkKOyq4tRDNc8w; pas=61554498010746%3A5hRF6ikqP9%2C100000233785625%3AbBsO8Tl90p; vpd=v1%3B932x430x3; ps_n=1"
    }
  }).then(resp => {
    var dj = {
      name: resp.data.name,
      link_profile: resp.data.link,
      uid: resp.data.id,
      first_name: resp.data.first_name,
      username: resp.data.username,
      created_time: convert(resp.data.created_time),
      web: resp.data.website || "Không có dữ liệu!",
      gender: resp.data.gender,
      relationship_status: resp.data.relationship_status || "Không có dữ liệu!",
      love: resp.data.significant_other || "Không có",
      birthday: resp.data.birthday || "Sinh nhật private",
      follower: resp.data.subscribers.summary.total_count || "Không công khai",
      tichxanh: resp.data.is_verified,
      avatar: `https://graph.facebook.com/${resp.data.id}/picture?width=1500&height=1500&access_token=2712477385668128%7Cb429aeb53369951d411e1cae8e810640`,
      quotes: resp.data.quotes || "Không có dữ liệu!",
      about: resp.data.about || "Không có dữ liệu!",
      locale: resp.data.locale,
      location: !!resp.data.location ? resp.data.location.name : undefined,
      hometown: !!resp.data.hometown ? resp.data.hometown.name : undefined,
      cover: !!resp.data.source ? resp.data.source : undefined,
      work: resp.data.work,
      author: "@wjxaz"
    }
    res.json(dj)
  }).catch(e => {
    console.log(e)
    res.status(500).json({ error: 'Tài khoản die hoặc token api die vui lòng liên hệ admin' });
  })
}
