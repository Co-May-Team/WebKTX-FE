import React from 'react'
// import PropTypes from 'prop-types';
import { bindClassNames, path } from '~/utils'
import DefaultSection from '../default-section/DefaultSection'
import styles from './IntroSection.module.scss'
import { imageUrl } from '~/assets/images'
import { NavLink } from 'react-router-dom'
import { Button } from '~/components/customs'

const cx = bindClassNames(styles)

export default function IntroSection(props) {
    return (
        <DefaultSection title="GIỚI THIỆU CHUNG">
            <div className={cx('body')}>
                <img src={imageUrl} alt="" className={cx('preview')} />
                <div className={cx('content')}>
                    <h4 className={cx('small-title')}>
                        GIỚI THIỆU CHUNG VỀ KÝ TÚC XÁ CỎ MAY
                    </h4>
                    <p className={cx('demo')}>
                        Ký túc xá Cỏ May nằm trong khuôn viên Trường đại học
                        Nông Lâm, Phường Linh Trung, TP Thủ Đức, TP. Hồ Chí
                        Minh, được đầu tư xây dựng từ nguồn vốn Trái phiếu Chính
                        phủ; Với cơ chế hoạt động "Tự chủ tài chính, lấy thu bù
                        chi" và phương châm "Nề nếp, văn minh, hiệu quả, an
                        toàn, bền vững, lâu dài", Ký túc xá phục vụ người học,
                        tạo điều kiện tốt nhất trong ăn ở, sinh hoạt và học tập
                        cho sinh viên ở nội trú, bổ sung cho các hoạt động chính
                        của Trường, góp phần thực hiện tốt mục tiêu và nhiệm vụ
                        đào tạo của Nhà trường... Ký túc xá Cỏ May nằm trong
                        khuôn viên Trường đại học Nông Lâm, Phường Linh Trung,
                        TP Thủ Đức, TP. Hồ Chí Minh, được đầu tư xây dựng từ
                        nguồn vốn Trái phiếu Chính phủ; Với cơ chế hoạt động "Tự
                        chủ tài chính, lấy thu bù chi" và phương châm "Nề
                    </p>
                    <NavLink to={path.INTRODUCE}>
                        <Button className={cx('detail-btn')}>
                            Xem chi tiết
                        </Button>
                    </NavLink>
                </div>
            </div>
        </DefaultSection>
    )
}

IntroSection.propTypes = {
    // data: PropTypes.object.isRequired,
}
