import React from "react";
import {
  Typography,
  DatePicker,
  Form,
  Row,
  Col,
  Input,
  notification,
} from "antd";
import { ModalPrimary } from "components/Modal/Modal";
import { CustomRow } from "components/customize/Layout";
import moment from "moment";
import { put } from "utils/APICaller";

function EditScheduleModal({
  visible,
  onCancel,
  id,
  appointmentTime,
  appointmentLocation,
}) {
  const [form] = Form.useForm();

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        const checkLink = isURL(values.address);
        put({
          endpoint: `/appointment/detail/${id}`,
          body: {
            location: checkLink ? "" : values.address,
            link: checkLink ? values.address : "",
            time: values.time,
          },
        })
          .then((res) => {
            notification.success({
              message: "Đã chỉnh sửa thành công",
            });
          })
          .catch((err) => {
            notification.error({
              message: "Có lỗi xảy ra, vui lòng thử lại",
            });
          });
      })
      .catch((error) => {
        console.error("Validation failed:", error);
      });
  };

  function isURL(str) {
    const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
    return urlPattern.test(str);
  }

  return (
    <>
      <ModalPrimary
        title={"Chỉnh sửa lịch hẹn"}
        open={visible}
        bodyStyle={{ paddingTop: 20 }}
        onOk={handleOk}
        onCancel={onCancel}
      >
        <Form
          form={form}
          name="editInterview"
          initialValues={{
            remember: true,
          }}
        >
          <Row gutter={[0, 10]}>
            <Col span={24}>
              <CustomRow gutter={[0, 10]}>
                <Col span={24}>
                  <Typography.Title level={4}>
                    Link phỏng vấn (hoặc địa điểm)
                  </Typography.Title>
                </Col>
                <Col span={24}>
                  <Form.Item
                    name="address"
                    initialValue={appointmentLocation}
                    rules={[
                      {
                        required: true,
                        message: "Không được để trống ô này!",
                      },
                    ]}
                  >
                    <Input placeholder="Ví dụ: Công ty ABC, toà nhà 123, Phường Đa Kao, Quận 1" />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Typography.Title level={4}>
                    Thời gian phỏng vấn
                  </Typography.Title>
                </Col>
                <Col span={24}>
                  <Form.Item
                    name="time"
                    initialValue={moment(appointmentTime)}
                    rules={[
                      {
                        required: true,
                        message: "Không được để trống ô này!",
                      },
                    ]}
                  >
                    <DatePicker
                      timezone="UTC"
                      style={{ with: "100%" }}
                      showTime
                      showNow={false}
                      disabledDate={(current) => {
                        return (
                          current &&
                          current < moment().add(1, "day").endOf("day")
                        );
                      }}
                    />
                  </Form.Item>
                </Col>
              </CustomRow>
            </Col>
          </Row>
        </Form>
      </ModalPrimary>
    </>
  );
}

export default EditScheduleModal;
