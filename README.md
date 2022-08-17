# Note

1. Clone project from your repos (forked from Co-May-Team/WebKTX-FE)
2. Turn on terminal and run command `yarn` --> install all depends package
3. Next, run command `yarn start` to start project

### Inside src folder

1. apis --> Chứa các APIs để lấy dữ liêu
2. containers (pages) --> Chứa các page của website
3. contexts --> Chứa các contexts Provider share data giữa các components (VD: Using Dark mode)
4. features --> Chứa các slice (1 slice gồm 1 reducer và actions). See more <https://redux-toolkit.js.org/>
5. hoc --> HIGHER ORDER COMPONENT (VD: authentication --> wrapper các component lại để check có quyền được access component này hay không)
6. layouts --> define layouts
7. styles --> base, global variables, mixins, ...
8. axios --> custom axios call APIs
9. store --> custom store redux

### flow

src/index --> src/App --> src/routes --> src/layouts --> src/containers --> src/components
