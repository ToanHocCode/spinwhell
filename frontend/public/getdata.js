import axios from 'axios';

// Khởi tạo một mảng để lưu trữ dữ liệu từ API
let dataArray = [];

// Gọi phương thức GET để lấy dữ liệu từ API
axios.get('http://localhost:3000/layso')
  .then(response => {
    // Gán dữ liệu từ response vào mảng
    dataArray = response.data;

    // Log mảng để kiểm tra
    console.log(dataArray);
    console.log("aaa");
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });

// Xuất mảng để có thể sử dụng trong file HTML
export default dataArray;
