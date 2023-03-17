### Lưu ý

1.  Clone project từ repository (forked từ Co-May-Team/WebKTX-FE)
2.  Mở cmd ở thư mục root của project và gõ lệnh `npm install` để cài đặt tất cả các package.
3.  Gõ lệnh `npm start` để chạy project trên localhost.

- Trước khi commit code, gõ lệnh `npm run format` để format code theo chuẩn của project

### Cấu trúc thư mục

1.  apis --> Chứa các APIs để lấy dữ liệu.
2.  assets --> Chứa các tài nguyên của website (hình ảnh, icon,...).
3.  components --> Chứa các component tùy chỉnh.
4.  containers --> Chứa các page của website.
5.  hooks --> Chứa các hooks tùy chỉnh.
6.  layouts --> Chứa các layout của website.
7.  routes --> Chứa các routes của website.
8.  store --> Chứa các file liên quan đến store redux.
9.  styles --> Chứa các file scss.

### Flow

- src/index.js --> src/App.js --> src/routes --> src/layouts --> src/containers --> src/components
- src/containers --> src/store/{feature name}/slice.js --> src/store/{feature name}/action.js --> src/apis
