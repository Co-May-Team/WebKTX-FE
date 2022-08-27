import React from 'react';
import { imageUrl } from '~/assets/images';
import { Button } from '~/components/customs';
import { bindClassNames } from '~/utils';
import styles from './Introduces.module.scss';

const cx = bindClassNames(styles);

export default function Introduces() {
  return (
    <div className={cx('container')}>
      <div className={cx('detail')}>
        <h3 className={cx('heading')}>KÝ TÚC XÁ CỎ MAY</h3>
        <p className={cx('content')}>
          Ký túc xá Trường đại học Tôn Đức Thắng cơ sở Tân Phong gồm 04 tòa nhà:
          Nhà H, I cao 10 tầng. Nhà K, L cao 20 tầng. Cơ chế hoạt động: Tự chủ
          tài chính, tự cân đối thu chi; Phương châm: Nề nếp, văn minh, hiệu
          quả, an toàn, bền vững, lâu dài; Tiêu chí: Phục vụ người học, tạo điều
          kiện tốt nhất trong ăn ở, sinh hoạt và học tập cho sinh viên ở nội
          trú. Bổ sung cho các hoạt động chính của Trường, góp phần thực hiện
          tốt mục tiêu và nhiệm vụ đào tạo của Nhà trường. Hệ thống Ký túc xá
          Đại học Tôn Đức Thắng gồm Ký túc xá Cơ sở Tân Phong, quận 7, Tp.HCM,
          Ký túc xá Cở sở Bảo Lộc và Ký túc xá Phân hiệu Nha Trang. Cung cấp
          5831 chỗ ở cho sinh viên. Ký túc xá Trường Đại học Tôn Đức Thắng cơ sở
          Tân Phong gồm 04 khối nhà H, I, K và L. Với tổng diện tích sàn xây
          dựng là 42.414 m2; Phục vụ 4.772 chỗ ở cho sinh viên.
        </p>
        <Button className={cx('more-btn')}>Xem thêm</Button>
      </div>
      <div className={cx('info')}>
        <h3 className={cx('heading')}>
          NHIỆM VỤ, TỔ CHỨC NHÂN SỰ & CƠ SỞ VẬT CHẤT
        </h3>
        <div className={cx('info-list')}>
          {[...Array(3).keys()].map((item) => (
            <div className={cx('info-item')} key={item}>
              <img src={imageUrl} alt={item} className={cx('info-img')} />
              <div className={cx('info-hover')}>
                <Button>Xem thêm</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={cx('image')}>
        <h3 className={cx('heading')}>HÌNH ẢNH KÝ TÚC XÁ CỎ MAY</h3>
        <div className={cx('img-list')}>
          {[...Array(10).keys()].map((item) => (
            <div className={cx('img-item')} key={item}>
              <img src={imageUrl} alt={item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
