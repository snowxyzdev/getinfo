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
  axios.get(`https://graph.facebook.com/v1.0/${req.query.uid}?fields=id,is_verified,cover,created_time,work,hometown,username,link,name,locale,location,about,website,birthday,gender,relationship_status,significant_other,quotes,first_name,subscribers.limit(0)&access_token=EAAGNO4a7r2wBRoVZCZAjE3ZBdxwHy4zOUMJ0sGZBvALTcegZBVnMq2gwIZCBQMqmAtQ6QzOXsQmaZAgH13ZAhDDrU8N2tzQm3MWZAmQIGZB6dGrPoyY8Ri8BYSuM6Hym2KGSUTc5UBx3pQ7aLUKfkgmyXiUqe9ZBt9KoSi9EMG7NRRdjp0WBVWxWSeyQ16TFDtKkMMp0gZDZD`,{
    headers: {
      "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 12_0 like) Version/12.0 eWebKit/605.1.15 (KHTML, like Gecko) Version/12.0 Mobile/15E148 Safari/604.1",
      "accept": "application/json, text/plain, */*",
      "cookie": "datr=9xQXanNuyd7S1_gXcmiPoUJC;sb=9xQXasKB8Hpr5bkpuW3eBx4s;c_user=61554809607268;ps_l=1;ps_n=1;xs=33%3AL8N7s8R5mhSE_g%3A2%3A1779897902%3A-1%3A-1%3A%3AAcysIgVU7de0CIN9ImX2P6ONRwGOv8msQ0ujqRi2Mg;fr=16GdWNzy9X6ieuj8f.AWf8rRBxo4LuLP8a6HJkAp94B5eQJMgEjzhSozZAR0tiMs0QGxQ.BqF3oD..AAA.0.0.BqF4KI.AWdwj-HcmJ2usw6yAe4Yivt_q8M;presence=C%7B%22lm3%22%3A%22u.100066238841683%22%2C%22t3%22%3A%5B%5D%2C%22utc3%22%3A1779925681878%2C%22v%22%3A1%7D;wd=808x1420;"
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
