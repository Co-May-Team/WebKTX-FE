> # Website KTX Cỏ May - Frontend

## Nội dung
### 1. Tổng quan dự án

### 2. Cấu trúc dự án

### 3. Chạy dự án

### 4. Contributes

### Lưu ý

1.  Clone project từ repository (forked từ Co-May-Team/WebKTX-FE)
2.  Mở cmd ở thư mục root của project và gõ lệnh `npm install` để cài đặt tất cả các package.
3.  Gõ lệnh `npm start` để chạy project trên localhost.

- Trước khi commit code, gõ lệnh `npm run format` để format code theo chuẩn của project

### 2. Cấu trúc thư mục


1. src: là thư mục chính chứa toàn bộ mã nguồn của ứng dụng.

2. public: chứa các tệp tĩnh như ảnh, biểu tượng favicon, index.html, vv.

3. src/components: chứa các thành phần UI độc lập, có thể tái sử dụng được trong toàn bộ ứng dụng.

4. src/layouts: chứa các bố cục của ứng dụng.

5. src/containers: chứa các thành phần lớn hơn, điều khiển nhiều thành phần UI khác nhau, thường được kết hợp từ nhiều thành phần UI.

6. src/utils: chứa các hàm tiện ích, tập hợp các hàm và chức năng khác để sử dụng trong toàn bộ ứng dụng.

7. src/store: chứa các tệp tin liên quan đến quản lý trạng thái (state management) của ứng dụng bằng thư viện Redux.

8. src/services: chứa các hàm liên quan đến gọi API, xử lý dữ liệu.

9. src/styles: chứa các tệp CSS và Sass, và theme của ứng dụng.

10. src/routes: chứa các tệp tin liên quan đến quản lý routing cho ứng dụng.

11. src/assets: chứa các tệp tin liên quan đến hình ảnh, video, audio và các tài nguyên khác.

12. src/constants: chứa các hằng số được sử dụng trong toàn bộ ứng dụng.

13. src/hooks: chứa các custom hooks.

14. src/tests: chứa các file liên quan đến việc test, đảm bảo chất lượng phần mềm.

### Flow

- src/index.js --> src/App.js --> src/routes --> src/layouts --> src/containers --> src/components
- src/containers --> src/store/{feature name}/slice.js --> src/store/{feature name}/action.js --> src/apis
