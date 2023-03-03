import styled from "styled-components";

const PostTravelStatus = ({ travelStatus, setTravelStatus }: any) => {
  const onClickStatus = (e: any) => {
    if (e.target.innerText === "여행 전") {
      setTravelStatus(false);
    }
    if (e.target.innerText === "여행 후") {
      setTravelStatus(true);
    }
  };

  return (
    <div className="ml-auto w-full sm:w-auto">
      <div className="flex w-full sm:float-right gap-3 border-b-[1.5px] border-gray-03 sm:border-none my-5">
        <Category
          onClick={(e) => onClickStatus(e)}
          className={travelStatus || travelStatus === null ? "" : "clicked"}
        >
          여행 전
        </Category>
        <Category
          onClick={(e) => onClickStatus(e)}
          className={travelStatus ? "clicked" : ""}
        >
          여행 후
        </Category>
      </div>
    </div>
  );
};

export default PostTravelStatus;

const Category = styled.button`
  width: 80px;
  padding: 3px 0px;
  font-size: 14px;
  color: #a0a4a8;
  cursor: pointer;
  &.clicked {
    color: #000000;
    text-decoration: underline;
    text-underline-offset: 7.5px;
    font-weight: 500;
    text-decoration-thickness: 1.5px;
  }
  @media screen and (min-width: 415px) {
    height: 40px;
    padding: 6px 12px;
    border: 1px solid #4b5563;
    margin-bottom: 10px;
    color: #4b5563;
    font-size: 16px;
    &.clicked {
      background: black;
      color: white;
      text-decoration: none;
    }
  }
  @media screen and (min-width: 768px) {
    margin-bottom: 32px;
    font-size: 18px;
  }
`;
