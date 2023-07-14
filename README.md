## 專案介紹

使用 Express 打造的餐廳美食網站，可以建立帳戶，新增自己的餐廳，可以瀏覽餐廳、查看詳細資訊、甚至連結到地圖。

### 功能

- 註冊帳號
- 登入/登出
- 使用 Facebook 帳號登入
- 瀏覽全部餐廳
- 新增餐廳
- 瀏覽餐廳的詳細資訊
- 編輯餐廳資訊
- 刪除餐廳
- 快速連結餐廳地址至 Google Map
- 透過關鍵字搜尋餐廳名稱或類別
- 關鍵字查無餐廳提示
- 選擇名稱/地區/類別來排序餐廳

## 開始使用

1. 請先確認有安裝 node.js 與 npm
2. clone 此專案到本地
3. 在本地透過終端機進入資料夾，輸入：

```bash
npm install
```

4. 新增 .env 檔案，並輸入 MongoDB 連線字串，及 Facebook 登入資訊

```bash
MONGODB_URI = "<你的連線字串>"
FACEBOOK_ID = "<FB應用程式編號>"
FACEBOOK_SECRET = "<FB應用程式密鑰>"
```

5. 在終端機輸入以下字串，製作種子資料

```bash
npm run seed
```

6. 安裝完成後，輸入：

```bash
npm run dev
```

7. 若看見此行訊息則代表順利運行：

```bash
Express is running on http://localhost:3000
mongodb connected!
```

8. 使用瀏覽器，進入以下網址：

```bash
http://localhost:3000
```

9. 停止使用：

```bash
ctrl + c
```
