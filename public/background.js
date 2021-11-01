// var json = "{\"www.facebook.com\":[{\"Host\":\".facebook.com\",\"Path\":\"\/\",\"KeyName\":\"fr\",\"Value\":\"1wkewrOUx0IpBLXPb.AWWmq8JfC8c1OMWMwXC1OI-8-AU.BgwyRS.eU.AAA.0.0.BgwyRS.AWW2CV8dkPI\",\"IsSecure\":true,\"IsHTTPOnly\":true,\"HasExpire\":true,\"IsPersistent\":true,\"CreateDate\":\"2021-05-09T08:52:32.975Z\",\"ExpireDate\":\"2021-09-09T08:52:32.975Z\"},{\"Host\":\".facebook.com\",\"Path\":\"\/\",\"KeyName\":\"xs\",\"Value\":\"22%3AAR5JtT1dzJ7jeg%3A2%3A1623396444%3A-1%3A6372%3A%3AAcVCn4PstZrA2HtujTlWfm0F2YDzaCDKm3rqwzHydw\",\"IsSecure\":true,\"IsHTTPOnly\":true,\"HasExpire\":true,\"IsPersistent\":true,\"CreateDate\":\"2021-05-09T08:52:32.975Z\",\"ExpireDate\":\"2021-09-09T08:52:32.975Z\"},{\"Host\":\".facebook.com\",\"Path\":\"\/\",\"KeyName\":\"datr\",\"Value\":\"WhDDYCIMURWXPAyokepVk6Lo\",\"IsSecure\":true,\"IsHTTPOnly\":true,\"HasExpire\":true,\"IsPersistent\":true,\"CreateDate\":\"2021-05-09T08:52:32.975Z\",\"ExpireDate\":\"2021-09-09T08:52:32.975Z\"},{\"Host\":\".facebook.com\",\"Path\":\"\/\",\"KeyName\":\"spin\",\"Value\":\"r.1003948788_b.trunk_t.1623396446_s.1_v.2_\",\"IsSecure\":true,\"IsHTTPOnly\":true,\"HasExpire\":true,\"IsPersistent\":true,\"CreateDate\":\"2021-05-09T08:52:32.975Z\",\"ExpireDate\":\"2021-09-09T08:52:32.975Z\"},{\"Host\":\".facebook.com\",\"Path\":\"\/\",\"KeyName\":\"sb\",\"Value\":\"WhDDYHDYvhVDz6WHtt7OlAA5\",\"IsSecure\":true,\"IsHTTPOnly\":true,\"HasExpire\":true,\"IsPersistent\":true,\"CreateDate\":\"2021-05-09T08:52:32.975Z\",\"ExpireDate\":\"2021-09-09T08:52:32.975Z\"},{\"Host\":\".facebook.com\",\"Path\":\"\/\",\"KeyName\":\"c_user\",\"Value\":\"100003689902602\",\"IsSecure\":true,\"IsHTTPOnly\":false,\"HasExpire\":true,\"IsPersistent\":true,\"CreateDate\":\"2021-05-09T08:52:32.975Z\",\"ExpireDate\":\"2021-09-09T08:52:32.975Z\"}]}";
// var cookies = JSON.parse(this.json);


// Object.keys(cookies).forEach((url) => {
//     var valid_url = url;
//     if (url[0] == '.') valid_url = "https://www" + url;
//     else if (!url.includes("http://")) valid_url = "https://" + url;
//     cookies[url].forEach(cookie => {
//         try {
//             var expire = (new Date(cookie.ExpireDate).getTime() / 1000)
//             var setting_cookie = {
//                 url: valid_url,
//                 domain: cookie.Host,
//                 path: cookie.Path,
//                 name: cookie.KeyName,
//                 value: cookie.Value,
//                 secure: cookie.IsSecure,
//                 httpOnly: cookie.IsHTTPOnly,
//                 expirationDate: expire,
//                 sameSite: "no_restriction",
//             };
//             chrome.cookies.set(
//                 setting_cookie,
//                 function (cookie) {
//                     if (chrome.runtime.lastError) {
//                         console.log(chrome.runtime.lastError.message);
//                     } else {
//                         // Tab exists
//                     }
//                     console.log(JSON.stringify(cookie));
//                 }
//             )
//         } catch (error) {
//             console.log("Set cookie for domain " + url + " error. " + error);
//         }
//         //console.log(cookie);
//     });


//     var valid_url = url;
//     if (url[0] == '.') valid_url = "http://www" + url;
//     else if (!url.includes("http")) valid_url = "http://" + url;
//     cookies[url].forEach(cookie => {
//         try {
//             //console.log(cookie);
//             var expire = (new Date(cookie.ExpireDate).getTime() / 1000)
//             var setting_cookie = {
//                 url: valid_url,
//                 domain: cookie.Host,
//                 path: cookie.Path,
//                 name: cookie.KeyName,
//                 value: cookie.Value,
//                 secure: cookie.IsSecure,
//                 httpOnly: cookie.IsHTTPOnly,
//                 expirationDate: expire,
//                 sameSite: "no_restriction",
//             };
//             chrome.cookies.set(
//                 setting_cookie,
//                 function (cookie) {
//                     if (chrome.runtime.lastError) {
//                         console.log(chrome.runtime.lastError.message);
//                     } else {
//                         // Tab exists
//                         console.log(JSON.stringify(cookie));
//                     }

//                 }
//             )
//         } catch (error) {
//             console.log("Set cookie for domain " + url + " error. " + error);
//         }

//     });

// });