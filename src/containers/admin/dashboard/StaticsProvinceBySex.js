import { Progress } from 'reactstrap'

function StaticsProvinceBySex(props) {
    const provinceNames = [
        'Hà Nội',
        'Hồ Chí Minh',
        'Đà Nẵng',
        'Hải Phòng',
        'Cần Thơ',
        'An Giang',
        'Bà Rịa - Vũng Tàu',
        'Bắc Giang',
        'Bắc Kạn',
        'Bạc Liêu',
        'Bắc Ninh',
        'Bến Tre',
        'Bình Định',
        'Bình Dương',
        'Bình Phước',
        'Bình Thuận',
        'Cà Mau',
        'Cao Bằng',
        'Đắk Lắk',
        'Đắk Nông',
        'Điện Biên',
        'Đồng Nai',
        'Đồng Tháp',
        'Gia Lai',
        'Hà Giang',
        'Hà Nam',
        'Hà Tĩnh',
        'Hải Dương',
        'Hậu Giang',
        'Hòa Bình',
        'Hưng Yên',
        'Khánh Hòa',
        'Kiên Giang',
        'Kon Tum',
        'Lai Châu',
        'Lâm Đồng',
        'Lạng Sơn',
        'Lào Cai',
        'Long An',
        'Nam Định',
        'Nghệ An',
        'Ninh Bình',
        'Ninh Thuận',
        'Phú Thọ',
        'Quảng Bình',
        'Quảng Nam',
        'Quảng Ngãi',
        'Quảng Ninh',
        'Quảng Trị',
        'Sóc Trăng',
        'Sơn La',
        'Tây Ninh',
        'Thái Bình',
        'Thái Nguyên',
        'Thanh Hóa',
        'Thừa Thiên Huế',
        'Tiền Giang',
        'Trà Vinh',
        'Tuyên Quang',
        'Vĩnh Long',
        'Vĩnh Phúc',
        'Yên Bái',
        'Phú Yên',
    ]
    const provinces = []

    for (let i = 0; i < 63; i++) {
        let province = {}
        province.name = provinceNames[i]
        province.male = Math.floor(Math.random() * (10 - 5 + 1) + 5)
        province.female = Math.floor(Math.random() * (10 - 5 + 1) + 5)
        provinces.push(province)
    }

    return (
        <>
            {provinces.map((item, index) => (
                <div className="progress-group mb-4" key={index}>
                    <div className="progress-group-prepend">
                        <span className="text-medium-emphasis small">
                            {item.name}
                        </span>
                    </div>
                    <div className="progress-group-bars">
                        <Progress thin color="info" value={item.male} />
                        <Progress thin color="danger" value={item.female} />
                    </div>
                </div>
            ))}
        </>
    )
}

StaticsProvinceBySex.propTypes = {}

export default StaticsProvinceBySex
