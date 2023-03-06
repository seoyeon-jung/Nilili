import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  useAddCourseMutation,
  useGetCourseQuery,
} from "../redux/modules/apiSlice";
import { authService } from "../utils/firebase";
import {
  PostHashTag,
  PostCategories,
  PostMap,
  PostHeader,
  PostTravelStatus,
  PostMobileCourse,
} from "../components/post/index";
import { replaceAllData } from "../redux/modules/courseSlice";
import Swal from "sweetalert2";
import * as amplitude from "@amplitude/analytics-browser";
import { logEvent } from "../utils/amplitude";
import { usePreventLeave, useOption } from "../hooks";

const Post = () => {
  useEffect(() => {
    amplitude.track("글쓰기페이지 접속");
  }, []);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [addCourse] = useAddCourseMutation();
  const { data } = useGetCourseQuery();
  const [modalOpen, setModalOpen] = useState(false);

  usePreventLeave();

  const titleRef = useRef<HTMLInputElement>(null);
  const regionsRef = useRef<HTMLSelectElement>(null);

  // 커버
  const [uploadCover, setUploadCover] = useState("");
  const [galleryCover, setGalleryCover] = useState("");

  //제목
  const [courseTitle, setCourseTitle] = useState("");

  // select
  const {
    selectedTags,
    setSelectedTags,
    regions,
    setRegions,
    selectedLabels,
    selectedRegions,
  } = useOption();

  // 여행전/후 선택
  const [travelStatus, setTravelStatus] = useState<boolean | null>(null);

  //navigate할 때 쓸 state
  const [condition, setCondition] = useState(false);

  const userID = authService.currentUser?.uid;

  const courseList = useSelector((state: any) => state.courseSlice.courseList);

  const showModal = () => {
    setModalOpen(!modalOpen);
  };

  const onClickAddPost = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();

    const newPost = {
      location: selectedRegions,
      hashtags: selectedLabels,
      title: courseTitle,
      travelStatus,
      courseList: JSON.stringify(courseList),
      cover: uploadCover || galleryCover,
      userID,
      nickname: authService.currentUser?.displayName,
      createdAt: JSON.stringify(new Date()),
      likes: 0,
      likesID: [],
      profileImage: authService.currentUser?.photoURL,
    };

    if (
      (uploadCover || galleryCover) &&
      travelStatus !== null &&
      regions.length > 0 &&
      courseTitle.trim() &&
      courseList.length > 1
    ) {
      Swal.fire({
        title: "게시글을 등록하시겠습니까?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#B3261E",
        cancelButtonColor: "#50AA72",
        confirmButtonText: "네",
        cancelButtonText: "아니요",
      }).then((result) => {
        if (result.isConfirmed) {
          addCourse(newPost);
          setCondition(true);
          if (!travelStatus) {
            Swal.fire({
              icon: "success",
              title: "훌륭한 여정이에요! 여행 후 리뷰도 꼭 부탁드려요!",
              showConfirmButton: false,
              timer: 1500,
            });
          } else {
            Swal.fire({
              icon: "success",
              title: `${authService.currentUser?.displayName}님의 여정을 공유해주셔서 감사합니다!`,
            });
          }
        }
      });
      logEvent("게시물 등록", {
        from: "글쓰기 페이지",
        information: {
          지역: selectedRegions,
          해시태그: selectedLabels,
          여행여부: travelStatus,
        },
      });
    } else {
      if (!uploadCover && !galleryCover) {
        Swal.fire({
          icon: "error",
          title: "커버 이미지를 추가해주세요!",
          didClose: () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
          },
        });
      }
      if (travelStatus === null) {
        Swal.fire({
          icon: "error",
          title: "여행 전/후 카테고리를 선택해주세요!",
          didClose: () => {
            window.scrollTo({ top: 450, behavior: "smooth" });
          },
        });
      }
      if (regions.length === 0) {
        Swal.fire({
          icon: "error",
          title: "하나 이상의 지역을 선택해주세요!",
          didClose: () => {
            regionsRef.current?.focus();
          },
        });
      }
      if (!courseTitle?.trim()) {
        Swal.fire({
          icon: "error",
          title: "제목을 입력해주세요!",
          didClose: () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
            titleRef.current?.focus();
          },
        });
      }
      if (courseList.length < 2) {
        Swal.fire({
          icon: "error",
          title: "2개 이상의 여행지를 추가해주세요!",
          didClose: () => {
            window.scrollTo({ top: 600, behavior: "smooth" });
          },
        });
      }
    }
  };

  const onClickCancel = () => {
    Swal.fire({
      title: "게시글 작성을 취소하시겠습니까?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#B3261E",
      cancelButtonColor: "#50AA72",
      confirmButtonText: "네, 다음 번에 쓸게요.",
      cancelButtonText: "아니요, 마저 쓸게요.",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate(`/`);
        dispatch(replaceAllData([]));
      }
    });
  };

  useEffect(() => {
    if (condition && data) {
      navigate(`/course/${data[0].id}`);
      setCondition(false);
    }
  }, [data]);

  window.addEventListener("popstate", () =>
    window.history.pushState(null, "", window.location.href)
  );

  return (
    <div className="mb-[7%]">
      <PostHeader
        uploadCover={uploadCover}
        setUploadCover={setUploadCover}
        galleryCover={galleryCover}
        setGalleryCover={setGalleryCover}
        courseTitle={courseTitle}
        setCourseTitle={setCourseTitle}
        titleRef={titleRef}
      />
      <div className="w-[85%] md:w-[70%] h-auto mx-auto md:mt-[100px] mt-0 ">
        <div className="flex flex-col-reverse md:flex-row">
          <div className="flex flex-col">
            <div className="w-full flex justify-between">
              <p className="text-[18px] sm:text-2xl whitespace-normal font-bold">
                목적지를 추가해보세요.
              </p>
              <button
                onClick={() => showModal()}
                className="py-1 px-2 sm:hidden sm:w-[200px] bg-black text-white hover:text-black border-black border-2 hover:bg-white text-[12px]"
              >
                목적지 추가하기
              </button>
            </div>
            <p className="text-gray-400 mt-1 text-[13px] sm:body2 whitespace-normal">
              간단한 클릭으로 여행지를 추가할 수 있어요.
            </p>
          </div>
          <PostTravelStatus
            travelStatus={travelStatus}
            setTravelStatus={setTravelStatus}
          />
        </div>
        <div className="flex items-center gap-4">
          <PostCategories
            regionsRef={regionsRef}
            regions={regions}
            setRegions={setRegions}
          />
          <button
            onClick={() => showModal()}
            className="hidden sm:flex lg:w-[300px] sm:w-[200px] bg-black text-white text-md px-2 py-[7px] ml-auto hover:text-black border-black border-2 hover:bg-white justify-center"
          >
            목적지 추가하기
          </button>
        </div>
        <PostHashTag
          selectedTags={selectedTags}
          setSelectedTags={setSelectedTags}
        />
        <PostMap modalOpen={modalOpen} setModalOpen={setModalOpen} />
        <PostMobileCourse />
        <div className="flex flex-col sm:flex-row w-full justify-center gap-2 my-10 sm:gap-[5%]">
          <button
            onClick={(e) => onClickAddPost(e)}
            className="w-full sm:w-[472px] bg-black border-black border-2 text-white text-md md:text-lg py-3 shadow-[0_8px_8px_rgb(0,0,0,0.25)] hover:text-black hover:bg-white "
          >
            게시물 등록하기
          </button>
          <button
            onClick={onClickCancel}
            className="w-full sm:w-[472px] bg-white border-gray-04 border text-black text-md md:text-lg py-3 shadow-[0_8px_8px_rgb(0,0,0,0.25)] hover:text-black hover:bg-white"
          >
            취소하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default Post;
