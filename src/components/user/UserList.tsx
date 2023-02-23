import { useGetCourseQuery } from "../../redux/modules/apiSlice";
import { authService } from "../../utils/firebase";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useUpdateTravelStatusMutation } from "../../redux/modules/apiSlice";
import { ListMap } from "../shared";

type UserListType = {
  done: boolean;
  category: string;
};

const UserList = ({ done, category }: UserListType) => {
  const { data, isLoading, isError } = useGetCourseQuery();
  const userID = authService.currentUser?.uid;
  const [userData, setUserData] = useState<CourseType[]>();
  const navigate = useNavigate();
  const [updateTravelStatus] = useUpdateTravelStatusMutation();

  const filterData = () => {
    const mypaths = data?.filter(
      (item) => item.userID === userID && item.travelStatus === done
    );
    const mylikes = data?.filter(
      (item) => item.likesID?.includes(userID) && item.travelStatus === done
    );
    category === "MY" ? setUserData(mypaths) : setUserData(mylikes);
  };

  const changeTravelStatusTrue = (id: string | undefined) => {
    Swal.fire({
      title: "리뷰를 남기시겠습니까?",
      text: "NILILI에 소중한 리뷰를 남겨주세요 ♥",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#B3261E",
      cancelButtonColor: "#50AA72",
      confirmButtonText: "리뷰도 작성할게요!",
      cancelButtonText: "여행 후로만 변경할게요.",
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        await updateTravelStatus({
          courseId: id,
          travelStatus: true,
        });
        navigate(`/edit/${id}`);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        await updateTravelStatus({
          courseId: id,
          travelStatus: true,
        });
        Swal.fire("변경 완료!", "여행 후로 변경되었습니다.", "success");
      }
    });
  };

  const changeTravelStatusFalse = (id: string | undefined) => {
    Swal.fire({
      title: "여행 전으로 변경하시겠습니까?",
      text: "You won't be able to revert this!",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "네, 변경해주세요.",
    }).then((result) => {
      if (result.isConfirmed) {
        updateTravelStatus({
          courseId: id,
          travelStatus: false,
        });
        Swal.fire("변경 완료!", "여행 전으로 변경되었습니다.", "success");
      }
    });
  };

  useEffect(() => {
    filterData();
  }, [data, category, done]);

  if (isLoading) {
    return <>로딩중....</>;
  }
  if (isError) {
    return <>에러가 발생했습니다.</>;
  }

  return (
    <div className="my-10 3xl:w-[60%] 2xl:w-[70%] w-[90%] ">
      <p className=" ml-4 my-[2%] w-fit xl:text-[55px] lg:text-[45px] sm:text-[35px] text-2xl font-bold  ">
        WHAT'S NEW?
      </p>
      <p className=" hidden sm:block ml-4 pb-5 w-fit text-xl text-[#999999]">
        NILILI 사용자가 가장 최근 올린 일정을 함께해보세요.
      </p>

      <ul>
        {userData?.map((item: CourseType) => (
          <div key={item.id}>
            <li className="md:w-[23%] w-[360px]  inline-block mx-3 pt-6 border-t-2 border-black   ">
              <div>
                <ListMap course={item} />
                <div className="hover:transition-all w-[300px] h-[300px] bg-no-repeat bg-cover bg-center hover:bg-[url('https://user-images.githubusercontent.com/117059420/219529223-bb81ad92-30cc-4ca2-9ce1-3c7f5dd3a4dc.jpg')] bg-[url('https://user-images.githubusercontent.com/117059420/219529260-5546619d-ed8b-4bc1-86a9-829249a4cd64.jpg')]" />
                {item.travelStatus ? (
                  <button onClick={() => changeTravelStatusFalse(item.id)}>
                    여행 전으로 토글
                  </button>
                ) : (
                  <button onClick={() => changeTravelStatusTrue(item.id)}>
                    여행 후로 토글
                  </button>
                )}
              </div>
              <p className="pr-4 ml-1 mt-5 mb-5 sm:text-2xl text-xl overflow-hidden font-black ">
                {item.title}
              </p>
              <p className="ml-1 mt-2 font-medium  text-gray-400 sm:text-xl mb-3  ">
                {item.nickname}
              </p>
              <p className="ml-1 mt-2 font-medium  text-gray-400 sm:text-xl mb-3  ">
                {item.createdAt}
              </p>
            </li>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
