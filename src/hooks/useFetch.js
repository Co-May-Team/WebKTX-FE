import { useEffect, useState } from "react";

// Chỉ dùng cho [GET] method
// Nhận vào 1 callback function và data nếu có
export default function useFetch(callback, data) {
  const [loading, setLoading] = useState(false);
  const [error, setError]  = useState(false);
  const [response, setResponse] = useState([]);

  // Chỉ thực hiện chạy một lần
  useEffect(() => {
    // Khi thực hiện lấy data set loading = true, error = false
    setLoading(true);
    setError(false)
    // Hàm thực hiện call API
    async function doFetch() {
        try {
          // Kiểm tra nếu callback là function thì mới thực hiện call API
          if(typeof callback === 'function') {
            const res = await callback(data);
            res && setResponse(res.data?.data);
          } else {
            // Trả lỗi về cho người dùng => dòng này thực thi đi vào catch
            throw new Error('Callback is not a function');
          }
        } catch (error) {
          console.log(error)
          setError(true);
        } 
        setLoading(false);
    }
    doFetch();
  }, [callback, data])
  // Trả về cho người dùng 
  return {loading, error, response};
}