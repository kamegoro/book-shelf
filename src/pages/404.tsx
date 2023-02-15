import CustomErrorBox from '@/components/organisms/CustomErrorBox';

const Custom404 = () => (
  <CustomErrorBox
    statusCode="404"
    message="お探しのページは見つかりませんでした。"
    description={
      <>
        お探しのページは一時的にアクセスができない状況にある可能性があります。
        <br />
        また、URLにタイプミスがないか再度ご確認ください。
      </>
    }
  />
);

export default Custom404;
