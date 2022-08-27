import React from 'react';
import PropTypes from 'prop-types';
import { bindClassNames, path } from '~/utils';
import DefaultSection from '../default-section/DefaultSection';
import styles from './NotificationSection.module.scss';
import { imageUrl } from '~/assets/images';
import { Button } from '~/components/customs';
import {
  Card,
  CardBody,
  CardImg,
  CardSubtitle,
  CardText,
  CardTitle,
} from 'reactstrap';
import { BsCalendar4 } from 'react-icons/bs';

const cx = bindClassNames(styles);

export default function NotificationSection(props) {
  const renderCardList = () => {
    return [1, 2, 3].map((item) => (
      <Card key={item} className={cx('card-item')}>
        <CardImg src={imageUrl} alt="" className={cx('card-img')} />
        <CardBody className={cx('card-body')}>
          <CardTitle tag="h4" className={cx('card-title')}>
            CHÍNH THỨC MỞ FORM ĐĂNG KÍ XÉT TUYỂN TÂN SINH VIÊN KHÓA 7
          </CardTitle>
          <CardSubtitle tag="h6" className={cx('card-subtitle')}>
            <BsCalendar4 />
            <span>Tháng Bảy 7, 2022</span>
          </CardSubtitle>
          <CardText className={cx('card-text')}>
            Ký túc xá Cỏ May nằm trong khuôn viên Trường đại học Nông Lâm,
            Phường Linh Trung, TP Thủ Đức, TP. Hồ Chí Minh, được đầu tư xây dựng
            từ nguồn vốn Trái phiếu Chính phủ; Với cơ chế hoạt động "Tự chủ tài
            chính, lấy thu bù chi" và phương châm "Nề nếp, văn minh, hiệu quả,
            an toàn, bền vững, lâu dài", Ký túc xá phục vụ người học, tạo điều
            kiện tốt nhất trong ăn ở, sinh hoạt và học tập cho sinh viên ở nội
            trú, bổ sung cho các hoạt động chính của Trường, góp phần thực hiện
            tốt mục tiêu và nhiệm vụ đào tạo của Nhà trường...
          </CardText>
          <Button className={cx('more-btn')}>Đọc thêm</Button>
        </CardBody>
      </Card>
    ));
  };
  return (
    <DefaultSection title="THÔNG BÁO MỚI">
      <div className={cx('body')}>{renderCardList()}</div>
    </DefaultSection>
  );
}

NotificationSection.propTypes = {
  // data: PropTypes.object.isRequired,
};
