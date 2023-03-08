import UserList from "./UserList";
import { useState } from "react";
import { useGetCourseQuery } from "../../redux/modules/apiSlice";
import { getAuth } from "@firebase/auth";

const UserCategoryBtn = () => {
  const [category, setCategory] = useState("MY");
  const [done, setDone] = useState(false);

  const { refetch } = useGetCourseQuery();
  const auth = getAuth();
  const user = auth.currentUser;
  const userName = user?.displayName;

  return (
    <div className="flex flex-col  lg:max-w-6xl w-[90%]   min-h-[57vh] ">
      <div className="flex  border-b-2 border-black ">
        <button
          className={`body4  sm:body1 mr-[7%] py-4 ${
            category === "MY" ? "border-b-[3px] border-black" : "text-gray-04"
          } `}
          onClick={() => {
            refetch();
            setCategory("MY");
          }}
        >
          내 게시글
        </button>
        <button
          className={` body4 sm:body1 py-4 ${
            category === "MY" ? "text-gray-04" : "border-b-[3px] border-black"
          } `}
          onClick={() => {
            refetch();
            setCategory("LK");
          }}
        >
          좋아요 한 게시글
        </button>
      </div>
      <div className=" flex flex-row justify-between items-center border-b-4 border-black mt-[3%] ">
        <div>
          {category === "MY" ? (
            <p className=" ml-1 my-[8%] w-fit xl:text-[50px] lg:text-[45px] sm:text-[35px] text-3xl font-bold font-eng ">
              MY PATH
            </p>
          ) : (
            <p className=" ml-1 my-[8%] w-fit xl:text-[50px] lg:text-[45px] sm:text-[35px] text-3xl font-bold font-eng ">
              MY LIKES
            </p>
          )}

          {category === "MY" ? (
            <p className="hidden md:block ml-2 pb-5 w-fit text-xl text-gray-04 ">
              {userName}님이 작성한 여행 여정을 되돌아보세요.
            </p>
          ) : (
            <p className="hidden md:block ml-2 pb-5 w-fit text-xl text-gray-04 ">
              {userName}님이 좋아요 한 여행 여정을 살펴보세요.
            </p>
          )}
        </div>
        <div>
          <button
            className={`badge border border-black sm:px-[20px] sm:py-[8px] p-1 ${
              done === false ? "bg-black text-white " : null
            } `}
            onClick={() => {
              refetch();
              setDone(false);
            }}
          >
            여행 계획
          </button>
          <button
            className={`badge border border-black sm:px-[20px] sm:py-[8px] p-1 ${
              done === true ? "bg-black text-white " : null
            } `}
            onClick={() => {
              refetch();
              setDone(true);
            }}
          >
            여행 후기
          </button>
        </div>
      </div>
      <UserList category={category} done={done} />
    </div>
  );
};

export default UserCategoryBtn;
