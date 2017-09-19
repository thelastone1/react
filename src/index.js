import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

const rootElement = document.getElementById('root');
ReactDOM.render(<App/>, rootElement);

// if (module.hot) { // 새로고침했을때 전체파일이 아닌 변경된 부분만 업데이트
//   module.hot.accept();
// }
