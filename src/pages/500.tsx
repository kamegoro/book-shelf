import CustomErrorBox from '@/components/organisms/CustomErrorBox';

const Custom500 = () => (
  <CustomErrorBox
    statusCode="500"
    message="ページが表示できません"
    description={
      <>
        サーバーで問題が発生しているためページが表示できません。
        <br />
        しばらく時間を置いてからやり直してください。
      </>
    }
  />
);

export default Custom500;
