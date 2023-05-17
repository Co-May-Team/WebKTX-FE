> # Website KTX Cỏ May - Frontend
[![My Skills](https://skillicons.dev/icons?i=react,html,css,js,jquery,mysql,vim,github,stackoverflow)](https://skillicons.dev)

## Nội dung
### [1. Tổng quan dự án](#tong-quan)
### 2. Cấu trúc dự án
### 3. Chạy dự án
### 4. Đóng góp

>

### 1. Tổng quan dự án<a name="tong-quan"></a>
### 2. Cấu trúc thư mục
```
.
└── WebKTX-FE/
    ├── Email
    ├── public
    ├── src/
    │   ├── assets
    │   ├── components
    │   ├── containers
    │   ├── data
    │   ├── hooks
    │   ├── layouts
    │   ├── services
    │   ├── store
    │   ├── styles
    │   ├── utils
    │   ├── App.js
    │   ├── index.css
    │   └── index.js
    ├── .babelrc
    ├── .gitignore
    ├── .prettierrc
    ├── Jenkinsfile
    ├── README.md
    ├── config-overrides.js
    ├── jsconfig.json
    ├── package.json
    └── tailwind.config.js
```
- src: là thư mục chính chứa toàn bộ mã nguồn của ứng dụng.

- public: chứa các tệp tĩnh như ảnh, biểu tượng favicon, index.html, vv.

- src/components: chứa các thành phần UI độc lập, có thể tái sử dụng được trong toàn bộ ứng dụng.

- src/layouts: chứa các bố cục của ứng dụng.

- src/containers: chứa các thành phần lớn hơn, điều khiển nhiều thành phần UI khác nhau, thường được kết hợp từ nhiều thành phần UI.

- src/utils: chứa các hàm tiện ích, tập hợp các hàm và chức năng khác để sử dụng trong toàn bộ ứng dụng.

- src/store: chứa các tệp tin liên quan đến quản lý trạng thái (state management) của ứng dụng bằng thư viện Redux.

- src/services: chứa các hàm liên quan đến gọi API, xử lý dữ liệu.

- src/styles: chứa các tệp CSS và Sass, và theme của ứng dụng.

- src/routes: chứa các tệp tin liên quan đến quản lý routing cho ứng dụng.

- src/assets: chứa các tệp tin liên quan đến hình ảnh, video, audio và các tài nguyên khác.

- src/constants: chứa các hằng số được sử dụng trong toàn bộ ứng dụng.

- src/hooks: chứa các custom hooks.

- src/tests: chứa các file liên quan đến việc test, đảm bảo chất lượng phần mềm.

### 3. Chạy dự án
1. Forked project từ Co-May-Team/WebKTX-FE
2. Clone project forked
3. Từ foler `WebKTX-FE` mở terminal và chạy dòng lệnh `git remote add origin https://github.com/Co-May-Team/WebKTX-FE.git`
4. Thực hiện pull code từ nhánh `dev1.1` về local bằng câu lệnh `git pull --progress -v --no-rebase "origin" dev1.1`
5. Mở cmd ở thư mục root của project và gõ lệnh `npm install` để cài đặt tất cả các package.
6. Gõ lệnh `npm start` để chạy project trên localhost.
#### Lưu ý
- Trước khi commit code, gõ lệnh `npm run format` để format code theo chuẩn của project

### Flow

- src/index.js --> src/App.js --> src/routes --> src/layouts --> src/containers --> src/components
- src/containers --> src/store/{feature name}/slice.js --> src/store/{feature name}/action.js --> src/apis
