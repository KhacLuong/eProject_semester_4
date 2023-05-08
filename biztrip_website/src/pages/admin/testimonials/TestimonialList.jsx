import React, {useState} from 'react';
import useDocumentTitle from "../../../hooks/useDocumentTitle.jsx";
import avatar from "../../../assets/image/avatar/me.jpg";
import Banner from "../../../components/admin/Banner.jsx";
import Table from "../../../components/admin/Table.jsx";
import {deleteUser, getListUser} from "../../../middleware/services/apiService.jsx";
import Paginate from "../../../components/admin/Paginate.jsx";

const TestimonialList = () => {
    useDocumentTitle("Quản lý chứng nhận phản hồi", true)
    const [turnOffPrevNextBtn, setTurnOffPrevNextBtn] = useState(true)
    const theadData = [
        '#', 'Avatar', 'Họ và tên', 'Công việc', 'Nội dung', 'Ngày thêm vào', 'Action'
    ]
    const tbodyData = [
        {
            id: 1,
            items: [{
                imgPath: avatar,
                imgName: ""
            }, "Đức Anh", "CEO Saigon Books", {
                content: "Lần trước tôi có việc gấp phải đi công tác, lên mạng tìm đặt vé xe thì tình cờ tìm thấy BizTrip. Sau khi tham khảo, tôi quyết định đặt vé và thanh toán. Công nhận rất tiện và nhanh chóng. Chỉ một lúc sau, nhà xe liên hệ xác nhận vé ngay và thông báo thời gian xe dự kiến đón để tôi chuẩn bị. Tôi khá bất ngờ vì nhà xe có thông tin của mình nhanh đến vậy. Chuyến đi hôm đó rất tuyệt. Tôi nhất định sẽ tiếp tục ủng hộ BizTrip."
            }, "20-04-2023"]
        },
        {
            id: 2,
            items: [{
                imgPath: avatar,
                imgName: ""
            }, "Đức Anh", "Giám đốc BSSC", {
                content: "Các đối tác của BizTrip đều là những hãng xe lớn, có uy tín nên tôi hoàn toàn yên tâm khi lựa chọn đặt vé cho bản thân và gia đình. Nhờ hiển thị rõ nhà xe và vị trí chỗ trống trên xe, tôi rất dễ dàng tìm vé mình muốn và chỗ mình muốn ngồi. Còn hình thức thanh toán có cả thẻ, ví, tại nhà xe và tốc độ thanh toán thì siêu nhanh, tiết kiệm cho tôi rất nhiều thời gian."
            }, "10-02-2023"]
        },
        {
            id: 3,
            items: [{
                imgPath: avatar,
                imgName: ""
            }, "Đức Anh", "YOLA Co-Founder", {
                content: "BizTrip là ứng dụng đầu tiên tôi nghĩ tới khi cần đặt vé xe. Vì không những BizTrip có nhiều ưu đãi lớn mà còn có nhiều hãng xe chất lượng, tôi được tuỳ chọn chỗ yêu thích nên tôi rất hài lòng."
            }, "20-04-2023"]
        },

    ]
    const tbodyAction = ['edit', 'delete']
    const dataBreadcrumb = [
        {
            name: "Dashboard",
            path: "/admin/v1"
        },
        {
            name: "Quản lý chứng nhận phản hồi",
            path: ""
        }
    ]
    return (
        <>
            <Banner dataBreadcrumb={dataBreadcrumb} title={"Danh sách chứng nhận phản hồi"} pathCreate={"create"}
                    isExport={false}/>
            <div data-aos="fade-right"
                 data-aos-delay="300">
                <Table
                    theadData={theadData}
                    tbodyData={tbodyData}
                    tbodyAction={tbodyAction}
                    fetchDelete={deleteUser}
                    fetchList={getListUser}/>
                <Paginate pageCount={100}
                          pageRangeDisplayed={3}
                          marginPagesDisplayed={2}
                          turnOffPrevNextBtn={turnOffPrevNextBtn}
                          firstIndexPerPage={1}
                          lastIndexPerPage={20}
                          totalItems={1200}
                          setTurnOffPrevNextBtn={setTurnOffPrevNextBtn}/>
            </div>
        </>
    );
};

export default TestimonialList;