import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  CommentInput,
  CourseHashTag,
  CourseTitle,
  LikeBtn,
  CommentDesc,
  CourseHeader,
  CourseMap,
} from "../components/course";
import EditCourse from "../components/course/EditCourse";
import { useGetCourseQuery } from "../redux/modules/apiSlice";

const Course = () => {
  const navigate = useNavigate();
  const [isEdit, setIsEdit] = useState(false);
  const { data, isLoading } = useGetCourseQuery();
  const paramId = useParams().id;
  let date;
  let time;

  const filterData = data?.filter(
    (course: CourseType) => course.id === paramId
  );
  const courseData = filterData?.pop();

  if (courseData?.createdAt !== undefined) {
    date = JSON.parse(courseData?.createdAt).substr(0, 10);
    time = JSON.parse(courseData?.createdAt).substr(11, 5);
  }

  if (paramId === "1") {
    const test = data && data[0].id;
    if (test) {
      navigate(`/course/${test}`);
    }
  }
  if (isEdit) {
    return (
      <EditCourse course={courseData} setIsEdit={setIsEdit} paramId={paramId} />
    );
  }
  return (
    <div>
      {isLoading ? (
        <div className="h-screen m-40 text-3xl">Loading...</div>
      ) : (
        <div>
          <CourseHeader course={courseData} />
          <div className="w-[70%] m-auto">
            {/* <CourseTitle
              course={courseData}
              paramId={paramId}
              setIsEdit={setIsEdit}
            /> */}
            <h3 className="mt-20 text-3xl font-bold">
              {courseData?.nickname}님의 여행경로
            </h3>
            <p className="mt-2 text-lg text-gray-400">
              {date} {time}
            </p>
            <CourseMap course={courseData} />
            <CourseHashTag course={courseData} />
            <LikeBtn paramId={paramId} course={courseData} />
            <CommentInput paramId={paramId} />
            <CommentDesc paramId={paramId} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Course;
