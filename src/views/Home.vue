<template>
  <div class="qr-code">
    <div class="form-group">
      <button @click="removeAllCookies" class="btn btn-success">
        clear all cookie
      </button>
    </div>

    <div style="height: 20px"></div>

    <div class="">PICK COOKIE FILE TO LOAD.</div>
    <!-- <qr-code :value="url" size="300" class="qr-code__content"></qr-code>
    <div class="input-group" style="margin-top: 30px">
      <input v-model="url" class="qr-code__url input" id="url" />
      <input v-model="page_cookies" class="qr-code__url input" id="cookies" />
      <button class="btn" @click="copy">Copy</button>
    </div> -->
    <div style="height: 5px"></div>
    <div class="form-group">
      <input type="file" @change="loadJsonFromFile" class="btn btn-success" />
    </div>

    <div v-if="message2 != ''" class="message" style="min-height: 13px">
      {{ message2 }}
    </div>
    <div v-if="message != ''" class="message" style="min-height: 13px">
      {{ message }}
    </div>
    <div
      v-for="addded in list_cookie_added"
      v-bind:key="addded.url"
      class="message"
      style="min-height: 13px"
    >
      {{ "Loaded domain " + addded.domain + ": " + addded.number + " cookie." }}
    </div>
  </div>
</template>
<script>
import QrcodeVue from "qrcode.vue";
export default {
  components: {
    QrCode: QrcodeVue,
  },

  data() {
    return {
      page_cookies: "",
      message: "",
      message2: "",
      list_cookie_added: [],
      //json = '"{\"www.facebook.com\":[{\"Host\":\".facebook.com\",\"Path\":\"\/\",\"KeyName\":\"fr\",\"Value\":\"1wkewrOUx0IpBLXPb.AWWmq8JfC8c1OMWMwXC1OI-8-AU.BgwyRS.eU.AAA.0.0.BgwyRS.AWW2CV8dkPI\",\"IsSecure\":true,\"IsHTTPOnly\":true,\"HasExpire\":true,\"IsPersistent\":true,\"CreateDate\":\"2021-05-09T08:52:32.975Z\",\"ExpireDate\":\"2021-09-09T08:52:32.975Z\"},{\"Host\":\".facebook.com\",\"Path\":\"\/\",\"KeyName\":\"xs\",\"Value\":\"22%3AAR5JtT1dzJ7jeg%3A2%3A1623396444%3A-1%3A6372%3A%3AAcVCn4PstZrA2HtujTlWfm0F2YDzaCDKm3rqwzHydw\",\"IsSecure\":true,\"IsHTTPOnly\":true,\"HasExpire\":true,\"IsPersistent\":true,\"CreateDate\":\"2021-05-09T08:52:32.975Z\",\"ExpireDate\":\"2021-09-09T08:52:32.975Z\"},{\"Host\":\".facebook.com\",\"Path\":\"\/\",\"KeyName\":\"datr\",\"Value\":\"WhDDYCIMURWXPAyokepVk6Lo\",\"IsSecure\":true,\"IsHTTPOnly\":true,\"HasExpire\":true,\"IsPersistent\":true,\"CreateDate\":\"2021-05-09T08:52:32.975Z\",\"ExpireDate\":\"2021-09-09T08:52:32.975Z\"},{\"Host\":\".facebook.com\",\"Path\":\"\/\",\"KeyName\":\"spin\",\"Value\":\"r.1003948788_b.trunk_t.1623396446_s.1_v.2_\",\"IsSecure\":true,\"IsHTTPOnly\":true,\"HasExpire\":true,\"IsPersistent\":true,\"CreateDate\":\"2021-05-09T08:52:32.975Z\",\"ExpireDate\":\"2021-09-09T08:52:32.975Z\"},{\"Host\":\".facebook.com\",\"Path\":\"\/\",\"KeyName\":\"sb\",\"Value\":\"WhDDYHDYvhVDz6WHtt7OlAA5\",\"IsSecure\":true,\"IsHTTPOnly\":true,\"HasExpire\":true,\"IsPersistent\":true,\"CreateDate\":\"2021-05-09T08:52:32.975Z\",\"ExpireDate\":\"2021-09-09T08:52:32.975Z\"},{\"Host\":\".facebook.com\",\"Path\":\"\/\",\"KeyName\":\"c_user\",\"Value\":\"100003689902602\",\"IsSecure\":true,\"IsHTTPOnly\":false,\"HasExpire\":true,\"IsPersistent\":true,\"CreateDate\":\"2021-05-09T08:52:32.975Z\",\"ExpireDate\":\"2021-09-09T08:52:32.975Z\"}]}"'
    };
  },

  created() {
    // if (process.env.NODE_ENV == "production") {
    //   chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
    //     this.url = tabs[0].url;
    //   });
    // }
  },

  methods: {
    removeAllCookies() {
      this.message2 = "";
      if (!chrome.cookies) {
        chrome.cookies = chrome.experimental.cookies;
      }

      var removeCookie = function (cookie) {
        var url =
          "http" +
          (cookie.secure ? "s" : "") +
          "://" +
          cookie.domain +
          cookie.path;
        chrome.cookies.remove({ url: url, name: cookie.name });
      };

      chrome.cookies.getAll({}, function (all_cookies) {
        var count = all_cookies.length;
        for (var i = 0; i < count; i++) {
          removeCookie(all_cookies[i]);
        }
        this.message2 = count + " COOKIES_CLEARED_VIA_EXTENSION_API";
      });
    },
    loadJsonFromFile(ev) {
      this.list_cookie_added = [];
      this.message = "";
      const file = ev.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          var cookies = JSON.parse(reader.result);
        } catch (error) {
          this.message = "File cookie nhập vào không đúng định dạng";
          return;
        }

        //console.log(object);
        Object.keys(cookies).forEach((url) => {
          var valid_url = url;
          if (url[0] == ".") valid_url = "https://www" + url;
          else if (!url.includes("http://")) valid_url = "https://" + url;

          let obj = {
            domain: valid_url,
            number: 0,
          };

          cookies[url].forEach((cookie) => {
            //console.log(cookie);
            try {
              var expire = new Date(cookie.ExpireDate).getTime() / 1000;
              var setting_cookie = {
                url: valid_url,
                domain: cookie.Host,
                path: cookie.Path,
                name: cookie.KeyName,
                value: cookie.Value,
                secure: cookie.IsSecure,
                httpOnly: cookie.IsHTTPOnly,
                expirationDate: expire,
                sameSite: "no_restriction",
              };
              chrome.cookies.set(setting_cookie, function (cookie) {
                //console.log(JSON.stringify(cookie));
                if (chrome.runtime.lastError) {
                  console.log(chrome.runtime.lastError.message);
                } else if (cookie) obj.number++;
              });
            } catch (error) {
              console.log(
                "Set cookie " +
                  cookie.KeyName +
                  " for domain " +
                  url +
                  " error. " +
                  error
              );
            }
          });
          this.list_cookie_added.push(obj);

          var valid_url = url;
          if (url[0] == ".") valid_url = "http://www" + url;
          else if (!url.includes("http")) valid_url = "http://" + url;

          let obj2 = {
            domain: valid_url,
            number: 0,
          };
          cookies[url].forEach((cookie) => {
            //console.log(cookie);
            try {
              var expire = new Date(cookie.ExpireDate).getTime() / 1000;
              var setting_cookie = {
                url: valid_url,
                domain: cookie.Host,
                path: cookie.Path,
                name: cookie.KeyName,
                value: cookie.Value,
                secure: cookie.IsSecure,
                httpOnly: cookie.IsHTTPOnly,
                expirationDate: expire,
                sameSite: "no_restriction",
              };
              chrome.cookies.set(setting_cookie, function (cookie) {
                //console.log(JSON.stringify(cookie));
                if (chrome.runtime.lastError) {
                  console.log(chrome.runtime.lastError.message);
                } else if (cookie) obj2.number++;
              });
            } catch (error) {
              console.log(
                "Set cookie " +
                  cookie.KeyName +
                  " for domain " +
                  url +
                  " error. " +
                  error
              );
            }
          });
          this.list_cookie_added.push(obj2);
        });
      };
      reader.readAsText(file);
    },
  },

  watch: {},
};
</script>
